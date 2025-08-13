// Theme interface for type safety
interface ThemeConfig {
  background: string;
  logoGradient: string;
  logoShadow: string;
}

// Navigation theme configurations based on calculator page backgrounds
export const navigationThemes: Record<string, ThemeConfig> = {
  // Default theme for homepage and other pages
  default: {
    background:
      "bg-gradient-to-r from-slate-900/95 via-purple-900/90 to-slate-900/95",
    logoGradient: "from-purple-500 to-pink-500",
    logoShadow: "shadow-purple-500/25",
  },

  // Health & Wellness calculators (emerald/teal theme)
  "health-wellness": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-emerald-900/90 to-slate-900/95",
    logoGradient: "from-emerald-500 to-teal-500",
    logoShadow: "shadow-emerald-500/25",
  },

  // Sleep & Time calculators (indigo/purple theme)
  "sleep-time": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-indigo-900/90 to-slate-900/95",
    logoGradient: "from-indigo-500 to-purple-500",
    logoShadow: "shadow-indigo-500/25",
  },

  // Fitness & Activity calculators (orange/red theme)
  "fitness-activity": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-orange-900/90 to-slate-900/95",
    logoGradient: "from-orange-500 to-red-500",
    logoShadow: "shadow-orange-500/25",
  },

  // Women's Health calculators (pink/rose theme)
  "womens-health": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-rose-900/90 to-slate-900/95",
    logoGradient: "from-pink-500 to-rose-500",
    logoShadow: "shadow-pink-500/25",
  },

  // Health Risk calculators (blue/indigo theme)
  "health-risk": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-blue-900/90 to-slate-900/95",
    logoGradient: "from-blue-500 to-indigo-500",
    logoShadow: "shadow-blue-500/25",
  },
};

// Individual calculator themes with unique colors
export const calculatorThemes: Record<string, ThemeConfig> = {
  // Individual Health & Wellness calculators
  "/calculators/bmi": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-emerald-900/90 to-slate-900/95",
    logoGradient: "from-emerald-500 to-teal-500",
    logoShadow: "shadow-emerald-500/25",
  },
  "/calculators/calorie": {
    background:
      "bg-gradient-to-r from-rose-900/95 via-orange-800/90 to-amber-900/95",
    logoGradient: "from-rose-500 to-orange-500",
    logoShadow: "shadow-orange-500/25",
  },
  "/calculators/bmr": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-blue-900/90 to-slate-900/95",
    logoGradient: "from-blue-500 to-cyan-500",
    logoShadow: "shadow-blue-500/25",
  },
  "/calculators/body-fat": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-purple-900/90 to-slate-900/95",
    logoGradient: "from-purple-500 to-violet-500",
    logoShadow: "shadow-purple-500/25",
  },
  "/calculators/protein": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-green-900/90 to-slate-900/95",
    logoGradient: "from-green-500 to-emerald-500",
    logoShadow: "shadow-green-500/25",
  },
  "/calculators/water-intake": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-cyan-900/90 to-slate-900/95",
    logoGradient: "from-cyan-500 to-blue-500",
    logoShadow: "shadow-cyan-500/25",
  },

  // Sleep & Time calculators (keeping category-based approach)
  "/calculators/sleep-cycle": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-indigo-900/90 to-slate-900/95",
    logoGradient: "from-indigo-500 to-purple-500",
    logoShadow: "shadow-indigo-500/25",
  },
  "/calculators/sleep-debt": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-indigo-900/90 to-slate-900/95",
    logoGradient: "from-indigo-500 to-purple-500",
    logoShadow: "shadow-indigo-500/25",
  },
  "/calculators/sleep-length": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-indigo-900/90 to-slate-900/95",
    logoGradient: "from-indigo-500 to-purple-500",
    logoShadow: "shadow-indigo-500/25",
  },

  // Individual Fitness & Activity calculators
  "/calculators/heart-rate": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-red-900/90 to-slate-900/95",
    logoGradient: "from-red-500 to-pink-500",
    logoShadow: "shadow-red-500/25",
  },
  "/calculators/calories-burned": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-orange-900/90 to-slate-900/95",
    logoGradient: "from-orange-500 to-red-500",
    logoShadow: "shadow-orange-500/25",
  },
  "/calculators/intermittent-fasting": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-violet-900/90 to-slate-900/95",
    logoGradient: "from-violet-500 to-purple-500",
    logoShadow: "shadow-violet-500/25",
  },

  // Individual Women's Health calculators
  "/calculators/pregnancy-due-date": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-rose-900/90 to-pink-900/95",
    logoGradient: "from-rose-500 to-pink-500",
    logoShadow: "shadow-rose-500/25",
  },
  "/calculators/ovulation": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-purple-900/90 to-rose-900/95",
    logoGradient: "from-purple-500 to-rose-500",
    logoShadow: "shadow-purple-500/25",
  },
  "/calculators/period-cycle": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-red-900/90 to-rose-900/95",
    logoGradient: "from-red-500 to-rose-500",
    logoShadow: "shadow-red-500/25",
  },

  // Individual Health Risk calculators
  "/calculators/diabetes-risk": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-blue-900/90 to-slate-900/95",
    logoGradient: "from-blue-500 to-indigo-500",
    logoShadow: "shadow-blue-500/25",
  },
  "/calculators/fiber-intake": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-lime-900/90 to-slate-900/95",
    logoGradient: "from-lime-500 to-green-500",
    logoShadow: "shadow-lime-500/25",
  },
  "/calculators/waist-hip-ratio": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-purple-900/90 to-indigo-900/95",
    logoGradient: "from-purple-500 to-indigo-500",
    logoShadow: "shadow-purple-500/25",
  },

  // Category pages (keeping the original category themes)
  "/health-wellness": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-emerald-900/90 to-slate-900/95",
    logoGradient: "from-emerald-500 to-teal-500",
    logoShadow: "shadow-emerald-500/25",
  },
  "/sleep-time": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-indigo-900/90 to-slate-900/95",
    logoGradient: "from-indigo-500 to-purple-500",
    logoShadow: "shadow-indigo-500/25",
  },
  "/fitness-activity": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-orange-900/90 to-slate-900/95",
    logoGradient: "from-orange-500 to-red-500",
    logoShadow: "shadow-orange-500/25",
  },
  "/womens-health": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-rose-900/90 to-slate-900/95",
    logoGradient: "from-pink-500 to-rose-500",
    logoShadow: "shadow-pink-500/25",
  },
  "/health-risk": {
    background:
      "bg-gradient-to-r from-slate-900/95 via-blue-900/90 to-slate-900/95",
    logoGradient: "from-blue-500 to-indigo-500",
    logoShadow: "shadow-blue-500/25",
  },
};

// Function to get theme based on current path
export function getNavigationTheme(pathname: string): ThemeConfig {
  // Check for direct calculator theme match first
  if (calculatorThemes[pathname as keyof typeof calculatorThemes]) {
    return calculatorThemes[pathname as keyof typeof calculatorThemes];
  }

  // Check for partial matches (in case of dynamic routes)
  for (const [route, theme] of Object.entries(calculatorThemes)) {
    if (pathname.startsWith(route)) {
      return theme;
    }
  }

  // Default theme for homepage and other pages
  return navigationThemes.default;
}
