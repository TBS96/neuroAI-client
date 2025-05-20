import API from "./api";

// Login fn. to authenticate user
export const loginUserApi = async (credentials) => {
    try {
        const res = await API.post('/login/', credentials);
        return {
            access: res.data.access,
            refresh: res.data.refresh,
        };
    }
    catch (err) {
        console.error(`Login failed: ${err}`);
        const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
        const customError = new Error(message);
        customError.response = err.response;
        throw customError;
    }
};

// Register fn. to register a new user
export const registerUserApi = async (formData) => {
    try {
        const res = await API.post('/register/', formData);
        return res.data;    // Return the response after registration
    }
    catch (err) {
        console.error(`Registration failed: ${err}`);

        const message = err.response?.data?.message || 'Registration failed. Please try again';
        const customError = new Error(message);
        customError.response = err.response;
        throw customError;      // Throw error to be caught in the component
    }
};

// Refresh access token fn. using refresh token
export const refreshAccessToken = async () => {

    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
        console.warn('No refresh token found! Skipping refresh request.');
        return null;
    }

    try {
        const res = await API.post('/api/token/refresh/', { refresh: refreshToken });
        // Return the new access token
        return res.data.access;
    }
    catch (err) {
        console.error("Failed to refresh token:", err.response?.data?.message || err.message);
        return null;
    }
};

// FetchUserProfile fn. to fetch userdata
export const fetchUserProfileApi = async (accessToken) => {
    try {
        // console.log("fetchUserProfileApi called with token:", accessToken);
        const res = await API.get('/register/', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        // console.log(`User profile response: ${res.data}`);
        return res.data;
    }
    catch (err) {
        console.error(`Failed to fetch user profile: ${err.response?.data?.message || err.message}`);
        throw err;
        // return null;
    }
};

// Logout fn. to invalidate user session
export const logoutUserApi = async (refreshToken) => {
    try {
        const res = await API.post('/logout/', {
            refresh: refreshToken,
        });
        return res.data;
    }
    catch (err) {
        console.error(`Logout failed: ${err}`);
        const message = err.response?.data?.message || 'Logout failed. Please try again';
        throw new Error(message);
    }
};

// Password Reset request API
export const requestPasswordResetApi = async (email) => {
    try {
        const res = await API.post('/password_reset/', { email });
        return res.data;
    }
    catch (err) {
        console.error(`Password reset request failed: ${err}`);
        const message = err.response?.data?.message || 'Password reset request failed. Please try again';
        const customError = new Error(message);
        customError.response = err.response;
        throw customError;
    }
};

// Confirm Password reset API
export const confirmPasswordResetApi = async ({ token, password, confirmPassword }) => {
    try {
        const res = await API.post(`/password_reset/confirm/${token}/`, { password, confirmpassword: confirmPassword });
        return res.data;
    }
    catch (err) {
        console.error(`Password reset request failed: ${err}`);
        const message = err.response?.data?.message || 'Password reset request failed. Please try again';
        const customError = new Error(message);
        customError.response = err.response;
        throw customError;
    }
};





// Key Changes and Notes:

// 1. Login (loginUser):

// - This function now uses the API instance created in api.js for authentication.

// - The credentials parameter is passed directly to API.post('/login').

// - On success, the JWT tokens (both access and refresh) will be returned.


// 2. Register (registerUser):

// - The endpoint for registration is /register (corrected from /regiser).

// - This sends the registration form data and handles errors.


// 3. Token Refresh (refreshAccessToken):

// - A new helper function to manually refresh the access token using the stored refresh token. This would typically be used when the token refresh process fails and is handled by the interceptor in api.js.

// - If the refresh token is missing or expired, an error is thrown.


// How it fits into your app:
// The loginUser function is called when the user submits login credentials in the UI. The API instance will manage sending the tokens and refreshing them when needed.

// If the accessToken expires, the API interceptors handle the refresh mechanism automatically. If the refresh token also expires, the user will be logged out and redirected to the login page.

// You can now use loginUser, registerUser, and refreshAccessToken throughout your application to manage authentication.