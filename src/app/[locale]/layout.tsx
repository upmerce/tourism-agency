// /src/app/[locale]/layout.tsx
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import global CSS
import "@/app/globals.css";
// --- NEW IMPORTS ---
import ThemeRegistry from "@/providers/ThemeRegistry";
import QueryProvider from "@/providers/QueryProvider";
////////////////
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
///////////////
// --- NEW IMPORTS ---


//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Souss-Massa Tours", // Updated title
  description: "Your adventure in Morocco starts here.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhpmA9dtkFe/pVGqG0M9JT1z9PTgMBDfVFPc=" crossOrigin=""/>
      </head>
      <body>
        {/* This provider makes the messages available to client components */}
        <NextIntlClientProvider >
          <QueryProvider>
            <ThemeRegistry>
              {children}
            </ThemeRegistry>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}