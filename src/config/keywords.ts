/**
 * This file contains SEO keywords for the tourism platform.
 * Keywords are provided in both English and French to target a wider audience
 * searching for travel experiences in Morocco.
 */

// --- English Keywords (25) ---
const englishKeywords: string[] = [
    'morocco travel',
    'visit morocco',
    'morocco tourism',
    'marrakech guide',
    'fes medina',
    'sahara desert tours',
    'atlas mountains hiking',
    'agadir beach holiday',
    'chefchaouen blue city',
    'essaouira surf',
    'morocco vacation packages',
    'riads in morocco',
    'moroccan food tour',
    'camel trekking sahara',
    'morocco adventure travel',
    'things to do in morocco',
    'morocco cultural tours',
    'luxury travel morocco',
    'budget travel morocco',
    'morocco historical sites',
    'shopping in moroccan souks',
    'rabat attractions',
    'casablanca travel',
    'morocco family vacation',
    'morocco desert camping',
];

// --- French Keywords (25) ---
const frenchKeywords: string[] = [
    'voyage maroc',
    'visiter le maroc',
    'tourisme maroc',
    'guide de marrakech',
    'médina de fès',
    'excursions désert sahara',
    'randonnée montagnes atlas',
    'vacances plage agadir',
    'chefchaouen la ville bleue',
    'surf à essaouira',
    'séjours au maroc',
    'riads au maroc',
    'tour gastronomique maroc',
    'randonnée chameau sahara',
    "voyage d'aventure maroc",
    'que faire au maroc',
    'circuits culturels maroc',
    'voyage de luxe maroc',
    'voyage pas cher maroc',
    'sites historiques maroc',
    'shopping souks marocains',
    'attractions de rabat',
    'voyager à casablanca',
    'vacances en famille maroc',
    'bivouac désert maroc',
];

/**
 * A combined list of keywords for use in the <meta name="keywords"> tag.
 * While major search engines like Google place little to no weight on this tag for ranking,
 * it can still be used by other systems and for internal site search.
 */
export const keywords: string[] = [...englishKeywords, ...frenchKeywords];