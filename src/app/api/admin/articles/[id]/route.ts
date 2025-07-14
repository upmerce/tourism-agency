// -------------------------------------------------------------------------
// STEP 3: Create the API Route for Updating and Deleting Articles
// File Path: /src/app/api/admin/articles/[id]/route.ts
// -------------------------------------------------------------------------
import { NextResponse } from 'next/server';
import { adminDb as adminDbArticle } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { revalidatePath } from 'next/cache';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { slug, status, translations } = body;
    if (!id || !slug || !status || !translations?.en?.title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const articleRef = adminDbArticle.collection('articles').doc(id);
    await articleRef.update({
      slug,
      status,
      translations,
      updatedAt: FieldValue.serverTimestamp(),
    });
    revalidatePath('/[locale]/admin/blog', 'page');
    revalidatePath('/[locale]/blog', 'page');
    revalidatePath('/[locale]/blog/[slug]', 'page');
    return NextResponse.json({ message: 'Article updated successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }
    const articleRef = adminDbArticle.collection('articles').doc(id);
    const docSnap = await articleRef.get();
    if (!docSnap.exists) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    const data = docSnap.data();
    if (data?.coverImage) {
      try {
        const bucket = getStorage().bucket();
        const url = new URL(data.coverImage);
        const filePath = decodeURIComponent(url.pathname.split('/o/')[1].split('?')[0]);
        await bucket.file(filePath).delete();
        console.log(`✅ Successfully deleted article image from storage: ${filePath}`);
      } catch (storageError: unknown) {
        if (storageError instanceof Error) {
          console.warn("Could not delete article image from storage:", storageError.message);
        } else {
          console.warn("Could not delete article image from storage:", storageError);
        }
      }
    }
    await articleRef.delete();
    console.log(`✅ Successfully deleted article document from Firestore: ${id}`);
    revalidatePath('/[locale]/admin/blog', 'page');
    revalidatePath('/[locale]/blog', 'page');
    return NextResponse.json({ message: 'Article deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}