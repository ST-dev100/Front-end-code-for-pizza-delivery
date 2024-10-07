// CarouselComponent.jsx
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import SlideContent from "./FeaturedPizzaComponents/SlideContent"; // Import SlideContent component
import slides from "../constants/SlideData"; // Import slide data
import "../../../CarouselComponent.css"; // Import your CSS file
import { Box, Typography } from "@mui/material";

export default function CarouselComponent() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "80%",
        margin: "0 auto", // Centers the carousel on the page
      }}
    >
      {/* Featured Pizza Heading */}
      <Typography
        variant="h4"
        sx={{
          marginBottom: "20px",
          fontWeight: "bold",
          color: "#757575",
          // fontFamily:"Teko"
        }}
      >
        Featured Pizza
      </Typography>

      {/* Swiper Carousel */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
        style={{
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <SlideContent slide={slide} /> {/* Render SlideContent with slide data */}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
