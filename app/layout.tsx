import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://stphotography.bd'),

  title: {
    default: 'ST Photography | Interior Photography & Cinematography',
    template: '%s | ST Photography',
  },

  description:
    'ST Photography creates considered visual stories through interior photography and cinematography for architecture, interiors, and design spaces in Bangladesh.',

  applicationName: 'ST Photography',

  keywords: [
    'ST Photography',
    'interior photography Bangladesh',
    'interior photographer Bangladesh',
    'interior photography Dhaka',
    'interior photographer Dhaka',
    'interior cinematography Bangladesh',
    'architectural photography Bangladesh',
    'architecture photography Dhaka',
  ],

  authors: [{ name: 'ST Photography' }],
  creator: 'ST Photography',
  publisher: 'ST Photography',

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stphotography.bd',
    siteName: 'ST Photography',
    title: 'ST Photography | Interior Photography & Cinematography',
    description:
      'Interior photography and cinematography for architecture, interiors, and design spaces in Bangladesh.',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ST Photography | Interior Photography & Cinematography',
    description:
      'Interior photography and cinematography for architecture, interiors, and design spaces in Bangladesh.',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://stphotography.bd/#organization',
      name: 'ST Photography',
      url: 'https://stphotography.bd',
      description:
        'ST Photography is a visual studio creating considered photography and cinematography for interiors, architecture, people, and brands in Bangladesh.',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://stphotography.bd/#website',
      url: 'https://stphotography.bd',
      name: 'ST Photography',
      description:
        'Interior photography and cinematography for architecture, interiors, and design spaces in Bangladesh.',
      publisher: {
        '@id': 'https://stphotography.bd/#organization',
      },
      inLanguage: 'en',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {children}
      </body>
    </html>
  );
}
