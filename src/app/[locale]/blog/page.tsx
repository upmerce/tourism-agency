// -------------------------------------------------------------------------
// 3. NEW FILE: /src/app/[locale]/blog/page.tsx
// This is the main public blog page that lists all published articles.
// -------------------------------------------------------------------------
import {Grid, Box, Typography, Container } from "@mui/material";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import ArticleCard from "@/components/blog/ArticleCard";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import ResponsiveHeading from "@/components/custom/ResponsiveHeading";
import { Article } from "@/types/article";
import { getPublishedArticles } from "@/lib/data";

/* // This function fetches all published articles
async function getPublishedArticles() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
} */

// --- SEO METADATA FUNCTION ---
type Params = Promise<{ locale: string }>;
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BlogPage' });
 
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function BlogPage() {
  const articles = await getPublishedArticles();
  const t = await getTranslations('BlogPage');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <main className="flex-grow">
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <ResponsiveHeading component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
              {t('title')}
            </ResponsiveHeading>
            <Typography variant="h6" component="p" sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto' }}>
              {t('subtitle')}
            </Typography>
          </Box>

          {articles.length > 0 ? (
            <Grid container spacing={4}>
              {articles.map((article: Article) => (
                <Grid key={article.id}  size={{ xs: 12, sm: 6, md: 4 }}>
                  <ArticleCard article={article} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography sx={{ textAlign: 'center', color: 'text.secondary', fontStyle: 'italic', mt: 8 }}>
              {t('noArticles')}
            </Typography>
          )}
        </Container>
      </main>
      <Footer />
    </Box>
  );
}