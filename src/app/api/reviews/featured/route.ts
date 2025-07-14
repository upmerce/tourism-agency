// -------------------------------------------------------------------------
// 1. NEW FILE: /src/app/api/reviews/featured/route.ts
// This public API route fetches the 3 best, approved reviews.
// -------------------------------------------------------------------------
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const reviewsSnapshot = await adminDb
      .collection('reviews')
      .where('isApproved', '==', true)
      .where('rating', '==', 5) // We only want the best 5-star reviews
      .orderBy('createdAt', 'desc')
      .limit(3) // Get the 3 most recent 5-star reviews
      .get();
    
    const reviews = reviewsSnapshot.docs.map(doc => {
      const data = doc.data();
      console.log("Fetched review data from api /api/reviews/featured :", JSON.stringify(data)); // Debugging output
      return {
        id: doc.id,
        authorName: data.authorName,
        rating: data.rating,
        text: data.text,
        createdAt: data.createdAt.toDate().toISOString(),
      };
    });

    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching featured reviews:", error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}