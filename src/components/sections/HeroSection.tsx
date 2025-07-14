// /src/components/sections/HeroSection.tsx
'use client';

import React from 'react';
import { Typography, Button, Container, Box } from '@mui/material';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import MainHeading from '../custom/MainHeading';

export default function HeroSection() {
  const t = useTranslations('HeroSection');
  const heroImageUrl = '/images/4x4-sahara-night.jpg';

  return (
    <Box sx={{ position: 'relative', height: { xs: '90vh', md: '100vh' }, minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, backgroundImage: `url(${heroImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(120deg, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.4) 100%)', zIndex: 1 }} />
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'common.white' }}>
        <MainHeading titleKey='title' t={t}/>
        <Typography variant="h5" component="p" sx={{ mb: 5, maxWidth: 600, mx: 'auto', fontSize: { xs: '1rem', md: '1.25rem' }, textShadow: '0 2px 8px rgba(0,0,0,0.6)', fontWeight: 400 }}>
          {t('subtitle')}
        </Typography>
        <Button variant="contained" size="large" component={Link} href="/experiences" sx={(theme) => ({ px: { xs: 3, md: 5 }, py: { xs: 1, md: 1.5 }, fontSize: { xs: '1rem', md: '1.2rem' }, fontWeight: 700, color: 'white', background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`, transition: 'all 0.3s ease-in-out', '&:hover': { background: `linear-gradient(90deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`, transform: 'scale(1.05)' }})}>
          {t('button')}
        </Button>
      </Container>
    </Box>
  );
}