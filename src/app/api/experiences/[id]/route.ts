// /src/app/api/experiences/[id]/route.ts
import { NextResponse as NextPublicResponse } from 'next/server';
import { adminDb as adminDbPublic } from '@/lib/firebase-admin';

export const revalidate = 3600; 

// The signature of the GET function is updated to correctly receive params
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) { return NextPublicResponse.json({ error: 'Experience ID is required' }, { status: 400 }); }

    const docRef = adminDbPublic.collection('experiences').doc(id);
    const docSnap = await docRef.get();
    if (!docSnap.exists) { return NextPublicResponse.json({ error: 'Experience not found' }, { status: 404 }); }
    
    const data = docSnap.data();
    if (!data) { return NextPublicResponse.json({ error: 'Experience data is empty' }, { status: 404 }); }

    const experience = {
      id: docSnap.id,
      price: data.price,
      locationId: data.locationId,
      coverImage: data.coverImage,
      galleryImages: data.galleryImages || [], // <-- ADDED: Include gallery images in the response
      duration: data.duration,
      translations: data.translations,
      createdAt: data.createdAt.toDate().toISOString(),
    };
    
    return NextPublicResponse.json({ experience }, { status: 200 });
  } catch (error) {
    console.error(`Error fetching public experience with id: ${params?.id}`, error);
    return NextPublicResponse.json({ error: 'Failed to fetch experience' }, { status: 500 });
  }
}