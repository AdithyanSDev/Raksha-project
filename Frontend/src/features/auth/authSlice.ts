import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  token: null,
  userId: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.role = action.payload.role;
    },
    tokenRefreshed: (state, action) => {
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
      state.role = null;
    },
  },
});

export const selectAuthUserId = (state:any) => state.auth.userId;
export const selectAuthToken = (state:any) => state.auth.token;

export const { loginSuccess, tokenRefreshed, logout } = authSlice.actions;
export default authSlice.reducer;
