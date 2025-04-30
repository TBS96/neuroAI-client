import API from "./api";

// Login fn. to authenticate user
export const loginUserApi = async (credentials) => {
    try {
        const res = await API.post('/login/', credentials);
        return res.data;    // Return the tokens after successful login
    }
    catch (err) {
        console.error(`Login failed: ${err}`);

        // Normalize and rethrow a more informative error
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

// Refresh access token using refresh token
export const refreshAccessToken = async () => {

    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
        console.warn('No refresh token found! Skipping refresh request.');
        return null;
    }

    try {
        const res = await API.post('/api/token/refresh/', {refresh: refreshToken});
        // Return the new access token
        return res.data.access;
    }
    catch (err) {
        console.error("Failed to refresh token:", err.response?.data?.message || err.message);
        return null;
    }
};

// Logout fn. to invalidate user session
export const logoutUserApi = async () => {
    try {
        const res = await API.post('/logout/');
        return res.data;
    }
    catch (err) {
        console.error(`Logout failed: ${err}`);
        const message = err.response?.data?.message || 'Logout failed. Please try again';
        throw new Error(message);
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