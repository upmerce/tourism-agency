/**
 * @file lib/static-metadata.ts
 * This file centralizes all metadata (title, description, OG image, pathname)
 * for static pages.
 */

import { siteConfig } from '@/config/site';

// --- 1. DEFINE THE NEW SeoImage TYPE ---
export type SeoImage = {
  src: string; // Should be a relative path from the /public folder
  alt: string;
};

// Update the main return type
export type PageMetadata = {
  title: string;
  description: string;
  ogImage: SeoImage;
  pathname: string;
};

export type StaticPageKey = keyof typeof metadataStore;
export type Locale = 'en' | 'fr';

/**
 * The database containing all static metadata.
 * The ogImage property is now a structured object.
 */
/**
 * The database containing all static metadata.
 * The ogImage property is now a structured object for all pages.
 */
const metadataStore = {
  homepage: {
    en: {
      title: "Authentic Moroccan Adventures",
      description: "Discover authentic, private tours in Agadir, Marrakech, and the Sahara. We offer bespoke experiences, from desert treks to cultural city tours, crafted by local experts.",
      ogImage: { 
        src: "/images/og/og-homepage.webp",
        alt: "Panoramic view of a Moroccan desert landscape at sunset."
      }
    },
    fr: {
      title: "Aventures Marocaines Authentiques",
      description: "Découvrez des circuits privés et authentiques à Agadir, Marrakech et dans le Sahara. Nous proposons des expériences sur mesure, des treks dans le désert aux visites culturelles, conçues par des experts locaux.",
      ogImage: { 
        src: "/images/og/og-homepage.webp",
        alt: "Vue panoramique d'un paysage désertique marocain au coucher du soleil."
      }
    }
  },
  about: {
    en: {
      title: "Our Story",
      description: "Learn about our passion for responsible tourism and our mission to share the authentic beauty of Morocco. Meet our team of local expert guides.",
      ogImage: { 
        src: "/images/og/og-about.webp",
        alt: "A traditional Moroccan tagine being prepared in a riad."
      }
    },
    fr: {
      title: "Notre Histoire",
      description: "Découvrez notre passion pour le tourisme responsable et notre mission de partager la beauté authentique du Maroc. Rencontrez notre équipe de guides experts locaux.",
      ogImage: { 
        src: "/images/og/og-about.webp",
        alt: "Un tajine marocain traditionnel en cours de préparation dans un riad."
      }
    }
  },
  contact: {
    en: {
      title: "Contact Us",
      description: "Ready to plan your adventure? Get in touch with our team to create your perfect, tailor-made Moroccan journey.",
      ogImage: { 
        src: "/images/og/og-contact.webp",
        alt: "A map of Morocco with a pin on the Souss-Massa region."
      }
    },
    fr: {
      title: "Contactez-Nous",
      description: "Prêt à planifier votre aventure ? Contactez notre équipe pour créer votre voyage marocain sur mesure parfait.",
      ogImage: { 
        src: "/images/og/og-contact.webp",
        alt: "Une carte du Maroc avec une épingle sur la région de Souss-Massa."
      }
    }
  },
  experiences: {
    en: {
      title: "All Our Tours",
      description: "Browse our complete collection of curated tours and authentic experiences across Agadir, Marrakech, the Atlas Mountains, and the Sahara Desert.",
      ogImage: { 
        src: "/images/og/og-experiences.webp",
        alt: "A collage of different Moroccan experiences: desert, mountains, and coast."
      }
    },
    fr: {
      title: "Tous Nos Circuits",
      description: "Parcourez notre collection complète de circuits organisés et d'expériences authentiques à travers Agadir, Marrakech, les montagnes de l'Atlas et le désert du Sahara.",
      ogImage: { 
        src: "/images/og/og-experiences.webp",
        alt: "Un collage de différentes expériences marocaines : désert, montagnes et côte."
      }
    }
  },
  blog: {
    en: {
      title: "Our Journal",
      description: "Read our latest articles and travel guides about exploring the beautiful Souss-Massa region of Morocco.",
      ogImage: { 
        src: "/images/og/og-blog.webp",
        alt: "A person writing in a travel journal with a Moroccan landscape in the background."
      }
    },
    fr: {
      title: "Notre Journal",
      description: "Lisez nos derniers articles et guides de voyage sur l'exploration de la magnifique région de Souss-Massa au Maroc.",
      ogImage: { 
        src: "/images/og/og-blog.webp",
        alt: "Une personne écrivant dans un carnet de voyage avec un paysage marocain en arrière-plan."
      }
    }
  }
} as const;

const pathStore = {
    homepage: '/',
    about: '/about',
    contact: '/contact',
    experiences: '/experiences',
    blog: '/blog'
} as const;

/**
 * Retrieves the complete, structured metadata for a given static page and locale.
 */
export function getStaticPageMetadata(
  pageKey: StaticPageKey,
  locale: Locale
): PageMetadata {
  const fallback = metadataStore.homepage.en;
  const pageTranslations = metadataStore[pageKey];
  const content = pageTranslations?.[locale] || pageTranslations?.en || fallback;
  const pathname = pathStore[pageKey] || '/';
  
  const finalTitle = pageKey === 'homepage' 
    ? `${siteConfig.name} | ${content.title}` 
    : `${content.title} | ${siteConfig.name}`;

  return {
    title: finalTitle,
    description: content.description,
    ogImage: content.ogImage,
    pathname: pathname
  };
}