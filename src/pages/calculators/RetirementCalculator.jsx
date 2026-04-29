import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calculator,
  TrendingUp,
  IndianRupee,
  Calendar,
  Percent,
  ArrowRight,
  Phone,
  ChevronRight,
  RefreshCw,
  Target,
  Wallet,
  User,
  Clock,
  Heart,
  Plane,
  Home,
  Briefcase,
  Coffee,
  CheckCircle,
  Sparkles,
  HelpCircle,
  Info,
  BarChart3,
  AlertTriangle,
  TrendingDown,
} from "lucide-react";

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlyContribution, setMonthlyContribution] = useState(20000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(6);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  // Calculations
  const calculations = useMemo(() => {
    const yearsToRetirement = Math.max(retirementAge - currentAge, 1);
    const retirementYears = Math.max(lifeExpectancy - retirementAge, 1);

    // Future value of current savings
    const futureValueOfSavings =
      currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement);

    // Future value of monthly contributions (SIP formula)
    const monthlyRate = expectedReturn / 100 / 12;
    const months = yearsToRetirement * 12;
    const futureValueOfContributions =
      monthlyContribution *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);

    // Total retirement corpus you will have
    const totalCorpus = futureValueOfSavings + futureValueOfContributions;

    // Future monthly expenses (adjusted for inflation)
    const inflationAdjustedMonthlyExpenses =
      monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement);

    // Annual expenses at retirement
    const annualExpensesAtRetirement = inflationAdjustedMonthlyExpenses * 12;

    // Required corpus using present value of growing annuity
    const realRate = (1 + expectedReturn / 100) / (1 + inflationRate / 100) - 1;
    let retirementCorpusRequired;
    if (realRate > 0) {
      retirementCorpusRequired =
        annualExpensesAtRetirement *
        ((1 - Math.pow(1 + realRate, -retirementYears)) / realRate);
    } else {
      retirementCorpusRequired = annualExpensesAtRetirement * retirementYears;
    }

    // Shortfall/Excess
    const shortfall = Math.max(0, retirementCorpusRequired - totalCorpus);
    const excess = Math.max(0, totalCorpus - retirementCorpusRequired);

    // Additional monthly savings needed to cover shortfall
    let additionalMonthlySavings = 0;
    if (shortfall > 0 && monthlyRate > 0) {
      additionalMonthlySavings =
        shortfall /
        (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate));
    }

    return {
      yearsToRetirement,
      retirementYears,
      futureValueOfSavings: Math.round(futureValueOfSavings),
      futureValueOfContributions: Math.round(futureValueOfContributions),
      totalCorpus: Math.round(totalCorpus),
      inflationAdjustedMonthlyExpenses: Math.round(inflationAdjustedMonthlyExpenses),
      retirementCorpusRequired: Math.round(retirementCorpusRequired),
      shortfall: Math.round(shortfall),
      excess: Math.round(excess),
      additionalMonthlySavings: Math.round(additionalMonthlySavings),
    };
  }, [
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentSavings,
    monthlyContribution,
    expectedReturn,
    inflationRate,
    monthlyExpenses,
  ]);

  // Format currency
  const formatCurrency = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const resetCalculator = () => {
    setCurrentAge(30);
    setRetirementAge(60);
    setLifeExpectancy(85);
    setCurrentSavings(500000);
    setMonthlyContribution(20000);
    setExpectedReturn(12);
    setInflationRate(6);
    setMonthlyExpenses(50000);
  };

  // Lifestyle presets
  const lifestyleOptions = [
    {
      label: "Basic Comfort",
      icon: Coffee,
      monthlyExpenses: 30000,
      description: "Essential needs",
    },
    {
      label: "Comfortable",
      icon: Home,
      monthlyExpenses: 50000,
      description: "Good lifestyle",
    },
    {
      label: "Luxury",
      icon: Plane,
      monthlyExpenses: 100000,
      description: "Premium lifestyle",
    },
    {
      label: "Healthcare+",
      icon: Heart,
      monthlyExpenses: 75000,
      description: "Health priority",
    },
  ];

  // Other calculators (aligned with client's list)
  const otherCalculators = [
    { name: "SIP Calculator", path: "/calculators/sip" },
    { name: "Delay Planning", path: "/calculators/delay-planning" },
    { name: "Goal Planning", path: "/calculators/goal-planning" },
    { name: "Step Up SIP", path: "/calculators/step-up-sip" },
    { name: "Lumpsum", path: "/calculators/lumpsum" },
    { name: "EMI Calculator", path: "/calculators/emi" },
  ];

  // FAQs
  const faqs = [
    {
      question: "How much do I need for retirement?",
      answer:
        "It depends on your lifestyle, monthly expenses, inflation, and how long your retirement lasts. A general rule is to accumulate 25-30 times your annual expenses at retirement. This calculator helps you find the exact number based on your inputs.",
    },
    {
      question: "What return should I assume for retirement planning?",
      answer:
        "For long-term equity investments (15+ years), 10-12% is a reasonable assumption based on historical data. For conservative portfolios, use 8-10%. The key metric is the real return (returns minus inflation).",
    },
    {
      question: "Should I factor in inflation?",
      answer:
        "Absolutely. Inflation is the silent wealth eroder. At 6% inflation, today's ₹50,000 monthly expense will become ₹1.6 lakh in 20 years. Always plan with inflation-adjusted numbers for a realistic picture.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/30">
      {/* ================= HERO ================= */}
    <section className="relative overflow-hidden pb-10 sm:pb-14 md:pb-20 lg:pb-24 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-black/20" />

          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-20 w-32 h-32 sm:w-60 sm:h-60 bg-emerald-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, delay: 2, ease: "easeInOut" }}
            className="absolute bottom-1/4 -right-20 w-32 h-32 sm:w-60 sm:h-60 bg-cyan-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            {/* Breadcrumb */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-1.5 text-white/50 text-xs sm:text-sm mb-4 sm:mb-6"
            >
              <Link to="/" className="hover:text-white/80 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to="/calculators" className="hover:text-white/80 transition-colors">
                Calculators
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-emerald-300/80">Retirement</span>
            </motion.div>

            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 mb-5"
            >
              <Target className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-xs font-medium text-white/80">
                Retirement Calculator
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            >
              Plan Your{" "}
              <span
                className="italic bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Golden Years
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed"
            >
              Calculate how much you need to save for a comfortable and
              stress-free retirement.
            </motion.p>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            className="w-full h-10 sm:h-14 md:h-20"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ================= CALCULATOR ================= */}
      <section className="py-6 sm:py-10 -mt-4 sm:-mt-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-100">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                Retirement Details
              </h2>
              <button
                onClick={resetCalculator}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Reset
              </button>
            </div>

            <div className="grid lg:grid-cols-5">
              {/* ===== INPUTS (3 cols) ===== */}
              <div className="lg:col-span-3 p-4 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
                  {/* Current Age */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-emerald-600" />
                        Current Age
                      </label>
                      <div className="flex items-center bg-emerald-50 rounded-lg px-2.5 py-1">
                        <input
                          type="number"
                          value={currentAge}
                          onChange={(e) =>
                            setCurrentAge(
                              Math.min(Math.max(Number(e.target.value) || 18, 18), 70)
                            )
                          }
                          className="w-10 bg-transparent text-right font-semibold text-emerald-700 focus:outline-none text-sm"
                        />
                        <span className="text-emerald-600 ml-1 text-xs font-medium">
                          Yrs
                        </span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="18"
                      max="60"
                      step="1"
                      value={currentAge}
                      onChange={(e) => setCurrentAge(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-emerald"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>18</span>
                      <span>60</span>
                    </div>
                  </div>

                  {/* Retirement Age */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-teal-600" />
                        Retirement Age
                      </label>
                      <div className="flex items-center bg-teal-50 rounded-lg px-2.5 py-1">
                        <input
                          type="number"
                          value={retirementAge}
                          onChange={(e) =>
                            setRetirementAge(
                              Math.min(
                                Math.max(Number(e.target.value) || 50, currentAge + 1),
                                75
                              )
                            )
                          }
                          className="w-10 bg-transparent text-right font-semibold text-teal-700 focus:outline-none text-sm"
                        />
                        <span className="text-teal-600 ml-1 text-xs font-medium">
                          Yrs
                        </span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={Math.max(currentAge + 1, 45)}
                      max="75"
                      step="1"
                      value={retirementAge}
                      onChange={(e) => setRetirementAge(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-teal"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>{Math.max(currentAge + 1, 45)}</span>
                      <span>75</span>
                    </div>
                  </div>

                  {/* Life Expectancy */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-rose-500" />
                        Life Expectancy
                      </label>
                      <div className="flex items-center bg-rose-50 rounded-lg px-2.5 py-1">
                        <input
                          type="number"
                          value={lifeExpectancy}
                          onChange={(e) =>
                            setLifeExpectancy(
                              Math.min(
                                Math.max(Number(e.target.value) || 70, retirementAge + 1),
                                100
                              )
                            )
                          }
                          className="w-10 bg-transparent text-right font-semibold text-rose-700 focus:outline-none text-sm"
                        />
                        <span className="text-rose-600 ml-1 text-xs font-medium">
                          Yrs
                        </span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={retirementAge + 1}
                      max="100"
                      step="1"
                      value={lifeExpectancy}
                      onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-rose"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>{retirementAge + 1}</span>
                      <span>100</span>
                    </div>
                  </div>

                  {/* Monthly Expenses */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <IndianRupee className="w-3.5 h-3.5 text-orange-500" />
                        Monthly Expenses
                      </label>
                      <div className="flex items-center bg-orange-50 rounded-lg px-2.5 py-1">
                        <IndianRupee className="w-3 h-3 text-orange-600" />
                        <input
                          type="number"
                          value={monthlyExpenses}
                          onChange={(e) =>
                            setMonthlyExpenses(Number(e.target.value) || 0)
                          }
                          className="w-20 bg-transparent text-right font-semibold text-orange-700 focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="500000"
                      step="5000"
                      value={monthlyExpenses}
                      onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-orange"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>₹10K</span>
                      <span>₹5L</span>
                    </div>
                  </div>

                  {/* Current Savings */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <Wallet className="w-3.5 h-3.5 text-cyan-600" />
                        Current Savings
                      </label>
                      <div className="flex items-center bg-cyan-50 rounded-lg px-2.5 py-1">
                        <IndianRupee className="w-3 h-3 text-cyan-600" />
                        <input
                          type="number"
                          value={currentSavings}
                          onChange={(e) =>
                            setCurrentSavings(Number(e.target.value) || 0)
                          }
                          className="w-20 bg-transparent text-right font-semibold text-cyan-700 focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50000000"
                      step="100000"
                      value={currentSavings}
                      onChange={(e) => setCurrentSavings(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-cyan"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>₹0</span>
                      <span>₹5Cr</span>
                    </div>
                  </div>

                  {/* Monthly Contribution */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        Monthly Saving
                      </label>
                      <div className="flex items-center bg-blue-50 rounded-lg px-2.5 py-1">
                        <IndianRupee className="w-3 h-3 text-blue-600" />
                        <input
                          type="number"
                          value={monthlyContribution}
                          onChange={(e) =>
                            setMonthlyContribution(Number(e.target.value) || 0)
                          }
                          className="w-20 bg-transparent text-right font-semibold text-blue-700 focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="500000"
                      step="1000"
                      value={monthlyContribution}
                      onChange={(e) =>
                        setMonthlyContribution(Number(e.target.value))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>₹0</span>
                      <span>₹5L</span>
                    </div>
                  </div>

                  {/* Expected Return */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                        Expected Return (p.a.)
                      </label>
                      <div className="flex items-center bg-green-50 rounded-lg px-2.5 py-1">
                        <input
                          type="number"
                          value={expectedReturn}
                          onChange={(e) =>
                            setExpectedReturn(Number(e.target.value) || 0)
                          }
                          className="w-12 bg-transparent text-right font-semibold text-green-700 focus:outline-none text-sm"
                          step="0.5"
                        />
                        <Percent className="w-3 h-3 text-green-600 ml-0.5" />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="20"
                      step="0.5"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-green"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>5%</span>
                      <span>20%</span>
                    </div>
                  </div>

                  {/* Inflation Rate */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                        Inflation Rate (p.a.)
                      </label>
                      <div className="flex items-center bg-red-50 rounded-lg px-2.5 py-1">
                        <input
                          type="number"
                          value={inflationRate}
                          onChange={(e) =>
                            setInflationRate(Number(e.target.value) || 0)
                          }
                          className="w-12 bg-transparent text-right font-semibold text-red-700 focus:outline-none text-sm"
                          step="0.5"
                        />
                        <Percent className="w-3 h-3 text-red-500 ml-0.5" />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="10"
                      step="0.5"
                      value={inflationRate}
                      onChange={(e) => setInflationRate(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-red"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>3%</span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>

                {/* Lifestyle Presets */}
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-3 font-medium">
                    Lifestyle Presets:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {lifestyleOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setMonthlyExpenses(option.monthlyExpenses)}
                        className={`flex flex-col items-center p-2.5 sm:p-3 rounded-xl border transition-all ${
                          monthlyExpenses === option.monthlyExpenses
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                            : "bg-gray-50 border-gray-100 hover:bg-emerald-50/50 hover:border-emerald-100"
                        }`}
                      >
                        <option.icon className="w-4 h-4 mb-1.5" />
                        <span className="text-[10px] sm:text-xs font-medium leading-tight">
                          {option.label}
                        </span>
                        <span className="text-[10px] text-gray-500 mt-0.5">
                          {formatCurrency(option.monthlyExpenses)}/mo
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ===== RESULTS (2 cols) ===== */}
              <div className="lg:col-span-2 bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-600 text-white p-4 sm:p-6 lg:p-8">
                {/* Title */}
                <h2 className="text-sm sm:text-base font-bold mb-5 flex items-center gap-2">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                  Retirement Summary
                </h2>

                {/* Timeline badges */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <p className="text-[10px] sm:text-xs text-emerald-200 mb-0.5">
                      Years to Retire
                    </p>
                    <p className="text-lg sm:text-xl font-bold">
                      {calculations.yearsToRetirement}
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <p className="text-[10px] sm:text-xs text-emerald-200 mb-0.5">
                      Retirement Span
                    </p>
                    <p className="text-lg sm:text-xl font-bold">
                      {calculations.retirementYears} yrs
                    </p>
                  </div>
                </div>

                {/* Total Corpus */}
                <div className="text-center mb-5">
                  <p className="text-xs text-emerald-200 mb-1">
                    Your Estimated Corpus
                  </p>
                  <motion.div
                    key={calculations.totalCorpus}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold"
                  >
                    {formatCurrency(calculations.totalCorpus)}
                  </motion.div>
                </div>

                {/* Breakdown */}
                <div className="space-y-2.5 mb-5 text-sm">
                  <div className="flex justify-between py-2 border-b border-white/15">
                    <span className="text-emerald-200 text-xs sm:text-sm">
                      Current Savings Growth
                    </span>
                    <span className="font-semibold text-xs sm:text-sm">
                      {formatCurrency(calculations.futureValueOfSavings)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/15">
                    <span className="text-emerald-200 text-xs sm:text-sm">
                      Monthly Savings Growth
                    </span>
                    <span className="font-semibold text-xs sm:text-sm">
                      {formatCurrency(calculations.futureValueOfContributions)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/15">
                    <span className="text-emerald-200 text-xs sm:text-sm">
                      Required Corpus
                    </span>
                    <span className="font-semibold text-xs sm:text-sm">
                      {formatCurrency(calculations.retirementCorpusRequired)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-emerald-200 text-xs sm:text-sm">
                      Monthly Expense at Retirement
                    </span>
                    <span className="font-semibold text-xs sm:text-sm">
                      {formatCurrency(calculations.inflationAdjustedMonthlyExpenses)}
                    </span>
                  </div>
                </div>

                {/* Shortfall / On Track */}
                <div
                  className={`rounded-xl p-3.5 sm:p-4 mb-5 ${
                    calculations.shortfall > 0
                      ? "bg-red-500/20 border border-red-400/30"
                      : "bg-green-500/20 border border-green-400/30"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {calculations.shortfall > 0 ? (
                      <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-300 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-sm sm:text-base font-bold">
                        {calculations.shortfall > 0
                          ? `Shortfall: ${formatCurrency(calculations.shortfall)}`
                          : `Surplus: ${formatCurrency(calculations.excess)}`}
                      </p>
                      <p className="text-[10px] sm:text-xs mt-1 text-emerald-100">
                        {calculations.shortfall > 0
                          ? `Increase monthly savings by ${formatCurrency(
                              calculations.additionalMonthlySavings
                            )} to bridge the gap`
                          : "Great job! You're on track for a comfortable retirement."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visual Timeline */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-[10px] text-emerald-200 mb-1.5">
                    <span>Age {currentAge}</span>
                    <span>Age {retirementAge}</span>
                    <span>Age {lifeExpectancy}</span>
                  </div>
                  <div className="h-2 bg-white/15 rounded-full overflow-hidden flex">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          (calculations.yearsToRetirement /
                            (lifeExpectancy - currentAge)) *
                          100
                        }%`,
                      }}
                      transition={{ duration: 0.6 }}
                      className="bg-emerald-300 h-full"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          (calculations.retirementYears /
                            (lifeExpectancy - currentAge)) *
                          100
                        }%`,
                      }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="bg-cyan-300 h-full"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] mt-1 text-emerald-200/70">
                    <span>Earning Phase</span>
                    <span>Retirement Phase</span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Get Personalized Plan
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INFO CARDS ================= */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Why plan early */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Clock className="w-4.5 h-4.5 text-emerald-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  Why Start Early?
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                The power of compounding rewards those who start early. Even
                small amounts invested consistently can grow into a significant
                corpus over 25-30 years.
              </p>
              <div className="space-y-1.5">
                {["More time for compounding", "Smaller monthly commitment", "Greater financial freedom"].map(
                  (point, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600">{point}</span>
                    </div>
                  )
                )}
              </div>
            </motion.div>

            {/* Inflation impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                  <TrendingDown className="w-4.5 h-4.5 text-orange-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  Inflation Impact
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                At 6% inflation, today's ₹50,000 monthly expense will become
                ₹{formatCurrency(50000 * Math.pow(1.06, 20))} in 20 years.
                Always plan with inflation-adjusted numbers.
              </p>
              <div className="bg-orange-50 rounded-xl p-3">
                <p className="text-xs text-orange-700 font-medium">
                  Rule of thumb: Your retirement corpus should be 25-30× your
                  annual expenses at the time of retirement.
                </p>
              </div>
            </motion.div>

            {/* Formula */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center">
                  <Info className="w-4.5 h-4.5 text-cyan-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  How It's Calculated
                </h3>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-gray-800">1.</span> Your
                  current savings grow at the expected return rate until
                  retirement.
                </p>
                <p>
                  <span className="font-semibold text-gray-800">2.</span>{" "}
                  Monthly contributions accumulate using the SIP formula.
                </p>
                <p>
                  <span className="font-semibold text-gray-800">3.</span>{" "}
                  Required corpus is calculated based on inflation-adjusted
                  expenses over your retirement years.
                </p>
                <p>
                  <span className="font-semibold text-gray-800">4.</span> The
                  gap (if any) shows how much more you need to save monthly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FAQs ================= */}
      <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Frequently Asked{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Questions
              </span>
            </h2>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100"
              >
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed ml-6 sm:ml-7.5">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OTHER CALCULATORS ================= */}
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-5 sm:mb-6"
          >
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              Try Other{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Calculators
              </span>
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {otherCalculators.map((calc, index) => (
              <Link
                key={index}
                to={calc.path}
                className="px-3 sm:px-4 py-2 bg-gray-100 hover:bg-emerald-100 hover:text-emerald-700 rounded-lg text-xs sm:text-sm font-medium transition-colors"
              >
                {calc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-white text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

            <div className="relative z-10">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 text-emerald-200" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2.5">
                Need a Personalized Retirement Plan?
              </h2>
              <p className="text-emerald-100/80 text-xs sm:text-sm mb-5 sm:mb-6 max-w-md mx-auto leading-relaxed">
                Our experts will create a customized retirement plan tailored to
                your unique needs, goals, and risk profile.
              </p>

              <div className="flex flex-col xs:flex-row items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-all text-sm w-full xs:w-auto justify-center"
                >
                  Book Free Consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services/financial-planning"
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-all text-sm w-full xs:w-auto justify-center"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Custom Slider Styles */}
      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }

        input[type="range"]::-webkit-slider-runnable-track {
          height: 6px;
          border-radius: 3px;
          background: #e5e7eb;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          margin-top: -6px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
        }

        .slider-emerald::-webkit-slider-thumb {
          background: linear-gradient(135deg, #10b981, #059669);
        }
        .slider-teal::-webkit-slider-thumb {
          background: linear-gradient(135deg, #14b8a6, #0d9488);
        }
        .slider-rose::-webkit-slider-thumb {
          background: linear-gradient(135deg, #f43f5e, #e11d48);
        }
        .slider-orange::-webkit-slider-thumb {
          background: linear-gradient(135deg, #f97316, #ea580c);
        }
        .slider-cyan::-webkit-slider-thumb {
          background: linear-gradient(135deg, #06b6d4, #0891b2);
        }
        .slider-blue::-webkit-slider-thumb {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }
        .slider-green::-webkit-slider-thumb {
          background: linear-gradient(135deg, #22c55e, #16a34a);
        }
        .slider-red::-webkit-slider-thumb {
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }

        input[type="range"]::-moz-range-track {
          height: 6px;
          border-radius: 3px;
          background: #e5e7eb;
        }

        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: none;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
        }

        .slider-emerald::-moz-range-thumb {
          background: linear-gradient(135deg, #10b981, #059669);
        }
        .slider-teal::-moz-range-thumb {
          background: linear-gradient(135deg, #14b8a6, #0d9488);
        }
        .slider-rose::-moz-range-thumb {
          background: linear-gradient(135deg, #f43f5e, #e11d48);
        }
        .slider-orange::-moz-range-thumb {
          background: linear-gradient(135deg, #f97316, #ea580c);
        }
        .slider-cyan::-moz-range-thumb {
          background: linear-gradient(135deg, #06b6d4, #0891b2);
        }
        .slider-blue::-moz-range-thumb {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }
        .slider-green::-moz-range-thumb {
          background: linear-gradient(135deg, #22c55e, #16a34a);
        }
        .slider-red::-moz-range-thumb {
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }
      `}</style>
    </div>
  );
};

export default RetirementCalculator;