// PizzaCard.js
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, Avatar, Skeleton } from '@mui/material';
import pizza2 from "@/images/PizzaGrid.png";
import pizza3 from "@/images/admin.jpg";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';

const PizzaCardForSlider= React.memo(({ pizza, isLoading }) => {
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
    <Card sx={{ width: '100%', padding: { xs: 1, sm: 2 }, borderRadius: 2, flexGrow: 1, boxShadow: 2 }}>
      {isLoading ? (
        <Skeleton variant="circular" width={150} height={150} sx={{ margin: '0 auto' }} />
      ) : (
        <CardMedia
          component="img"
          image={pizza2.src}
          alt={pizza.name}
          sx={{ borderRadius: '50%', width: { xs: 100, sm: 150 }, height: { xs: 100, sm: 150 }, margin: '0 auto' }}
        />
      )}
      <CardContent>
        {isLoading ? (
          <Skeleton variant="text" width="60%" sx={{ margin: '0 auto' }} />
        ) : (
          <Typography variant="h6" component="div" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            {pizza.pizza_name}
          </Typography>
        )}
        {isLoading ? (
          <Skeleton variant="text" width="80%" sx={{ margin: '0 auto' }} />
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontSize: { xs: '0.85rem', sm: '1rem' } }}>
            {pizza.topping.join(', ')}
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          {isLoading ? (
            <Skeleton variant="rectangular" width={50} height={30} />
          ) : (
            <Typography variant="h6" color="green" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              {pizza.price} Birr
            </Typography>
          )}
          {isLoading ? (
            <Skeleton variant="rectangular" width={60} height={30} />
          ) : (
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#FF8C00',
                color: '#fff',
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                padding: { xs: '4px 8px', sm: '6px 12px' },
              }}
              onClick={handleOrderClick}
              onMouseEnter={handleMouseEnter}
            >
              Order
            </Button>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <Avatar src={pizza3.src} alt={pizza.restaurant_name} sx={{ width: 40, height: 40 }} />
          )}
          {isLoading ? (
            <Skeleton variant="text" width="40%" sx={{ ml: 1 }} />
          ) : (
            <Typography variant="body2" sx={{ ml: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
              {pizza.restaurant_name}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
});

export default PizzaCardForSlider;
