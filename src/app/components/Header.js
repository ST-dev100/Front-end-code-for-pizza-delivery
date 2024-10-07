// Header.jsx
"use client";
import React from "react";
import { AppBar, Toolbar, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Logo from "./HeaderComponents/Logo";
import NavLinks from "./HeaderComponents/NavLinks";
import MobileMenuIcon from "./HeaderComponents/MobileMenu";
import RegisterButton from "./HeaderComponents/RegisterButton";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <AppBar
      position="static"
      sx={{
        background: "transparent",
        boxShadow: "none",
        padding: "10px 0",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Logo />
        <NavLinks />
        {isMobile ? <MobileMenuIcon /> : <RegisterButton />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
