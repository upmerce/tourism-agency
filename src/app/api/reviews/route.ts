// /src/app/api/reviews/route.ts

import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// This function handles POST requests to /api/reviews
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { experienceId, authorName, rating, text } = body;

    // --- 1. Basic Validation ---
    // Ensure all required fields are present and valid.
    if (!experienceId || !authorName || !rating || !text) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be a number between 1 and 5' }, { status: 400 });
    }

    // --- 2. Prepare the New Review Document ---
    const newReview = {
      experienceId,
      authorName,
      rating,
      text,
      isApproved: false, // All reviews are unapproved by default for moderation
      createdAt: FieldValue.serverTimestamp(),
    };

    // --- 3. Add the Document to Firestore ---
    const docRef = await adminDb.collection('reviews').add(newReview);

    console.log(`✅ New review submitted for experience ${experienceId}. Waiting for approval.`);
    return NextResponse.json({ message: 'Review submitted successfully! It will be visible after approval.', id: docRef.id }, { status: 201 });

  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
