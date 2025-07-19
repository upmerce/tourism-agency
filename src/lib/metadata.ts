import ExtendedMetadata from "@/interfaces/ExtentedMetadata";
import { ARCHIVES, BOOKMARKS, CATEGORY, FORMAT_DETECTION, ICONS, ITUNES, OTHER } from "@/config/metadata";
import { AUTHORS } from "@/config/metadata/authors";
import { APP_LINKS, MEDIA, ROBOTS, VERIFICATION } from "@/config/metadata/robots";
import { APP_NAME, CREATOR, TWITTER_CREATOR_ID, DEFAULT_LOCALE, GENERATOR, PLATEFORM, PUBLISHER, TWITTER_SITE_ID } from "../config/config";
import { keywords } from "@/config/keywords";

// --- TYPE DEFINITIONS ---

/** Represents a standard image object for SEO purposes. */
type SeoImage = {
  src: string; // Should be a relative path from the base URL
  alt: string;
};

/** Defines the required options for generating page metadata. */
type MetadataOptions = {
  title: string;
  description:string;
  // CHANGE: Switched to a single `images` array for simplicity. Can be extended for specific OG/Twitter images if needed.
  images: SeoImage[];
  // CHANGE: Renamed from `baseUrl` to `pathname` for clarity, as it represents the path relative to the site's base URL.
  pathname: string;
  url: string; // Mandatory website URL for the page, used in Open Graph and Twitter metadata.
  locale?: string;
};

// --- INTERNAL IMPLEMENTATION ---

/**
 * @internal
 * Constructs the full metadata object. This is a base function not meant for direct use.
 *
 * @param {MetadataOptions} options - The core options for metadata generation.
 * @returns {ExtendedMetadata} The complete metadata object for a page.
 */
function _generateBaseMetadata({
  title,
  description,
  pathname,
  url,
  images,
  locale = DEFAULT_LOCALE, // CHANGE: Added a default locale from config for consistency.
}: MetadataOptions): ExtendedMetadata {
  // CHANGE: Constructs the absolute URL for the current page.
  const canonicalUrl = new URL(pathname, url).toString();

  // CHANGE: Uses `new URL()` for robust path joining and creates full, secure URLs.
  const imageObjects = images.map(({ src, alt }) => {
    const absoluteSrc = new URL(src, url).toString();
    return {
      url: absoluteSrc,
      secureUrl: absoluteSrc,
      alt,
    };
  });

  return {
    // Core Metadata
    title,
    description,
    applicationName: APP_NAME,
    generator: GENERATOR,
    creator: CREATOR,
    publisher: PUBLISHER,
    referrer: 'origin-when-cross-origin',
    keywords,
    authors: AUTHORS,
    manifest: new URL('/manifest.webmanifest', url).toString(), // CHANGE: Robust manifest URL
    category: CATEGORY,

    // Social & Rich Previews
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: APP_NAME,
      images: imageObjects.map(img => ({ ...img, width: 1200, height: 630 })),
      // CHANGE: Removed the `videos` property which was incorrectly using image data.
      // If video previews are needed, a separate `videos` property should be passed in.
      locale,
      type: "website",
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      // CHANGE: Moved hardcoded IDs to a central config file for easier management.
      siteId: TWITTER_SITE_ID,
      creator: CREATOR,
      creatorId: TWITTER_CREATOR_ID,
      images: imageObjects,
      // CHANGE: Corrected app data and used constants.
      app: {
        name: 'Google Play',
        id: {
          googleplay: 'com.newsoftroid.market',
        },
        url: {
          googleplay: 'https://play.google.com/store/apps/details?id=com.newsoftroid.market',
        },
      },
    },

    // URLs & Linking
    alternates: {
      canonical: canonicalUrl,
      // Consider adding language alternates here if the app is multi-lingual
      // languages: { 'en-US': '/en-US', 'es-ES': '/es-ES' }
    },
    appLinks: APP_LINKS,

    // Icons & Appearance
    icons: ICONS,
    appleWebApp: {
      title: PLATEFORM || APP_NAME,
      statusBarStyle: 'black-translucent',
      // CHANGE: Simplified startup image logic. Assumes a single image for this media query.
      // For a full PWA experience, provide an array of images for different device sizes.
      startupImage: MEDIA['only screen and (max-width: 600px)'] ? [MEDIA['only screen and (max-width: 600px)']]  : [],
    },

    // Verification & Robots
    verification: VERIFICATION,
    robots: ROBOTS,
    
    // Other Metadata
    itunes: ITUNES,
    archives: ARCHIVES,
    bookmarks: BOOKMARKS,
    formatDetection: FORMAT_DETECTION,
    other: OTHER,
  };
}

// --- PUBLIC API ---

/**
 * Builds SEO metadata for a static page (e.g., About, Contact).
 *
 * @param {MetadataOptions} options - Options for generating metadata, including title, description, images, and the page's pathname.
 * @returns {ExtendedMetadata} A fully populated metadata object.
 *
 * @example
 * ```ts
 * // In /app/about/page.tsx
 * export async function generateMetadata(): Promise<Metadata> {
 * return generatePageMetadata({
 * title: "About Us",
 * description: "Learn more about our company's mission and team.",
 * images: [{ src: '/images/about-hero.jpg', alt: 'Our team' }],
 * pathname: '/about'
 * });
 * }
 * ```
 */
export function generateStaticPageMetadata(options: MetadataOptions): ExtendedMetadata {
  return _generateBaseMetadata(options);
}

/**
 * Builds SEO metadata for a dynamic page (e.g., a blog post, product detail).
 * This function serves as a clear, semantic alias for `generatePageMetadata`.
 *
 * @param {MetadataOptions} options - Options containing dynamic title, description, images, and the page's pathname.
 * @returns {ExtendedMetadata} A fully populated metadata object.
 *
 * @example
 * ```ts
 * // In /app/posts/[slug]/page.tsx
 * export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
 * const post = await getPostData(params.slug);
 *
 * if (!post) {
 * return notFound();
 * }
 *
 * return generateDynamicPageMetadata({
 * title: post.title,
 * description: post.excerpt,
 * images: [{ src: post.featuredImage, alt: post.title }],
 * pathname: `/posts/${post.slug}`
 * });
 * }
 * ```
 */
export function generateDynamicPageMetadata(options: MetadataOptions): ExtendedMetadata {
  return _generateBaseMetadata(options);
}