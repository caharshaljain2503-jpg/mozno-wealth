import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calculator,
  IndianRupee,
  Percent,
  Calendar,
  ArrowRight,
  Phone,
  ChevronRight,
  RefreshCw,
  Wallet,
  Target,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  HelpCircle,
  Info,
  TrendingUp,
  TrendingDown,
  Download,
} from "lucide-react";

const SWPCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(5000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(30000);
  const [expectedReturn, setExpectedReturn] = useState(10);
  const [timePeriod, setTimePeriod] = useState(20);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  // Currency formatting
  const formatCurrency = (amount) => {
    if (!Number.isFinite(amount)) return "—";
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${Math.round(amount).toLocaleString("en-IN")}`;
  };

  const resetCalculator = () => {
    setInitialInvestment(5000000);
    setMonthlyWithdrawal(30000);
    setExpectedReturn(10);
    setTimePeriod(20);
  };

  // Main SWP computation (monthly compounding + monthly withdrawals at end of month)
  const calculations = useMemo(() => {
    const P0 = Math.max(0, initialInvestment);
    const W = Math.max(0, monthlyWithdrawal);
    const r = Math.max(0, expectedReturn) / 100 / 12; // monthly rate
    const months = Math.max(1, timePeriod) * 12;

    let balance = P0;
    let totalWithdrawn = 0;
    let totalGrowth = 0;
    let depletionMonth = null;

    // For table (year-end snapshots)
    const yearSnapshots = [];

    for (let m = 1; m <= months; m++) {
      const opening = balance;

      // growth for the month
      const growth = opening * r;
      balance = opening + growth;

      // withdraw at end of month
      const withdrawThisMonth = Math.min(W, balance);
      balance = balance - withdrawThisMonth;

      totalWithdrawn += withdrawThisMonth;
      totalGrowth += growth;

      if (depletionMonth === null && opening > 0 && balance <= 0.01) {
        depletionMonth = m;
      }

      if (m % 12 === 0) {
        yearSnapshots.push({
          year: m / 12,
          balance: Math.max(0, balance),
          withdrawn: totalWithdrawn,
          growth: totalGrowth,
        });
      }
    }

    const isSustainable = depletionMonth === null;
    const yearsLasted = depletionMonth ? depletionMonth / 12 : timePeriod;

    // Safe Withdrawal (approx) for given horizon using PV of annuity formula
    // PV = W * (1 - (1+r)^-n)/r  => W = PV * r / (1 - (1+r)^-n)
    let maxSustainableWithdrawal = 0;
    if (r > 0) {
      maxSustainableWithdrawal =
        P0 * r / (1 - Math.pow(1 + r, -months));
    } else {
      maxSustainableWithdrawal = months > 0 ? P0 / months : 0;
    }

    return {
      endingBalance: Math.round(balance),
      totalWithdrawn: Math.round(totalWithdrawn),
      totalGrowth: Math.round(totalGrowth),
      isSustainable,
      depletionMonth,
      yearsLasted: Math.round(yearsLasted * 10) / 10,
      maxSustainableWithdrawal: Math.round(maxSustainableWithdrawal),
      yearSnapshots,
    };
  }, [initialInvestment, monthlyWithdrawal, expectedReturn, timePeriod]);

  // Presets
  const presets = [
    { label: "₹25L | ₹15K/mo | 10% | 20Y", P: 2500000, W: 15000, r: 10, t: 20 },
    { label: "₹50L | ₹30K/mo | 10% | 20Y", P: 5000000, W: 30000, r: 10, t: 20 },
    { label: "₹1Cr | ₹60K/mo | 10% | 25Y", P: 10000000, W: 60000, r: 10, t: 25 },
    { label: "₹2Cr | ₹1L/mo | 10% | 25Y", P: 20000000, W: 100000, r: 10, t: 25 },
  ];

  // Other calculators (client list only)
  const otherCalculators = [
    { name: "Retirement Calculator", path: "/calculators/retirement" },
    { name: "Delay Planning", path: "/calculators/delay-planning" },
    { name: "Goal Planning", path: "/calculators/goal-planning" },
    { name: "SIP Calculator", path: "/calculators/sip" },
    { name: "Step Up SIP", path: "/calculators/step-up-sip" },
    { name: "Lumpsum", path: "/calculators/lumpsum" },
    { name: "STP Calculator", path: "/calculators/stp" },
    { name: "EMI Calculator", path: "/calculators/emi" },
  ];

  const faqs = [
    {
      question: "What is SWP?",
      answer:
        "SWP (Systematic Withdrawal Plan) lets you withdraw a fixed amount regularly from your mutual fund or investment corpus. It is commonly used to create monthly income from retirement or long-term investments.",
    },
    {
      question: "Will my corpus last forever in SWP?",
      answer:
        "It depends on your withdrawal amount, expected return, and time horizon. If withdrawals are too high compared to growth, the corpus will deplete early. This calculator shows if your plan is sustainable for the chosen duration.",
    },
    {
      question: "What is a sustainable withdrawal amount?",
      answer:
        "A sustainable withdrawal is one that allows your corpus to last for your planned horizon. This calculator estimates the maximum withdrawal that can last for your selected duration, based on the return assumption.",
    },
  ];

  const utilization =
    initialInvestment > 0
      ? Math.min(100, (calculations.totalWithdrawn / initialInvestment) * 100)
      : 0;

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
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-1.5 text-white/50 text-xs sm:text-sm mb-4 sm:mb-6">
              <Link to="/" className="hover:text-white/80 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to="/calculators" className="hover:text-white/80 transition-colors">Calculators</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-emerald-300/80">SWP</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 mb-5">
              <Wallet className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-xs font-medium text-white/80">SWP Calculator</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Create Regular{" "}
              <span
                className="italic bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Income
              </span>{" "}
              From Your Corpus
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-sm sm:text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              Plan systematic withdrawals and see how long your corpus may last based on return assumptions.
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
            {/* Header */}
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
              {/* Inputs */}
              <div className="lg:col-span-2 p-4 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
                <div className="space-y-5">
                  {/* Initial Investment */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <Wallet className="w-3.5 h-3.5 text-emerald-600" />
                        Initial Investment (Corpus)
                      </label>
                      <div className="flex items-center bg-emerald-50 rounded-lg px-2.5 py-1">
                        <IndianRupee className="w-3 h-3 text-emerald-600" />
                        <input
                          type="number"
                          value={initialInvestment}
                          onChange={(e) => setInitialInvestment(Number(e.target.value) || 0)}
                          className="w-24 bg-transparent text-right font-semibold text-emerald-700 focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="100000"
                      max="50000000"
                      step="100000"
                      value={initialInvestment}
                      onChange={(e) => setInitialInvestment(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-emerald"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>₹1L</span>
                      <span>₹5Cr</span>
                    </div>
                  </div>

                  {/* Monthly Withdrawal */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <IndianRupee className="w-3.5 h-3.5 text-orange-600" />
                        Monthly Withdrawal
                      </label>
                      <div className="flex items-center bg-orange-50 rounded-lg px-2.5 py-1">
                        <IndianRupee className="w-3 h-3 text-orange-600" />
                        <input
                          type="number"
                          value={monthlyWithdrawal}
                          onChange={(e) => setMonthlyWithdrawal(Number(e.target.value) || 0)}
                          className="w-20 bg-transparent text-right font-semibold text-orange-700 focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="500000"
                      step="500"
                      value={monthlyWithdrawal}
                      onChange={(e) => setMonthlyWithdrawal(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-orange"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>₹1K</span>
                      <span>₹5L</span>
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
                      max="20"
                      step="0.5"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-cyan"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>1%</span>
                      <span>20%</span>
                    </div>
                  </div>

                  {/* Time Period */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        Withdrawal Period
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

                {/* Presets */}
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-3 font-medium">Quick Presets:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {presets.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setInitialInvestment(p.P);
                          setMonthlyWithdrawal(p.W);
                          setExpectedReturn(p.r);
                          setTimePeriod(p.t);
                        }}
                        className="px-3 py-2 text-xs font-medium bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors text-left border border-gray-100 hover:border-emerald-200"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hint card */}
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <div className="bg-cyan-50 rounded-xl p-3.5 border border-cyan-100">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Info className="w-3.5 h-3.5 text-cyan-600" />
                      <p className="text-xs font-bold text-cyan-800">Tip</p>
                    </div>
                    <p className="text-[10px] sm:text-xs text-cyan-700">
                      If your withdrawal is higher than the sustainable level, your corpus may deplete early. Try lowering withdrawals or increasing the return assumption (carefully).
                    </p>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="lg:col-span-3 p-4 sm:p-6 lg:p-8">
                {/* Status */}
                <div
                  className={`rounded-2xl p-4 sm:p-5 mb-5 border relative overflow-hidden ${
                    calculations.isSustainable
                      ? "bg-emerald-50 border-emerald-100"
                      : "bg-red-50 border-red-100"
                  }`}
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-black/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <div className="relative z-10 flex items-start gap-3">
                    {calculations.isSustainable ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p
                        className={`text-sm sm:text-base font-bold ${
                          calculations.isSustainable ? "text-emerald-800" : "text-red-800"
                        }`}
                      >
                        {calculations.isSustainable
                          ? "Your SWP looks sustainable for the selected period"
                          : "Your corpus may deplete before the selected period"}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-600 mt-1">
                        {calculations.isSustainable
                          ? `Estimated ending balance after ${timePeriod} years: ${formatCurrency(
                              calculations.endingBalance
                            )}`
                          : `Estimated corpus lasts about ${calculations.yearsLasted} years (depletes around month ${
                              calculations.depletionMonth
                            }).`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Main result card */}
                <div className="bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-600 rounded-2xl p-4 sm:p-6 text-white mb-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                      <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                        Total Withdrawn (over {timePeriod} years)
                      </p>
                    </div>
                    <motion.div
                      key={calculations.totalWithdrawn}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1"
                    >
                      {formatCurrency(calculations.totalWithdrawn)}
                    </motion.div>
                    <p className="text-xs sm:text-sm text-emerald-100">
                      Monthly income: <span className="font-bold text-white">{formatCurrency(monthlyWithdrawal)}</span>
                    </p>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-5">
                  <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Corpus</p>
                    <p className="text-xs sm:text-sm font-bold text-gray-900">
                      {formatCurrency(initialInvestment)}
                    </p>
                  </div>
                  <div className="bg-cyan-50 rounded-xl p-3 text-center border border-cyan-100">
                    <p className="text-[10px] sm:text-xs text-cyan-600 mb-1">Total Growth</p>
                    <p className="text-xs sm:text-sm font-bold text-cyan-700">
                      +{formatCurrency(calculations.totalGrowth)}
                    </p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-100">
                    <p className="text-[10px] sm:text-xs text-emerald-600 mb-1">Ending Balance</p>
                    <p className="text-xs sm:text-sm font-bold text-emerald-700">
                      {formatCurrency(calculations.endingBalance)}
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-3 text-center border border-orange-100">
                    <p className="text-[10px] sm:text-xs text-orange-600 mb-1">Max SWP (est.)</p>
                    <p className="text-xs sm:text-sm font-bold text-orange-700">
                      {formatCurrency(calculations.maxSustainableWithdrawal)}/mo
                    </p>
                  </div>
                </div>

                {/* Utilization bar */}
                <div className="bg-white rounded-xl p-4 border border-gray-100 mb-5">
                  <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 mb-2">
                    <span>Withdrawals vs Initial Corpus</span>
                    <span>{utilization.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${utilization}%` }}
                      transition={{ duration: 0.7 }}
                      className="h-full bg-gradient-to-r from-emerald-400 to-teal-500"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 mt-2">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">
                    Want a withdrawal strategy aligned with your goals and risk profile?
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
      <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                Year-wise Summary
              </h3>
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-100 transition-colors"
                onClick={() => {
                  // optional: wire this to CSV export later
                  alert("Hook this button to CSV/PDF export if needed.");
                }}
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full min-w-[560px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                      Year
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                      Withdrawn (Total)
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-cyan-700">
                      Growth (Total)
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-emerald-700">
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.yearSnapshots.map((row, idx) => (
                    <motion.tr
                      key={row.year}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.04 }}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        row.year === timePeriod ? "bg-emerald-50/60" : ""
                      }`}
                    >
                      <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-800">
                        Year {row.year}
                      </td>
                      <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right text-gray-600">
                        {formatCurrency(row.withdrawn)}
                      </td>
                      <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right font-medium text-cyan-700">
                        +{formatCurrency(row.growth)}
                      </td>
                      <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right font-bold text-emerald-700">
                        {formatCurrency(row.balance)}
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  SWP Use Cases
                </h3>
              </div>
              <div className="space-y-1.5">
                {[
                  "Retirement income planning",
                  "Monthly cash flow from investments",
                  "Scholarship / education payouts",
                  "Creating income from lumpsum corpus",
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-600">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  Risk to Watch
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                High withdrawals can deplete the corpus faster, especially in volatile markets (sequence of returns risk).
              </p>
              <div className="bg-orange-50 rounded-xl p-3">
                <p className="text-xs text-orange-700 font-medium">
                  Tip: Keep withdrawals conservative and review yearly based on market conditions.
                </p>
              </div>
            </motion.div>

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
                  How SWP is Calculated
                </h3>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-gray-800">1.</span> Your corpus grows monthly at the assumed return rate.
                </p>
                <p>
                  <span className="font-semibold text-gray-800">2.</span> A fixed withdrawal is deducted every month.
                </p>
                <p>
                  <span className="font-semibold text-gray-800">3.</span> The calculator simulates month-by-month to estimate how long the corpus lasts.
                </p>
                <p className="text-gray-500 italic">
                  Results are estimates; actual returns vary.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FAQs ================= */}
      <section className="py-8 sm:py-12 bg-gradient-to-b from-emerald-50/30 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Frequently Asked{" "}
              <span className="italic text-emerald-600" style={{ fontFamily: "Playfair Display, serif" }}>
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-5 sm:mb-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              Try Other{" "}
              <span className="italic text-emerald-600" style={{ fontFamily: "Playfair Display, serif" }}>
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
                Need a Withdrawal Strategy?
              </h2>
              <p className="text-emerald-100/80 text-xs sm:text-sm mb-5 sm:mb-6 max-w-md mx-auto leading-relaxed">
                SWP is powerful, but withdrawal amount and asset allocation matter. Get a plan that balances income and longevity of corpus.
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
                  to="/calculators/retirement"
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-all text-sm w-full xs:w-auto justify-center"
                >
                  Try Retirement Calculator
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Slider styles */}
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

export default SWPCalculator;