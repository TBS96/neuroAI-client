import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginUserApi, registerUserApi } from '../api/authApi'
import API from '../api/api';

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
            // TODO: ask backend team to create endpoints to fetch userdata
            const userProfile = await API.get('/user/profile/');    // get user data
            return {...data, userData: userProfile};
        }
        catch (error) {
            console.error(`Axios error: ${error}`);
            // console.log("Backend full error response:", error.response?.data); // Debugging backend error
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed.');
        }
    }
);

// Thunk to handle register
export const registerUser = createAsyncThunk('auth/registerUser', 
    async (formData, thunkAPI) => {
        try {
            const data = await registerUserApi(formData);
            return data;
        }
        catch (error) {
            console.error(`Registration error: ${error}`);
            console.log(`Backend error response: ${error.response?.data}`);
            return thunkAPI.rejectWithValue(error.response?.data ?? {message: 'Registration Failed'});
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
        // login cases
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
        // register cases
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            console.log(`Redux registerUser payload: ${action.payload}`);

            state.loading = false;
            state.status = true;
            state.userData = action.payload;

            if (action.payload) {
                localStorage.setItem('authData', JSON.stringify(action.payload));
            }
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.status = false;
            state.error = action.payload;
        })
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;