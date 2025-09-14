'use client';

import React from 'react';
import { Paper, Typography } from '@mui/material';
import BookingForm from '@/components/booking/BookingForm'; // We re-use the core logic
import { Experience } from '@/types/experience';

// This is a new, theme-specific wrapper around the shared BookingForm logic
export default function AdventureBookingForm({ 
  experienceId, 
  experienceTitle, 
  price 
}: { 
  experienceId: string; 
  experienceTitle: string; 
  price: Experience['price']; 
}) {
  return (
    <Paper elevation={6} sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
      <Typography 
        variant="h4" 
        component="p" 
        sx={{ 
          fontWeight: 'bold', 
          mb: 2, 
          textAlign: 'center',
          textTransform: 'uppercase'
        }}
      >
        Book This Adventure
      </Typography>
      <BookingForm 
        experienceId={experienceId}
        experienceTitle={experienceTitle}
        price={price}
      />
    </Paper>
  );
}