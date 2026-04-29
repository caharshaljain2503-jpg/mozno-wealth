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
  Receipt,
  FileText,
  Shield,
  Users,
  Heart,
  Landmark,
} from "lucide-react";

const TaxCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [age, setAge] = useState("below60");
  const [taxRegime, setTaxRegime] = useState("new");
  const [deductions, setDeductions] = useState(150000);
  const [hra, setHra] = useState(0);
  const [lta, setLta] = useState(0);
  const [otherExemptions, setOtherExemptions] = useState(0);

  // Tax Calculation
  const calculations = useMemo(() => {
    let taxableIncome = annualIncome;
    let tax = 0;
    let totalDeductions = 0;

    if (taxRegime === "old") {
      // Old regime with deductions
      totalDeductions = deductions + hra + lta + otherExemptions;
      taxableIncome = Math.max(0, annualIncome - totalDeductions);

      // Tax slabs for old regime
      if (age === "below60") {
        if (taxableIncome <= 250000) tax = 0;
        else if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
        else if (taxableIncome <= 1000000) tax = 12500 + (taxableIncome - 500000) * 0.2;
        else tax = 112500 + (taxableIncome - 1000000) * 0.3;
      } else if (age === "60to80") {
        if (taxableIncome <= 300000) tax = 0;
        else if (taxableIncome <= 500000) tax = (taxableIncome - 300000) * 0.05;
        else if (taxableIncome <= 1000000) tax = 10000 + (taxableIncome - 500000) * 0.2;
        else tax = 110000 + (taxableIncome - 1000000) * 0.3;
      } else {
        if (taxableIncome <= 500000) tax = 0;
        else if (taxableIncome <= 1000000) tax = (taxableIncome - 500000) * 0.2;
        else tax = 100000 + (taxableIncome - 1000000) * 0.3;
      }
    } else {
      // New regime (no deductions except standard deduction)
      const standardDeduction = 75000; // FY 2024-25
      taxableIncome = Math.max(0, annualIncome - standardDeduction);
      totalDeductions = standardDeduction;

      // New regime tax slabs
      if (taxableIncome <= 300000) tax = 0;
      else if (taxableIncome <= 700000) tax = (taxableIncome - 300000) * 0.05;
      else if (taxableIncome <= 1000000) tax = 20000 + (taxableIncome - 700000) * 0.10;
      else if (taxableIncome <= 1200000) tax = 50000 + (taxableIncome - 1000000) * 0.15;
      else if (taxableIncome <= 1500000) tax = 80000 + (taxableIncome - 1200000) * 0.20;
      else tax = 140000 + (taxableIncome - 1500000) * 0.3;
    }

    // Add cess
    const cess = tax * 0.04;
    const totalTax = tax + cess;
    const monthlyTax = totalTax / 12;
    const inHandIncome = annualIncome - totalTax;
    const monthlyInHand = inHandIncome / 12;
    const effectiveTaxRate = annualIncome > 0 ? (totalTax / annualIncome) * 100 : 0;

    return {
      taxableIncome: Math.round(taxableIncome),
      tax: Math.round(tax),
      cess: Math.round(cess),
      totalTax: Math.round(totalTax),
      monthlyTax: Math.round(monthlyTax),
      inHandIncome: Math.round(inHandIncome),
      monthlyInHand: Math.round(monthlyInHand),
      totalDeductions: Math.round(totalDeductions),
      effectiveTaxRate: effectiveTaxRate.toFixed(2),
    };
  }, [annualIncome, age, taxRegime, deductions, hra, lta, otherExemptions]);

  // Format currency
  const formatCurrency = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const resetCalculator = () => {
    setAnnualIncome(1200000);
    setAge("below60");
    setTaxRegime("new");
    setDeductions(150000);
    setHra(0);
    setLta(0);
    setOtherExemptions(0);
  };

  // Income presets
  const incomePresets = [
    { label: "Entry Level", icon: GraduationCap, amount: 500000 },
    { label: "Mid Level", icon: Briefcase, amount: 1200000 },
    { label: "Senior Level", icon: Building2, amount: 2500000 },
    { label: "Executive", icon: Landmark, amount: 5000000 },
  ];

  // Other calculators
  const otherCalculators = [
    { name: "EMI Calculator", path: "/calculators/emi" },
    { name: "SIP Calculator", path: "/calculators/sip" },
    { name: "Retirement", path: "/calculators/retirement" },
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
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80')] opacity-10 bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-black/20" />

          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 -left-20 w-40 h-40 sm:w-60 sm:h-60 bg-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 -right-20 w-40 h-40 sm:w-60 sm:h-60 bg-purple-500/20 rounded-full blur-3xl"
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
              <span className="text-blue-300">Tax Calculator</span>
            </motion.div>

            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6"
            >
              <Receipt className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-medium text-white/90">
                Income Tax Calculator
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            >
              Calculate Your{" "}
              <span
                className="italic bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300 bg-clip-text text-transparent"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Income Tax
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto"
            >
              Plan your taxes efficiently with our tax calculator. Compare old vs new regime and maximize your savings.
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
                    Income Details
                  </h2>
                  <button
                    onClick={resetCalculator}
                    className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset
                  </button>
                </div>

                {/* Tax Regime Selection */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Tax Regime
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setTaxRegime("old")}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        taxRegime === "old"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Old Regime
                    </button>
                    <button
                      onClick={() => setTaxRegime("new")}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        taxRegime === "new"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      New Regime
                    </button>
                  </div>
                </div>

                {/* Annual Income */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-blue-600" />
                      Annual Income
                    </label>
                    <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
                      <IndianRupee className="w-3.5 h-3.5 text-blue-600" />
                      <input
                        type="number"
                        value={annualIncome}
                        onChange={(e) =>
                          setAnnualIncome(Number(e.target.value) || 0)
                        }
                        className="w-24 bg-transparent text-right font-semibold text-blue-700 focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="50000"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>₹0</span>
                    <span>₹1Cr</span>
                  </div>
                </div>

                {/* Age Group */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 mb-3 block flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-600" />
                    Age Group
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: "below60", label: "Below 60 years" },
                      { value: "60to80", label: "60 to 80 years" },
                      { value: "above80", label: "Above 80 years" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          value={option.value}
                          checked={age === option.value}
                          onChange={(e) => setAge(e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Deductions (Old Regime) */}
                {taxRegime === "old" && (
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-700">
                      Deductions & Exemptions
                    </p>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-xs text-gray-600">
                          Section 80C, 80D, etc.
                        </label>
                        <span className="text-xs font-medium text-gray-700">
                          {formatCurrency(deductions)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="500000"
                        step="10000"
                        value={deductions}
                        onChange={(e) => setDeductions(Number(e.target.value))}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-xs text-gray-600">
                          HRA Exemption
                        </label>
                        <span className="text-xs font-medium text-gray-700">
                          {formatCurrency(hra)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="500000"
                        step="10000"
                        value={hra}
                        onChange={(e) => setHra(Number(e.target.value))}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      />
                    </div>
                  </div>
                )}

                {/* Presets */}
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-3">Quick Presets:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {incomePresets.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setAnnualIncome(preset.amount);
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-gray-50 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                      >
                        <preset.icon className="w-4 h-4" />
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Tax Payable
                </h2>

                <motion.div
                  key={calculations.totalTax}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl sm:text-5xl font-bold mb-2"
                >
                  {formatCurrency(calculations.totalTax)}
                </motion.div>
                <p className="text-blue-200 mb-8">
                  Effective Tax Rate: {calculations.effectiveTaxRate}%
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between py-3 border-b border-white/20">
                    <span className="text-blue-200">Gross Income</span>
                    <span className="font-semibold">
                      {formatCurrency(annualIncome)}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/20">
                    <span className="text-blue-200">Total Deductions</span>
                    <span className="font-semibold">
                      {formatCurrency(calculations.totalDeductions)}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/20">
                    <span className="text-blue-200">Taxable Income</span>
                    <span className="font-semibold">
                      {formatCurrency(calculations.taxableIncome)}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/20">
                    <span className="text-blue-200">Income Tax</span>
                    <span className="font-semibold">
                      {formatCurrency(calculations.tax)}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/20">
                    <span className="text-blue-200">Cess (4%)</span>
                    <span className="font-semibold">
                      {formatCurrency(calculations.cess)}
                    </span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-blue-200">In-Hand Income</span>
                    <span className="font-bold text-lg">
                      {formatCurrency(calculations.inHandIncome)}
                    </span>
                  </div>
                </div>

                {/* Visual Breakdown */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-blue-200">Monthly In-Hand</span>
                    <span className="font-semibold">
                      {formatCurrency(calculations.monthlyInHand)}
                    </span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden flex">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(calculations.inHandIncome / annualIncome) * 100}%`,
                      }}
                      transition={{ duration: 0.5 }}
                      className="bg-white h-full"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(calculations.totalTax / annualIncome) * 100}%`,
                      }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-blue-300 h-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-2 text-blue-200">
                    <span>
                      Take Home (
                      {((calculations.inHandIncome / annualIncome) * 100).toFixed(0)}%)
                    </span>
                    <span>
                      Tax (
                      {((calculations.totalTax / annualIncome) * 100).toFixed(0)}%)
                    </span>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Get Tax Planning Help
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
                className="px-4 py-2 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 rounded-lg text-sm font-medium transition-colors"
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
            Need Tax Planning Assistance?
          </h3>
          <p className="text-gray-600 mb-6">
            Our experts can help you save taxes legally and efficiently.
          </p>
          <Link
            to="/services/tax-planning"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            Explore Tax Solutions
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TaxCalculator;