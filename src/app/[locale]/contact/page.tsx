// /src/app/contact/page.tsx
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import ContactSection from "@/components/sections/ContactSection";
import { Box } from "@mui/material";

export default function ContactPage() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      <Header />
      <main className="flex-grow">
        <ContactSection />
      </main>
      <Footer />
    </Box>
  );
}