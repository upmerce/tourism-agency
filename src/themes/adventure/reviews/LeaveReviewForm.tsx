'use client';

import React from 'react';

import LeaveReviewForm from '@/components/reviews/LeaveReviewForm'; // Re-use the core logic
import { Paper, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export type LeaveReviewFormProps = {
  experienceId: string;
};

// A simple styled wrapper for the adventure theme
export default function AdventureLeaveReviewForm({ experienceId }: LeaveReviewFormProps) {
    const t = useTranslations('LeaveReviewForm');
  return (
    <Paper sx={{ p: { xs: 2, md: 4 }, mt: 6, border: 1, borderColor: 'divider' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
        { t('title') }
      </Typography>
       {/* The shared component handles all the form logic */}
      <LeaveReviewForm experienceId={experienceId} />
    </Paper>
  );
}