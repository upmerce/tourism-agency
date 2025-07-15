// -------------------------------------------------------------------------
// 1. NEW FILE: /src/app/[locale]/admin/(dashboard)/reviews/page.tsx
// This is the main page for managing customer reviews.
// -------------------------------------------------------------------------
import { Box, Typography } from "@mui/material";
import ReviewsTable from "@/components/admin/ReviewsTable";
import { Review } from "@/types/review";
import { getAllAdminReviews } from "@/lib/data";

// This function runs on the server to get all reviews
/* async function getAllReviews(): Promise<Review[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/reviews`, {
      cache: 'no-store', // Always fetch the latest reviews for moderation
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.reviews;
  } catch (error) {
    console.error("Error fetching reviews for admin:", error);
    return [];
  }
} */

export default async function ReviewsAdminPage() {
  const reviews = (await getAllAdminReviews()) as Review[];

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Manage Customer Reviews
      </Typography>
      
      <ReviewsTable reviews={reviews} />
    </Box>
  );
}