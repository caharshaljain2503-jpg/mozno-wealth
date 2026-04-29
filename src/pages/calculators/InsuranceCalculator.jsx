import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calculator,
  IndianRupee,
  Calendar,
  ArrowRight,
  Phone,
  ChevronRight,
  RefreshCw,
  Wallet,
  Home,
  GraduationCap,
  Briefcase,
  Building2,
  Shield,
  Users,
  Heart,
  Baby,
  Umbrella,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Target,
  PiggyBank,
  CreditCard,
} from "lucide-react";

const InsuranceCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [existingLiabilities, setExistingLiabilities] = useState(2000000);
  const [futureExpenses, setFutureExpenses] = useState(3000000);
  const [existingCover, setExistingCover] = useState(1000000);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [dependents, setDependents] = useState(3);

  // Insurance Calculation
  const calculations = useMemo(() => {
    const yearsToRetirement = Math.max(0, retirementAge - currentAge);
    const inflationRate = 0.06; // 6% average inflation
    const expectedReturn = 0.08; // 8% expected return on investments

    // Method 1: Human Life Value (HLV)
    // Present value of future income
    const hlvMultiplier = yearsToRetirement > 0 
      ? (1 - Math.pow((1 + inflationRate) / (1 + expectedReturn), yearsToRetirement)) / 
        (expectedReturn - inflationRate)
      : 0;
    const humanLifeValue = Math.round(annualIncome * hlvMultiplier);

    // Method 2: Income Replacement
    // 10-15 times annual income (we'll use 12x as standard)
    const incomeReplacement = annualIncome * 12;

    // Method 3: Expense-based calculation
    const annualExpenses = monthlyExpenses * 12;
    const expenseBasedNeed = Math.round(annualExpenses * yearsToRetirement * 0.7); // 70% of expenses

    // Total financial needs
    const totalNeeds = existingLiabilities + futureExpenses + expenseBasedNeed;

    // Available resources
    const availableResources = existingCover + currentSavings;

    // Recommended coverage (using weighted average of methods)
    const recommendedCover = Math.round(
      Math.max(
        humanLifeValue,
        incomeReplacement,
        totalNeeds - currentSavings
      )
    );

    // Coverage gap
    const coverageGap = Math.max(0, recommendedCover - existingCover);

    // Estimated premium (rough estimate: 0.3-0.5% of sum assured for term plan)
    const estimatedAnnualPremium = Math.round(recommendedCover * 0.004);
    const estimatedMonthlyPremium = Math.round(estimatedAnnualPremium / 12);

    // Coverage adequacy percentage
    const coverageAdequacy = recommendedCover > 0 
      ? Math.min(100, (existingCover / recommendedCover) * 100)
      : 100;

    // Per dependent coverage
    const perDependentCover = dependents > 0 
      ? Math.round(recommendedCover / dependents)
      : 0;

    return {
      humanLifeValue,
      incomeReplacement,
      expenseBasedNeed,
      totalNeeds,
      availableResources,
      recommendedCover,
      coverageGap,
      estimatedAnnualPremium,
      estimatedMonthlyPremium,
      coverageAdequacy: coverageAdequacy.toFixed(0),
      yearsToRetirement,
      perDependentCover,
    };
  }, [
    annualIncome,
    currentAge,
    retirementAge,
    monthlyExpenses,
    existingLiabilities,
    futureExpenses,
    existingCover,
    currentSavings,
    dependents,
  ]);

  // Format currency
  const formatCurrency = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const resetCalculator = () => {
    setAnnualIncome(1200000);
    setCurrentAge(30);
    setRetirementAge(60);
    setMonthlyExpenses(50000);
    setExistingLiabilities(2000000);
    setFutureExpenses(3000000);
    setExistingCover(1000000);
    setCurrentSavings(500000);
    setDependents(3);
  };

  // Life stage presets
  const lifeStagePresets = [
    {
      label: "Single",
      icon: Users,
      income: 800000,
      age: 25,
      expenses: 30000,
      liabilities: 500000,
      future: 500000,
      dependents: 1,
    },
    {
      label: "Married",
      icon: Heart,
      income: 1500000,
      age: 32,
      expenses: 60000,
      liabilities: 3000000,
      future: 2000000,
      dependents: 2,
    },
    {
      label: "Parent",
      icon: Baby,
      income: 2000000,
      age: 38,
      expenses: 80000,
      liabilities: 4000000,
      future: 5000000,
      dependents: 4,
    },
    {
      label: "Pre-Retirement",
      icon: Umbrella,
      income: 2500000,
      age: 50,
      expenses: 100000,
      liabilities: 1000000,
      future: 2000000,
      dependents: 2,
    },
  ];

  // Other calculators
  const otherCalculators = [
    { name: "EMI Calculator", path: "/calculators/emi" },
    { name: "SIP Calculator", path: "/calculators/sip" },
    { name: "Tax Calculator", path: "/calculators/tax" },
    { name: "Retirement", path: "/calculators/retirement" },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  // Get coverage status
  const getCoverageStatus = () => {
    const adequacy = parseFloat(calculations.coverageAdequacy);
    if (adequacy >= 90) return { status: "Adequate", color: "text-green-400", bg: "bg-green-500" };
    if (adequacy >= 50) return { status: "Moderate", color: "text-yellow-400", bg: "bg-yellow-500" };
    return { status: "Under-insured", color: "text-red-400", bg: "bg-red-500" };
  };

  const coverageStatus = getCoverageStatus();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-amber-800 to-red-900" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80')] opacity-10 bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-orange-950/80 via-transparent to-black/20" />

          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 -left-20 w-40 h-40 sm:w-60 sm:h-60 bg-orange-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 -right-20 w-40 h-40 sm:w-60 sm:h-60 bg-red-500/20 rounded-full blur-3xl"
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
              className="flex items-center justify-center gap-2 text-white/60 text-sm mb-4"
            >
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                to="/calculators"
                className="hover:text-white transition-colors"
              >
                Calculators
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-orange-300">Insurance Calculator</span>
            </motion.div>

            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6"
            >
              <Shield className="w-4 h-4 text-orange-300" />
              <span className="text-sm font-medium text-white/90">
                Life Insurance Calculator
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            >
              Calculate Your{" "}
              <span
                className="italic bg-gradient-to-r from-orange-300 via-amber-300 to-orange-300 bg-clip-text text-transparent"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Insurance Needs
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto"
            >
              Determine the right life insurance coverage to protect your family's financial future.
            </motion.p>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            className="w-full h-12 sm:h-16 md:h-20"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-8 sm:py-12 -mt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Inputs */}
              <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">
                    Your Details
                  </h2>
                  <button
                    onClick={resetCalculator}
                    className="text-sm text-gray-500 hover:text-orange-600 flex items-center gap-1"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset
                  </button>
                </div>

                {/* Annual Income */}
                <div className="mb-5">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-orange-600" />
                      Annual Income
                    </label>
                    <div className="flex items-center bg-orange-50 px-3 py-1 rounded-lg">
                      <IndianRupee className="w-3.5 h-3.5 text-orange-600" />
                      <input
                        type="number"
                        value={annualIncome}
                        onChange={(e) =>
                          setAnnualIncome(Number(e.target.value) || 0)
                        }
                        className="w-24 bg-transparent text-right font-semibold text-orange-700 focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="300000"
                    max="10000000"
                    step="100000"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>₹3L</span>
                    <span>₹1Cr</span>
                  </div>
                </div>

                {/* Age and Retirement */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-amber-600" />
                        Age
                      </label>
                      <span className="text-sm font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        {currentAge} yrs
                      </span>
                    </div>
                    <input
                      type="range"
                      min="18"
                      max="65"
                      value={currentAge}
                      onChange={(e) => setCurrentAge(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Target className="w-4 h-4 text-red-600" />
                        Retire At
                      </label>
                      <span className="text-sm font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                        {retirementAge} yrs
                      </span>
                    </div>
                    <input
                      type="range"
                      min="45"
                      max="70"
                      value={retirementAge}
                      onChange={(e) => setRetirementAge(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                    />
                  </div>
                </div>

                {/* Monthly Expenses */}
                <div className="mb-5">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Home className="w-4 h-4 text-teal-600" />
                      Monthly Expenses
                    </label>
                    <div className="flex items-center bg-teal-50 px-3 py-1 rounded-lg">
                      <IndianRupee className="w-3.5 h-3.5 text-teal-600" />
                      <input
                        type="number"
                        value={monthlyExpenses}
                        onChange={(e) =>
                          setMonthlyExpenses(Number(e.target.value) || 0)
                        }
                        className="w-20 bg-transparent text-right font-semibold text-teal-700 focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="20000"
                    max="500000"
                    step="5000"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                </div>

                {/* Dependents */}
                <div className="mb-5">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      Number of Dependents
                    </label>
                    <span className="text-sm font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                      {dependents}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={dependents}
                    onChange={(e) => setDependents(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>

                {/* Liabilities & Future Expenses */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="text-xs font-medium text-gray-600 flex items-center gap-1 mb-2">
                      <CreditCard className="w-3.5 h-3.5 text-rose-600" />
                      Existing Loans
                    </label>
                    <div className="flex items-center bg-rose-50 px-3 py-2 rounded-lg">
                      <IndianRupee className="w-3.5 h-3.5 text-rose-600" />
                      <input
                        type="number"
                        value={existingLiabilities}
                        onChange={(e) =>
                          setExistingLiabilities(Number(e.target.value) || 0)
                        }
                        className="w-full bg-transparent text-right font-semibold text-rose-700 focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 flex items-center gap-1 mb-2">
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                      Future Goals
                    </label>
                    <div className="flex items-center bg-indigo-50 px-3 py-2 rounded-lg">
                      <IndianRupee className="w-3.5 h-3.5 text-indigo-600" />
                      <input
                        type="number"
                        value={futureExpenses}
                        onChange={(e) =>
                          setFutureExpenses(Number(e.target.value) || 0)
                        }
                        className="w-full bg-transparent text-right font-semibold text-indigo-700 focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Existing Cover & Savings */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="text-xs font-medium text-gray-600 flex items-center gap-1 mb-2">
                      <Shield className="w-3.5 h-3.5 text-green-600" />
                      Existing Cover
                    </label>
                    <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg">
                      <IndianRupee className="w-3.5 h-3.5 text-green-600" />
                      <input
                        type="number"
                        value={existingCover}
                        onChange={(e) =>
                          setExistingCover(Number(e.target.value) || 0)
                        }
                        className="w-full bg-transparent text-right font-semibold text-green-700 focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 flex items-center gap-1 mb-2">
                      <PiggyBank className="w-3.5 h-3.5 text-cyan-600" />
                      Current Savings
                    </label>
                    <div className="flex items-center bg-cyan-50 px-3 py-2 rounded-lg">
                      <IndianRupee className="w-3.5 h-3.5 text-cyan-600" />
                      <input
                        type="number"
                        value={currentSavings}
                        onChange={(e) =>
                          setCurrentSavings(Number(e.target.value) || 0)
                        }
                        className="w-full bg-transparent text-right font-semibold text-cyan-700 focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Presets */}
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-3">Life Stage Presets:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {lifeStagePresets.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setAnnualIncome(preset.income);
                          setCurrentAge(preset.age);
                          setMonthlyExpenses(preset.expenses);
                          setExistingLiabilities(preset.liabilities);
                          setFutureExpenses(preset.future);
                          setDependents(preset.dependents);
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-gray-50 hover:bg-orange-50 hover:text-orange-700 rounded-lg transition-colors"
                      >
                        <preset.icon className="w-4 h-4" />
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="p-6 sm:p-8 bg-gradient-to-br from-orange-600 to-red-600 text-white">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Recommended Coverage
                </h2>

                <motion.div
                  key={calculations.recommendedCover}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl sm:text-5xl font-bold mb-2"
                >
                  {formatCurrency(calculations.recommendedCover)}
                </motion.div>

                {/* Coverage Status */}
                <div className="flex items-center gap-2 mb-6">
                  {parseFloat(calculations.coverageAdequacy) >= 90 ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                  )}
                  <span className={coverageStatus.color}>
                    {coverageStatus.status} Coverage ({calculations.coverageAdequacy}%)
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between py-2.5 border-b border-white/20">
                    <span className="text-orange-200">Human Life Value</span>
                    <span className="font-semibold">
                      {formatCurrency(calculations.humanLifeValue)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-white/20">
                    <span className="text-orange-200">Income Replacement (12x)</span>
                    <span className="font-semibold">
                      {formatCurrency(calculations.incomeReplacement)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-white/20">
                    <span className="text-orange-200">Existing Cover</span>
                    <span className="font-semibold">
                      {formatCurrency(existingCover)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-white/20">
                    <span className="text-orange-200">Coverage Gap</span>
                    <span className="font-bold text-yellow-300">
                      {formatCurrency(calculations.coverageGap)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-white/20">
                    <span className="text-orange-200">Per Dependent</span>
                    <span className="font-semibold">
                      {formatCurrency(calculations.perDependentCover)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <span className="text-orange-200">Years to Protect</span>
                    <span className="font-bold text-lg">
                      {calculations.yearsToRetirement} Years
                    </span>
                  </div>
                </div>

                {/* Coverage Adequacy Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-orange-200">Coverage Adequacy</span>
                    <span className="font-semibold">{calculations.coverageAdequacy}%</span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, parseFloat(calculations.coverageAdequacy))}%` }}
                      transition={{ duration: 0.5 }}
                      className={`h-full ${coverageStatus.bg}`}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-2 text-orange-200">
                    <span>Under-insured</span>
                    <span>Adequate</span>
                  </div>
                </div>

                {/* Estimated Premium */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-orange-200 text-sm">Estimated Term Plan Premium</span>
                    <TrendingUp className="w-4 h-4 text-orange-300" />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-2xl font-bold">
                        {formatCurrency(calculations.estimatedMonthlyPremium)}
                      </span>
                      <span className="text-orange-200 text-sm">/month</span>
                    </div>
                    <span className="text-orange-200 text-sm">
                      ({formatCurrency(calculations.estimatedAnnualPremium)}/year)
                    </span>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Get Insurance Advice
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-orange-50 rounded-xl p-5">
              <Shield className="w-8 h-8 text-orange-600 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">Term Insurance</h4>
              <p className="text-sm text-gray-600">
                Pure protection at lowest premiums. Ideal for income replacement.
              </p>
            </div>
            <div className="bg-amber-50 rounded-xl p-5">
              <Umbrella className="w-8 h-8 text-amber-600 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">Whole Life</h4>
              <p className="text-sm text-gray-600">
                Lifetime coverage with savings component. Good for estate planning.
              </p>
            </div>
            <div className="bg-red-50 rounded-xl p-5">
              <Heart className="w-8 h-8 text-red-600 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">ULIP</h4>
              <p className="text-sm text-gray-600">
                Insurance + investment combo. Suitable for long-term wealth creation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Calculators */}
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
            Other Calculators
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {otherCalculators.map((calc, index) => (
              <Link
                key={index}
                to={calc.path}
                className="px-4 py-2 bg-gray-100 hover:bg-orange-100 hover:text-orange-700 rounded-lg text-sm font-medium transition-colors"
              >
                {calc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Secure Your Family's Future Today
          </h3>
          <p className="text-gray-600 mb-6">
            We partner with top insurance companies to get you the best coverage at competitive rates.
          </p>
          <Link
            to="/services/insurance"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors"
          >
            Explore Insurance Plans
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default InsuranceCalculator;