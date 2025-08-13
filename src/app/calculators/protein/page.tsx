"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Beef, ArrowLeft, Info, Target } from "lucide-react";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";

export default function ProteinCalculatorPage() {
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [goal, setGoal] = useState("maintain");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<{
    dailyProtein: number;
    proteinPerMeal: number;
    proteinSources: string[];
    recommendations: string[];
  } | null>(null);

  const calculateProtein = () => {
    if (!weight) return;

    let weightKg = parseFloat(weight);

    // Convert to kg if using imperial
    if (unit === "imperial") {
      weightKg = weightKg * 0.453592;
    }

    // Base protein requirements (g per kg of body weight)
    let proteinPerKg = 0.8; // Sedentary baseline

    // Adjust for activity level
    switch (activityLevel) {
      case "sedentary":
        proteinPerKg = 0.8;
        break;
      case "light":
        proteinPerKg = 1.0;
        break;
      case "moderate":
        proteinPerKg = 1.2;
        break;
      case "active":
        proteinPerKg = 1.4;
        break;
      case "very_active":
        proteinPerKg = 1.6;
        break;
    }

    // Adjust for goal
    switch (goal) {
      case "lose":
        proteinPerKg += 0.2; // Higher protein helps preserve muscle during weight loss
        break;
      case "gain":
        proteinPerKg += 0.4; // Higher protein for muscle building
        break;
      case "maintain":
        // No adjustment
        break;
    }

    const dailyProtein = Math.round(weightKg * proteinPerKg);
    const proteinPerMeal = Math.round(dailyProtein / 3); // Assuming 3 meals

    const proteinSources = [
      "Lean meats (chicken, turkey, lean beef)",
      "Fish and seafood",
      "Eggs and egg whites",
      "Greek yogurt and cottage cheese",
      "Legumes and beans",
      "Quinoa and whole grains",
      "Nuts and seeds",
      "Protein powder supplements",
    ];

    const recommendations = [
      "Spread protein intake evenly throughout the day",
      "Include protein in every meal and snack",
      "Combine different protein sources for complete amino acids",
      "Time protein intake around workouts for optimal recovery",
      "Stay hydrated when consuming high amounts of protein",
    ];

    setResult({
      dailyProtein,
      proteinPerMeal,
      proteinSources,
      recommendations,
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      {/* Premium Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-slate-900/20 to-slate-900"></div>
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      {/* Protein-themed Floating Elements */}
      <div className="fixed top-1/4 left-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-3/4 right-1/3 w-64 h-64 bg-lime-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Premium Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-white/70 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/health-wellness"
            className="hover:text-white transition-colors"
          >
            Health & Wellness
          </Link>
          <span>/</span>
          <span className="text-white">Protein Calculator</span>
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl mb-6 shadow-2xl shadow-green-500/30 ring-2 ring-white/10">
            <Beef className="w-10 h-10 text-white drop-shadow-sm" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Daily Protein Calculator
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Calculate your optimal daily protein intake based on your weight,
            activity level, and fitness goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Premium Calculator Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-green-200 mb-8 tracking-tight">
              Calculate Protein Needs
            </h2>

            <div className="space-y-6">
              <SelectField
                label="Unit System"
                value={unit}
                onChange={setUnit}
                options={[
                  { value: "metric", label: "Metric (kg)" },
                  { value: "imperial", label: "Imperial (lbs)" },
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

              <SelectField
                label="Activity Level"
                value={activityLevel}
                onChange={setActivityLevel}
                options={[
                  {
                    value: "sedentary",
                    label: "Sedentary (little to no exercise)",
                  },
                  {
                    value: "light",
                    label: "Light (light exercise 1-3 days/week)",
                  },
                  {
                    value: "moderate",
                    label: "Moderate (moderate exercise 3-5 days/week)",
                  },
                  {
                    value: "active",
                    label: "Active (hard exercise 6-7 days/week)",
                  },
                  {
                    value: "very_active",
                    label: "Very Active (very hard exercise, physical job)",
                  },
                ]}
                darkTheme={true}
              />

              <SelectField
                label="Fitness Goal"
                value={goal}
                onChange={setGoal}
                options={[
                  { value: "lose", label: "Weight Loss" },
                  { value: "maintain", label: "Maintain Weight" },
                  { value: "gain", label: "Muscle Gain" },
                ]}
                darkTheme={true}
              />

              <button
                onClick={calculateProtein}
                disabled={!weight}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg shadow-green-500/25"
              >
                Calculate Protein Needs
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result && (
              <>
                {/* Protein Intake Result */}
                <div className="bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl shadow-xl p-8 text-white">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">
                      {result.dailyProtein}g
                    </div>
                    <div className="text-lg font-semibold mb-2">
                      Daily Protein Goal
                    </div>
                    <div className="text-sm opacity-90">
                      About {result.proteinPerMeal}g per meal
                    </div>
                  </div>
                </div>

                {/* Protein Sources */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Best Protein Sources
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {result.proteinSources.map((source, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-rose-50 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-rose-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{source}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Protein Tips
                  </h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Protein Content Guide */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Protein Content (per 100g)
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">
                    Chicken Breast
                  </span>
                  <span className="text-rose-600">31g</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">Salmon</span>
                  <span className="text-rose-600">25g</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">
                    Eggs (2 large)
                  </span>
                  <span className="text-rose-600">12g</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">
                    Greek Yogurt
                  </span>
                  <span className="text-rose-600">10g</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">Lentils</span>
                  <span className="text-rose-600">9g</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">Quinoa</span>
                  <span className="text-rose-600">4.5g</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-12 bg-amber-50/80 backdrop-blur-sm border border-amber-200 rounded-2xl p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Info className="w-6 h-6 text-amber-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">
                Nutritional Disclaimer
              </h3>
              <p className="text-amber-700">
                Protein requirements are estimates and may vary based on
                individual factors such as age, health status, and specific
                medical conditions. People with kidney disease or other health
                conditions should consult healthcare professionals before
                significantly increasing protein intake.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
