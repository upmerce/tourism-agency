// /src/themes/adventure/sections/ExperienceDetails.tsx
'use client';

import React from 'react';
import { Grid, Typography, Box, Container, Divider} from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
//import ReactMarkdown from 'react-markdown';
//import remarkGfm from 'remark-gfm';

// Import shared components
import Inclusions from '@/components/experience/Inclusions';
import Itinerary from '@/components/experience/Itinerary';
import ImageGallery from '@/components/experience/ImageGallery';
// import BookingForm from '@/components/booking/BookingForm'; // Import BookingForm directly
import { Experience } from '@/types/experience';
import { locations } from '@/config/locations';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AdventureReviewsList from '../reviews/ReviewsList';
import AdventureLeaveReviewForm from '../reviews/LeaveReviewForm';
import StickyBookingWidget from '@/components/booking/StickyBookingWidget';

export type ExperienceDetailsProps = {
  experience: Experience;
  clientConfig: { plugins: { hasReviews?: boolean } }; // Pass the client config here
};

export default function ExperienceDetails({ experience, clientConfig }: ExperienceDetailsProps) {
  const locale = useLocale();
  const t = useTranslations('ExperienceDetails');
  const translation = experience.translations?.[locale] || experience.translations?.en;
  const location = locations.find(loc => loc.id === experience.locationId);

 return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Box sx={{ 
        position: 'relative', width: '100%', height: '65vh', minHeight: '450px', display: 'flex', 
        alignItems: 'flex-end', color: 'white', backgroundImage: `url(${experience.coverImage})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 20%, transparent 60%)' }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pb: 6 }}>
            <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {translation?.title}
            </Typography>
            {location && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body1">{location.name}</Typography>
              </Box>
            )}
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={8}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="h5" component="p" sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.7 }}>
              {translation?.description}
            </Typography>
            
            <ImageGallery 
              coverImage={experience.coverImage}
              galleryImages={experience.galleryImages || []}
              altText={translation?.title || ''}
            />

            <Divider sx={{ my: 5 }} />
            <Inclusions 
              included={translation?.included}
              notIncluded={translation?.notIncluded}
            />
            <Itinerary itinerary={translation?.itinerary} />
            
            {translation?.importantInfo && (
              <>
                <Divider sx={{ my: 4 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>{t('importantInfoTitle')}</Typography>
                  <Box sx={{ '& p, & ul, & li': { color: 'text.secondary' } }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{translation.importantInfo}</ReactMarkdown>
                  </Box>
                </Box>
              </>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ position: 'sticky', top: '100px' }}>
              <StickyBookingWidget 
                    experience={experience}
                    experienceId={experience.id}
                    experienceTitle={translation?.title || experience.title || ''}
                />
            </Box>
          </Grid>
        </Grid>
        
        {/* --- 3. THE FULLY INTEGRATED REVIEWS SECTION --- */}
        {clientConfig?.plugins?.hasReviews && (
          <>
            <Divider sx={{ my: 8 }} />
            <AdventureReviewsList experienceId={experience.id} />
            <AdventureLeaveReviewForm experienceId={experience.id} />
          </>
        )}
      </Container>
    </Box>
  );
}