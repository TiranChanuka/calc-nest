"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, ArrowLeft, Info, Clock, Heart } from "lucide-react";
import InputField from "@/components/InputField";

export default function PeriodCycleCalculatorPage() {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [periodLength, setPeriodLength] = useState("5");
  const [trackingMonths, setTrackingMonths] = useState("3");
  const [result, setResult] = useState<{
    nextPeriods: { date: string; week: number }[];
    cycleAnalysis: {
      isRegular: boolean;
      cycleType: string;
      averageLength: number;
    };
    calendar: { date: string; type: string; description: string }[];
    healthTips: string[];
  } | null>(null);

  const calculatePeriodCycle = () => {
    if (!lastPeriod || !cycleLength || !periodLength) return;

    const lastPeriodDate = new Date(lastPeriod);
    const cycle = parseInt(cycleLength);
    const period = parseInt(periodLength);
    const months = parseInt(trackingMonths);

    // Calculate next periods
    const nextPeriods = [];
    for (let i = 1; i <= months; i++) {
      const nextPeriod = new Date(lastPeriodDate);
      nextPeriod.setDate(nextPeriod.getDate() + cycle * i);
      nextPeriods.push({
        date: nextPeriod.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        week: Math.ceil(
          (nextPeriod.getTime() - lastPeriodDate.getTime()) /
            (7 * 24 * 60 * 60 * 1000)
        ),
      });
    }

    // Cycle analysis
    let isRegular = true;
    let cycleType = "Normal";

    if (cycle < 21) {
      isRegular = false;
      cycleType = "Short Cycle";
    } else if (cycle > 35) {
      isRegular = false;
      cycleType = "Long Cycle";
    } else if (cycle >= 21 && cycle <= 35) {
      cycleType = "Normal";
    }

    // Create calendar events for next 3 months
    const calendar = [];
    const today = new Date();

    for (let i = 0; i < 3; i++) {
      const periodStart = new Date(lastPeriodDate);
      periodStart.setDate(periodStart.getDate() + cycle * (i + 1));

      // Period days
      for (let j = 0; j < period; j++) {
        const periodDay = new Date(periodStart);
        periodDay.setDate(periodDay.getDate() + j);
        if (periodDay >= today) {
          calendar.push({
            date: periodDay.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            type: j === 0 ? "period-start" : "period",
            description: j === 0 ? "Period starts" : `Period day ${j + 1}`,
          });
        }
      }

      // Ovulation (14 days before next period)
      const ovulation = new Date(periodStart);
      ovulation.setDate(ovulation.getDate() + cycle - 14);
      if (ovulation >= today) {
        calendar.push({
          date: ovulation.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          type: "ovulation",
          description: "Ovulation (fertile day)",
        });
      }

      // Fertile window (5 days before ovulation)
      const fertileStart = new Date(ovulation);
      fertileStart.setDate(fertileStart.getDate() - 5);
      for (let k = 0; k < 5; k++) {
        const fertileDay = new Date(fertileStart);
        fertileDay.setDate(fertileDay.getDate() + k);
        if (fertileDay >= today && fertileDay < ovulation) {
          calendar.push({
            date: fertileDay.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            type: "fertile",
            description: "Fertile window",
          });
        }
      }
    }

    // Sort calendar by date
    calendar.sort((a, b) => {
      const dateA = new Date(a.date + ", " + new Date().getFullYear());
      const dateB = new Date(b.date + ", " + new Date().getFullYear());
      return dateA.getTime() - dateB.getTime();
    });

    // Health tips based on cycle
    const healthTips = [
      "Track your symptoms daily for better cycle understanding",
      "Stay hydrated and maintain a balanced diet",
      "Regular exercise can help regulate your cycle",
      "Manage stress through relaxation techniques",
    ];

    if (cycle < 21) {
      healthTips.push(
        "Short cycles may indicate hormonal imbalances - consider consulting a doctor"
      );
    } else if (cycle > 35) {
      healthTips.push(
        "Long cycles can be normal but consult a healthcare provider if irregular"
      );
    }

    if (period > 7) {
      healthTips.push(
        "Periods longer than 7 days should be discussed with a healthcare provider"
      );
    }

    setResult({
      nextPeriods: nextPeriods.slice(0, 6), // Show next 6 periods
      cycleAnalysis: {
        isRegular,
        cycleType,
        averageLength: cycle,
      },
      calendar: calendar.slice(0, 12), // Show next 12 events
      healthTips,
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "period-start":
        return "bg-red-100 text-red-800 border-red-200";
      case "period":
        return "bg-red-50 text-red-700 border-red-100";
      case "ovulation":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "fertile":
        return "bg-pink-100 text-pink-800 border-pink-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "period-start":
      case "period":
        return "🔴";
      case "ovulation":
        return "🌟";
      case "fertile":
        return "💖";
      default:
        return "📅";
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-red-900 to-rose-900">
      {/* Cycle & Rhythm Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600/20 via-rose-800/10 to-slate-900/20"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-500/15 via-red-600/10 to-transparent"></div>

      {/* Rhythmic Cycle Elements */}
      <div className="fixed top-1/4 left-1/4 w-88 h-88 bg-gradient-to-br from-red-500/15 to-rose-600/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-3/4 right-1/3 w-72 h-72 bg-gradient-to-br from-pink-600/15 to-red-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-rose-200 mb-6">
          <Link href="/" className="hover:text-rose-100 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/womens-health"
            className="hover:text-rose-100 transition-colors"
          >
            Women&apos;s Health
          </Link>
          <span>/</span>
          <span className="text-white font-medium">
            Period Cycle Calculator
          </span>
        </div>

        {/* Back Button */}
        <Link
          href="/womens-health"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-rose-100 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Women&apos;s Health
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl mb-4 shadow-lg shadow-red-500/30">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Period Cycle Calculator
          </h1>
          <p className="text-lg text-rose-100 max-w-3xl mx-auto drop-shadow-md">
            Track your menstrual cycle, predict future periods, and monitor your
            reproductive health.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-rose-200 mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-rose-300" />
              Cycle Tracking
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-rose-200 mb-2">
                  First Day of Last Period
                </label>
                <input
                  type="date"
                  value={lastPeriod}
                  onChange={(e) => setLastPeriod(e.target.value)}
                  className="w-full px-4 py-3 border border-white/20 bg-white/10 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent text-white placeholder-rose-200"
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

              <InputField
                label="Period Length (days)"
                value={periodLength}
                onChange={setPeriodLength}
                type="number"
                placeholder="5"
                darkTheme={true}
              />

              <InputField
                label="Months to Predict"
                value={trackingMonths}
                onChange={setTrackingMonths}
                type="number"
                placeholder="3"
                darkTheme={true}
              />

              <div className="bg-rose-900/30 border border-rose-500/30 rounded-lg p-4 backdrop-blur-sm">
                <h4 className="font-medium text-rose-200 mb-2">
                  Cycle Tracking Tips:
                </h4>
                <ul className="text-sm text-rose-100 space-y-1">
                  <li>• Day 1 is the first day of full menstrual flow</li>
                  <li>• Normal cycles range from 21-35 days</li>
                  <li>
                    • Track for at least 3 cycles for accurate predictions
                  </li>
                  <li>• Note any unusual symptoms or changes</li>
                </ul>
              </div>

              <button
                onClick={calculatePeriodCycle}
                disabled={!lastPeriod || !cycleLength || !periodLength}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-red-700 hover:to-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                Calculate Period Cycle
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result && (
              <>
                {/* Cycle Analysis */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-rose-300" />
                    Cycle Analysis
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-red-500/20 rounded-xl backdrop-blur-sm">
                      <div className="text-2xl font-bold text-red-200 mb-1">
                        {result.cycleAnalysis.averageLength}
                      </div>
                      <div className="text-sm text-red-100 font-medium">
                        Days Average
                      </div>
                    </div>
                    <div className="text-center p-4 bg-rose-500/20 rounded-xl backdrop-blur-sm">
                      <div className="text-lg font-bold text-rose-200 mb-1">
                        {result.cycleAnalysis.cycleType}
                      </div>
                      <div className="text-sm text-rose-100 font-medium">
                        {result.cycleAnalysis.isRegular
                          ? "Regular"
                          : "Irregular"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Periods */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-rose-300" />
                    Upcoming Periods
                  </h3>
                  <div className="space-y-3">
                    {result.nextPeriods.slice(0, 3).map((period, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-red-500/20 to-rose-500/20 rounded-xl backdrop-blur-sm"
                      >
                        <div>
                          <div className="font-semibold text-white">
                            Period #{index + 1}
                          </div>
                          <div className="text-sm text-rose-200">
                            {period.date}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-red-200 font-medium">
                            Week {period.week}
                          </div>
                          <div className="text-xs text-rose-300">
                            from last period
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cycle Calendar */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-rose-300" />
                    Cycle Calendar
                  </h3>
                  <div className="space-y-2">
                    {result.calendar.map((event, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg border ${getTypeColor(
                          event.type
                        )}`}
                      >
                        <div className="flex items-center">
                          <span className="text-lg mr-3">
                            {getTypeIcon(event.type)}
                          </span>
                          <div>
                            <div className="font-medium">{event.date}</div>
                            <div className="text-sm opacity-80">
                              {event.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Health Tips */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-rose-300" />
                    Health & Wellness Tips
                  </h3>
                  <ul className="space-y-3">
                    {result.healthTips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-rose-100">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Cycle Information */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">
                Menstrual Cycle Guide
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-red-400 pl-4">
                  <div className="font-semibold text-red-200">
                    Menstrual Phase (Days 1-5)
                  </div>
                  <div className="text-sm text-rose-100">
                    Shedding of the uterine lining
                  </div>
                </div>
                <div className="border-l-4 border-pink-400 pl-4">
                  <div className="font-semibold text-pink-200">
                    Follicular Phase (Days 1-13)
                  </div>
                  <div className="text-sm text-rose-100">
                    Egg development and estrogen rise
                  </div>
                </div>
                <div className="border-l-4 border-purple-400 pl-4">
                  <div className="font-semibold text-purple-200">
                    Ovulation (Day 14)
                  </div>
                  <div className="text-sm text-rose-100">
                    Egg release and peak fertility
                  </div>
                </div>
                <div className="border-l-4 border-blue-400 pl-4">
                  <div className="font-semibold text-blue-200">
                    Luteal Phase (Days 15-28)
                  </div>
                  <div className="text-sm text-rose-100">
                    Progesterone rise and PMS symptoms
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-12 bg-amber-50/80 backdrop-blur-sm border border-amber-200 rounded-2xl p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Info className="w-6 h-6 text-amber-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">
                Medical Disclaimer
              </h3>
              <p className="text-amber-700">
                This calculator provides cycle predictions based on your input
                data. Actual periods may vary due to stress, illness, hormonal
                changes, or other factors. Irregular cycles, severe pain, or
                unusual symptoms should be discussed with a healthcare provider.
                This tool is not a substitute for professional medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
