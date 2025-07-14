
// -------------------------------------------------------------------------
// 4. UPDATED FILE: /src/components/admin/AdminSidebar.tsx
// Add the new "Bookings" link to the sidebar navigation.
// -------------------------------------------------------------------------
'use client';

import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';

// Import icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import BookOnlineIcon from '@mui/icons-material/BookOnline'; // New icon for bookings
import RateReviewIcon from '@mui/icons-material/RateReview'; // This is a valid MUI icon

const navItems = [
  { text: 'Experiences', href: '/admin/dashboard', icon: <DashboardIcon /> },
  { text: 'Blog', href: '/admin/blog', icon: <ArticleIcon /> },
  { text: 'Bookings', href: '/admin/bookings', icon: <BookOnlineIcon /> }, // <-- ADD THIS NEW LINK
   { text: 'Reviews', href: '/admin/reviews', icon: <RateReviewIcon /> }, // <-- ADD THIS NEW LINK
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Box sx={{ width: 240, flexShrink: 0, bgcolor: 'background.paper', height: '100vh', borderRight: 1, borderColor: 'divider' }}>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Admin Panel</Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => {
          // Updated logic to handle nested paths for active state
          const isActive = pathname.startsWith(`/en${item.href}`) || pathname.startsWith(`/fr${item.href}`);
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} href={item.href} selected={isActive}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}