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
  RefreshCw,
  Target,
  Wallet,
  Home,
  Car,
  GraduationCap,
  Briefcase,
  Building2,
} from "lucide-react";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);

  // EMI Calculation
  const calculations = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 100 / 12;
    const n = loanTenure * 12;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      principal: P,
    };
  }, [loanAmount, interestRate, loanTenure]);

  // Format currency
  const formatCurrency = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const resetCalculator = () => {
    setLoanAmount(2500000);
    setInterestRate(8.5);
    setLoanTenure(20);
  };

  // Loan presets
  const loanPresets = [
    { label: "Home Loan", icon: Home, amount: 5000000, rate: 8.5, tenure: 20 },
    { label: "Car Loan", icon: Car, amount: 800000, rate: 9.5, tenure: 5 },
    {
      label: "Education",
      icon: GraduationCap,
      amount: 1500000,
      rate: 10,
      tenure: 7,
    },
    { label: "Personal", icon: Briefcase, amount: 500000, rate: 12, tenure: 3 },
  ];

  // Other calculators
  const otherCalculators = [
    { name: "SIP Calculator", path: "/calculators/sip" },
    { name: "Retirement", path: "/calculators/retirement" },
    { name: "Tax Calculator", path: "/calculators/tax" },
    { name: "Goal Planning", path: "/calculators/goal-planning" },
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
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
    <section className="relative overflow-hidden pb-10 sm:pb-14 md:pb-20 lg:pb-24 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-cyan-900" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80')] opacity-10 bg-cover bg-center" />
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
              <Link
                to="/calculators"
                className="hover:text-white transition-colors"
              >
                Calculators
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-emerald-300">EMI Calculator</span>
            </motion.div>

            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6"
            >
              <Calculator className="w-4 h-4 text-emerald-300" />
              <span className="text-sm font-medium text-white/90">
                EMI Calculator
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            >
              Calculate Your{" "}
              <span
                className="italic bg-gradient-to-r from-emerald-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Loan EMI
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto"
            >
              Plan your loan repayments with our EMI calculator. Know your
              monthly installments before you borrow.
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Inputs */}
              <div className="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">
                    Loan Details
                  </h2>
                  <button
                    onClick={resetCalculator}
                    className="text-sm text-gray-500 hover:text-emerald-600 flex items-center gap-1"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset
                  </button>
                </div>

                {/* Loan Amount */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      Loan Amount
                    </label>
                    <div className="flex items-center bg-emerald-50 px-3 py-1 rounded-lg">
                      <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                      <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) =>
                          setLoanAmount(Number(e.target.value) || 0)
                        }
                        className="w-24 bg-transparent text-right font-semibold text-emerald-700 focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="50000000"
                    step="100000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>₹1L</span>
                    <span>₹5Cr</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Percent className="w-4 h-4 text-teal-600" />
                      Interest Rate (p.a.)
                    </label>
                    <div className="flex items-center bg-teal-50 px-3 py-1 rounded-lg">
                      <input
                        type="number"
                        value={interestRate}
                        onChange={(e) =>
                          setInterestRate(Number(e.target.value) || 0)
                        }
                        className="w-12 bg-transparent text-right font-semibold text-teal-700 focus:outline-none text-sm"
                        step="0.1"
                      />
                      <Percent className="w-3.5 h-3.5 text-teal-600 ml-1" />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>5%</span>
                    <span>20%</span>
                  </div>
                </div>

                {/* Loan Tenure */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cyan-600" />
                      Loan Tenure
                    </label>
                    <div className="flex items-center bg-cyan-50 px-3 py-1 rounded-lg">
                      <input
                        type="number"
                        value={loanTenure}
                        onChange={(e) =>
                          setLoanTenure(Number(e.target.value) || 1)
                        }
                        className="w-10 bg-transparent text-right font-semibold text-cyan-700 focus:outline-none text-sm"
                      />
                      <span className="text-cyan-600 ml-1 text-sm">Yrs</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1 Yr</span>
                    <span>30 Yrs</span>
                  </div>
                </div>

                {/* Presets */}
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-3">Quick Presets:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {loanPresets.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setLoanAmount(preset.amount);
                          setInterestRate(preset.rate);
                          setLoanTenure(preset.tenure);
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors"
                      >
                        <preset.icon className="w-4 h-4" />
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  Monthly EMI
                </h2>

                <motion.div
                  key={calculations.emi}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl sm:text-5xl font-bold mb-2"
                >
                  {formatCurrency(calculations.emi)}
                </motion.div>
                <p className="text-emerald-200 mb-8">
                  per month for {loanTenure} years
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between py-3 border-b border-white/20">
                    <span className="text-emerald-200">Principal Amount</span>
                    <span className="font-semibold">
                      {formatCurrency(calculations.principal)}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/20">
                    <span className="text-emerald-200">Total Interest</span>
                    <span className="font-semibold">
                      {formatCurrency(calculations.totalInterest)}
                    </span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-emerald-200">Total Payment</span>
                    <span className="font-bold text-lg">
                      {formatCurrency(calculations.totalPayment)}
                    </span>
                  </div>
                </div>

                {/* Visual Breakdown */}
                <div className="mb-6">
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden flex">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(calculations.principal / calculations.totalPayment) * 100}%`,
                      }}
                      transition={{ duration: 0.5 }}
                      className="bg-white h-full"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(calculations.totalInterest / calculations.totalPayment) * 100}%`,
                      }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-emerald-300 h-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-2 text-emerald-200">
                    <span>
                      Principal (
                      {(
                        (calculations.principal / calculations.totalPayment) *
                        100
                      ).toFixed(0)}
                      %)
                    </span>
                    <span>
                      Interest (
                      {(
                        (calculations.totalInterest /
                          calculations.totalPayment) *
                        100
                      ).toFixed(0)}
                      %)
                    </span>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Get Best Loan Rates
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
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
                className="px-4 py-2 bg-gray-100 hover:bg-emerald-100 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
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
            Need Help With Your Loan?
          </h3>
          <p className="text-gray-600 mb-6">
            We partner with 30+ banks & NBFCs to get you the best rates.
          </p>
          <Link
            to="/services/borrowing-solutions"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Explore Loan Options
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EMICalculator;
