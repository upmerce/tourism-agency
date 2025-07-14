// /src/app/api/bookings/route.ts

import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';

// This function handles POST requests to /api/bookings
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      experienceId, 
      experienceTitle, 
      customerName, 
      customerEmail, 
      requestedDate, 
      numberOfGuests 
    } = body;

    // --- 1. Basic Validation ---
    if (!experienceId || !customerName || !customerEmail || !requestedDate || !numberOfGuests) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // --- 2. Prepare the New Booking Document ---
    const newBooking = {
      experienceId,
      experienceTitle,
      customerName,
      customerEmail,
      // Convert the date string from the client back into a Timestamp for Firestore
      requestedDate: new Date(requestedDate), 
      numberOfGuests: Number(numberOfGuests),
      status: 'pending', // All new bookings are pending by default
      createdAt: FieldValue.serverTimestamp(),
    };

    // --- 3. Add the Document to Firestore ---
    const docRef = await adminDb.collection('bookings').add(newBooking);

    // This isn't strictly necessary yet, but it's good practice.
    // It would clear the cache for a future admin bookings page.
    revalidatePath('/admin/bookings'); 

    console.log(`✅ New booking request submitted for experience ${experienceTitle}.`);
    return NextResponse.json({ message: 'Booking request submitted successfully!', id: docRef.id }, { status: 201 });

  } catch (error) {
    console.error("Error submitting booking:", error);
    return NextResponse.json({ error: 'Failed to submit booking request' }, { status: 500 });
  }
}
