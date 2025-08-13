"use client";

import React from "react";
import Link from "next/link";
import {
  Moon,
  Clock,
  Calendar,
  ArrowLeft,
  Calculator,
  TrendingUp,
  Timer,
} from "lucide-react";

const sleepCalculators = [
  {
    id: "sleep-cycle",
    title: "Sleep Cycle Calculator",
    description:
      "Calculate optimal bedtime and wake time based on 90-minute sleep cycles",
    icon: Moon,
    href: "/calculators/sleep-cycle",
    color: "from-indigo-500 to-purple-600",
    features: ["REM Optimization", "Natural Wake Times", "Cycle Tracking"],
    estimatedTime: "30 seconds",
  },
  {
    id: "sleep-debt",
    title: "Sleep Debt Calculator",
    description:
      "Track your sleep deficit and get personalized recovery recommendations",
    icon: Calendar,
    href: "/calculators/sleep-debt",
    color: "from-purple-500 to-pink-600",
    features: ["Weekly Analysis", "Recovery Plans", "Health Impact"],
    estimatedTime: "1 minute",
  },
  {
    id: "sleep-length",
    title: "Sleep Length Calculator",
    description:
      "Determine optimal sleep duration based on age and lifestyle factors",
    icon: Clock,
    href: "/calculators/sleep-length",
    color: "from-blue-500 to-indigo-600",
    features: ["Age-Based", "Lifestyle Factors", "Health Guidelines"],
    estimatedTime: "45 seconds",
  },
];

export default function SleepTimePage() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Premium Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/20 to-slate-900"></div>
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      {/* Enhanced Floating Background Elements */}
      <div className="fixed top-1/4 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-3/4 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

      <div className="relative z-10">
        {/* Enhanced Header Section */}
        <div className="px-4 pt-8 pb-12">
          <div className="max-w-7xl mx-auto">
            {/* Premium Navigation */}
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to Categories
              </Link>
            </div>

            {/* Enhanced Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl mb-8 shadow-2xl shadow-indigo-500/30 ring-2 ring-white/10">
                <Moon className="w-12 h-12 text-white drop-shadow-sm" />
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                Sleep & Time
                <span className="block text-3xl md:text-4xl font-normal bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mt-3">
                  Calculators
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed">
                Optimize your sleep cycles and improve rest quality for better
                health. Use science-based calculations to find your perfect
                sleep schedule and recover from sleep debt.
              </p>

              {/* Premium Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-3xl font-bold text-white mb-2">3</div>
                  <div className="text-white/60 text-sm">Calculators</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-3xl font-bold text-white mb-2">
                    90min
                  </div>
                  <div className="text-white/60 text-sm">Sleep Cycles</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-3xl font-bold text-white mb-2">
                    7-9hr
                  </div>
                  <div className="text-white/60 text-sm">Optimal Sleep</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Calculators Grid */}
        <div className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sleepCalculators.map((calculator, index) => {
                const IconComponent = calculator.icon;
                return (
                  <Link
                    key={calculator.id}
                    href={calculator.href}
                    className="group block"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden rounded-3xl p-8 h-full bg-white/5 backdrop-blur-lg border border-white/10 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-lg shadow-black/20 hover:shadow-purple-500/20 hover:bg-white/10 hover:border-white/20 animate-fadeInUp group">
                      {/* Premium Background Pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>

                      {/* Gradient Accent */}
                      <div
                        className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${calculator.color} rounded-t-3xl`}
                      ></div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div
                            className={`p-4 bg-gradient-to-r ${calculator.color} rounded-2xl ring-2 ring-white/10 group-hover:scale-110 transition-transform duration-300`}
                          >
                            <IconComponent className="w-8 h-8 text-white drop-shadow-sm" />
                          </div>
                          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full border border-white/10">
                            <Timer className="w-4 h-4 text-white/60" />
                            <span className="text-xs font-medium text-white/80">
                              {calculator.estimatedTime}
                            </span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div className="flex-grow">
                          <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-white transition-colors duration-300">
                            {calculator.title}
                          </h3>

                          <p className="text-white/70 mb-6 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                            {calculator.description}
                          </p>
                        </div>

                        {/* Premium Features */}
                        <div className="space-y-3 mb-6">
                          <div className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                            Features
                          </div>
                          {calculator.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-center space-x-3"
                            >
                              <div
                                className={`w-2 h-2 bg-gradient-to-r ${calculator.color} rounded-full group-hover:scale-125 transition-transform duration-300`}
                              ></div>
                              <span className="text-white/70 text-sm group-hover:text-white/90 transition-colors duration-300">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Premium CTA */}
                        <div className="pt-6 border-t border-white/10">
                          <div className="flex items-center justify-between text-white/80 group-hover:text-white transition-colors duration-300">
                            <span className="font-semibold">Calculate Now</span>
                            <div className="flex items-center space-x-2">
                              <Calculator className="w-4 h-4" />
                              <TrendingUp className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                            </div>
                          </div>

                          {/* Premium Accent Line */}
                          <div className="mt-3 flex items-center">
                            <div
                              className={`w-8 h-px bg-gradient-to-r ${calculator.color} group-hover:w-16 transition-all duration-300`}
                            ></div>
                            <div
                              className={`w-2 h-2 bg-gradient-to-r ${calculator.color} rounded-full ml-2 group-hover:scale-125 transition-transform duration-300`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Premium Sleep Tips Section */}
            <div className="mt-20 text-center">
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10 max-w-3xl mx-auto hover:bg-white/10 transition-all duration-300">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4">
                    <span className="text-2xl">💤</span>
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">
                  Sleep Optimization Tips
                </h3>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  Combine our sleep calculators for the ultimate sleep
                  optimization. Start with the sleep cycle calculator, then
                  track your sleep debt and adjust your sleep length for perfect
                  rest.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/calculators/sleep-cycle"
                    className="group inline-flex items-center px-6 py-3 bg-indigo-500/20 text-indigo-400 rounded-2xl font-medium hover:bg-indigo-500/30 border border-indigo-500/30 hover:border-indigo-500/50 transition-all duration-200"
                  >
                    <Moon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                    Sleep Cycle
                  </Link>
                  <Link
                    href="/calculators/sleep-debt"
                    className="group inline-flex items-center px-6 py-3 bg-purple-500/20 text-purple-400 rounded-2xl font-medium hover:bg-purple-500/30 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-200"
                  >
                    <Calendar className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                    Sleep Debt
                  </Link>
                  <Link
                    href="/calculators/sleep-length"
                    className="group inline-flex items-center px-6 py-3 bg-blue-500/20 text-blue-400 rounded-2xl font-medium hover:bg-blue-500/30 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-200"
                  >
                    <Clock className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                    Sleep Length
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
