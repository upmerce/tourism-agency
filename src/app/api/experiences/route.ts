// /src/app/api/experiences/route.ts
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin'; // <-- Use the Admin SDK for all operations
// No need to import collection, getDocs, or orderBy from 'firebase-admin/firestore'

// This tells Next.js to cache this server-side request for 1 hour
export const revalidate = 3600; 

// --- GET function now using the ADMIN SDK ---
export async function GET() {
  try {
    const experiencesRef = adminDb.collection('experiences');
    const experiencesSnapshot = await experiencesRef.get();
    
    const experiences = experiencesSnapshot.docs.map(doc => {
      const data = doc.data();
      // We must serialize the timestamp here too, just like on the dashboard page
      const createdAt = data.createdAt 
        ? data.createdAt.toDate().toISOString() 
        : new Date().toISOString();

      return {
        id: doc.id,
        ...data,
        createdAt, // Override the original timestamp with the safe string version
      };
    });

    return NextResponse.json({ experiences }, { status: 200 });

  } catch (error) {
    console.error("Error fetching experiences:", error);
    return NextResponse.json({ message: 'Failed to fetch experiences' }, { status: 500 });
  }
}

// --- Your POST function (no changes needed) ---
export async function POST() {
  // ... your existing POST code remains the same ...
  // It already correctly uses the Admin SDK.
}