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
  ArrowUpRight,
  Zap,
  PieChart,
} from "lucide-react";

const StepUpSIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [annualStepUp, setAnnualStepUp] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(15);

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
    const r = expectedReturn / 100 / 12; // monthly rate
    const stepUpRate = annualStepUp / 100;

    // --- Step Up SIP ---
    let stepUpCorpus = 0;
    let stepUpInvested = 0;
    let currentSIP = monthlyInvestment;
    const yearlyBreakdown = [];

    for (let year = 1; year <= timePeriod; year++) {
      const sipForThisYear = year === 1 ? monthlyInvestment : currentSIP;

      for (let month = 1; month <= 12; month++) {
        const monthsRemaining = (timePeriod - year) * 12 + (12 - month);
        stepUpCorpus += sipForThisYear * Math.pow(1 + r, monthsRemaining + 1);
        stepUpInvested += sipForThisYear;
      }

      yearlyBreakdown.push({
        year,
        monthlySIP: Math.round(sipForThisYear),
        yearlyInvestment: Math.round(sipForThisYear * 12),
        cumulativeInvested: Math.round(stepUpInvested),
      });

      // Step up for next year
      currentSIP = sipForThisYear * (1 + stepUpRate);
    }

    const stepUpReturns = stepUpCorpus - stepUpInvested;

    // --- Normal SIP (no step-up) for comparison ---
    const nNormal = timePeriod * 12;
    const normalCorpus =
      monthlyInvestment * ((Math.pow(1 + r, nNormal) - 1) / r) * (1 + r);
    const normalInvested = monthlyInvestment * nNormal;
    const normalReturns = normalCorpus - normalInvested;

    // --- Advantage ---
    const extraCorpus = stepUpCorpus - normalCorpus;
    const extraPercentage = normalCorpus > 0 ? (extraCorpus / normalCorpus) * 100 : 0;
    const extraInvested = stepUpInvested - normalInvested;
    const extraReturns = stepUpReturns - normalReturns;

    // Final monthly SIP (last year)
    const finalMonthlySIP =
      monthlyInvestment * Math.pow(1 + stepUpRate, timePeriod - 1);

    // Compute cumulative values for yearly breakdown table
    let cumulativeStepUp = 0;
    let cumulativeNormal = 0;
    let cumulativeStepUpInvested = 0;
    let cumulativeNormalInvested = 0;
    const yearlyComparison = [];

    let sipAmount = monthlyInvestment;
    for (let year = 1; year <= timePeriod; year++) {
      // Step-up
      for (let m = 0; m < 12; m++) {
        const monthsLeft = (timePeriod - year) * 12 + (12 - m - 1);
        cumulativeStepUp += sipAmount * Math.pow(1 + r, monthsLeft + 1);
        cumulativeStepUpInvested += sipAmount;
      }

      // Normal
      for (let m = 0; m < 12; m++) {
        const monthsLeft = (timePeriod - year) * 12 + (12 - m - 1);
        cumulativeNormal +=
          monthlyInvestment * Math.pow(1 + r, monthsLeft + 1);
        cumulativeNormalInvested += monthlyInvestment;
      }

      yearlyComparison.push({
        year,
        sipAmount: Math.round(sipAmount),
        stepUpValue: Math.round(cumulativeStepUp),
        normalValue: Math.round(cumulativeNormal),
        difference: Math.round(cumulativeStepUp - cumulativeNormal),
      });

      sipAmount = sipAmount * (1 + stepUpRate);
    }

    return {
      stepUpCorpus: Math.round(stepUpCorpus),
      stepUpInvested: Math.round(stepUpInvested),
      stepUpReturns: Math.round(stepUpReturns),
      normalCorpus: Math.round(normalCorpus),
      normalInvested: Math.round(normalInvested),
      normalReturns: Math.round(normalReturns),
      extraCorpus: Math.round(extraCorpus),
      extraPercentage: Math.round(extraPercentage * 10) / 10,
      extraInvested: Math.round(extraInvested),
      extraReturns: Math.round(extraReturns),
      finalMonthlySIP: Math.round(finalMonthlySIP),
      yearlyBreakdown,
      yearlyComparison,
    };
  }, [monthlyInvestment, annualStepUp, expectedReturn, timePeriod]);

  // Format currency
  const formatCurrency = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const resetCalculator = () => {
    setMonthlyInvestment(10000);
    setAnnualStepUp(10);
    setExpectedReturn(12);
    setTimePeriod(15);
  };

  // Presets
  const presets = [
    { label: "₹5K / 10% / 10Y", m: 5000, s: 10, r: 12, t: 10 },
    { label: "₹10K / 10% / 15Y", m: 10000, s: 10, r: 12, t: 15 },
    { label: "₹15K / 15% / 20Y", m: 15000, s: 15, r: 12, t: 20 },
    { label: "₹25K / 10% / 25Y", m: 25000, s: 10, r: 12, t: 25 },
  ];

  // Other calculators
  const otherCalculators = [
    { name: "Retirement Calculator", path: "/calculators/retirement" },
    { name: "Delay Planning", path: "/calculators/delay-planning" },
    { name: "Goal Planning", path: "/calculators/goal-planning" },
    { name: "SIP Calculator", path: "/calculators/sip" },
    { name: "Lumpsum", path: "/calculators/lumpsum" },
    { name: "EMI Calculator", path: "/calculators/emi" },
  ];

  // FAQs
  const faqs = [
    {
      question: "What is a Step Up SIP?",
      answer:
        "A Step Up SIP (also called Top-Up SIP) allows you to increase your SIP amount by a fixed percentage every year. For example, if you start with ₹10,000/month and step up by 10% annually, your SIP becomes ₹11,000 in year 2, ₹12,100 in year 3, and so on.",
    },
    {
      question: "How much should I step up my SIP annually?",
      answer:
        "A good rule of thumb is to step up your SIP by at least the inflation rate (6-7%). Ideally, align it with your expected salary increment — typically 8-15%. Even a 10% annual step-up can dramatically boost your final corpus.",
    },
    {
      question: "Is Step Up SIP better than regular SIP?",
      answer:
        "Yes, for most investors. Step Up SIP mirrors real life where your income grows over time. It helps you invest more as you earn more, significantly accelerating wealth creation through higher compounding. The extra corpus can be 40-80% more over 15-20 years.",
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
              <Link to="/" className="hover:text-white/80 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to="/calculators" className="hover:text-white/80 transition-colors">
                Calculators
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-emerald-300/80">Step Up SIP</span>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 mb-5"
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-xs font-medium text-white/80">
                Step Up SIP Calculator
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            >
              Accelerate Your{" "}
              <span
                className="italic bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Wealth Creation
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed"
            >
              See how increasing your SIP by a small percentage each year can
              dramatically boost your final corpus.
            </motion.p>
          </motion.div>
        </div>

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
                  {/* Monthly Investment */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <Wallet className="w-3.5 h-3.5 text-emerald-600" />
                        Starting Monthly SIP
                      </label>
                      <div className="flex items-center bg-emerald-50 rounded-lg px-2.5 py-1">
                        <IndianRupee className="w-3 h-3 text-emerald-600" />
                        <input
                          type="number"
                          value={monthlyInvestment}
                          onChange={(e) =>
                            setMonthlyInvestment(Number(e.target.value) || 0)
                          }
                          className="w-20 bg-transparent text-right font-semibold text-emerald-700 focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="200000"
                      step="500"
                      value={monthlyInvestment}
                      onChange={(e) =>
                        setMonthlyInvestment(Number(e.target.value))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-emerald"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>₹500</span>
                      <span>₹2,00,000</span>
                    </div>
                  </div>

                  {/* Annual Step Up */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <ArrowUpRight className="w-3.5 h-3.5 text-orange-500" />
                        Annual Step Up
                      </label>
                      <div className="flex items-center bg-orange-50 rounded-lg px-2.5 py-1">
                        <input
                          type="number"
                          value={annualStepUp}
                          onChange={(e) =>
                            setAnnualStepUp(Number(e.target.value) || 0)
                          }
                          className="w-12 bg-transparent text-right font-semibold text-orange-700 focus:outline-none text-sm"
                          step="1"
                        />
                        <Percent className="w-3 h-3 text-orange-500 ml-0.5" />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      step="1"
                      value={annualStepUp}
                      onChange={(e) => setAnnualStepUp(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-orange"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>5%</span>
                      <span>50%</span>
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
                          onChange={(e) =>
                            setExpectedReturn(Number(e.target.value) || 0)
                          }
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
                      onChange={(e) =>
                        setExpectedReturn(Number(e.target.value))
                      }
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
                          onChange={(e) =>
                            setTimePeriod(
                              Math.max(Number(e.target.value) || 1, 1)
                            )
                          }
                          className="w-10 bg-transparent text-right font-semibold text-blue-700 focus:outline-none text-sm"
                        />
                        <span className="text-blue-600 ml-1 text-xs font-medium">
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
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>1 Yr</span>
                      <span>40 Yrs</span>
                    </div>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-3 font-medium">
                    Quick Presets:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {presets.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setMonthlyInvestment(preset.m);
                          setAnnualStepUp(preset.s);
                          setExpectedReturn(preset.r);
                          setTimePeriod(preset.t);
                        }}
                        className="px-3 py-2 text-xs font-medium bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors text-left border border-gray-100 hover:border-emerald-200"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SIP Progression Preview */}
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2.5 font-medium">
                    Your SIP Progression:
                  </p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {calculations.yearlyBreakdown.slice(0, 5).map((item, i) => (
                      <div
                        key={i}
                        className="text-center bg-emerald-50 rounded-lg px-2 py-1.5 min-w-[52px]"
                      >
                        <p className="text-[9px] text-gray-400">Y{item.year}</p>
                        <p className="text-[10px] sm:text-xs font-bold text-emerald-700">
                          {formatCurrency(item.monthlySIP)}
                        </p>
                      </div>
                    ))}
                    {timePeriod > 5 && (
                      <>
                        <span className="text-gray-300 text-xs">...</span>
                        <div className="text-center bg-emerald-50 rounded-lg px-2 py-1.5 min-w-[52px]">
                          <p className="text-[9px] text-gray-400">
                            Y{timePeriod}
                          </p>
                          <p className="text-[10px] sm:text-xs font-bold text-emerald-700">
                            {formatCurrency(calculations.finalMonthlySIP)}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* ===== RESULTS (3 cols) ===== */}
              <div className="lg:col-span-3 p-4 sm:p-6 lg:p-8">
                {/* Step Up Advantage Highlight */}
                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-4 sm:p-5 text-white mb-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                      <p className="text-xs sm:text-sm font-medium text-emerald-100">
                        Step Up SIP Advantage
                      </p>
                    </div>
                    <motion.div
                      key={calculations.extraCorpus}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1"
                    >
                      +{formatCurrency(calculations.extraCorpus)}
                    </motion.div>
                    <p className="text-xs sm:text-sm text-emerald-100">
                      <span className="font-bold text-white">
                        {calculations.extraPercentage}% more
                      </span>{" "}
                      corpus compared to regular SIP
                    </p>
                  </div>
                </div>

                {/* Side-by-Side Comparison */}
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
                  {/* Step Up SIP */}
                  <div className="bg-emerald-50 rounded-2xl p-4 sm:p-5 border border-emerald-100">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-emerald-800">
                          Step Up SIP
                        </p>
                        <p className="text-[10px] text-emerald-600">
                          {annualStepUp}% annual increase
                        </p>
                      </div>
                    </div>
                    <motion.p
                      key={calculations.stepUpCorpus}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xl sm:text-2xl font-bold text-emerald-700 mb-3"
                    >
                      {formatCurrency(calculations.stepUpCorpus)}
                    </motion.p>
                    <div className="space-y-1.5 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Invested</span>
                        <span className="font-medium text-gray-800">
                          {formatCurrency(calculations.stepUpInvested)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Returns</span>
                        <span className="font-medium text-emerald-600">
                          +{formatCurrency(calculations.stepUpReturns)}
                        </span>
                      </div>
                      <div className="flex justify-between pt-1.5 border-t border-emerald-200">
                        <span className="text-gray-600">Final SIP/mo</span>
                        <span className="font-medium text-emerald-700">
                          {formatCurrency(calculations.finalMonthlySIP)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Regular SIP */}
                  <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-gray-700">
                          Regular SIP
                        </p>
                        <p className="text-[10px] text-gray-500">No step-up</p>
                      </div>
                    </div>
                    <motion.p
                      key={calculations.normalCorpus}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xl sm:text-2xl font-bold text-gray-600 mb-3"
                    >
                      {formatCurrency(calculations.normalCorpus)}
                    </motion.p>
                    <div className="space-y-1.5 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Invested</span>
                        <span className="font-medium text-gray-700">
                          {formatCurrency(calculations.normalInvested)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Returns</span>
                        <span className="font-medium text-gray-600">
                          +{formatCurrency(calculations.normalReturns)}
                        </span>
                      </div>
                      <div className="flex justify-between pt-1.5 border-t border-gray-200">
                        <span className="text-gray-500">SIP/mo</span>
                        <span className="font-medium text-gray-600">
                          {formatCurrency(monthlyInvestment)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Extra Breakdown */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
                  <div className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-100">
                    <p className="text-[10px] sm:text-xs text-emerald-600 mb-1">
                      Extra Invested
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-emerald-700">
                      {formatCurrency(calculations.extraInvested)}
                    </p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-100">
                    <p className="text-[10px] sm:text-xs text-emerald-600 mb-1">
                      Extra Returns
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-emerald-700">
                      {formatCurrency(calculations.extraReturns)}
                    </p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-100">
                    <p className="text-[10px] sm:text-xs text-emerald-600 mb-1">
                      Wealth Multiplier
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-emerald-700">
                      {calculations.stepUpInvested > 0
                        ? (
                            calculations.stepUpCorpus /
                            calculations.stepUpInvested
                          ).toFixed(1)
                        : 0}
                      x
                    </p>
                  </div>
                </div>

                {/* Visual Bar Comparison */}
                <div className="bg-white rounded-xl p-4 border border-gray-100 mb-5">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-emerald-600" />
                    Visual Comparison
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] sm:text-xs text-gray-600 font-medium">
                          Step Up SIP
                        </span>
                        <span className="text-[10px] sm:text-xs font-semibold text-emerald-700">
                          {formatCurrency(calculations.stepUpCorpus)}
                        </span>
                      </div>
                      <div className="h-5 sm:h-6 bg-gray-100 rounded-lg overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-end pr-2"
                        >
                          <span className="text-[9px] text-white font-medium">
                            100%
                          </span>
                        </motion.div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] sm:text-xs text-gray-600 font-medium">
                          Regular SIP
                        </span>
                        <span className="text-[10px] sm:text-xs font-semibold text-gray-500">
                          {formatCurrency(calculations.normalCorpus)}
                        </span>
                      </div>
                      <div className="h-5 sm:h-6 bg-gray-100 rounded-lg overflow-hidden">
                        <motion.div
                          key={calculations.normalCorpus}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${
                              calculations.stepUpCorpus > 0
                                ? (calculations.normalCorpus /
                                    calculations.stepUpCorpus) *
                                  100
                                : 0
                            }%`,
                          }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full bg-gray-300 rounded-lg flex items-center justify-end pr-2"
                        >
                          <span className="text-[9px] text-gray-600 font-medium">
                            {calculations.stepUpCorpus > 0
                              ? Math.round(
                                  (calculations.normalCorpus /
                                    calculations.stepUpCorpus) *
                                    100
                                )
                              : 0}
                            %
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">
                    Maximize your wealth with Step Up SIP!
                  </p>
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Start Step Up SIP
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= YEAR-WISE COMPARISON TABLE ================= */}
      <section className="py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6"
          >
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              Year-wise Comparison
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-4">
              Step Up SIP vs Regular SIP — {formatCurrency(monthlyInvestment)}
              /month, {annualStepUp}% annual step-up, {expectedReturn}% return
            </p>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full min-w-[520px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                      Year
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                      SIP/Month
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-emerald-600">
                      Step Up Value
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-500">
                      Regular Value
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-emerald-600">
                      Extra
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.yearlyComparison
                    .filter(
                      (_, i) =>
                        timePeriod <= 15 ||
                        i % Math.ceil(timePeriod / 12) === 0 ||
                        i === calculations.yearlyComparison.length - 1
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
                        <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right text-gray-600">
                          {formatCurrency(row.sipAmount)}
                        </td>
                        <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right font-medium text-emerald-600">
                          {formatCurrency(row.stepUpValue)}
                        </td>
                        <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right text-gray-500">
                          {formatCurrency(row.normalValue)}
                        </td>
                        <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right font-medium text-emerald-600">
                          +{formatCurrency(row.difference)}
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
      <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* How Step Up works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  How Step Up SIP Works
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                In a Step Up SIP, your monthly investment increases by a fixed
                percentage every year, mirroring your growing income. This
                simple tweak creates a massive difference over time.
              </p>
              <div className="bg-emerald-50 rounded-xl p-3">
                <p className="text-xs text-emerald-700">
                  <span className="font-bold">Example:</span> ₹10,000/month
                  with 10% step-up becomes ₹11,000 in Year 2, ₹12,100 in
                  Year 3, and so on.
                </p>
              </div>
            </motion.div>

            {/* Why it's powerful */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-orange-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  Why It's So Powerful
                </h3>
              </div>
              <div className="space-y-1.5">
                {[
                  "Matches your growing income trajectory",
                  "Beats inflation automatically",
                  "Dramatically higher corpus (40-80% more)",
                  "Same effort — just automate the increase",
                  "Ideal for long-term goals like retirement",
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-600">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* How to implement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center">
                  <Info className="w-4 h-4 text-cyan-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  How to Implement
                </h3>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-gray-800">1.</span> Most
                  mutual fund platforms offer a "Top-Up" or "Step-Up" option
                  when setting up your SIP.
                </p>
                <p>
                  <span className="font-semibold text-gray-800">2.</span> Set
                  the step-up percentage (10-15% is ideal) and the system
                  automatically increases your SIP yearly.
                </p>
                <p>
                  <span className="font-semibold text-gray-800">3.</span>{" "}
                  Align the step-up with your annual salary increment for a
                  painless increase.
                </p>
                <p>
                  <span className="font-semibold text-gray-800">4.</span>{" "}
                  Review and adjust annually based on your financial situation.
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
                Ready to Supercharge Your SIP?
              </h2>
              <p className="text-emerald-100/80 text-xs sm:text-sm mb-5 sm:mb-6 max-w-md mx-auto leading-relaxed">
                Our experts will help you set up a Step Up SIP strategy
                aligned with your income growth and financial goals.
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
                  to="/calculators/sip"
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-all text-sm w-full xs:w-auto justify-center"
                >
                  Try Regular SIP Calculator
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
        .slider-orange::-webkit-slider-thumb {
          background: linear-gradient(135deg, #f97316, #ea580c);
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
        .slider-orange::-moz-range-thumb {
          background: linear-gradient(135deg, #f97316, #ea580c);
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

export default StepUpSIPCalculator;