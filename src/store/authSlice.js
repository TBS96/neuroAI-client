import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchUserProfileApi, loginUserApi, registerUserApi } from '../api/authApi'

// Load user from localStorage if available
const userFromStorage = JSON.parse(localStorage.getItem('authData'));

const initialState = {
    accessToken: userFromStorage?.accessToken || null,
    refreshToken: userFromStorage?.refreshToken || null,
    status: !!userFromStorage, // Simplified status
    userData: userFromStorage?.userData || null, // Ensure userData is *at least* an empty object
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

// Thunk to handle register
// export const registerUser = createAsyncThunk('auth/registerUser',
//     async (formData, thunkAPI) => {
//         try {
//             const res = await registerUserApi(formData);
//             console.log("Full response from registerUserThunk:", res);
//             if (res.data) {
//                 console.log("Register API Response:", JSON.stringify(res.data));
//                 return res.data;
//             }
//             return thunkAPI.rejectWithValue(res.message || { message: 'Registration Failed' });
//         }
//         catch (error) {
//             console.error(`Registration error: ${error}`);
//             console.log(`Backend error response: ${error.response?.data}`);
//             return thunkAPI.rejectWithValue(error.response?.data ?? { message: 'Registration Failed' });
//         }
//     }
// );

// Thunk to handle register
export const registerUser = createAsyncThunk('auth/registerUser',
    async (formData, thunkAPI) => {
        try {
            const res = await registerUserApi(formData);
            // console.log("Full response from registerUserApi:", res);
            if (res.data) {
                // return res.data;
                return {
                    name: formData.name,
                    email: formData.email,
                    phone_number: formData.phone_number,
                    dob: formData.dob,
                    age: formData.age,
                    address: formData.address,
                    occupation: formData.occupation,
                    password: formData.password
                };
            }
            return { message: res.message };
        }
        catch (error) {
            console.error(`Registration error: ${error}`);
            console.log(`Backend error response: ${error.response?.data}`);
            return thunkAPI.rejectWithValue(error.response?.data ?? { message: 'Registration Failed' });
        }
    }
);




const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
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
                // console.log(`Storing userdata in redux: ${JSON.stringify(action.payload.userData)}`)
                state.loading = false;
                state.status = true;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.userData = action.payload.userData || null; //changed
                const authData = {
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                    userData: action.payload.userData,
                };
                localStorage.setItem('authData', JSON.stringify(authData));
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
                console.log(`Redux registerUser payload: ${JSON.stringify(action.payload, null, 2)}`);

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