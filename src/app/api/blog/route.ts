// -------------------------------------------------------------------------
// 1. NEW FILE: /src/app/api/blog/route.ts
// This is a PUBLIC API route that fetches only 'published' articles.
// -------------------------------------------------------------------------
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const articlesSnapshot = await adminDb
      .collection('articles')
      .where('status', '==', 'published') // Only fetch published articles
      .orderBy('createdAt', 'desc')
      .get();
    
    const articles = articlesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        slug: data.slug,
        coverImage: data.coverImage,
        createdAt: data.createdAt.toDate().toISOString(),
        translations: data.translations,
      };
    });

    return NextResponse.json({ articles }, { status: 200 });
  } catch (error) {
    console.error("Error fetching published articles:", error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}