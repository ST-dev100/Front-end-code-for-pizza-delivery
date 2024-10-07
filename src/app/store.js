// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice'; // Adjust the path based on your folder structure
import pizzaReducer from './features/pizzaSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth slice
    pizzas: pizzaReducer,
  },
});

export default store;
