// /src/app/api/newsletter/route.ts

import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// A simple regex for basic email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // --- 1. Basic Validation ---
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    const subscribersRef = adminDb.collection('subscribers');

    // --- 2. Check for Duplicates ---
    // This query checks if an entry with this email already exists.
    const existingSubscriberQuery = await subscribersRef.where('email', '==', email).limit(1).get();

    if (!existingSubscriberQuery.empty) {
      return NextResponse.json({ message: 'This email is already subscribed.' }, { status: 200 });
    }

    // --- 3. Add the New Subscriber ---
    const newSubscriber = {
      email: email.toLowerCase(),
      subscribedAt: FieldValue.serverTimestamp(),
    };

    await subscribersRef.add(newSubscriber);

    console.log(`✅ New subscriber added: ${email}`);
    return NextResponse.json({ message: 'Thank you for subscribing!' }, { status: 201 });

  } catch (error) {
    console.error("Error in newsletter signup:", error);
    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 });
  }
}
