"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  Info,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import InputField from "@/components/InputField";

export default function DiabetesRiskCalculatorPage() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [waistCircumference, setWaistCircumference] = useState("");
  const [gender, setGender] = useState("");
  const [familyHistory, setFamilyHistory] = useState("");
  const [physicalActivity, setPhysicalActivity] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [gestationalDiabetes, setGestationalDiabetes] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [result, setResult] = useState<{
    riskScore: number;
    riskLevel: string;
    bmi: number;
    recommendations: string[];
    riskFactors: string[];
  } | null>(null);

  const calculateDiabetesRisk = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);
    const waistNum = parseFloat(waistCircumference);

    if (!weightNum || !heightNum || !ageNum || !gender) return;

    // Calculate BMI using standard formula: weight(kg) / height(m)²
    const bmi = weightNum / (heightNum / 100) ** 2;

    // ADA Risk Test Scoring System
    let riskScore = 0;
    const riskFactors: string[] = [];

    // Age scoring (ADA standard)
    if (ageNum >= 65) {
      riskScore += 3;
      riskFactors.push("Age 65 or older (3 points)");
    } else if (ageNum >= 45) {
      riskScore += 2;
      riskFactors.push("Age 45-64 (2 points)");
    } else if (ageNum >= 40) {
      riskScore += 1;
      riskFactors.push("Age 40-44 (1 point)");
    }

    // Gender scoring
    if (gender === "male") {
      riskScore += 1;
      riskFactors.push("Male gender (1 point)");
    }

    // BMI scoring (standard clinical thresholds)
    if (bmi >= 40) {
      riskScore += 3;
      riskFactors.push("Severely obese BMI ≥40 (3 points)");
    } else if (bmi >= 30) {
      riskScore += 2;
      riskFactors.push("Obese BMI 30-39.9 (2 points)");
    } else if (bmi >= 25) {
      riskScore += 1;
      riskFactors.push("Overweight BMI 25-29.9 (1 point)");
    }

    // Waist circumference (WHO/IDF criteria)
    if (waistNum) {
      if (gender === "male" && waistNum >= 94) {
        if (waistNum >= 102) {
          riskScore += 2;
          riskFactors.push("High abdominal obesity - male ≥102cm (2 points)");
        } else {
          riskScore += 1;
          riskFactors.push("Abdominal obesity - male ≥94cm (1 point)");
        }
      } else if (gender === "female" && waistNum >= 80) {
        if (waistNum >= 88) {
          riskScore += 2;
          riskFactors.push("High abdominal obesity - female ≥88cm (2 points)");
        } else {
          riskScore += 1;
          riskFactors.push("Abdominal obesity - female ≥80cm (1 point)");
        }
      }
    }

    // Family history (ADA scoring)
    if (familyHistory === "immediate") {
      riskScore += 5;
      riskFactors.push("Parent or sibling with diabetes (5 points)");
    }

    // Physical activity (ADA guidelines)
    if (physicalActivity === "none") {
      riskScore += 2;
      riskFactors.push("No regular physical activity (2 points)");
    }

    // Hypertension (clinical diagnosis)
    if (bloodPressure === "high") {
      riskScore += 2;
      riskFactors.push("High blood pressure ≥140/90 mmHg (2 points)");
    }

    // Gestational diabetes history
    if (gestationalDiabetes === "yes") {
      riskScore += 1;
      riskFactors.push("History of gestational diabetes (1 point)");
    }

    // Ethnicity risk (CDC/ADA guidelines)
    if (ethnicity === "african") {
      riskScore += 1;
      riskFactors.push("African American ethnicity (1 point)");
    } else if (ethnicity === "hispanic") {
      riskScore += 1;
      riskFactors.push("Hispanic/Latino ethnicity (1 point)");
    } else if (ethnicity === "asian") {
      riskScore += 1;
      riskFactors.push("Asian American ethnicity (1 point)");
    } else if (ethnicity === "native") {
      riskScore += 1;
      riskFactors.push("Native American ethnicity (1 point)");
    }

    // Risk level determination (ADA standard thresholds)
    let riskLevel = "";
    if (riskScore <= 2) {
      riskLevel = "Low Risk";
    } else if (riskScore <= 4) {
      riskLevel = "Moderate Risk";
    } else if (riskScore <= 8) {
      riskLevel = "High Risk";
    } else {
      riskLevel = "Very High Risk";
    }

    // Evidence-based recommendations
    const recommendations = [];
    if (riskScore <= 2) {
      recommendations.push("Continue healthy lifestyle habits");
      recommendations.push(
        "Maintain regular physical activity (150+ min/week)"
      );
      recommendations.push("Follow a balanced diet rich in whole foods");
      recommendations.push("Monitor weight and BMI regularly");
    } else if (riskScore <= 4) {
      recommendations.push(
        "Discuss diabetes screening with your healthcare provider"
      );
      recommendations.push("Implement lifestyle modifications now");
      recommendations.push("Lose 5-7% of body weight if overweight");
      recommendations.push("Exercise at least 150 minutes per week");
    } else {
      recommendations.push(
        "Schedule diabetes screening tests (HbA1c, fasting glucose)"
      );
      recommendations.push("Consider diabetes prevention program");
      recommendations.push("Work with healthcare team for risk reduction");
      recommendations.push("Monitor blood pressure and cholesterol");
    }

    setResult({
      riskScore,
      riskLevel,
      bmi: Math.round(bmi * 10) / 10,
      recommendations,
      riskFactors,
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
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(59,130,246,0.15),_transparent_50%)] animate-pulse"></div>
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(147,51,234,0.15),_transparent_50%)] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,_rgba(16,185,129,0.1),_transparent_50%)] animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Floating Health Icons */}
        <div
          className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-3 h-3 bg-indigo-400 rounded-full opacity-30 animate-bounce"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-5 h-5 bg-purple-400 rounded-full opacity-25 animate-bounce"
          style={{ animationDelay: "2.5s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-2 h-2 bg-blue-300 rounded-full opacity-40 animate-bounce"
          style={{ animationDelay: "3s" }}
        ></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-blue-100 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/health-risk"
              className="hover:text-blue-100 transition-colors"
            >
              Health Risk
            </Link>
            <span>/</span>
            <span className="text-white font-medium">
              Diabetes Risk Calculator
            </span>
          </div>

          {/* Back Button */}
          <Link
            href="/health-risk"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-100 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Health Risk
          </Link>

          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/30 animate-pulse hover:scale-110 transition-transform duration-300">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Diabetes Risk Calculator
            </h1>
            <p
              className="text-lg text-blue-100 max-w-3xl mx-auto drop-shadow-md animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              Assess your risk of developing Type 2 diabetes based on various
              health and lifestyle factors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-left">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <Activity className="w-6 h-6 mr-2 text-blue-300 animate-pulse" />
                Health Assessment
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Age (years)"
                    value={age}
                    onChange={setAge}
                    type="number"
                    placeholder="Enter age"
                    darkTheme={true}
                  />

                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-4 py-3 border border-white/20 bg-white/5 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-blue-200 transition-all duration-200 hover:bg-white/10"
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
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Weight (kg)"
                    value={weight}
                    onChange={setWeight}
                    type="number"
                    placeholder="Enter weight"
                    darkTheme={true}
                  />

                  <InputField
                    label="Height (cm)"
                    value={height}
                    onChange={setHeight}
                    type="number"
                    placeholder="Enter height"
                    darkTheme={true}
                  />
                </div>

                <InputField
                  label="Waist Circumference (cm)"
                  value={waistCircumference}
                  onChange={setWaistCircumference}
                  type="number"
                  placeholder="Measure at narrowest point"
                  darkTheme={true}
                />

                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Family History of Diabetes
                  </label>
                  <select
                    value={familyHistory}
                    onChange={(e) => setFamilyHistory(e.target.value)}
                    className="w-full px-4 py-3 border border-white/20 bg-white/10 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
                  >
                    <option value="" className="text-gray-900">
                      Select family history
                    </option>
                    <option value="none" className="text-gray-900">
                      No family history
                    </option>
                    <option value="extended" className="text-gray-900">
                      Extended family (grandparents, aunts, uncles)
                    </option>
                    <option value="immediate" className="text-gray-900">
                      Immediate family (parents, siblings)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Physical Activity Level
                  </label>
                  <select
                    value={physicalActivity}
                    onChange={(e) => setPhysicalActivity(e.target.value)}
                    className="w-full px-4 py-3 border border-white/20 bg-white/10 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
                  >
                    <option value="" className="text-gray-900">
                      Select activity level
                    </option>
                    <option value="high" className="text-gray-900">
                      Regular exercise (5+ times/week)
                    </option>
                    <option value="moderate" className="text-gray-900">
                      Moderate exercise (3-4 times/week)
                    </option>
                    <option value="light" className="text-gray-900">
                      Light exercise (1-2 times/week)
                    </option>
                    <option value="none" className="text-gray-900">
                      No regular exercise
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Blood Pressure
                  </label>
                  <select
                    value={bloodPressure}
                    onChange={(e) => setBloodPressure(e.target.value)}
                    className="w-full px-4 py-3 border border-white/20 bg-white/10 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
                  >
                    <option value="" className="text-gray-900">
                      Select blood pressure status
                    </option>
                    <option value="normal" className="text-gray-900">
                      Normal (below 120/80)
                    </option>
                    <option value="borderline" className="text-gray-900">
                      Borderline high (120-139/80-89)
                    </option>
                    <option value="high" className="text-gray-900">
                      High (140/90 or higher)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Ethnicity
                  </label>
                  <select
                    value={ethnicity}
                    onChange={(e) => setEthnicity(e.target.value)}
                    className="w-full px-4 py-3 border border-white/20 bg-white/10 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
                  >
                    <option value="" className="text-gray-900">
                      Select ethnicity
                    </option>
                    <option value="caucasian" className="text-gray-900">
                      Caucasian
                    </option>
                    <option value="african" className="text-gray-900">
                      African American
                    </option>
                    <option value="hispanic" className="text-gray-900">
                      Hispanic/Latino
                    </option>
                    <option value="asian" className="text-gray-900">
                      Asian
                    </option>
                    <option value="native" className="text-gray-900">
                      Native American
                    </option>
                    <option value="other" className="text-gray-900">
                      Other
                    </option>
                  </select>
                </div>

                {gender === "female" && (
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">
                      History of Gestational Diabetes
                    </label>
                    <select
                      value={gestationalDiabetes}
                      onChange={(e) => setGestationalDiabetes(e.target.value)}
                      className="w-full px-4 py-3 border border-white/20 bg-white/10 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
                    >
                      <option value="" className="text-gray-900">
                        Select option
                      </option>
                      <option value="no" className="text-gray-900">
                        No
                      </option>
                      <option value="yes" className="text-gray-900">
                        Yes
                      </option>
                      <option value="unsure" className="text-gray-900">
                        Unsure
                      </option>
                    </select>
                  </div>
                )}

                <button
                  onClick={calculateDiabetesRisk}
                  disabled={!age || !weight || !height || !gender}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                >
                  Calculate Diabetes Risk
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {result && (
                <>
                  {/* Risk Assessment */}
                  <div
                    className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 ${getRiskColor(
                      result.riskLevel
                    )}`}
                  >
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        {getRiskIcon(result.riskLevel)}
                      </div>
                      <div className="text-3xl font-bold mb-2 text-gray-900">
                        {result.riskLevel}
                      </div>
                      <div className="text-lg font-semibold text-gray-700 mb-2">
                        Diabetes Risk Assessment
                      </div>
                      <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        Risk Score: {result.riskScore}/15
                      </div>
                    </div>
                  </div>

                  {/* BMI & Health Stats */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Health Metrics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {result.bmi}
                        </div>
                        <div className="text-sm text-blue-700 font-medium">
                          BMI
                        </div>
                      </div>
                      <div className="text-center p-4 bg-indigo-50 rounded-xl">
                        <div className="text-2xl font-bold text-indigo-600 mb-1">
                          {result.riskScore}
                        </div>
                        <div className="text-sm text-indigo-700 font-medium">
                          Risk Points
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Risk Factors */}
                  {result.riskFactors.length > 0 && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Identified Risk Factors
                      </h3>
                      <ul className="space-y-2">
                        {result.riskFactors.map((factor, index) => (
                          <li
                            key={index}
                            className="flex items-center p-3 bg-amber-50 rounded-lg"
                          >
                            <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                            <span className="text-amber-800">{factor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Info className="w-5 h-5 mr-2" />
                      Recommendations
                    </h3>
                    <ul className="space-y-3">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {/* Risk Level Guide */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Risk Level Guide
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-green-800">Low Risk</span>
                    <span className="text-green-600">0-2 points</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium text-yellow-800">
                      Moderate Risk
                    </span>
                    <span className="text-yellow-600">3-5 points</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium text-orange-800">
                      High Risk
                    </span>
                    <span className="text-orange-600">6-8 points</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium text-red-800">
                      Very High Risk
                    </span>
                    <span className="text-red-600">9+ points</span>
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
                  This risk assessment tool is for informational purposes only
                  and should not replace professional medical advice. A high
                  risk score does not mean you have diabetes, and a low score
                  doesn&apos;t guarantee you won&apos;t develop it. Consult your
                  healthcare provider for proper diabetes screening and
                  diagnosis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
