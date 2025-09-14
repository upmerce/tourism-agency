// /src/app/[locale]/admin/(dashboard)/layout.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { useAppRouter } from '@/hooks/router/useAppRouter';
import { Box, CircularProgress, Container, Typography, Alert } from '@mui/material';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useTranslations } from 'next-intl';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('AdminLayout');
  const [user, loading] = useAuthState(auth);
  const router = useAppRouter();
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  // 1. ADD NEW STATE for the visual warning
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    // Return a cleanup function for the timer
    let timerId: NodeJS.Timeout;

    const verifyAdminStatus = async () => {
      if (!loading && !user) {
        router.push('/admin/login');
        return;
      }
      
      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult();
          if (idTokenResult.claims.admin === true) {
            setIsAdmin(true);
          } else {
            // 2. MODIFY THIS BLOCK to handle non-admins
            console.warn(t('unauthenticatedMessage'));
            setAccessDenied(true); // Show the warning message
            
            // Redirect after 3 seconds
            timerId = setTimeout(() => {
              router.push('/');
            }, 3000);
          }
        } catch (e) {
          console.error("Error verifying admin token:", e);
          router.push('/admin/login');
        } finally {
          setIsVerifying(false);
        }
      } else if (!loading) {
        setIsVerifying(false);
      }
    };

    verifyAdminStatus();

    // Cleanup the timer if the component unmounts
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [user, loading, router, t]);

  // Show a full-screen loading spinner while checking auth state.
  if (loading || isVerifying) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // 3. RENDER THE WARNING MESSAGE
  // This message will be shown for 3 seconds before the redirect happens.
  if (accessDenied) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', p: 3 }}>
            <Alert severity="error" sx={{ mb: 2 }}>
              <Typography variant="h5">{t('accessDenied')}</Typography>
            </Alert>
            <Typography variant="body1">
              {t('unauthenticatedMessage')}
            </Typography>
        </Box>
    );
  }

  // Only render the admin panel if the user is a verified admin.
  if (isAdmin) {
    return (
      <Box sx={{ display: 'flex' }}>
        <AdminSidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
          <Container maxWidth="xl">
            {children}
          </Container>
        </Box>
      </Box>
    );
  }

  // Fallback, renders nothing in other cases (like during the brief moment before logic runs).
  return null; 
}