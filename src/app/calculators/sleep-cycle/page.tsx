"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Moon, ArrowLeft, Info, Clock, Sun, Sunrise } from "lucide-react";
import SelectField from "@/components/SelectField";
import SleepTimePicker from "@/components/SleepTimePicker";

export default function SleepCycleCalculatorPage() {
  const [calculationType, setCalculationType] = useState("bedtime");
  const [wakeTime, setWakeTime] = useState("");
  const [bedtime, setBedtime] = useState("");
  const [result, setResult] = useState<{
    optimalBedtimes?: string[];
    optimalWakeTimes?: string[];
    cycles: number;
    recommendations: string[];
  } | null>(null);

  const calculateSleepCycle = () => {
    const cycleLength = 90; // minutes per sleep cycle
    const fallAsleepTime = 15; // average time to fall asleep

    if (calculationType === "bedtime" && wakeTime) {
      // Calculate optimal bedtimes
      const [hours, minutes] = wakeTime.split(":").map(Number);
      const wakeTimeMinutes = hours * 60 + minutes;

      const optimalBedtimes = [];

      // Calculate for 4, 5, and 6 sleep cycles (6, 7.5, and 9 hours)
      for (let cycles = 4; cycles <= 6; cycles++) {
        const sleepTimeMinutes = cycles * cycleLength;
        const bedtimeMinutes =
          (wakeTimeMinutes - sleepTimeMinutes - fallAsleepTime + 24 * 60) %
          (24 * 60);

        const bedtimeHours = Math.floor(bedtimeMinutes / 60);
        const bedtimeMinutesRemainder = bedtimeMinutes % 60;

        const bedtimeFormatted = `${bedtimeHours
          .toString()
          .padStart(2, "0")}:${bedtimeMinutesRemainder
          .toString()
          .padStart(2, "0")}`;
        const totalSleepHours = cycles * 1.5;

        optimalBedtimes.push(
          `${bedtimeFormatted} (${cycles} cycles, ${totalSleepHours}h)`
        );
      }

      setResult({
        optimalBedtimes,
        cycles: 5,
        recommendations: [
          "Avoid screens 1 hour before bedtime for better sleep quality",
          "Keep your bedroom cool (60-67°F) and dark",
          "Maintain a consistent sleep schedule, even on weekends",
          "Avoid caffeine 6 hours before bedtime",
          "Create a relaxing bedtime routine",
        ],
      });
    } else if (calculationType === "waketime" && bedtime) {
      // Calculate optimal wake times
      const [hours, minutes] = bedtime.split(":").map(Number);
      const bedtimeMinutes = hours * 60 + minutes;

      const optimalWakeTimes = [];

      // Calculate for 4, 5, and 6 sleep cycles
      for (let cycles = 4; cycles <= 6; cycles++) {
        const sleepTimeMinutes = cycles * cycleLength;
        const wakeTimeMinutes =
          (bedtimeMinutes + fallAsleepTime + sleepTimeMinutes) % (24 * 60);

        const wakeTimeHours = Math.floor(wakeTimeMinutes / 60);
        const wakeTimeMinutesRemainder = wakeTimeMinutes % 60;

        const wakeTimeFormatted = `${wakeTimeHours
          .toString()
          .padStart(2, "0")}:${wakeTimeMinutesRemainder
          .toString()
          .padStart(2, "0")}`;
        const totalSleepHours = cycles * 1.5;

        optimalWakeTimes.push(
          `${wakeTimeFormatted} (${cycles} cycles, ${totalSleepHours}h)`
        );
      }

      setResult({
        optimalWakeTimes,
        cycles: 5,
        recommendations: [
          "Wake up at the end of a sleep cycle to feel more refreshed",
          "Use natural light exposure immediately after waking",
          "Avoid hitting the snooze button - it disrupts sleep cycles",
          "Stay hydrated but avoid large amounts of water before bed",
          "Regular exercise improves sleep quality (but not close to bedtime)",
        ],
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900 relative">
      {/* Night Sky Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900"></div>

      {/* Stars */}
      <div className="fixed inset-0">
        {/* Large Stars */}
        <div className="absolute top-[20%] left-[10%] w-1 h-1 bg-white rounded-full animate-pulse shadow-white shadow-sm"></div>
        <div className="absolute top-[30%] right-[15%] w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-1000 shadow-blue-200 shadow-sm"></div>
        <div className="absolute top-[60%] left-[20%] w-1 h-1 bg-purple-200 rounded-full animate-pulse delay-2000 shadow-purple-200 shadow-sm"></div>
        <div className="absolute top-[40%] right-[30%] w-1 h-1 bg-white rounded-full animate-pulse delay-500 shadow-white shadow-sm"></div>
        <div className="absolute top-[70%] right-[10%] w-1 h-1 bg-blue-100 rounded-full animate-pulse delay-1500 shadow-blue-100 shadow-sm"></div>
        <div className="absolute top-[15%] left-[60%] w-1 h-1 bg-white rounded-full animate-pulse delay-700 shadow-white shadow-sm"></div>
        <div className="absolute top-[80%] left-[40%] w-1 h-1 bg-purple-100 rounded-full animate-pulse delay-300 shadow-purple-100 shadow-sm"></div>

        {/* Medium Stars */}
        <div className="absolute top-[25%] left-[50%] w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-200"></div>
        <div className="absolute top-[45%] left-[70%] w-0.5 h-0.5 bg-blue-200 rounded-full animate-pulse delay-800"></div>
        <div className="absolute top-[65%] right-[40%] w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-400"></div>
        <div className="absolute top-[35%] left-[30%] w-0.5 h-0.5 bg-purple-200 rounded-full animate-pulse delay-1200"></div>
        <div className="absolute top-[55%] right-[60%] w-0.5 h-0.5 bg-blue-100 rounded-full animate-pulse delay-600"></div>

        {/* Small Stars */}
        <div className="absolute top-[10%] right-[25%] w-0.5 h-0.5 bg-white/70 rounded-full animate-pulse delay-900"></div>
        <div className="absolute top-[50%] left-[15%] w-0.5 h-0.5 bg-blue-200/70 rounded-full animate-pulse delay-1100"></div>
        <div className="absolute top-[75%] right-[50%] w-0.5 h-0.5 bg-white/70 rounded-full animate-pulse delay-100"></div>
        <div className="absolute top-[20%] left-[80%] w-0.5 h-0.5 bg-purple-200/70 rounded-full animate-pulse delay-1300"></div>
      </div>

      {/* Shooting Stars */}
      <div className="fixed inset-0">
        <div className="absolute top-[20%] left-[-10%] w-32 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45 animate-pulse opacity-60"></div>
        <div className="absolute top-[60%] right-[-10%] w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent transform rotate-[135deg] animate-pulse delay-2000 opacity-50"></div>
      </div>

      {/* Galaxy/Nebula Effects */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-3/4 right-1/3 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Premium Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-white/70 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/sleep-time"
            className="hover:text-white transition-colors"
          >
            Sleep & Time
          </Link>
          <span>/</span>
          <span className="text-white">Sleep Cycle Calculator</span>
        </div>

        {/* Premium Back Button */}
        <Link
          href="/sleep-time"
          className="inline-flex items-center px-6 py-3 text-sm font-medium text-white/80 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:text-white transition-all duration-300 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Sleep & Time
        </Link>

        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl mb-6 shadow-2xl shadow-indigo-500/30 ring-2 ring-white/10">
            <Moon className="w-10 h-10 text-white drop-shadow-sm" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Sleep Cycle Calculator
          </h1>
          <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Calculate optimal bedtime or wake time based on 90-minute sleep
            cycles to wake up feeling refreshed and energized at the end of your
            natural sleep rhythm.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Premium Calculator Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-indigo-200 mb-6 tracking-tight">
              Calculate Sleep Times
            </h2>

            <div className="space-y-6">
              <SelectField
                label="What do you want to calculate?"
                value={calculationType}
                onChange={setCalculationType}
                options={[
                  {
                    value: "bedtime",
                    label: "Optimal Bedtime (I know when I need to wake up)",
                  },
                  {
                    value: "waketime",
                    label:
                      "Optimal Wake Time (I know when I want to go to bed)",
                  },
                ]}
                darkTheme={true}
              />

              {calculationType === "bedtime" ? (
                <SleepTimePicker
                  label="Wake Up Time"
                  value={wakeTime}
                  onChange={setWakeTime}
                  type="waketime"
                  darkTheme={true}
                  helpText="Select the time you need to wake up"
                />
              ) : (
                <SleepTimePicker
                  label="Bedtime"
                  value={bedtime}
                  onChange={setBedtime}
                  type="bedtime"
                  darkTheme={true}
                  helpText="Select the time you want to go to bed"
                />
              )}

              <button
                onClick={calculateSleepCycle}
                disabled={calculationType === "bedtime" ? !wakeTime : !bedtime}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                Calculate Sleep Times
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result && (
              <>
                {/* Sleep Times Result */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                      {calculationType === "bedtime" ? (
                        <Moon className="w-8 h-8 mr-2" />
                      ) : (
                        <Sunrise className="w-8 h-8 mr-2" />
                      )}
                      <h3 className="text-xl font-semibold">
                        {calculationType === "bedtime"
                          ? "Optimal Bedtimes"
                          : "Optimal Wake Times"}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {(result.optimalBedtimes || result.optimalWakeTimes)?.map(
                        (time, index) => (
                          <div
                            key={index}
                            className="bg-white/20 backdrop-blur-sm rounded-lg p-3"
                          >
                            <span className="text-lg font-semibold">
                              {time}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Sleep Cycle Info */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Sleep Cycle Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-indigo-50 rounded-xl">
                      <div className="text-2xl font-bold text-indigo-600 mb-1">
                        90
                      </div>
                      <div className="text-sm text-indigo-700 font-medium">
                        Minutes per Cycle
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        5
                      </div>
                      <div className="text-sm text-purple-700 font-medium">
                        Cycles per Night
                      </div>
                      <div className="text-xs text-purple-600">
                        (Recommended)
                      </div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        15
                      </div>
                      <div className="text-sm text-blue-700 font-medium">
                        Minutes to Fall Asleep
                      </div>
                      <div className="text-xs text-blue-600">(Average)</div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Sun className="w-5 h-5 mr-2" />
                    Sleep Quality Tips
                  </h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Sleep Stages Info */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Sleep Stages in Each Cycle
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">
                    Stage 1 (5 min):
                  </span>
                  <span className="text-gray-600 ml-2">
                    Light sleep, easy to wake
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">
                    Stage 2 (45 min):
                  </span>
                  <span className="text-gray-600 ml-2">
                    Deeper sleep, body temperature drops
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">
                    Stage 3 (20 min):
                  </span>
                  <span className="text-gray-600 ml-2">
                    Deep sleep, physical restoration
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">
                    REM (20 min):
                  </span>
                  <span className="text-gray-600 ml-2">
                    Dream sleep, mental restoration
                  </span>
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
                Sleep Disclaimer
              </h3>
              <p className="text-amber-700">
                Sleep cycle calculations are based on average sleep patterns and
                may not work for everyone. Individual sleep needs vary based on
                age, lifestyle, and health conditions. If you have persistent
                sleep issues, consult a healthcare professional or sleep
                specialist.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
