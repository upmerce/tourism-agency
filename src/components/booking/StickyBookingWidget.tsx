// /src/components/booking/StickyBookingWidget.tsx
'use client';

import React from 'react';
import { Paper, Typography, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTranslations } from 'next-intl';
import BookingForm from './BookingForm'; // We will reuse the form we already built

// Import some icons for key highlights
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import LanguageIcon from '@mui/icons-material/Language';

interface BookingWidgetProps {
  experience: {
    price: {
      amount: number;
      currency: string;
      prefix: string;
    };
    duration: string;
    // Add any other key highlights you might want to show
  };
  experienceId: string;
  experienceTitle: string;
}

export default function StickyBookingWidget({ experience, experienceId, experienceTitle }: BookingWidgetProps) {
  const t_price = useTranslations('Price');
  
  // Format the price string for display
  const formattedPrice = experience.price?.amount 
    ? `${t_price(experience.price.prefix)} ${experience.price.amount} ${experience.price.currency}`
    : t_price('contactUs');

  return (
    <Paper 
      elevation={6}
      sx={{
        p: 3,
        position: 'sticky',
        top: '100px', // The widget will stick 100px from the top of the viewport
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', 
        fontSize: {
          xs: '2rem',  // Mobile
          sm: '2rem',  // Tablet
          md: '2rem',  // Desktop
          lg: '2.5rem',    // Large Desktop
        } }}>
        {formattedPrice}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        per person
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Key Highlights Section */}
      <List dense>
        <ListItem disablePadding>
          <ListItemIcon sx={{minWidth: '40px'}}><AccessTimeIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Duration" secondary={experience.duration} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon sx={{minWidth: '40px'}}><PeopleIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Group Size" secondary="Up to 8 people" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon sx={{minWidth: '40px'}}><LanguageIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Languages" secondary="English, French" />
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      {/* We reuse the BookingForm component, which already contains the button and modal logic */}
      <BookingForm 
        experienceId={experienceId}
        experienceTitle={experienceTitle}
      />
    </Paper>
  );
}
