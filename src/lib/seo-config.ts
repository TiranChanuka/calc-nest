/**
 * SEO Configuration for Calcnest Health Calculator Website
 * Optimized for Search Engines, Answer Engines, and Generative AI
 */

export const SEO_CONFIG = {
  // Base Site Configuration
  site: {
    name: "Calcnest",
    url: "https://calcnest.com", // Update with your actual domain
    domain: "calcnest.com",
    logo: "/images/logo.png",
    favicon: "/favicon.ico",
    author: "Calcnest Team",
    publisher: "Calcnest",
    language: "en",
    region: "US",
    charset: "UTF-8",
  },

  // Primary Keywords & Semantic Clusters
  keywords: {
    primary: [
      "health calculator",
      "wellness tools",
      "medical calculator",
      "health assessment tools",
      "fitness calculator",
    ],
    semantic: [
      "BMI calculator free online",
      "calorie calculator daily intake",
      "sleep cycle calculator",
      "pregnancy due date calculator",
      "heart rate calculator zones",
      "body fat percentage calculator",
      "water intake calculator daily",
      "protein calculator daily needs",
      "diabetes risk calculator",
      "ovulation calculator free",
    ],
    longtail: [
      "how to calculate BMI accurately",
      "best free health calculators online",
      "accurate calorie calculator for weight loss",
      "sleep calculator for optimal rest",
      "pregnancy calculator week by week",
      "fitness calculator for beginners",
      "women's health calculator tools",
      "health risk assessment calculators",
    ],
  },

  // Structured Data Schema Types
  schemas: {
    organization: {
      "@type": "Organization",
      name: "Calcnest",
      alternateName: "Calcnest Health Tools",
      description:
        "Leading provider of free, accurate health and wellness calculators",
      url: "https://calcnest.com",
      logo: "https://calcnest.com/images/logo.png",
      sameAs: [
        "https://twitter.com/calcnest",
        "https://facebook.com/calcnest",
        "https://instagram.com/calcnest",
        "https://linkedin.com/company/calcnest",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-555-CALCNEST",
        contactType: "Customer Service",
        availableLanguage: "English",
      },
    },
    website: {
      "@type": "WebSite",
      name: "Calcnest - Health & Wellness Calculators",
      url: "https://calcnest.com",
      description:
        "Comprehensive collection of health calculators for BMI, calories, sleep, fitness, and women's health",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://calcnest.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    medicalWebPage: {
      "@type": "MedicalWebPage",
      about: {
        "@type": "MedicalCondition",
        name: "Health Assessment and Wellness Planning",
      },
      audience: {
        "@type": "MedicalAudience",
        audienceType: "General Public",
      },
      lastReviewed: new Date().toISOString().split("T")[0],
      medicalAudience: {
        "@type": "MedicalAudience",
        audienceType: ["Patient", "General Public"],
      },
    },
  },

  // Open Graph & Social Media
  openGraph: {
    type: "website",
    siteName: "Calcnest",
    locale: "en_US",
    images: {
      default: "/images/og-default.png",
      calculator: "/images/og-calculator.png",
      health: "/images/og-health.png",
    },
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@calcnest",
    creator: "@calcnest",
  },

  // Technical SEO
  technical: {
    robots:
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    canonical: true,
    alternates: {
      languages: {
        en: "https://calcnest.com",
        es: "https://calcnest.com/es",
        fr: "https://calcnest.com/fr",
      },
    },
    verification: {
      google: "your-google-verification-code",
      bing: "your-bing-verification-code",
      yandex: "your-yandex-verification-code",
    },
  },

  // Calculator-Specific SEO Templates
  calculatorSEO: {
    bmi: {
      title:
        "Free BMI Calculator - Accurate Body Mass Index Calculator | Calcnest",
      description:
        "Calculate your BMI instantly with our free, accurate BMI calculator. Get your body mass index, health category, and personalized recommendations. Trusted by millions.",
      keywords:
        "BMI calculator, body mass index calculator, BMI chart, healthy weight calculator, obesity calculator",
      schema: "MedicalCalculator",
    },
    calorie: {
      title:
        "Daily Calorie Calculator - Free Calorie Intake Calculator | Calcnest",
      description:
        "Calculate your daily calorie needs for weight loss, maintenance, or gain. Free calorie calculator with personalized recommendations based on your goals.",
      keywords:
        "calorie calculator, daily calorie intake, calorie needs calculator, weight loss calculator, TDEE calculator",
      schema: "NutritionCalculator",
    },
    sleep: {
      title:
        "Sleep Calculator - Optimal Sleep Cycle & Bedtime Calculator | Calcnest",
      description:
        "Find your perfect bedtime and wake time with our sleep cycle calculator. Optimize your sleep quality and wake up refreshed every morning.",
      keywords:
        "sleep calculator, sleep cycle calculator, bedtime calculator, optimal sleep time, sleep quality",
      schema: "HealthCalculator",
    },
    pregnancy: {
      title:
        "Pregnancy Due Date Calculator - Accurate Due Date Calculator | Calcnest",
      description:
        "Calculate your pregnancy due date and track your pregnancy week by week. Free, accurate pregnancy calculator used by expecting mothers worldwide.",
      keywords:
        "pregnancy calculator, due date calculator, pregnancy week calculator, conception calculator",
      schema: "MedicalCalculator",
    },
  },

  // AEO (Answer Engine Optimization) Structure
  aeo: {
    faqStructure: true,
    howToSchema: true,
    stepByStepGuides: true,
    quickAnswers: true,
    featureSnippets: true,
  },

  // GEO (Generative Engine Optimization) Elements
  geo: {
    authoritySignals: true,
    citationFormat: true,
    factualAccuracy: true,
    sourceCredibility: true,
    contextualRelevance: true,
  },
} as const;

export default SEO_CONFIG;
