// /src/components/auth/LoginForm.tsx
'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useAppRouter } from '@/hooks/router/useAppRouter';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useTranslations } from 'next-intl'; // <-- Import hook

export default function LoginForm() {
  const t = useTranslations('LoginForm'); // <-- Initialize hook
  const router = useAppRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/dashboard');
    } catch (err: unknown) {
      setError(t('error'));
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '400px', mx: 'auto' }}>
      <Typography variant="h4" component="h1" sx={{ textAlign: 'center', mb: 2 }}>
        {t('title')}
      </Typography>
      <TextField required fullWidth label={t('emailLabel')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField required fullWidth label={t('passwordLabel')} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <Alert severity="error">{error}</Alert>}
      <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 2, py: 1.5 }}>
        {loading ? t('loadingButton') : t('submitButton')}
      </Button>
    </Box>
  );
}