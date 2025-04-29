import API from "./api";

// Login fn. to authenticate user
export const loginUser = async (credentials) => {
    try {
        const res = await API.post('/login', credentials);
        return res.data;    // Return the tokens after successful login
    }
    catch (err) {
        console.error(`Login failed: ${err}`);
        throw err;      // Throw error to be caught in the component
    }
};

// Register fn. to register a new user
export const register = async (formData) => {
    try {
        const res = await API.post('/register', formData);
        return res.data;    // Return the response after registration
    }
    catch (err) {
        console.error(`Registration failed: ${err}`);
        throw err;      // Throw error to be caught in the component
    }
};

// Refresh access token using refresh token
export const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token available');

        const res = await API.post('/api/token/refresh/', {refresh: refreshToken});
        // Return the new access token
        return res.data.access;
    }
    catch (err) {
        console.error(`Failed to refresh token: ${err}`);
        throw err;      // Throw error to be handled in API interceptors
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