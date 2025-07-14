// /src/components/experience/Inclusions.tsx
'use client';

import React from 'react';
import { Grid, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTranslations } from 'next-intl';

// Import icons for the lists
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface InclusionsProps {
  included?: string;
  notIncluded?: string;
}

export default function Inclusions({ included, notIncluded }: InclusionsProps) {
  const t = useTranslations('ExperienceDetails');

  // Split the multiline strings from the database into arrays
  const includedItems = included?.split('\n').filter(item => item.trim() !== '') || [];
  const notIncludedItems = notIncluded?.split('\n').filter(item => item.trim() !== '') || [];

  // Don't render anything if both lists are empty
  if (includedItems.length === 0 && notIncludedItems.length === 0) {
    return null;
  }

  return (
    <Box sx={{ my: 6 }}>
      <Grid container spacing={4}>
        {/* Included Section */}
        {includedItems.length > 0 && (
          <Grid  size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
              {t('includedTitle')}
            </Typography>
            <List>
              {includedItems.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemIcon sx={{ minWidth: '40px' }}>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Grid>
        )}

        {/* Not Included Section */}
        {notIncludedItems.length > 0 && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
              {t('notIncludedTitle')}
            </Typography>
            <List>
              {notIncludedItems.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemIcon sx={{ minWidth: '40px' }}>
                    <CancelIcon color="error" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
