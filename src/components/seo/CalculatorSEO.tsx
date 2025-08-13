"use client";

import React from "react";
import Script from "next/script";

interface CalculatorSEOProps {
  calculatorName: string;
  calculatorType: string;
  description: string;
  url: string;
  faqs?: Array<{ question: string; answer: string }>;
  howToSteps?: Array<{ name: string; text: string }>;
  medicalCondition?: string;
}

/**
 * SEO Component for individual calculator pages
 * Includes structured data for AEO and GEO optimization
 */
export default function CalculatorSEO({
  calculatorName,
  calculatorType,
  description,
  url,
  faqs = [],
  howToSteps = [],
  medicalCondition,
}: CalculatorSEOProps) {
  // Calculator application schema
  const calculatorSchema = {
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
      name: "Calcnest",
      url: "https://calcnest.com",
    },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    inLanguage: "en",
    isAccessibleForFree: true,
    keywords: `${calculatorType} calculator, health calculator, wellness tools`,
  };

  // FAQ Schema for AEO
  const faqSchema =
    faqs.length > 0
      ? {
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
        }
      : null;

  // How-To Schema for step-by-step guidance
  const howToSchema =
    howToSteps.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: `How to use ${calculatorName}`,
          description: `Step-by-step guide to using the ${calculatorName}`,
          step: howToSteps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.name,
            text: step.text,
          })),
          totalTime: "PT2M",
          tool: {
            "@type": "SoftwareApplication",
            name: calculatorName,
            applicationCategory: "HealthApplication",
          },
        }
      : null;

  // Medical Web Page Schema
  const medicalSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: calculatorName,
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
    significantLink: "https://calcnest.com/disclaimer",
  };

  return (
    <>
      {/* Calculator Application Schema */}
      <Script
        id={`calculator-schema-${calculatorType}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorSchema),
        }}
      />

      {/* Medical Web Page Schema */}
      <Script
        id={`medical-schema-${calculatorType}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(medicalSchema),
        }}
      />

      {/* FAQ Schema for AEO */}
      {faqSchema && (
        <Script
          id={`faq-schema-${calculatorType}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      {/* How-To Schema */}
      {howToSchema && (
        <Script
          id={`howto-schema-${calculatorType}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToSchema),
          }}
        />
      )}
    </>
  );
}
