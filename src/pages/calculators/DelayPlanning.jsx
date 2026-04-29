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
  Clock,
  CheckCircle,
  Sparkles,
  HelpCircle,
  Info,
  AlertTriangle,
  Timer,
  Ban,
  Zap,
  BarChart3,
} from "lucide-react";

const DelayPlanningCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [totalYears, setTotalYears] = useState(20);
  const [delayYears, setDelayYears] = useState(5);

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
    const P = monthlyInvestment;
    const r = expectedReturn / 100 / 12;

    // If started on time
    const nOnTime = totalYears * 12;
    const corpusOnTime =
      P * ((Math.pow(1 + r, nOnTime) - 1) / r) * (1 + r);
    const investedOnTime = P * nOnTime;
    const returnsOnTime = corpusOnTime - investedOnTime;

    // If delayed
    const effectiveYears = Math.max(totalYears - delayYears, 0);
    const nDelayed = effectiveYears * 12;
    const corpusDelayed =
      nDelayed > 0
        ? P * ((Math.pow(1 + r, nDelayed) - 1) / r) * (1 + r)
        : 0;
    const investedDelayed = P * nDelayed;
    const returnsDelayed = corpusDelayed - investedDelayed;

    // Cost of delay
    const costOfDelay = corpusOnTime - corpusDelayed;
    const costPercentage =
      corpusOnTime > 0 ? (costOfDelay / corpusOnTime) * 100 : 0;

    // Lost investment months
    const lostMonths = delayYears * 12;
    const lostInvestment = P * lostMonths;

    // Lost returns (returns difference)
    const lostReturns = returnsOnTime - returnsDelayed;

    // Additional monthly SIP needed if delayed to match on-time corpus
    let additionalSIPNeeded = 0;
    if (nDelayed > 0 && r > 0) {
      additionalSIPNeeded =
        corpusOnTime /
        (((Math.pow(1 + r, nDelayed) - 1) / r) * (1 + r));
    }
    const extraSIPPerMonth = Math.max(0, additionalSIPNeeded - P);

    // Year-by-year comparison
    const yearlyComparison = [];
    for (let year = 1; year <= totalYears; year++) {
      const nY = year * 12;

      const valueOnTime =
        P * ((Math.pow(1 + r, nY) - 1) / r) * (1 + r);

      const delayedEffectiveYears = Math.max(year - delayYears, 0);
      const nYDelayed = delayedEffectiveYears * 12;
      const valueDelayed =
        nYDelayed > 0
          ? P * ((Math.pow(1 + r, nYDelayed) - 1) / r) * (1 + r)
          : 0;

      yearlyComparison.push({
        year,
        onTime: Math.round(valueOnTime),
        delayed: Math.round(valueDelayed),
        difference: Math.round(valueOnTime - valueDelayed),
      });
    }

    return {
      corpusOnTime: Math.round(corpusOnTime),
      investedOnTime: Math.round(investedOnTime),
      returnsOnTime: Math.round(returnsOnTime),
      corpusDelayed: Math.round(corpusDelayed),
      investedDelayed: Math.round(investedDelayed),
      returnsDelayed: Math.round(returnsDelayed),
      costOfDelay: Math.round(costOfDelay),
      costPercentage: Math.round(costPercentage * 10) / 10,
      lostInvestment: Math.round(lostInvestment),
      lostReturns: Math.round(lostReturns),
      extraSIPPerMonth: Math.round(extraSIPPerMonth),
      additionalSIPNeeded: Math.round(additionalSIPNeeded),
      effectiveYears,
      yearlyComparison,
    };
  }, [monthlyInvestment, expectedReturn, totalYears, delayYears]);

  // Format currency
  const formatCurrency = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const resetCalculator = () => {
    setMonthlyInvestment(10000);
    setExpectedReturn(12);
    setTotalYears(20);
    setDelayYears(5);
  };

  // Quick presets
  const presets = [
    { label: "₹5K / 15Y / 3Y delay", m: 5000, r: 12, t: 15, d: 3 },
    { label: "₹10K / 20Y / 5Y delay", m: 10000, r: 12, t: 20, d: 5 },
    { label: "₹25K / 25Y / 5Y delay", m: 25000, r: 12, t: 25, d: 5 },
    { label: "₹50K / 30Y / 10Y delay", m: 50000, r: 12, t: 30, d: 10 },
  ];

  // Delay scenarios for comparison cards
  const delayScenarios = useMemo(() => {
    const P = monthlyInvestment;
    const r = expectedReturn / 100 / 12;
    const nOnTime = totalYears * 12;
    const corpusOnTime =
      P * ((Math.pow(1 + r, nOnTime) - 1) / r) * (1 + r);

    return [1, 3, 5, 10]
      .filter((d) => d < totalYears)
      .map((d) => {
        const effectiveN = (totalYears - d) * 12;
        const corpus =
          effectiveN > 0
            ? P * ((Math.pow(1 + r, effectiveN) - 1) / r) * (1 + r)
            : 0;
        const loss = corpusOnTime - corpus;
        const lossPercent = corpusOnTime > 0 ? (loss / corpusOnTime) * 100 : 0;
        return {
          delay: d,
          corpus: Math.round(corpus),
          loss: Math.round(loss),
          lossPercent: Math.round(lossPercent * 10) / 10,
        };
      });
  }, [monthlyInvestment, expectedReturn, totalYears]);

  // Other calculators
  const otherCalculators = [
    { name: "Retirement Calculator", path: "/calculators/retirement" },
    { name: "SIP Calculator", path: "/calculators/sip" },
    { name: "Goal Planning", path: "/calculators/goal-planning" },
    { name: "Step Up SIP", path: "/calculators/step-up-sip" },
    { name: "Lumpsum", path: "/calculators/lumpsum" },
    { name: "EMI Calculator", path: "/calculators/emi" },
  ];

  // FAQs
  const faqs = [
    {
      question: "What is the cost of delaying investments?",
      answer:
        "The cost of delay is the difference in corpus you accumulate when you start investing now versus starting later. Due to compounding, even a few years of delay can result in lakhs or crores of lost wealth over long periods.",
    },
    {
      question: "Why does a small delay cause such a big difference?",
      answer:
        "Compounding is exponential. The early years of investing create the foundation that compounds heavily in later years. When you delay, you lose those crucial early compounding years which contribute disproportionately to your final corpus.",
    },
    {
      question: "How can I make up for lost time if I've already delayed?",
      answer:
        "You can increase your monthly SIP amount, opt for a Step Up SIP that increases annually, or invest any lump sum windfalls. Our calculator shows exactly how much extra you need to invest monthly to match the on-time corpus.",
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
              <span className="text-emerald-300/80">Delay Planning</span>
            </motion.div>

            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 mb-5"
            >
              <Timer className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-xs font-medium text-white/80">
                Delay Planning Calculator
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            >
              The Real{" "}
              <span
                className="italic bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Cost of Waiting
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed"
            >
              See how delaying your investments by even a few years can
              significantly impact your wealth creation journey.
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
                  {/* Monthly Investment */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <Wallet className="w-3.5 h-3.5 text-emerald-600" />
                        Monthly SIP
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

                  {/* Investment Horizon */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        Investment Horizon
                      </label>
                      <div className="flex items-center bg-blue-50 rounded-lg px-2.5 py-1">
                        <input
                          type="number"
                          value={totalYears}
                          onChange={(e) =>
                            setTotalYears(
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
                      min="5"
                      max="40"
                      step="1"
                      value={totalYears}
                      onChange={(e) => setTotalYears(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>5 Yrs</span>
                      <span>40 Yrs</span>
                    </div>
                  </div>

                  {/* Delay Period */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <Timer className="w-3.5 h-3.5 text-red-500" />
                        Delay by
                      </label>
                      <div className="flex items-center bg-red-50 rounded-lg px-2.5 py-1">
                        <input
                          type="number"
                          value={delayYears}
                          onChange={(e) =>
                            setDelayYears(
                              Math.min(
                                Math.max(Number(e.target.value) || 0, 0),
                                totalYears - 1
                              )
                            )
                          }
                          className="w-10 bg-transparent text-right font-semibold text-red-700 focus:outline-none text-sm"
                        />
                        <span className="text-red-600 ml-1 text-xs font-medium">
                          Yrs
                        </span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max={Math.max(totalYears - 1, 1)}
                      step="1"
                      value={delayYears}
                      onChange={(e) => setDelayYears(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-red"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>1 Yr</span>
                      <span>{Math.max(totalYears - 1, 1)} Yrs</span>
                    </div>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-3 font-medium">
                    Quick Presets:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {presets.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setMonthlyInvestment(preset.m);
                          setExpectedReturn(preset.r);
                          setTotalYears(preset.t);
                          setDelayYears(preset.d);
                        }}
                        className="px-3 py-2 text-xs font-medium bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors text-left border border-gray-100 hover:border-emerald-200"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ===== RESULTS (3 cols) ===== */}
              <div className="lg:col-span-3 p-4 sm:p-6 lg:p-8">
                {/* Cost of Delay Highlight */}
                <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-4 sm:p-5 text-white mb-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
                      <p className="text-xs sm:text-sm font-medium text-red-100">
                        Cost of Delaying by {delayYears}{" "}
                        {delayYears === 1 ? "Year" : "Years"}
                      </p>
                    </div>
                    <motion.div
                      key={calculations.costOfDelay}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1"
                    >
                      {formatCurrency(calculations.costOfDelay)}
                    </motion.div>
                    <p className="text-xs sm:text-sm text-red-100">
                      You lose{" "}
                      <span className="font-bold text-white">
                        {calculations.costPercentage}%
                      </span>{" "}
                      of your potential wealth
                    </p>
                  </div>
                </div>

                {/* Side-by-Side Comparison */}
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
                  {/* Start Now */}
                  <div className="bg-emerald-50 rounded-2xl p-4 sm:p-5 border border-emerald-100">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-emerald-800">
                          Start Now
                        </p>
                        <p className="text-[10px] text-emerald-600">
                          {totalYears} years of investing
                        </p>
                      </div>
                    </div>
                    <motion.p
                      key={calculations.corpusOnTime}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xl sm:text-2xl font-bold text-emerald-700 mb-3"
                    >
                      {formatCurrency(calculations.corpusOnTime)}
                    </motion.p>
                    <div className="space-y-1.5 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Invested</span>
                        <span className="font-medium text-gray-800">
                          {formatCurrency(calculations.investedOnTime)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Returns</span>
                        <span className="font-medium text-emerald-600">
                          +{formatCurrency(calculations.returnsOnTime)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Start Late */}
                  <div className="bg-red-50 rounded-2xl p-4 sm:p-5 border border-red-100">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                        <Ban className="w-4 h-4 text-red-500" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-red-800">
                          Delay by {delayYears}Y
                        </p>
                        <p className="text-[10px] text-red-600">
                          {calculations.effectiveYears} years of investing
                        </p>
                      </div>
                    </div>
                    <motion.p
                      key={calculations.corpusDelayed}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xl sm:text-2xl font-bold text-red-700 mb-3"
                    >
                      {formatCurrency(calculations.corpusDelayed)}
                    </motion.p>
                    <div className="space-y-1.5 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Invested</span>
                        <span className="font-medium text-gray-800">
                          {formatCurrency(calculations.investedDelayed)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Returns</span>
                        <span className="font-medium text-red-500">
                          +{formatCurrency(calculations.returnsDelayed)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Impact Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                  <div className="bg-gray-50 rounded-xl p-3 sm:p-4 text-center border border-gray-100">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-1">
                      Lost Investment
                    </p>
                    <p className="text-sm sm:text-base font-bold text-gray-900">
                      {formatCurrency(calculations.lostInvestment)}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 sm:p-4 text-center border border-gray-100">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-1">
                      Lost Returns
                    </p>
                    <p className="text-sm sm:text-base font-bold text-red-600">
                      {formatCurrency(calculations.lostReturns)}
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-3 sm:p-4 text-center border border-orange-100 col-span-2 sm:col-span-1">
                    <p className="text-[10px] sm:text-xs text-orange-600 mb-1">
                      Extra SIP Needed
                    </p>
                    <p className="text-sm sm:text-base font-bold text-orange-700">
                      {formatCurrency(calculations.extraSIPPerMonth)}/mo
                    </p>
                    <p className="text-[10px] text-orange-500 mt-0.5">
                      to match on-time corpus
                    </p>
                  </div>
                </div>

                {/* Visual Bar Comparison */}
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-emerald-600" />
                    Visual Comparison
                  </h3>
                  <div className="space-y-3">
                    {/* On-time bar */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] sm:text-xs text-gray-600 font-medium">
                          Start Now
                        </span>
                        <span className="text-[10px] sm:text-xs font-semibold text-emerald-700">
                          {formatCurrency(calculations.corpusOnTime)}
                        </span>
                      </div>
                      <div className="h-5 sm:h-6 bg-gray-100 rounded-lg overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-lg"
                        />
                      </div>
                    </div>
                    {/* Delayed bar */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] sm:text-xs text-gray-600 font-medium">
                          Delay {delayYears}Y
                        </span>
                        <span className="text-[10px] sm:text-xs font-semibold text-red-600">
                          {formatCurrency(calculations.corpusDelayed)}
                        </span>
                      </div>
                      <div className="h-5 sm:h-6 bg-gray-100 rounded-lg overflow-hidden">
                        <motion.div
                          key={calculations.corpusDelayed}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${
                              calculations.corpusOnTime > 0
                                ? (calculations.corpusDelayed /
                                    calculations.corpusOnTime) *
                                  100
                                : 0
                            }%`,
                          }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-red-300 to-red-400 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-5 bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">
                    Don't let delay cost you. Start your SIP today!
                  </p>
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Start Investing Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DELAY SCENARIOS TABLE ================= */}
      <section className="py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6"
          >
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              Delay Impact Comparison
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-4">
              SIP of {formatCurrency(monthlyInvestment)}/month at{" "}
              {expectedReturn}% for {totalYears} years
            </p>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full min-w-[420px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                      Delay
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                      Corpus
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                      Loss
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                      Loss %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 bg-emerald-50/50">
                    <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-medium text-emerald-700">
                      No Delay ✓
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right font-semibold text-emerald-700">
                      {formatCurrency(calculations.corpusOnTime)}
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right text-emerald-600">
                      —
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right text-emerald-600">
                      0%
                    </td>
                  </tr>
                  {delayScenarios.map((scenario, index) => (
                    <motion.tr
                      key={scenario.delay}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06 }}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        scenario.delay === delayYears ? "bg-red-50/50" : ""
                      }`}
                    >
                      <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-800">
                        {scenario.delay} {scenario.delay === 1 ? "Year" : "Years"}
                        {scenario.delay === delayYears && (
                          <span className="ml-1.5 text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium">
                            Selected
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right text-gray-700">
                        {formatCurrency(scenario.corpus)}
                      </td>
                      <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right text-red-600 font-medium">
                        -{formatCurrency(scenario.loss)}
                      </td>
                      <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right text-red-600 font-medium">
                        {scenario.lossPercent}%
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
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
              Year-wise Growth Comparison
            </h3>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full min-w-[480px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                      Year
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-emerald-600">
                      Start Now
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-red-500">
                      Delay {delayYears}Y
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                      Difference
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.yearlyComparison
                    .filter(
                      (_, i) =>
                        totalYears <= 10 ||
                        i % Math.ceil(totalYears / 10) === 0 ||
                        i === calculations.yearlyComparison.length - 1
                    )
                    .map((row, index) => (
                      <motion.tr
                        key={row.year}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.04 }}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-800">
                          Year {row.year}
                        </td>
                        <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right text-emerald-600 font-medium">
                          {formatCurrency(row.onTime)}
                        </td>
                        <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right text-red-500 font-medium">
                          {row.delayed > 0 ? formatCurrency(row.delayed) : "—"}
                        </td>
                        <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right text-gray-600 font-medium">
                          {row.difference > 0
                            ? `-${formatCurrency(row.difference)}`
                            : "—"}
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
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Power of starting early */}
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
                  Power of Starting Early
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                The first few years of investing create the compounding
                foundation. Starting 5 years earlier can double your final
                corpus because those early investments get the most time to
                compound.
              </p>
              <div className="space-y-1.5">
                {[
                  "Early years compound the most",
                  "Small amounts grow significantly",
                  "Time in the market beats timing",
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

            {/* Cost of procrastination */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  Cost of Procrastination
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                Every year you delay, you don't just lose that year's
                investment — you lose the returns that investment would have
                generated for all future years. The loss compounds just like
                returns do.
              </p>
              <div className="bg-red-50 rounded-xl p-3">
                <p className="text-xs text-red-700 font-medium">
                  A 5-year delay at ₹10,000/month SIP can cost you over ₹50
                  lakhs in a 25-year horizon!
                </p>
              </div>
            </motion.div>

            {/* What you can do */}
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
                  How to Catch Up
                </h3>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-gray-800">1.</span>{" "}
                  Increase your monthly SIP to compensate for the lost
                  compounding years.
                </p>
                <p>
                  <span className="font-semibold text-gray-800">2.</span> Use
                  Step Up SIP — increase SIP by 10-15% annually.
                </p>
                <p>
                  <span className="font-semibold text-gray-800">3.</span>{" "}
                  Deploy any lump sum (bonus, inheritance) immediately into
                  investments.
                </p>
                <p>
                  <span className="font-semibold text-gray-800">4.</span>{" "}
                  Most importantly — start TODAY. The best time was yesterday;
                  the second best is now.
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
                The Best Time to Invest is Now
              </h2>
              <p className="text-emerald-100/80 text-xs sm:text-sm mb-5 sm:mb-6 max-w-md mx-auto leading-relaxed">
                Every day you wait, compounding works a little less in your
                favour. Let our experts help you start your investment
                journey today.
              </p>

              <div className="flex flex-col xs:flex-row items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-all text-sm w-full xs:w-auto justify-center"
                >
                  Start Investing Today
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/calculators/sip"
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-all text-sm w-full xs:w-auto justify-center"
                >
                  Try SIP Calculator
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
        .slider-cyan::-moz-range-thumb {
          background: linear-gradient(135deg, #06b6d4, #0891b2);
        }
        .slider-blue::-moz-range-thumb {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }
        .slider-red::-moz-range-thumb {
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }
      `}</style>
    </div>
  );
};

export default DelayPlanningCalculator;