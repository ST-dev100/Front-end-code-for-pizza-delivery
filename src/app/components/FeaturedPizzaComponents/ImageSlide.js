import React from "react";
import { Box } from "@mui/material";

const ImageSlide = ({ img }) => {
  return (
    <Box
      component="img"
      sx={{
        
        // alignSelf:"stretch",// Height adjustments for smaller screens
      // No margin-left on small screens
         // Rounded corners on bottom for small screens
      }}
      alt="Pizza Image"
      src={img}
    />
  );
};

export default ImageSlide;
