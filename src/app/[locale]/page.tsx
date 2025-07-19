// src/app/page.tsx
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedExperiences from "@/components/sections/FeaturedExperiences";
import WhyChooseUs from "@/components/sections/WhyChooseUs"; // <-- IMPORT HERE
import BlogHighlightsSection from "@/components/sections/BlogHighlightsSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import { Metadata } from "next";
import { generateStaticPageMetadata } from "@/lib/metadata";
import { getStaticPageMetadata } from "@/config/static-metadata";



// --- 2. This is the new, cleaner metadata function ---
type MetadataParams = Promise<{ locale: 'en' | 'fr' }>;

export async function generateMetadata({ 
  params,
}: { 
  params: MetadataParams 
}): Promise<Metadata> {
  // We simply call our helper with the page key and the current locale.
  const { locale } = await params;
  const metadata = getStaticPageMetadata('homepage', locale);
  
  return generateStaticPageMetadata({
    title: metadata.title,
    description: metadata.description,
    images: [metadata.ogImage],
    pathname: metadata.pathname,
  });
}
  

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* The new, professional order based on our analysis */}
        <HeroSection />
        <SocialProofSection />
        <FeaturedExperiences />
        <WhyChooseUs />
        <TestimonialsSection />
        <BlogHighlightsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}