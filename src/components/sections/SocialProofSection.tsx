// -------------------------------------------------------------------------
// 1. UPDATED FILE: /src/components/sections/SocialProofSection.tsx
// This component now uses a more robust filter for light/dark modes.
// -------------------------------------------------------------------------
'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useTranslations } from 'next-intl';

// Use the new, professional SVG icons and names
const partnerLogos = [
  { name: 'Award Winner', url: '/images/logo-award.svg' },
  { name: 'Expert Guide', url: '/images/logo-guide.svg' },
  { name: 'As Featured In', url: '/images/logo-magazine.svg' },
  { name: 'Official Partner', url: '/images/logo-partner.svg' },
];

export default function SocialProofSection() {
  const t = useTranslations('SocialProof');

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Typography
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 2,
            mb: 4,
          }}
        >
          {t('title')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 5, sm: 8 },
          }}
        >
          {partnerLogos.map((logo) => (
            <Box
              key={logo.name}
              component="img"
              src={logo.url}
              alt={`${logo.name} logo`}
              sx={{
                // Using the larger height you suggested
                height: { xs: 60, sm: 80 },
                width: 'auto',
                
                // --- THIS IS THE CORRECTED FILTER LOGIC ---
                // In light mode, we make the logos grayscale.
                // In dark mode, we invert them to appear white.
                filter: (theme) => 
                  theme.palette.mode === 'dark' ? 'brightness(0) invert(1)' : 'grayscale(100%)',

                opacity: 0.7,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  opacity: 1,
                  // On hover, we remove the filter to show the original colors
                  filter: 'none',
                },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}