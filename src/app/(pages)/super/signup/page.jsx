// app/signup/SignUp.js
"use client";

import React,{useState} from "react";
import { Grid, Box, TextField, Typography, Checkbox, Button, FormControlLabel } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import pizza from "@/images/pizzaforSL.png";
import { uploadImageToCloudinary } from "@/app/utils/cloudinary";
import Link from 'next/link'; // Import the Link component from Next.js
import { supersignUp } from "@/app/services/api";
import { toast } from "react-hot-toast";
import { CircularProgress } from "@mui/material"; // Import CircularProgress
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import EmailField from "@/app/components/InputFields/EmailField";
import PasswordField from "@/app/components/InputFields/PasswordField";
import ConfirmPasswordField from "@/app/components/InputFields/ConfirmPasswordField";
import PhoneNumberField from "@/app/components/InputFields/PhoneNumberField";
import RestaurantNameField from "@/app/components/InputFields/RestaurantNameField";
import LocationField from "@/app/components/InputFields/LocationField";

// Zod schema for form validation
const signUpSchema = z.object({
  restaurantName: z.string().nonempty("Restaurant name is required"), 
  adminName: z.string().nonempty("Admin name is required"), 
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
  location: z.string().nonempty("Location is required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  image_url: z.string().nonempty("Image URL is required"), // Add image_url validation
  terms: z.boolean().refine(val => val, { message: "You must accept the terms and conditions" }),
});

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Add loading state
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null); 
  const { control, handleSubmit,reset } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      adminName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      restaurantName: "",
      location: "",
      image_url: "mmkkk", // Include image_url in default values
      terms: false,
    },
  });

  const onSubmit = async (data) => { 
    setLoading(true); // Set loading to true  
    try {
    let imageUrl = imagePreview || '';
    if (imageFile) {
      imageUrl = await uploadImageToCloudinary(imageFile);
    }
    const { confirmPassword,phoneNumber,adminName,restaurantName, ...signUpData } = data; // Remove confirmPassword before sending
    signUpData.phone_number = phoneNumber
    signUpData.roleName = "super-admin"
    signUpData.grantedRole = ["manage all"]
    signUpData.image_url = imageUrl
    signUpData.name = adminName
    signUpData.restaurant_name = restaurantName

    const response = await supersignUp(signUpData); // Call the signup API function
      
      toast.success("user has been succssfully registerd");

      console.log("Signup successful:", response);
    // Handle form submission logic here
     reset(); // Reset the form after successful signup
    router.push('/login'); // Navigate to the super/signup page


    } catch (error) {
      toast.error("Signup error") 
    }
    finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left Image Section */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: "#FFA726",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box component="img" src={pizza.src} alt="Pizza" sx={{ width: "250px" }} />
      </Grid>

      <Grid
        item
        xs={12}
        md={6}

        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, width: "100%" }}>
          <Box display="flex" alignItems="center" mb={3}>
            <Box component="img" src={pizza.src} alt="Pizza Logo" sx={{ width: 40, mr: 1 }} />
            <Typography variant="h5" fontWeight="bold" color="#D84315">
              Pizza
            </Typography>
          </Box>

          <Controller
            name="adminName"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Admin Name"
                fullWidth
                margin="normal"
                placeholder="Super Admin"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputLabelProps={{ shrink: true }} // Keeps the label on the border
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <EmailField field={field} fieldState={fieldState} />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <PasswordField field={field} fieldState={fieldState} />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState }) => (
              <ConfirmPasswordField field={field} fieldState={fieldState} />
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field, fieldState }) => (
              <PhoneNumberField field={field} fieldState={fieldState} />
            )}
          />

          <Controller
            name="restaurantName"
            control={control}
            render={({ field, fieldState }) => (
              <RestaurantNameField field={field} fieldState={fieldState}/>
            )}
          />

          <Controller
            name="location"
            control={control}
            render={({ field, fieldState }) => (
             <LocationField field={field} fieldState={fieldState}/>
            )}
          />

          {/* Image URL Field */}
          <Controller
            name="image_url"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    width: "100%",
                    mt: 2,
                    borderColor: "#FB8C00",
                    color: "#FB8C00",
                    ":hover": { backgroundColor: "#FB8C0033" },
                  }}
                >
                  📤 Upload Logo
                  <input hidden accept="image/*" type="file" onChange={handleImageChange}/>
                </Button>
                {fieldState.error && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {fieldState.error.message}
                  </Typography>
                )}
              </>
            )}
          />
           {/* Image Preview */}
           {imagePreview && (
            <Box mt={2} textAlign="center">
              <Typography variant="body2">Image Preview:</Typography>
              <Box component="img" src={imagePreview} alt="Preview" sx={{ width: "100%", height: "auto" }} />
            </Box>
          )}
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="I accept the Terms and Conditions"
                sx={{ mt: 2 }}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#FB8C00",
              color: "#fff",
              ":hover": { backgroundColor: "#E65100" },
            }}
            disabled={loading} // Disable button when loading
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "SIGN UP"} {/* Show spinner or button text */}
          </Button>


          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            Already have an account?{" "}
            <Link href="/login" passHref>
              <Typography
                component="span"
                sx={{ color: "#FB8C00", textDecoration: "none", cursor: "pointer" }}
              >
                Login
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
