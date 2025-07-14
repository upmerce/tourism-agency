// src/components/debug/StickyTestPage.tsx

'use client';

import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

export default function StickyTestPage() {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', my: 8, px: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 4,
          alignItems: 'start',
        }}
      >
        {/* Left: Long scrollable content */}
        <Box>
          <Paper elevation={0} sx={{ p: 3, bgcolor: '#f5f5f5' }}>
            <Typography variant="h4" gutterBottom>
              Scroll Down
            </Typography>
            {[...Array(40)].map((_, i) => (
              <Typography key={i} paragraph>
                This is line {i + 1} of long content. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Proin euismod, urna eu tincidunt
                consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis
                neque.
              </Typography>
            ))}
          </Paper>
        </Box>

        {/* Right: Sticky card */}
        <Box sx={{ minWidth: 280 }}>
          <Box
            sx={{
              position: 'sticky',
              top: 32, // 32px from top
              zIndex: 1,
            }}
          >
            <Paper
              elevation={4}
              sx={{
                p: 3,
                textAlign: 'center',
                bgcolor: '#fffbe6',
              }}
            >
              <Typography variant="h5" gutterBottom>
                I am Sticky!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                As you scroll the left content, I stay visible here.
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}