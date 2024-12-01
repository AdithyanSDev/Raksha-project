// src/redux/adminSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
    isAdminLoggedIn: boolean;
    adminToken: string | null; // Allow adminToken to be either string or null
}

const initialState: AdminState = {
    isAdminLoggedIn: false,
    adminToken: null, // Store admin token
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        loginAdmin: (state, action: PayloadAction<string>) => { // Expecting a string payload
            console.log("loginAdmin Reducer Called");
            state.isAdminLoggedIn = true;
            state.adminToken = action.payload; // Set admin token
        },
        logoutAdmin: (state) => {
            state.isAdminLoggedIn = false;
            state.adminToken = null; // Clear admin token
            localStorage.clear();
        },
    },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
