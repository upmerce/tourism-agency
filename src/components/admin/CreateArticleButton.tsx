// -------------------------------------------------------------------------
// 1. NEW FILE: /src/components/admin/CreateArticleButton.tsx
// This is a dedicated Client Component to solve the error.
// -------------------------------------------------------------------------
'use client';

import React from 'react';
import { Button } from '@mui/material';
import { Link } from '@/i18n/navigation';
import AddIcon from '@mui/icons-material/Add';

export default function CreateArticleButton() {
  return (
    <Button
      variant="contained"
      component={Link}
      href="/admin/blog/create"
      startIcon={<AddIcon />}
    >
      Create New Article
    </Button>
  );
}