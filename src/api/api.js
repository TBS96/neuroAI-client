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
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
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
            return Promise.reject(error);   // Don't trigger refresh token for login failures
        }

        // Check if the error is 401 (Unauthorized) and token is expired
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');

                if (!refreshToken) {
                    console.error('No refresh token found! Logging user out.');
                    localStorage.clear();
                    window.location.href = '/login/';
                    return Promise.reject(error);   // Exit early
                }

                // Attempt to refresh the access token
                const res = await axios.post(`${conf.backendUrl}/api/token/refresh/`, {
                    refresh: refreshToken
                });

                // On success, update the access token and retry the request
                const newAccessToken = res.data.access;
                localStorage.setItem('accessToken', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return API(originalRequest);    // Retry original request
            }
            catch (err) {
                console.error(`Refresh token failed`, err);
                localStorage.clear();   // clear all stored tokens
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