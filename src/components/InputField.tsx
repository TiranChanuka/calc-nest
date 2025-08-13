import React from "react";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number" | "email";
  placeholder?: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  darkTheme?: boolean;
}

export default function InputField({
  label,
  value,
  onChange,
  type = "number",
  placeholder,
  unit,
  min,
  max,
  step,
  required = false,
  darkTheme = false,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label
        className={`block text-sm font-medium ${
          darkTheme ? "text-white/90" : "text-gray-700"
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`w-full px-4 py-3 rounded-2xl outline-none transition-all duration-200 ${
            darkTheme
              ? "bg-white/10 border border-white/20 text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 backdrop-blur-sm"
              : "border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          }`}
          required={required}
        />
        {unit && (
          <span
            className={`absolute right-3 top-3 text-sm ${
              darkTheme ? "text-white/60" : "text-gray-500"
            }`}
          >
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
