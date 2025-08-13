import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generateSEOMetadata({
  title: "Free BMI Calculator - Accurate Body Mass Index Calculator | Calcnest",
  description:
    "Calculate your BMI instantly with our free, accurate BMI calculator. Get your body mass index, health category, and personalized recommendations. Trusted by millions worldwide.",
  keywords: [
    "BMI calculator",
    "body mass index calculator",
    "BMI chart",
    "healthy weight calculator",
    "obesity calculator",
    "underweight calculator",
    "overweight calculator",
    "free BMI calculator online",
    "accurate BMI calculator",
    "BMI calculator metric imperial",
  ],
  calculator: "bmi",
  canonical: "https://calcnest.com/calculators/bmi",
  image: "https://calcnest.com/images/bmi-calculator-og.png",
});

export default metadata;
