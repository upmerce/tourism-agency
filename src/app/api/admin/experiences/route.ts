// -------------------------------------------------------------------------
// FILE 1: /src/app/api/admin/experiences/route.ts
// This file handles CREATING new experiences.
// -------------------------------------------------------------------------
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { price, locationId, coverImage, galleryImages, translations } = body;

    if (!translations?.en?.title || !price?.amount) {
      return NextResponse.json({ message: 'English title and price amount are required' }, { status: 400 });
    }

    const newData = {
      price: {
        amount: Number(price.amount) || 0,
        currency: price.currency || 'MAD',
        prefix: price.prefix || 'from',
      },
      locationId,
      coverImage,
      galleryImages: galleryImages || [], // <-- ADDED: Save the gallery images array
      translations,
      isFeatured: true,
      createdAt: FieldValue.serverTimestamp(),
    };
    
    const docRef = await adminDb.collection('experiences').add(newData);
    revalidatePath('/[locale]/experiences', 'page');
    revalidatePath(`/[locale]/experiences/${docRef.id}`, 'page');
    return NextResponse.json({ message: 'Experience created successfully', id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating experience:", error);
    return NextResponse.json({ message: 'Failed to create experience' }, { status: 500 });
  }
}