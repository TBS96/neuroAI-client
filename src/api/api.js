import axios from 'axios'
import conf from '../conf/conf';

const API = axios.create({
    baseURL: conf.backendUrl,
    headers: {
        'Content-Type': 'application/json'
    },
});

// Add access tokens to every request automatically
API.interceptors.request.use(
    (config) => {
        // Retrieve the entire authData object from localStorage and parse it
        const authDataString = localStorage.getItem('authData');
        let authData = null;

        if (authDataString) {
            try {
                authData = JSON.parse(authDataString);
            }
            catch (e) {
                console.error(`[API Interceptor] Error parsing authData from localStorage: ${e}`);
                // Optionally clear authData if it's malformed
                localStorage.removeItem('authData');
            }
        }

        const token = authData?.accessToken; // Safely access accessToken from the parsed object

        // console.log(`[API Interceptor] Checking token for URL: ${config.url}`);
        // console.log(`[API Interceptor] authData in localStorage (parsed): ${authData}`); // Log the parsed object
        // console.log(`[API Interceptor] accessToken retrieved for request: ${token}`);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            // console.log(`[API Interceptor] Authorization header set for: ${config.url}`);
        } else {
            console.warn(`[API Interceptor] NO accessToken found in parsed authData for request to: ${config.url}`);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle token refresh on 401 error
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Avoid refreshing token if the failed request was a login attempt
        if (originalRequest.url.includes('/login/')) {
            return Promise.reject(error);
        }

        // Check if the error is 401 (Unauthorized) and token is expired
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            console.warn(`[API Interceptor] 401 Unauthorized caught for ${originalRequest.url}. Attempting token refresh.`);

            try {
                // Retrieve and parse authData again for the refresh token
                const authDataString = localStorage.getItem('authData');
                let authData = null;

                if (authDataString) {
                    try {
                        authData = JSON.parse(authDataString);
                    }
                    catch (e) {
                        console.error(`[API Interceptor] Error parsing authData for refresh from localStorage:${e}`);
                        localStorage.removeItem('authData'); // Clear malformed data
                        window.location.href = '/login/'; // Force logout if refresh data is corrupt
                        return Promise.reject(error);
                    }
                }
                const refreshToken = authData?.refreshToken; // Safely access refreshToken

                // console.log(`[API Interceptor] Refresh token from parsed authData:${refreshToken}`);

                if (!refreshToken) {
                    // console.error('[API Interceptor] No refresh token found in parsed authData! Logging user out.');
                    // debugger; // Keep for testing if needed
                    localStorage.clear();
                    window.location.href = '/login/';
                    return Promise.reject(error);
                }

                // Attempt to refresh the access token
                const res = await axios.post(`${conf.backendUrl}/api/token/refresh/`, {
                    refresh: refreshToken
                });

                // On success, update the stored authData object with the new access token
                const newAccessToken = res.data.access;
                const updatedAuthData = {
                    ...authData, // Preserve userData and existing refreshToken
                    accessToken: newAccessToken // Update only accessToken
                };
                localStorage.setItem('authData', JSON.stringify(updatedAuthData)); // Save the updated object

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                // console.log(`[API Interceptor] Token refreshed successfully. Retrying original request to ${originalRequest.url}`);
                return API(originalRequest);    // Retry original request
            }
            catch (err) {
                console.error(`[API Interceptor] Refresh token failed for ${originalRequest.url}:`, err);
                // debugger; // Keep for testing if needed
                localStorage.clear();
                window.location.href = '/login/';
            }
        }
        return Promise.reject(error);
    }
);

export default API;



// NOTES:

// To handle the situation where the refresh token also expires and automatically log out the user, you can extend the response.use interceptor logic.

// The API instance in api.js takes care of token management, and authApi.js provides the necessary functions for login and registration.