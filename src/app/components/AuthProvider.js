// components/AuthProvider.js
"use client";

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/authSlice';

const AuthProvider = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch(loginSuccess(user)); // Dispatch login success with user data
    }
  }, [dispatch]);

  return null; // This component doesn't render anything
};

export default AuthProvider;