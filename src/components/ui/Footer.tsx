// /src/components/ui/Footer.tsx
'use client';

import React from 'react';
import {Grid, Typography, Box, Container, IconButton } from '@mui/material';
import { Link, usePathname } from '@/i18n/navigation'; // <-- 1. Import the usePathname hook
import { useTranslations } from 'next-intl';


// Import social media icons
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import dynamic from 'next/dynamic';

// ✅ This is the correct way to dynamically import a client-only component.
const InteractiveMap = dynamic(
  () => import('./InteractiveMap'), // Adjust path if needed
  {
    ssr: false, // This ensures it's only rendered on the client
    loading: () => <div style={{ height: '400px', background: '#e0e0e0' }} /> // A placeholder while the map loads
  }
);
export default function Footer() {
  const t = useTranslations('Footer');
  const pathname = usePathname(); // <-- 2. Get the current page's path

  // 3. This condition checks if we are on the contact page.
  const showMap = pathname !== '/contact';

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper', 
        color: 'text.secondary',
        py: { xs: 6, md: 8 },
        borderTop: 1,
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        {/* --- TOP ROW: Information Columns --- */}
        <Grid container spacing={5} sx={{ mb: 6 }}>
          {/* ... The first three columns (About, Links, Contact) remain exactly the same ... */}
          <Grid  size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 'bold', mb: 2 }}>
              {t('siteTitle')}
            </Typography>
            <Typography variant="body2">
              {t('aboutText')}
            </Typography>
          </Grid>
          <Grid  size={{ xs: 12, sm: 6, md: 4 }}>
             <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 'bold', mb: 2 }}>
              {t('linksTitle')}
            </Typography>
            <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>{t('aboutLink')}</Link>
              <Link href="/experiences" style={{ textDecoration: 'none', color: 'inherit' }}>{t('experiencesLink')}</Link>
              <Link href="/blog" style={{ textDecoration: 'none', color: 'inherit' }}>{t('blogLink')}</Link>
              <Link href="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>{t('contactLink')}</Link>
            </Box>
          </Grid>
          <Grid  size={{ xs: 12, sm: 6, md: 4 }}>
             <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 'bold', mb: 2 }}>
              {t('contactTitle')}
            </Typography>
            <Typography variant="body2">{t('address')}</Typography>
            <Typography variant="body2">{t('phone')}</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>{t('email')}</Typography>
            <Box>
              <IconButton aria-label="Facebook" color="inherit" href="#"><FacebookIcon /></IconButton>
              <IconButton aria-label="Instagram" color="inherit" href="#"><InstagramIcon /></IconButton>
              <IconButton aria-label="Twitter" color="inherit" href="#"><TwitterIcon /></IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* --- BOTTOM ROW: The Map (Now conditionally rendered) --- */}
        {showMap && (
          <Box sx={{ height: 250, borderRadius: 2, overflow: 'hidden', mb: 6 }}>
              <InteractiveMap latitude={30.2167} longitude={-9.3667} />
          </Box>
        )}

        {/* Copyright notice at the very bottom */}
        <Box sx={{ pt: 4, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
          <Typography variant="body2">
            {t('copyright', { year: new Date().getFullYear() })}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
