// /src/types/booking.ts

export interface Booking {
  id: string;
  experienceId: string;
  experienceTitle: string;
  customerName: string;
  customerEmail: string;
  requestedDate: string; // Serialized as an ISO string
  numberOfGuests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string; // Serialized as an ISO string
  updatedAt?: string | null;
}