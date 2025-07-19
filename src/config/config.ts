/**
 * This file contains static configuration variables used throughout the application,
 * particularly for generating SEO metadata and site-wide branding.
 *
 * @see /lib/metadata.ts To see how these variables are used.
 */

// --- Brand & App Information ---
// -----------------------------------------------------------------------------

/**
 * The official name of the application. Used in titles and other branding.
 * @example "My Awesome App"
 */
export const APP_NAME: string = "Souss Massa Tours";

/**
 * The name of the platform or brand. Can be the same as APP_NAME.
 * Used for branding in places like Open Graph's `site_name`.
 * @example "My Awesome Platform"
 */
export const PLATEFORM: string = "Souss Massa Tours";

/**
 * The public-facing contact email for the application.
 * @example "contact@example.com"
 */
export const EMAIL: string = "contact@souss-massa-tours.com";

/**
 * The production URL of the website.
 * It's crucial to set the `NEXT_PUBLIC_SITE_URL` environment variable.
 */
export const SITE_URL: string = process.env.NEXT_PUBLIC_SITE_URL || "https://souss-massa-tours.com";



// --- SEO & Metadata Defaults ---
// -----------------------------------------------------------------------------

/**
 * The default locale for the website's content, following the IETF language tag format.
 * This is used in the HTML `lang` attribute and for Open Graph locale tags.
 * @example "en-US", "fr-FR", "ar-MA"
 */
export const DEFAULT_LOCALE: string = "fr-FR";

/**
 * A default description for the site, used as a fallback for pages that don't have a specific description.
 * Keep it concise and compelling.
 */
export const SITE_DESCRIPTION: string = "Explorez Agadir et sa région avec Souss Massa Tours. Nous proposons des excursions, des tours et des circuits personnalisés pour une expérience marocaine inoubliable.";



// --- Social Media & Authoring ---
// -----------------------------------------------------------------------------

/**
 * The name of the primary content creator or organization.
 * Used for `author` and `creator` metadata fields.
 * @example "John Doe" or "Acme Corp"
 */
export const CREATOR: string = "Upmerce Solutions";

/**
 * The name of the entity publishing the website.
 * @example "Acme Publishing"
 */
export const PUBLISHER: string = "Upmerce Solutions";

/**
 * The technology used to generate the website.
 * The `generator` meta tag indicates the software used to build the page.
 */
export const GENERATOR: string = "Next.js";

/**
 * The Twitter handle of the site's primary account (e.g., for the brand).
 * Used for the `twitter:site` metadata tag.
 * @example "@Nextjs"
 */
export const TWITTER_SITE_HANDLE: string = "@UpmerceSolutions";

/**
 * The **numerical** Twitter User ID for the site's account.
 * Used for the `twitter:site:id` metadata tag.
 * ℹ️ You can find this using a third-party tool like `tweeterid.com`.
 */
export const TWITTER_SITE_ID: string = "1234567890123456789"; // Replace with your actual numerical ID

/**
 * The Twitter handle of the content's author or creator.
 * Used for the `twitter:creator` metadata tag.
 */
export const TWITTER_CREATOR_HANDLE: string = "@Mustapha_Ouazza"; // Replace with the author's handle

/**
 * The **numerical** Twitter User ID for the content's author.
 * Used for the `twitter:creator:id` metadata tag.
 */
export const TWITTER_CREATOR_ID: string = "0987654321098765432"; // Replace with the author's numerical ID