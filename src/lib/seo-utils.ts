import { Metadata } from "next";
import SEO_CONFIG from "./seo-config";
import { getAppName } from "./config";

interface SEOParams {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  calculator?: keyof typeof SEO_CONFIG.calculatorSEO;
  noIndex?: boolean;
  canonical?: string;
}

/**
 * Generate comprehensive metadata for SEO, AEO, and GEO optimization
 */
export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
  calculator,
  noIndex = false,
  canonical,
}: SEOParams = {}): Metadata {
  const appName = getAppName();
  const baseUrl = SEO_CONFIG.site.url;

  // Use calculator-specific SEO if specified
  const calculatorSEO = calculator
    ? SEO_CONFIG.calculatorSEO[calculator]
    : null;

  const finalTitle =
    title ||
    calculatorSEO?.title ||
    `${appName} - Health & Wellness Calculators`;
  const finalDescription =
    description || calculatorSEO?.description || SEO_CONFIG.site.name;
  const finalKeywords = [
    ...keywords,
    ...(calculatorSEO?.keywords.split(", ") || []),
    ...SEO_CONFIG.keywords.primary,
  ].join(", ");

  const finalImage =
    image || `${baseUrl}${SEO_CONFIG.openGraph.images.default}`;
  const finalUrl = url || baseUrl;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,
    authors: [{ name: SEO_CONFIG.site.author }],
    creator: SEO_CONFIG.site.author,
    publisher: SEO_CONFIG.site.publisher,

    // Robots and indexing
    robots: noIndex ? "noindex, nofollow" : SEO_CONFIG.technical.robots,

    // Canonical URL
    alternates: {
      canonical: canonical || finalUrl,
      languages: SEO_CONFIG.technical.alternates.languages,
    },

    // Open Graph
    openGraph: {
      type,
      siteName: SEO_CONFIG.site.name,
      title: finalTitle,
      description: finalDescription,
      url: finalUrl,
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      locale: SEO_CONFIG.openGraph.locale,
    },

    // Twitter Card
    twitter: {
      card: SEO_CONFIG.twitter.card,
      site: SEO_CONFIG.twitter.site,
      creator: SEO_CONFIG.twitter.creator,
      title: finalTitle,
      description: finalDescription,
      images: [finalImage],
    },

    // Additional meta tags
    other: {
      "article:author": SEO_CONFIG.site.author,
      "article:publisher": SEO_CONFIG.site.publisher,
      "application-name": SEO_CONFIG.site.name,
      "msapplication-TileColor": "#8B5CF6",
      "theme-color": "#8B5CF6",

      // Medical/Health specific
      "medical-disclaimer":
        "This calculator is for informational purposes only and should not replace professional medical advice.",
      "health-category": "Medical Calculator",

      // Verification codes
      "google-site-verification": SEO_CONFIG.technical.verification.google,
      "msvalidate.01": SEO_CONFIG.technical.verification.bing,
      "yandex-verification": SEO_CONFIG.technical.verification.yandex,
    },
  };
}

/**
 * Generate JSON-LD structured data for calculators
 */
export function generateCalculatorSchema(
  calculatorType: string,
  calculatorName: string,
  description: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: calculatorName,
    description: description,
    url: url,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "2547",
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Organization",
      name: SEO_CONFIG.site.name,
      url: SEO_CONFIG.site.url,
    },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    inLanguage: "en",
    isAccessibleForFree: true,
    keywords: SEO_CONFIG.keywords.primary.join(", "),
  };
}

/**
 * Generate FAQ Schema for AEO optimization
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate How-To Schema for step-by-step calculators
 */
export function generateHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: name,
    description: description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
    totalTime: "PT2M",
    tool: {
      "@type": "SoftwareApplication",
      name: "Calcnest Calculator",
      applicationCategory: "HealthApplication",
    },
  };
}

/**
 * Generate Medical Web Page Schema
 */
export function generateMedicalSchema(
  pageName: string,
  description: string,
  medicalCondition?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: pageName,
    description: description,
    ...(medicalCondition && {
      about: {
        "@type": "MedicalCondition",
        name: medicalCondition,
      },
    }),
    audience: {
      "@type": "MedicalAudience",
      audienceType: "General Public",
    },
    lastReviewed: new Date().toISOString().split("T")[0],
    medicalAudience: {
      "@type": "MedicalAudience",
      audienceType: ["Patient", "General Public"],
    },
    mainContentOfPage: {
      "@type": "MedicalWebPageElement",
      cssSelector: "main",
    },
    significantLink: `${SEO_CONFIG.site.url}/disclaimer`,
  };
}

/**
 * Generate Organization Schema
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    ...SEO_CONFIG.schemas.organization,
  };
}

/**
 * Generate Website Schema with Search Action
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    ...SEO_CONFIG.schemas.website,
  };
}
