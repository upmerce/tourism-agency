// /src/app/api/reviews/[experienceId]/route.ts
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
// No need to import modular Firestore functions from 'firebase-admin/firestore'

// This tells Next.js to cache this server-side request for 15 minutes (900 seconds)
// We cache for a shorter time than experiences, as reviews might change more often.
export const revalidate = 900; 

type Params = Promise<{ experienceId: string }>;
export async function GET(
  request: Request,
  { params }: { params: Params }
) {
  const { experienceId } = await params;
  try {
    

    if (!experienceId) {
      return NextResponse.json({ message: 'Experience ID is missing' }, { status: 400 });
    }
    // --- 1. Create a reference to the 'reviews' collection ---
    const reviewsRef = adminDb.collection('reviews');

    // --- 2. Build a query ---
    // We want to get all documents where:
    // - the 'experienceId' field matches the ID from the URL
    // - AND the 'isApproved' field is true
    const q = reviewsRef
      .where('experienceId', '==', experienceId)
      .where('isApproved', '==', true)
      .orderBy('createdAt', 'desc'); // Show the newest reviews first

    // --- 3. Execute the query ---
    const querySnapshot = await q.get();

    const reviews = querySnapshot.docs.map(doc => {
      const data = doc.data();
      // Serialize the timestamp for safe transport to the client
      const createdAt = data.createdAt ? data.createdAt.toDate().toISOString() : new Date().toISOString();
      return {
        id: doc.id,
        authorName: data.authorName,
        rating: data.rating,
        text: data.text,
        createdAt,
      };
    });

    return NextResponse.json({ reviews }, { status: 200 });

  } catch (error) {
    console.error(`Error fetching reviews for experienceId: ${experienceId}`, error);
    return NextResponse.json({ message: 'Failed to fetch reviews' }, { status: 500 });
  }
}
