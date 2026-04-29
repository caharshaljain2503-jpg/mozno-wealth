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
  ArrowRightLeft,
  Shield,
  Zap,
  PieChart,
} from "lucide-react";

const STPCalculator = () => {
  const [totalAmount, setTotalAmount] = useState(1000000);
  const [monthlyTransfer, setMonthlyTransfer] = useState(50000);
  const [sourceReturn, setSourceReturn] = useState(7);
  const [targetReturn, setTargetReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(20);

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

  // Format currency
  const formatCurrency = (amount) => {
    if (!Number.isFinite(amount)) return "—";
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${Math.round(amount).toLocaleString("en-IN")}`;
  };

  const resetCalculator = () => {
    setTotalAmount(1000000);
    setMonthlyTransfer(50000);
    setSourceReturn(7);
    setTargetReturn(12);
    setTimePeriod(20);
  };

  // ===== CALCULATIONS =====
  const calculations = useMemo(() => {
    const totalMonths = timePeriod * 12;
    const rSource = sourceReturn / 100 / 12;
    const rTarget = targetReturn / 100 / 12;

    // --- STP Phase ---
    // Months for STP (until source fund is fully transferred or period ends)
    const stpMonths = Math.min(
      Math.ceil(totalAmount / monthlyTransfer),
      totalMonths
    );

    // Simulate source fund month-by-month (with withdrawals)
    let sourceBal = totalAmount;
    let targetBal = 0;
    let sourceGrowth = 0;
    let targetGrowth = 0;
    let totalTransferred = 0;

    const monthlyData = [];

    for (let m = 1; m <= totalMonths; m++) {
      // Source grows
      const sGrowth = sourceBal * rSource;
      sourceBal += sGrowth;
      sourceGrowth += sGrowth;

      // Transfer
      const transfer = m <= stpMonths ? Math.min(monthlyTransfer, sourceBal) : 0;
      sourceBal -= transfer;
      totalTransferred += transfer;

      // Target receives transfer and grows
      const tGrowth = targetBal * rTarget;
      targetBal += tGrowth + transfer;
      targetGrowth += tGrowth;

      if (m % 12 === 0) {
        monthlyData.push({
          year: m / 12,
          sourceBal: Math.round(sourceBal),
          targetBal: Math.round(targetBal),
          totalValue: Math.round(sourceBal + targetBal),
          totalTransferred: Math.round(totalTransferred),
        });
      }
    }

    const finalSourceBal = Math.max(0, sourceBal);
    const finalTargetBal = Math.max(0, targetBal);
    const totalFinalValue = finalSourceBal + finalTargetBal;
    const totalReturns = totalFinalValue - totalAmount;
    const stpDurationMonths = Math.min(stpMonths, totalMonths);
    const stpDurationYears = (stpDurationMonths / 12).toFixed(1);

    // --- Lumpsum comparison (all in target from day 1) ---
    const lumpsumFinalValue = totalAmount * Math.pow(1 + targetReturn / 100, timePeriod);
    const lumpsumReturns = lumpsumFinalValue - totalAmount;

    // --- STP vs Lumpsum difference ---
    const stpVsLumpsum = totalFinalValue - lumpsumFinalValue;

    // --- No-transfer comparison (all stays in source) ---
    const sourceOnlyFinalValue = totalAmount * Math.pow(1 + sourceReturn / 100, timePeriod);

    return {
      finalSourceBal: Math.round(finalSourceBal),
      finalTargetBal: Math.round(finalTargetBal),
      totalFinalValue: Math.round(totalFinalValue),
      totalReturns: Math.round(totalReturns),
      totalTransferred: Math.round(totalTransferred),
      sourceGrowth: Math.round(sourceGrowth),
      targetGrowth: Math.round(targetGrowth),
      stpDurationMonths,
      stpDurationYears,
      lumpsumFinalValue: Math.round(lumpsumFinalValue),
      lumpsumReturns: Math.round(lumpsumReturns),
      stpVsLumpsum: Math.round(stpVsLumpsum),
      sourceOnlyFinalValue: Math.round(sourceOnlyFinalValue),
      stpVsSourceOnly: Math.round(totalFinalValue - sourceOnlyFinalValue),
      yearSnapshots: monthlyData,
      wealthMultiplier:
        totalAmount > 0
          ? Math.round((totalFinalValue / totalAmount) * 100) / 100
          : 0,
    };
  }, [totalAmount, monthlyTransfer, sourceReturn, targetReturn, timePeriod]);

  // Presets
  const presets = [
    { label: "₹5L | ₹25K/mo | 7% → 12%", a: 500000, m: 25000, s: 7, t: 12, y: 15 },
    { label: "₹10L | ₹50K/mo | 7% → 12%", a: 1000000, m: 50000, s: 7, t: 12, y: 20 },
    { label: "₹25L | ₹1L/mo | 6% → 12%", a: 2500000, m: 100000, s: 6, t: 12, y: 20 },
    { label: "₹50L | ₹2L/mo | 6% → 12%", a: 5000000, m: 200000, s: 6, t: 12, y: 25 },
  ];

  // Other calculators
  const otherCalculators = [
    { name: "SIP Calculator", path: "/calculators/sip" },
    { name: "Step Up SIP", path: "/calculators/step-up-sip" },
    { name: "Lumpsum", path: "/calculators/lumpsum" },
    { name: "SWP Calculator", path: "/calculators/swp" },
    { name: "Retirement", path: "/calculators/retirement" },
    { name: "EMI Calculator", path: "/calculators/emi" },
  ];

  // FAQs
  const faqs = [
    {
      question: "What is STP (Systematic Transfer Plan)?",
      answer:
        "STP is a facility where a fixed amount is automatically transferred from one mutual fund (usually a debt/liquid fund) to another fund (usually equity) at regular intervals. It combines safety of debt funds with growth potential of equity funds.",
    },
    {
      question: "How is STP different from lumpsum investing in equity?",
      answer:
        "In STP, your lumpsum first goes into a lower-risk source fund (like a liquid fund) and is gradually transferred to the target equity fund. This averages out your purchase price in the equity fund and reduces the risk of investing everything at a market peak.",
    },
    {
      question: "Who should use STP?",
      answer:
        "STP is ideal for investors who have a lumpsum (like a bonus, maturity proceeds, or inheritance) but are concerned about market volatility. Instead of investing everything at once, STP helps gradually deploy funds into equity over 6-24 months.",
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
              <Link to="/" className="hover:text-white/80 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to="/calculators" className="hover:text-white/80 transition-colors">Calculators</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-emerald-300/80">STP</span>
            </motion.div>

            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 mb-5"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-xs font-medium text-white/80">STP Calculator</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            >
              Smart Fund{" "}
              <span
                className="italic bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Transfer Planning
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed"
            >
              Calculate how a Systematic Transfer Plan (STP) helps you
              gradually move funds from a safer source to higher-growth
              investments.
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
                  {/* Total Amount */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <Wallet className="w-3.5 h-3.5 text-emerald-600" />
                        Total Lumpsum Amount
                      </label>
                      <div className="flex items-center bg-emerald-50 rounded-lg px-2.5 py-1">
                        <IndianRupee className="w-3 h-3 text-emerald-600" />
                        <input
                          type="number"
                          value={totalAmount}
                          onChange={(e) => setTotalAmount(Number(e.target.value) || 0)}
                          className="w-24 bg-transparent text-right font-semibold text-emerald-700 focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="100000"
                      max="50000000"
                      step="50000"
                      value={totalAmount}
                      onChange={(e) => setTotalAmount(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-emerald"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>₹1L</span>
                      <span>₹5Cr</span>
                    </div>
                  </div>

                  {/* Monthly Transfer */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <ArrowRightLeft className="w-3.5 h-3.5 text-orange-500" />
                        Monthly Transfer Amount
                      </label>
                      <div className="flex items-center bg-orange-50 rounded-lg px-2.5 py-1">
                        <IndianRupee className="w-3 h-3 text-orange-600" />
                        <input
                          type="number"
                          value={monthlyTransfer}
                          onChange={(e) => setMonthlyTransfer(Number(e.target.value) || 0)}
                          className="w-20 bg-transparent text-right font-semibold text-orange-700 focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="500000"
                      step="1000"
                      value={monthlyTransfer}
                      onChange={(e) => setMonthlyTransfer(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-orange"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>₹1K</span>
                      <span>₹5L</span>
                    </div>
                  </div>

                  {/* Source Return */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-blue-600" />
                        Source Fund Return (p.a.)
                        <span className="text-[10px] text-gray-400 font-normal">(Debt/Liquid)</span>
                      </label>
                      <div className="flex items-center bg-blue-50 rounded-lg px-2.5 py-1">
                        <input
                          type="number"
                          value={sourceReturn}
                          onChange={(e) => setSourceReturn(Number(e.target.value) || 0)}
                          className="w-12 bg-transparent text-right font-semibold text-blue-700 focus:outline-none text-sm"
                          step="0.5"
                        />
                        <Percent className="w-3 h-3 text-blue-600 ml-0.5" />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      step="0.5"
                      value={sourceReturn}
                      onChange={(e) => setSourceReturn(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>1%</span>
                      <span>15%</span>
                    </div>
                  </div>

                  {/* Target Return */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-cyan-600" />
                        Target Fund Return (p.a.)
                        <span className="text-[10px] text-gray-400 font-normal">(Equity)</span>
                      </label>
                      <div className="flex items-center bg-cyan-50 rounded-lg px-2.5 py-1">
                        <input
                          type="number"
                          value={targetReturn}
                          onChange={(e) => setTargetReturn(Number(e.target.value) || 0)}
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
                      value={targetReturn}
                      onChange={(e) => setTargetReturn(Number(e.target.value))}
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
                        <Calendar className="w-3.5 h-3.5 text-purple-600" />
                        Investment Horizon
                      </label>
                      <div className="flex items-center bg-purple-50 rounded-lg px-2.5 py-1">
                        <input
                          type="number"
                          value={timePeriod}
                          onChange={(e) => setTimePeriod(Math.max(Number(e.target.value) || 1, 1))}
                          className="w-10 bg-transparent text-right font-semibold text-purple-700 focus:outline-none text-sm"
                        />
                        <span className="text-purple-600 ml-1 text-xs font-medium">Yrs</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="40"
                      step="1"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-purple"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>1 Yr</span>
                      <span>40 Yrs</span>
                    </div>
                  </div>
                </div>

                {/* Presets */}
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-3 font-medium">Quick Presets:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {presets.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setTotalAmount(preset.a);
                          setMonthlyTransfer(preset.m);
                          setSourceReturn(preset.s);
                          setTargetReturn(preset.t);
                          setTimePeriod(preset.y);
                        }}
                        className="px-3 py-2 text-xs font-medium bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors text-left border border-gray-100 hover:border-emerald-200"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* STP Duration Info */}
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <div className="bg-cyan-50 rounded-xl p-3.5 border border-cyan-100">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Zap className="w-3.5 h-3.5 text-cyan-600" />
                      <p className="text-xs font-bold text-cyan-800">STP Duration</p>
                    </div>
                    <p className="text-[10px] sm:text-xs text-cyan-700">
                      At <span className="font-bold">{formatCurrency(monthlyTransfer)}/month</span>, your{" "}
                      <span className="font-bold">{formatCurrency(totalAmount)}</span> will be fully transferred in approximately{" "}
                      <span className="font-bold">{calculations.stpDurationYears} years</span>{" "}
                      ({calculations.stpDurationMonths} months).
                    </p>
                  </div>
                </div>
              </div>

              {/* ===== RESULTS (3 cols) ===== */}
              <div className="lg:col-span-3 p-4 sm:p-6 lg:p-8">
                {/* Main Result */}
                <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-500 rounded-2xl p-4 sm:p-5 text-white mb-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                      <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                        Total Portfolio Value after {timePeriod} years
                      </p>
                    </div>
                    <motion.div
                      key={calculations.totalFinalValue}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1"
                    >
                      {formatCurrency(calculations.totalFinalValue)}
                    </motion.div>
                    <p className="text-xs sm:text-sm text-emerald-100">
                      Wealth multiplier:{" "}
                      <span className="font-bold text-white">{calculations.wealthMultiplier}x</span>
                    </p>
                  </div>
                </div>

                {/* Fund Split */}
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
                  {/* Source Fund */}
                  <div className="bg-blue-50 rounded-2xl p-4 sm:p-5 border border-blue-100">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-blue-800">Source Fund</p>
                        <p className="text-[10px] text-blue-500">Debt / Liquid</p>
                      </div>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-blue-700 mb-3">
                      {formatCurrency(calculations.finalSourceBal)}
                    </p>
                    <div className="space-y-1 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Initial</span>
                        <span className="font-medium text-gray-700">{formatCurrency(totalAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Transferred Out</span>
                        <span className="font-medium text-blue-600">
                          -{formatCurrency(calculations.totalTransferred)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Return ({sourceReturn}% p.a.)</span>
                        <span className="font-medium text-blue-600">+{formatCurrency(calculations.sourceGrowth)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Target Fund */}
                  <div className="bg-emerald-50 rounded-2xl p-4 sm:p-5 border border-emerald-100">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-emerald-800">Target Fund</p>
                        <p className="text-[10px] text-emerald-500">Equity</p>
                      </div>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-emerald-700 mb-3">
                      {formatCurrency(calculations.finalTargetBal)}
                    </p>
                    <div className="space-y-1 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Received from Source</span>
                        <span className="font-medium text-gray-700">
                          {formatCurrency(calculations.totalTransferred)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Return ({targetReturn}% p.a.)</span>
                        <span className="font-medium text-emerald-600">
                          +{formatCurrency(calculations.targetGrowth)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strategy Comparison */}
                <div className="bg-white rounded-xl p-4 border border-gray-100 mb-5">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-emerald-600" />
                    Strategy Comparison ({timePeriod} years)
                  </h3>

                  {[
                    {
                      label: "STP (This Plan)",
                      value: calculations.totalFinalValue,
                      color: "bg-emerald-500",
                      textColor: "text-emerald-700",
                      badge: "Recommended",
                      badgeColor: "bg-emerald-100 text-emerald-700",
                    },
                    {
                      label: "Lumpsum (All in Equity)",
                      value: calculations.lumpsumFinalValue,
                      color: "bg-cyan-400",
                      textColor: "text-cyan-700",
                      badge: null,
                    },
                    {
                      label: "Source Only (No Transfer)",
                      value: calculations.sourceOnlyFinalValue,
                      color: "bg-gray-300",
                      textColor: "text-gray-600",
                      badge: null,
                    },
                  ].map((item, i) => {
                    const maxVal = Math.max(
                      calculations.totalFinalValue,
                      calculations.lumpsumFinalValue,
                      calculations.sourceOnlyFinalValue
                    );
                    const width = maxVal > 0 ? (item.value / maxVal) * 100 : 0;
                    return (
                      <div key={i} className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] sm:text-xs text-gray-700 font-medium">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${item.badgeColor}`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <span className={`text-[10px] sm:text-xs font-bold ${item.textColor}`}>
                            {formatCurrency(item.value)}
                          </span>
                        </div>
                        <div className="h-4 sm:h-5 bg-gray-100 rounded-lg overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${width}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className={`h-full ${item.color} rounded-lg`}
                          />
                        </div>
                      </div>
                    );
                  })}

                  <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400">STP vs Source Only</p>
                      <p className={`text-xs sm:text-sm font-bold ${calculations.stpVsSourceOnly >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        {calculations.stpVsSourceOnly >= 0 ? "+" : ""}{formatCurrency(calculations.stpVsSourceOnly)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400">STP vs Lumpsum</p>
                      <p className={`text-xs sm:text-sm font-bold ${calculations.stpVsLumpsum >= 0 ? "text-emerald-600" : "text-orange-500"}`}>
                        {calculations.stpVsLumpsum >= 0 ? "+" : ""}{formatCurrency(calculations.stpVsLumpsum)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">
                    Need help structuring your STP for optimal returns?
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

      {/* ================= YEAR-WISE TABLE ================= */}
      <section className="py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6"
          >
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              Year-wise Portfolio Snapshot
            </h3>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full min-w-[520px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                      Year
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-blue-600">
                      Source Fund
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-emerald-600">
                      Target Fund
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                      Total Value
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                      Transferred
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.yearSnapshots.map((row, index) => (
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
                      <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right text-blue-600 font-medium">
                        {formatCurrency(row.sourceBal)}
                      </td>
                      <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right text-emerald-600 font-medium">
                        {formatCurrency(row.targetBal)}
                      </td>
                      <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right font-bold text-gray-900">
                        {formatCurrency(row.totalValue)}
                      </td>
                      <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right text-gray-500">
                        {formatCurrency(row.totalTransferred)}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= INFO CARDS ================= */}
      <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* How STP works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <ArrowRightLeft className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  How STP Works
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                Your lumpsum first goes into a stable source fund (like a liquid or debt fund). A fixed amount is then automatically transferred monthly to a target equity fund — similar to a SIP, but funded from your own corpus.
              </p>
              <div className="bg-emerald-50 rounded-xl p-3">
                <p className="text-xs text-emerald-700 font-medium">
                  Corpus in source fund: earns stable returns. Amount in equity: grows at higher rates over time.
                </p>
              </div>
            </motion.div>

            {/* Why use STP */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-cyan-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  Why Use STP?
                </h3>
              </div>
              <div className="space-y-1.5">
                {[
                  "Reduces market timing risk",
                  "Earns returns while waiting to deploy",
                  "Gradual shift from debt to equity",
                  "Automates rupee cost averaging",
                  "Ideal for large lumpsum deployment",
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-600">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* STP vs alternatives */}
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
                  STP vs Alternatives
                </h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-gray-600">
                <div className="p-2.5 rounded-lg bg-gray-50">
                  <p className="font-semibold text-gray-800 mb-0.5">STP vs Lumpsum</p>
                  <p>Lumpsum can outperform in bull markets. STP is safer and better during uncertain or overvalued markets.</p>
                </div>
                <div className="p-2.5 rounded-lg bg-gray-50">
                  <p className="font-semibold text-gray-800 mb-0.5">STP vs SIP</p>
                  <p>SIP uses fresh savings every month. STP uses a pre-invested corpus — you're deploying existing money, not new savings.</p>
                </div>
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
      <section className="py-8 sm:py-12 bg-gradient-to-b from-emerald-50/30 to-white">
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
                Have a Lumpsum to Deploy Smartly?
              </h2>
              <p className="text-emerald-100/80 text-xs sm:text-sm mb-5 sm:mb-6 max-w-md mx-auto leading-relaxed">
                Our experts will help you design the right STP strategy —
                choosing the right funds, transfer amounts, and timelines
                for your goals.
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
                  to="/calculators/lumpsum"
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-all text-sm w-full xs:w-auto justify-center"
                >
                  Try Lumpsum Calculator
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Slider Styles */}
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
        .slider-emerald::-webkit-slider-thumb { background: linear-gradient(135deg, #10b981, #059669); }
        .slider-orange::-webkit-slider-thumb  { background: linear-gradient(135deg, #f97316, #ea580c); }
        .slider-blue::-webkit-slider-thumb    { background: linear-gradient(135deg, #3b82f6, #2563eb); }
        .slider-cyan::-webkit-slider-thumb    { background: linear-gradient(135deg, #06b6d4, #0891b2); }
        .slider-purple::-webkit-slider-thumb  { background: linear-gradient(135deg, #a855f7, #9333ea); }

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
        .slider-emerald::-moz-range-thumb { background: linear-gradient(135deg, #10b981, #059669); }
        .slider-orange::-moz-range-thumb  { background: linear-gradient(135deg, #f97316, #ea580c); }
        .slider-blue::-moz-range-thumb    { background: linear-gradient(135deg, #3b82f6, #2563eb); }
        .slider-cyan::-moz-range-thumb    { background: linear-gradient(135deg, #06b6d4, #0891b2); }
        .slider-purple::-moz-range-thumb  { background: linear-gradient(135deg, #a855f7, #9333ea); }
      `}</style>
    </div>
  );
};

export default STPCalculator;