// /src/app/api/admin/experiences/[id]/route.ts

import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';
import { getStorage } from 'firebase-admin/storage';

// The PUT function is for updating existing experiences
type Params = Promise<{ id: string }>;
export async function PUT(
  request: Request,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { price, locationId, coverImage, galleryImages, translations } = body;

    if (!id) {
      return NextResponse.json({ message: 'Experience ID is required' }, { status: 400 });
    }

    const docRef = adminDb.collection('experiences').doc(id);
    const updateData = {
      price: {
        amount: Number(price.amount) || 0,
        currency: price.currency || 'MAD',
        prefix: price.prefix || 'from',
      },
      locationId,
      coverImage,
      galleryImages: galleryImages || [],
      translations,
      updatedAt: FieldValue.serverTimestamp(),
    };
    
    await docRef.update(updateData);

    revalidatePath('/[locale]/experiences', 'page');
    revalidatePath(`/[locale]/experiences/${id}`, 'page');

    return NextResponse.json({ message: 'Experience updated successfully' }, { status: 200 });

  } catch (error) {
    console.error("Error updating experience:", error);
    return NextResponse.json({ message: 'Failed to update experience' }, { status: 500 });
  }
}


// The DELETE function removes an experience and its associated storage files
type DeleteParams = Promise<{ id: string }>;
export async function DELETE(
  request: Request,
  { params }: { params: DeleteParams }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ message: 'Experience ID is required' }, { status: 400 });
    }

    const docRef = adminDb.collection('experiences').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ message: 'Experience not found' }, { status: 404 });
    }

    // 1. Delete all associated files from Cloud Storage
    const bucket = getStorage().bucket();
    const prefix = `experiences/${id}/`; // The folder to delete
    
    try {
        console.log(`Attempting to delete all files with prefix: ${prefix}`);
        await bucket.deleteFiles({ prefix: prefix });
        console.log(`✅ Successfully deleted all storage files for experience: ${id}`);
    } catch (storageError) {
       // Check if the error is a standard Error object
  if (storageError instanceof Error) {
    console.warn(`Could not delete all files for experience ${id}. Manual cleanup may be required.`, storageError.message);
  } else {
    // Handle cases where a non-Error object was thrown
    console.warn(`An unknown error occurred during storage deletion for experience ${id}.`);
  }
    }
    
    // 2. Delete the Firestore document
    await docRef.delete();
    console.log(`✅ Successfully deleted document from Firestore: ${id}`);

    // 3. Revalidate paths
    revalidatePath('/[locale]/experiences', 'page');
    revalidatePath(`/[locale]/experiences/${id}`, 'page');

    return NextResponse.json({ message: 'Experience and all associated images deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error("Error deleting experience:", error);
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
  }
}
