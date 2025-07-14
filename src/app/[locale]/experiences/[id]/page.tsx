
// -------------------------------------------------------------------------
// 2. UPDATED FILE: /src/app/[locale]/experiences/[id]/page.tsx
// This page now only needs to render the main layout and the refactored details component.
// The review components will be moved inside the main details component later if needed.
// -------------------------------------------------------------------------
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import ExperienceDetails from "@/components/sections/ExperienceDetails";
import { Box, Container, Divider } from "@mui/material";
import ReviewsList from "@/components/reviews/ReviewsList";
import LeaveReviewForm from "@/components/reviews/LeaveReviewForm";

async function getClientConfig() {
  return {
    plugins: { 
      hasReviews: true,
      hasBookingEngine: true,
      hasBlog: true,
      }
  };
}

async function getExperienceDetails(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experiences/${id}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch experience details');
  }
  return res.json();
}
type Params = Promise<{ id: string, locale: string }>;
export default async function ExperienceDetailPage({ params }: { params: Params }) {
  const { id, locale } = await params;
  const experienceData = (await getExperienceDetails(id)).experience;
  const clientConfig = await getClientConfig();
  
  const experience = {
    ...experienceData,
    title: experienceData.translations?.[locale]?.title || experienceData.translations?.en?.title || 'Title Not Available',
    description: experienceData.translations?.[locale]?.description || experienceData.translations?.en?.description || 'Description Not Available',
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      // ✅ **FIX:** Add this style to prevent horizontal scroll from child components
      '& .main-content': {
        overflowX: 'hidden',
      }
    }}>
      <Header />
      {/* ✅ **FIX:** Add the corresponding className here */}
      <main className="main-content flex-grow">
        <ExperienceDetails experience={experience} />
        
        {clientConfig?.plugins?.hasReviews && (
          <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 12 } }}>
              <Divider sx={{ my: 8 }} />
              <ReviewsList experienceId={id} />
              <LeaveReviewForm experienceId={id} />
          </Container>
        )}
      </main>
      <Footer />
    </Box>
  );
}
