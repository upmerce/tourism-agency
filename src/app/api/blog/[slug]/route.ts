// -------------------------------------------------------------------------
// 1. NEW FILE: /src/app/api/blog/[slug]/route.ts
// This public API route fetches a single published article.
// -------------------------------------------------------------------------
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export const revalidate = 3600; // Cache for 1 hour

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json({ error: 'Article slug is required' }, { status: 400 });
    }

    const articlesRef = adminDb.collection('articles');
    const querySnapshot = await articlesRef
      .where('slug', '==', slug)
      .where('status', '==', 'published')
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();
    
    const article = {
      id: doc.id,
      slug: data.slug,
      coverImage: data.coverImage,
      createdAt: data.createdAt.toDate().toISOString(),
      translations: data.translations,
    };

    return NextResponse.json({ article }, { status: 200 });

  } catch (error) {
    console.error("Error fetching single article:", error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}