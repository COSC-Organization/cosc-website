import type { Metadata } from 'next';
import { Geist, Geist_Mono, Cormorant } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const cormorant = Cormorant({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'COSC',
  description: 'COSC',
  icons: {
    icon: '/cosc.jpeg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" href="/1.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/2.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/3.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/6.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/7.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/8.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/9.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/4.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/5.mp4" as="video" type="video/mp4" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
