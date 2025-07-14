// -------------------------------------------------------------------------
// 2. NEW FILE: /src/components/reviews/TestimonialCard.tsx
// This is a reusable UI component for displaying a single testimonial.
// -------------------------------------------------------------------------
'use client';

import React from 'react';
import { Paper, Typography, Box, Rating, Avatar } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Review } from '@/types/review';

interface TestimonialCardProps {
  review: Review;
}

export default function TestimonialCard({ review }: TestimonialCardProps) {
  return (
    <Paper 
      elevation={4}
      sx={{
        p: 4,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper'
      }}
    >
      <FormatQuoteIcon sx={{ color: 'primary.main', fontSize: 40, mb: 2 }} />
      <Typography variant="body1" sx={{ fontStyle: 'italic', flexGrow: 1, color: 'text.secondary', mb: 3 }}>
        {review.text}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
          {review.authorName.charAt(0)}
        </Avatar>
        <Box>
          <Typography sx={{ fontWeight: 'bold' }}>{review.authorName}</Typography>
          <Rating value={review.rating} readOnly size="small" />
        </Box>
      </Box>
    </Paper>
  );
}
