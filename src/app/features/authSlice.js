"use client";
// features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem('user')) : null, // Load user data from localStorage
  isLoggedIn: !!(typeof window !== "undefined" && localStorage.getItem('user')), // Determine login status
  loading: false,
  error: null,
};
      
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload; // Save user data (e.g., token, user details)
      state.isLoggedIn = true;
      state.loading = false;

      // Save user data to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Save error message
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;

      // Remove user data from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem('user');
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
