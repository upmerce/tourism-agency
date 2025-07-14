// /src/components/auth/LogOutButton.tsx
'use client';

import React from 'react';
import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppRouter } from '@/hooks/router/useAppRouter';
import { useTranslations } from 'next-intl'; // <-- Import hook

export default function LogOutButton() {
  const t = useTranslations('LogOutButton'); // <-- Initialize hook
  const router = useAppRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error("Error signing out:", error);
      alert(t('alertError')); // <-- Translated
    }
  };

  return (
    <Button variant="outlined" color="primary" onClick={handleLogout} startIcon={<LogoutIcon />}>
      {t('buttonText')}
    </Button>
  );
}