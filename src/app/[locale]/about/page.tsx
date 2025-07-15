// /src/app/about/page.tsx
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import AboutSection from "@/components/sections/AboutSection";
import { Box } from "@mui/material";

export default function AboutPage() {
  return (
    // BEFORE: <Box className="flex flex-col min-h-screen bg-black">
    // AFTER:
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      bgcolor: 'background.default' // <-- Uses the theme's background color
    }}>
      <Header />
      <main className="flex-grow">
        <p> this is just to check vercel instant update!</p>
        <AboutSection />
      </main>
      <Footer />
    </Box>
  );
}