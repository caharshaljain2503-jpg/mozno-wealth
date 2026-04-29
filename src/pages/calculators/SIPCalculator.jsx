import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calculator,
  TrendingUp,
  PieChart,
  IndianRupee,
  Calendar,
  Percent,
  ArrowRight,
  Phone,
  ChevronRight,
  Info,
  Download,
  RefreshCw,
  Target,
  Wallet,
  BarChart3,
  Sparkles,
  HelpCircle,
  CheckCircle,
} from "lucide-react";

const SIPCalculator = () => {
  // State for calculator inputs
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  // Animation variants
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

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  // SIP Calculation
  const calculations = useMemo(() => {
    const P = monthlyInvestment;
    const r = expectedReturn / 100 / 12; // Monthly interest rate
    const n = timePeriod * 12; // Total months

    // Future Value = P × [(1 + r)^n – 1] / r × (1 + r)
    const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvestment = P * n;
    const totalReturns = futureValue - totalInvestment;
    const wealthGained = totalReturns;

    return {
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(totalReturns),
      wealthGained: Math.round(wealthGained),
    };
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  // Format currency
  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${amount.toLocaleString("en-IN")}`;
    }
  };

  // Reset calculator
  const resetCalculator = () => {
    setMonthlyInvestment(10000);
    setExpectedReturn(12);
    setTimePeriod(10);
  };

  // Year-wise breakdown
  const yearlyBreakdown = useMemo(() => {
    const breakdown = [];
    const P = monthlyInvestment;
    const r = expectedReturn / 100 / 12;

    for (let year = 1; year <= timePeriod; year++) {
      const n = year * 12;
      const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      const invested = P * n;
      breakdown.push({
        year,
        invested: Math.round(invested),
        value: Math.round(futureValue),
        returns: Math.round(futureValue - invested),
      });
    }
    return breakdown;
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  // Other calculators
  const otherCalculators = [
    { name: "EMI Calculator", path: "/calculators/emi", icon: Calculator },
    { name: "Retirement Calculator", path: "/calculators/retirement", icon: Target },
    { name: "Tax Calculator", path: "/calculators/tax", icon: Percent },
    { name: "Goal Planning", path: "/calculators/goal-planning", icon: TrendingUp },
  ];

  // FAQs
  const faqs = [
    {
      question: "What is SIP?",
      answer:
        "SIP (Systematic Investment Plan) is a method of investing a fixed amount regularly in mutual funds. It helps in rupee cost averaging and building wealth through disciplined investing.",
    },
    {
      question: "What is a good expected return for SIP?",
      answer:
        "Historically, equity mutual funds have delivered 12-15% returns over long periods (10+ years). For conservative estimates, use 10-12%. Debt funds typically give 6-8%.",
    },
    {
      question: "Is SIP better than lump sum investing?",
      answer:
        "SIP is better for regular investors as it averages out market volatility. Lump sum can be better if you have a large amount and markets are low. Both have their advantages.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/30">
      {/* ================= HERO SECTION ================= */}
     <section className="relative overflow-hidden pb-10 sm:pb-14 md:pb-20 lg:pb-24 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80')] opacity-10 bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-black/20" />

          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 -left-20 w-40 h-40 sm:w-60 sm:h-60 bg-emerald-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 -right-20 w-40 h-40 sm:w-60 sm:h-60 bg-cyan-500/20 rounded-full blur-3xl"
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
              <Link to="/calculators" className="hover:text-white transition-colors">
                Calculators
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-emerald-300">SIP Calculator</span>
            </motion.div>

            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6"
            >
              <Calculator className="w-4 h-4 text-emerald-300" />
              <span className="text-sm font-medium text-white/90">
                SIP Calculator
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            >
              Calculate Your{" "}
              <span
                className="italic bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                SIP Returns
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto"
            >
              Plan your wealth creation journey with our SIP calculator. See how
              small monthly investments can grow into a significant corpus.
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

      {/* ================= CALCULATOR SECTION ================= */}
      <section className="py-8 sm:py-12 -mt-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
            {/* Left: Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-6 lg:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Enter Details
                </h2>
                <button
                  onClick={resetCalculator}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              {/* Monthly Investment */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-emerald-600" />
                    Monthly Investment
                  </label>
                  <div className="flex items-center bg-emerald-50 rounded-lg px-3 py-1.5">
                    <IndianRupee className="w-4 h-4 text-emerald-600" />
                    <input
                      type="number"
                      value={monthlyInvestment}
                      onChange={(e) =>
                        setMonthlyInvestment(Number(e.target.value) || 0)
                      }
                      className="w-24 bg-transparent text-right font-semibold text-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="500"
                  max="200000"
                  step="500"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-emerald"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹500</span>
                  <span>₹2,00,000</span>
                </div>
              </div>

              {/* Expected Return */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-600" />
                    Expected Return (p.a.)
                  </label>
                  <div className="flex items-center bg-cyan-50 rounded-lg px-3 py-1.5">
                    <input
                      type="number"
                      value={expectedReturn}
                      onChange={(e) =>
                        setExpectedReturn(Number(e.target.value) || 0)
                      }
                      className="w-16 bg-transparent text-right font-semibold text-cyan-700 focus:outline-none"
                    />
                    <Percent className="w-4 h-4 text-cyan-600 ml-1" />
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-cyan"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Time Period */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Time Period
                  </label>
                  <div className="flex items-center bg-blue-50 rounded-lg px-3 py-1.5">
                    <input
                      type="number"
                      value={timePeriod}
                      onChange={(e) =>
                        setTimePeriod(Number(e.target.value) || 1)
                      }
                      className="w-12 bg-transparent text-right font-semibold text-blue-700 focus:outline-none"
                    />
                    <span className="text-blue-600 ml-1 text-sm font-medium">
                      Yrs
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 Year</span>
                  <span>40 Years</span>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-3">Quick Presets:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "₹5K/10Y", m: 5000, r: 12, t: 10 },
                    { label: "₹10K/15Y", m: 10000, r: 12, t: 15 },
                    { label: "₹25K/20Y", m: 25000, r: 12, t: 20 },
                    { label: "₹50K/25Y", m: 50000, r: 12, t: 25 },
                  ].map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setMonthlyInvestment(preset.m);
                        setExpectedReturn(preset.r);
                        setTimePeriod(preset.t);
                      }}
                      className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-emerald-100 hover:text-emerald-700 rounded-lg transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Main Result Card */}
              <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-emerald-100">Total Value</p>
                      <p className="text-xs text-emerald-200">
                        After {timePeriod} years
                      </p>
                    </div>
                  </div>

                  <motion.div
                    key={calculations.futureValue}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                  >
                    {formatCurrency(calculations.futureValue)}
                  </motion.div>

                  {/* Breakdown */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="text-xs text-emerald-200 mb-1">
                        Invested Amount
                      </p>
                      <p className="text-lg sm:text-xl font-bold">
                        {formatCurrency(calculations.totalInvestment)}
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="text-xs text-emerald-200 mb-1">
                        Est. Returns
                      </p>
                      <p className="text-lg sm:text-xl font-bold text-emerald-200">
                        +{formatCurrency(calculations.totalReturns)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Breakdown */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-emerald-600" />
                  Investment Breakdown
                </h3>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden flex">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          (calculations.totalInvestment /
                            calculations.futureValue) *
                          100
                        }%`,
                      }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="bg-emerald-500 h-full"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          (calculations.totalReturns /
                            calculations.futureValue) *
                          100
                        }%`,
                      }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="bg-cyan-500 h-full"
                    />
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-gray-600">
                      Invested:{" "}
                      <span className="font-semibold text-gray-900">
                        {(
                          (calculations.totalInvestment /
                            calculations.futureValue) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-500" />
                    <span className="text-gray-600">
                      Returns:{" "}
                      <span className="font-semibold text-gray-900">
                        {(
                          (calculations.totalReturns /
                            calculations.futureValue) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </span>
                  </div>
                </div>

                {/* Wealth Multiplier */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Wealth Multiplier
                    </span>
                    <span className="text-lg font-bold text-emerald-600">
                      {(
                        calculations.futureValue / calculations.totalInvestment
                      ).toFixed(2)}
                      x
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gray-50 rounded-2xl p-5 sm:p-6 border border-gray-100">
                <p className="text-sm text-gray-600 mb-3">
                  Want to start your SIP journey?
                </p>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Get Expert Advice
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= YEAR-WISE BREAKDOWN ================= */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-6 lg:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                Year-wise Growth
              </h3>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Year
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                      Invested
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                      Returns
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                      Total Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyBreakdown.slice(0, 10).map((row, index) => (
                    <motion.tr
                      key={row.year}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">
                        Year {row.year}
                      </td>
                      <td className="py-3 px-4 text-sm text-right text-gray-600">
                        {formatCurrency(row.invested)}
                      </td>
                      <td className="py-3 px-4 text-sm text-right text-emerald-600 font-medium">
                        +{formatCurrency(row.returns)}
                      </td>
                      <td className="py-3 px-4 text-sm text-right font-semibold text-gray-900">
                        {formatCurrency(row.value)}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {yearlyBreakdown.length > 10 && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Showing first 10 years of {timePeriod} years
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ================= INFO SECTION ================= */}
      <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* What is SIP */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">What is SIP?</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                SIP (Systematic Investment Plan) is a disciplined investment
                approach where you invest a fixed amount regularly in mutual
                funds. It's one of the best ways to build wealth over time.
              </p>
              <div className="space-y-2">
                {[
                  "Invest as low as ₹500/month",
                  "Benefit from rupee cost averaging",
                  "Power of compounding works for you",
                  "No need to time the market",
                ].map((point, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* SIP Formula */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-cyan-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">SIP Formula</h3>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <code className="text-sm text-gray-800">
                  M = P × (&#123;[1 + r]^n – 1&#125; / r) × (1 + r)
                </code>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-semibold">M</span> = Maturity Amount
                </p>
                <p>
                  <span className="font-semibold">P</span> = Monthly Investment
                </p>
                <p>
                  <span className="font-semibold">r</span> = Monthly Rate of
                  Return (Annual Rate / 12)
                </p>
                <p>
                  <span className="font-semibold">n</span> = Number of Months
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FAQs ================= */}
      <section className="py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Frequently Asked{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Questions
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100"
              >
                <h3 className="text-base font-bold text-gray-900 mb-2 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-sm text-gray-600 ml-8">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= OTHER CALCULATORS ================= */}
      <section className="py-8 sm:py-12 bg-gradient-to-b from-emerald-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Try Other{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Calculators
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {otherCalculators.map((calc, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Link
                  to={calc.path}
                  className="flex flex-col items-center gap-3 p-5 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-emerald-200 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    <calc.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors text-center">
                    {calc.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

            <div className="relative z-10">
              <Sparkles className="w-10 h-10 mx-auto mb-4 text-emerald-200" />
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to Start Your SIP?
              </h2>
              <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
                Our experts will help you choose the right funds and create a
                personalized SIP strategy based on your goals.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Get Free Consultation
                  <ArrowRight className="w-4 h-4" />
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
          height: 8px;
          border-radius: 4px;
          background: #e5e7eb;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-top: -6px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .slider-emerald::-webkit-slider-thumb {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .slider-cyan::-webkit-slider-thumb {
          background: linear-gradient(135deg, #06b6d4, #0891b2);
        }

        .slider-blue::-webkit-slider-thumb {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        input[type="range"]::-moz-range-track {
          height: 8px;
          border-radius: 4px;
          background: #e5e7eb;
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .slider-emerald::-moz-range-thumb {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .slider-cyan::-moz-range-thumb {
          background: linear-gradient(135deg, #06b6d4, #0891b2);
        }

        .slider-blue::-moz-range-thumb {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }
      `}</style>
    </div>
  );
};

export default SIPCalculator;