import React from "react";
import { Zap, Shield, Smartphone, Users, Award, Clock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Get accurate calculations in seconds with our optimized algorithms",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Shield,
    title: "Scientifically Backed",
    description:
      "All formulas based on peer-reviewed research and medical standards",
    color: "from-green-400 to-blue-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description:
      "Perfect experience across all devices - desktop, tablet, and mobile",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: Users,
    title: "Privacy First",
    description:
      "Your health data stays private. No registration or data collection required",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: Award,
    title: "Comprehensive Tools",
    description: "18+ calculators covering all aspects of health and wellness",
    color: "from-red-400 to-pink-500",
  },
  {
    icon: Clock,
    title: "Always Available",
    description: "Access your health tools 24/7 from anywhere in the world",
    color: "from-indigo-400 to-purple-500",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/20 to-slate-900"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Why Choose Our Platform?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Experience the most comprehensive and accurate health calculation
            platform designed with your privacy and convenience in mind.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 animate-fadeInUp h-full">
                  {/* Premium Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-10 translate-x-10"></div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 ring-2 ring-white/10 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-8 h-8 text-white drop-shadow-sm" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-4 tracking-tight group-hover:text-white transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Premium Accent */}
                    <div className="mt-6 flex items-center">
                      <div className="w-8 h-px bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-12 transition-all duration-300"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full ml-2 group-hover:scale-125 transition-transform duration-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Start Your Health Journey?
            </h3>
            <p className="text-white/80 mb-8 text-lg max-w-2xl mx-auto">
              Join thousands of users who trust our platform for their health
              calculations. Start exploring our comprehensive suite of tools
              today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/health-wellness"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/25 border border-white/10"
              >
                Get Started Now
              </a>
              <a
                href="/sleep-time"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-200"
              >
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
