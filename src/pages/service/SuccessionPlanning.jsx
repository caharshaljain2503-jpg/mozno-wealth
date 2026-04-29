import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  FileText,
  Shield,
  Scale,
  Building2,
  Heart,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
  PieChart,
  Calculator,
  ChevronRight,
  ChevronDown,
  Landmark,
  AlertCircle,
  ScrollText,
  Home,
  Briefcase,
  UserCheck,
  GitBranch,
  Lock,
  HandHeart,
  Crown,
  XCircle,
  HelpCircle,
  Target,
  Lightbulb,
  ClipboardCheck,
  BarChart3,
} from "lucide-react";

const SuccessionPlanning = () => {
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

  const services = [
    {
      icon: ScrollText,
      title: "Will Drafting",
      description:
        "Legally sound will preparation ensuring your wishes are honored and your family is protected.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: GitBranch,
      title: "Family Trust Setup",
      description:
        "Create trusts for asset protection and smooth wealth transfer across generations.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Building2,
      title: "Business Succession",
      description:
        "Seamless transition planning for family businesses ensuring continuity and growth.",
      color: "from-teal-500 to-emerald-500",
    },
    {
      icon: Crown,
      title: "Estate Planning",
      description:
        "Comprehensive estate structuring to minimize disputes and maximize value preservation.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: UserCheck,
      title: "Nominee Management",
      description:
        "Review and update nominees across all assets, accounts, and policies systematically.",
      color: "from-emerald-500 to-cyan-500",
    },
    {
      icon: Lock,
      title: "Asset Documentation",
      description:
        "Complete documentation of all assets for easy identification and smooth inheritance.",
      color: "from-teal-500 to-blue-500",
    },
  ];

  const withoutWillProblems = [
    {
      icon: HelpCircle,
      title: "Your family is left in the dark",
      description:
        "Spouses and parents often have no clear list of bank accounts, FDs, or policies. Months can disappear just trying to find where the money is — while bills and life keep moving.",
    },
    {
      icon: Scale,
      title: "The law decides — not your wishes",
      description:
        "Without a will, intestate succession rules decide who gets what. That split may not match what you would have chosen; your spouse may not receive everything you assumed they would.",
    },
    {
      icon: Users,
      title: "Stress and disputes at the worst time",
      description:
        "In grief, unclear instructions fuel resentment between siblings and can spiral into long legal battles — exactly when your family needs peace, not paperwork wars.",
    },
    {
      icon: XCircle,
      title: "Years of effort can be undone",
      description:
        "Decades of disciplined saving can sit locked in court, drain away in legal costs, or be divided in ways you never intended — not because anyone meant harm, but because nothing was written down.",
    },
  ];

  const whyItMatters = [
    {
      icon: Heart,
      title: "Protect Family",
      desc: "Avoid disputes and ensure harmony among your loved ones.",
    },
    {
      icon: Scale,
      title: "Legal Clarity",
      desc: "Clear legal ownership transfer without ambiguity.",
    },
    {
      icon: Shield,
      title: "Tax Efficiency",
      desc: "Minimize inheritance-related taxes and legal costs.",
    },
    {
      icon: HandHeart,
      title: "Your Wishes",
      desc: "Ensure your intentions are followed exactly as you want.",
    },
  ];

  const assetTypes = [
    {
      icon: Home,
      title: "Real Estate",
      items: ["Properties", "Land", "Commercial"],
    },
    {
      icon: TrendingUp,
      title: "Investments",
      items: ["Stocks", "Mutual Funds", "Bonds"],
    },
    {
      icon: Landmark,
      title: "Bank Accounts",
      items: ["Savings", "FDs", "Lockers"],
    },
    {
      icon: Briefcase,
      title: "Business",
      items: ["Ownership", "Partnerships", "Shares"],
    },
  ];

  const approach = [
    {
      icon: ClipboardCheck,
      title: "Discover",
      description:
        "We map your complete asset inventory and understand your family dynamics.",
    },
    {
      icon: Lightbulb,
      title: "Structure",
      description:
        "Design the right succession framework — will, trust, or combination.",
    },
    {
      icon: Target,
      title: "Document",
      description:
        "Legally draft all documents with proper witnesses and registration.",
    },
    {
      icon: BarChart3,
      title: "Review",
      description:
        "Periodic reviews to keep your succession plan aligned with life changes.",
    },
  ];

  // First & Third FAQ as per client instruction
  const faqs = [
    {
      question: "At what age should I start succession planning?",
      answer:
        "Ideally as soon as you have dependents or significant assets. It's not about age but about protecting your family. Even young professionals with property should have a basic will in place.",
    },
    {
      question: "How often should I update my will?",
      answer:
        "Review every 3-5 years or after major life events like marriage, birth of children, property purchase, or significant change in assets or family situation.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/30">
      {/* ================= HERO SECTION ================= */}
       <section className="relative overflow-hidden pb-10 sm:pb-14 md:pb-20 lg:pb-24 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=80')] opacity-8 bg-cover bg-center" />
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
              <span className="text-emerald-300/80">Succession Planning</span>
            </motion.div>

            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 mb-6"
            >
              <Users className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-xs font-medium text-white/80">
                Succession Planning
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-5"
            >
              Secure Your{" "}
              <span
                className="italic bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Family's Future
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base md:text-lg text-white/70 max-w-xl mx-auto mb-8 leading-relaxed"
            >
              Plan the seamless transfer of your wealth to the next generation.
              Protect your legacy with proper wills, trusts, and estate
              planning.
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

      {/* ================= WHAT HAPPENS WITHOUT A WILL ================= */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-full border border-red-100 mb-4">
              <AlertCircle className="w-3.5 h-3.5 text-red-600" />
              <span className="text-xs font-medium text-red-700">
                Important to Know
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              What Happens If You Don't{" "}
              <span
                className="italic text-red-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Make a Will?
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-2xl mx-auto leading-relaxed">
              A will is not only about assets — it is about clarity for the
              people you love. Without it, those closest to you can face
              confusion, delay, and conflict at the moment they are least
              equipped to cope.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
          >
            {withoutWillProblems.map((problem, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-red-100 hover:shadow-md hover:border-red-200 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500 flex-shrink-0">
                    <problem.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5">
                      {problem.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
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
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">
                Our Services
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Comprehensive Legacy{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Planning
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-100 transition-all duration-300 group"
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform duration-300`}
                >
                  <service.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= OUR APPROACH ================= */}
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
              A structured approach to protect your legacy and ensure seamless
              wealth transfer.
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

      {/* ================= ASSET TYPES ================= */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-emerald-50/40 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Assets We Help{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Document
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3">
              Complete inventory for seamless inheritance
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            {assetTypes.map((asset, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-100 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white mb-4">
                  <asset.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3">
                  {asset.title}
                </h3>
                <div className="space-y-2">
                  {asset.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= WHY IT MATTERS ================= */}
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
                Why It Matters
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Why Succession Planning{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Matters
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
            {whyItMatters.map((item, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-100 transition-all duration-300 text-center"
              >
                <div className="w-11 h-11 mx-auto mb-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.desc}
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
                name: "Insurance Planning",
                path: "/services/insurance-planning",
                icon: Shield,
              },
              {
                name: "Borrowing Solutions",
                path: "/services/borrowing-solutions",
                icon: Landmark,
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
                <ScrollText className="w-6 h-6" />
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
                Protect Your Legacy Today
              </h2>
              <p className="text-emerald-100/80 text-sm sm:text-base mb-6 sm:mb-8 max-w-lg mx-auto leading-relaxed">
                Don't leave your family's future to chance. Start your
                succession planning with a free consultation today.
              </p>

              <div className="flex flex-col xs:flex-row items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-all text-sm sm:text-base w-full xs:w-auto justify-center"
                >
                  Book Free Consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
               
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-emerald-200/70">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Legal Experts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Complete Documentation</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SuccessionPlanning;