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