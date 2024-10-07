"use client";
import React,{ useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  IconButton,
  TextField,
  Button,
  Card,
  CardMedia,
  CardContent,
  Modal,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/system';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useParams } from 'next/navigation';
import { getSinglePizza, createOrder } from "@/app/services/api";
import { toast } from "react-hot-toast";
import 'swiper/css';
import pizza2 from "@/images/PizzaGrid.png";
// Sample Pizza Data
const pizzaData = Array(6).fill({
  name: 'Margherita',
  description: 'Tomato, Mozzarella, Bell Peppers, Onions, Olives',
  price: '150',
  restaurant: 'Azmera Pizza',
  imgSrc: 'https://via.placeholder.com/150', // Replace with actual pizza image
  avatarSrc: 'https://via.placeholder.com/40', // Replace with actual avatar
});

// Styled Checkbox with orange color
const OrangeCheckbox = (props) => (
  <Checkbox
    {...props}
    sx={{
      color: 'orange',
      '&.Mui-checked': {
        color: 'orange',
      },
    }}
  />
);

// FormContainer for organizing checkboxes in grid layout
const FormContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
});

const PizzaCard = React.memo(({ pizza }) => (
  <Card sx={{ width: '100%', padding: 2, borderRadius: 2 }}>
    <CardMedia
      component="img"
      image={pizza2.src}
      alt={pizza.name}
      sx={{ borderRadius: '50%', width: 150, height: 150, margin: '0 auto' }}
    />
    <CardContent>
      <Typography variant="h6" component="div">{pizza.name}</Typography>
      <Typography variant="body2" color="text.secondary">{pizza.description}</Typography>
    </CardContent>
  </Card>
));

const PizzaOrder = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedToppings, setSelectedToppings] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pizza = await getSinglePizza(id);
        setData(pizza);
      } catch (error) {
        console.error("Error fetching pizza:", error.message);
      }
    };
    fetchData();
  }, [id]);

  const handleQuantityChange = (increment) => {
    setQuantity((prev) => Math.max(prev + increment, 1));
  };

  const handleOrderClick = async () => {
    const checkedToppings = Object.keys(selectedToppings).filter(topping => selectedToppings[topping]);
    try {
      setLoading(true);
      await createOrder({ name: data?.pizza_name, topping: checkedToppings, quantity, pizza_id: id });
      setOpenModal(true);
    } catch (error) {
      toast.error("Order failed");
    } finally {
      setLoading(false);
    }
  };

  const handleToppingChange = (topping) => {
    setSelectedToppings(prev => ({ ...prev, [topping]: !prev[topping] }));
  };

  return (
    <div style={{ background: "linear-gradient(to bottom, white, rgba(252,176,69,0.42), rgba(252,176,69,0.42))", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ padding: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexGrow: 2, flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: "center", gap: 2 }}>
            <img src={data?.pizza_url} alt={data?.pizza_name} style={{ width: '350px', borderRadius: '50%' }} />
            <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, gap: 1, mt: 2 }}>
              <img src={data?.pizza_url} alt="Pizza Thumbnail" style={{ width: "150px" }} />
              <img src={data?.pizza_url} alt="Pizza Thumbnail" style={{ width: "150px" }} />
            </Box>
          </Box>
          <Box sx={{ margin: 4 }}>
            <Typography variant="h4" fontWeight="bold">{data?.pizza_name}</Typography>
            <FormContainer>
              {data?.topping?.map((topping, index) => (
                <Box key={index}>
                  <OrangeCheckbox checked={!!selectedToppings[topping]} onChange={() => handleToppingChange(topping)} />
                  {topping}
                </Box>
              ))}
            </FormContainer>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
              <IconButton onClick={() => handleQuantityChange(-1)}><RemoveIcon /></IconButton>
              <TextField size="small" value={quantity} sx={{ width: '40px', textAlign: 'center' }} disabled />
              <IconButton onClick={() => handleQuantityChange(1)}><AddIcon /></IconButton>
              <Typography variant="h5" fontWeight="bold">{data?.price * quantity} Birr</Typography>
            </Box>
            <Button variant="contained" sx={{ backgroundColor: '#ff6600', color: '#fff', fontWeight: 'bold', mt: 3, borderRadius: '10px', paddingX: 3, paddingY: 1, width: "100%" }} onClick={handleOrderClick} disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "Order"}
            </Button>
          </Box>
        </Box>
      </Box>

      <Modal open={openModal} onClose={() => setOpenModal(false)} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2, textAlign: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: 'green', marginBottom: 2 }} />
          <Typography id="modal-description" variant="h6" sx={{ color: 'green', fontWeight: 'bold' }}>
            Your order has been successfully completed!
          </Typography>
        </Box>
      </Modal>

      <Box sx={{ width: '100%', padding: 4 }}>
        <Typography variant="h4" component="div" gutterBottom>Related</Typography>
        <Swiper
          spaceBetween={20}
          slidesPerView={3.5}
          breakpoints={{
            320: { slidesPerView: 1.5, spaceBetween: 10 },
            640: { slidesPerView: 2.5, spaceBetween: 15 },
            1024: { slidesPerView: 3.5, spaceBetween: 20 },
          }}
        >
          {pizzaData.map((pizza, index) => (
            <SwiperSlide key={index}>
              <PizzaCard pizza={pizza} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </div>
  );
};

export default PizzaOrder;
