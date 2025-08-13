"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Target,
  ArrowLeft,
  Info,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import InputField from "@/components/InputField";

export default function WaistHipRatioCalculatorPage() {
  const [waistCircumference, setWaistCircumference] = useState("");
  const [hipCircumference, setHipCircumference] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [unit, setUnit] = useState("cm");
  const [result, setResult] = useState<{
    whr: number;
    riskLevel: string;
    bodyShape: string;
    healthRisks: string[];
    recommendations: string[];
    idealRange: { min: number; max: number };
  } | null>(null);

  const calculateWHR = () => {
    const waist = parseFloat(waistCircumference);
    const hip = parseFloat(hipCircumference);

    if (!waist || !hip || !gender) return;

    const whr = waist / hip;

    // Determine risk level based on gender and WHR
    let riskLevel = "";
    const healthRisks: string[] = [];

    if (gender === "male") {
      if (whr < 0.85) {
        riskLevel = "Low Risk";
      } else if (whr < 0.9) {
        riskLevel = "Moderate Risk";
        healthRisks.push("Slightly increased risk of cardiovascular disease");
      } else if (whr < 1.0) {
        riskLevel = "High Risk";
        healthRisks.push("Increased risk of cardiovascular disease");
        healthRisks.push("Higher risk of type 2 diabetes");
      } else {
        riskLevel = "Very High Risk";
        healthRisks.push("Significantly increased cardiovascular risk");
        healthRisks.push("High risk of metabolic syndrome");
        healthRisks.push("Increased risk of type 2 diabetes");
      }
    } else {
      if (whr < 0.8) {
        riskLevel = "Low Risk";
      } else if (whr < 0.85) {
        riskLevel = "Moderate Risk";
        healthRisks.push("Slightly increased risk of cardiovascular disease");
      } else if (whr < 0.9) {
        riskLevel = "High Risk";
        healthRisks.push("Increased risk of cardiovascular disease");
        healthRisks.push("Higher risk of type 2 diabetes");
      } else {
        riskLevel = "Very High Risk";
        healthRisks.push("Significantly increased cardiovascular risk");
        healthRisks.push("High risk of metabolic syndrome");
        healthRisks.push("Increased risk of type 2 diabetes");
      }
    }

    // Determine body shape
    let bodyShape = "";
    if (gender === "female") {
      if (whr < 0.8) {
        bodyShape = "Pear Shape (Gynoid)";
      } else {
        bodyShape = "Apple Shape (Android)";
      }
    } else {
      if (whr < 0.9) {
        bodyShape = "Lower Fat Distribution";
      } else {
        bodyShape = "Central Fat Distribution";
      }
    }

    // Generate recommendations
    const recommendations = [];

    if (riskLevel !== "Low Risk") {
      recommendations.push(
        "Focus on reducing abdominal fat through diet and exercise"
      );
      recommendations.push(
        "Incorporate cardiovascular exercise 150+ minutes per week"
      );
      recommendations.push(
        "Add strength training exercises 2-3 times per week"
      );
      recommendations.push("Reduce refined sugars and processed foods");
    }

    recommendations.push(
      "Maintain a balanced diet rich in fruits and vegetables"
    );
    recommendations.push("Monitor your waist circumference regularly");

    if (riskLevel === "High Risk" || riskLevel === "Very High Risk") {
      recommendations.push(
        "Consult with a healthcare provider for comprehensive assessment"
      );
      recommendations.push("Consider working with a registered dietitian");
    }

    recommendations.push("Practice stress management techniques");
    recommendations.push("Ensure adequate sleep (7-9 hours per night)");

    // Ideal range based on gender
    const idealRange =
      gender === "male" ? { min: 0.7, max: 0.85 } : { min: 0.65, max: 0.8 };

    setResult({
      whr: Math.round(whr * 100) / 100,
      riskLevel,
      bodyShape,
      healthRisks,
      recommendations,
      idealRange,
    });
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low Risk":
        return "text-green-600 bg-green-50 border-green-200";
      case "Moderate Risk":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "High Risk":
        return "text-orange-600 bg-orange-50 border-orange-200";
      default:
        return "text-red-600 bg-red-50 border-red-200";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "Low Risk":
        return <CheckCircle className="w-8 h-8 text-green-600" />;
      default:
        return <AlertTriangle className="w-8 h-8 text-orange-600" />;
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
        }
      `}</style>
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(147,51,234,0.15),_transparent_50%)] animate-pulse"></div>
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(99,102,241,0.15),_transparent_50%)] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,_rgba(168,85,247,0.1),_transparent_50%)] animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Floating Measurement Icons */}
        <div
          className="absolute top-20 left-10 w-4 h-4 bg-purple-400 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-3 h-3 bg-indigo-400 rounded-full opacity-30 animate-bounce"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-5 h-5 bg-violet-400 rounded-full opacity-25 animate-bounce"
          style={{ animationDelay: "2.5s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-2 h-2 bg-purple-300 rounded-full opacity-40 animate-bounce"
          style={{ animationDelay: "3s" }}
        ></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-purple-200 mb-6">
            <Link href="/" className="hover:text-purple-100 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/health-risk"
              className="hover:text-purple-100 transition-colors"
            >
              Health Risk
            </Link>
            <span>/</span>
            <span className="text-white font-medium">
              Waist-to-Hip Ratio Calculator
            </span>
          </div>

          {/* Back Button */}
          <Link
            href="/health-risk"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-purple-100 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Health Risk
          </Link>

          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl mb-4 shadow-lg shadow-purple-500/30 animate-pulse hover:scale-110 transition-transform duration-300">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Waist-to-Hip Ratio Calculator
            </h1>
            <p
              className="text-lg text-purple-100 max-w-3xl mx-auto drop-shadow-md animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              Assess your body fat distribution and health risks using the
              waist-to-hip ratio measurement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-left">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <Target className="w-6 h-6 mr-2 text-purple-300 animate-pulse" />
                Body Measurements
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-4 py-3 border border-white/20 bg-white/5 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-purple-200 transition-all duration-200 hover:bg-white/10"
                    >
                      <option value="" className="text-gray-800 bg-white">
                        Select gender
                      </option>
                      <option value="male" className="text-gray-800 bg-white">
                        Male
                      </option>
                      <option value="female" className="text-gray-800 bg-white">
                        Female
                      </option>
                    </select>
                  </div>

                  <InputField
                    label="Age (years)"
                    value={age}
                    onChange={setAge}
                    type="number"
                    placeholder="Enter age"
                    darkTheme={true}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Measurement Unit
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-4 py-3 border border-white/20 bg-white/5 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-purple-200 transition-all duration-200 hover:bg-white/10"
                  >
                    <option value="cm" className="text-gray-800 bg-white">
                      Centimeters (cm)
                    </option>
                    <option value="inches" className="text-gray-800 bg-white">
                      Inches (in)
                    </option>
                  </select>
                </div>

                <InputField
                  label={`Waist Circumference (${unit})`}
                  value={waistCircumference}
                  onChange={setWaistCircumference}
                  type="number"
                  placeholder={`Enter waist measurement in ${unit}`}
                  darkTheme={true}
                />

                <InputField
                  label={`Hip Circumference (${unit})`}
                  value={hipCircumference}
                  onChange={setHipCircumference}
                  type="number"
                  placeholder={`Enter hip measurement in ${unit}`}
                  darkTheme={true}
                />

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-medium text-purple-800 mb-2">
                    How to Measure:
                  </h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>
                      • <strong>Waist:</strong> Measure at the narrowest point,
                      usually just above the belly button
                    </li>
                    <li>
                      • <strong>Hips:</strong> Measure at the widest point of
                      your hips and buttocks
                    </li>
                    <li>• Use a flexible measuring tape and keep it level</li>
                    <li>
                      • Measure after exhaling normally, don&apos;t pull the
                      tape too tight
                    </li>
                  </ul>
                </div>

                <button
                  onClick={calculateWHR}
                  disabled={!waistCircumference || !hipCircumference || !gender}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                >
                  Calculate Waist-to-Hip Ratio
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {result && (
                <>
                  {/* WHR Result */}
                  <div
                    className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 ${getRiskColor(
                      result.riskLevel
                    )}`}
                  >
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        {getRiskIcon(result.riskLevel)}
                      </div>
                      <div className="text-4xl font-bold mb-2 text-gray-900">
                        {result.whr}
                      </div>
                      <div className="text-lg font-semibold text-gray-700 mb-2">
                        Waist-to-Hip Ratio
                      </div>
                      <div className="text-sm font-medium mb-4">
                        {result.riskLevel}
                      </div>
                      <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        {result.bodyShape}
                      </div>
                    </div>
                  </div>

                  {/* Ideal Range */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Healthy Range for Your Gender
                    </h3>
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {result.idealRange.min} - {result.idealRange.max}
                      </div>
                      <div className="text-sm text-green-700 font-medium">
                        Ideal WHR Range ({gender === "male" ? "Male" : "Female"}
                        )
                      </div>
                    </div>
                  </div>

                  {/* Health Risks */}
                  {result.healthRisks.length > 0 && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Associated Health Risks
                      </h3>
                      <ul className="space-y-2">
                        {result.healthRisks.map((risk, index) => (
                          <li
                            key={index}
                            className="flex items-center p-3 bg-amber-50 rounded-lg"
                          >
                            <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                            <span className="text-amber-800">{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Info className="w-5 h-5 mr-2" />
                      Health Recommendations
                    </h3>
                    <ul className="space-y-3">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {/* WHR Risk Categories */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Risk Categories by Gender
                </h3>

                {/* Male Categories */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-blue-800 mb-3">
                    Male
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-green-800">
                        Low Risk
                      </span>
                      <span className="text-green-600">{"<"} 0.85</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="font-medium text-yellow-800">
                        Moderate Risk
                      </span>
                      <span className="text-yellow-600">0.85 - 0.89</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium text-orange-800">
                        High Risk
                      </span>
                      <span className="text-orange-600">0.90 - 0.99</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium text-red-800">
                        Very High Risk
                      </span>
                      <span className="text-red-600">≥ 1.0</span>
                    </div>
                  </div>
                </div>

                {/* Female Categories */}
                <div>
                  <h4 className="text-lg font-medium text-pink-800 mb-3">
                    Female
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-green-800">
                        Low Risk
                      </span>
                      <span className="text-green-600">{"<"} 0.80</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="font-medium text-yellow-800">
                        Moderate Risk
                      </span>
                      <span className="text-yellow-600">0.80 - 0.84</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium text-orange-800">
                        High Risk
                      </span>
                      <span className="text-orange-600">0.85 - 0.89</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium text-red-800">
                        Very High Risk
                      </span>
                      <span className="text-red-600">≥ 0.90</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body Shape Information */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Understanding Body Fat Distribution
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-300 pl-4">
                    <div className="font-semibold text-purple-800">
                      Apple Shape (Android)
                    </div>
                    <div className="text-sm text-gray-600">
                      Fat stored around the waist and abdomen
                    </div>
                    <div className="text-sm text-purple-600">
                      Higher health risks due to visceral fat
                    </div>
                  </div>
                  <div className="border-l-4 border-pink-300 pl-4">
                    <div className="font-semibold text-pink-800">
                      Pear Shape (Gynoid)
                    </div>
                    <div className="text-sm text-gray-600">
                      Fat stored around hips and thighs
                    </div>
                    <div className="text-sm text-pink-600">
                      Generally lower health risks
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Why it matters:</strong> Abdominal fat (apple shape)
                    is more metabolically active and associated with increased
                    health risks compared to hip/thigh fat (pear shape).
                  </p>
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
                  The waist-to-hip ratio is one indicator of health risk and
                  should be used in conjunction with other health assessments.
                  This calculator provides general guidelines and should not
                  replace professional medical evaluation. Individual health
                  risks depend on multiple factors including genetics,
                  lifestyle, and overall health status.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
