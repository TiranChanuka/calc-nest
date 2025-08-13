import React from "react";
import Link from "next/link";
import { Heart, Mail, Github, Twitter, Linkedin } from "lucide-react";
import { getAppName, getAppTagline } from "@/lib/config";
import Logo from "@/components/ui/Logo";

const calculatorCategories = [
  {
    title: "Quick Links",
    calculators: [
      { name: "Health & Wellness", href: "/health-wellness" },
      { name: "Sleep & Time", href: "/sleep-time" },
      { name: "Fitness & Activity", href: "/fitness-activity" },
      { name: "Women's Health", href: "/womens-health" },
      { name: "Health Risk", href: "/health-risk" },
    ],
  },
  {
    title: "Health & Wellness",
    calculators: [
      { name: "BMI Calculator", href: "/calculators/bmi" },
      { name: "Calorie Calculator", href: "/calculators/calorie" },
      { name: "BMR Calculator", href: "/calculators/bmr" },
      { name: "Body Fat Calculator", href: "/calculators/body-fat" },
      { name: "Protein Calculator", href: "/calculators/protein" },
      { name: "Water Intake Calculator", href: "/calculators/water-intake" },
    ],
  },
  {
    title: "Sleep & Time",
    calculators: [
      { name: "Sleep Cycle Calculator", href: "/calculators/sleep-cycle" },
      { name: "Sleep Debt Calculator", href: "/calculators/sleep-debt" },
      { name: "Sleep Length Calculator", href: "/calculators/sleep-length" },
    ],
  },
  {
    title: "Fitness & Activity",
    calculators: [
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
    title: "Women's Health",
    calculators: [
      {
        name: "Pregnancy Due Date Calculator",
        href: "/calculators/pregnancy-due-date",
      },
      { name: "Ovulation Calculator", href: "/calculators/ovulation" },
      { name: "Period Cycle Calculator", href: "/calculators/period-cycle" },
    ],
  },
  {
    title: "Health Risk",
    calculators: [
      { name: "Diabetes Risk Calculator", href: "/calculators/diabetes-risk" },
      { name: "Fiber Intake Calculator", href: "/calculators/fiber-intake" },
      {
        name: "Waist-Hip Ratio Calculator",
        href: "/calculators/waist-hip-ratio",
      },
    ],
  },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: Github },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white relative z-50">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4 relative z-50">
              <Logo
                size="lg"
                showText={true}
                className="mb-2"
                textClassName="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                href="/"
              />
              {/* <p className="text-xs text-gray-400">{getAppTagline()}</p> */}
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your comprehensive health and wellness calculator platform. Make
              informed decisions about your health with our
              scientifically-backed tools.
            </p>
            {/* <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-200 relative z-50"
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div> */}
          </div>

          {/* Calculator Categories */}
          {calculatorCategories.map((category) => (
            <div key={category.title} className="lg:col-span-1">
              <h4 className="text-white font-semibold mb-4">
                {category.title}
              </h4>
              <ul className="space-y-2">
                {category.calculators.map((calc) => (
                  <li key={calc.name}>
                    <Link
                      href={calc.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200 relative z-50 block"
                    >
                      {calc.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stay Updated and Medical Disclaimer Row */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Newsletter Signup */}
            <div>
              <h5 className="text-white font-semibold mb-3">Stay Updated</h5>
              <p className="text-gray-400 text-sm mb-4">
                Get the latest health tips and calculator updates delivered to
                your inbox.
              </p>
              <div className="flex max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent relative z-50"
                />
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors duration-200 flex items-center relative z-50">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div>
              <div className="bg-gray-800 rounded-lg p-6 h-full">
                <h5 className="text-yellow-400 font-semibold mb-3 flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Medical Disclaimer
                </h5>
                <p className="text-gray-400 text-sm leading-relaxed">
                  The calculators and tools provided on this website are for
                  informational purposes only and should not be considered
                  medical advice. Always consult with qualified healthcare
                  professionals for medical concerns and before making any
                  health-related decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {getAppName()}. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <span className="text-gray-400 text-sm">Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-gray-400 text-sm">for your wellness</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
