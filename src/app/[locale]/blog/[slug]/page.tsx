// -------------------------------------------------------------------------
// 2. UPDATED FILE: /src/app/[locale]/blog/[slug]/page.tsx
// This page is now updated to render Markdown content.
// -------------------------------------------------------------------------
import { Box, Typography, Container } from "@mui/material";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { Metadata } from "next";
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown'; // <-- 1. IMPORT THE MARKDOWN COMPONENT
import remarkGfm from 'remark-gfm'; // <-- 2. IMPORT THE GFM PLUGIN
import { getArticleBySlug } from "@/lib/data";

// This function fetches the data for a single article
/* async function getArticle(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${slug}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) {
      return null; // Return null if article not found (404)
    }
    const data = await res.json();
    return data.article;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
} */

// --- DYNAMIC SEO METADATA FUNCTION ---
type metaParams = Promise<{ slug: string, locale: string }>;

export async function generateMetadata({ params }: { params: metaParams }): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found'
    };
  }

  const translation = article.translations?.[locale] || article.translations?.en;
  const description = translation?.content?.substring(0, 160) + '...';

  return {
    title: `${translation?.title || 'Article'} | Souss-Massa Tours`,
    description: description,
  };
}

type Params = Promise<{ slug: string, locale: string }>;
export default async function ArticlePage({ params }: { params: Params }) {
  const { slug, locale } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const translation = article.translations?.[locale] || article.translations?.en;
  const formattedDate = new Date(article.createdAt).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <main className="flex-grow">
        <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
          <article>
            <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
              {translation?.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Published on {formattedDate}
            </Typography>
            <Box
              component="img"
              src={article.coverImage}
              alt={translation?.title}
              sx={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover', borderRadius: 2, mb: 4 }}
            />
            
            {/* --- 3. THIS IS THE KEY FIX --- */}
            {/* We replace the Typography component with ReactMarkdown */}
            {/* This will render the content as formatted HTML */}
            <Box sx={{
              lineHeight: 1.8,
              fontSize: '1.1rem',
              color: 'text.secondary',
              '& h2': { my: 4, fontWeight: 'bold', fontSize: '1.8rem', color: 'text.primary' },
              '& h3': { my: 3, fontWeight: 'bold', fontSize: '1.5rem', color: 'text.primary' },
              '& p': { mb: 2 },
              '& a': { color: 'primary.main', textDecoration: 'underline' },
              '& ul, & ol': { pl: 4, mb: 2 },
              '& li': { mb: 1 },
            }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {translation?.content}
              </ReactMarkdown>
            </Box>
          </article>
        </Container>
      </main>
      <Footer />
    </Box>
  );
}
