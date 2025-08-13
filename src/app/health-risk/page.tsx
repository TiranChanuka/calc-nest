"use client";

import React from "react";
import Link from "next/link";
import {
  Shield,
  AlertTriangle,
  Target,
  ArrowLeft,
  Calculator,
  TrendingUp,
  Timer,
} from "lucide-react";

const healthRiskCalculators = [
  {
    id: "diabetes-risk",
    title: "Diabetes Risk Calculator",
    description:
      "Assess your risk of developing type 2 diabetes based on lifestyle factors",
    icon: AlertTriangle,
    href: "/calculators/diabetes-risk",
    color: "from-blue-500 to-indigo-600",
    features: ["Risk Assessment", "Prevention Tips", "Lifestyle Factors"],
    estimatedTime: "2 minutes",
  },
  {
    id: "fiber-intake",
    title: "Fiber Intake Calculator",
    description:
      "Calculate your optimal daily fiber intake for digestive and heart health",
    icon: Target,
    href: "/calculators/fiber-intake",
    color: "from-green-500 to-emerald-600",
    features: ["Daily Requirements", "Health Benefits", "Food Sources"],
    estimatedTime: "1 minute",
  },
  {
    id: "waist-hip-ratio",
    title: "Waist-to-Hip Ratio Calculator",
    description: "Assess health risks based on body fat distribution patterns",
    icon: Shield,
    href: "/calculators/waist-hip-ratio",
    color: "from-purple-500 to-blue-600",
    features: ["Risk Assessment", "Body Distribution", "Health Indicators"],
    estimatedTime: "30 seconds",
  },
];

export default function HealthRiskPage() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/20 to-slate-900"></div>
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      {/* Floating Background Elements */}
      <div className="fixed top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

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
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl mb-6 shadow-lg shadow-blue-500/25">
                <Shield className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Health Risk Assessment
                <span className="block text-2xl md:text-3xl font-normal text-blue-400 mt-2">
                  Calculators
                </span>
              </h1>

              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Assess health risks and get personalized prevention strategies.
                Use evidence-based tools to understand your health status and
                take proactive steps toward better wellness.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">3</div>
                  <div className="text-white/60 text-sm">Calculators</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    Early
                  </div>
                  <div className="text-white/60 text-sm">Detection</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    Prevention
                  </div>
                  <div className="text-white/60 text-sm">Focused</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calculators Grid */}
        <div className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {healthRiskCalculators.map((calculator, index) => {
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
                      shadow-lg shadow-black/20 hover:shadow-blue-500/20
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
                            <span className="font-medium">Assess Risk</span>
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

            {/* Prevention Tips Section */}
            <div className="mt-16 text-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  🛡️ Prevention is Key
                </h3>
                <p className="text-white/80 mb-6">
                  Regular health assessments help identify risks early. Combine
                  these tools with professional medical advice for comprehensive
                  health management.
                </p>
                <div className="bg-blue-500/20 rounded-xl p-4 text-blue-300">
                  <div className="font-semibold mb-2">⚠️ Important Notice</div>
                  <div className="text-white/70 text-sm">
                    These calculators are for educational purposes. Always
                    consult healthcare professionals for medical advice.
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
