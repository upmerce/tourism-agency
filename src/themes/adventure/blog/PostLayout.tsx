// /src/themes/default/blog/PostLayout.tsx
'use client';

import React from 'react';
import { Box, Typography, Container, useTheme } from "@mui/material";
import { Article, ArticleTranslation } from "@/types/article";
import Image from "next/image";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { format } from 'date-fns';

interface PostLayoutProps {
  article: Article;
  translation: ArticleTranslation;
}

export default function PostLayout({ article, translation }: PostLayoutProps) {
    const theme = useTheme();
    const formattedDate = article.createdAt ? format(new Date(article.createdAt), 'MMMM d, yyyy') : '';

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            <main className="flex-grow">
                <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
                    <article>
                        <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
                            {translation.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            Published by {article.author} on {formattedDate}
                        </Typography>
                        <Box sx={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: '16/9',
                            maxHeight: '500px',
                            borderRadius: 2,
                            overflow: 'hidden',
                            mb: 4,
                        }}>
                            <Image
                                src={article.coverImage}
                                alt={translation.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                                sizes="(max-width: 768px) 100vw, 768px"
                            />
                        </Box>
                        
                        {/* This Box now contains all the styles for the Markdown content */}
                        <Box sx={{
                            // Base typography for the article content
                            fontFamily: 'Georgia, serif',
                            fontSize: { xs: '1rem', md: '1.1rem' },
                            lineHeight: 1.8,
                            color: 'text.primary',

                            // --- Headings ---
                            '& h2, & h3, & h4': {
                                fontFamily: theme.typography.fontFamily, // Use theme's default sans-serif
                                fontWeight: 'bold',
                                lineHeight: 1.3,
                                mt: 5,
                                mb: 2,
                            },
                            '& h2': { fontSize: '1.75rem' },
                            '& h3': { fontSize: '1.5rem' },
                            
                            // --- Blockquotes (Medium style) ---
                            '& blockquote': {
                                borderLeft: `3px solid ${theme.palette.text.primary}`,
                                pl: 2,
                                my: 4,
                                fontStyle: 'italic',
                                color: 'text.secondary',
                            },
                           '& img': {
                                // This is the most important rule. It ensures the image never
                                // grows wider than its containing element.
                                maxWidth: '100%',
                                
                                // This maintains the image's aspect ratio as it scales down.
                                height: 'auto',
                                
                                // These are for aesthetic spacing and styling.
                                borderRadius: 1,
                                my: 4,
                            },
                            // --- Links ---
                            '& a': {
                                color: 'primary.main',
                                textDecoration: 'underline',
                                '&:hover': {
                                    textDecoration: 'none',
                                }
                            },

                            // --- Images within content ---
                           

                            // --- Tables ---
                            '& table': {
                                width: '100%',
                                borderCollapse: 'collapse',
                                my: 4,
                            },
                            '& th, & td': {
                                border: `1px solid ${theme.palette.divider}`,
                                p: 1.5,
                                textAlign: 'left',
                            },
                            '& th': {
                                fontWeight: 'bold',
                                bgcolor: 'action.hover',
                            },
                        }}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {translation.content}
                            </ReactMarkdown>
                        </Box>
                    </article>
                </Container>
            </main>
        </Box>
    );
}