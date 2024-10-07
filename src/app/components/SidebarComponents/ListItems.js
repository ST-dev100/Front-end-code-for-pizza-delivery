import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Box } from '@mui/material';
import { Inventory, AddBox, Person, AccountCircle, ExitToApp } from '@mui/icons-material';

const ListItems = () => {
  return (
    <Box sx={{ bgcolor: '#FFFFFF' }}>
      <List component="nav" aria-label="main mailbox folders" >
        <ListItem button="true" sx={{paddingLeft:"40px"}}>
          <ListItemIcon>
            <Inventory />
          </ListItemIcon>
          <ListItemText primary="Orders" sx={{ color: '#FF8C00' }} />
        </ListItem>
        <ListItem button="true" sx={{paddingLeft:"40px"}}>
          <ListItemIcon>
            <AddBox />
          </ListItemIcon>
          <ListItemText primary="Add menu" />
        </ListItem>
        <ListItem button="true" sx={{paddingLeft:"40px"}}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Role" />
        </ListItem>
        <ListItem button="true" sx={{paddingLeft:"40px"}}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="User" />
        </ListItem>
        <Divider />
        <ListItem button="true" sx={{paddingLeft:"60px",marginTop:"20px"}}>
          <ListItemIcon>
            <ExitToApp sx={{ color: 'red' }} />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: 'red' }} />
        </ListItem>
      </List>
    </Box>
  );
};

export default ListItems;