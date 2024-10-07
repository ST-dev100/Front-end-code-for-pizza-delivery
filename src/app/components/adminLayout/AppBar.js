"use client";
import React,{useMemo} from 'react';
import { Box, Typography, IconButton, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { usePathname } from 'next/navigation'; // Import usePathname
// import { Can } from "@casl/react";
// import { defineAbilitiesFor } from "@/app/CASL/defineAbilities";
// import { useSelector } from "react-redux"; 

const AppBar = ({ toggleSidebar, isSidebarVisible }) => {
  const currentRoute = usePathname(); // Get the current route using usePathname
  // const user = useSelector((state) => state.auth.user);
  // const ability = useMemo(() => defineAbilitiesFor(user), [user]); 
  // console.log("abbb",ability)
  // Function to dynamically generate the title based on the current route
  const getTitle = () => {
    switch (currentRoute) {
      case '/admin/packages':
        return 'Packages';
      case '/admin/addmenu':
        return 'Add Menu';
      case '/admin/role':
        return 'User Roles';
      case '/admin/users':
        return 'Users';
      default:
        return 'Dashboard'; // Default title
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        width: '100%',
        height: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h6" sx={{ color: '#000000', fontWeight: 'bold', marginLeft: 4 }}>
        {getTitle()} {/* Display the dynamic title */}
      </Typography>
      {!isSidebarVisible && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
          sx={{
            position: 'fixed',
            zIndex: 1000,
            left: '10px',
            top: '10px',
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton edge="end" color="inherit" aria-label="notifications" sx={{ marginRight: 2 }}>
          <Badge color="secondary" badgeContent={1}>
            <NotificationsIcon sx={{ color: '#1E3A8A' }} />
          </Badge>
        </IconButton>
        <IconButton edge="end" color="inherit" aria-label="account">
          <AccountCircle sx={{ color: '#000000' }} />
        </IconButton>
      </Box>
      {/* <Can I="read" a="Order" ability={ability}> */}

        {/* <Typography>hjddd</Typography> */}
      {/* </Can> */}
    </Box>
  );
};

export default AppBar;
