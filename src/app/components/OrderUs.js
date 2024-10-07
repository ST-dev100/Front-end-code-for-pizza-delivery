"use client";
import React from 'react';
import { Box } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import Image from 'next/image';
import pizza from '@/images/pizza.png';
import { useTheme } from '@mui/material/styles';
import OrderTextSection from './OrderUsComponents/OrderTextSection';

const OrderUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // Adjusted to check for desktop

  // Define responsive image size based on device
  const imageSize = isMobile
    ? { width: 250, height: 400 }
    : isTablet
    ? { width: 350, height: 500 }
    : isDesktop
    ? { width: 450, height: 600 }
    : { width: 750, height: 800 };

  // Styles for the main container and image container
  const containerStyle = {
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    minHeight: { xs: '400px', md: '800px' },
  };

  const imageStyle = {
    position: 'absolute',
    right: { xs: '-20px' },
    top: '40%',
    transform: 'translateY(-40%)',
  };

  return (
    <Box sx={containerStyle}>
      <OrderTextSection />
      <Box sx={imageStyle}>
        <Image
          src={pizza}
          alt="Delicious Pizza"
          width={imageSize.width}
          height={imageSize.height}
          loading={isDesktop ? "eager" : "lazy"} // Set loading based on screen size
          priority={isDesktop} // Only set priority for desktop
        />
      </Box>
    </Box>
  );
};

export default OrderUs;
