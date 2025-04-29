import { createSlice } from '@reduxjs/toolkit'

// Load user from localStorage if available
const userFromStorage = JSON.parse(localStorage.getItem('authData'));

const initialState = {
    status: userFromStorage ? true : false,
    userData: userFromStorage || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            localStorage.setItem('authData', JSON.stringify(action.payload.userData));
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            localStorage.removeItem('authData');
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;