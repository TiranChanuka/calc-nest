"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Droplets, ArrowLeft, Info, Target } from "lucide-react";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";

export default function WaterIntakeCalculatorPage() {
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [climate, setClimate] = useState("moderate");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<{
    dailyWater: number;
    glassesPerDay: number;
    recommendations: string[];
  } | null>(null);

  const calculateWaterIntake = () => {
    if (!weight) return;

    let weightKg = parseFloat(weight);

    // Convert to kg if using imperial
    if (unit === "imperial") {
      weightKg = weightKg * 0.453592;
    }

    // Base water intake: 35ml per kg of body weight
    const baseWater = weightKg * 35; // ml

    // Adjust for activity level
    const activityMultipliers = {
      sedentary: 1.0,
      light: 1.1,
      moderate: 1.2,
      active: 1.3,
      very_active: 1.5,
    };

    // Adjust for climate
    const climateMultipliers = {
      cold: 0.9,
      moderate: 1.0,
      hot: 1.2,
      very_hot: 1.4,
    };

    const totalWater =
      baseWater *
      activityMultipliers[activityLevel as keyof typeof activityMultipliers] *
      climateMultipliers[climate as keyof typeof climateMultipliers];

    // Convert to liters
    const waterLiters = totalWater / 1000;

    // Calculate glasses (assuming 250ml per glass)
    const glassesPerDay = Math.round(totalWater / 250);

    const recommendations = [
      "Drink water throughout the day, not all at once",
      "Start your day with a glass of water to rehydrate",
      "Increase intake during exercise and hot weather",
      "Monitor urine color - pale yellow indicates good hydration",
      "Include water-rich foods like fruits and vegetables",
    ];

    setResult({
      dailyWater: Math.round(waterLiters * 10) / 10,
      glassesPerDay,
      recommendations,
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
      {/* Premium Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900/20 to-slate-900"></div>
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      {/* Water-themed Floating Elements */}
      <div className="fixed top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-3/4 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

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
          <span className="text-white">Water Intake Calculator</span>
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-3xl mb-6 shadow-2xl shadow-cyan-500/30 ring-2 ring-white/10">
            <Droplets className="w-10 h-10 text-white drop-shadow-sm" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Daily Water Intake Calculator
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Calculate your optimal daily water intake based on your weight,
            activity level, and environmental conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-cyan-200 mb-6">
              Calculate Water Intake
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
                label="Climate Conditions"
                value={climate}
                onChange={setClimate}
                options={[
                  { value: "cold", label: "Cold (below 60°F/15°C)" },
                  { value: "moderate", label: "Moderate (60-80°F/15-27°C)" },
                  { value: "hot", label: "Hot (80-95°F/27-35°C)" },
                  { value: "very_hot", label: "Very Hot (above 95°F/35°C)" },
                ]}
                darkTheme={true}
              />

              <button
                onClick={calculateWaterIntake}
                disabled={!weight}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                Calculate Water Intake
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result && (
              <>
                {/* Water Intake Result */}
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-xl p-8 text-white">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">
                      {result.dailyWater}L
                    </div>
                    <div className="text-lg font-semibold mb-2">
                      Daily Water Intake
                    </div>
                    <div className="text-sm opacity-90">
                      Approximately {result.glassesPerDay} glasses per day
                    </div>
                  </div>
                </div>

                {/* Hydration Schedule */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Suggested Daily Schedule
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-3 bg-cyan-50 rounded-lg">
                      <span className="font-medium text-cyan-800">
                        Upon waking
                      </span>
                      <span className="text-cyan-600">1-2 glasses</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-800">
                        Before meals
                      </span>
                      <span className="text-blue-600">1 glass each</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
                      <span className="font-medium text-teal-800">
                        During exercise
                      </span>
                      <span className="text-teal-600">Extra 1-2 glasses</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-cyan-50 rounded-lg">
                      <span className="font-medium text-cyan-800">
                        Between meals
                      </span>
                      <span className="text-cyan-600">Sip regularly</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-800">
                        Before bed
                      </span>
                      <span className="text-blue-600">1 glass (2h before)</span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Hydration Tips
                  </h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Hydration Benefits */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Benefits of Proper Hydration
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">
                    Energy & Focus:
                  </span>
                  <span className="text-gray-600 ml-2">
                    Prevents fatigue and improves concentration
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">
                    Skin Health:
                  </span>
                  <span className="text-gray-600 ml-2">
                    Maintains skin elasticity and appearance
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">Digestion:</span>
                  <span className="text-gray-600 ml-2">
                    Aids in nutrient absorption and waste removal
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">
                    Temperature Control:
                  </span>
                  <span className="text-gray-600 ml-2">
                    Regulates body temperature through sweating
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">
                    Joint Health:
                  </span>
                  <span className="text-gray-600 ml-2">
                    Lubricates joints and reduces stiffness
                  </span>
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
                Hydration Disclaimer
              </h3>
              <p className="text-amber-700">
                Water intake recommendations are general guidelines and may need
                adjustment based on individual health conditions, medications,
                kidney function, and specific medical advice. People with heart,
                kidney, or liver conditions should consult healthcare providers
                for personalized hydration recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
