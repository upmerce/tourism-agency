// -------------------------------------------------------------------------
// 2. NEW FILE: /src/app/api/admin/reviews/[id]/route.ts
// This API route handles updating (approving) and deleting a single review.
// -------------------------------------------------------------------------
import { NextResponse as NextUpdateResponse } from 'next/server';
import { adminDb as adminDbReview } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';

// This function handles approving a review
type Params = Promise<{ id: string }>;
export async function PUT(
  request: Request,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;
    const { isApproved } = await request.json();

    if (!id || typeof isApproved !== 'boolean') {
      return NextUpdateResponse.json({ error: 'Review ID and a boolean `isApproved` status are required' }, { status: 400 });
    }

    const reviewRef = adminDbReview.collection('reviews').doc(id);
    await reviewRef.update({ isApproved: isApproved });

    // Revalidate the public experience page so the new review appears
    const docSnap = await reviewRef.get();
    const experienceId = docSnap.data()?.experienceId;
    if (experienceId) {
        revalidatePath(`/[locale]/experiences/${experienceId}`, 'page');
    }

    return NextUpdateResponse.json({ message: 'Review status updated successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error updating review status:", error);
    return NextUpdateResponse.json({ error: 'Failed to update review status' }, { status: 500 });
  }
}

// This function handles deleting a review
type DeleteParams = Promise<{ id: string }>;
export async function DELETE(
  request: Request,
  { params }: { params: DeleteParams }
) {
    try {
        const { id } = await params;
        if (!id) {
            return NextUpdateResponse.json({ error: 'Review ID is required' }, { status: 400 });
        }

        await adminDbReview.collection('reviews').doc(id).delete();
        
        console.log(`✅ Successfully deleted review document from Firestore: ${id}`);
        return NextUpdateResponse.json({ message: 'Review deleted successfully' }, { status: 200 });

    } catch (error) {
        console.error("Error deleting review:", error);
        return NextUpdateResponse.json({ error: 'Failed to delete review' }, { status: 500 });
    }
}