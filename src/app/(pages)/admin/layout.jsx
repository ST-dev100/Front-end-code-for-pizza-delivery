// Layout.js
"use client";
import React, { useState,useEffect} from 'react';
import { Box } from '@mui/material';
import Sidebar from '@/app/components/adminLayout/Sidebar';
import AppBar from '@/app/components/adminLayout/AppBar';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [activeItem, setActiveItem] = useState('Orders');
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

    // Ensure that the component is client-side only
    useEffect(() => {
      setMounted(true);
    }, []);

      // Redirect user to login if not authenticated
  useEffect(() => {
    if (mounted && !user) {
      router.push('/login'); // Use router.push to redirect to login
    }
  }, [mounted, user, router]);

  if (!mounted) {
    return <div>Loading...</div>; // Show loading until the component is mounted
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        isSidebarVisible={isSidebarVisible}
        activeItem={activeItem}
        handleItemClick={handleItemClick}
        toggleSidebar={toggleSidebar}
      />
      <Box
        sx={{
          flex: isSidebarVisible ? '1' : '12',
          backgroundColor: '#f0f0f0',
          minHeight: '100vh',
          overflow: 'auto',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <AppBar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
