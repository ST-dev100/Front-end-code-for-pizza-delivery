// MobileMenuIcon.jsx
"use client";
import React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const MobileMenuIcon = () => {
  return (
    <IconButton edge="end" color="black" aria-label="menu">
      <MenuIcon sx={{ fontSize: "40px" }} />
    </IconButton>
  );
};

export default MobileMenuIcon;
