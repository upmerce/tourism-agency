// -------------------------------------------------------------------------
// 1. NEW FILE: /src/app/api/reviews/summary/[experienceId]/route.ts
// This API route calculates the average rating and review count for an experience.
// -------------------------------------------------------------------------
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export const revalidate = 3600; // Cache for 1 hour

export async function GET(
  request: Request,
  { params }: { params: { experienceId: string } }
) {
  try {
    const { experienceId } = params;
    if (!experienceId) {
      return NextResponse.json({ error: 'Experience ID is required' }, { status: 400 });
    }

    const reviewsSnapshot = await adminDb
      .collection('reviews')
      .where('experienceId', '==', experienceId)
      .where('isApproved', '==', true)
      .get();

    if (reviewsSnapshot.empty) {
      return NextResponse.json({ reviewCount: 0, averageRating: 0 }, { status: 200 });
    }

    let totalRating = 0;
    reviewsSnapshot.forEach(doc => {
      totalRating += doc.data().rating;
    });

    const reviewCount = reviewsSnapshot.size;
    const averageRating = totalRating / reviewCount;

    return NextResponse.json({ 
      reviewCount, 
      averageRating: parseFloat(averageRating.toFixed(2)) // Format to 2 decimal places
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching review summary:", error);
    return NextResponse.json({ error: 'Failed to fetch review summary' }, { status: 500 });
  }
}