import React from "react";

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  darkTheme?: boolean;
}

export default function SelectField({
  label,
  value,
  onChange,
  options,
  required = false,
  darkTheme = false,
}: SelectFieldProps) {
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
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 rounded-2xl outline-none transition-all duration-200 ${
          darkTheme
            ? "bg-white/10 border border-white/20 text-white backdrop-blur-sm focus:bg-white/15 focus:border-white/40"
            : "border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        }`}
        required={required}
      >
        <option value="" className={darkTheme ? "bg-slate-800 text-white" : ""}>
          Select...
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className={darkTheme ? "bg-slate-800 text-white" : ""}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
