// src/redux/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  token: null,
  userId: null, // Add userId here
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log("loginSuccess Reducer Called");
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId; // Store userId
      state.role = action.payload.role;
    },
    tokenRefreshed: (state, action) => {
      state.token = action.payload.token;
    },
    refreshSuccess: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null; // Clear userId on logout
      state.role = null;
    },
  },
});

export const { loginSuccess,tokenRefreshed, logout } = authSlice.actions;
export default authSlice.reducer;
