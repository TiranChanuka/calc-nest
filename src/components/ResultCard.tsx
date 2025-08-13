import React from "react";

interface ResultCardProps {
  title: string;
  value: string | number;
  unit?: string;
  description: string;
  interpretation?: string;
  className?: string;
}

export default function ResultCard({
  title,
  value,
  unit,
  description,
  interpretation,
  className = "",
}: ResultCardProps) {
  return (
    <div
      className={`bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
        <div className="text-right">
          <span className="text-2xl font-bold text-blue-600">{value}</span>
          {unit && <span className="text-sm text-gray-600 ml-1">{unit}</span>}
        </div>
      </div>
      <p className="text-gray-700 text-sm mb-2">{description}</p>
      {interpretation && (
        <div className="bg-blue-50 border border-blue-200 rounded p-2 mt-3">
          <p className="text-blue-800 text-sm font-medium">{interpretation}</p>
        </div>
      )}
    </div>
  );
}
