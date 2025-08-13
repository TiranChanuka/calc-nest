import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import {
  generateSEOMetadata,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from "@/lib/seo-utils";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Generate comprehensive SEO metadata
export const metadata: Metadata = generateSEOMetadata({
  title:
    "Calcnest - Free Health & Wellness Calculators | BMI, Calorie, Sleep Tools",
  description:
    "Comprehensive collection of free, accurate health calculators including BMI, calorie, sleep cycle, fitness, and women's health tools. Trusted by millions worldwide.",
  keywords: [
    "health calculator",
    "BMI calculator",
    "calorie calculator",
    "sleep calculator",
    "fitness calculator",
    "pregnancy calculator",
    "wellness tools",
    "medical calculator",
    "health assessment",
  ],
  type: "website",
  icons: {
    icon: [
      {
        url: process.env.NEXT_PUBLIC_FAVICON_ICO || "/favicon.ico",
        sizes: "32x32",
      },
      {
        url: process.env.NEXT_PUBLIC_FAVICON_SVG || "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: process.env.NEXT_PUBLIC_FAVICON_ICO || "/favicon.ico",
    apple: [
      {
        url: process.env.NEXT_PUBLIC_FAVICON_PNG || "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
});

// Viewport configuration for mobile optimization
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#8B5CF6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Structured Data for SEO/AEO/GEO */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for common external resources */}
        <link rel="dns-prefetch" href="//google-analytics.com" />
        <link rel="dns-prefetch" href="//googletagmanager.com" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50 font-sans`}>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow" role="main">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
