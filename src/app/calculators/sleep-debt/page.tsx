"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Moon,
  ArrowLeft,
  Info,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import InputField from "@/components/InputField";

export default function SleepDebtCalculatorPage() {
  const [dailySleep, setDailySleep] = useState(["", "", "", "", "", "", ""]);
  const [result, setResult] = useState<{
    totalSleepDebt: number;
    averageSleep: number;
    weeklyDeficit: number;
    sleepDebtLevel: string;
    recommendations: string[];
  } | null>(null);

  const calculateSleepDebt = () => {
    const sleepHours = dailySleep.map((sleep) => parseFloat(sleep) || 0);
    const validEntries = sleepHours.filter((hours) => hours > 0);

    if (validEntries.length === 0) return;

    const totalSleep = sleepHours.reduce((sum, hours) => sum + hours, 0);
    const averageSleep = totalSleep / 7;
    const recommendedSleep = 8; // 8 hours per night
    const weeklyRecommended = recommendedSleep * 7;
    const weeklyDeficit = weeklyRecommended - totalSleep;
    const totalSleepDebt = Math.max(0, weeklyDeficit);

    let sleepDebtLevel = "";
    let recommendations: string[] = [];

    if (totalSleepDebt === 0) {
      sleepDebtLevel = "No Sleep Debt";
      recommendations = [
        "Excellent! You're getting adequate sleep",
        "Maintain your current sleep schedule",
        "Continue practicing good sleep hygiene",
        "Keep consistent bedtime and wake times",
      ];
    } else if (totalSleepDebt <= 7) {
      sleepDebtLevel = "Mild Sleep Debt";
      recommendations = [
        "Try to get an extra 30-60 minutes of sleep tonight",
        "Avoid screens 1 hour before bedtime",
        "Keep a consistent sleep schedule",
        "Consider a short weekend sleep-in (max 1 hour later)",
      ];
    } else if (totalSleepDebt <= 14) {
      sleepDebtLevel = "Moderate Sleep Debt";
      recommendations = [
        "Prioritize 1-2 hours of extra sleep this weekend",
        "Go to bed 30 minutes earlier each night this week",
        "Limit caffeine after 2 PM",
        "Create a relaxing bedtime routine",
      ];
    } else {
      sleepDebtLevel = "Severe Sleep Debt";
      recommendations = [
        "Consider consulting a sleep specialist",
        "Gradually increase sleep by 15-30 minutes each night",
        "Avoid long daytime naps (max 20 minutes)",
        "Address potential sleep disorders or stress factors",
        "Consider sleep hygiene improvements",
      ];
    }

    setResult({
      totalSleepDebt: Math.round(totalSleepDebt * 10) / 10,
      averageSleep: Math.round(averageSleep * 10) / 10,
      weeklyDeficit: Math.round(weeklyDeficit * 10) / 10,
      sleepDebtLevel,
      recommendations,
    });
  };

  const updateDailySleep = (index: number, value: string) => {
    const newSleep = [...dailySleep];
    newSleep[index] = value;
    setDailySleep(newSleep);
  };

  const getDebtColor = (level: string) => {
    switch (level) {
      case "No Sleep Debt":
        return "text-green-600 bg-green-50 border-green-200";
      case "Mild Sleep Debt":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Moderate Sleep Debt":
        return "text-orange-600 bg-orange-50 border-orange-200";
      default:
        return "text-red-600 bg-red-50 border-red-200";
    }
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900 relative">
      {/* Night Sky Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900"></div>

      {/* Stars */}
      <div className="fixed inset-0">
        {/* Large Stars */}
        <div className="absolute top-[15%] left-[12%] w-1 h-1 bg-white rounded-full animate-pulse shadow-white shadow-sm"></div>
        <div className="absolute top-[35%] right-[8%] w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-1000 shadow-blue-200 shadow-sm"></div>
        <div className="absolute top-[65%] left-[25%] w-1 h-1 bg-purple-200 rounded-full animate-pulse delay-2000 shadow-purple-200 shadow-sm"></div>
        <div className="absolute top-[45%] right-[35%] w-1 h-1 bg-white rounded-full animate-pulse delay-500 shadow-white shadow-sm"></div>
        <div className="absolute top-[75%] right-[15%] w-1 h-1 bg-blue-100 rounded-full animate-pulse delay-1500 shadow-blue-100 shadow-sm"></div>
        <div className="absolute top-[20%] left-[65%] w-1 h-1 bg-white rounded-full animate-pulse delay-700 shadow-white shadow-sm"></div>
        <div className="absolute top-[85%] left-[45%] w-1 h-1 bg-purple-100 rounded-full animate-pulse delay-300 shadow-purple-100 shadow-sm"></div>

        {/* Medium Stars */}
        <div className="absolute top-[28%] left-[55%] w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-200"></div>
        <div className="absolute top-[48%] left-[75%] w-0.5 h-0.5 bg-blue-200 rounded-full animate-pulse delay-800"></div>
        <div className="absolute top-[68%] right-[45%] w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-400"></div>
        <div className="absolute top-[38%] left-[35%] w-0.5 h-0.5 bg-purple-200 rounded-full animate-pulse delay-1200"></div>
        <div className="absolute top-[58%] right-[65%] w-0.5 h-0.5 bg-blue-100 rounded-full animate-pulse delay-600"></div>
      </div>

      {/* Shooting Stars */}
      <div className="fixed inset-0">
        <div className="absolute top-[25%] left-[-10%] w-28 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45 animate-pulse opacity-60"></div>
        <div className="absolute top-[70%] right-[-10%] w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent transform rotate-[135deg] animate-pulse delay-3000 opacity-50"></div>
      </div>

      {/* Galaxy/Nebula Effects */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-3/4 right-1/3 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Premium Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-white/70 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/sleep-time"
            className="hover:text-white transition-colors"
          >
            Sleep & Time
          </Link>
          <span>/</span>
          <span className="text-white">Sleep Debt Calculator</span>
        </div>

        {/* Premium Back Button */}
        <Link
          href="/sleep-time"
          className="inline-flex items-center px-6 py-3 text-sm font-medium text-white/80 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:text-white transition-all duration-300 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Sleep & Time
        </Link>

        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl mb-6 shadow-2xl shadow-indigo-500/30 ring-2 ring-white/10">
            <Moon className="w-10 h-10 text-white drop-shadow-sm" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Sleep Debt Calculator
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Track your weekly sleep patterns and calculate how much sleep debt
            you&apos;ve accumulated.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-indigo-200 mb-8 tracking-tight">
              Enter Your Sleep Hours
            </h2>

            <div className="space-y-4">
              {days.map((day, index) => (
                <InputField
                  key={day}
                  label={`${day} (hours)`}
                  value={dailySleep[index]}
                  onChange={(value) => updateDailySleep(index, value)}
                  type="number"
                  placeholder="Enter hours slept"
                  darkTheme={true}
                />
              ))}

              <div className="bg-indigo-500/10 border border-indigo-400/20 rounded-lg p-4 mt-6">
                <h4 className="font-medium text-indigo-200 mb-2">
                  How to track your sleep:
                </h4>
                <ul className="text-sm text-indigo-300 space-y-1">
                  <li>• Record actual sleep time, not time in bed</li>
                  <li>
                    • Don&apos;t include time spent awake during the night
                  </li>
                  <li>
                    • Use decimals for partial hours (e.g., 7.5 for 7h 30m)
                  </li>
                  <li>• Track consistently for accurate results</li>
                </ul>
              </div>

              <button
                onClick={calculateSleepDebt}
                disabled={dailySleep.every((sleep) => !sleep)}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg shadow-indigo-500/25"
              >
                Calculate Sleep Debt
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result && (
              <>
                {/* Sleep Debt Result */}
                <div
                  className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 ${getDebtColor(
                    result.sleepDebtLevel
                  )}`}
                >
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2 text-gray-900">
                      {result.totalSleepDebt}h
                    </div>
                    <div className="text-lg font-semibold text-gray-700 mb-2">
                      Total Sleep Debt
                    </div>
                    <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      {result.sleepDebtLevel === "No Sleep Debt" ? (
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 mr-2 text-orange-600" />
                      )}
                      {result.sleepDebtLevel}
                    </div>
                  </div>
                </div>

                {/* Sleep Stats */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Weekly Sleep Summary
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-slate-50 rounded-xl">
                      <div className="text-2xl font-bold text-slate-600 mb-1">
                        {result.averageSleep}h
                      </div>
                      <div className="text-sm text-slate-700 font-medium">
                        Average per Night
                      </div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        8h
                      </div>
                      <div className="text-sm text-blue-700 font-medium">
                        Recommended
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Info className="w-5 h-5 mr-2" />
                    Recovery Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-slate-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Sleep Debt Levels */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Sleep Debt Levels
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-800">No Debt</span>
                  <span className="text-green-600">0 hours</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="font-medium text-yellow-800">Mild</span>
                  <span className="text-yellow-600">1-7 hours</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium text-orange-800">Moderate</span>
                  <span className="text-orange-600">8-14 hours</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-medium text-red-800">Severe</span>
                  <span className="text-red-600">15+ hours</span>
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
                Sleep Health Disclaimer
              </h3>
              <p className="text-amber-700">
                Sleep debt calculations are estimates based on the general
                recommendation of 8 hours per night. Individual sleep needs vary
                by age, lifestyle, and health conditions. Chronic sleep
                deprivation may indicate underlying sleep disorders that require
                professional medical evaluation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
