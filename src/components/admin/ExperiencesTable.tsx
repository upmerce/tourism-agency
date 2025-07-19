// /src/components/admin/ExperiencesTable.tsx
'use client';

import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditExperienceForm from './EditExperienceForm';
import { useTranslations } from 'next-intl';
import { Experience } from '@/types/experience';
import { locations } from '@/config/locations';








interface ExperiencesTableProps {
  experiences: Experience[];
}

export default function ExperiencesTable({ experiences }: ExperiencesTableProps) {
 // const locale = useLocale();
  const t = useTranslations('ExperiencesTable');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Experience | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (experience: Experience) => {
    setSelectedExperience(experience);
    setEditModalOpen(true);
  };
  
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedExperience(null);
  };

  const handleDeleteClick = (experience: Experience) => {
    setItemToDelete(experience);
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
      const response = await fetch(`/api/admin/experiences/${itemToDelete.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete experience.');
      }
      handleCloseDeleteDialog();
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Error: Could not delete experience.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ bgcolor: 'background.paper' }}>
        <Table sx={{ minWidth: 650 }} aria-label="experiences table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>{t('headerTitle')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>{t('headerLocation')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>{t('headerPrice')}</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>{t('headerActions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {experiences.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                    {t('noItemsFound')}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              experiences.map((row) => {
                const formattedPrice = row.price ? `${row.price.amount} ${row.price.currency}` : 'N/A';
                
                // --- THIS IS THE ROBUST FIX ---
                // We trim whitespace and convert to lowercase for a reliable comparison.
                const locationName = locations.find(
                  (loc) => loc.id.trim().toLowerCase() === row.locationId?.trim().toLowerCase()
                )?.name || 'Unknown Location';

                // Optional: For debugging, you can see what's being compared.
                // console.log(`Comparing Firestore ID: '${row.locationId}' with local IDs.`);

                return (
                  <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">{row.title}</TableCell>
                    <TableCell>{locationName}</TableCell>
                    <TableCell>{formattedPrice}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEdit(row)} aria-label="edit"><EditIcon /></IconButton>
                      <IconButton onClick={() => handleDeleteClick(row)} aria-label="delete" sx={{ color: 'error.main' }}><DeleteIcon /></IconButton>
                    </TableCell>
                    
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <EditExperienceForm 
        open={editModalOpen}
        onClose={handleCloseEditModal}
        experience={selectedExperience}
      />
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>{t('deleteDialogTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('deleteDialogWarning', { title: itemToDelete?.title ?? '' })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>{t('cancelButton')}</Button>
          <Button onClick={confirmDelete} color="error" variant="contained" disabled={isDeleting}>
            {isDeleting ? <CircularProgress size={24} /> : t('deleteButton')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
