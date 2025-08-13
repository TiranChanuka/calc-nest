"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock4, ArrowLeft, Info, Calendar, Utensils } from "lucide-react";

export default function IntermittentFastingCalculatorPage() {
  const [fastingMethod, setFastingMethod] = useState("");
  const [lastMeal, setLastMeal] = useState("");
  const [wakeUpTime, setWakeUpTime] = useState("");
  const [bedTime, setBedTime] = useState("");
  const [experience, setExperience] = useState("");
  const [result, setResult] = useState<{
    fastingWindow: { start: string; end: string };
    eatingWindow: { start: string; end: string };
    schedule: { time: string; activity: string; description: string }[];
    tips: string[];
    benefits: string[];
  } | null>(null);

  const fastingMethods = {
    "16:8": { fasting: 16, eating: 8, name: "16:8 Method" },
    "14:10": { fasting: 14, eating: 10, name: "14:10 Method" },
    "18:6": { fasting: 18, eating: 6, name: "18:6 Method" },
    "20:4": { fasting: 20, eating: 4, name: "20:4 Method (Warrior Diet)" },
    "12:12": { fasting: 12, eating: 12, name: "12:12 Method (Beginner)" },
    omad: { fasting: 23, eating: 1, name: "OMAD (One Meal A Day)" },
  };

  const calculateFastingSchedule = () => {
    if (!fastingMethod || !lastMeal || !wakeUpTime || !bedTime) return;

    const method = fastingMethods[fastingMethod as keyof typeof fastingMethods];
    if (!method) return;

    const lastMealTime = new Date(`2024-01-01 ${lastMeal}`);
    const wakeTime = new Date(`2024-01-01 ${wakeUpTime}`);
    const sleepTime = new Date(`2024-01-01 ${bedTime}`);

    // Calculate fasting end time (when eating window starts)
    const fastingEnd = new Date(
      lastMealTime.getTime() + method.fasting * 60 * 60 * 1000
    );

    // Calculate eating window end
    const eatingEnd = new Date(
      fastingEnd.getTime() + method.eating * 60 * 60 * 1000
    );

    // Handle day overflow
    if (fastingEnd.getDate() > lastMealTime.getDate()) {
      fastingEnd.setDate(fastingEnd.getDate() - 1);
    }
    if (eatingEnd.getDate() > fastingEnd.getDate()) {
      eatingEnd.setDate(eatingEnd.getDate() - 1);
    }

    const formatTime = (date: Date) => {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };

    // Create daily schedule
    const schedule = [
      {
        time: formatTime(lastMealTime),
        activity: "Last Meal",
        description: "Finish eating for the day",
      },
      {
        time: formatTime(new Date(lastMealTime.getTime() + 2 * 60 * 60 * 1000)),
        activity: "Fasting Begins",
        description: "Stop all caloric intake",
      },
      {
        time: formatTime(sleepTime),
        activity: "Bedtime",
        description: "Sleep helps with fasting",
      },
      {
        time: formatTime(wakeTime),
        activity: "Wake Up",
        description: "Continue fasting, hydrate well",
      },
      {
        time: formatTime(fastingEnd),
        activity: "Break Fast",
        description: "First meal of eating window",
      },
    ];

    if (method.eating > 4) {
      const midMeal = new Date(
        fastingEnd.getTime() + (method.eating / 2) * 60 * 60 * 1000
      );
      schedule.push({
        time: formatTime(midMeal),
        activity: "Second Meal",
        description: "Optional mid-eating window meal",
      });
    }

    schedule.push({
      time: formatTime(eatingEnd),
      activity: "Eating Window Ends",
      description: "Prepare for next fasting period",
    });

    // Sort schedule by time
    schedule.sort((a, b) => {
      const timeA = new Date(`2024-01-01 ${a.time}`);
      const timeB = new Date(`2024-01-01 ${b.time}`);
      return timeA.getTime() - timeB.getTime();
    });

    // Generate tips based on method and experience
    const tips = [
      "Stay hydrated during fasting with water, herbal tea, and black coffee",
      "Start gradually if you're new to intermittent fasting",
    ];

    if (experience === "beginner") {
      tips.push("Begin with 12:12 or 14:10 before trying longer fasts");
      tips.push("Listen to your body and stop if you feel unwell");
    }

    if (method.fasting >= 18) {
      tips.push("Extended fasts require careful monitoring and preparation");
      tips.push("Consider electrolyte supplementation for longer fasts");
    }

    tips.push("Break your fast with nutritious, easily digestible foods");
    tips.push("Maintain consistent sleep schedule to support fasting");

    // Health benefits
    const benefits = [
      "May improve insulin sensitivity and blood sugar control",
      "Could support weight management and fat loss",
      "May promote cellular autophagy (cellular cleanup)",
      "Might improve mental clarity and focus",
      "Could reduce inflammation markers",
      "May support heart health and longevity",
    ];

    setResult({
      fastingWindow: {
        start: formatTime(lastMealTime),
        end: formatTime(fastingEnd),
      },
      eatingWindow: {
        start: formatTime(fastingEnd),
        end: formatTime(eatingEnd),
      },
      schedule,
      tips,
      benefits,
    });
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "12:12":
        return "bg-green-500/10 text-green-300";
      case "14:10":
        return "bg-blue-500/10 text-blue-300";
      case "16:8":
        return "bg-purple-500/10 text-purple-300";
      case "18:6":
        return "bg-orange-500/10 text-orange-300";
      case "20:4":
        return "bg-red-500/10 text-red-300";
      case "omad":
        return "bg-gray-500/10 text-gray-300";
      default:
        return "bg-gray-500/10 text-gray-300";
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-gray-900">
      {/* Time & Discipline Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-600/10 via-slate-900/20 to-gray-900/20"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent"></div>

      {/* Clock-inspired Floating Elements */}
      <div className="fixed top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-indigo-500/15 to-blue-600/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-3/4 right-1/3 w-56 h-56 bg-gradient-to-br from-blue-600/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>

      {/* Minimalist Time Markers */}
      <div className="fixed top-1/5 left-1/2 w-2 h-16 bg-indigo-400/20 rounded-full animate-pulse delay-500"></div>
      <div className="fixed top-1/2 right-1/5 w-16 h-2 bg-blue-400/20 rounded-full animate-pulse delay-1500"></div>
      <div className="fixed bottom-1/4 left-1/3 w-2 h-12 bg-purple-400/20 rounded-full animate-pulse delay-2500"></div>

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
          <span className="text-white">Intermittent Fasting Calculator</span>
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-600 rounded-3xl mb-6 shadow-2xl shadow-indigo-500/30 ring-2 ring-white/10">
            <Clock4 className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-200 via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6 tracking-tight">
            ⏰ Intermittent Fasting Calculator
          </h1>
          <p className="text-xl text-indigo-100/90 max-w-3xl mx-auto leading-relaxed font-medium">
            Plan your intermittent fasting schedule and optimize your eating
            windows for better health and mindful discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-200 via-purple-200 to-blue-200 bg-clip-text text-transparent mb-8 tracking-tight">
              ⚖️ Fasting Plan Setup
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Intermittent Fasting Method
                </label>
                <select
                  value={fastingMethod}
                  onChange={(e) => setFastingMethod(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-white/50"
                >
                  <option value="">Select fasting method</option>
                  {Object.entries(fastingMethods).map(([key, method]) => (
                    <option key={key} value={key}>
                      {method.name} ({method.fasting}h fast / {method.eating}h
                      eat)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Last Meal Time
                </label>
                <input
                  type="time"
                  value={lastMeal}
                  onChange={(e) => setLastMeal(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-white/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Wake Up Time
                  </label>
                  <input
                    type="time"
                    value={wakeUpTime}
                    onChange={(e) => setWakeUpTime(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-white/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Bedtime
                  </label>
                  <input
                    type="time"
                    value={bedTime}
                    onChange={(e) => setBedTime(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-white/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Fasting Experience
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-white/50"
                >
                  <option value="">Select your experience level</option>
                  <option value="beginner">Beginner (new to fasting)</option>
                  <option value="intermediate">
                    Intermediate (some experience)
                  </option>
                  <option value="advanced">
                    Advanced (experienced faster)
                  </option>
                </select>
              </div>

              <div className="bg-indigo-500/10 backdrop-blur-sm border border-indigo-400/20 rounded-xl p-4">
                <h4 className="font-medium text-indigo-200 mb-2">
                  ✨ Popular IF Methods:
                </h4>
                <ul className="text-sm text-indigo-100/80 space-y-1">
                  <li>
                    • <strong className="text-indigo-200">16:8</strong> - Most
                    popular, skip breakfast
                  </li>
                  <li>
                    • <strong className="text-indigo-200">14:10</strong> -
                    Gentle approach for beginners
                  </li>
                  <li>
                    • <strong className="text-indigo-200">18:6</strong> - More
                    advanced, stronger effects
                  </li>
                  <li>
                    • <strong className="text-indigo-200">20:4</strong> -
                    Warrior diet, one main meal
                  </li>
                </ul>
              </div>

              <button
                onClick={calculateFastingSchedule}
                disabled={
                  !fastingMethod ||
                  !lastMeal ||
                  !wakeUpTime ||
                  !bedTime ||
                  !experience
                }
                className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/25"
              >
                ⚡ Create Fasting Schedule
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result && (
              <>
                {/* Fasting Windows */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Clock4 className="w-5 h-5 mr-2 text-indigo-400" />
                    Your Fasting Schedule
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-red-500/10 backdrop-blur-sm rounded-2xl border border-red-400/20">
                      <div className="text-lg font-bold text-red-300 mb-1">
                        🚫 Fasting Window
                      </div>
                      <div className="text-sm text-red-200 font-medium">
                        {result.fastingWindow.start} -{" "}
                        {result.fastingWindow.end}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-500/10 backdrop-blur-sm rounded-2xl border border-green-400/20">
                      <div className="text-lg font-bold text-green-300 mb-1">
                        🍽️ Eating Window
                      </div>
                      <div className="text-sm text-green-200 font-medium">
                        {result.eatingWindow.start} - {result.eatingWindow.end}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Daily Schedule */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-indigo-400" />
                    Daily Schedule
                  </h3>
                  <div className="space-y-3">
                    {result.schedule.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl border border-white/10"
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl flex items-center justify-center text-sm font-bold mr-4 shadow-lg">
                            {item.time}
                          </div>
                          <div>
                            <div className="font-semibold text-white">
                              {item.activity}
                            </div>
                            <div className="text-sm text-white/70">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fasting Tips */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-indigo-400" />
                    💡 Fasting Success Tips
                  </h3>
                  <ul className="space-y-3">
                    {result.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-white/90">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Health Benefits */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Utensils className="w-5 h-5 mr-2 text-indigo-400" />
                    🌟 Potential Benefits
                  </h3>
                  <ul className="space-y-2">
                    {result.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-white/90 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* IF Methods Comparison */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6">
                📊 Fasting Methods Comparison
              </h3>
              <div className="space-y-3">
                {Object.entries(fastingMethods).map(([key, method]) => (
                  <div
                    key={key}
                    className={`flex justify-between items-center p-4 rounded-2xl backdrop-blur-sm border border-white/10 ${getMethodColor(
                      key
                    )}`}
                  >
                    <span className="font-medium text-white">
                      {method.name}
                    </span>
                    <span className="text-sm text-white/80">
                      {method.fasting}h fast / {method.eating}h eat
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-amber-500/10 backdrop-blur-sm border border-amber-400/20 rounded-2xl">
                <p className="text-sm text-amber-200">
                  <strong className="text-amber-100">Remember:</strong> Start
                  with shorter fasting windows and gradually increase as your
                  body adapts. Everyone responds differently to intermittent
                  fasting.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-12 bg-amber-500/10 backdrop-blur-lg border border-amber-400/20 rounded-3xl p-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Info className="w-6 h-6 text-amber-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-amber-200 mb-2">
                ⚠️ Health & Safety Disclaimer
              </h3>
              <p className="text-amber-100/90">
                Intermittent fasting is not suitable for everyone. Consult your
                healthcare provider before starting, especially if you have
                diabetes, eating disorders, are pregnant/breastfeeding, or have
                other medical conditions. Stop fasting if you experience
                concerning symptoms and seek medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
