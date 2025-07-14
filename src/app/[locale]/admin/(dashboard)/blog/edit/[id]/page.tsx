// -------------------------------------------------------------------------
// STEP 1: Create the "Edit Article" Page
// File Path: /src/app/[locale]/admin/(dashboard)/blog/edit/[id]/page.tsx
// -------------------------------------------------------------------------
import { Box, Typography, Paper } from "@mui/material";
import EditArticleForm from "@/components/admin/EditArticleForm";
import { adminDb } from "@/lib/firebase-admin";

// This server-side function fetches the data for the specific article we want to edit.
async function getArticle(id: string) {
  try {
    const docRef = adminDb.collection('articles').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return null;
    }
    
    const data = docSnap.data();
    if (!data) return null;

    // We must serialize any Timestamps to strings before passing to a Client Component
    const createdAt = data.createdAt ? data.createdAt.toDate().toISOString() : null;
    const updatedAt = data.updatedAt ? data.updatedAt.toDate().toISOString() : null;

    return {
      id: docSnap.id,
      ...data,
      createdAt,
      updatedAt,
    };
  } catch (error) {
    console.error("Error fetching single article:", error);
    return null;
  }
}

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);

  if (!article) {
    return (
      <Box>
        <Typography variant="h4">Article not found.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Edit Article
      </Typography>
      <Paper sx={{ p: 4, bgcolor: 'background.paper' }}>
        {/* We pass the fetched article data down to the form component */}
        <EditArticleForm article={article} />
      </Paper>
    </Box>
  );
}