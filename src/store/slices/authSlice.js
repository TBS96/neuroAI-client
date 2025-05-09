import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUserApi, loginUserApi, fetchUserProfileApi, logoutUserApi, requestPasswordResetApi, confirmPasswordResetApi } from '../../api/authApi'

// Load user from localStorage if available
const userFromStorage = JSON.parse(localStorage.getItem('authData'));

// Initial state
const initialState = {
    accessToken: userFromStorage?.accessToken || null,
    refreshToken: userFromStorage?.refreshToken || null,
    status: !!userFromStorage, // Simplified status
    userData: userFromStorage?.userData || null, // Ensure userData is 'at least' an empty object
    loading: false,
    error: null,
};

// Thunk to handle login & fetch user data
export const loginUser = createAsyncThunk('auth/loginUser',
    async (credentials, thunkAPI) => {
        try {
            const data = await loginUserApi(credentials);
            let userProfile = null;
            if (data.access) {
                userProfile = await fetchUserProfileApi(data.access);
                // console.log(`Fetched user profile: ${JSON.stringify(userProfile)}`);
            }
            return { accessToken: data.access, refreshToken: data.refresh, userData: userProfile || null }
        }
        catch (error) {
            console.error(`Login failed: ${error}`);
            console.log("Backend full error response:", error.response?.data);
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed.');
        }
    }
);

// Thunk to handle registration
export const registerUser = createAsyncThunk('auth/registerUser',
    async (formData, thunkAPI) => {
        try {
            const res = await registerUserApi(formData);

            // If the backend only returns a message:
            if (res?.message === "User created successfully") {
                const mockUserProfile = {
                    name: formData.name,
                    email: formData.email,
                    phone_number: formData.phone_number,
                    dob: formData.dob,
                    age: formData.age,
                    address: formData.address,
                    occupation: formData.occupation,
                };

                return {
                    accessToken: null,
                    refreshToken: null,
                    userData: mockUserProfile,
                };
            }
            else {
                return thunkAPI.rejectWithValue(res?.message || 'Registration failed');
            }
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

// Thunk to logout user
export const logoutUser = createAsyncThunk('auth/logoutUser',
    async (refreshToken, { rejectWithValue }) => {
        try {
            await logoutUserApi(refreshToken);     // Backend logout
            return true;
        }
        catch (error) {
            return rejectWithValue(`Logout failed: ${error.message}`);
        }
    }
);

// Thunk to handle Password reset request
export const requestPasswordReset = createAsyncThunk('auth/requestPasswordReset',
    async (email, { rejectWithValue }) => {
        try {
            const data = await requestPasswordResetApi(email);
            return data;     // You can return any data you need from the backend response
        }
        catch (error) {
            console.error(`Password reset request failed: ${error}`);
            return rejectWithValue(error.message || 'Password reset failed');
        }
    }
);



// Auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.userData = null;
            state.status = false;
            state.error = null;
            localStorage.removeItem('authData');
        },
        resetError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // REGISTER USER
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log(`Redux registerUser payload: ${JSON.stringify(action.payload, null, 2)}`);

                state.loading = false;
                state.status = true;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.userData = action.payload.userData;

                const authData = {
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                    userData: action.payload.userData,
                };

                if (action.payload) {
                    localStorage.setItem('authData', JSON.stringify(authData));
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.status = false;
                state.error = action.payload || "Registration failed";
            })

            // LOGIN USER
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.userData = action.payload.userData;

                const authData = {
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                    userData: action.payload.userData,
                };

                localStorage.setItem('authData', JSON.stringify(authData));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.status = false;
                state.error = action.payload || "Login failed";
            })

            // LOGOUT USER
            .addCase(logoutUser.fulfilled, (state) => {
                // Clear state on successful backend logout
                state.accessToken = null;
                state.refreshToken = null;
                state.userData = null;
                state.status = false;
                state.error = null;
                localStorage.removeItem('authData');
            })

            //  IF BACKEND FAILS, STILL LOGOUT FRONTEND
            .addCase(logoutUser.rejected, (state) => {
                console.warn('Backend logout failed. Forcing frontend logout.');
                state.accessToken = null;
                state.refreshToken = null;
                state.userData = null;
                state.status = false;
                state.error = null;
                localStorage.removeItem('authData');
            })

            // PASSWORD RESET REQUEST
            .addCase(requestPasswordReset.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(requestPasswordReset.fulfilled, (state, action) => {
                state.loading = false;
                // You can handle the response as needed. For now, we just log the success.
                console.log(`Password reset requested successfully: ${action.payload}`);
            })
            .addCase(requestPasswordReset.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Password reset request failed';
            })
    }
});

export const { logout, resetError } = authSlice.actions;
export default authSlice.reducer;