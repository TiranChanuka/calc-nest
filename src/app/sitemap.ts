import { MetadataRoute } from "next";
import SEO_CONFIG from "@/lib/seo-config";

// Define all calculator routes
const calculatorRoutes = [
  // Health & Wellness
  "bmi",
  "calorie",
  "bmr",
  "body-fat",
  "protein",
  "water-intake",

  // Sleep & Time
  "sleep-cycle",
  "sleep-debt",
  "sleep-length",

  // Fitness & Activity
  "heart-rate",
  "calories-burned",
  "intermittent-fasting",

  // Women's Health
  "pregnancy-due-date",
  "ovulation",
  "period-cycle",

  // Health Risk Tools
  "diabetes-risk",
  "fiber-intake",
  "waist-hip-ratio",
];

const categoryRoutes = [
  "health-wellness",
  "sleep-time",
  "fitness-activity",
  "womens-health",
  "health-risk",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONFIG.site.url;
  const currentDate = new Date().toISOString();

  const routes: MetadataRoute.Sitemap = [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },

    // All calculators page
    {
      url: `${baseUrl}/all-calculators`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // Category pages
    ...categoryRoutes.map((route) => ({
      url: `${baseUrl}/${route}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    // Individual calculator pages
    ...calculatorRoutes.map((route) => ({
      url: `${baseUrl}/calculators/${route}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // Additional important pages
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return routes;
}
