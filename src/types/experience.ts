// 1. NEW FILE: /src/types/experience.ts
// Create a new 'types' folder in your 'src' directory for this file.
// -------------------------------------------------------------------------
// Define the shape of a single translation object
export interface Translation {
  title: string;
  description: string;
  included?: string;
  notIncluded?: string;
  importantInfo?: string;
  itinerary?: string;
}

// Define the shape of a gallery image object
export interface GalleryImage {
    path: string;
    hidden: boolean;
}

// Define the comprehensive shape of our data
export interface Experience {
  id: string;
  title: string; // The English title for display in the table
  price: { amount: number; currency: string; prefix: string; };
  locationId: string;
  coverImage: string;
  galleryImages?: GalleryImage[];
  description: string; // The English description
  translations: {
    en?: Translation;
    fr?: Translation;
    // This allows for other languages to be added in the future
    [key: string]: Translation | undefined;
  };
}