"use client";

import React from "react";
import Link from "next/link";
import {
  Activity,
  Heart,
  Flame,
  ArrowLeft,
  Calculator,
  TrendingUp,
  Timer,
} from "lucide-react";

const fitnessCalculators = [
  {
    id: "heart-rate",
    title: "Heart Rate Calculator",
    description:
      "Calculate your target heart rate zones for different workout intensities",
    icon: Heart,
    href: "/calculators/heart-rate",
    color: "from-red-500 to-pink-600",
    features: ["Zone Training", "Age-Based", "Workout Optimization"],
    estimatedTime: "30 seconds",
  },
  {
    id: "calories-burned",
    title: "Calories Burned Calculator",
    description:
      "Estimate calories burned during various physical activities and exercises",
    icon: Flame,
    href: "/calculators/calories-burned",
    color: "from-orange-500 to-red-600",
    features: ["Activity Database", "Time-Based", "Personalized Results"],
    estimatedTime: "1 minute",
  },
  {
    id: "intermittent-fasting",
    title: "Intermittent Fasting Calculator",
    description: "Plan your fasting and eating windows for optimal results",
    icon: Activity,
    href: "/calculators/intermittent-fasting",
    color: "from-purple-500 to-pink-600",
    features: ["Multiple Methods", "Schedule Planning", "Goal Tracking"],
    estimatedTime: "45 seconds",
  },
];

export default function FitnessActivityPage() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-slate-900/20 to-slate-900"></div>
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      {/* Floating Background Elements */}
      <div className="fixed top-1/4 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="px-4 pt-8 pb-12">
          <div className="max-w-7xl mx-auto">
            {/* Navigation */}
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center text-white/70 hover:text-white transition-colors duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to Categories
              </Link>
            </div>

            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl mb-6 shadow-lg shadow-orange-500/25">
                <Activity className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Fitness & Activity
                <span className="block text-2xl md:text-3xl font-normal text-orange-400 mt-2">
                  Calculators
                </span>
              </h1>

              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Track your workouts, calories burned, and optimize your fitness
                routine. Get personalized insights to maximize your training
                effectiveness and reach your fitness goals.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">3</div>
                  <div className="text-white/60 text-sm">Calculators</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">50+</div>
                  <div className="text-white/60 text-sm">Activities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">24/7</div>
                  <div className="text-white/60 text-sm">Tracking</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calculators Grid */}
        <div className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fitnessCalculators.map((calculator, index) => {
                const IconComponent = calculator.icon;
                return (
                  <Link
                    key={calculator.id}
                    href={calculator.href}
                    className="group block"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`
                      relative overflow-hidden rounded-3xl p-8 h-full
                      bg-gradient-to-br ${calculator.color}
                      backdrop-blur-sm border border-white/10
                      transform transition-all duration-500 hover:scale-105 hover:shadow-2xl
                      shadow-lg shadow-black/20 hover:shadow-orange-500/20
                      animate-fadeInUp
                    `}
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex items-center space-x-1 text-white/60">
                            <Timer className="w-4 h-4" />
                            <span className="text-xs font-medium">
                              {calculator.estimatedTime}
                            </span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div className="flex-grow">
                          <h3 className="text-2xl font-bold text-white mb-3">
                            {calculator.title}
                          </h3>

                          <p className="text-white/80 mb-6 text-sm leading-relaxed">
                            {calculator.description}
                          </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-2 mb-6">
                          {calculator.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-center space-x-2"
                            >
                              <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                              <span className="text-white/70 text-sm">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="pt-4 border-t border-white/10">
                          <div className="flex items-center justify-between text-white group-hover:text-white/90 transition-colors duration-300">
                            <span className="font-medium">Calculate Now</span>
                            <div className="flex items-center space-x-2">
                              <Calculator className="w-4 h-4" />
                              <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Fitness Tips Section */}
            <div className="mt-16 text-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  🔥 Fitness Optimization
                </h3>
                <p className="text-white/80 mb-6">
                  Combine heart rate training with calorie tracking for maximum
                  results. Use intermittent fasting to enhance your fitness
                  goals.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-orange-500/20 rounded-xl p-4 text-orange-300">
                    <div className="font-semibold mb-1">Target HR Zone</div>
                    <div className="text-white/70">70-85% Max HR</div>
                  </div>
                  <div className="bg-red-500/20 rounded-xl p-4 text-red-300">
                    <div className="font-semibold mb-1">Calories/Week</div>
                    <div className="text-white/70">2000-3500 burn</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
