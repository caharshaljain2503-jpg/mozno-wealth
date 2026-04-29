import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calculator,
  TrendingUp,
  Target,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Clock,
  Home,
  Car,
  GraduationCap,
  Heart,
  PiggyBank,
  Sparkles,
  BarChart3,
  Percent,
  Shield,
  Landmark,
} from "lucide-react";

const Calculators = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // Updated calculator list as per client requirements
  const calculators = [
    {
      icon: Clock,
      title: "Retirement Calculator",
      path: "/calculators/retirement",
      description:
        "Plan your retirement corpus and ensure financial independence in your golden years.",
      features: ["Corpus Needed", "Monthly Investment", "Inflation Adjusted"],
    },
    {
      icon: Target,
      title: "Delay Planning Calculator",
      path: "/calculators/delay-planning",
      description:
        "Understand the cost of delaying your investments and the power of starting early.",
      features: ["Cost of Delay", "Lost Returns", "Time Value Analysis"],
    },
    {
      icon: GraduationCap,
      title: "Goal Planning Calculator",
      path: "/calculators/goal-planning",
      description:
        "Set and plan for any financial goal - education, home, vacation, or any dream.",
      features: ["Multiple Goals", "Timeline Planning", "Investment Mapping"],
    },
    {
      icon: TrendingUp,
      title: "SIP Calculator",
      path: "/calculators/sip",
      description:
        "Calculate how your wealth grows with systematic monthly investments over time.",
      features: ["Wealth Projection", "Returns Estimate", "Goal Tracking"],
    },
    {
      icon: Percent,
      title: "Step Up SIP Calculator",
      path: "/calculators/step-up-sip",
      description:
        "Plan SIP with annual increments to accelerate your wealth creation journey.",
      features: ["Annual Step-Up", "Higher Returns", "Inflation Beating"],
    },
    {
      icon: PiggyBank,
      title: "Lumpsum Calculator",
      path: "/calculators/lumpsum",
      description:
        "Calculate returns on one-time investments over your chosen investment horizon.",
      features: ["One-time Investment", "Compounding Effect", "Maturity Value"],
    },
    {
      icon: BarChart3,
      title: "SWP Calculator",
      path: "/calculators/swp",
      description:
        "Plan systematic withdrawals from your investments for regular income needs.",
      features: ["Regular Income", "Corpus Duration", "Withdrawal Planning"],
    },
    {
      icon: Landmark,
      title: "STP Calculator",
      path: "/calculators/stp",
      description:
        "Calculate systematic transfers between funds for optimal asset allocation.",
      features: ["Fund Transfer", "Risk Management", "Gradual Deployment"],
    },
    {
      icon: Home,
      title: "EMI Calculator",
      path: "/calculators/emi",
      description:
        "Calculate monthly EMI for home, car, or personal loans with amortization details.",
      features: ["Loan EMI", "Interest Breakdown", "Amortization Schedule"],
    },
  ];

  // Quick access categories
  const quickCategories = [
    { icon: Home, label: "Home Loan", path: "/calculators/emi" },
    { icon: Car, label: "Car Loan", path: "/calculators/emi" },
    { icon: GraduationCap, label: "Education", path: "/calculators/goal-planning" },
    { icon: Heart, label: "Marriage", path: "/calculators/goal-planning" },
    { icon: Clock, label: "Retirement", path: "/calculators/retirement" },
    { icon: TrendingUp, label: "SIP", path: "/calculators/sip" },
  ];

  // Process steps
  const steps = [
    { step: "01", title: "Select", desc: "Choose your calculator" },
    { step: "02", title: "Input", desc: "Enter your details" },
    { step: "03", title: "Calculate", desc: "Get instant results" },
    { step: "04", title: "Plan", desc: "Take informed action" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/30">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-28 lg:py-36">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-black/20" />

          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-20 w-40 h-40 sm:w-60 sm:h-60 bg-emerald-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, delay: 2, ease: "easeInOut" }}
            className="absolute bottom-1/4 -right-20 w-40 h-40 sm:w-60 sm:h-60 bg-cyan-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Breadcrumb */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-1.5 text-white/50 text-xs sm:text-sm mb-6"
            >
              <Link to="/" className="hover:text-white/80 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-emerald-300/80">Calculators</span>
            </motion.div>

            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 mb-6"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-xs font-medium text-white/80">
                Financial Calculators
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-5"
            >
              Plan Your Finances{" "}
              <span
                className="italic bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                With Precision
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base md:text-lg text-white/70 max-w-xl mx-auto mb-8 leading-relaxed"
            >
              Free, accurate, and easy-to-use calculators to help you make
              informed decisions about investments, loans, and financial goals.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col xs:flex-row items-center justify-center gap-3"
            >
              <a
                href="#calculators"
                className="group flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-all shadow-lg shadow-black/10 text-sm sm:text-base w-full xs:w-auto justify-center"
              >
                <span>Explore Calculators</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/contact"
                className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md text-white font-medium rounded-xl border border-white/15 hover:bg-white/20 transition-all text-sm sm:text-base w-full xs:w-auto justify-center"
              >
                <span>Get Expert Advice</span>
              </Link>
            </motion.div>
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

      {/* ================= QUICK ACCESS ================= */}
      <section className="py-6 sm:py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {quickCategories.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white hover:bg-emerald-50 rounded-full text-xs sm:text-sm font-medium text-gray-600 hover:text-emerald-700 transition-all border border-gray-100 hover:border-emerald-200"
              >
                <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ALL CALCULATORS ================= */}
      <section id="calculators" className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">
                All Calculators
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Choose Your{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Calculator
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-xl mx-auto">
              Powerful tools to help you plan every aspect of your financial life.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {calculators.map((calculator, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-100 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4 transition-colors duration-300">
                  <calculator.icon className="w-5 h-5" />
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                  {calculator.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {calculator.description}
                </p>

                {/* Features */}
                <div className="space-y-1.5 mb-5">
                  {calculator.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  to={calculator.path}
                  className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 bg-gray-50 group-hover:bg-emerald-50 rounded-xl text-emerald-700 font-semibold text-sm transition-all"
                >
                  Open Calculator
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= HOW TO USE ================= */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-emerald-50/40 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 mb-4">
              <Target className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">
                How It Works
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Simple{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Process
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            {steps.map((item, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="relative bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 text-center"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                  {item.step}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {item.desc}
                </p>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-5 h-5 text-emerald-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-600 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 text-white text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-60 h-60 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

            <div className="relative z-10">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
                Need Personalized Advice?
              </h2>
              <p className="text-emerald-100/80 text-sm sm:text-base mb-6 sm:mb-8 max-w-lg mx-auto leading-relaxed">
                Calculators give you estimates. For a comprehensive financial
                plan tailored to your needs, speak with our experts.
              </p>

              <div className="flex flex-col xs:flex-row items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-all text-sm sm:text-base w-full xs:w-auto justify-center"
                >
                  Book Free Consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-all text-sm sm:text-base w-full xs:w-auto justify-center"
                >
                  Explore Services
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-emerald-200/70">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Expert Advice</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Personalized Plan</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Calculators;