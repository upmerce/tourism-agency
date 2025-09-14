'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import ReviewsList from '@/components/reviews/ReviewsList'; // Re-use the core logic
import { useTranslations } from 'next-intl';

export type ReviewsListProps = {
  experienceId: string;
};

// A simple styled wrapper for the adventure theme
export default function AdventureReviewsList({ experienceId }: ReviewsListProps) {
  const t = useTranslations('ReviewsList');  
  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
        { t('title') }
      </Typography>
      {/* The shared component handles the data fetching and rendering logic */}
      <ReviewsList experienceId={experienceId} />
    </Box>
  );
}