// -------------------------------------------------------------------------
// 2. UPDATED FILE: /src/components/admin/BookingsTable.tsx
// This component is now interactive, with a menu to change booking status.
// -------------------------------------------------------------------------
'use client';

import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppRouter } from '@/hooks/router/useAppRouter';

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  experienceTitle: string;
  requestedDate: string;
  numberOfGuests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

interface BookingsTableProps {
  bookings: Booking[];
}

export default function BookingsTable({ bookings }: BookingsTableProps) {
  const router = useAppRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, bookingId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedBookingId(bookingId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedBookingId(null);
  };

  const handleStatusChange = async (newStatus: 'pending' | 'confirmed' | 'cancelled') => {
    if (!selectedBookingId) return;

    try {
      const response = await fetch(`/api/admin/bookings/${selectedBookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      
      handleClose();
      router.refresh(); // Refresh the server component data

    } catch (error) {
      console.error("Failed to update booking status:", error);
      alert('Error: Could not update status.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-CA');
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Chip label="Confirmed" color="success" size="small" />;
      case 'cancelled':
        return <Chip label="Cancelled" color="error" size="small" />;
      default:
        return <Chip label="Pending" color="warning" size="small" />;
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ bgcolor: 'background.paper' }}>
        <Table sx={{ minWidth: 650 }} aria-label="bookings table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Experience</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Requested Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Guests</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{row.customerName}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>{row.customerEmail}</Typography>
                </TableCell>
                <TableCell>{row.experienceTitle}</TableCell>
                <TableCell>{formatDate(row.requestedDate)}</TableCell>
                <TableCell>{row.numberOfGuests}</TableCell>
                <TableCell>{getStatusChip(row.status)}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="more"
                    onClick={(e) => handleClick(e, row.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleStatusChange('confirmed')}>Mark as Confirmed</MenuItem>
        <MenuItem onClick={() => handleStatusChange('pending')}>Mark as Pending</MenuItem>
        <MenuItem onClick={() => handleStatusChange('cancelled')}>Mark as Cancelled</MenuItem>
      </Menu>
    </>
  );
}