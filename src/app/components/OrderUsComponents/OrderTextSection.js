"use client";
import React from 'react';
import { Box, Typography } from '@mui/material';
import SearchBar from './SearchBar'; // Reuse the SearchBar component here

const OrderTextSection = React.memo(() => { // Use React.memo to prevent unnecessary re-renders
  return (
    <Box
      sx={{
        maxWidth: { sm: '55%', md: "35%" },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '20px', md: '40px' },
        width: { xs: "40%" },
        padding: { xs: "5px" },
        ml: { xs: 0, md: 12 },
        minHeight: { xs: '300px', md: '450px' },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '14px', sm: '36px', md: '50px', lg: '60px', xl: "80px" },
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #FF9800, rgba(233,144,18,0.4674662101168593))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block',
        }}
      >
        Order us
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: '#333',
          fontSize: { xs: '10px', md: '16px' },
        }}
      >
        In publishing and graphic design, Lorem ipsum is a placeholder text
        commonly used to demonstrate the visual form of a document or a typeface
        without.
      </Typography>
      <SearchBar />
    </Box>
  );
});

export default OrderTextSection;
