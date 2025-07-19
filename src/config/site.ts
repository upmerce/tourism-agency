// -------------------------------------------------------------------------
// 1. NEW FILE: /src/config/site.ts
// Create a new 'config' folder in your 'src' directory for this file.
// -------------------------------------------------------------------------
export type SiteConfig = {
  name: string;
 // description: string;
  url: string;
  ogImage: string;
  contact: {
    email: string;
    phone: string;
  };
  social: {
    twitter: string;
    instagram: string;
    facebook: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Souss-Massa Tours",
 // description: "Discover authentic, private tours in Agadir, Marrakech, and the Sahara. We offer bespoke experiences, from desert treks to cultural city tours, crafted by local experts.",
  url: "https://tourism-template-eat4.vercel.app", // Your live Vercel URL
  ogImage: "/images/og-image.png", // The path to your social media card image
  contact: {
    email: "contact@souss-massatours.com",
    phone: "+212 123 456 789",
  },
  social: {
    twitter: "https://twitter.com/your_handle",
    instagram: "https://instagram.com/your_handle",
    facebook: "https://facebook.com/your_handle",
  },
};