// NavLinks.jsx
"use client";
import React from "react";
import { Box, Button } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const NavLinks = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Stack buttons vertically on small screens
        justifyContent: isMobile ? "center" : "space-evenly", // Center on mobile, space evenly on larger screens
        flexGrow: 2,
        mx: { xs: 2, md: 5 }, // Adjust horizontal margins for smaller screens
        gap: 1, // Add gap between buttons
      }}
    >
      <Button
        sx={{
          color: "#FF8C00",
          fontWeight: "bold",
          fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "20px" }, // Smaller font size on mobile
          width: isMobile ? "100%" : "auto", // Full width on mobile
        }}
      >
        Home
      </Button>
      <Button
        sx={{
          color: "#666666",
          fontWeight: "bold",
          fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "20px" }, // Smaller font size on mobile
          width: isMobile ? "100%" : "auto", // Full width on mobile
        }}
      >
        Orders
      </Button>
      {!isMobile && (
        <Button
          sx={{
            color: "#666666",
            fontWeight: "bold",
            fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "20px" }, // Smaller font size on mobile
          }}
        >
          Who we are
        </Button>
      )}
    </Box>
  );
};

export default NavLinks;
