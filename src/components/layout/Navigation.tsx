"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import {
  Heart,
  Moon,
  Activity,
  Users,
  Shield,
  Menu,
  X,
  ChevronDown,
  Home,
} from "lucide-react";
import { getNavigationTheme } from "@/utils/navigationThemes";

const navigationItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Health & Wellness",
    href: "/health-wellness",
    icon: Heart,
    children: [
      { name: "BMI Calculator", href: "/calculators/bmi" },
      { name: "Calorie Calculator", href: "/calculators/calorie" },
      { name: "BMR Calculator", href: "/calculators/bmr" },
      { name: "Body Fat Calculator", href: "/calculators/body-fat" },
      { name: "Protein Calculator", href: "/calculators/protein" },
      { name: "Water Intake Calculator", href: "/calculators/water-intake" },
    ],
  },
  {
    name: "Sleep & Time",
    href: "/sleep-time",
    icon: Moon,
    children: [
      { name: "Sleep Cycle Calculator", href: "/calculators/sleep-cycle" },
      { name: "Sleep Debt Calculator", href: "/calculators/sleep-debt" },
      { name: "Sleep Length Calculator", href: "/calculators/sleep-length" },
    ],
  },
  {
    name: "Fitness & Activity",
    href: "/fitness-activity",
    icon: Activity,
    children: [
      { name: "Heart Rate Calculator", href: "/calculators/heart-rate" },
      {
        name: "Calories Burned Calculator",
        href: "/calculators/calories-burned",
      },
      {
        name: "Intermittent Fasting Calculator",
        href: "/calculators/intermittent-fasting",
      },
    ],
  },
  {
    name: "Women's Health",
    href: "/womens-health",
    icon: Users,
    children: [
      {
        name: "Pregnancy Due Date Calculator",
        href: "/calculators/pregnancy-due-date",
      },
      { name: "Ovulation Calculator", href: "/calculators/ovulation" },
      { name: "Period Cycle Calculator", href: "/calculators/period-cycle" },
    ],
  },
  {
    name: "Health Risk Tools",
    href: "/health-risk",
    icon: Shield,
    children: [
      { name: "Diabetes Risk Calculator", href: "/calculators/diabetes-risk" },
      { name: "Fiber Intake Calculator", href: "/calculators/fiber-intake" },
      {
        name: "Waist-to-Hip Ratio Calculator",
        href: "/calculators/waist-hip-ratio",
      },
    ],
  },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Get current theme based on pathname
  const theme = getNavigationTheme(pathname) || {
    background:
      "bg-gradient-to-r from-slate-900/95 via-purple-900/90 to-slate-900/95",
    logoGradient: "from-purple-500 to-pink-500",
    logoShadow: "shadow-purple-500/25",
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`${theme.background} backdrop-blur-xl shadow-2xl border-b border-white/10 sticky top-0 z-50 py-2 md:py-2.5`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo - responsive sizing */}
          <div className="flex-shrink-0 min-w-0">
            <Logo
              size="lg"
              className="group hover:scale-110 transition-all duration-300"
              textClassName={`bg-gradient-to-r ${theme.logoGradient} bg-clip-text text-transparent`}
              href="/"
              showText={true}
            />
          </div>

          {/* Desktop Navigation - improved spacing */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const hasChildren = item.children && item.children.length > 0;

              return (
                <div key={item.name} className="relative group">
                  {hasChildren ? (
                    <button
                      className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                        isActive(item.href)
                          ? "text-white bg-white/20 border-white/30 shadow-lg"
                          : "text-white/80 hover:text-white hover:bg-white/10 border-white/10 hover:border-white/20"
                      }`}
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.name}
                      <ChevronDown className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:rotate-180" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                        isActive(item.href)
                          ? "text-white bg-white/20 border-white/30 shadow-lg"
                          : "text-white/80 hover:text-white hover:bg-white/10 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Link>
                  )}

                  {/* Premium Dropdown Menu */}
                  {hasChildren && (
                    <div
                      className={`absolute top-full left-0 mt-2 w-72 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-3 transition-all duration-300 ${
                        activeDropdown === item.name
                          ? "opacity-100 visible transform translate-y-0"
                          : "opacity-0 invisible transform -translate-y-4"
                      }`}
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="px-4 pb-2 mb-2 border-b border-white/10">
                        <h3 className="text-sm font-semibold text-white/90">
                          {item.name}
                        </h3>
                      </div>
                      {item.children?.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 mx-2 rounded-lg border border-transparent hover:border-white/10"
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-2 h-2 bg-gradient-to-r ${theme.logoGradient} rounded-full mr-3 opacity-60`}
                            ></div>
                            {child.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-white/20 bg-gradient-to-b from-transparent to-slate-900/50 backdrop-blur-xl">
            <div className="space-y-3">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const hasChildren = item.children && item.children.length > 0;

                return (
                  <div key={item.name}>
                    {hasChildren ? (
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                          isActive(item.href)
                            ? "text-white bg-white/20 border-white/30 shadow-lg"
                            : "text-white/80 hover:text-white hover:bg-white/10 border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center">
                          <Icon className="w-4 h-4 mr-3" />
                          {item.name}
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={toggleMobileMenu}
                        className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                          isActive(item.href)
                            ? "text-white bg-white/20 border-white/30 shadow-lg"
                            : "text-white/80 hover:text-white hover:bg-white/10 border-white/10 hover:border-white/20"
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        {item.name}
                      </Link>
                    )}

                    {/* Enhanced Mobile Dropdown */}
                    {hasChildren && activeDropdown === item.name && (
                      <div className="ml-4 mt-3 space-y-2 pl-4 border-l-2 border-white/20">
                        {item.children?.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={toggleMobileMenu}
                            className="flex items-center px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 border border-transparent hover:border-white/10"
                          >
                            <div
                              className={`w-2 h-2 bg-gradient-to-r ${theme.logoGradient} rounded-full mr-3 opacity-60`}
                            ></div>
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
