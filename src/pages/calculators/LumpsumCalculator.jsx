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
  CheckCircle,
  Sparkles,
  HelpCircle,
  Info,
  BarChart3,
  PieChart,
  Zap,
  Landmark,
  CircleDollarSign,
} from "lucide-react";

const LumpsumCalculator = () => {
  const [investmentAmount, setInvestmentAmount] = useState(500000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

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

  // ===== CALCULATIONS =====
  const calculations = useMemo(() => {
    const P = investmentAmount;
    const r = expectedReturn / 100;
    const n = timePeriod;

    // Future Value = P × (1 + r)^n
    const futureValue = P * Math.pow(1 + r, n);
    const totalReturns = futureValue - P;
    const wealthMultiplier = P > 0 ? futureValue / P : 0;
    const absoluteReturnPercent = P > 0 ? (totalReturns / P) * 100 : 0;
    const cagr = expectedReturn; // Same as input for lumpsum

    // Effective monthly equivalent
    const monthlyRate = expectedReturn / 100 / 12;
    const months = timePeriod * 12;
    const equivalentSIP =
      monthlyRate > 0
        ? futureValue / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate))
        : 0;

    // Year-wise breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= n; year++) {
      const value = P * Math.pow(1 + r, year);
      const prevValue = year === 1 ? P : P * Math.pow(1 + r, year - 1);
      const yearReturn = value - prevValue;
      yearlyBreakdown.push({
        year,
        value: Math.round(value),
        returns: Math.round(value - P),
        yearReturn: Math.round(yearReturn),
        growthPercent: Math.round(((value - P) / P) * 100),
      });
    }

    // Return comparison at different rates
    const rateComparison = [6, 8, 10, 12, 15, 18].map((rate) => {
      const fv = P * Math.pow(1 + rate / 100, n);
      return {
        rate,
        futureValue: Math.round(fv),
        returns: Math.round(fv - P),
      };
    });

    // Doubling time (Rule of 72)
    const doublingTime = r > 0 ? 72 / (r * 100) : 0;

    return {
      futureValue: Math.round(futureValue),
      totalReturns: Math.round(totalReturns),
      investedAmount: P,
      wealthMultiplier: Math.round(wealthMultiplier * 100) / 100,
      absoluteReturnPercent: Math.round(absoluteReturnPercent),
      cagr,
      equivalentSIP: Math.round(equivalentSIP),
      yearlyBreakdown,
      rateComparison,
      doublingTime: Math.round(doublingTime * 10) / 10,
    };
  }, [investmentAmount, expectedReturn, timePeriod]);

  // Format currency
  const formatCurrency = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const resetCalculator = () => {
    setInvestmentAmount(500000);
    setExpectedReturn(12);
    setTimePeriod(10);
  };

  // Presets
  const presets = [
    { label: "₹1L / 5Y", amount: 100000, rate: 12, years: 5 },
    { label: "₹5L / 10Y", amount: 500000, rate: 12, years: 10 },
    { label: "₹10L / 15Y", amount: 1000000, rate: 12, years: 15 },
    { label: "₹25L / 20Y", amount: 2500000, rate: 12, years: 20 },
  ];

  // Other calculators
  const otherCalculators = [
    { name: "Retirement Calculator", path: "/calculators/retirement" },
    { name: "Delay Planning", path: "/calculators/delay-planning" },
    { name: "Goal Planning", path: "/calculators/goal-planning" },
    { name: "SIP Calculator", path: "/calculators/sip" },
    { name: "Step Up SIP", path: "/calculators/step-up-sip" },
    { name: "SWP Calculator", path: "/calculators/swp" },
    { name: "EMI Calculator", path: "/calculators/emi" },
  ];

  // FAQs
  const faqs = [
    {
      question: "What is lumpsum investment?",
      answer:
        "A lumpsum investment is a one-time investment of a large amount of money into a financial instrument like mutual funds, stocks, or fixed deposits. Unlike SIP, you invest the entire amount at once instead of spreading it over time.",
    },
    {
      question: "Is lumpsum better than SIP?",
      answer:
        "It depends on the market conditions. Lumpsum works best when markets are low or fairly valued — you buy more units at a lower price and benefit fully from the subsequent rally. SIP is better for regular investors as it averages out market volatility. Ideally, use both strategies.",
    },
    {
      question: "What is the Rule of 72?",
      answer:
        "The Rule of 72 is a quick way to estimate how long it takes for your money to double. Divide 72 by the annual return rate. For example, at 12% return, your money doubles in approximately 72/12 = 6 years.",
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
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-1.5 text-white/50 text-xs sm:text-sm mb-4 sm:mb-6"
            >
              <Link to="/" className="hover:text-white/80 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to="/calculators" className="hover:text-white/80 transition-colors">Calculators</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-emerald-300/80">Lumpsum</span>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 mb-5"
            >
              <Landmark className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-xs font-medium text-white/80">Lumpsum Calculator</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            >
              Grow Your{" "}
              <span
                className="italic bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                One-Time Investment
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed"
            >
              Calculate how a one-time investment grows over time with the
              power of compounding.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-10 sm:h-14 md:h-20" preserveAspectRatio="none">
            <path d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H0Z" fill="white" />
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
                Enter Details
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
              {/* ===== INPUTS (2 cols) ===== */}
              <div className="lg:col-span-2 p-4 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
                <div className="space-y-5">
                  {/* Investment Amount */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <Wallet className="w-3.5 h-3.5 text-emerald-600" />
                        Investment Amount
                      </label>
                      <div className="flex items-center bg-emerald-50 rounded-lg px-2.5 py-1">
                        <IndianRupee className="w-3 h-3 text-emerald-600" />
                        <input
                          type="number"
                          value={investmentAmount}
                          onChange={(e) => setInvestmentAmount(Number(e.target.value) || 0)}
                          className="w-24 bg-transparent text-right font-semibold text-emerald-700 focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="50000000"
                      step="10000"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-emerald"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>₹10K</span>
                      <span>₹5 Cr</span>
                    </div>
                  </div>

                  {/* Expected Return */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-cyan-600" />
                        Expected Return (p.a.)
                      </label>
                      <div className="flex items-center bg-cyan-50 rounded-lg px-2.5 py-1">
                        <input
                          type="number"
                          value={expectedReturn}
                          onChange={(e) => setExpectedReturn(Number(e.target.value) || 0)}
                          className="w-12 bg-transparent text-right font-semibold text-cyan-700 focus:outline-none text-sm"
                          step="0.5"
                        />
                        <Percent className="w-3 h-3 text-cyan-600 ml-0.5" />
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
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>1%</span>
                      <span>30%</span>
                    </div>
                  </div>

                  {/* Time Period */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        Time Period
                      </label>
                      <div className="flex items-center bg-blue-50 rounded-lg px-2.5 py-1">
                        <input
                          type="number"
                          value={timePeriod}
                          onChange={(e) => setTimePeriod(Math.max(Number(e.target.value) || 1, 1))}
                          className="w-10 bg-transparent text-right font-semibold text-blue-700 focus:outline-none text-sm"
                        />
                        <span className="text-blue-600 ml-1 text-xs font-medium">Yrs</span>
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
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>1 Yr</span>
                      <span>40 Yrs</span>
                    </div>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-3 font-medium">Quick Presets:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {presets.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInvestmentAmount(preset.amount);
                          setExpectedReturn(preset.rate);
                          setTimePeriod(preset.years);
                        }}
                        className="px-3 py-2 text-xs font-medium bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors text-left border border-gray-100 hover:border-emerald-200"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rule of 72 */}
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <div className="bg-cyan-50 rounded-xl p-3.5 border border-cyan-100">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Zap className="w-3.5 h-3.5 text-cyan-600" />
                      <p className="text-xs font-bold text-cyan-800">Rule of 72</p>
                    </div>
                    <p className="text-[10px] sm:text-xs text-cyan-700">
                      At <span className="font-bold">{expectedReturn}%</span> return,
                      your money doubles in approximately{" "}
                      <span className="font-bold">{calculations.doublingTime} years</span>.
                    </p>
                  </div>
                </div>
              </div>

              {/* ===== RESULTS (3 cols) ===== */}
              <div className="lg:col-span-3 p-4 sm:p-6 lg:p-8">
                {/* Main Result Card */}
                <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-500 rounded-2xl p-4 sm:p-5 text-white mb-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                      <p className="text-xs sm:text-sm font-medium text-emerald-100">
                        Maturity Value after {timePeriod} years
                      </p>
                    </div>
                    <motion.div
                      key={calculations.futureValue}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1"
                    >
                      {formatCurrency(calculations.futureValue)}
                    </motion.div>
                    <p className="text-xs sm:text-sm text-emerald-100">
                      <span className="font-bold text-white">{calculations.absoluteReturnPercent}%</span> absolute returns
                    </p>
                  </div>
                </div>

                {/* Summary Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-5">
                  <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Invested</p>
                    <p className="text-xs sm:text-sm font-bold text-gray-900">
                      {formatCurrency(calculations.investedAmount)}
                    </p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-100">
                    <p className="text-[10px] sm:text-xs text-emerald-600 mb-1">Returns</p>
                    <p className="text-xs sm:text-sm font-bold text-emerald-700">
                      +{formatCurrency(calculations.totalReturns)}
                    </p>
                  </div>
                  <div className="bg-cyan-50 rounded-xl p-3 text-center border border-cyan-100">
                    <p className="text-[10px] sm:text-xs text-cyan-600 mb-1">Multiplier</p>
                    <p className="text-xs sm:text-sm font-bold text-cyan-700">
                      {calculations.wealthMultiplier}x
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
                    <p className="text-[10px] sm:text-xs text-blue-600 mb-1">CAGR</p>
                    <p className="text-xs sm:text-sm font-bold text-blue-700">
                      {calculations.cagr}%
                    </p>
                  </div>
                </div>

                {/* Breakdown Bar */}
                <div className="bg-white rounded-xl p-4 border border-gray-100 mb-5">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-emerald-600" />
                    Investment Breakdown
                  </h3>
                  <div className="mb-3">
                    <div className="h-5 sm:h-6 bg-gray-100 rounded-lg overflow-hidden flex">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(calculations.investedAmount / calculations.futureValue) * 100}%`,
                        }}
                        transition={{ duration: 0.8 }}
                        className="bg-emerald-500 h-full"
                      />
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(calculations.totalReturns / calculations.futureValue) * 100}%`,
                        }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-cyan-500 h-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-gray-600">
                        Invested:{" "}
                        <span className="font-semibold text-gray-900">
                          {((calculations.investedAmount / calculations.futureValue) * 100).toFixed(1)}%
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-cyan-500" />
                      <span className="text-gray-600">
                        Returns:{" "}
                        <span className="font-semibold text-gray-900">
                          {((calculations.totalReturns / calculations.futureValue) * 100).toFixed(1)}%
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Equivalent SIP */}
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 mb-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <CircleDollarSign className="w-4 h-4 text-emerald-600" />
                    <p className="text-xs sm:text-sm font-bold text-emerald-800">
                      SIP Equivalent
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    To reach the same corpus of{" "}
                    <span className="font-bold text-gray-800">
                      {formatCurrency(calculations.futureValue)}
                    </span>{" "}
                    through SIP, you'd need to invest{" "}
                    <span className="font-bold text-emerald-700">
                      {formatCurrency(calculations.equivalentSIP)}/month
                    </span>{" "}
                    for {timePeriod} years.
                  </p>
                </div>

                {/* CTA */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">
                    Ready to invest your lumpsum wisely?
                  </p>
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Get Expert Advice
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RETURN COMPARISON ================= */}
      <section className="py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6"
          >
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              Return Rate Comparison
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-4">
              {formatCurrency(investmentAmount)} invested for {timePeriod} years at different rates
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
              {calculations.rateComparison.map((item, index) => (
                <motion.div
                  key={item.rate}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-xl p-3 text-center border transition-colors ${
                    item.rate === expectedReturn
                      ? "bg-emerald-50 border-emerald-200"
                      : "bg-gray-50 border-gray-100"
                  }`}
                >
                  <p
                    className={`text-xs font-bold mb-1 ${
                      item.rate === expectedReturn ? "text-emerald-600" : "text-gray-500"
                    }`}
                  >
                    {item.rate}% p.a.
                  </p>
                  <p
                    className={`text-sm sm:text-base font-bold ${
                      item.rate === expectedReturn ? "text-emerald-700" : "text-gray-800"
                    }`}
                  >
                    {formatCurrency(item.futureValue)}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    +{formatCurrency(item.returns)}
                  </p>
                  {item.rate === expectedReturn && (
                    <span className="inline-block mt-1 text-[9px] bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded-full font-medium">
                      Selected
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= YEAR-WISE BREAKDOWN ================= */}
      <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6"
          >
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              Year-wise Growth
            </h3>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full min-w-[480px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                      Year
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                      Value
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-emerald-600">
                      Year's Growth
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                      Total Returns
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                      Growth %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.yearlyBreakdown
                    .filter(
                      (_, i) =>
                        timePeriod <= 15 ||
                        i % Math.ceil(timePeriod / 12) === 0 ||
                        i === calculations.yearlyBreakdown.length - 1
                    )
                    .map((row, index) => (
                      <motion.tr
                        key={row.year}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.04 }}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          row.year === timePeriod ? "bg-emerald-50/50" : ""
                        }`}
                      >
                        <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-800">
                          Year {row.year}
                        </td>
                        <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right font-semibold text-gray-900">
                          {formatCurrency(row.value)}
                        </td>
                        <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right font-medium text-emerald-600">
                          +{formatCurrency(row.yearReturn)}
                        </td>
                        <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right text-gray-600">
                          +{formatCurrency(row.returns)}
                        </td>
                        <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right text-gray-600">
                          {row.growthPercent}%
                        </td>
                      </motion.tr>
                    ))}
                </tbody>
              </table>
            </div>

            {timePeriod > 15 && (
              <p className="text-center text-[10px] sm:text-xs text-gray-400 mt-3">
                Showing key milestones of {timePeriod} years
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ================= INFO CARDS ================= */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Power of compounding */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  Power of Compounding
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                In lumpsum investing, your entire capital starts compounding
                from day one. Unlike SIP, where each instalment gets a
                different compounding period, lumpsum gives every rupee the
                maximum time to grow.
              </p>
              <div className="space-y-1.5">
                {[
                  "Full capital compounds from day 1",
                  "Returns also earn returns",
                  "Exponential growth over long periods",
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-600">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* When to use lumpsum */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center">
                  <Target className="w-4 h-4 text-cyan-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  When to Invest Lumpsum
                </h3>
              </div>
              <div className="space-y-1.5">
                {[
                  "After receiving a bonus or windfall",
                  "When markets are at fair/low valuations",
                  "For long-term goals (5+ years)",
                  "Maturity proceeds from FD/insurance",
                  "Inheritance or property sale proceeds",
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-600">{point}</span>
                  </div>
                ))}
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
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Info className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  Lumpsum Formula
                </h3>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 mb-3">
                <code className="text-xs sm:text-sm text-gray-800 font-mono">
                  A = P × (1 + r)ⁿ
                </code>
              </div>
              <div className="space-y-1.5 text-xs sm:text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-gray-800">A</span> =
                  Maturity Amount
                </p>
                <p>
                  <span className="font-semibold text-gray-800">P</span> =
                  Investment Amount (Principal)
                </p>
                <p>
                  <span className="font-semibold text-gray-800">r</span> =
                  Annual Rate of Return (in decimal)
                </p>
                <p>
                  <span className="font-semibold text-gray-800">n</span> =
                  Number of Years
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-[10px] sm:text-xs text-gray-500">
                  <span className="font-medium">Tip:</span> Use the Rule of
                  72 for quick doubling estimates: 72 ÷ Annual Return = Years
                  to double.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FAQs ================= */}
      <section className="py-8 sm:py-12 bg-gradient-to-b from-emerald-50/30 to-white">
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
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed ml-6 sm:ml-7">
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
                Have a Lumpsum to Invest?
              </h2>
              <p className="text-emerald-100/80 text-xs sm:text-sm mb-5 sm:mb-6 max-w-md mx-auto leading-relaxed">
                Our experts will help you choose the right funds and deploy
                your lumpsum strategically for maximum growth.
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
                  to="/calculators/stp"
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-all text-sm w-full xs:w-auto justify-center"
                >
                  Try STP Calculator
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
        .slider-cyan::-webkit-slider-thumb {
          background: linear-gradient(135deg, #06b6d4, #0891b2);
        }
        .slider-blue::-webkit-slider-thumb {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
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

export default LumpsumCalculator;