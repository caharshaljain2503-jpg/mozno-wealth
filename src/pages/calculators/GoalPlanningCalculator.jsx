import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calculator,
  Target,
  TrendingUp,
  Calendar,
  IndianRupee,
  Percent,
  ArrowRight,
  Phone,
  ChevronRight,
  RefreshCw,
  Plus,
  Trash2,
  Home,
  Car,
  GraduationCap,
  Briefcase,
  Heart,
  Plane,
  Globe,
  Gift,
  PiggyBank,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  Info,
  TrendingDown,
  BarChart3,
} from "lucide-react";

const GoalPlanningCalculator = () => {
  const [goals, setGoals] = useState([
    { id: 1, name: "Buy a House", amount: 5000000, years: 5, priority: "High" },
    { id: 2, name: "Child's Education", amount: 2000000, years: 10, priority: "High" },
    { id: 3, name: "Car Purchase", amount: 800000, years: 3, priority: "Medium" },
  ]);

  const [expectedReturn, setExpectedReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(6);
  const [monthlySavings, setMonthlySavings] = useState(50000);

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

  // Add new goal
  const addGoal = (preset = null) => {
    const newId = goals.length > 0 ? Math.max(...goals.map((g) => g.id)) + 1 : 1;
    setGoals([
      ...goals,
      {
        id: newId,
        name: preset ? preset.name : "New Goal",
        amount: preset ? preset.amount : 1000000,
        years: preset ? preset.years : 5,
        priority: "Medium",
      },
    ]);
  };

  const updateGoal = (id, field, value) => {
    setGoals(goals.map((g) => (g.id === id ? { ...g, [field]: value } : g)));
  };

  const removeGoal = (id) => {
    if (goals.length <= 1) return;
    setGoals(goals.filter((g) => g.id !== id));
  };

  // Presets
  const goalPresets = [
    { name: "Home Purchase", icon: Home, amount: 5000000, years: 5 },
    { name: "Child Education", icon: GraduationCap, amount: 2000000, years: 10 },
    { name: "Car Purchase", icon: Car, amount: 800000, years: 3 },
    { name: "Retirement", icon: Briefcase, amount: 20000000, years: 20 },
    { name: "World Tour", icon: Globe, amount: 1000000, years: 5 },
    { name: "Emergency Fund", icon: PiggyBank, amount: 500000, years: 1 },
    { name: "Medical Fund", icon: Heart, amount: 3000000, years: 3 },
    { name: "Marriage", icon: Gift, amount: 1500000, years: 7 },
  ];

  // Calculations
  const calculations = useMemo(() => {
    const goalsWithCalc = goals.map((goal) => {
      const futureValue =
        goal.amount * Math.pow(1 + inflationRate / 100, goal.years);
      const r = expectedReturn / 100 / 12;
      const n = goal.years * 12;
      let monthlySaving = 0;
      if (r > 0 && n > 0) {
        monthlySaving = (futureValue * r) / (Math.pow(1 + r, n) - 1);
      }
      return {
        ...goal,
        futureValue: Math.round(futureValue),
        monthlySaving: Math.round(monthlySaving),
      };
    });

    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    goalsWithCalc.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );

    const totalFutureValue = goalsWithCalc.reduce(
      (s, g) => s + g.futureValue,
      0
    );
    const totalMonthlySaving = goalsWithCalc.reduce(
      (s, g) => s + g.monthlySaving,
      0
    );
    const shortfall = Math.max(0, totalMonthlySaving - monthlySavings);
    const capacity = Math.max(0, monthlySavings - totalMonthlySaving);

    return {
      goals: goalsWithCalc,
      totalFutureValue,
      totalMonthlySaving,
      shortfall,
      capacity,
      canAfford: monthlySavings >= totalMonthlySaving,
    };
  }, [goals, expectedReturn, inflationRate, monthlySavings]);

  const formatCurrency = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const resetCalculator = () => {
    setGoals([
      { id: 1, name: "Buy a House", amount: 5000000, years: 5, priority: "High" },
      { id: 2, name: "Child's Education", amount: 2000000, years: 10, priority: "High" },
      { id: 3, name: "Car Purchase", amount: 800000, years: 3, priority: "Medium" },
    ]);
    setExpectedReturn(12);
    setInflationRate(6);
    setMonthlySavings(50000);
  };

  const priorityColors = {
    High: "bg-red-50 text-red-600 border-red-200",
    Medium: "bg-amber-50 text-amber-600 border-amber-200",
    Low: "bg-green-50 text-green-600 border-green-200",
  };

  const priorityDot = {
    High: "bg-red-500",
    Medium: "bg-amber-500",
    Low: "bg-green-500",
  };

  // Other calculators
  const otherCalculators = [
    { name: "Retirement Calculator", path: "/calculators/retirement" },
    { name: "Delay Planning", path: "/calculators/delay-planning" },
    { name: "SIP Calculator", path: "/calculators/sip" },
    { name: "Step Up SIP", path: "/calculators/step-up-sip" },
    { name: "Lumpsum", path: "/calculators/lumpsum" },
    { name: "EMI Calculator", path: "/calculators/emi" },
  ];

  // FAQs
  const faqs = [
    {
      question: "How does goal planning work?",
      answer:
        "You define your financial goals with target amounts and timelines. The calculator adjusts each goal for inflation, then computes the monthly SIP needed at your expected return rate to reach each goal on time.",
    },
    {
      question: "Should I adjust my goals for inflation?",
      answer:
        "Yes. This calculator automatically factors in inflation. A goal that costs ₹50 lakhs today will cost significantly more in 10 years. Planning with inflation-adjusted numbers ensures you don't fall short.",
    },
    {
      question: "What if I can't afford all my goals?",
      answer:
        "Prioritize your goals — focus on high-priority ones first. You can also extend timelines, reduce target amounts, or increase your monthly savings. A Step Up SIP (increasing SIP annually) can also help bridge the gap.",
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
              <Link
                to="/calculators"
                className="hover:text-white/80 transition-colors"
              >
                Calculators
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-emerald-300/80">Goal Planning</span>
            </motion.div>

            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 mb-5"
            >
              <Target className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-xs font-medium text-white/80">
                Goal Planning Calculator
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
                Financial Goals
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed"
            >
              Set, prioritize, and plan for any financial goal — education,
              home, vacation, or any dream you have.
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
                Your Goals
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
                {/* Goals List */}
                <div className="space-y-3 mb-5 max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
                  {goals.map((goal, index) => (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-3 sm:p-4 rounded-xl border border-gray-200 hover:border-emerald-200 transition-colors group"
                    >
                      {/* Top row — name + priority + delete */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <div
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${priorityDot[goal.priority]}`}
                          />
                          <input
                            type="text"
                            value={goal.name}
                            onChange={(e) =>
                              updateGoal(goal.id, "name", e.target.value)
                            }
                            className="text-xs sm:text-sm font-bold text-gray-900 bg-transparent border-b border-transparent focus:border-emerald-400 focus:outline-none min-w-0 w-full truncate"
                            placeholder="Goal name"
                          />
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <select
                            value={goal.priority}
                            onChange={(e) =>
                              updateGoal(goal.id, "priority", e.target.value)
                            }
                            className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full border font-medium focus:outline-none cursor-pointer ${priorityColors[goal.priority]}`}
                          >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                          <button
                            onClick={() => removeGoal(goal.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors p-0.5"
                            title="Remove goal"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Amount + Years row */}
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <div>
                          <label className="text-[10px] sm:text-xs text-gray-400 mb-1 block">
                            Amount (Today's Value)
                          </label>
                          <div className="flex items-center bg-gray-50 rounded-lg px-2.5 py-1.5">
                            <IndianRupee className="w-3 h-3 text-gray-400 mr-1 flex-shrink-0" />
                            <input
                              type="number"
                              value={goal.amount}
                              onChange={(e) =>
                                updateGoal(
                                  goal.id,
                                  "amount",
                                  Number(e.target.value) || 0
                                )
                              }
                              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] sm:text-xs text-gray-400 mb-1 block">
                            Timeline
                          </label>
                          <div className="flex items-center bg-gray-50 rounded-lg px-2.5 py-1.5">
                            <Calendar className="w-3 h-3 text-gray-400 mr-1 flex-shrink-0" />
                            <input
                              type="number"
                              value={goal.years}
                              onChange={(e) =>
                                updateGoal(
                                  goal.id,
                                  "years",
                                  Math.max(Number(e.target.value) || 1, 1)
                                )
                              }
                              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none"
                              min="1"
                            />
                            <span className="text-[10px] sm:text-xs text-gray-400 ml-1 flex-shrink-0">
                              Yrs
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Result row */}
                      <div className="mt-2.5 pt-2.5 border-t border-gray-100 flex items-center justify-between flex-wrap gap-1">
                        <span className="text-[10px] sm:text-xs text-gray-400">
                          Future Value:{" "}
                          <span className="font-medium text-gray-600">
                            {formatCurrency(
                              calculations.goals.find((g) => g.id === goal.id)
                                ?.futureValue || 0
                            )}
                          </span>
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-emerald-600">
                          {formatCurrency(
                            calculations.goals.find((g) => g.id === goal.id)
                              ?.monthlySaving || 0
                          )}
                          /mo
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Add Goal */}
                <button
                  onClick={() => addGoal()}
                  className="w-full py-2.5 sm:py-3 border-2 border-dashed border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 rounded-xl transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 hover:text-emerald-700 mb-5"
                >
                  <Plus className="w-4 h-4" />
                  Add New Goal
                </button>

                {/* Goal Presets */}
                <div className="mb-5">
                  <p className="text-[10px] sm:text-xs text-gray-400 mb-2.5 font-medium">
                    Quick Add:
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {goalPresets.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => addGoal(preset)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] sm:text-xs font-medium bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors border border-gray-100 hover:border-emerald-200"
                      >
                        <preset.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Parameters */}
                <div className="pt-5 border-t border-gray-100">
                  <p className="text-xs sm:text-sm font-bold text-gray-800 mb-4">
                    Planning Parameters
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
                    {/* Expected Return */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[10px] sm:text-xs font-medium text-gray-600 flex items-center gap-1.5">
                          <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
                          Return (p.a.)
                        </label>
                        <div className="flex items-center bg-emerald-50 rounded-md px-2 py-0.5">
                          <input
                            type="number"
                            value={expectedReturn}
                            onChange={(e) =>
                              setExpectedReturn(Number(e.target.value) || 0)
                            }
                            className="w-10 bg-transparent text-right font-semibold text-emerald-700 focus:outline-none text-xs sm:text-sm"
                            step="0.5"
                          />
                          <Percent className="w-2.5 h-2.5 text-emerald-600 ml-0.5" />
                        </div>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="20"
                        step="0.5"
                        value={expectedReturn}
                        onChange={(e) =>
                          setExpectedReturn(Number(e.target.value))
                        }
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-emerald"
                      />
                      <div className="flex justify-between text-[9px] text-gray-400 mt-0.5">
                        <span>5%</span>
                        <span>20%</span>
                      </div>
                    </div>

                    {/* Inflation Rate */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[10px] sm:text-xs font-medium text-gray-600 flex items-center gap-1.5">
                          <TrendingDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" />
                          Inflation (p.a.)
                        </label>
                        <div className="flex items-center bg-red-50 rounded-md px-2 py-0.5">
                          <input
                            type="number"
                            value={inflationRate}
                            onChange={(e) =>
                              setInflationRate(Number(e.target.value) || 0)
                            }
                            className="w-10 bg-transparent text-right font-semibold text-red-700 focus:outline-none text-xs sm:text-sm"
                            step="0.5"
                          />
                          <Percent className="w-2.5 h-2.5 text-red-500 ml-0.5" />
                        </div>
                      </div>
                      <input
                        type="range"
                        min="3"
                        max="10"
                        step="0.5"
                        value={inflationRate}
                        onChange={(e) =>
                          setInflationRate(Number(e.target.value))
                        }
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-red"
                      />
                      <div className="flex justify-between text-[9px] text-gray-400 mt-0.5">
                        <span>3%</span>
                        <span>10%</span>
                      </div>
                    </div>

                    {/* Monthly Savings */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[10px] sm:text-xs font-medium text-gray-600 flex items-center gap-1.5">
                          <PiggyBank className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
                          Your Savings
                        </label>
                        <div className="flex items-center bg-blue-50 rounded-md px-2 py-0.5">
                          <IndianRupee className="w-2.5 h-2.5 text-blue-600" />
                          <input
                            type="number"
                            value={monthlySavings}
                            onChange={(e) =>
                              setMonthlySavings(Number(e.target.value) || 0)
                            }
                            className="w-16 bg-transparent text-right font-semibold text-blue-700 focus:outline-none text-xs sm:text-sm"
                          />
                        </div>
                      </div>
                      <input
                        type="range"
                        min="5000"
                        max="500000"
                        step="5000"
                        value={monthlySavings}
                        onChange={(e) =>
                          setMonthlySavings(Number(e.target.value))
                        }
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                      />
                      <div className="flex justify-between text-[9px] text-gray-400 mt-0.5">
                        <span>₹5K</span>
                        <span>₹5L</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== RESULTS (2 cols) ===== */}
              <div className="lg:col-span-2 bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-600 text-white p-4 sm:p-6 lg:p-8">
                <h2 className="text-sm sm:text-base font-bold mb-5 flex items-center gap-2">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                  Goal Summary
                </h2>

                {/* Goals count + Total future value */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <p className="text-2xl sm:text-3xl font-bold">
                      {calculations.goals.length}
                    </p>
                    <p className="text-[10px] sm:text-xs text-emerald-200">
                      Goals Set
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <p className="text-sm sm:text-base font-bold">
                      {formatCurrency(calculations.totalFutureValue)}
                    </p>
                    <p className="text-[10px] sm:text-xs text-emerald-200">
                      Total Future Value
                    </p>
                  </div>
                </div>

                {/* Total Monthly Required */}
                <div className="text-center mb-4">
                  <p className="text-[10px] sm:text-xs text-emerald-200 mb-1">
                    Total Monthly Savings Required
                  </p>
                  <motion.div
                    key={calculations.totalMonthlySaving}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold"
                  >
                    {formatCurrency(calculations.totalMonthlySaving)}
                  </motion.div>
                  <p className="text-[10px] sm:text-xs text-emerald-200 mt-0.5">
                    per month
                  </p>
                </div>

                {/* Affordability */}
                <div
                  className={`rounded-xl p-3.5 mb-4 ${
                    calculations.canAfford
                      ? "bg-green-500/20 border border-green-400/30"
                      : "bg-red-500/20 border border-red-400/30"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {calculations.canAfford ? (
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-300 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-sm sm:text-base font-bold">
                        {calculations.canAfford
                          ? "You Can Afford All Goals!"
                          : "Savings Shortfall"}
                      </p>
                      <p className="text-[10px] sm:text-xs mt-0.5 text-emerald-100">
                        {calculations.canAfford
                          ? `You have ${formatCurrency(calculations.capacity)} extra capacity per month`
                          : `You need ${formatCurrency(calculations.shortfall)} more per month`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between py-2 border-b border-white/15">
                    <span className="text-emerald-200 text-xs sm:text-sm">
                      Your Monthly Savings
                    </span>
                    <span className="font-semibold text-xs sm:text-sm">
                      {formatCurrency(monthlySavings)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/15">
                    <span className="text-emerald-200 text-xs sm:text-sm">
                      Required for Goals
                    </span>
                    <span className="font-semibold text-xs sm:text-sm">
                      {formatCurrency(calculations.totalMonthlySaving)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-emerald-200 text-xs sm:text-sm">
                      {calculations.canAfford ? "Extra Capacity" : "Shortfall"}
                    </span>
                    <span
                      className={`font-bold text-xs sm:text-sm ${
                        calculations.canAfford ? "text-green-300" : "text-red-300"
                      }`}
                    >
                      {calculations.canAfford
                        ? `+${formatCurrency(calculations.capacity)}`
                        : `-${formatCurrency(calculations.shortfall)}`}
                    </span>
                  </div>
                </div>

                {/* Capacity bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-[10px] sm:text-xs text-emerald-200 mb-1.5">
                    <span>Savings Utilization</span>
                    <span>
                      {Math.min(
                        100,
                        Math.round(
                          (calculations.totalMonthlySaving / monthlySavings) *
                            100
                        )
                      )}
                      %
                    </span>
                  </div>
                  <div className="h-2 bg-white/15 rounded-full overflow-hidden">
                    <motion.div
                      key={calculations.totalMonthlySaving}
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(
                          100,
                          (calculations.totalMonthlySaving / monthlySavings) *
                            100
                        )}%`,
                      }}
                      transition={{ duration: 0.6 }}
                      className={`h-full rounded-full ${
                        calculations.canAfford
                          ? "bg-gradient-to-r from-emerald-300 to-teal-300"
                          : "bg-gradient-to-r from-red-400 to-orange-400"
                      }`}
                    />
                  </div>
                </div>

                {/* Priority breakdown */}
                <div className="mb-5">
                  <p className="text-[10px] sm:text-xs font-medium text-emerald-200 mb-2">
                    Priority Breakdown
                  </p>
                  <div className="space-y-2">
                    {["High", "Medium", "Low"].map((priority) => {
                      const pGoals = calculations.goals.filter(
                        (g) => g.priority === priority
                      );
                      if (pGoals.length === 0) return null;
                      const total = pGoals.reduce(
                        (s, g) => s + g.monthlySaving,
                        0
                      );
                      const pct =
                        calculations.totalMonthlySaving > 0
                          ? (total / calculations.totalMonthlySaving) * 100
                          : 0;

                      return (
                        <div key={priority}>
                          <div className="flex justify-between text-[10px] sm:text-xs mb-1">
                            <span className="text-emerald-200">
                              {priority} ({pGoals.length})
                            </span>
                            <span>{formatCurrency(total)}/mo</span>
                          </div>
                          <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.5 }}
                              className={`h-full rounded-full ${
                                priority === "High"
                                  ? "bg-red-400"
                                  : priority === "Medium"
                                  ? "bg-amber-400"
                                  : "bg-green-400"
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Get Customized Goal Plan
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GOAL DETAILS TABLE ================= */}
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
              Goal-wise Breakdown
            </h3>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                      Goal
                    </th>
                    <th className="text-center py-2.5 px-2 text-xs sm:text-sm font-semibold text-gray-600">
                      Priority
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                      Today's Cost
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                      Future Cost
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                      Timeline
                    </th>
                    <th className="text-right py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-emerald-600">
                      Monthly SIP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.goals.map((goal, index) => (
                    <motion.tr
                      key={goal.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-800">
                        {goal.name}
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <span
                          className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full border font-medium ${priorityColors[goal.priority]}`}
                        >
                          {goal.priority}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right text-gray-600">
                        {formatCurrency(goal.amount)}
                      </td>
                      <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right text-gray-600">
                        {formatCurrency(goal.futureValue)}
                      </td>
                      <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right text-gray-600">
                        {goal.years} {goal.years === 1 ? "yr" : "yrs"}
                      </td>
                      <td className="py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-right font-bold text-emerald-600">
                        {formatCurrency(goal.monthlySaving)}
                      </td>
                    </motion.tr>
                  ))}
                  {/* Total row */}
                  <tr className="bg-emerald-50/50">
                    <td className="py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold text-gray-900">
                      Total
                    </td>
                    <td></td>
                    <td className="py-3 px-3 sm:px-4 text-xs sm:text-sm text-right font-semibold text-gray-800">
                      {formatCurrency(
                        goals.reduce((s, g) => s + g.amount, 0)
                      )}
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-xs sm:text-sm text-right font-semibold text-gray-800">
                      {formatCurrency(calculations.totalFutureValue)}
                    </td>
                    <td></td>
                    <td className="py-3 px-3 sm:px-4 text-xs sm:text-sm text-right font-bold text-emerald-700">
                      {formatCurrency(calculations.totalMonthlySaving)}
                    </td>
                  </tr>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Target className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  Why Goal-based Planning?
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                Instead of investing blindly, goal-based planning aligns your
                investments with specific life goals, making your money work
                with purpose.
              </p>
              <div className="space-y-1.5">
                {[
                  "Clear investment purpose",
                  "Better asset allocation per goal",
                  "Track progress easily",
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-orange-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  Inflation & Your Goals
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                A ₹50 lakh home today could cost ₹90 lakh in 10 years at 6%
                inflation. This calculator automatically adjusts your goals for
                inflation.
              </p>
              <div className="bg-orange-50 rounded-xl p-3">
                <p className="text-xs text-orange-700 font-medium">
                  Always plan with inflation-adjusted values. Your future self
                  will thank you!
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
                  Prioritize Wisely
                </h3>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                <p>
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1.5"></span>
                  <span className="font-semibold text-gray-800">High:</span>{" "}
                  Non-negotiable — child education, emergency fund, home.
                </p>
                <p>
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1.5"></span>
                  <span className="font-semibold text-gray-800">Medium:</span>{" "}
                  Important but flexible — car, vacation, upgrade.
                </p>
                <p>
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                  <span className="font-semibold text-gray-800">Low:</span>{" "}
                  Nice-to-have — luxury items, hobby investment.
                </p>
                <p className="mt-2 text-gray-500 italic">
                  If there's a shortfall, consider delaying low-priority goals
                  or extending their timeline.
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
                Need Help Achieving Your Goals?
              </h2>
              <p className="text-emerald-100/80 text-xs sm:text-sm mb-5 sm:mb-6 max-w-md mx-auto leading-relaxed">
                Our experts will create a personalized roadmap with the right
                investment mix to help you achieve every financial goal.
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

      {/* Custom Styles */}
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
        .slider-red::-webkit-slider-thumb {
          background: linear-gradient(135deg, #ef4444, #dc2626);
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
        .slider-red::-moz-range-thumb {
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }
        .slider-blue::-moz-range-thumb {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default GoalPlanningCalculator;