// This document contains the code for your blog admin section.
// The main page file has been updated to handle the new data structure.

// -------------------------------------------------------------------------
// 1. UPDATED FILE: /src/app/[locale]/admin/(dashboard)/blog/page.tsx
// This file now correctly reads the multilingual article data.
// -------------------------------------------------------------------------
import { Box, Typography } from "@mui/material";
import ArticlesTable from "@/components/admin/ArticlesTable";
import { adminDb } from "@/lib/firebase-admin";
import CreateArticleButton from "@/components/admin/CreateArticleButton";

// Define the shape of our article data
type Article = {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  createdAt: string;
}

// This function runs on the server to get all articles
async function getArticles() {
  try {
    const articlesSnapshot = await adminDb
      .collection('articles')
      .orderBy('createdAt', 'desc')
      .get();
    
    const articles = articlesSnapshot.docs.map(doc => {
      const data = doc.data();
      console.log(JSON.stringify(data, null, 2)); // Debugging line to check data structure
      return {
        id: doc.id,
        // --- THIS IS THE KEY FIX ---
        // Read the title from the nested translations object.
        // Default to English for the admin panel display.
        title: data.translations?.en?.title || 'No English Title',
        slug: data.slug || '',
        status: data.status || 'draft',
        createdAt: data.createdAt ? data.createdAt.toDate().toLocaleDateString('en-CA') : 'N/A',
      };
    }) as Article[];

    return articles;
  } catch (error) {
    console.error("Error fetching articles for admin:", error);
    return [];
  }
}

export default async function BlogAdminPage() {
  const articles = await getArticles();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Manage Blog Articles
        </Typography>
        <CreateArticleButton />
      </Box>
      
      <ArticlesTable articles={articles} />
    </Box>
  );
}

