"use client";

import React from "react";
import { Clock } from "lucide-react";

interface TimePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  darkTheme?: boolean;
  helpText?: string;
  placeholder?: string;
}

export default function TimePicker({
  label,
  value,
  onChange,
  darkTheme = false,
  helpText,
  placeholder = "Select time",
}: TimePickerProps) {
  const baseClasses = darkTheme
    ? "w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
    : "w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200";

  const labelClasses = darkTheme
    ? "block text-sm font-medium text-white/90 mb-2"
    : "block text-sm font-medium text-gray-700 mb-2";

  const helpTextClasses = darkTheme
    ? "text-xs text-white/60 mt-1"
    : "text-xs text-gray-500 mt-1";

  return (
    <div>
      <label className={labelClasses}>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
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
          placeholder={placeholder}
        />
      </div>
      {helpText && <p className={helpTextClasses}>{helpText}</p>}
    </div>
  );
}
