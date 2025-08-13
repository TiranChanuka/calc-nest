"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ArrowLeft, Info, Activity, Target } from "lucide-react";
import InputField from "@/components/InputField";

export default function HeartRateCalculatorPage() {
  const [age, setAge] = useState("");
  const [restingHR, setRestingHR] = useState("");
  const [result, setResult] = useState<{
    maxHR: number;
    zones: {
      name: string;
      range: string;
      percentage: string;
      description: string;
      color: string;
    }[];
    recommendations: string[];
  } | null>(null);

  const calculateHeartRateZones = () => {
    if (!age || !restingHR) return;

    const ageNum = parseInt(age);
    const restingHRNum = parseInt(restingHR);

    // Calculate maximum heart rate (220 - age)
    const maxHR = 220 - ageNum;

    // Calculate heart rate reserve (Karvonen method)
    const hrReserve = maxHR - restingHRNum;

    // Define heart rate zones using Karvonen method
    const zones = [
      {
        name: "Resting Zone",
        percentage: "50-60%",
        color: "bg-gray-100 text-gray-800",
        description: "Very light activity, recovery",
      },
      {
        name: "Fat Burn Zone",
        percentage: "60-70%",
        color: "bg-blue-100 text-blue-800",
        description: "Light exercise, fat burning",
      },
      {
        name: "Aerobic Zone",
        percentage: "70-80%",
        color: "bg-green-100 text-green-800",
        description: "Moderate exercise, cardiovascular fitness",
      },
      {
        name: "Anaerobic Zone",
        percentage: "80-90%",
        color: "bg-orange-100 text-orange-800",
        description: "Hard exercise, improved performance",
      },
      {
        name: "VO2 Max Zone",
        percentage: "90-100%",
        color: "bg-red-100 text-red-800",
        description: "Maximum effort, short bursts",
      },
    ];

    // Calculate actual heart rate ranges
    const zonesWithRanges = zones.map((zone, index) => {
      const lowerPercent = 0.5 + index * 0.1;
      const upperPercent = 0.6 + index * 0.1;

      const lowerHR = Math.round(restingHRNum + hrReserve * lowerPercent);
      const upperHR = Math.round(restingHRNum + hrReserve * upperPercent);

      return {
        ...zone,
        range: `${lowerHR} - ${upperHR} bpm`,
      };
    });

    const recommendations = [
      "Warm up for 5-10 minutes before intense exercise",
      "Monitor your heart rate during workouts for optimal training",
      "Spend most training time in aerobic zone for general fitness",
      "Use anaerobic zone sparingly for performance improvement",
      "Cool down gradually after intense exercise",
    ];

    setResult({
      maxHR,
      zones: zonesWithRanges,
      recommendations,
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      {/* Premium Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-slate-900/20 to-slate-900"></div>
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      {/* Fitness-themed Floating Elements */}
      <div className="fixed top-1/4 left-1/4 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-3/4 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Premium Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-white/70 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/fitness-activity"
            className="hover:text-white transition-colors"
          >
            Fitness & Activity
          </Link>
          <span>/</span>
          <span className="text-white">Heart Rate Calculator</span>
        </div>

        {/* Premium Back Button */}
        <Link
          href="/fitness-activity"
          className="inline-flex items-center px-6 py-3 text-sm font-medium text-white/80 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:text-white transition-all duration-300 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Fitness & Activity
        </Link>

        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-orange-600 rounded-3xl mb-6 shadow-2xl shadow-red-500/30 ring-2 ring-white/10">
            <Heart className="w-10 h-10 text-white drop-shadow-sm" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Heart Rate Zone Calculator
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Calculate your optimal heart rate zones for different types of
            exercise and training goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Premium Calculator Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-red-200 mb-8 tracking-tight">
              Calculate Heart Rate Zones
            </h2>

            <div className="space-y-6">
              <InputField
                label="Age (years)"
                value={age}
                onChange={setAge}
                type="number"
                placeholder="Enter your age"
                min={10}
                max={100}
                darkTheme={true}
              />

              <InputField
                label="Resting Heart Rate (bpm)"
                value={restingHR}
                onChange={setRestingHR}
                type="number"
                placeholder="Enter resting heart rate"
                min={30}
                max={120}
                darkTheme={true}
              />

              <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="font-medium text-white mb-3">
                  How to measure resting heart rate:
                </h4>
                <ul className="text-sm text-white/80 space-y-2">
                  <li>
                    • Measure first thing in the morning before getting up
                  </li>
                  <li>• Place fingers on wrist or neck pulse point</li>
                  <li>• Count beats for 60 seconds (or 15 seconds × 4)</li>
                  <li>• Take average over 3 consecutive days</li>
                </ul>
              </div>

              <button
                onClick={calculateHeartRateZones}
                disabled={!age || !restingHR}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-red-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg shadow-red-500/25"
              >
                Calculate Heart Rate Zones
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result && (
              <>
                {/* Maximum Heart Rate */}
                <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">
                      {result.maxHR}
                    </div>
                    <div className="text-lg font-semibold mb-2">
                      Maximum Heart Rate
                    </div>
                    <div className="text-sm opacity-90">
                      Based on 220 - age formula
                    </div>
                  </div>
                </div>

                {/* Heart Rate Zones */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Training Zones
                  </h3>
                  <div className="space-y-4">
                    {result.zones.map((zone, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">
                            {zone.name}
                          </h4>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${zone.color}`}
                          >
                            {zone.percentage}
                          </span>
                        </div>
                        <div className="text-lg font-bold text-red-600 mb-1">
                          {zone.range}
                        </div>
                        <p className="text-sm text-gray-600">
                          {zone.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Training Tips
                  </h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Zone Benefits */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Zone Benefits
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-blue-900">
                    Fat Burn Zone:
                  </span>
                  <span className="text-blue-700 ml-2">
                    Optimal for weight loss and building aerobic base
                  </span>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-900">
                    Aerobic Zone:
                  </span>
                  <span className="text-green-700 ml-2">
                    Improves cardiovascular fitness and endurance
                  </span>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium text-orange-900">
                    Anaerobic Zone:
                  </span>
                  <span className="text-orange-700 ml-2">
                    Increases power and speed, improves VO2 max
                  </span>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <span className="font-medium text-red-900">
                    VO2 Max Zone:
                  </span>
                  <span className="text-red-700 ml-2">
                    Maximum oxygen uptake training, short intervals only
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
                Heart rate calculations are estimates and may not be accurate
                for everyone. Individual variations exist based on fitness
                level, medications, and health conditions. Consult a healthcare
                provider before starting any new exercise program, especially if
                you have heart conditions or take medication that affects heart
                rate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
