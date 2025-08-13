"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowLeft, Info, TrendingUp } from "lucide-react";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import CalculatorSEO from "@/components/seo/CalculatorSEO";
import FAQSection from "@/components/seo/FAQSection";
import Breadcrumb from "@/components/seo/Breadcrumb";

// SEO data for BMI Calculator
const bmiFAQs = [
  {
    question: "What is BMI and how is it calculated?",
    answer:
      "BMI (Body Mass Index) is a measure of body fat based on height and weight. It's calculated by dividing your weight in kilograms by your height in meters squared (kg/m²). For imperial units, the formula is (weight in pounds × 703) ÷ (height in inches)².",
  },
  {
    question: "Is BMI an accurate measure of health?",
    answer:
      "BMI is a useful screening tool but has limitations. It doesn't distinguish between muscle and fat mass, and may not accurately reflect health status for athletes, elderly individuals, or certain ethnic groups. It's best used alongside other health assessments.",
  },
  {
    question: "What are the BMI categories?",
    answer:
      "BMI categories are: Underweight (below 18.5), Normal weight (18.5-24.9), Overweight (25-29.9), and Obese (30 and above). These ranges are based on research linking BMI to health risks.",
  },
  {
    question: "How often should I check my BMI?",
    answer:
      "For most adults, checking BMI monthly or quarterly is sufficient unless you're actively trying to gain or lose weight. Regular monitoring can help track progress and identify health trends over time.",
  },
  {
    question: "Can children use BMI calculators?",
    answer:
      "Children and teens should use age and gender-specific BMI percentile calculators rather than adult BMI calculators, as their body composition changes with growth and development.",
  },
];

const breadcrumbItems = [
  { name: "Health & Wellness", href: "/health-wellness" },
  { name: "BMI Calculator" },
];

