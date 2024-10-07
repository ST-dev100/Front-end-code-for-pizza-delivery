// /components/RestaurantSlider.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Card, CardContent, Avatar, Typography, Box, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import pizza3 from "@/images/admin.jpg";
import pizza4 from "@/images/full.png";

// Dummy Data
const restaurantData = [
  { name: 'Azmera Pizza', orders: '2K', description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used...' },
  { name: 'Azmera Pizza', orders: '2K', description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used...' },
  { name: 'Azmera Pizza', orders: '2K', description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used...' },
  { name: 'Azmera Pizza', orders: '2K', description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used...' },
  { name: 'Azmera Pizza', orders: '2K', description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used...' },
];

const RestaurantCard = React.memo(({ restaurant, isSmallScreen, isMediumScreen }) => {
  return (
    <Card 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: isSmallScreen ? 1 : 2,
        flexGrow: 1,
        maxWidth: isSmallScreen ? '90%' : '100%',
        margin: '0 auto'
      }}
    >
      <Avatar
        src={pizza3.src}
        sx={{
          width: { xs: 30, sm: 48 },
          height: { xs: 30, sm: 48 },
          alignSelf: { xs: 'center', sm: 'flex-start' },
          marginTop: 2
        }}
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography
          variant={isSmallScreen ? 'subtitle1' : 'h6'}
          component="div"
          sx={{ fontSize: isSmallScreen ? '0.9rem' : '1.2rem' }}
        >
          {restaurant.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: isSmallScreen ? '0.75rem' : '0.9rem' }}
        >
          {restaurant.description}
        </Typography>
      </CardContent>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'row', 
          gap: 1, 
          backgroundColor:"#f2f9f2",
          padding: isSmallScreen ? 1 : 2,
          borderRadius: 2,
          marginTop: isSmallScreen ? 2 : 4,
          width: isSmallScreen ? '100%' : '400px',
          alignSelf: isSmallScreen ? 'center' : 'flex-start',
          justifyContent: 'space-between'
        }}
      >
        <Image src={pizza4.src} width={60} height={60} alt="pizza" />
        <Box sx={{ display: 'flex', flexDirection: "column" }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: isSmallScreen ? '0.7rem' : '0.9rem' }}>
            Number of orders
          </Typography>
          <Typography
            variant={isSmallScreen ? 'body1' : isMediumScreen ? 'h6' : 'h4'}
            color="orange"
            sx={{ fontWeight: 'bold' }}
          >
            {restaurant.orders}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
});

const SkeletonRestaurantCard = () => (
  <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, flexGrow: 1, maxWidth: '90%', margin: '0 auto' }}>
    <Skeleton variant="circular" width={48} height={48} />
    <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Skeleton variant="text" width="60%" height={24} />
      <Skeleton variant="text" width="80%" height={16} />
    </CardContent>
  </Card>
);

const RestaurantSlider = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const loading = false;  // Simulate loading state

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Typography variant="h4" component="div" gutterBottom sx={{
          marginBottom: "20px",
          fontWeight: "bold",
          color: "#757575",
        }}>
        Top Restaurants
      </Typography>
      <Swiper
        spaceBetween={10}
        slidesPerView={1.5}
        breakpoints={{
          600: {
            slidesPerView: 1.2,
            spaceBetween: 15,
          },
          900: {
            slidesPerView: 2.3,
            spaceBetween: 20,
          },
        }}
      >
        {loading
          ? Array.from(new Array(3)).map((_, index) => (
              <SwiperSlide key={index}>
                <SkeletonRestaurantCard />
              </SwiperSlide>
            ))
          : restaurantData.map((restaurant, index) => (
              <SwiperSlide key={index}>
                <RestaurantCard restaurant={restaurant} isSmallScreen={isSmallScreen} isMediumScreen={isMediumScreen} />
              </SwiperSlide>
            ))}
      </Swiper>
    </Box>
  );
};

export default RestaurantSlider;
