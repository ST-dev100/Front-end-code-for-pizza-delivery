"use client";
import React, { useState, useCallback } from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getAllPizzas } from "@/app/services/api";
import { fetchPizzasPending, fetchPizzasFulfilled, fetchPizzasRejected } from '@/app/features/pizzaSlice';
import { useDispatch } from 'react-redux';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = useCallback(async () => {
    if (!inputValue.trim()) return; // Prevent search for empty input
    dispatch(fetchPizzasPending()); // Optional: Dispatch pending action for loading state
    try {
      console.log("Searching for:", inputValue);
      const res = await getAllPizzas({ pizza_name: inputValue });
      dispatch(fetchPizzasFulfilled(res));
      console.log("Search results:", res);
    } catch (error) {
      console.error("Error fetching pizzas:", error);
      dispatch(fetchPizzasRejected(error)); // Dispatch error handling action if needed
    }
  }, [dispatch, inputValue]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: { xs: '100%', sm: '70%', md: '80%', lg: '100%' },
        maxWidth: '600px',
        backgroundColor: 'white',
        borderRadius: { md: '40px', xs: '20px' },
        padding: { md: '10px 20px', xs: '5px 10px' },
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        margin: '0 auto',
      }}
    >
      <InputBase
        sx={{
          ml: { xs: 1, md: 2 },
          flex: 1,
          fontSize: { xs: '14px', md: '16px' },
        }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
      />
      <IconButton
        type="button"
        sx={{
          backgroundColor: '#FF9800',
          color: 'white',
          '&:hover': { backgroundColor: '#F57C00' },
          padding: { xs: '6px', md: '8px' },
          ml: 1,
        }}
        onClick={handleSearch}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
