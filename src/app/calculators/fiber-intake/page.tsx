"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Wheat, ArrowLeft, Info, Target, TrendingUp } from "lucide-react";
import InputField from "@/components/InputField";

export default function FiberIntakeCalculatorPage() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [healthGoals, setHealthGoals] = useState("");
  const [currentFiber, setCurrentFiber] = useState("");
  const [result, setResult] = useState<{
    recommendedFiber: number;
    fiberGap: number;
    dailyTarget: { soluble: number; insoluble: number };
    fiberSources: { food: string; amount: string; fiber: string }[];
    benefits: string[];
    tips: string[];
  } | null>(null);

  const calculateFiberIntake = () => {
    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const currentFiberNum = parseFloat(currentFiber) || 0;

    if (!ageNum || !gender || !weightNum || !activityLevel) return;

    // Calculate recommended fiber intake based on age and gender
    let recommendedFiber = 0;

    if (gender === "male") {
      if (ageNum <= 50) {
        recommendedFiber = 38; // grams per day
      } else {
        recommendedFiber = 30;
      }
    } else {
      if (ageNum <= 50) {
        recommendedFiber = 25;
      } else {
        recommendedFiber = 21;
      }
    }

    // Adjust for activity level
    if (activityLevel === "very-active") {
      recommendedFiber += 5;
    } else if (activityLevel === "active") {
      recommendedFiber += 3;
    }

    // Adjust for health goals
    if (healthGoals === "weight-loss") {
      recommendedFiber += 5;
    } else if (healthGoals === "digestive-health") {
      recommendedFiber += 7;
    } else if (healthGoals === "heart-health") {
      recommendedFiber += 3;
    }

    const fiberGap = Math.max(0, recommendedFiber - currentFiberNum);

    // Calculate soluble vs insoluble fiber targets (25% soluble, 75% insoluble)
    const dailyTarget = {
      soluble: Math.round(recommendedFiber * 0.25),
      insoluble: Math.round(recommendedFiber * 0.75),
    };

    // High-fiber food sources
    const fiberSources = [
      { food: "Black beans (cooked)", amount: "1 cup", fiber: "15g" },
      { food: "Avocado", amount: "1 medium", fiber: "10g" },
      { food: "Raspberries", amount: "1 cup", fiber: "8g" },
      { food: "Artichoke (cooked)", amount: "1 medium", fiber: "10g" },
      { food: "Oatmeal", amount: "1 cup cooked", fiber: "4g" },
      { food: "Whole wheat bread", amount: "2 slices", fiber: "6g" },
      { food: "Broccoli (cooked)", amount: "1 cup", fiber: "5g" },
      { food: "Apple with skin", amount: "1 medium", fiber: "4g" },
      { food: "Chia seeds", amount: "2 tbsp", fiber: "10g" },
      { food: "Almonds", amount: "1 oz (23 nuts)", fiber: "4g" },
    ];

    // Health benefits
    const benefits = [
      "Improves digestive health and prevents constipation",
      "Helps maintain healthy cholesterol levels",
      "Supports healthy blood sugar control",
      "Promotes satiety and weight management",
      "Reduces risk of heart disease and stroke",
      "May lower risk of certain cancers",
      "Supports healthy gut microbiome",
      "Helps regulate blood pressure",
    ];

    // Practical tips
    const tips = [
      "Increase fiber intake gradually to avoid digestive discomfort",
      "Drink plenty of water when increasing fiber intake",
      "Choose whole grains over refined grains",
      "Include fruits and vegetables with every meal",
      "Add beans, lentils, or chickpeas to soups and salads",
      "Snack on nuts, seeds, and fresh fruits",
      "Read nutrition labels to compare fiber content",
      "Aim for at least 5 servings of fruits and vegetables daily",
    ];

    if (fiberGap > 15) {
      tips.push("Consider a fiber supplement under medical supervision");
    }

    setResult({
      recommendedFiber,
      fiberGap,
      dailyTarget,
      fiberSources: fiberSources.slice(0, 6),
      benefits,
      tips,
    });
  };

  const getFiberLevelColor = (gap: number) => {
    if (gap === 0) return "text-green-600 bg-green-50 border-green-200";
    if (gap <= 10) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    if (gap <= 20) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getFiberLevelMessage = (gap: number) => {
    if (gap === 0) return "Excellent! You're meeting your fiber goals";
    if (gap <= 10) return "Good, but could use some improvement";
    if (gap <= 20) return "Below recommended - focus on high-fiber foods";
    return "Significantly below recommended intake";
  };

  return (
    <>
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
        }
      `}</style>
      <div className="bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 relative">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(34,197,94,0.15),_transparent_50%)] animate-pulse"></div>
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(16,185,129,0.15),_transparent_50%)] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,_rgba(20,184,166,0.1),_transparent_50%)] animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Floating Nutrition Icons */}
        <div
          className="absolute top-20 left-10 w-4 h-4 bg-green-400 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-3 h-3 bg-emerald-400 rounded-full opacity-30 animate-bounce"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-5 h-5 bg-teal-400 rounded-full opacity-25 animate-bounce"
          style={{ animationDelay: "2.5s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-2 h-2 bg-green-300 rounded-full opacity-40 animate-bounce"
          style={{ animationDelay: "3s" }}
        ></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-green-200 mb-6">
            <Link href="/" className="hover:text-green-100 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/health-risk"
              className="hover:text-green-100 transition-colors"
            >
              Health Risk
            </Link>
            <span>/</span>
            <span className="text-white font-medium">
              Fiber Intake Calculator
            </span>
          </div>

          {/* Back Button */}
          <Link
            href="/health-risk"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-100 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Health Risk
          </Link>

          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg shadow-green-500/30 animate-pulse hover:scale-110 transition-transform duration-300">
              <Wheat className="w-8 h-8 text-white" />
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Fiber Intake Calculator
            </h1>
            <p
              className="text-lg text-green-100 max-w-3xl mx-auto drop-shadow-md animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              Calculate your daily fiber needs and discover the best sources to
              improve your digestive health.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-left">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <Wheat className="w-6 h-6 mr-2 text-green-300 animate-pulse" />
                Personal Information
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Age (years)"
                    value={age}
                    onChange={setAge}
                    type="number"
                    placeholder="Enter age"
                    darkTheme={true}
                  />

                  <div>
                    <label className="block text-sm font-medium text-green-200 mb-2">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-4 py-3 border border-white/20 bg-white/5 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent text-white placeholder-green-200 transition-all duration-200 hover:bg-white/10"
                    >
                      <option value="" className="text-gray-800 bg-white">
                        Select gender
                      </option>
                      <option value="male" className="text-gray-800 bg-white">
                        Male
                      </option>
                      <option value="female" className="text-gray-800 bg-white">
                        Female
                      </option>
                    </select>
                  </div>
                </div>

                <InputField
                  label="Weight (kg)"
                  value={weight}
                  onChange={setWeight}
                  type="number"
                  placeholder="Enter your weight"
                  darkTheme={true}
                />

                <div>
                  <label className="block text-sm font-medium text-green-200 mb-2">
                    Activity Level
                  </label>
                  <select
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    className="w-full px-4 py-3 border border-white/20 bg-white/10 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent text-white"
                  >
                    <option value="" className="text-gray-800">
                      Select activity level
                    </option>
                    <option value="sedentary" className="text-gray-800">
                      Sedentary (desk job, little exercise)
                    </option>
                    <option value="moderate" className="text-gray-800">
                      Moderate (some exercise)
                    </option>
                    <option value="active" className="text-gray-800">
                      Active (regular exercise)
                    </option>
                    <option value="very-active" className="text-gray-800">
                      Very Active (intense exercise)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-200 mb-2">
                    Health Goals
                  </label>
                  <select
                    value={healthGoals}
                    onChange={(e) => setHealthGoals(e.target.value)}
                    className="w-full px-4 py-3 border border-white/20 bg-white/10 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent text-white"
                  >
                    <option value="" className="text-gray-800">
                      Select primary goal
                    </option>
                    <option value="general-health" className="text-gray-800">
                      General health
                    </option>
                    <option value="weight-loss" className="text-gray-800">
                      Weight loss
                    </option>
                    <option value="digestive-health" className="text-gray-800">
                      Digestive health
                    </option>
                    <option value="heart-health" className="text-gray-800">
                      Heart health
                    </option>
                    <option
                      value="diabetes-prevention"
                      className="text-gray-800"
                    >
                      Diabetes prevention
                    </option>
                  </select>
                </div>

                <InputField
                  label="Current Daily Fiber Intake (g)"
                  value={currentFiber}
                  onChange={setCurrentFiber}
                  type="number"
                  placeholder="Estimate your current intake (optional)"
                  darkTheme={true}
                />

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">
                    Fiber Facts:
                  </h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>
                      • Most adults only get about half the recommended fiber
                    </li>
                    <li>
                      • Soluble fiber helps lower cholesterol and blood sugar
                    </li>
                    <li>• Insoluble fiber promotes healthy digestion</li>
                    <li>
                      • Gradually increase intake to avoid digestive discomfort
                    </li>
                  </ul>
                </div>

                <button
                  onClick={calculateFiberIntake}
                  disabled={!age || !gender || !weight || !activityLevel}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                >
                  Calculate Fiber Needs
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {result && (
                <>
                  {/* Fiber Recommendation */}
                  <div
                    className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 ${getFiberLevelColor(
                      result.fiberGap
                    )}`}
                  >
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2 text-gray-900">
                        {result.recommendedFiber}g
                      </div>
                      <div className="text-lg font-semibold text-gray-700 mb-2">
                        Daily Fiber Recommendation
                      </div>
                      <div className="text-sm font-medium mb-4">
                        {getFiberLevelMessage(result.fiberGap)}
                      </div>
                      {result.fiberGap > 0 && (
                        <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                          Need {result.fiberGap}g more daily
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Fiber Breakdown */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Fiber Type Targets
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-xl">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {result.dailyTarget.soluble}g
                        </div>
                        <div className="text-sm text-green-700 font-medium">
                          Soluble Fiber
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                          Lowers cholesterol
                        </div>
                      </div>
                      <div className="text-center p-4 bg-emerald-50 rounded-xl">
                        <div className="text-2xl font-bold text-emerald-600 mb-1">
                          {result.dailyTarget.insoluble}g
                        </div>
                        <div className="text-sm text-emerald-700 font-medium">
                          Insoluble Fiber
                        </div>
                        <div className="text-xs text-emerald-600 mt-1">
                          Aids digestion
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* High-Fiber Foods */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Wheat className="w-5 h-5 mr-2" />
                      High-Fiber Food Sources
                    </h3>
                    <div className="space-y-3">
                      {result.fiberSources.map((source, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg"
                        >
                          <div>
                            <div className="font-medium text-gray-900">
                              {source.food}
                            </div>
                            <div className="text-sm text-gray-600">
                              {source.amount}
                            </div>
                          </div>
                          <div className="text-lg font-bold text-green-600">
                            {source.fiber}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Health Benefits */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Health Benefits
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {result.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Practical Tips */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Info className="w-5 h-5 mr-2" />
                      Tips to Increase Fiber
                    </h3>
                    <ul className="space-y-3">
                      {result.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {/* Fiber Guidelines */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Daily Fiber Recommendations
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-blue-800">
                      Men (≤50 years)
                    </span>
                    <span className="text-blue-600">38g per day</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-blue-800">
                      Men ({">"}50 years)
                    </span>
                    <span className="text-blue-600">30g per day</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                    <span className="font-medium text-pink-800">
                      Women (≤50 years)
                    </span>
                    <span className="text-pink-600">25g per day</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                    <span className="font-medium text-pink-800">
                      Women ({">"}50 years)
                    </span>
                    <span className="text-pink-600">21g per day</span>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> These are minimum recommendations.
                    Active individuals and those with specific health goals may
                    benefit from higher intakes.
                  </p>
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
                  Health Disclaimer
                </h3>
                <p className="text-amber-700">
                  This calculator provides general fiber intake recommendations
                  based on established guidelines. Individual needs may vary
                  based on health conditions, medications, and digestive
                  sensitivity. Increase fiber intake gradually and drink plenty
                  of water. Consult your healthcare provider for personalized
                  dietary advice, especially if you have digestive disorders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
