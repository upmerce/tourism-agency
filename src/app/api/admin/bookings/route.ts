// -------------------------------------------------------------------------
// 1. NEW FILE: /src/app/api/admin/bookings/route.ts
// This API route fetches all booking requests from Firestore for the admin panel.
// -------------------------------------------------------------------------
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
// No need to import collection, getDocs, or orderBy from 'firebase-admin/firestore'

export const revalidate = 0; // Don't cache this admin route

export async function GET() {
  try {
    const bookingsRef = adminDb.collection('bookings');
    const bookingsSnapshot = await bookingsRef.orderBy('createdAt', 'desc').get();
    
    const bookings = bookingsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Serialize timestamps for safe transport to the client
        createdAt: data.createdAt.toDate().toISOString(),
        requestedDate: data.requestedDate.toDate().toISOString(),
      };
    });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings for admin:", error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}