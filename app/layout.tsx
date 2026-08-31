import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Instrument_Serif } from 'next/font/google';
import './globals.css';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'ST Photography',
  description: 'Photography & Cinematography',
};

const themeScript = `
(function () {
  try {
    var theme = localStorage.getItem('st-theme');
    var root = document.documentElement;

    if (theme === 'light') {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    } else {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    }
  } catch (error) {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
