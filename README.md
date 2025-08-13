# Health & Wellness Calculators

A comprehensive collection of health and wellness calculators built with Next.js, TypeScript, and Tailwind CSS. This modern web application provides users with essential tools to track and improve their health journey.

## 🌟 Features

### Calculator Categories

#### 🏥 Health & Wellness

- **BMI Calculator** - Body Mass Index assessment
- **Calorie Calculator** - Daily caloric needs estimation
- **BMR Calculator** - Basal Metabolic Rate calculation
- **Body Fat Calculator** - Body fat percentage using US Navy method
- **Protein Calculator** - Daily protein requirements
- **Water Intake Calculator** - Hydration needs based on activity

#### 😴 Sleep & Time

- **Sleep Cycle Calculator** - Optimal bedtime/wake time based on 90-minute cycles
- **Sleep Debt Calculator** - Track accumulated sleep debt
- **Sleep Length Calculator** - Age-appropriate sleep duration recommendations

#### 🏃‍♂️ Fitness & Activity

- **Target Heart Rate Calculator** - Training zones for optimal workouts
- **Calories Burned Calculator** - Energy expenditure during activities
- **Intermittent Fasting Calculator** - Fasting and eating window planning

#### 👩‍⚕️ Women's Health

- **Pregnancy Due Date Calculator** - Estimated delivery date
- **Ovulation Calculator** - Fertile window tracking
- **Period Cycle Calculator** - Menstrual cycle prediction

#### 🛡️ Health Risk Tools

- **Diabetes Risk Assessment** - Type 2 diabetes risk evaluation
- **Fiber Intake Calculator** - Daily fiber needs for digestive health
- **Waist-to-Hip Ratio Calculator** - Cardiovascular risk assessment

## 🚀 Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Development**: Turbopack for fast development builds

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd calc
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Key Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Calculators**: Real-time calculations with instant results
- **Educational Content**: Detailed explanations and health information
- **Medical Disclaimers**: Appropriate warnings and professional advice recommendations
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── health-wellness/    # Health & wellness calculators
│   ├── sleep-time/         # Sleep and time calculators
│   ├── fitness-activity/   # Fitness and activity calculators
│   ├── womens-health/      # Women's health calculators
│   ├── health-risk/        # Health risk assessment tools
│   └── all-calculators/    # Complete calculator listing
├── components/             # Reusable React components
│   ├── CalculatorCard.tsx  # Calculator container component
│   ├── InputField.tsx      # Form input component
│   ├── SelectField.tsx     # Dropdown selection component
│   └── ResultCard.tsx      # Results display component
└── globals.css            # Global styles and Tailwind imports
```

## 🎯 Calculator Accuracy

All calculators use scientifically established formulas:

- BMI: Standard WHO formula (weight/height²)
- BMR: Mifflin-St Jeor equation
- Body Fat: US Navy circumference method
- Heart Rate Zones: Karvonen method
- Pregnancy: Naegele's rule (280 days from LMP)

## ⚠️ Medical Disclaimer

These calculators are for informational and educational purposes only. They should not replace professional medical advice, diagnosis, or treatment. Always consult healthcare professionals for medical decisions and personalized health recommendations.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions or support, please contact [your-email@example.com]

---

Built with ❤️ for better health and wellness tracking.
