"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowLeft, Info, TrendingUp, Zap } from "lucide-react";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";

export default function BMRCalculatorPage() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<{
    bmr: number;
    formula: string;
    dailyCalories: {
      sedentary: number;
      light: number;
      moderate: number;
      active: number;
      veryActive: number;
    };
    recommendations: string[];
  } | null>(null);

  const calculateBMR = () => {
    if (!age || !weight || !height) return;

    let weightKg = parseFloat(weight);
    let heightCm = parseFloat(height);

    // Convert to metric if needed
    if (unit === "imperial") {
      weightKg = weightKg * 0.453592; // pounds to kg
      heightCm = heightCm * 2.54; // inches to cm
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    let formula;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * parseInt(age) + 5;
      formula =
        "Mifflin-St Jeor (Male): 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5";
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * parseInt(age) - 161;
      formula =
        "Mifflin-St Jeor (Female): 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161";
    }

    // Calculate daily calorie needs based on activity level
    const dailyCalories = {
      sedentary: Math.round(bmr * 1.2),
      light: Math.round(bmr * 1.375),
      moderate: Math.round(bmr * 1.55),
      active: Math.round(bmr * 1.725),
      veryActive: Math.round(bmr * 1.9),
    };

    const recommendations = [
      "BMR represents calories needed for basic body functions at rest",
      "Multiply BMR by activity factor to get total daily calorie needs",
      "BMR typically accounts for 60-75% of total daily energy expenditure",
      "Regular exercise can help maintain or increase your BMR",
      "Age, muscle mass, and genetics affect your metabolic rate",
    ];

    setResult({
      bmr: Math.round(bmr),
      formula,
      dailyCalories,
      recommendations,
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Premium Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/20 to-slate-900"></div>
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      {/* Metabolism-themed Floating Elements */}
      <div className="fixed top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-3/4 right-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

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
          <span className="text-white">BMR Calculator</span>
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-3xl mb-6 shadow-2xl shadow-blue-500/30 ring-2 ring-white/10">
            <Zap className="w-10 h-10 text-white drop-shadow-sm" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            BMR Calculator
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Calculate your Basal Metabolic Rate (BMR) - the number of calories
            your body needs to maintain basic functions at rest.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Premium Calculator Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-emerald-200 mb-8 tracking-tight">
              Calculate Your BMR
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Age (years)"
                  value={age}
                  onChange={setAge}
                  type="number"
                  placeholder="Enter your age"
                  darkTheme={true}
                />

                <SelectField
                  label="Gender"
                  value={gender}
                  onChange={setGender}
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ]}
                  darkTheme={true}
                />
              </div>

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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              <button
                onClick={calculateBMR}
                disabled={!age || !weight || !height}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/25"
              >
                Calculate BMR
              </button>
            </div>
          </div>

          {/* Premium Results */}
          <div className="space-y-6">
            {result && (
              <>
                {/* BMR Result */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-4 text-white">
                      {result.bmr}
                    </div>
                    <div className="text-2xl font-semibold text-blue-400 mb-3">
                      Calories per day
                    </div>
                    <div className="text-white/70 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
                      Basal Metabolic Rate
                    </div>
                  </div>
                </div>

                {/* Daily Calorie Needs */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Daily Calorie Needs by Activity Level
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-800">
                        Sedentary
                      </span>
                      <span className="text-orange-600 font-semibold">
                        {result.dailyCalories.sedentary} cal
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-800">
                        Light Activity
                      </span>
                      <span className="text-orange-600 font-semibold">
                        {result.dailyCalories.light} cal
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-800">
                        Moderate Activity
                      </span>
                      <span className="text-orange-600 font-semibold">
                        {result.dailyCalories.moderate} cal
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-800">Active</span>
                      <span className="text-orange-600 font-semibold">
                        {result.dailyCalories.active} cal
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-800">
                        Very Active
                      </span>
                      <span className="text-orange-600 font-semibold">
                        {result.dailyCalories.veryActive} cal
                      </span>
                    </div>
                  </div>
                </div>

                {/* Formula */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Calculator className="w-5 h-5 mr-2" />
                    Formula Used
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <code className="text-sm text-gray-700">
                      {result.formula}
                    </code>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Understanding BMR
                  </h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Activity Level Guide */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Activity Level Guide
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">Sedentary:</span>
                  <span className="text-gray-600 ml-2">
                    Little or no exercise, desk job
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">Light:</span>
                  <span className="text-gray-600 ml-2">
                    Light exercise 1-3 days/week
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">Moderate:</span>
                  <span className="text-gray-600 ml-2">
                    Moderate exercise 3-5 days/week
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">Active:</span>
                  <span className="text-gray-600 ml-2">
                    Hard exercise 6-7 days/week
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">
                    Very Active:
                  </span>
                  <span className="text-gray-600 ml-2">
                    Very hard exercise, physical job
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
                Medical Disclaimer
              </h3>
              <p className="text-amber-700">
                BMR calculations are estimates based on general formulas and may
                not reflect individual metabolic differences. Factors like
                muscle mass, health conditions, and genetics can significantly
                affect your actual metabolic rate. Consult healthcare
                professionals for personalized metabolic assessment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
