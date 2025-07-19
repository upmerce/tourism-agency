import { EMAIL } from "@/lib/config";
import { Robots } from "next/dist/lib/metadata/types/metadata-types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
export const ROBOTS: Robots = {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };
  export const VERIFICATION= {
      google: 'google',
      yandex: 'yandex',
      yahoo: 'yahoo',
      other: {
        me: [EMAIL, `${baseUrl}/contact`],
      },
    };
  export const MEDIA =  {'only screen and (max-width: 600px)': `${baseUrl}/mobile`};
  export const APP_LINKS = {
        /* ios: {
          url: 'https://nextjs.org/ios',
          app_store_id: 'app_store_id',
        }, */
        /* android: {
          package: 'com.newsoftroid.market',
          app_name: 'miftah vendre et acheter',
        }, */
        web: {
          url: baseUrl,
          should_fallback: true,
        },
     };    