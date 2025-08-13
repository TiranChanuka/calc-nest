import Link from "next/link";
import {
  Scale,
  Flame,
  Zap,
  Droplets,
  Beef,
  Target,
  Moon,
  Clock,
  Calendar,
  Heart,
  Activity,
  Baby,
  Users,
  Shield,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";

const allCalculators = [
  // Health & Wellness
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index to assess weight status",
    icon: Scale,
    href: "/health-wellness",
    category: "Health & Wellness",
    color: "from-red-500 to-pink-500",
  },
  {
    title: "Calorie Calculator",
    description: "Estimate daily caloric needs for weight management",
    icon: Flame,
    href: "/health-wellness",
    category: "Health & Wellness",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "BMR Calculator",
    description: "Calculate Basal Metabolic Rate - calories burned at rest",
    icon: Zap,
    href: "/health-wellness",
    category: "Health & Wellness",
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Body Fat Calculator",
    description: "Estimate body fat percentage using US Navy method",
    icon: Target,
    href: "/health-wellness",
    category: "Health & Wellness",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Protein Calculator",
    description: "Determine daily protein requirements for your goals",
    icon: Beef,
    href: "/health-wellness",
    category: "Health & Wellness",
    color: "from-green-500 to-teal-500",
  },
  {
    title: "Water Intake Calculator",
    description: "Calculate daily hydration needs based on activity",
    icon: Droplets,
    href: "/health-wellness",
    category: "Health & Wellness",
    color: "from-blue-500 to-cyan-500",
  },

  // Sleep & Time
  {
    title: "Sleep Cycle Calculator",
    description: "Find optimal bedtime and wake time based on sleep cycles",
    icon: Moon,
    href: "/sleep-time",
    category: "Sleep & Time",
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: "Sleep Debt Calculator",
    description: "Track accumulated sleep debt and recovery needs",
    icon: Calendar,
    href: "/sleep-time",
    category: "Sleep & Time",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Sleep Length Calculator",
    description: "Determine optimal sleep duration for your age",
    icon: Clock,
    href: "/sleep-time",
    category: "Sleep & Time",
    color: "from-blue-500 to-indigo-500",
  },

  // Fitness & Activity
  {
    title: "Target Heart Rate Calculator",
    description: "Calculate heart rate zones for optimal training",
    icon: Heart,
    href: "/fitness-activity",
    category: "Fitness & Activity",
    color: "from-red-500 to-rose-500",
  },
  {
    title: "Calories Burned Calculator",
    description: "Estimate calories burned during various activities",
    icon: Activity,
    href: "/fitness-activity",
    category: "Fitness & Activity",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Intermittent Fasting Calculator",
    description: "Plan your fasting and eating windows",
    icon: Clock,
    href: "/fitness-activity",
    category: "Fitness & Activity",
    color: "from-teal-500 to-cyan-500",
  },

  // Women's Health
  {
    title: "Pregnancy Due Date Calculator",
    description: "Calculate estimated due date for pregnancy",
    icon: Baby,
    href: "/womens-health",
    category: "Women's Health",
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Ovulation Calculator",
    description: "Track fertile window for conception planning",
    icon: Heart,
    href: "/womens-health",
    category: "Women's Health",
    color: "from-rose-500 to-pink-500",
  },
  {
    title: "Period Cycle Calculator",
    description: "Track and predict menstrual cycle patterns",
    icon: Calendar,
    href: "/womens-health",
    category: "Women's Health",
    color: "from-purple-500 to-pink-500",
  },

  // Health Risk Tools
  {
    title: "Diabetes Risk Calculator",
    description: "Assess risk factors for developing diabetes",
    icon: Shield,
    href: "/health-risk",
    category: "Health Risk Tools",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Fiber Intake Calculator",
    description: "Calculate daily fiber needs for digestive health",
    icon: TrendingUp,
    href: "/health-risk",
    category: "Health Risk Tools",
    color: "from-green-500 to-teal-500",
  },
  {
    title: "Waist-to-Hip Ratio Calculator",
    description: "Evaluate health risks based on body measurements",
    icon: Target,
    href: "/health-risk",
    category: "Health Risk Tools",
    color: "from-blue-500 to-purple-500",
  },
];

const categories = [
  "All",
  "Health & Wellness",
  "Sleep & Time",
  "Fitness & Activity",
  "Women's Health",
  "Health Risk Tools",
];

export default function AllCalculatorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                All Health Calculators
              </h1>
              <p className="text-gray-600">
                Complete collection of health and wellness calculation tools
              </p>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allCalculators.map((calculator, index) => {
            const IconComponent = calculator.icon;
            return (
              <Link
                key={calculator.title}
                href={calculator.href}
                className="group"
              >
                <div
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${calculator.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full mb-2">
                      {calculator.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {calculator.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {calculator.description}
                  </p>

                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                    Use Calculator
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Popular Calculators */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Most Popular Calculators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/health-wellness" className="group">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <Scale className="w-8 h-8 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-red-600">
                    BMI Calculator
                  </h3>
                </div>
                <p className="text-gray-600">
                  Most commonly used health metric for weight assessment
                </p>
              </div>
            </Link>

            <Link href="/sleep-time" className="group">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <Moon className="w-8 h-8 text-indigo-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600">
                    Sleep Calculator
                  </h3>
                </div>
                <p className="text-gray-600">
                  Optimize your sleep schedule for better rest and recovery
                </p>
              </div>
            </Link>

            <Link href="/fitness-activity" className="group">
              <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <Activity className="w-8 h-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600">
                    Calories Burned
                  </h3>
                </div>
                <p className="text-gray-600">
                  Track energy expenditure during various activities
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Quick Access Links */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Quick Access
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/health-wellness"
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Users className="w-8 h-8 text-red-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">
                Health & Wellness
              </span>
              <span className="text-xs text-gray-500">6 calculators</span>
            </Link>
            <Link
              href="/sleep-time"
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Moon className="w-8 h-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">
                Sleep & Time
              </span>
              <span className="text-xs text-gray-500">3 calculators</span>
            </Link>
            <Link
              href="/fitness-activity"
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Activity className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">
                Fitness & Activity
              </span>
              <span className="text-xs text-gray-500">3 calculators</span>
            </Link>
            <Link
              href="/womens-health"
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Baby className="w-8 h-8 text-pink-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">
                Women&apos;s Health
              </span>
              <span className="text-xs text-gray-500">3 calculators</span>
            </Link>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            Medical Disclaimer
          </h3>
          <p className="text-yellow-700">
            All calculators provide estimates based on established formulas and
            should not replace professional medical advice. Results may vary
            based on individual circumstances. Always consult healthcare
            professionals for medical decisions and personalized health
            recommendations.
          </p>
        </div>
      </main>
    </div>
  );
}
