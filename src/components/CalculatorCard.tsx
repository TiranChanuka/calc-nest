import React from "react";
import { LucideIcon } from "lucide-react";

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: React.ReactNode;
  result?: React.ReactNode;
}

export default function CalculatorCard({
  title,
  description,
  icon: Icon,
  children,
  result,
}: CalculatorCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>

      <div className="space-y-4">{children}</div>

      {result && <div className="mt-6">{result}</div>}
    </div>
  );
}
