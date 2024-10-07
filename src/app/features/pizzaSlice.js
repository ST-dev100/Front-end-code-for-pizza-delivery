// features/pizzaSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getAllPizzas } from '../services/api';

const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState: {
    pizzas: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchPizzasPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPizzasFulfilled: (state, action) => {
      state.loading = false;
      state.pizzas = action.payload;
    },
    fetchPizzasRejected: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPizzasPending, fetchPizzasFulfilled, fetchPizzasRejected } = pizzaSlice.actions;

export default pizzaSlice.reducer;
