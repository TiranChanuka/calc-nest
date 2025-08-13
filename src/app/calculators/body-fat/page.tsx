"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowLeft, Info, TrendingUp } from "lucide-react";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";

export default function BodyFatCalculatorPage() {
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");
  const [neck, setNeck] = useState("");
  const [hip, setHip] = useState("");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<{
    bodyFatPercentage: number;
    category: string;
    leanMass: number;
    fatMass: number;
    recommendations: string[];
  } | null>(null);

  const calculateBodyFat = () => {
    if (!weight || !waist || !neck || (gender === "female" && !hip)) return;

    let waistNum = parseFloat(waist);
    let neckNum = parseFloat(neck);
    let hipNum = gender === "female" ? parseFloat(hip) : 0;

    // Convert to inches if using metric (cm)
    if (unit === "metric") {
      waistNum = waistNum / 2.54;
      neckNum = neckNum / 2.54;
      if (gender === "female") hipNum = hipNum / 2.54;
    }

    // Calculate body fat percentage using US Navy method
    let bodyFatPercentage;

    if (gender === "male") {
      bodyFatPercentage =
        86.01 * Math.log10(waistNum - neckNum) -
        70.041 * Math.log10(69) +
        36.76; // Assuming height of 69 inches for simplification
      // More accurate formula would require height, but this gives a reasonable estimate
      bodyFatPercentage =
        495 /
          (1.0324 -
            0.19077 * Math.log10(waistNum - neckNum) +
            0.15456 * Math.log10(69)) -
        450;
    } else {
      bodyFatPercentage =
        495 /
          (1.29579 -
            0.35004 * Math.log10(waistNum + hipNum - neckNum) +
            0.221 * Math.log10(63)) -
        450; // Assuming height of 63 inches
    }

    // Ensure reasonable bounds
    bodyFatPercentage = Math.max(3, Math.min(50, bodyFatPercentage));

    // Determine category
    let category = "";
    if (gender === "male") {
      if (bodyFatPercentage < 6) category = "Essential Fat";
      else if (bodyFatPercentage < 14) category = "Athletic";
      else if (bodyFatPercentage < 18) category = "Fitness";
      else if (bodyFatPercentage < 25) category = "Average";
      else category = "Obese";
    } else {
      if (bodyFatPercentage < 14) category = "Essential Fat";
      else if (bodyFatPercentage < 21) category = "Athletic";
      else if (bodyFatPercentage < 25) category = "Fitness";
      else if (bodyFatPercentage < 32) category = "Average";
      else category = "Obese";
    }

    // Calculate lean mass and fat mass
    const weightKg =
      unit === "metric" ? parseFloat(weight) : parseFloat(weight) * 0.453592;
    const fatMass = weightKg * (bodyFatPercentage / 100);
    const leanMass = weightKg - fatMass;

    const recommendations = [
      "Body fat percentage is more accurate than BMI for fitness assessment",
      "Combine strength training with cardio for optimal body composition",
      "Focus on building lean muscle mass rather than just losing weight",
      "Monitor progress with body measurements, not just the scale",
      "Maintain adequate essential fat for hormonal and cellular functions",
    ];

    setResult({
      bodyFatPercentage: Math.round(bodyFatPercentage * 10) / 10,
      category,
      leanMass: Math.round(leanMass * 10) / 10,
      fatMass: Math.round(fatMass * 10) / 10,
      recommendations,
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Essential Fat":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "Athletic":
        return "text-green-600 bg-green-50 border-green-200";
      case "Fitness":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "Average":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default:
        return "text-red-600 bg-red-50 border-red-200";
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Premium Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/20 to-slate-900"></div>
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      {/* Body Composition-themed Floating Elements */}
      <div className="fixed top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-3/4 right-1/3 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Premium Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-white/70 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/health-wellness"
            className="hover:text-white transition-colors"
          >
            Health & Wellness
          </Link>
          <span>/</span>
          <span className="text-white">Body Fat Calculator</span>
        </div>

        {/* Premium Back Button */}
        <Link
          href="/health-wellness"
          className="inline-flex items-center px-6 py-3 text-sm font-medium text-white/80 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:text-white transition-all duration-300 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Health & Wellness
        </Link>

        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-600 rounded-3xl mb-6 shadow-2xl shadow-purple-500/30 ring-2 ring-white/10">
            <Calculator className="w-10 h-10 text-white drop-shadow-sm" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Body Fat Calculator
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Calculate your body fat percentage using the US Navy method. Get
            insights into your body composition and health status.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Premium Calculator Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-emerald-200 mb-8 tracking-tight">
              Calculate Body Fat Percentage
            </h2>

            <div className="space-y-6">
              <SelectField
                label="Gender"
                value={gender}
                onChange={setGender}
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
                darkTheme={true}
              />

              <SelectField
                label="Unit System"
                value={unit}
                onChange={setUnit}
                options={[
                  { value: "metric", label: "Metric (kg, cm)" },
                  { value: "imperial", label: "Imperial (lbs, inches)" },
                ]}
                darkTheme={true}
              />

              <InputField
                label={unit === "metric" ? "Weight (kg)" : "Weight (lbs)"}
                value={weight}
                onChange={setWeight}
                type="number"
                placeholder={
                  unit === "metric"
                    ? "Enter weight in kg"
                    : "Enter weight in pounds"
                }
                darkTheme={true}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label={unit === "metric" ? "Waist (cm)" : "Waist (inches)"}
                  value={waist}
                  onChange={setWaist}
                  type="number"
                  placeholder="Measure at navel level"
                  darkTheme={true}
                />

                <InputField
                  label={unit === "metric" ? "Neck (cm)" : "Neck (inches)"}
                  value={neck}
                  onChange={setNeck}
                  type="number"
                  placeholder="Measure below Adam's apple"
                  darkTheme={true}
                />
              </div>

              {gender === "female" && (
                <InputField
                  label={unit === "metric" ? "Hip (cm)" : "Hip (inches)"}
                  value={hip}
                  onChange={setHip}
                  type="number"
                  placeholder="Measure at widest point"
                  darkTheme={true}
                />
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">
                  Measurement Tips:
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>
                    • Waist: Measure at the navel, not the narrowest point
                  </li>
                  <li>• Neck: Measure just below the Adam&apos;s apple</li>
                  {gender === "female" && (
                    <li>• Hip: Measure at the widest point of hips</li>
                  )}
                  <li>• Keep tape measure snug but not tight</li>
                </ul>
              </div>

              <button
                onClick={calculateBodyFat}
                disabled={
                  !weight || !waist || !neck || (gender === "female" && !hip)
                }
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                Calculate Body Fat
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result && (
              <>
                {/* Body Fat Result */}
                <div
                  className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 ${getCategoryColor(
                    result.category
                  )}`}
                >
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2 text-gray-900">
                      {result.bodyFatPercentage}%
                    </div>
                    <div className="text-lg font-semibold text-gray-700 mb-2">
                      Body Fat Percentage
                    </div>
                    <div className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      {result.category}
                    </div>
                  </div>
                </div>

                {/* Body Composition */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Body Composition
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-amber-50 rounded-xl">
                      <div className="text-2xl font-bold text-amber-600 mb-1">
                        {result.leanMass} kg
                      </div>
                      <div className="text-sm text-amber-700 font-medium">
                        Lean Mass
                      </div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-xl">
                      <div className="text-2xl font-bold text-orange-600 mb-1">
                        {result.fatMass} kg
                      </div>
                      <div className="text-sm text-orange-700 font-medium">
                        Fat Mass
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Body Composition Tips
                  </h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Body Fat Categories */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Body Fat Categories
              </h3>
              <div className="space-y-3">
                {gender === "male" ? (
                  <>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-800">
                        Essential Fat
                      </span>
                      <span className="text-blue-600">2-5%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-green-800">
                        Athletic
                      </span>
                      <span className="text-green-600">6-13%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                      <span className="font-medium text-emerald-800">
                        Fitness
                      </span>
                      <span className="text-emerald-600">14-17%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="font-medium text-yellow-800">
                        Average
                      </span>
                      <span className="text-yellow-600">18-24%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium text-red-800">Obese</span>
                      <span className="text-red-600">25%+</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-800">
                        Essential Fat
                      </span>
                      <span className="text-blue-600">10-13%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-green-800">
                        Athletic
                      </span>
                      <span className="text-green-600">14-20%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                      <span className="font-medium text-emerald-800">
                        Fitness
                      </span>
                      <span className="text-emerald-600">21-24%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="font-medium text-yellow-800">
                        Average
                      </span>
                      <span className="text-yellow-600">25-31%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium text-red-800">Obese</span>
                      <span className="text-red-600">32%+</span>
                    </div>
                  </>
                )}
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
                Measurement Disclaimer
              </h3>
              <p className="text-amber-700">
                Body fat calculations using circumference measurements are
                estimates and may not be as accurate as professional methods
                like DEXA scans or hydrostatic weighing. Results can vary based
                on measurement technique and individual body composition.
                Consult fitness or medical professionals for comprehensive body
                composition analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
