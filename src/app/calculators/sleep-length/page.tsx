"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, ArrowLeft, Info, Moon, Sun } from "lucide-react";
import InputField from "@/components/InputField";
import SleepTimePicker from "@/components/SleepTimePicker";

export default function SleepLengthCalculatorPage() {
  const [age, setAge] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [sleepQuality, setSleepQuality] = useState("");
  const [lifestyle, setLifestyle] = useState("");
  const [result, setResult] = useState<{
    recommendedSleep: { min: number; max: number };
    bedtimes: string[];
    ageGroup: string;
    tips: string[];
  } | null>(null);

  const calculateOptimalSleep = () => {
    const ageNum = parseInt(age);
    const wake = wakeTime;

    if (!ageNum || !wake) return;

    let sleepRange = { min: 7, max: 9 };
    let ageGroup = "";

    if (ageNum < 3) {
      sleepRange = { min: 14, max: 17 };
      ageGroup = "Newborn/Infant";
    } else if (ageNum < 6) {
      sleepRange = { min: 11, max: 14 };
      ageGroup = "Preschooler";
    } else if (ageNum < 13) {
      sleepRange = { min: 9, max: 11 };
      ageGroup = "School Age";
    } else if (ageNum < 18) {
      sleepRange = { min: 8, max: 10 };
      ageGroup = "Teenager";
    } else if (ageNum < 26) {
      sleepRange = { min: 7, max: 9 };
      ageGroup = "Young Adult";
    } else if (ageNum < 65) {
      sleepRange = { min: 7, max: 9 };
      ageGroup = "Adult";
    } else {
      sleepRange = { min: 7, max: 8 };
      ageGroup = "Older Adult";
    }

    // Adjust for lifestyle factors
    if (lifestyle === "very-active") {
      sleepRange.min += 0.5;
      sleepRange.max += 0.5;
    } else if (lifestyle === "sedentary") {
      sleepRange.min -= 0.5;
      sleepRange.max -= 0.5;
    }

    // Adjust for sleep quality
    if (sleepQuality === "poor") {
      sleepRange.min += 1;
      sleepRange.max += 1;
    } else if (sleepQuality === "excellent") {
      sleepRange.min -= 0.5;
    }

    // Calculate bedtimes
    const bedtimes = [];
    const [wakeHour, wakeMinute] = wake.split(":").map(Number);

    for (
      let sleepHours = sleepRange.min;
      sleepHours <= sleepRange.max;
      sleepHours += 0.5
    ) {
      const bedtimeMinutes = wakeHour * 60 + wakeMinute - sleepHours * 60;
      let bedHour = Math.floor(bedtimeMinutes / 60);
      let bedMin = bedtimeMinutes % 60;

      if (bedHour < 0) bedHour += 24;
      if (bedMin < 0) {
        bedMin += 60;
        bedHour -= 1;
        if (bedHour < 0) bedHour += 24;
      }

      const bedtime = `${bedHour.toString().padStart(2, "0")}:${Math.abs(bedMin)
        .toString()
        .padStart(2, "0")}`;
      bedtimes.push(bedtime);
    }

    // Generate personalized tips
    const tips = [
      "Maintain a consistent sleep schedule, even on weekends",
      "Create a relaxing bedtime routine 30-60 minutes before sleep",
      "Keep your bedroom cool, dark, and quiet",
      "Avoid screens at least 1 hour before bedtime",
    ];

    if (lifestyle === "very-active") {
      tips.push("Your active lifestyle may require additional recovery sleep");
    }

    if (sleepQuality === "poor") {
      tips.push("Consider addressing factors affecting your sleep quality");
      tips.push("Avoid caffeine 6 hours before bedtime");
    }

    if (ageNum >= 65) {
      tips.push(
        "Light exposure in the morning can help regulate your circadian rhythm"
      );
    }

    if (ageNum < 18) {
      tips.push("Growing bodies need adequate sleep for development");
    }

    setResult({
      recommendedSleep: sleepRange,
      bedtimes: bedtimes.slice(0, 3), // Show top 3 options
      ageGroup,
      tips,
    });
  };

  const formatSleepRange = (range: { min: number; max: number }) => {
    const formatHours = (hours: number) => {
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60);
      return m === 0 ? `${h}h` : `${h}h ${m}m`;
    };

    return `${formatHours(range.min)} - ${formatHours(range.max)}`;
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900 relative">
      {/* Night Sky Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900"></div>

      {/* Stars */}
      <div className="fixed inset-0">
        {/* Large Stars */}
        <div className="absolute top-[18%] left-[8%] w-1 h-1 bg-white rounded-full animate-pulse shadow-white shadow-sm"></div>
        <div className="absolute top-[32%] right-[12%] w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-1000 shadow-blue-200 shadow-sm"></div>
        <div className="absolute top-[62%] left-[22%] w-1 h-1 bg-purple-200 rounded-full animate-pulse delay-2000 shadow-purple-200 shadow-sm"></div>
        <div className="absolute top-[42%] right-[28%] w-1 h-1 bg-white rounded-full animate-pulse delay-500 shadow-white shadow-sm"></div>
        <div className="absolute top-[72%] right-[18%] w-1 h-1 bg-blue-100 rounded-full animate-pulse delay-1500 shadow-blue-100 shadow-sm"></div>
        <div className="absolute top-[12%] left-[58%] w-1 h-1 bg-white rounded-full animate-pulse delay-700 shadow-white shadow-sm"></div>
        <div className="absolute top-[78%] left-[42%] w-1 h-1 bg-purple-100 rounded-full animate-pulse delay-300 shadow-purple-100 shadow-sm"></div>

        {/* Medium Stars */}
        <div className="absolute top-[26%] left-[52%] w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-200"></div>
        <div className="absolute top-[46%] left-[72%] w-0.5 h-0.5 bg-blue-200 rounded-full animate-pulse delay-800"></div>
        <div className="absolute top-[66%] right-[42%] w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-400"></div>
        <div className="absolute top-[36%] left-[32%] w-0.5 h-0.5 bg-purple-200 rounded-full animate-pulse delay-1200"></div>
        <div className="absolute top-[56%] right-[62%] w-0.5 h-0.5 bg-blue-100 rounded-full animate-pulse delay-600"></div>

        {/* Small Stars */}
        <div className="absolute top-[8%] right-[22%] w-0.5 h-0.5 bg-white/70 rounded-full animate-pulse delay-900"></div>
        <div className="absolute top-[52%] left-[18%] w-0.5 h-0.5 bg-blue-200/70 rounded-full animate-pulse delay-1100"></div>
        <div className="absolute top-[82%] right-[52%] w-0.5 h-0.5 bg-white/70 rounded-full animate-pulse delay-100"></div>
        <div className="absolute top-[22%] left-[78%] w-0.5 h-0.5 bg-purple-200/70 rounded-full animate-pulse delay-1300"></div>
      </div>

      {/* Shooting Stars */}
      <div className="fixed inset-0">
        <div className="absolute top-[30%] left-[-10%] w-36 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45 animate-pulse opacity-60"></div>
        <div className="absolute top-[65%] right-[-10%] w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent transform rotate-[135deg] animate-pulse delay-4000 opacity-50"></div>
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
          <span className="text-white">Sleep Length Calculator</span>
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
            <Clock className="w-10 h-10 text-white drop-shadow-sm" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Sleep Length Calculator
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Discover your optimal sleep duration and ideal bedtime based on your
            age, lifestyle, and wake-up time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Premium Calculator Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-indigo-200 mb-8 tracking-tight">
              Sleep Requirements
            </h2>

            <div className="space-y-6">
              <InputField
                label="Age (years)"
                value={age}
                onChange={setAge}
                type="number"
                placeholder="Enter your age"
                darkTheme={true}
              />

              <SleepTimePicker
                label="Wake-up Time"
                value={wakeTime}
                onChange={setWakeTime}
                type="waketime"
                darkTheme={true}
                helpText="Select your desired wake-up time"
              />

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Sleep Quality
                </label>
                <select
                  value={sleepQuality}
                  onChange={(e) => setSleepQuality(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="" className="bg-slate-800 text-white">
                    Select sleep quality
                  </option>
                  <option value="poor" className="bg-slate-800 text-white">
                    Poor (frequently wake up tired)
                  </option>
                  <option value="fair" className="bg-slate-800 text-white">
                    Fair (sometimes wake up tired)
                  </option>
                  <option value="good" className="bg-slate-800 text-white">
                    Good (usually feel rested)
                  </option>
                  <option value="excellent" className="bg-slate-800 text-white">
                    Excellent (always feel refreshed)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Lifestyle
                </label>
                <select
                  value={lifestyle}
                  onChange={(e) => setLifestyle(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="" className="bg-slate-800 text-white">
                    Select activity level
                  </option>
                  <option value="sedentary" className="bg-slate-800 text-white">
                    Sedentary (little to no exercise)
                  </option>
                  <option value="moderate" className="bg-slate-800 text-white">
                    Moderate (exercise 1-3 times/week)
                  </option>
                  <option value="active" className="bg-slate-800 text-white">
                    Active (exercise 4-6 times/week)
                  </option>
                  <option
                    value="very-active"
                    className="bg-slate-800 text-white"
                  >
                    Very Active (daily intense exercise)
                  </option>
                </select>
              </div>

              <button
                onClick={calculateOptimalSleep}
                disabled={!age || !wakeTime || !sleepQuality || !lifestyle}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg shadow-indigo-500/25"
              >
                Calculate Optimal Sleep
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result && (
              <>
                {/* Recommended Sleep */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">
                      {formatSleepRange(result.recommendedSleep)}
                    </div>
                    <div className="text-lg font-semibold mb-2">
                      Recommended Sleep Duration
                    </div>
                    <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                      {result.ageGroup}
                    </div>
                  </div>
                </div>

                {/* Optimal Bedtimes */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Moon className="w-5 h-5 mr-2" />
                    Optimal Bedtimes
                  </h3>
                  <div className="space-y-3">
                    {result.bedtimes.map((bedtime, index) => {
                      const sleepHours =
                        result.recommendedSleep.min + index * 0.5;
                      return (
                        <div
                          key={index}
                          className="flex justify-between items-center p-4 bg-indigo-50 rounded-xl"
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm font-semibold mr-3">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">
                                {bedtime}
                              </div>
                              <div className="text-sm text-gray-600">
                                {Math.floor(sleepHours)}h{" "}
                                {Math.round((sleepHours % 1) * 60)}m sleep
                              </div>
                            </div>
                          </div>
                          <Sun className="w-5 h-5 text-orange-500" />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Personalized Tips */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Info className="w-5 h-5 mr-2" />
                    Sleep Optimization Tips
                  </h3>
                  <ul className="space-y-3">
                    {result.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Age-Based Sleep Recommendations */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Sleep Recommendations by Age
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-blue-800">
                    Newborn (0-3 months)
                  </span>
                  <span className="text-blue-600">14-17 hours</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-800">
                    Preschooler (3-5 years)
                  </span>
                  <span className="text-green-600">11-14 hours</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="font-medium text-yellow-800">
                    School Age (6-12 years)
                  </span>
                  <span className="text-yellow-600">9-11 hours</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium text-orange-800">
                    Teenager (13-17 years)
                  </span>
                  <span className="text-orange-600">8-10 hours</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                  <span className="font-medium text-indigo-800">
                    Adult (18-64 years)
                  </span>
                  <span className="text-indigo-600">7-9 hours</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium text-purple-800">
                    Older Adult (65+ years)
                  </span>
                  <span className="text-purple-600">7-8 hours</span>
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
                Sleep recommendations are based on general guidelines from sleep
                research organizations. Individual sleep needs may vary based on
                genetics, health conditions, medications, and life
                circumstances. Consult a healthcare provider if you experience
                persistent sleep difficulties or disorders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
