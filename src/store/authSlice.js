import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginUserApi } from '../api/authApi'

// Load user from localStorage if available
const userFromStorage = JSON.parse(localStorage.getItem('authData'));

const initialState = {
    status: userFromStorage ? true : false,
    userData: userFromStorage || null,
    loading: false,
    error: null,
};

// Thunk to handle login
export const loginUser = createAsyncThunk('auth/loginUser', 
    async (credentials, thunkAPI) => {
        try {
            const data = await loginUserApi(credentials);   // use the function from authApi.js
            return data;
        }
        catch (error) {
            console.error("Axios error:", error);
            // console.log("Backend full error response:", error.response?.data); // Debugging backend error
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed.');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.status = false;
            state.userData = null;
            localStorage.removeItem('authData');
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
            state.userData = action.payload;
            localStorage.setItem('authData', JSON.stringify(action.payload));
        })
        .addCase(loginUser.rejected, (state, action) => {
            // console.log(`Redux rejected payload: ${action.payload}`);
            state.loading = false;
            state.status = false;
            state.error = action.payload;
        })
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;