"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Flower, ArrowLeft, Info, Calendar, Heart } from "lucide-react";
import InputField from "@/components/InputField";

export default function OvulationCalculatorPage() {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [periodLength, setPeriodLength] = useState("5");
  const [result, setResult] = useState<{
    ovulationDate: string;
    fertileWindow: { start: string; end: string };
    nextPeriod: string;
    cyclePhases: { phase: string; dates: string; description: string }[];
    tips: string[];
  } | null>(null);

  const calculateOvulation = () => {
    if (!lastPeriod || !cycleLength) return;

    const lastPeriodDate = new Date(lastPeriod);
    const cycle = parseInt(cycleLength);
    const period = parseInt(periodLength);

    // Calculate ovulation (typically 14 days before next period)
    const ovulationDate = new Date(lastPeriodDate);
    ovulationDate.setDate(ovulationDate.getDate() + cycle - 14);

    // Fertile window (5 days before ovulation + ovulation day)
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5);
    const fertileEnd = new Date(ovulationDate);

    // Next period
    const nextPeriod = new Date(lastPeriodDate);
    nextPeriod.setDate(nextPeriod.getDate() + cycle);

    // Cycle phases
    const phases = [
      {
        phase: "Menstrual Phase",
        dates: `${formatDate(lastPeriodDate)} - ${formatDate(
          new Date(
            lastPeriodDate.getTime() + (period - 1) * 24 * 60 * 60 * 1000
          )
        )}`,
        description: "Menstruation occurs, hormone levels are low",
      },
      {
        phase: "Follicular Phase",
        dates: `${formatDate(
          new Date(lastPeriodDate.getTime() + period * 24 * 60 * 60 * 1000)
        )} - ${formatDate(
          new Date(ovulationDate.getTime() - 24 * 60 * 60 * 1000)
        )}`,
        description: "Estrogen rises, preparing for ovulation",
      },
      {
        phase: "Ovulation",
        dates: formatDate(ovulationDate),
        description: "Egg is released, peak fertility window",
      },
      {
        phase: "Luteal Phase",
        dates: `${formatDate(
          new Date(ovulationDate.getTime() + 24 * 60 * 60 * 1000)
        )} - ${formatDate(
          new Date(nextPeriod.getTime() - 24 * 60 * 60 * 1000)
        )}`,
        description: "Progesterone rises, preparing for potential pregnancy",
      },
    ];

    // Personalized tips based on cycle
    const tips = [
      "Track your basal body temperature for more accurate ovulation prediction",
      "Monitor cervical mucus changes - it becomes clear and stretchy during fertile days",
      "Use ovulation predictor kits for additional confirmation",
      "Maintain a healthy diet rich in folate and vitamins",
    ];

    if (cycle < 26) {
      tips.push(
        "Your cycle is shorter than average - ovulation may occur earlier"
      );
    } else if (cycle > 32) {
      tips.push(
        "Your cycle is longer than average - consider tracking with additional methods"
      );
    }

    setResult({
      ovulationDate: formatDate(ovulationDate),
      fertileWindow: {
        start: formatDate(fertileStart),
        end: formatDate(fertileEnd),
      },
      nextPeriod: formatDate(nextPeriod),
      cyclePhases: phases,
      tips,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-rose-900">
      {/* Fertility & Bloom Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-600/20 via-rose-800/10 to-slate-900/20"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-pink-500/15 via-purple-600/10 to-transparent"></div>

      {/* Blooming Flower Elements */}
      <div className="fixed top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/15 to-rose-600/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-3/4 right-1/3 w-72 h-72 bg-gradient-to-br from-rose-600/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>

      {/* Delicate Petal Effects */}
      <div className="fixed top-1/5 left-1/2 w-6 h-6 bg-rose-400/25 rounded-full animate-pulse delay-500"></div>
      <div className="fixed top-1/2 right-1/5 w-8 h-8 bg-purple-400/25 rounded-full animate-pulse delay-1500"></div>
      <div className="fixed bottom-1/3 left-1/3 w-5 h-5 bg-pink-400/25 rounded-full animate-pulse delay-2500"></div>

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
          <span className="text-white">Ovulation Calculator</span>
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 via-rose-500 to-pink-500 rounded-3xl mb-6 shadow-2xl shadow-purple-500/40 ring-2 ring-purple-200/20">
            <Flower className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-200 via-rose-200 to-pink-200 bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-lg">
            🌸 Ovulation Calculator
          </h1>
          <p className="text-xl text-purple-100/90 max-w-3xl mx-auto leading-relaxed font-medium">
            Calculate your ovulation date, fertile window, and track your
            beautiful menstrual cycle phases with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Premium Calculator Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-200 via-rose-200 to-pink-200 bg-clip-text text-transparent mb-8 tracking-tight">
              🌺 Cycle Information
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  First Day of Last Period
                </label>
                <input
                  type="date"
                  value={lastPeriod}
                  onChange={(e) => setLastPeriod(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-white/50"
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

              <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
                <h4 className="font-medium text-rose-800 mb-2">
                  Tracking Tips:
                </h4>
                <ul className="text-sm text-rose-700 space-y-1">
                  <li>
                    • Count from the first day of your period to the first day
                    of your next period
                  </li>
                  <li>
                    • Average cycle length is 28 days but can range from 21-35
                    days
                  </li>
                  <li>• Track for 3+ cycles for more accurate predictions</li>
                  <li>
                    • Consider using additional fertility signs for better
                    accuracy
                  </li>
                </ul>
              </div>

              <button
                onClick={calculateOvulation}
                disabled={!lastPeriod || !cycleLength || !periodLength}
                className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-rose-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                Calculate Ovulation
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result && (
              <>
                {/* Ovulation Date */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                      {result.ovulationDate}
                    </div>
                    <div className="text-lg font-semibold text-gray-700 mb-2">
                      Predicted Ovulation Date
                    </div>
                    <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-rose-100 text-rose-800">
                      Peak Fertility Day
                    </div>
                  </div>
                </div>

                {/* Fertile Window */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Fertile Window
                  </h3>
                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        {result.fertileWindow.start} -{" "}
                        {result.fertileWindow.end}
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        6-day fertility window
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-white/80 rounded-lg p-3">
                          <div className="font-semibold text-rose-600">
                            Best Chances
                          </div>
                          <div className="text-gray-600">
                            2 days before ovulation
                          </div>
                        </div>
                        <div className="bg-white/80 rounded-lg p-3">
                          <div className="font-semibold text-pink-600">
                            High Chances
                          </div>
                          <div className="text-gray-600">Ovulation day</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Period */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Next Period Expected
                  </h3>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-xl font-bold text-purple-600 mb-1">
                      {result.nextPeriod}
                    </div>
                    <div className="text-sm text-purple-700">
                      Mark your calendar
                    </div>
                  </div>
                </div>

                {/* Cycle Phases */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Menstrual Cycle Phases
                  </h3>
                  <div className="space-y-4">
                    {result.cyclePhases.map((phase, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-rose-300 pl-4 py-2"
                      >
                        <div className="font-semibold text-gray-900">
                          {phase.phase}
                        </div>
                        <div className="text-sm text-rose-600 font-medium">
                          {phase.dates}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {phase.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fertility Tips */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Info className="w-5 h-5 mr-2" />
                    Fertility Tracking Tips
                  </h3>
                  <ul className="space-y-3">
                    {result.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Fertility Signs */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Signs of Ovulation
              </h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-rose-50 rounded-lg">
                  <div className="w-3 h-3 bg-rose-500 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium text-rose-800">
                      Cervical Mucus Changes
                    </div>
                    <div className="text-sm text-rose-600">
                      Clear, stretchy, egg-white consistency
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-pink-50 rounded-lg">
                  <div className="w-3 h-3 bg-pink-500 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium text-pink-800">
                      Basal Body Temperature
                    </div>
                    <div className="text-sm text-pink-600">
                      Slight temperature rise after ovulation
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium text-purple-800">LH Surge</div>
                    <div className="text-sm text-purple-600">
                      Detected by ovulation predictor kits
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium text-blue-800">
                      Ovulation Pain
                    </div>
                    <div className="text-sm text-blue-600">
                      Mild cramping on one side (mittelschmerz)
                    </div>
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
                This calculator provides estimated ovulation dates based on
                average cycle data. Actual ovulation can vary due to stress,
                illness, hormonal changes, and other factors. For family
                planning or fertility concerns, consult with a healthcare
                provider and consider using multiple tracking methods for better
                accuracy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
