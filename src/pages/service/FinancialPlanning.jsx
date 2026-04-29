import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calculator,
  Target,
  TrendingUp,
  Shield,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
  PieChart,
  Wallet,
  Home,
  GraduationCap,
  Plane,
  Baby,
  Heart,
  Clock,
  ChevronRight,
  ChevronDown,
  FileText,
  Lightbulb,
  Zap,
  BookOpen,
  Landmark,
  Briefcase,
  ClipboardCheck,
  BarChart3,
  MessageCircle,
  Flag,
} from "lucide-react";

const FinancialPlanning = () => {
  const [activeGoal, setActiveGoal] = useState(0);
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

  const coreServices = [
    {
      icon: Target,
      title: "Goal-Based Planning",
      description:
        "Structured planning for specific life goals like buying a home, child education, or dream vacation.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: PieChart,
      title: "Strategic Asset Allocation",
      description:
        "Optimal distribution of investments across asset classes based on your risk profile, time horizon, and financial goals.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Heart,
      title: "Retirement Planning",
      description:
        "Comprehensive retirement corpus building strategies to ensure financial independence in your golden years.",
      color: "from-teal-500 to-emerald-500",
    },
    {
      icon: Wallet,
      title: "Cash Flow Management & Budgeting",
      description:
        "Systematic approach to managing income, expenses, and savings to maximize wealth creation while maintaining lifestyle.",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const lifeGoals = [
    {
      icon: Home,
      title: "Dream Home",
      description:
        "Plan for your perfect home with strategic savings and smart financing options.",
      color: "from-blue-500 to-cyan-500",
      timeline: "5-10 years",
      features: [
        "Down payment planning",
        "EMI optimization",
        "Property selection guidance",
      ],
    },
    {
      icon: GraduationCap,
      title: "Children's Education",
      description:
        "Secure your child's future with education-focused investment strategies.",
      color: "from-purple-500 to-pink-500",
      timeline: "10-18 years",
      features: [
        "Education cost estimation",
        "Inflation-adjusted planning",
        "Scholarship guidance",
      ],
    },
    {
      icon: Heart,
      title: "Retirement",
      description:
        "Build a corpus that ensures financial independence in your golden years.",
      color: "from-emerald-500 to-teal-500",
      timeline: "20-30 years",
      features: [
        "Retirement corpus calculation",
        "Pension planning",
        "Healthcare provisions",
      ],
    },
    {
      icon: Plane,
      title: "Dream Vacation",
      description:
        "Plan and fund your bucket-list travels without financial stress.",
      color: "from-orange-500 to-red-500",
      timeline: "1-5 years",
      features: [
        "Travel fund creation",
        "Currency planning",
        "Travel insurance",
      ],
    },
    {
      icon: Baby,
      title: "Child's Marriage",
      description:
        "Prepare for this significant milestone with dedicated savings plans.",
      color: "from-pink-500 to-rose-500",
      timeline: "15-25 years",
      features: [
        "Event cost planning",
        "Gold accumulation",
        "Venue financing",
      ],
    },
    {
      icon: Briefcase,
      title: "Business Startup",
      description:
        "Fund your entrepreneurial dreams with structured financial planning.",
      color: "from-amber-500 to-yellow-500",
      timeline: "2-5 years",
      features: [
        "Startup capital planning",
        "Risk assessment",
        "Exit strategy",
      ],
    },
  ];

  const processSteps = [
    {
      icon: MessageCircle,
      title: "Initial Consultation",
      description:
        "Free discovery call to understand your financial situation, dreams, and concerns.",
      duration: "30-45 mins",
    },
    {
      icon: FileText,
      title: "Data Collection",
      description:
        "Gather details about income, expenses, existing investments, insurance, and loans.",
      duration: "1-2 days",
    },
    {
      icon: Flag,
      title: "Goal Setting",
      description:
        "Define and prioritize your life goals with specific timelines and amounts.",
      duration: "1 hour",
    },
    {
      icon: Lightbulb,
      title: "Plan Creation",
      description:
        "Our experts craft a comprehensive financial plan tailored to your needs.",
      duration: "3-5 days",
    },
    {
      icon: BookOpen,
      title: "Plan Presentation",
      description:
        "Detailed walkthrough of your personalized financial plan with recommendations.",
      duration: "1-2 hours",
    },
    {
      icon: Zap,
      title: "Implementation",
      description:
        "Execute the plan with our guidance, setting up investments and insurance.",
      duration: "1-2 weeks",
    },
  ];

  const planComponents = [
    {
      title: "Cash Flow Management",
      icon: Wallet,
      items: [
        "Income analysis",
        "Expense tracking",
        "Surplus optimization",
        "Emergency fund",
      ],
    },
    {
      title: "Investment Planning",
      icon: TrendingUp,
      items: [
        "Asset allocation",
        "Product selection",
        "SIP planning",
        "Rebalancing strategy",
      ],
    },
    {
      title: "Risk Management",
      icon: Shield,
      items: [
        "Life insurance",
        "Health insurance",
        "General insurance",
        "Disability cover",
      ],
    },
    {
      title: "Tax Planning",
      icon: Calculator,
      items: [
        "Tax-saving investments",
        "Deduction optimization",
        "Tax-efficient withdrawals",
        "Advance tax planning",
      ],
    },
  ];

  const deliverables = [
    "Comprehensive Financial Health Report",
    "Goal-wise Investment Roadmap",
    "Insurance Needs Analysis",
    "Tax Optimization Strategy",
    "Net Worth Statement",
    "Cash Flow Analysis",
    "Retirement Corpus Calculation",
    "Education Planning Report",
    "Emergency Fund Recommendation",
    "Asset Allocation Strategy",
  ];

  const faqs = [
    {
      question: "What is a financial plan and why do I need one?",
      answer:
        "A financial plan is a comprehensive document that maps your current financial situation to your future goals. It provides clarity on how much to save, where to invest, and what insurance to have. Without a plan, you're essentially navigating your financial life without a map.",
    },
    {
      question: "How is this different from just investing in mutual funds?",
      answer:
        "Investing without a plan is like taking medicine without diagnosis. Financial planning first identifies your goals, timelines, and risk capacity, then recommends the right mix of investments, insurance, and tax strategies to achieve those goals systematically.",
    },
    {
      question: "How often should I review my financial plan?",
      answer:
        "We recommend reviewing your plan annually or whenever there's a major life change (marriage, baby, job change, inheritance, etc.). Regular reviews ensure your plan stays aligned with your evolving goals and market conditions.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/30">
      {/* ================= HERO SECTION ================= */}
     <section className="relative overflow-hidden pb-10 sm:pb-14 md:pb-20 lg:pb-24 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80')] opacity-8 bg-cover bg-center" />
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
              <span className="text-emerald-300/80">Financial Planning</span>
            </motion.div>

            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 mb-6"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-xs font-medium text-white/80">
                Financial Planning Services
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-5"
            >
              Plan Your Life Goals With{" "}
              <span
                className="italic bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Confidence
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base md:text-lg text-white/70 max-w-xl mx-auto mb-8 leading-relaxed"
            >
              Comprehensive financial roadmaps that cover your life goals, risk
              assessment, and strategic asset allocation — from child education
              to retirement planning.
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

      {/* ================= CORE SERVICES ================= */}
      <section id="services" className="py-12 sm:py-16 lg:py-20">
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
              Comprehensive Financial{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Planning
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-xl mx-auto">
              Strategic planning solutions tailored to your unique financial
              situation and life goals.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
          >
            {coreServices.map((service, index) => (
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
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {service.description}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-emerald-600 font-medium text-sm hover:gap-2.5 transition-all"
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= LIFE GOALS ================= */}
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
                Life Goals We Plan For
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Your Dreams, Our{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Expertise
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-xl mx-auto">
              Whether it's buying a home, funding education, or retiring
              comfortably — we create personalized plans for every life goal.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {lifeGoals.map((goal, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -3 }}
                onClick={() => setActiveGoal(index)}
                className={`bg-white rounded-2xl p-5 sm:p-6 shadow-sm border-2 transition-all duration-300 cursor-pointer ${
                  activeGoal === index
                    ? "border-emerald-400 shadow-md shadow-emerald-50"
                    : "border-gray-100 hover:border-emerald-200 hover:shadow-md"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center text-white mb-3`}
                >
                  <goal.icon className="w-5 h-5" />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">
                    {goal.title}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 bg-gray-50 rounded-full text-gray-500 border border-gray-100">
                    {goal.timeline}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 mb-3 leading-relaxed">
                  {goal.description}
                </p>

                <div className="space-y-1.5">
                  {goal.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span className="text-xs text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= PLAN COMPONENTS ================= */}
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
              <PieChart className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">
                Plan Components
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Four Pillars of Your{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Financial Plan
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
            {planComponents.map((component, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-100 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white mb-4">
                  <component.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3">
                  {component.title}
                </h3>
                <ul className="space-y-2">
                  {component.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
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
              <ClipboardCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">
                Our Process
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Your Planning{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Journey
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-xl mx-auto">
              A structured 6-step process to create your personalized financial
              roadmap.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-100 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <step.icon className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-2">
                  {step.description}
                </p>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 rounded-full text-[10px] sm:text-xs font-medium text-emerald-700">
                  <Clock className="w-3 h-3" />
                  {step.duration}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= DELIVERABLES ================= */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 mb-4">
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs font-medium text-emerald-700">
                  What You Get
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Your Financial Plan{" "}
                <span
                  className="italic text-emerald-600"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Deliverables
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                A comprehensive financial plan document with actionable insights
                and recommendations tailored to your unique situation.
              </p>

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-5 sm:p-6 text-white">
                <h3 className="text-base sm:text-lg font-bold mb-2">
                  Plan Your Financial Future Today
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 mb-4 leading-relaxed">
                  Get a personalized financial roadmap tailored to your life
                  goals.
                </p>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-4 py-2.5 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-all text-sm"
                >
                  Book Free Consultation
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Right: Deliverables List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
            >
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                Plan Includes:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {deliverables.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-center gap-2 p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-50"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-700">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
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
                <Calculator className="w-6 h-6" />
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
                Ready to Plan Your Financial Future?
              </h2>
              <p className="text-emerald-100/80 text-sm sm:text-base mb-6 sm:mb-8 max-w-lg mx-auto leading-relaxed">
                Start with a free consultation to understand how a comprehensive
                financial plan can transform your life goals into reality.
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
                  <span>Personalized Plans</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Goal-Based Approach</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FinancialPlanning;