// /src/themes/luxury/blog/PostLayout.tsx
'use client';

import React from 'react';
import { Box, Typography, Container, Divider, useTheme } from '@mui/material';
import { Article, ArticleTranslation } from '@/types/article';
import Image from 'next/image';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface PostLayoutProps {
  article: Article;
  translation: ArticleTranslation | undefined;
}

export default function PostLayout({ article, translation }: PostLayoutProps) {
  const theme = useTheme();
  const formattedDate = article.createdAt ? format(new Date(article.createdAt), 'MMMM d, yyyy') : '';

  if (!translation) {
    return <Box>Article not found in this language.</Box>;
  }

  return (
    <Box sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
      {/* 1. Full-width, high-impact cover image */}
      <Box sx={{ position: 'relative', width: '100%', height: { xs: '50vh', md: '60vh' }, minHeight: '400px' }}>
        <Image
          src={article.coverImage}
          alt={translation.title}
          fill
          priority
          style={{ objectFit: 'cover' }}
          sizes="100vw"
        />
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 70%)' }} />
      </Box>

      {/* 2. Centered, elegant content container */}
      <Container maxWidth="md" sx={{ mt: -10, position: 'relative', zIndex: 1 }}>
        <Box sx={{ maxWidth: '750px', mx: 'auto', textAlign: 'center', bgcolor: 'background.paper', p: { xs: 3, md: 5}, borderRadius: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ fontWeight: 'bold', mb: 3 }}
          >
            {translation.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              color: 'text.secondary',
              mb: 4,
            }}
          >
            {article.author && (
              <>
                <Typography variant="body1" component="span" sx={{ fontWeight: 500 }}>
                  {article.author}
                </Typography>
                <Divider orientation="vertical" flexItem />
              </>
            )}
            <Typography variant="body1" component="span">
              {formattedDate}
            </Typography>
          </Box>
        </Box>
        
        {/* 3. The main article content, now with comprehensive styling */}
        <Box
          className="markdown-content"
          sx={{
            mt: 6,
            mx: 'auto',
            maxWidth: '750px',
            fontSize: '1.15rem',
            lineHeight: 1.8,
            color: 'text.secondary',
            fontFamily: '"Lora", "Georgia", serif', // Refined, elegant serif font

            '& h2, & h3': {
              color: 'text.primary',
              fontWeight: 'bold',
              marginTop: '2.5em',
              marginBottom: '1em',
              fontFamily: theme.typography.fontFamily, // Use default sans-serif for headings
            },
            '& p': {
              marginBottom: '1.5em',
            },
            '& img': {
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              marginTop: '2.5em',
              marginBottom: '2.5em',
              maxWidth: '100%',
              height: 'auto',
            },
            '& a': {
              color: 'primary.main',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            },

            // --- ADDED: Elegant Blockquotes ---
            '& blockquote': {
                borderLeft: `2px solid ${theme.palette.primary.main}`,
                pl: 3,
                my: 4,
                fontStyle: 'italic',
                fontSize: '1.25rem',
            },

            // --- ADDED: Clean & Minimalist Tables ---
            '& table': {
                width: '100%',
                borderCollapse: 'collapse',
                my: 4,
                fontSize: '1rem',
            },
            '& th, & td': {
                borderBottom: `1px solid ${theme.palette.divider}`,
                p: 2,
                textAlign: 'left',
            },
            '& th': {
                color: 'text.primary',
                fontWeight: 600,
            },
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {translation.content}
          </ReactMarkdown>
        </Box>
      </Container>
    </Box>
  );
}