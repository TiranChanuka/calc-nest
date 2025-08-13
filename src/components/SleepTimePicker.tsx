"use client";

import React from "react";
import { Clock, Moon, Sun } from "lucide-react";

interface SleepTimePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type: "bedtime" | "waketime";
  darkTheme?: boolean;
  helpText?: string;
}

export default function SleepTimePicker({
  label,
  value,
  onChange,
  type,
  darkTheme = false,
  helpText,
}: SleepTimePickerProps) {
  const baseClasses = darkTheme
    ? "w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
    : "w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200";

  const labelClasses = darkTheme
    ? "block text-sm font-medium text-white/90 mb-2"
    : "block text-sm font-medium text-gray-700 mb-2";

  const helpTextClasses = darkTheme
    ? "text-xs text-white/60 mt-1"
    : "text-xs text-gray-500 mt-1";

  const getTimeIcon = () => {
    return type === "bedtime" ? (
      <Moon className="w-4 h-4" />
    ) : (
      <Sun className="w-4 h-4" />
    );
  };

  const getTimeAdvice = () => {
    if (!value) return null;

    const [hours] = value.split(":").map(Number);

    if (type === "bedtime") {
      if (hours >= 21 && hours <= 23) {
        return "Optimal bedtime range";
      } else if (hours >= 0 && hours <= 2) {
        return "Late bedtime - consider going to bed earlier";
      } else if (hours >= 3 && hours <= 20) {
        return "Very early bedtime";
      }
    } else {
      if (hours >= 6 && hours <= 8) {
        return "Optimal wake time range";
      } else if (hours >= 9 && hours <= 12) {
        return "Late wake time";
      } else if (hours >= 5 && hours <= 5) {
        return "Early riser";
      }
    }
    return null;
  };

  const timeAdvice = getTimeAdvice();

  return (
    <div>
      <label className={labelClasses}>
        <div className="flex items-center gap-2">
          {getTimeIcon()}
          {label}
        </div>
      </label>
      <div className="relative">
        <input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClasses} ${
            darkTheme
              ? "bg-white/10 text-white [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:contrast-100"
              : "bg-white text-gray-900"
          }`}
        />
      </div>
      {helpText && <p className={helpTextClasses}>{helpText}</p>}
      {timeAdvice && (
        <div
          className={`flex items-center gap-1 mt-1 ${
            darkTheme ? "text-indigo-300" : "text-indigo-600"
          }`}
        >
          <Clock className="w-3 h-3" />
          <span className="text-xs">{timeAdvice}</span>
        </div>
      )}
    </div>
  );
}
