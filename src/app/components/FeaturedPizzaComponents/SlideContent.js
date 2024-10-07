import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ImageSlide from "./ImageSlide"; // Import ImageSlide component

const SlideContent = ({ slide }) => {
  return (
    <Box
      sx={{
        display: "flex", // Responsive: stack content on smaller screens
        width: { xs: "100%", sm: "90%", md: "90%" },// Adjust height on small screens
        borderRadius: "15px",
        overflow: "hidden",
        backgroundColor: slide.bgColor,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          padding: { xs: 1, sm: 2, md: 3 }, // Adjust padding based on screen size
          width: { xs: "100%", md: "50%" }, // Full width on small, half on medium
          textAlign: { xs: "center", md: "left" },  // Center text on smaller screens
          color: "#fff",
          display:"flex",
          flexDirection:"column",
          gap:2,
          flexGrow:1
        }}
      >
        <Typography sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "3.5rem" },fontWeight: "bold",
            lineHeight: "1.2", }}>
          {slide.title}{" "}
          <span style={{ color: "orange" }}>{slide.highlight}</span>
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "0.8rem", sm: "1rem", md: "1.5rem" }, // Responsive font size for description
            my: { xs: 1, sm: 2 }, // Margin adjustments for spacing
            fontWeight: "lighter",
          }}
        >
          {slide.description}
        </Typography>
        <Button
          variant="contained"
          color="warning"
          sx={{
            fontWeight: "bold",
            width: { xs: "100%", sm: "auto" }, // Full-width button on small screens
            fontSize: { xs: "0.8rem", sm: "1rem" },  // Full-width button on small screens
            alignSelf:"flex-start",
            padding:2
          }}
        >
          Order Now
        </Button>
      </Box>
      <Box
        sx={{
           // Image takes full width on small, half on medium
          display: "flex",
        }}
      >
      <ImageSlide img={slide.img} /> {/* Render ImageSlide with image src */}
      </Box>
    </Box>
  );
};

export default SlideContent;

