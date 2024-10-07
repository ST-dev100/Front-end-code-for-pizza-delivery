// PizzaSlider.js
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Typography, Box, Skeleton } from '@mui/material';
import PizzaCard from './PizzaCardForSlider';
import { getAllPizzas } from "@/app/services/api";
import { useDispatch} from 'react-redux';

const PizzaSlider = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pizzas = await getAllPizzas();
        setData(pizzas);
      } catch (error) {
        console.error("Error fetching pizzas:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ width: '100%', padding: { xs: 2, sm: 4 } }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mb: 2,
          fontWeight: 'bold',
          color: '#757575',
          textAlign: { xs: 'center', sm: 'left' },
          fontSize: { xs: '1.5rem', sm: '2rem' },
        }}
      >
        Fasting
      </Typography>
      <Swiper
        spaceBetween={20}
        slidesPerView={3.5}
        breakpoints={{
          320: { slidesPerView: 1.5, spaceBetween: 10 },
          640: { slidesPerView: 2.5, spaceBetween: 15 },
          1024: { slidesPerView: 3.5, spaceBetween: 20 },
        }}
      >
        {(loading ? Array.from(new Array(4)) : data).map((pizza, index) => (
          <SwiperSlide key={index} style={{ flexGrow: 1 }}>
            <PizzaCard pizza={pizza} isLoading={loading} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default PizzaSlider;
