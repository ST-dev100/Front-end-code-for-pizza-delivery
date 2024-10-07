// Logo.jsx
"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import pizzaSlice from "@/images/pizza-slice.png";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Logo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Image
        src={pizzaSlice}
        alt="Pizza"
        width={isMobile ? 40 : 60}
        height={isMobile ? 40 : 60}
      />
      <Typography
        variant="h6"
        sx={{
          color: "#ce602f",
          fontWeight: "bold",
          marginLeft: 1,
          fontSize: { sm: "16px", md: "20px", lg: "30px" },
        }}
      >
        Pizza
      </Typography>
    </Box>
  );
};

export default Logo;
