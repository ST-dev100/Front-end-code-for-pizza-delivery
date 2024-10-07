"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Toolbar, Typography, IconButton, CircularProgress } from '@mui/material';
import { Inventory, AddBox, Person, AccountCircle, ExitToApp } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import pizza from '@/images/pizzaforSL.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/app/features/authSlice';
import { logoutUser } from '@/app/services/api';
import { usePathname, useRouter } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = React.memo(({ isSidebarVisible, handleItemClick, toggleSidebar }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const user = useSelector((state) => state.auth.user);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logoutUser();
            router.push('/');
            dispatch(logout());
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const isActive = (url) => pathname === url;

    return (
        <Box
            sx={{
                display: isSidebarVisible ? 'flex' : 'none',
                flex: '0 0 16.67%',
                backgroundColor: '#ffffff',
                transition: 'transform 0.3s ease-in-out',
                transform: isSidebarVisible ? 'translateX(0)' : 'translateX(-100%)',
                height: '100vh',
                position: 'relative',
            }}
        >
            <Box position="static" sx={{ boxShadow: 'none', width: '100%' }}>
                <Toolbar sx={{ justifyContent: 'space-between', backgroundColor: '#f0f0f0' }}>
                    <Typography variant="h6" sx={{ color: '#000000', fontWeight: 'bold' }}>
                        PIZZA
                    </Typography>
                    <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleSidebar}>
                        <MenuIcon sx={{ color: '#000000' }} />
                    </IconButton>
                </Toolbar>
                <Box
                    position="static"
                    sx={{
                        backgroundColor: '#FFF5EE',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '40px',
                    }}
                >
                    <Image src={pizza.src} alt="Pizza Slice" width={64} height={64} />
                </Box>
                <Box sx={{ bgcolor: '#FFFFFF' }}>
                    <List component="nav" aria-label="main mailbox folders">
                        {['/admin/packages', '/admin/addmenu', '/admin/role', '/admin/users'].map((route, index) => {
                            const icons = [<Inventory />, <AddBox />, <Person />, <AccountCircle />];
                            const titles = ['Orders', 'Add menu', 'Role', 'User'];

                            return (
                                <ListItem
                                    key={index}
                                    button="true"
                                    component={Link}
                                    href={route}
                                    onClick={() => handleItemClick(titles[index])}
                                    sx={{
                                        paddingLeft: '40px',
                                        backgroundColor: isActive(route) ? '#FF8C00' : 'transparent',
                                        color: isActive(route) ? '#FFFFFF' : '#000000',
                                    }}
                                >
                                    <ListItemIcon>{icons[index]}</ListItemIcon>
                                    <ListItemText primary={titles[index]} sx={{ display: { xs: 'none', sm: 'block' } }} />
                                </ListItem>
                            );
                        })}
                        <Divider />
                        <ListItem button="true" onClick={handleLogout} sx={{ paddingLeft: '60px', marginTop: '20px' }}>
                            <ListItemIcon>
                                {isLoggingOut ? <CircularProgress size={24} color="secondary" /> : <ExitToApp sx={{ color: 'red' }} />}
                            </ListItemIcon>
                            <ListItemText primary="Logout" sx={{ color: 'red', cursor: "pointer", display: { xs: 'none', sm: 'block' } }} />
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </Box>
    );
});

export default Sidebar;
