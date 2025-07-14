// /src/app/api/admin/articles/route.ts
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // 1. We now expect the full object, including the nested translations
    const { slug, status, coverImage, translations } = body;

    // 2. We update the validation to check inside the translations object for the default language
    if (!slug || !coverImage || !status || !translations?.en?.title || !translations?.en?.content) {
      return NextResponse.json({ error: 'Missing required fields for the default language (English)' }, { status: 400 });
    }

    // 3. Prepare the data with the correct multilingual structure
    const newArticle = {
      slug,
      status,
      coverImage,
      translations, // Save the entire translations object
      createdAt: FieldValue.serverTimestamp(),
    };

    // Add the new document to the "articles" collection
    await adminDb.collection('articles').add(newArticle);

    // Revalidate the admin blog page to show the new article immediately
    revalidatePath('/[locale]/admin/blog', 'page');

    return NextResponse.json({ message: 'Article created successfully' }, { status: 201 });

  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
