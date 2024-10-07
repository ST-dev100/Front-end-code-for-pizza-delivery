// app/login/Login.js
"use client";

import React,{useState,useEffect} from "react";
import { Grid, Box, TextField, Typography, Button, FormControlLabel, Checkbox } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import pizza from "@/images/pizzaforSL.png";
import Link from "next/link"; // Import the Link component from Next.js
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import { login } from "@/app/services/api";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-hot-toast";
import { loginSuccess, logout } from '../../features/authSlice';
import { CircularProgress } from "@mui/material";

// Zod schema for form validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

const Login = () => {
  const [loading, setLoading] = useState(false); // Add loading state
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email:"",
      password:"",
      rememberMe:false
    }
  });
  const router = useRouter(); 
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await login(data); // Call the login function with form data (email, password)
      toast.success("Login successful");
      console.log("Login successful:", result); 
      
      dispatch(loginSuccess(result.user));
      
      // Redirect based on user role immediately
      const redirectPath = result.user.roleName === "user" ? "/" : "/admin";
      router.push(redirectPath); // Redirect immediately based on role
      
    } catch (error) {
      toast.error("Login failed");
      console.error("Login failed:", error.message);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };
  
  useEffect(() => {
    router.prefetch('/signup'); // Preload the signup page
  }, [router]);
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

      {/* Right Form Section */}
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

          {/* Email Field */}
          <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Email address" // Label displayed above the border
                  placeholder="simontamene.dev@gmail.com" // Example text inside the field
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }} // Keeps the label on the border
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
          />

          {/* Password Field */}
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                fullWidth
                margin="normal"
                placeholder="******"
                InputLabelProps={{ shrink: true }} // Keeps the label on the border
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          {/* Remember Me Checkbox */}
          <Controller
            name="rememberMe"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Remember me"
                sx={{ mt: 2 }}
              />
            )}
          />

          {/* Submit Button */}
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
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"} {/* Show spinner or button text */}
          </Button>

          {/* Redirect to Signup */}
          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            Don't have an account?{" "}
            <Link href="/signup" style={{ color: "#FB8C00", textDecoration: "none" }}>
              Signup
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
