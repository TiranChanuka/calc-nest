"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowLeft, Info, Target } from "lucide-react";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";

export default function CalorieCalculatorPage() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [goal, setGoal] = useState("maintain");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<{
    bmr: number;
    tdee: number;
    caloriesForGoal: number;
    macros: {
      protein: number;
      carbs: number;
      fat: number;
    };
    recommendations: string[];
  } | null>(null);

  const calculateCalories = () => {
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
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * parseInt(age) + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * parseInt(age) - 161;
    }

    // Calculate TDEE based on activity level
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };

    const tdee =
      bmr *
      activityMultipliers[activityLevel as keyof typeof activityMultipliers];

    // Calculate calories for goal
    let caloriesForGoal = tdee;
    let goalDescription = "maintain current weight";

    if (goal === "lose") {
      caloriesForGoal = tdee - 500; // 1 lb per week
      goalDescription = "lose 1 lb per week";
    } else if (goal === "gain") {
      caloriesForGoal = tdee + 500; // 1 lb per week
      goalDescription = "gain 1 lb per week";
    }

    // Calculate macronutrients (40% carbs, 30% protein, 30% fat)
    const macros = {
      protein: Math.round((caloriesForGoal * 0.3) / 4), // 4 calories per gram
      carbs: Math.round((caloriesForGoal * 0.4) / 4), // 4 calories per gram
      fat: Math.round((caloriesForGoal * 0.3) / 9), // 9 calories per gram
    };

    const recommendations = [
      `Aim for ${Math.round(
        caloriesForGoal
      )} calories daily to ${goalDescription}`,
      "Eat protein with every meal to maintain muscle mass",
      "Stay hydrated - drink at least 8 glasses of water daily",
      "Focus on whole, unprocessed foods for better nutrition",
      "Track your progress and adjust as needed",
    ];

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      caloriesForGoal: Math.round(caloriesForGoal),
      macros,
      recommendations,
    });
  };

  const getGoalColor = (goalType: string) => {
    switch (goalType) {
      case "lose":
        return "text-red-600 bg-red-50 border-red-200";
      case "gain":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-blue-600 bg-blue-50 border-blue-200";
    }
  };

  return (
    <div className="bg-gradient-to-br from-rose-900 via-orange-800 to-amber-900">
      {/* Food & Nutrition Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-600/20 via-red-800/10 to-amber-900/20"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-yellow-500/15 via-transparent to-transparent"></div>

      {/* Animated Food Energy Orbs */}
      <div className="fixed top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-red-500/20 to-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/15 to-yellow-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-3/4 right-1/3 w-72 h-72 bg-gradient-to-br from-orange-600/20 to-red-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

      {/* Floating Food Particles */}
      <div className="fixed top-1/2 left-1/6 w-4 h-4 bg-yellow-400/40 rounded-full animate-bounce delay-500"></div>
      <div className="fixed top-1/3 right-1/5 w-3 h-3 bg-red-400/40 rounded-full animate-bounce delay-1500"></div>
      <div className="fixed bottom-1/2 left-3/4 w-5 h-5 bg-orange-400/40 rounded-full animate-bounce delay-2500"></div>

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
          <span className="text-white">Calorie Calculator</span>
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-3xl mb-6 shadow-2xl shadow-orange-500/40 ring-2 ring-orange-200/20">
            <Calculator className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-200 via-yellow-100 to-red-200 bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-lg">
            🥗 Calorie Calculator
          </h1>
          <p className="text-xl text-orange-100/90 max-w-3xl mx-auto leading-relaxed font-medium">
            Calculate your daily calorie needs, BMR, and personalized
            macronutrient breakdown based on your goals and activity level.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Premium Calculator Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-orange-200 via-yellow-200 to-red-200 bg-clip-text text-transparent mb-8 tracking-tight">
              🍎 Calculate Your Daily Calories
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

              <SelectField
                label="Activity Level"
                value={activityLevel}
                onChange={setActivityLevel}
                options={[
                  {
                    value: "sedentary",
                    label: "Sedentary (little/no exercise)",
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
                label="Goal"
                value={goal}
                onChange={setGoal}
                options={[
                  { value: "lose", label: "Lose Weight (1 lb/week)" },
                  { value: "maintain", label: "Maintain Weight" },
                  { value: "gain", label: "Gain Weight (1 lb/week)" },
                ]}
                darkTheme={true}
              />

              <button
                onClick={calculateCalories}
                disabled={!age || !weight || !height}
                className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-orange-700 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg shadow-orange-500/25"
              >
                Calculate Calories
              </button>
            </div>
          </div>

          {/* Premium Results */}
          <div className="space-y-6">
            {result && (
              <>
                {/* Main Result */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-4 text-white">
                      {result.caloriesForGoal}
                    </div>
                    <div className="text-2xl font-semibold text-orange-400 mb-6">
                      Daily Calories for Your Goal
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                        <div className="font-medium text-white mb-1">BMR</div>
                        <div className="text-orange-300 text-lg font-semibold">
                          {result.bmr} cal
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                        <div className="font-medium text-white mb-1">TDEE</div>
                        <div className="text-orange-300 text-lg font-semibold">
                          {result.tdee} cal
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Macronutrients */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-semibold text-white mb-6 flex items-center tracking-tight">
                    <Target className="w-6 h-6 mr-3 text-orange-400" />
                    Daily Macronutrients
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-6 bg-red-500/20 rounded-2xl border border-red-500/30">
                      <div className="text-3xl font-bold text-red-300 mb-2">
                        {result.macros.protein}g
                      </div>
                      <div className="text-sm text-red-300 font-medium mb-1">
                        Protein
                      </div>
                      <div className="text-xs text-red-400">30%</div>
                    </div>
                    <div className="text-center p-6 bg-blue-500/20 rounded-2xl border border-blue-500/30">
                      <div className="text-3xl font-bold text-blue-300 mb-2">
                        {result.macros.carbs}g
                      </div>
                      <div className="text-sm text-blue-300 font-medium mb-1">
                        Carbs
                      </div>
                      <div className="text-xs text-blue-400">40%</div>
                    </div>
                    <div className="text-center p-6 bg-yellow-500/20 rounded-2xl border border-yellow-500/30">
                      <div className="text-3xl font-bold text-yellow-300 mb-2">
                        {result.macros.fat}g
                      </div>
                      <div className="text-sm text-yellow-300 font-medium mb-1">
                        Fat
                      </div>
                      <div className="text-xs text-yellow-400">30%</div>
                    </div>
                  </div>
                </div>

                {/* Premium Recommendations */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-semibold text-white mb-6 flex items-center tracking-tight">
                    <Target className="w-6 h-6 mr-3 text-orange-400" />
                    Recommendations
                  </h3>
                  <ul className="space-y-4">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                        <span className="text-white/80 leading-relaxed">
                          {rec}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Premium Activity Level Info */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center tracking-tight">
                <Info className="w-6 h-6 mr-3 text-orange-400" />
                Activity Level Guide
              </h3>
              <div className="space-y-4 text-sm">
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <span className="font-medium text-white">Sedentary:</span>
                  <span className="text-white/70 ml-2">
                    Desk job, no regular exercise
                  </span>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <span className="font-medium text-white">Light:</span>
                  <span className="text-white/70 ml-2">
                    Light exercise 1-3 days/week
                  </span>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <span className="font-medium text-white">Moderate:</span>
                  <span className="text-white/70 ml-2">
                    Moderate exercise 3-5 days/week
                  </span>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <span className="font-medium text-white">Active:</span>
                  <span className="text-white/70 ml-2">
                    Hard exercise 6-7 days/week
                  </span>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <span className="font-medium text-white">Very Active:</span>
                  <span className="text-white/70 ml-2">
                    Very hard exercise, physical job
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
                These calculations are estimates based on general formulas and
                should not replace professional medical or nutritional advice.
                Individual calorie needs may vary based on metabolism, health
                conditions, and other factors. Consult healthcare professionals
                for personalized guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
