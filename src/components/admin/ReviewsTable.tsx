// -------------------------------------------------------------------------
// 2. NEW FILE: /src/components/admin/ReviewsTable.tsx
// This component displays all reviews and allows for moderation.
// -------------------------------------------------------------------------
'use client';

import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip, Rating, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppRouter } from '@/hooks/router/useAppRouter';
import { Review } from '@/types/review';



interface ReviewsTableProps {
  reviews: Review[];
}

export default function ReviewsTable({ reviews }: ReviewsTableProps) {
  const router = useAppRouter();
  const [loadingState, setLoadingState] = useState<{ [key: string]: boolean }>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Review | null>(null);

  const handleApprove = async (reviewId: string) => {
    setLoadingState(prev => ({ ...prev, [reviewId]: true }));
    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved: true }),
      });
      if (!response.ok) throw new Error('Failed to approve review.');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Error: Could not approve review.');
    } finally {
      setLoadingState(prev => ({ ...prev, [reviewId]: false }));
    }
  };

  const handleDeleteClick = (review: Review) => {
    setItemToDelete(review);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setLoadingState(prev => ({ ...prev, [itemToDelete.id]: true }));
    try {
      const response = await fetch(`/api/admin/reviews/${itemToDelete.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete review.');
      setDeleteDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Error: Could not delete review.');
    } finally {
      setLoadingState(prev => ({ ...prev, [itemToDelete.id]: false }));
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ bgcolor: 'background.paper' }}>
        <Table sx={{ minWidth: 650 }} aria-label="reviews table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Author</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Review</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Rating</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell sx={{ verticalAlign: 'top' }}>{row.authorName}</TableCell>
                <TableCell sx={{ verticalAlign: 'top' }}>{row.text}</TableCell>
                <TableCell sx={{ verticalAlign: 'top' }}><Rating value={row.rating} readOnly size="small" /></TableCell>
                <TableCell sx={{ verticalAlign: 'top' }}>
                  <Chip 
                    label={row.isApproved ? "Approved" : "Pending"} 
                    color={row.isApproved ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  {!row.isApproved && (
                    <IconButton 
                      onClick={() => handleApprove(row.id)} 
                      aria-label="approve" 
                      color="success"
                      disabled={loadingState[row.id]}
                    >
                      {loadingState[row.id] ? <CircularProgress size={22} /> : <CheckCircleIcon />}
                    </IconButton>
                  )}
                  <IconButton 
                    onClick={() => handleDeleteClick(row)} 
                    aria-label="delete" 
                    color="error"
                    disabled={loadingState[row.id]}
                  >
                    {loadingState[row.id] ? <CircularProgress size={22} /> : <DeleteIcon />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete this review by {itemToDelete?.authorName}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
