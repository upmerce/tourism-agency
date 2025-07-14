// /src/components/experience/Itinerary.tsx
'use client';

import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslations } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ItineraryProps {
  itinerary?: string;
}

// A helper function to parse the itinerary text into day objects
const parseItinerary = (text: string) => {
  if (!text) return [];
  
  // We split the itinerary by "Day X:" or a similar pattern
  const days = text.split(/(?=^Day \d+:|Jour \d+:)/gim);
  
  return days.map(dayText => {
    const lines = dayText.trim().split('\n');
    const title = lines.shift() || ''; // The first line is the title (e.g., "Day 1: Arrival in Marrakech")
    const content = lines.join('\n').trim(); // The rest is the content
    return { title, content };
  }).filter(day => day.title); // Filter out any empty entries
};

export default function Itinerary({ itinerary }: ItineraryProps) {
  const t = useTranslations('ExperienceDetails');
  const parsedDays = parseItinerary(itinerary || '');

  // If there's no itinerary content, don't render anything
  if (parsedDays.length === 0) {
    return null;
  }

  return (
    <Box sx={{ my: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        {t('itineraryTitle')}
      </Typography>
      
      {parsedDays.map((day, index) => (
        <Accordion key={index} defaultExpanded={index === 0} sx={{ bgcolor: 'background.paper', '&:before': { display: 'none' }, boxShadow: 2, mb: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography sx={{ fontWeight: 'bold' }}>{day.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* We use ReactMarkdown to render the content for each day */}
            <Box sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              '& p': { mb: 2 },
              '& ul, & ol': { pl: 4, mb: 2 },
              '& li': { mb: 1 },
            }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {day.content}
              </ReactMarkdown>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
