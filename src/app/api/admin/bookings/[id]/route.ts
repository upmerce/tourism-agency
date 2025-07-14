// -------------------------------------------------------------------------
// 1. NEW FILE: /src/app/api/admin/bookings/[id]/route.ts
// This new API route handles updating the status of a single booking.
// -------------------------------------------------------------------------
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';

type Params = Promise<{ id: string }>;
export async function PUT(
  request: Request,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Booking ID and status are required' }, { status: 400 });
    }

    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
        return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    const bookingRef = adminDb.collection('bookings').doc(id);
    await bookingRef.update({
      status: status,
      updatedAt: FieldValue.serverTimestamp(),
    });

    // Revalidate the admin bookings page so the change is visible immediately
    revalidatePath('/[locale]/admin/bookings', 'page');

    return NextResponse.json({ message: 'Booking status updated successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return NextResponse.json({ error: 'Failed to update booking status' }, { status: 500 });
  }
}