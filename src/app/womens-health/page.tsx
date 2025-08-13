"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  Heart,
  ArrowLeft,
  Calculator,
  TrendingUp,
  Timer,
} from "lucide-react";

const womensHealthCalculators = [
  {
    id: "pregnancy-due-date",
    title: "Pregnancy Due Date Calculator",
    description:
      "Calculate your estimated due date and track pregnancy milestones",
    icon: Calendar,
    href: "/calculators/pregnancy-due-date",
    color: "from-pink-500 to-rose-600",
    features: ["Due Date Estimation", "Trimester Tracking", "Milestone Alerts"],
    estimatedTime: "30 seconds",
  },
  {
    id: "ovulation",
    title: "Ovulation Calculator",
    description: "Track your fertile window and optimize conception timing",
    icon: Heart,
    href: "/calculators/ovulation",
    color: "from-rose-500 to-pink-600",
    features: ["Fertile Window", "Cycle Prediction", "Conception Planning"],
    estimatedTime: "1 minute",
  },
  {
    id: "period-cycle",
    title: "Period Cycle Calculator",
    description: "Track menstrual cycles and predict future periods accurately",
    icon: Users,
    href: "/calculators/period-cycle",
    color: "from-purple-500 to-pink-600",
    features: ["Cycle Tracking", "Period Prediction", "Health Insights"],
    estimatedTime: "45 seconds",
  },
];

export default function WomensHealthPage() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-slate-900/20 to-slate-900"></div>
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      {/* Floating Background Elements */}
      <div className="fixed top-1/4 left-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

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
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-600 rounded-3xl mb-6 shadow-lg shadow-pink-500/25">
                <Users className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Women&apos;s Health
                <span className="block text-2xl md:text-3xl font-normal text-pink-400 mt-2">
                  Calculators
                </span>
              </h1>

              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Specialized tools for women&apos;s reproductive health and
                wellness tracking. Get personalized insights for pregnancy
                planning, cycle tracking, and overall reproductive health.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">3</div>
                  <div className="text-white/60 text-sm">Calculators</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">28d</div>
                  <div className="text-white/60 text-sm">Avg Cycle</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">40wk</div>
                  <div className="text-white/60 text-sm">Pregnancy</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calculators Grid */}
        <div className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {womensHealthCalculators.map((calculator, index) => {
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
                      shadow-lg shadow-black/20 hover:shadow-pink-500/20
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

            {/* Health Tips Section */}
            <div className="mt-16 text-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  💕 Women&apos;s Health Tips
                </h3>
                <p className="text-white/80 mb-6">
                  Track your cycles consistently for better health insights.
                  Consult healthcare providers for personalized advice and
                  regular check-ups.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-pink-500/20 rounded-xl p-4 text-pink-300">
                    <div className="font-semibold mb-1">Average Cycle</div>
                    <div className="text-white/70">21-35 days</div>
                  </div>
                  <div className="bg-rose-500/20 rounded-xl p-4 text-rose-300">
                    <div className="font-semibold mb-1">Fertile Window</div>
                    <div className="text-white/70">5-6 days</div>
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
