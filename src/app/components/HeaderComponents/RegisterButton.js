import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const RegisterButton = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/super/signup'); // Prefetch the signup page
  }, [router]);

  const handleRegisterClick = () => {
    router.push('/super/signup'); // Navigate to the super/signup page
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2 }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#FF8C00",
          color: "white",
          borderRadius: "5px",
          fontWeight: "bold",
          padding: "10px 40px",
          fontSize: { sm: "14px", md: "16px", lg: "20px" },
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#FF7300",
          },
        }}
        onClick={handleRegisterClick}
      >
        Register
      </Button>
    </Box>
  );
};

export default RegisterButton;
