"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Baby, ArrowLeft, Info, Calendar, Heart } from "lucide-react";
import InputField from "@/components/InputField";

export default function PregnancyDueDateCalculatorPage() {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [calculationMethod, setCalculationMethod] = useState("lmp");
  const [conceptionDate, setConceptionDate] = useState("");
  const [result, setResult] = useState<{
    dueDate: string;
    currentWeek: number;
    currentDay: number;
    totalDays: number;
    remainingDays: number;
    trimester: number;
    milestones: { week: number; description: string }[];
  } | null>(null);

  const calculateDueDate = () => {
    let pregnancyStart: Date;

    if (calculationMethod === "lmp" && lastPeriod) {
      pregnancyStart = new Date(lastPeriod);
    } else if (calculationMethod === "conception" && conceptionDate) {
      pregnancyStart = new Date(conceptionDate);
      // Subtract 14 days to get LMP equivalent
      pregnancyStart.setDate(pregnancyStart.getDate() - 14);
    } else {
      return;
    }

    // Calculate due date (280 days from LMP)
    const dueDate = new Date(pregnancyStart);
    dueDate.setDate(dueDate.getDate() + 280);

    // Calculate current pregnancy stats
    const today = new Date();
    const daysSinceStart = Math.floor(
      (today.getTime() - pregnancyStart.getTime()) / (1000 * 60 * 60 * 24)
    );
    const remainingDays = Math.max(0, 280 - daysSinceStart);

    const currentWeek = Math.floor(daysSinceStart / 7);
    const currentDay = daysSinceStart % 7;

    const trimester = currentWeek <= 12 ? 1 : currentWeek <= 27 ? 2 : 3;

    // Key pregnancy milestones
    const milestones = [
      { week: 4, description: "Missed period, pregnancy can be detected" },
      { week: 6, description: "Baby's heart begins to beat" },
      { week: 8, description: "Baby is now called a fetus" },
      {
        week: 12,
        description: "End of first trimester, miscarriage risk decreases",
      },
      { week: 16, description: "Baby's sex can be determined" },
      { week: 20, description: "Anatomy scan, halfway point" },
      { week: 24, description: "Viability milestone reached" },
      { week: 28, description: "Start of third trimester" },
      { week: 32, description: "Baby's bones are hardening" },
      { week: 36, description: "Baby is considered full-term soon" },
      { week: 37, description: "Baby is full-term" },
      { week: 40, description: "Due date arrives!" },
    ].filter((milestone) => milestone.week >= currentWeek);

    setResult({
      dueDate: dueDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      currentWeek: Math.max(0, currentWeek),
      currentDay,
      totalDays: Math.max(0, daysSinceStart),
      remainingDays,
      trimester,
      milestones: milestones.slice(0, 5),
    });
  };

  const getTrimesterColor = (trimester: number) => {
    switch (trimester) {
      case 1:
        return "from-rose-500/20 to-pink-600/20 text-rose-300 border border-rose-400/20";
      case 2:
        return "from-purple-500/20 to-pink-600/20 text-purple-300 border border-purple-400/20";
      default:
        return "from-blue-500/20 to-purple-600/20 text-blue-300 border border-blue-400/20";
    }
  };

  const getTrimesterName = (trimester: number) => {
    switch (trimester) {
      case 1:
        return "First Trimester";
      case 2:
        return "Second Trimester";
      default:
        return "Third Trimester";
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-rose-900 to-pink-900">
      {/* Nurturing Maternal Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-600/20 via-pink-800/10 to-slate-900/20"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-500/15 via-rose-600/10 to-transparent"></div>

      {/* Gentle Floating Elements */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-rose-500/15 to-pink-600/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-3/4 right-1/3 w-72 h-72 bg-gradient-to-br from-purple-600/15 to-rose-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>

      {/* Heart-shaped Maternal Elements */}
      <div className="fixed top-1/5 left-1/2 w-8 h-8 bg-rose-400/20 rounded-full animate-pulse delay-500"></div>
      <div className="fixed top-1/2 right-1/5 w-6 h-6 bg-pink-400/20 rounded-full animate-pulse delay-1500"></div>
      <div className="fixed bottom-1/3 left-1/3 w-10 h-10 bg-purple-400/20 rounded-full animate-pulse delay-2500"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Premium Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-white/70 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/womens-health"
            className="hover:text-white transition-colors"
          >
            Women&apos;s Health
          </Link>
          <span>/</span>
          <span className="text-white">Pregnancy Due Date Calculator</span>
        </div>

        {/* Premium Back Button */}
        <Link
          href="/womens-health"
          className="inline-flex items-center px-6 py-3 text-sm font-medium text-white/80 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:text-white transition-all duration-300 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Women&apos;s Health
        </Link>

        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-3xl mb-6 shadow-2xl shadow-rose-500/40 ring-2 ring-rose-200/20">
            <Baby className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-200 via-pink-200 to-purple-200 bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-lg">
            👶 Pregnancy Due Date Calculator
          </h1>
          <p className="text-xl text-rose-100/90 max-w-3xl mx-auto leading-relaxed font-medium">
            Calculate your estimated due date and track your beautiful pregnancy
            journey with key milestones and tender care.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Premium Calculator Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-rose-200 via-pink-200 to-purple-200 bg-clip-text text-transparent mb-8 tracking-tight">
              💕 Pregnancy Information
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Calculation Method
                </label>
                <select
                  value={calculationMethod}
                  onChange={(e) => setCalculationMethod(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent text-white placeholder-white/50"
                >
                  <option value="lmp">Last Menstrual Period (LMP)</option>
                  <option value="conception">Conception Date</option>
                </select>
              </div>

              {calculationMethod === "lmp" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      First Day of Last Menstrual Period
                    </label>
                    <input
                      type="date"
                      value={lastPeriod}
                      onChange={(e) => setLastPeriod(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent text-white placeholder-white/50"
                    />
                  </div>

                  <InputField
                    label="Average Cycle Length (days)"
                    value={cycleLength}
                    onChange={setCycleLength}
                    type="number"
                    placeholder="28"
                    darkTheme={true}
                  />
                </>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Conception Date
                  </label>
                  <input
                    type="date"
                    value={conceptionDate}
                    onChange={(e) => setConceptionDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent text-white placeholder-white/50"
                  />
                </div>
              )}

              <div className="bg-rose-500/10 backdrop-blur-sm border border-rose-400/20 rounded-2xl p-6">
                <h4 className="font-medium text-rose-200 mb-3">
                  💡 How to use:
                </h4>
                <ul className="text-sm text-rose-100/90 space-y-1">
                  <li>
                    • LMP method is most commonly used by healthcare providers
                  </li>
                  <li>
                    • Conception date method is more accurate if you know the
                    exact date
                  </li>
                  <li>
                    • Due dates are estimates - babies can arrive 2 weeks before
                    or after
                  </li>
                  <li>• Only 5% of babies are born on their actual due date</li>
                </ul>
              </div>

              <button
                onClick={calculateDueDate}
                disabled={
                  (calculationMethod === "lmp" &&
                    (!lastPeriod || !cycleLength)) ||
                  (calculationMethod === "conception" && !conceptionDate)
                }
                className="w-full bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-rose-700 hover:via-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg shadow-rose-500/25"
              >
                💝 Calculate Due Date
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result && (
              <>
                {/* Due Date Result */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
                  <div className="text-center mb-6">
                    <div className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                      {result.dueDate}
                    </div>
                    <div className="text-lg font-semibold text-white mb-4">
                      Estimated Due Date
                    </div>
                    <div
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${getTrimesterColor(
                        result.trimester
                      )} text-white`}
                    >
                      {getTrimesterName(result.trimester)}
                    </div>
                  </div>
                </div>

                {/* Current Pregnancy Stats */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    🤱 Current Pregnancy Status
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-rose-500/10 backdrop-blur-sm rounded-2xl border border-rose-400/20">
                      <div className="text-2xl font-bold text-rose-300 mb-1">
                        {result.currentWeek}w {result.currentDay}d
                      </div>
                      <div className="text-sm text-rose-200 font-medium">
                        Weeks Along
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-500/10 backdrop-blur-sm rounded-2xl border border-purple-400/20">
                      <div className="text-2xl font-bold text-purple-300 mb-1">
                        {result.remainingDays}
                      </div>
                      <div className="text-sm text-purple-200 font-medium">
                        Days Remaining
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="flex justify-between text-sm text-white/70 mb-2">
                      <span>Progress</span>
                      <span>{Math.round((result.totalDays / 280) * 100)}%</span>
                    </div>
                    <div className="w-full bg-white/10 backdrop-blur-sm rounded-full h-3">
                      <div
                        className={`h-3 rounded-full bg-gradient-to-r ${
                          getTrimesterColor(result.trimester).split(" ")[0]
                        } ${getTrimesterColor(result.trimester).split(" ")[1]}`}
                        style={{
                          width: `${Math.min(
                            (result.totalDays / 280) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Milestones */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-rose-400" />
                    🌟 Upcoming Milestones
                  </h3>
                  <div className="space-y-4">
                    {result.milestones.map((milestone, index) => (
                      <div
                        key={index}
                        className="flex items-start p-4 bg-gradient-to-r from-rose-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl border border-white/10"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0 shadow-lg">
                          {milestone.week}w
                        </div>
                        <div>
                          <div className="font-medium text-white mb-1">
                            Week {milestone.week}
                          </div>
                          <div className="text-sm text-white/70">
                            {milestone.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Trimester Overview */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-rose-400" />
                💖 Pregnancy Timeline
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-rose-500/10 backdrop-blur-sm rounded-2xl border border-rose-400/20">
                  <span className="font-medium text-rose-300">
                    First Trimester
                  </span>
                  <span className="text-rose-200 text-sm">Weeks 1-12</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-500/10 backdrop-blur-sm rounded-2xl border border-purple-400/20">
                  <span className="font-medium text-purple-300">
                    Second Trimester
                  </span>
                  <span className="text-purple-200 text-sm">Weeks 13-27</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-500/10 backdrop-blur-sm rounded-2xl border border-blue-400/20">
                  <span className="font-medium text-blue-300">
                    Third Trimester
                  </span>
                  <span className="text-blue-200 text-sm">Weeks 28-40</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-500/10 backdrop-blur-sm border border-amber-400/20 rounded-2xl">
                <p className="text-sm text-amber-200">
                  <strong className="text-amber-100">Note:</strong> Full-term
                  pregnancy is considered 37-42 weeks. Your healthcare provider
                  will monitor your progress throughout your pregnancy.
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
                ⚠️ Medical Disclaimer
              </h3>
              <p className="text-amber-100/90">
                This calculator provides estimated due dates for informational
                purposes only. Due dates can vary and should always be confirmed
                by your healthcare provider through ultrasound and clinical
                assessment. Consult your doctor for proper prenatal care and
                monitoring throughout your pregnancy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
