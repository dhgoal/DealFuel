// In /lib/features/auth/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: false,
    isAdmin: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //Currently Im not using setLoggedIn and logged in in general, its useless at the moment
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload; // Directly use the boolean payload
        },
        setAdmin: (state, action) => {
            state.isAdmin = action.payload;
        },
        logOut: (state) => { // Add this reducer for logging out
            state.loggedIn = false;
            state.isAdmin = false;
        },
        // Other reducers...
    },
});

export const { setLoggedIn, setAdmin, logOut } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.loggedIn;
export const selectIsAdmin = (state) => state.auth.isAdmin;

export default authSlice.reducer;
