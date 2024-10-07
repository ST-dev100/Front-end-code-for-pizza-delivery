// app/signup/SignUp.js
"use client";

import React, { useState } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import pizza from "@/images/pizzaforSL.png";
import { signUp } from "@/app/services/api";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from 'next/link';
import EmailField from '@/app/components/InputFields/EmailField';
import PasswordField from '@/app/components/InputFields/PasswordField';
import ConfirmPasswordField from '@/app/components/InputFields/ConfirmPasswordField';
import LocationField from '@/app/components/InputFields/LocationField';
import PhoneNumberField from '@/app/components/InputFields/PhoneNumberField';
import TermsCheckbox from '@/app/components/InputFields/TermsCheckbox';

// Zod schema for form validation
const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
  location: z.string().nonempty("Location is required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  terms: z.boolean().refine(val => val, { message: "You must accept the terms and conditions" }),
});

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { confirmPassword, phoneNumber, ...signUpData } = data;
      signUpData.phone_number = phoneNumber;
      signUpData.roleName = "user";
      signUpData.grantedRole = ["order"];
      const response = await signUp(signUpData);
      
      toast.success("User has been successfully registered");
      reset();
      router.push('/login');
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Signup error:", error.message);
    } finally {
      setLoading(false);
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
            name="location"
            control={control}
            render={({ field, fieldState }) => (
              <LocationField field={field} fieldState={fieldState} />
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
            name="terms"
            control={control}
            render={({ field, fieldState }) => (
              <TermsCheckbox field={field} fieldState={fieldState} />
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
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "SIGN UP"}
          </Button>

          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#FB8C00", textDecoration: "none" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
