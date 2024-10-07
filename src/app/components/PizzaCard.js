import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, Avatar, Divider, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPizzasPending, fetchPizzasFulfilled, fetchPizzasRejected } from '../features/pizzaSlice';
import pizza2 from "@/images/PizzaGrid.png";
import { getAllPizzas } from "@/app/services/api";

// Single pizza card component
const PizzaCard = ({ pizza }) => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  const handleOrderClick = () => {
    if (user) {
      router.push(`/order/${pizza.uuid}`);
    } else {
      router.push('/login');
    }
  };

  const handleMouseEnter = () => {
    if (user) {
      router.prefetch(`/order/${pizza.uuid}`);
    }
  };

  return (
    <Card sx={{ borderRadius: 2, padding: 2, flexGrow: 1 }}>
      <CardMedia
        component="img"
        image={pizza2.src}
        alt={pizza.name}
        sx={{
          borderRadius: '50%',
          objectFit: 'cover',
          margin: '0 auto',
          width: { xs: '150px', sm: '200px', md: '250px' }
        }}
      />
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
          {pizza.pizza_name}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {pizza.topping.map((topping, index) => (
            <Typography key={index} variant="body2" color="text.secondary">
              {topping}{index < pizza.topping.length - 1 && ','}
            </Typography>
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
          <Typography variant="h6" color="green" sx={{ fontSize: '20px', fontWeight: "bold" }}>
            {pizza.price}<sup style={{ fontSize: '14px' }}> Birr</sup>
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#FF8C00', color: '#fff', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
            onClick={handleOrderClick}
            onMouseEnter={handleMouseEnter}
          >
            Order
          </Button>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", marginTop: 2 }}>
          <Avatar src={pizza.image_url} alt={pizza.restaurant_name} sx={{ width: 30, height: 30 }} />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>{pizza.restaurant_name}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

// Skeleton card component for loading state
const SkeletonCard = () => (
  <Card sx={{ borderRadius: 2, padding: 2, flexGrow: 1 }}>
    <Skeleton variant="circular" width={150} height={150} sx={{ margin: '0 auto' }} />
    <CardContent>
      <Skeleton variant="text" width="60%" height={30} />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
        <Skeleton variant="text" width="20%" />
        <Skeleton variant="text" width="20%" />
        <Skeleton variant="text" width="20%" />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
        <Skeleton variant="text" width="30%" height={30} />
        <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: 1 }} />
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", marginTop: 2 }}>
        <Skeleton variant="circular" width={30} height={30} />
        <Skeleton variant="text" width="40%" />
      </Box>
    </CardContent>
  </Card>
);

// Main grid component for pizza cards
const PizzaGrid = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { pizzas, loading } = useSelector((state) => state.pizzas);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchPizzasPending());
      try {
        const fetchedPizzas = await getAllPizzas();
        dispatch(fetchPizzasFulfilled(fetchedPizzas));
      } catch (error) {
        dispatch(fetchPizzasRejected(error.message));
        console.error("Error fetching pizzas:", error.message);
      }
    };

    fetchData();
  }, [dispatch]);

  const skeletonArray = isSmallScreen ? 1 : isMediumScreen ? 2 : 3;

  return (
    <Box sx={{ padding: 2, flexGrow: 1 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: '1.8rem', sm: '2rem' },
          fontWeight: "bold",
          color: "#757575",
          textAlign: { xs: 'center', md: 'left' }
        }}
      >
        Popular Pizzas
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: isSmallScreen
            ? 'repeat(1, 1fr)'
            : isMediumScreen
              ? 'repeat(2, 1fr)'
              : 'repeat(3, 1fr)',
          gap: 4,
          marginTop: 4,
          padding: { xs: 1, sm: 2, md: 4 }
        }}
      >
        {loading && pizzas.length === 0
          ? Array.from(new Array(skeletonArray * 3)).map((_, index) => <SkeletonCard key={index} />)
          : pizzas.map((pizza, index) => <PizzaCard key={index} pizza={pizza} />)
        }
      </Box>
    </Box>
  );
};

export default PizzaGrid;
