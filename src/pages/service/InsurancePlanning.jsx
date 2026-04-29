import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield,
  Heart,
  Car,
  Home,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
  PieChart,
  Calculator,
  ChevronRight,
  ChevronDown,
  IndianRupee,
  FileText,
  Landmark,
  HeartPulse,
  Briefcase,
  ShieldCheck,
  BadgeCheck,
  Target,
  Lightbulb,
  ClipboardCheck,
  BarChart3,
  ShieldPlus,
} from "lucide-react";

const InsurancePlanning = () => {
  const [openFaq, setOpenFaq] = useState(null);

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

  // Insurance Types - Replaced Critical Illness with General Insurance, Removed Coverage
  const insuranceTypes = [
    {
      icon: Heart,
      title: "Term Life Insurance",
      description:
        "Pure protection for your family's financial security at affordable premiums. Ensures your loved ones are covered.",
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: HeartPulse,
      title: "Health Insurance",
      description:
        "Comprehensive medical coverage for individuals and families against hospitalization and medical expenses.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: ShieldPlus,
      title: "General Insurance",
      description:
        "Broad coverage for assets, liabilities, and unforeseen events including fire, theft, and natural disasters.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Briefcase,
      title: "Personal Accident",
      description:
        "Coverage against accidental death and disability, providing financial support during unexpected situations.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Car,
      title: "Motor Insurance",
      description:
        "Comprehensive coverage for cars and two-wheelers against damage, theft, and third-party liability.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: Home,
      title: "Home Insurance",
      description:
        "Protect your home and belongings against fire, theft, natural disasters, and structural damage.",
      color: "from-teal-500 to-emerald-500",
    },
  ];

  const benefits = [
    {
      icon: ShieldCheck,
      title: "Needs Analysis",
      desc: "Calculate exact coverage required based on your life stage and responsibilities.",
    },
    {
      icon: BadgeCheck,
      title: "Best Policies",
      desc: "Compare policies from multiple insurers to find the best fit for you.",
    },
    {
      icon: IndianRupee,
      title: "Premium Optimization",
      desc: "Get maximum coverage at the lowest possible cost with smart planning.",
    },
    {
      icon: FileText,
      title: "Claim Assistance",
      desc: "Hassle-free claim assistance when you need it the most.",
    },
  ];

  const approach = [
    {
      icon: ClipboardCheck,
      title: "Assess",
      description:
        "We evaluate your current insurance portfolio and identify coverage gaps.",
    },
    {
      icon: Lightbulb,
      title: "Recommend",
      description:
        "Suggest the right mix of insurance products based on your needs and budget.",
    },
    {
      icon: Target,
      title: "Implement",
      description:
        "Help you purchase the best policies with seamless onboarding.",
    },
    {
      icon: BarChart3,
      title: "Review",
      description:
        "Regular reviews to ensure your coverage stays aligned with life changes.",
    },
  ];

  const faqs = [
    {
      question: "How much life insurance do I really need?",
      answer:
        "A thumb rule is 10-15 times your annual income. We do a detailed needs analysis considering loans, goals, and family expenses to calculate the exact amount you need.",
    },
    {
      question: "Should I buy insurance online or through an advisor?",
      answer:
        "While online is convenient, an advisor helps with needs analysis, policy comparison, and most importantly — claim support when you need it most.",
    },
    {
      question: "Is company group insurance enough?",
      answer:
        "No. Group insurance ends when you leave the job and coverage is usually inadequate. Personal policies are essential for complete and continuous protection.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/30">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden pb-10 sm:pb-14 md:pb-20 lg:pb-24 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80')] opacity-8 bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-black/20" />

          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-20 w-40 h-40 sm:w-60 sm:h-60 bg-emerald-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              delay: 2,
              ease: "easeInOut",
            }}
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
              <Link
                to="/services"
                className="hover:text-white/80 transition-colors"
              >
                Services
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-emerald-300/80">Insurance Planning</span>
            </motion.div>

            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 mb-6"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-xs font-medium text-white/80">
                Insurance Planning
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-5"
            >
              Protect What{" "}
              <span
                className="italic bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Matters Most
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base md:text-lg text-white/70 max-w-xl mx-auto mb-8 leading-relaxed"
            >
              Comprehensive insurance solutions to safeguard your family,
              health, and assets. Right coverage at the right price.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col xs:flex-row items-center justify-center gap-3"
            >
              <Link
                to="/contact"
                className="group flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-all shadow-lg shadow-black/10 text-sm sm:text-base w-full xs:w-auto justify-center"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md text-white font-medium rounded-xl border border-white/15 hover:bg-white/20 transition-all text-sm sm:text-base w-full xs:w-auto justify-center"
              >
                <span>Get Portfolio Reviewed</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave Divider */}
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

      {/* ================= INSURANCE TYPES ================= */}
      <section className="py-12 sm:py-16 lg:py-20">
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
                Insurance Products
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Complete Protection{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Solutions
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-xl mx-auto">
              Tailored insurance products to protect every aspect of your life
              and ensure peace of mind.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {insuranceTypes.map((insurance, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-100 transition-all duration-300 group"
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${insurance.color} flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform duration-300`}
                >
                  <insurance.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                  {insurance.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {insurance.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= OUR APPROACH ================= */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-emerald-50/40 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Our Approach
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              How We{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Work
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-xl mx-auto">
              A systematic approach to ensure you have the right coverage for
              every stage of life.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            {approach.map((step, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="relative bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {index < approach.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-5 h-5 text-emerald-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 mb-4">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">
                Why Us
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Why Plan Insurance With{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Mozno Wealth?
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-100 transition-all duration-300 text-center"
              >
                <div className="w-11 h-11 mx-auto mb-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                  <benefit.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= FAQs ================= */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
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
            className="space-y-3"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-gray-50/50 transition-colors"
                >
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <p className="text-sm text-gray-600 leading-relaxed px-4 sm:px-5 pb-4 sm:pb-5 border-t border-gray-50 pt-3">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= OTHER SERVICES ================= */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Explore Other{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Services
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
          >
            {[
              {
                name: "Wealth Management",
                path: "/services/wealth-management",
                icon: TrendingUp,
              },
              {
                name: "Financial Planning",
                path: "/services/financial-planning",
                icon: PieChart,
              },
              {
                name: "Tax Planning",
                path: "/services/tax-planning",
                icon: Calculator,
              },
              {
                name: "Borrowing Solutions",
                path: "/services/borrowing-solutions",
                icon: Landmark,
              },
              {
                name: "Succession Planning",
                path: "/services/succession-planning",
                icon: Users,
              },
            ].map((service, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Link
                  to={service.path}
                  className="block bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-100 transition-all duration-300 group text-center"
                >
                  <div className="w-10 h-10 mx-auto mb-2.5 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors duration-300">
                    <service.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                    {service.name}
                  </h3>
                </Link>
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
                Is Your Family Protected?
              </h2>
              <p className="text-emerald-100/80 text-sm sm:text-base mb-6 sm:mb-8 max-w-lg mx-auto leading-relaxed">
                Get a free insurance review to identify gaps in your current
                coverage and ensure complete protection for your loved ones.
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
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-all text-sm sm:text-base w-full xs:w-auto justify-center"
                >
                  Get Portfolio Reviewed
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-emerald-200/70">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Needs-Based Advice</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Claim Support</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default InsurancePlanning;