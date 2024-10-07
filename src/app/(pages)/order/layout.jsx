// Layout.js
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

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
    <>
      {children} {/* Correctly rendering children */}
    </>
  );
};

export default Layout;
