// -------------------------------------------------------------------------
// STEP 4: Update the ArticlesTable to Link to the Edit Page and Handle Delete
// File Path: /src/components/admin/ArticlesTable.tsx
// -------------------------------------------------------------------------
'use client';

import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from '@/i18n/navigation';

interface Article {
  id: string;
  title: string;
  status: 'published' | 'draft';
  createdAt: string;
}

interface ArticlesTableProps {
  articles: Article[];
}

export default function ArticlesTable({ articles }: ArticlesTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Article | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (article: Article) => {
    setItemToDelete(article);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/articles/${itemToDelete.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) { throw new Error('Failed to delete article.'); }
      handleCloseDeleteDialog();
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Error: Could not delete article.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ bgcolor: 'background.paper' }}>
        <Table sx={{ minWidth: 650 }} aria-label="articles table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date Created</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.length === 0 ? (
              <TableRow><TableCell colSpan={4}><Typography sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>No articles found.</Typography></TableCell></TableRow>
            ) : (
              articles.map((row) => (
                <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">{row.title}</TableCell>
                  <TableCell><Chip label={row.status} color={row.status === 'published' ? 'success' : 'default'} size="small" /></TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell align="right">
                    <IconButton component={Link} href={`/admin/blog/edit/${row.id}`} aria-label="edit"><EditIcon /></IconButton>
                    <IconButton onClick={() => handleDeleteClick(row)} aria-label="delete" sx={{ color: 'error.main' }}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
           {`Are you sure you want to permanently delete the article: "${itemToDelete?.title}"? This action cannot be undone.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained" disabled={isDeleting}>
            {isDeleting ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}