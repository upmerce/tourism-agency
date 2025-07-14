// /src/app/api/admin/set-admin-claim/route.ts

import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // --- 1. Find the user by their email address ---
    const user = await adminAuth.getUserByEmail(email);

    // --- 2. Set the custom claim on that user's account ---
    // This adds the { admin: true } property to their token.
    await adminAuth.setCustomUserClaims(user.uid, { admin: true });

    console.log(`✅ Successfully set admin claim for user: ${email}`);
    return NextResponse.json({ message: `Successfully set admin claim for ${email}` }, { status: 200 });

  } catch (error: unknown) {
    console.error("Error setting admin claim:", error);
    // Provide a more specific error if the user is not found
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code?: string }).code === 'auth/user-not-found') {
      return NextResponse.json({ error: 'User not found with that email address.' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to set admin claim' }, { status: 500 });
  }
}
