import { useState, useMemo } from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography, CircularProgress } from '@mui/material';
import { Add, CloudUpload } from '@mui/icons-material';
import { styled } from '@mui/system';
import { createPizza } from '@/app/services/api'; 
import { uploadImageToCloudinary } from "@/app/utils/cloudinary";
import { toast } from "react-hot-toast";
import { defineAbilitiesFor } from "../CASL/defineAbilities";
import { useSelector } from "react-redux";

const FormContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '16px',
  '@media (max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
});

const initialMenuState = {
  name: '',
  price: '',
  toppings: {
    Mozzarella: false,
    Tomato: false,
    'Bell Peppers': false,
    Onions: false,
    Olives: false,
  },
  customTopping: '',
  pizzaPhoto: '',
};

export default function AddMenuForm() {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const ability = useMemo(() => defineAbilitiesFor(user), [user]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null); 
  const [menu, setMenu] = useState(initialMenuState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMenu((prev) => ({ ...prev, [name]: value }));
  };

  const handleToppingChange = (event) => {
    const { name, checked } = event.target;
    setMenu((prev) => ({
      ...prev,
      toppings: {
        ...prev.toppings,
        [name]: checked,
      },
    }));
  };

  const handleAddCustomTopping = () => {
    if (menu.customTopping) {
      setMenu((prev) => ({
        ...prev,
        toppings: {
          ...prev.toppings,
          [menu.customTopping]: true,
        },
        customTopping: '',
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setMenu(initialMenuState);
    setImagePreview(null);
    setImageFile(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const imageUrl = imageFile ? await uploadImageToCloudinary(imageFile) : imagePreview || '';
      await createPizza({ ...menu, pizzaPhoto: imageUrl });
      toast.success("Successfully created");
      resetForm();
    } catch (error) {
      console.error("Error creating pizza:", error.message);
      toast.error("Failed to create pizza.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        padding: 3,
        backgroundColor: 'white',
        borderRadius: 2,
        maxWidth: 600,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h5">Add Menu</Typography>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        name="name"
        value={menu.name}
        onChange={handleInputChange}
      />
      <Typography variant="h6">Topping</Typography>
      <FormContainer>
        {Object.keys(menu.toppings).map((topping) => (
          <FormControlLabel
            key={topping}
            control={
              <Checkbox
                checked={menu.toppings[topping]}
                onChange={handleToppingChange}
                name={topping}
              />
            }
            label={topping}
          />
        ))}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            label="Topping name"
            variant="outlined"
            size="small"
            value={menu.customTopping}
            onChange={(e) => setMenu((prev) => ({ ...prev, customTopping: e.target.value }))}
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddCustomTopping}
            sx={{ backgroundColor: 'orange' }}
          >
            Add
          </Button>
        </Box>
      </FormContainer>
      <TextField
        label="Price"
        variant="outlined"
        fullWidth
        name="price"
        value={menu.price}
        onChange={handleInputChange}
      />
      <Button
        variant="outlined"
        component="label"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          borderRadius: '8px',
          border: '2px dashed orange',
          color: 'orange',
          width: '100%',
          fontWeight: 'bold',
        }}
      >
        <CloudUpload sx={{ color: 'orange' }} />
        Upload Pizza Photo
        <input hidden type="file" onChange={handleImageChange} />
      </Button>
      {imagePreview && (
        <Box mt={2} textAlign="center">
          <Box
            component="img"
            src={imagePreview}
            alt="Preview"
            sx={{ width: '100%', height: 'auto' }}
          />
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{
          backgroundColor: 'orange',
          padding: '12px 0',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          textTransform: 'none',
          color: 'white',
          width: '100%',
        }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
      </Button>
    </Box>
  );
}
