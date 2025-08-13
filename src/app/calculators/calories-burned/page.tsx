"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, ArrowLeft, Info, Clock, Activity } from "lucide-react";
import InputField from "@/components/InputField";

export default function CaloriesBurnedCalculatorPage() {
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [activity, setActivity] = useState("");
  const [intensity, setIntensity] = useState("");
  const [result, setResult] = useState<{
    caloriesBurned: number;
    caloriesPerMinute: number;
    activityName: string;
    equivalents: { food: string; amount: string }[];
    recommendations: string[];
  } | null>(null);

  // MET (Metabolic Equivalent) values for different activities
  const activities = {
    "walking-slow": { name: "Walking (slow pace)", met: 3.0 },
    "walking-moderate": { name: "Walking (moderate pace)", met: 3.8 },
    "walking-fast": { name: "Walking (fast pace)", met: 4.3 },
    "running-slow": { name: "Running (5 mph)", met: 8.0 },
    "running-moderate": { name: "Running (6 mph)", met: 9.8 },
    "running-fast": { name: "Running (8 mph)", met: 11.8 },
    "cycling-leisure": { name: "Cycling (leisure)", met: 4.0 },
    "cycling-moderate": { name: "Cycling (moderate)", met: 6.8 },
    "cycling-vigorous": { name: "Cycling (vigorous)", met: 10.0 },
    "swimming-slow": { name: "Swimming (slow)", met: 6.0 },
    "swimming-moderate": { name: "Swimming (moderate)", met: 8.3 },
    "swimming-fast": { name: "Swimming (fast)", met: 11.0 },
    weightlifting: { name: "Weight lifting", met: 6.0 },
    yoga: { name: "Yoga", met: 2.5 },
    dancing: { name: "Dancing", met: 4.8 },
    tennis: { name: "Tennis", met: 7.3 },
    basketball: { name: "Basketball", met: 8.0 },
    soccer: { name: "Soccer", met: 8.5 },
    hiking: { name: "Hiking", met: 6.0 },
    "jump-rope": { name: "Jump rope", met: 12.3 },
    elliptical: { name: "Elliptical trainer", met: 5.0 },
    rowing: { name: "Rowing machine", met: 7.0 },
    "stair-climbing": { name: "Stair climbing", met: 8.8 },
    boxing: { name: "Boxing", met: 12.8 },
    cleaning: { name: "House cleaning", met: 3.3 },
    gardening: { name: "Gardening", met: 4.0 },
  };

  const calculateCaloriesBurned = () => {
    const weightNum = parseFloat(weight);
    const durationNum = parseFloat(duration);

    if (!weightNum || !durationNum || !activity) return;

    const selectedActivity = activities[activity as keyof typeof activities];
    if (!selectedActivity) return;

    let met = selectedActivity.met;

    // Adjust MET based on intensity
    if (intensity === "low") {
      met *= 0.8;
    } else if (intensity === "high") {
      met *= 1.2;
    }

    // Calories burned = MET × weight in kg × time in hours
    const caloriesBurned = met * weightNum * (durationNum / 60);
    const caloriesPerMinute = caloriesBurned / durationNum;

    // Food equivalents
    const equivalents = [
      {
        food: "Apple",
        amount: `${Math.round(caloriesBurned / 95)} medium apples`,
      },
      { food: "Banana", amount: `${Math.round(caloriesBurned / 105)} bananas` },
      {
        food: "Slice of bread",
        amount: `${Math.round(caloriesBurned / 80)} slices`,
      },
      {
        food: "Chocolate chip cookie",
        amount: `${Math.round(caloriesBurned / 150)} cookies`,
      },
      {
        food: "Can of soda",
        amount: `${Math.round(caloriesBurned / 140)} cans`,
      },
    ];

    // Recommendations based on activity and calories burned
    const recommendations = [
      "Stay hydrated before, during, and after exercise",
      "Listen to your body and rest when needed",
    ];

    if (caloriesBurned > 300) {
      recommendations.push(
        "Great workout! Consider refueling with a balanced snack"
      );
    }

    if (durationNum > 60) {
      recommendations.push(
        "Long duration exercise - make sure to maintain proper form"
      );
    }

    if (intensity === "high") {
      recommendations.push(
        "High intensity workout - allow adequate recovery time"
      );
    }

    recommendations.push(
      "Combine cardio with strength training for optimal results"
    );
    recommendations.push(
      "Aim for at least 150 minutes of moderate exercise per week"
    );

    setResult({
      caloriesBurned: Math.round(caloriesBurned),
      caloriesPerMinute: Math.round(caloriesPerMinute * 10) / 10,
      activityName: selectedActivity.name,
      equivalents,
      recommendations,
    });
  };

  const getActivityCategory = (activityKey: string) => {
    if (
      activityKey.includes("walking") ||
      activityKey.includes("running") ||
      activityKey.includes("hiking")
    ) {
      return "Cardio - Running/Walking";
    } else if (
      activityKey.includes("cycling") ||
      activityKey.includes("elliptical") ||
      activityKey.includes("rowing")
    ) {
      return "Cardio - Equipment";
    } else if (activityKey.includes("swimming")) {
      return "Swimming";
    } else if (
      activityKey.includes("weight") ||
      activityKey.includes("boxing")
    ) {
      return "Strength/Combat";
    } else if (
      activityKey.includes("tennis") ||
      activityKey.includes("basketball") ||
      activityKey.includes("soccer")
    ) {
      return "Sports";
    } else {
      return "Other Activities";
    }
  };

  const groupedActivities = Object.entries(activities).reduce(
    (acc, [key, value]) => {
      const category = getActivityCategory(key);
      if (!acc[category]) acc[category] = [];
      acc[category].push({ key, ...value });
      return acc;
    },
    {} as Record<string, Array<{ key: string; name: string; met: number }>>
  );

  return (
    <div className="bg-gradient-to-br from-slate-900 via-red-900 to-orange-900">
      {/* Dynamic Energy Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-red-600/20 via-orange-800/10 to-slate-900/20"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-yellow-500/15 via-red-600/10 to-transparent"></div>

      {/* Animated Energy Pulses */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-red-500/20 to-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-yellow-500/15 to-red-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-3/4 right-1/3 w-72 h-72 bg-gradient-to-br from-orange-600/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

      {/* Energy Lightning Effects */}
      <div className="fixed top-1/5 left-1/2 w-6 h-20 bg-gradient-to-b from-yellow-400/30 to-transparent rounded-full animate-pulse delay-500"></div>
      <div className="fixed top-1/2 right-1/5 w-20 h-6 bg-gradient-to-r from-red-400/30 to-transparent rounded-full animate-pulse delay-1500"></div>
      <div className="fixed bottom-1/3 left-1/3 w-4 h-16 bg-gradient-to-b from-orange-400/30 to-transparent rounded-full animate-pulse delay-2500"></div>

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
          <span className="text-white">Calories Burned Calculator</span>
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-3xl mb-6 shadow-2xl shadow-red-500/40 ring-2 ring-orange-200/20">
            <Zap className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-200 via-orange-200 to-yellow-200 bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-lg">
            ⚡ Calories Burned Calculator
          </h1>
          <p className="text-xl text-red-100/90 max-w-3xl mx-auto leading-relaxed font-medium">
            Calculate how many calories you burn during different physical
            activities and unleash your energy potential.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Premium Calculator Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-200 via-orange-200 to-yellow-200 bg-clip-text text-transparent mb-8 tracking-tight">
              🏃‍♂️ Activity Details
            </h2>

            <div className="space-y-6">
              <InputField
                label="Body Weight (kg)"
                value={weight}
                onChange={setWeight}
                type="number"
                placeholder="Enter your weight"
                darkTheme={true}
              />

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Activity Type
                </label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-white/50"
                >
                  <option value="">Select an activity</option>
                  {Object.entries(groupedActivities).map(
                    ([category, categoryActivities]) => (
                      <optgroup key={category} label={category}>
                        {categoryActivities.map((act) => (
                          <option key={act.key} value={act.key}>
                            {act.name} (MET: {act.met})
                          </option>
                        ))}
                      </optgroup>
                    )
                  )}
                </select>
              </div>

              <InputField
                label="Duration (minutes)"
                value={duration}
                onChange={setDuration}
                type="number"
                placeholder="Enter duration in minutes"
                darkTheme={true}
              />

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Exercise Intensity
                </label>
                <select
                  value={intensity}
                  onChange={(e) => setIntensity(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-white/50"
                >
                  <option value="">Select intensity</option>
                  <option value="low">Low intensity (easy pace)</option>
                  <option value="moderate">
                    Moderate intensity (standard)
                  </option>
                  <option value="high">High intensity (vigorous pace)</option>
                </select>
              </div>

              <div className="bg-orange-500/10 backdrop-blur-sm border border-orange-400/20 rounded-2xl p-6">
                <h4 className="font-medium text-orange-200 mb-3">
                  ⚡ MET Values:
                </h4>
                <p className="text-sm text-orange-100/90 mb-3">
                  MET (Metabolic Equivalent) represents the energy cost of
                  activities as multiples of resting metabolic rate.
                </p>
                <ul className="text-sm text-orange-100/90 space-y-1">
                  <li>• 1 MET = sitting quietly</li>
                  <li>• 3-6 METs = moderate activities</li>
                  <li>• 6+ METs = vigorous activities</li>
                </ul>
              </div>

              <button
                onClick={calculateCaloriesBurned}
                disabled={!weight || !duration || !activity || !intensity}
                className="w-full bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-red-700 hover:via-orange-700 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25"
              >
                🔥 Calculate Calories Burned
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result && (
              <>
                {/* Calories Burned Result */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                      {result.caloriesBurned}
                    </div>
                    <div className="text-lg font-semibold text-white mb-2">
                      Calories Burned
                    </div>
                    <div className="text-sm text-white/70 mb-4">
                      {result.activityName}
                    </div>
                    <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-orange-500/20 backdrop-blur-sm text-orange-200 border border-orange-400/20">
                      {result.caloriesPerMinute} calories/minute
                    </div>
                  </div>
                </div>

                {/* Activity Stats */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-red-400" />
                    💪 Workout Summary
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-orange-500/10 backdrop-blur-sm rounded-2xl border border-orange-400/20">
                      <div className="text-2xl font-bold text-orange-300 mb-1">
                        {duration}
                      </div>
                      <div className="text-sm text-orange-200 font-medium">
                        Minutes
                      </div>
                    </div>
                    <div className="text-center p-4 bg-red-500/10 backdrop-blur-sm rounded-2xl border border-red-400/20">
                      <div className="text-2xl font-bold text-red-300 mb-1">
                        {result.caloriesPerMinute}
                      </div>
                      <div className="text-sm text-red-200 font-medium">
                        Cal/Min
                      </div>
                    </div>
                  </div>
                </div>

                {/* Food Equivalents */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-red-400" />
                    🍎 Food Equivalents
                  </h3>
                  <p className="text-sm text-white/70 mb-4">
                    You burned approximately the same calories as eating:
                  </p>
                  <div className="space-y-3">
                    {result.equivalents.map((equiv, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl border border-white/10"
                      >
                        <span className="font-medium text-white">
                          {equiv.food}
                        </span>
                        <span className="text-orange-300 font-semibold">
                          {equiv.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exercise Recommendations */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-red-400" />
                    💡 Exercise Tips
                  </h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-white/90">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Calorie Burn Categories */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6">
                🎯 Activity Intensity Guide
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-green-500/10 backdrop-blur-sm rounded-2xl border border-green-400/20">
                  <span className="font-medium text-green-300">
                    Light (1-3 METs)
                  </span>
                  <span className="text-green-200 text-sm">
                    Sitting, light office work
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-yellow-500/10 backdrop-blur-sm rounded-2xl border border-yellow-400/20">
                  <span className="font-medium text-yellow-300">
                    Moderate (3-6 METs)
                  </span>
                  <span className="text-yellow-200 text-sm">
                    Walking, light cycling
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-orange-500/10 backdrop-blur-sm rounded-2xl border border-orange-400/20">
                  <span className="font-medium text-orange-300">
                    Vigorous (6-9 METs)
                  </span>
                  <span className="text-orange-200 text-sm">
                    Running, swimming
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-red-500/10 backdrop-blur-sm rounded-2xl border border-red-400/20">
                  <span className="font-medium text-red-300">
                    Very Vigorous (9+ METs)
                  </span>
                  <span className="text-red-200 text-sm">
                    Sprinting, competitive sports
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 rounded-2xl">
                <p className="text-sm text-blue-200">
                  <strong className="text-blue-100">Tip:</strong> For weight
                  loss, aim to burn 500-750 calories per day through exercise
                  and diet combined to lose 1-1.5 pounds per week.
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
                ⚠️ Exercise Safety Disclaimer
              </h3>
              <p className="text-amber-100/90">
                Calorie burn calculations are estimates based on average MET
                values and may vary between individuals. Factors like fitness
                level, body composition, and exercise efficiency affect actual
                calorie expenditure. Consult a healthcare provider before
                starting any new exercise program, especially if you have health
                conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