export default function BMICalculatorPage() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    healthyWeightRange: string;
    recommendations: string[];
  } | null>(null);

  const calculateBMI = () => {
    if (!weight || !height) return;

    let weightKg = parseFloat(weight);
    let heightM = parseFloat(height);

    // Convert to metric if needed
    if (unit === "imperial") {
      weightKg = weightKg * 0.453592; // pounds to kg
      heightM = heightM * 0.0254; // inches to meters
    } else {
      heightM = heightM / 100; // cm to meters
    }

    const bmi = weightKg / (heightM * heightM);

    let category = "";
    let recommendations: string[] = [];

    if (bmi < 18.5) {
      category = "Underweight";
      recommendations = [
        "Consult a healthcare provider for personalized advice",
        "Focus on nutrient-dense, calorie-rich foods",
        "Consider strength training to build muscle mass",
        "Monitor your health regularly",
      ];
    } else if (bmi < 25) {
      category = "Normal weight";
      recommendations = [
        "Maintain your current healthy lifestyle",
        "Continue regular physical activity",
        "Eat a balanced, nutritious diet",
        "Monitor your weight regularly",
      ];
    } else if (bmi < 30) {
      category = "Overweight";
      recommendations = [
        "Aim for gradual weight loss (1-2 lbs per week)",
        "Increase physical activity to 150+ minutes per week",
        "Focus on portion control and healthy eating",
        "Consider consulting a nutritionist",
      ];
    } else {
      category = "Obese";
      recommendations = [
        "Consult a healthcare provider for a comprehensive plan",
        "Consider supervised weight loss programs",
        "Focus on sustainable lifestyle changes",
        "Regular monitoring of health markers",
      ];
    }

    // Calculate healthy weight range
    const minHealthyWeight = 18.5 * (heightM * heightM);
    const maxHealthyWeight = 24.9 * (heightM * heightM);

    let healthyWeightRange = "";
    if (unit === "imperial") {
      const minLbs = Math.round(minHealthyWeight * 2.20462);
      const maxLbs = Math.round(maxHealthyWeight * 2.20462);
      healthyWeightRange = `${minLbs} - ${maxLbs} lbs`;
    } else {
      healthyWeightRange = `${Math.round(minHealthyWeight)} - ${Math.round(
        maxHealthyWeight
      )} kg`;
    }

    setResult({
      bmi: Math.round(bmi * 10) / 10,
      category,
      healthyWeightRange,
      recommendations,
    });
  };

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return "text-blue-600";
    if (bmi < 25) return "text-green-600";
    if (bmi < 30) return "text-yellow-600";
    return "text-red-600";
  };

  const getBMIBgColor = (bmi: number) => {
    if (bmi < 18.5) return "bg-blue-50 border-blue-200";
    if (bmi < 25) return "bg-green-50 border-green-200";
    if (bmi < 30) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      {/* Premium Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-900/20 to-slate-900"></div>
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      {/* Health-themed Floating Elements */}
      <div className="fixed top-1/4 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-3/4 right-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* SEO Optimized Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} className="text-white/70" />
        </div>

        {/* Premium Back Button */}
        <Link
          href="/health-wellness"
          className="inline-flex items-center px-6 py-3 text-sm font-medium text-white/80 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:text-white transition-all duration-300 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Health & Wellness
        </Link>

        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl mb-6 shadow-2xl shadow-emerald-500/30 ring-2 ring-white/10">
            <Calculator className="w-10 h-10 text-white drop-shadow-sm" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            BMI Calculator
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Calculate your Body Mass Index (BMI) to understand your weight
            status and get personalized health recommendations based on WHO
            standards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Premium Calculator Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-emerald-200 mb-8 tracking-tight">
              Calculate Your BMI
            </h2>

            <div className="space-y-6">
              <SelectField
                label="Unit System"
                value={unit}
                onChange={setUnit}
                options={[
                  { value: "metric", label: "Metric (kg, cm)" },
                  { value: "imperial", label: "Imperial (lbs, inches)" },
                ]}
                darkTheme={true}
              />

              <InputField
                label={unit === "metric" ? "Weight (kg)" : "Weight (lbs)"}
                value={weight}
                onChange={setWeight}
                type="number"
                placeholder={
                  unit === "metric"
                    ? "Enter weight in kg"
                    : "Enter weight in pounds"
                }
                darkTheme={true}
              />

              <InputField
                label={unit === "metric" ? "Height (cm)" : "Height (inches)"}
                value={height}
                onChange={setHeight}
                type="number"
                placeholder={
                  unit === "metric"
                    ? "Enter height in cm"
                    : "Enter height in inches"
                }
                darkTheme={true}
              />

              <button
                onClick={calculateBMI}
                disabled={!weight || !height}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg shadow-emerald-500/25"
              >
                Calculate BMI
              </button>
            </div>
          </div>

          {/* Premium Results */}
          <div className="space-y-6">
            {result && (
              <>
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-4 text-white">
                      {result.bmi}
                    </div>
                    <div className="text-2xl font-semibold text-emerald-400 mb-3">
                      {result.category}
                    </div>
                    <div className="text-white/70 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
                      Healthy range: {result.healthyWeightRange}
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-semibold text-white mb-6 flex items-center tracking-tight">
                    <TrendingUp className="w-6 h-6 mr-3 text-emerald-400" />
                    Recommendations
                  </h3>
                  <ul className="space-y-4">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                        <span className="text-white/80 leading-relaxed">
                          {rec}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Premium BMI Categories Info */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center tracking-tight">
                <Info className="w-6 h-6 mr-3 text-emerald-400" />
                BMI Categories
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-500/20 rounded-2xl border border-blue-500/30">
                  <span className="font-medium text-blue-300">Underweight</span>
                  <span className="text-blue-400 font-semibold">
                    Below 18.5
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-500/20 rounded-2xl border border-green-500/30">
                  <span className="font-medium text-green-300">
                    Normal weight
                  </span>
                  <span className="text-green-400 font-semibold">
                    18.5 - 24.9
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-yellow-500/20 rounded-2xl border border-yellow-500/30">
                  <span className="font-medium text-yellow-300">
                    Overweight
                  </span>
                  <span className="text-yellow-400 font-semibold">
                    25 - 29.9
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-red-500/20 rounded-2xl border border-red-500/30">
                  <span className="font-medium text-red-300">Obese</span>
                  <span className="text-red-400 font-semibold">
                    30 and above
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Medical Disclaimer */}
        <div className="mt-12 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-2xl flex items-center justify-center">
                <Info className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
                Medical Disclaimer
              </h3>
              <p className="text-white/80 leading-relaxed">
                BMI is a screening tool and may not reflect individual health
                status. It doesn&apos;t account for muscle mass, bone density,
                or fat distribution. Always consult healthcare professionals for
                comprehensive health assessment and personalized advice.
              </p>
            </div>
          </div>
        </div>

        {/* SEO Components */}
        <CalculatorSEO
          calculatorName="Free BMI Calculator - Accurate Body Mass Index Calculator"
          calculatorType="bmi"
          description="Calculate your BMI instantly with our free, accurate BMI calculator. Get your body mass index, health category, and personalized recommendations."
          url="https://calcnest.com/calculators/bmi"
          faqs={bmiFAQs}
          howToSteps={[
            {
              name: "Enter your weight",
              text: "Input your current weight in either kilograms or pounds",
            },
            {
              name: "Enter your height",
              text: "Input your height in centimeters, meters, or feet and inches",
            },
            {
              name: "Select unit system",
              text: "Choose between metric (kg/cm) or imperial (lbs/ft) units",
            },
            {
              name: "Calculate BMI",
              text: "Click the calculate button to get your BMI and health category",
            },
            {
              name: "Review results",
              text: "See your BMI value, category, and personalized health recommendations",
            },
          ]}
          medicalCondition="Body Weight Management"
        />

        {/* FAQ Section for AEO */}
        <FAQSection
          title="BMI Calculator - Frequently Asked Questions"
          faqs={bmiFAQs}
          className="mt-12"
        />
      </div>
    </div>
  );
}
