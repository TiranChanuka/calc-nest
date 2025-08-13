"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Heart,
  Activity,
  Users,
  Moon,
  Shield,
} from "lucide-react";

const heroFeatures = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "BMI, Calorie, BMR & more",
    count: "6 calculators",
    color: "from-emerald-500 to-teal-600",
    href: "/health-wellness",
    bgImage:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    icon: Moon,
    title: "Sleep & Time",
    description: "Sleep cycles & optimization",
    count: "3 calculators",
    color: "from-indigo-500 to-purple-600",
    href: "/sleep-time",
    bgImage:
      "https://images.unsplash.com/photo-1505043254-e1b218722b31?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    icon: Activity,
    title: "Fitness & Activity",
    description: "Heart rate & calories",
    count: "3 calculators",
    color: "from-orange-500 to-red-600",
    href: "/fitness-activity",
    bgImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Users,
    title: "Women's Health",
    description: "Pregnancy & cycle tracking",
    count: "3 calculators",
    color: "from-pink-500 to-rose-600",
    href: "/womens-health",
    bgImage:
      "https://plus.unsplash.com/premium_photo-1667762241847-37471e8c8bc0?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    icon: Shield,
    title: "Health Risk Assessment",
    description: "Risk assessment tools",
    count: "3 calculators",
    color: "from-blue-500 to-indigo-600",
    href: "/health-risk",
    bgImage:
      "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const stats = [
  { label: "Health Calculators", value: 18, suffix: "+" },
  { label: "Categories", value: 5, suffix: "" },
  { label: "Users Helped", value: 10, suffix: "K+" },
  { label: "Accuracy Rate", value: 99, suffix: "%" },
];

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
    <div
      ref={countRef}
      className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300"
    >
      {count}
      {suffix}
    </div>
  );
};

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 overflow-hidden">
      {/* Simple Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>

      {/* Subtle Floating Elements */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-blue-400/8 to-indigo-400/8 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-white/10 backdrop-blur-sm text-white border border-white/20 mb-4">
                <Calculator className="w-4 h-4 mr-2" />
                Premium Health Tools
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Your Complete
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mt-2">
                Health Calculator
              </span>
              Platform
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
              Make informed decisions about your health with our comprehensive
              collection of scientifically-backed calculators. From BMI to sleep
              cycles, we&apos;ve got you covered with premium accuracy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/health-wellness"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/25 border border-white/10"
              >
                Explore All Calculators
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="/health-wellness"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-200"
              >
                Start with BMI
              </Link>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center group">
                  <Counter end={stat.value} suffix={stat.suffix} />
                  <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Premium Feature Cards */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {heroFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Link
                    key={feature.title}
                    href={feature.href}
                    className={`group block ${
                      index === 0 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div
                      className={`relative bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer overflow-hidden ${
                        index === 0 ? "min-h-[200px]" : "min-h-[180px]"
                      }`}
                      style={{
                        animationDelay: `${index * 200}ms`,
                      }}
                    >
                      {/* Premium Background Image */}
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-30"
                        style={{
                          backgroundImage: `url(${feature.bgImage})`,
                        }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>

                      {/* Content Layer */}
                      <div className="relative z-10">
                        <div
                          className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 ring-2 ring-white/10 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          <Icon className="w-7 h-7 text-white drop-shadow-sm" />
                        </div>

                        <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-white transition-colors duration-300 drop-shadow-sm">
                          {feature.title}
                        </h3>

                        <p className="text-white/80 text-sm mb-4 leading-relaxed group-hover:text-white/90 transition-colors duration-300 drop-shadow-sm">
                          {feature.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-white/70 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 group-hover:bg-white/30 group-hover:border-white/30 transition-all duration-300 drop-shadow-sm">
                            {feature.count}
                          </span>
                          <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white/90 group-hover:translate-x-1 transition-all duration-300 drop-shadow-sm" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Premium Floating Calculator Icon */}
            <div className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl border border-white/20 animate-pulse hover:animate-none hover:scale-110 transition-all duration-500 group cursor-pointer">
              <Calculator className="w-10 h-10 text-white drop-shadow-sm group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-3xl animate-ping opacity-75"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
