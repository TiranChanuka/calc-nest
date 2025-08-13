"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Heart, Moon, Activity, Users, Shield, ArrowRight } from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import FeaturesSection from "@/components/ui/FeaturesSection";

const calculatorCategories = [
  {
    id: "health-wellness",
    title: "Health & Wellness",
    description:
      "Essential health metrics and body composition calculators for optimal wellness",
    icon: Heart,
    href: "/health-wellness",
    color: "from-emerald-500 to-teal-600",
    bgImage:
      "https://images.unsplash.com/photo-1687436874774-fa0d4616bec9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    calculators: [
      "BMI Calculator",
      "Calorie Calculator",
      "BMR Calculator",
      "Body Fat Calculator",
      "Protein Calculator",
      "Water Intake Calculator",
    ],
  },
  {
    id: "sleep-time",
    title: "Sleep & Time",
    description:
      "Optimize your sleep cycles and improve rest quality for better health",
    icon: Moon,
    href: "/sleep-time",
    color: "from-indigo-500 to-purple-600",
    bgImage:
      "https://images.unsplash.com/photo-1625343378090-a6a594c6cb92?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    calculators: [
      "Sleep Cycle Calculator",
      "Sleep Debt Calculator",
      "Sleep Length Calculator",
    ],
  },
  {
    id: "fitness-activity",
    title: "Fitness & Activity",
    description:
      "Track your workouts, calories burned, and optimize your fitness routine",
    icon: Activity,
    href: "/fitness-activity",
    color: "from-orange-500 to-red-600",
    bgImage:
      "https://images.unsplash.com/photo-1599552683573-9dc48255fe85?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    calculators: [
      "Heart Rate Calculator",
      "Calories Burned Calculator",
      "Intermittent Fasting Calculator",
    ],
  },
  {
    id: "womens-health",
    title: "Women's Health",
    description:
      "Specialized tools for women's reproductive health and wellness tracking",
    icon: Users,
    href: "/womens-health",
    color: "from-pink-500 to-rose-600",
    bgImage:
      "https://images.unsplash.com/photo-1696063429824-b0f45cd175eb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    calculators: [
      "Pregnancy Due Date Calculator",
      "Ovulation Calculator",
      "Period Cycle Calculator",
    ],
  },
  {
    id: "health-risk",
    title: "Health Risk Assessment",
    description:
      "Assess health risks and get personalized prevention strategies",
    icon: Shield,
    href: "/health-risk",
    color: "from-blue-500 to-indigo-600",
    bgImage:
      "https://plus.unsplash.com/premium_photo-1674605378401-dbf2af9e9c5c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    calculators: [
      "Diabetes Risk Calculator",
      "Fiber Intake Calculator",
      "Waist-to-Hip Ratio Calculator",
    ],
  },
];

// Simple Inline Counter Component
const InlineCounter = ({
  end,
  duration = 2000,
}: {
  end: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = countRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  return <span ref={countRef}>{count}</span>;
};

// Counter Animation Component
const Counter = ({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = countRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  return (
    <div ref={countRef} className="text-3xl font-bold text-white mb-2">
      {count}
      {suffix}
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/20 to-slate-900"></div>
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      {/* Floating Background Elements */}
      <div className="fixed top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-3/4 left-3/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Calculator Categories Section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Explore Our Calculator Categories
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Discover specialized health tools organized by category. Each
                calculator is designed to provide accurate, science-based
                results for your wellness journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {calculatorCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Link
                    key={category.id}
                    href={category.href}
                    className="group block"
                  >
                    <div
                      className={`
                      relative overflow-hidden rounded-3xl p-8 h-full
                      transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                      shadow-xl shadow-black/30 hover:shadow-purple-500/20
                    `}
                    >
                      {/* Prominent Background Image */}
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-70"
                        style={{
                          backgroundImage: `url(${category.bgImage})`,
                        }}
                      ></div>

                      {/* Reduced Overlay for Better Image Visibility */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-40`}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <div className="p-4 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg border border-white/40">
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          <ArrowRight className="w-6 h-6 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                          {category.title}
                        </h3>

                        <p className="text-white/95 mb-6 text-base leading-relaxed font-medium drop-shadow-md">
                          {category.description}
                        </p>

                        {/* Calculator List */}
                        <div className="space-y-2 mb-6">
                          <p className="text-white/90 text-sm font-semibold uppercase tracking-wider mb-3 drop-shadow-md">
                            Available Tools
                          </p>
                          <ul className="space-y-1">
                            {category.calculators
                              .slice(0, 3)
                              .map((calc, index) => (
                                <li
                                  key={index}
                                  className="flex items-center space-x-2 text-white/90 text-sm"
                                >
                                  <div className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></div>
                                  <span className="drop-shadow-sm">{calc}</span>
                                </li>
                              ))}
                            {category.calculators.length > 3 && (
                              <li className="flex items-center space-x-2 text-white/80 text-sm">
                                <div className="w-1.5 h-1.5 bg-white/70 rounded-full flex-shrink-0"></div>
                                <span className="drop-shadow-sm">
                                  +{category.calculators.length - 3} more tools
                                </span>
                              </li>
                            )}
                          </ul>
                        </div>

                        {/* Calculator Count */}
                        <div className="mb-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white/90 backdrop-blur-sm">
                            {category.calculators.length} calculators
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Stats Section */}
            <div className="mt-20 text-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <Counter end={18} suffix="+" />
                  <div className="text-white/60 text-sm">
                    Health Calculators
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <Counter end={5} />
                  <div className="text-white/60 text-sm">Categories</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <Counter end={100} suffix="%" />
                  <div className="text-white/60 text-sm">Free to Use</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-3xl font-bold text-white mb-2">
                    <InlineCounter end={24} />/<InlineCounter end={7} />
                  </div>
                  <div className="text-white/60 text-sm">Available</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <FeaturesSection />
      </div>
    </div>
  );
}
