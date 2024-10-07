import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import pizza from "@/images/pizzaforSL.png";
import ListItems from './SidebarComponents/ListItems';


const Sidebar = () => {
  return (
    <Box position="static" sx={{  boxShadow: 'none',width:"100%"}}>
      <Toolbar sx={{ justifyContent: 'space-between' ,backgroundColor:"#f0f0f0"}}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: '#000000', fontWeight: 'bold', mr: 1 }}>
            PIZZA
          </Typography>
        </Box>
        <IconButton edge="end" color="inherit" aria-label="menu">
          <MenuIcon sx={{ color: '#000000' }} />
        </IconButton>
      </Toolbar>
    <Box position="static" sx={{ backgroundColor: '#FFF5EE', boxShadow: 'none' ,display:"flex",justifyContent:"center",alignItems:"center",padding:"40px",}}>
    <Image 
            src={pizza.src} // Make sure to add this image to your public folder
            alt="Pizza Slice"
            width={64}
            height={64}
          />
    </Box>
    <ListItems/>

    </Box>
  );
};

export default Sidebar;