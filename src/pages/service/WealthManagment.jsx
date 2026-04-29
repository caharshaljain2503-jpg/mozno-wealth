import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Shield,
  PieChart,
  BarChart3,
  Target,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Briefcase,
  LineChart,
  Wallet,
  Landmark,
  Coins,
  ChevronRight,
  ChevronDown,
  FileText,
  Calculator,
  Clock,
  Zap,
  Eye,
  ClipboardCheck,
  Lightbulb,
} from "lucide-react";

const WealthManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
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

  const features = [
    {
      icon: PieChart,
      title: "Portfolio Construction",
      description:
        "Scientifically designed portfolios based on your risk profile, goals, and investment horizon.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: BarChart3,
      title: "Asset Allocation",
      description:
        "Strategic distribution across equity, debt, gold, and alternative investments for optimal returns.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Shield,
      title: "Risk Management",
      description:
        "Continuous monitoring and rebalancing to protect your wealth from market volatility.",
      color: "from-teal-500 to-emerald-500",
    },
    {
      icon: TrendingUp,
      title: "Growth Optimization",
      description:
        "Active strategies to maximize wealth appreciation while maintaining your comfort level.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: LineChart,
      title: "Performance Tracking",
      description:
        "Real-time dashboards and quarterly reviews to keep you informed about your investments.",
      color: "from-emerald-500 to-cyan-500",
    },
    {
      icon: Wallet,
      title: "Tax Efficiency",
      description:
        "Strategic investment decisions to minimize tax liability and maximize post-tax returns.",
      color: "from-teal-500 to-blue-500",
    },
  ];

  const investmentOptions = [
    {
      tabName: "Mutual Funds",
      icon: PieChart,
      headline: "Mutual Funds",
      body: "The simplest, most regulated entry point to wealth creation. Whether you're starting a ₹500 SIP or deploying ₹50 lakhs, we match the right fund to your goal — not to our incentive.",
      items: [
        "Equity Funds — Large Cap, Mid Cap, Small Cap, Flexi Cap",
        "Debt Funds — Liquid, Short Duration, Corporate Bond",
        "Hybrid Funds — Balanced Advantage, Aggressive Hybrid",
        "Index Funds — Nifty 50, Nifty Next 50, Nifty Midcap 150",
        "ELSS — Tax-saving funds with 3-year lock-in",
        "Sectoral / Thematic — IT, Pharma, PSU, Infrastructure",
        "International Funds — US, Global, Emerging Markets",
        "Overnight / Liquid — Parking surplus capital safely",
      ],
      ctaLabel: "Explore Mutual Funds",
    },
    {
      tabName: "SIF",
      icon: Shield,
      headline: "Specialized Investment Funds",
      body: "A new SEBI-regulated category designed for sophisticated investors who want the flexibility of PMS with the structure of a mutual fund. Minimum ₹10 Lakhs. Higher alpha potential, institutional-grade strategy.",
      items: [
        "Long-Short Equity — Hedge positions within a regulated framework",
        "Sector-Concentrated Funds — High-conviction bets on specific themes",
        "Quant-Based Strategies — Algorithm-driven, rules-based portfolio",
        "Factor Investing — Value, Momentum, Quality, Low Volatility",
      ],
      eligibilityBadge: "Minimum ₹10 Lakhs · SEBI Regulated · For Accredited Investors",
      oneLinerInsight:
        "SIFs bridge the gap between mutual funds and PMS.",
      ctaLabel: "Know If SIF Is Right for You",
    },
    {
      tabName: "PMS",
      icon: Briefcase,
      headline: "Portfolio Management Services",
      body: "Your money, managed individually. Unlike mutual funds where you co-own a pool, PMS gives you direct ownership of every stock in your portfolio — with a dedicated manager and a transparent, customised strategy built around your goals.",
      items: [
        "Discretionary PMS — Manager takes decisions; you monitor outcomes",
        "Non-Discretionary PMS — Advisor recommends; you approve each trade",
        "Equity PMS — High-conviction, concentrated stock portfolios",
        "Multi-Asset PMS — Equity + Debt + Alternatives in one mandate",
        "Smallcap / Midcap PMS — Higher growth, carefully managed volatility",
        "Quant PMS — Data-driven, emotion-free investing",
      ],
      eligibilityBadge:
        "Minimum ₹50 Lakhs · SEBI Registered Managers · Direct Stock Ownership",
      oneLinerInsight:
        "PMS is not for everyone — but for the right investor, it can be transformative.",
      ctaLabel: "Check PMS Eligibility",
    },
    {
      tabName: "AIF",
      icon: Coins,
      headline: "Alternative Investment Funds",
      body: "For investors who want exposure beyond public markets. AIFs give you access to private equity, venture capital, real estate, and hedge strategies — asset classes that power institutional portfolios, now accessible to HNIs.",
      items: [
        "Category I — Venture Capital — Early-stage startups, innovation-led growth",
        "Category I — Infrastructure — Roads, ports, renewable energy projects",
        "Category II — Private Equity — Ownership in growing unlisted companies",
        "Category II — Real Estate Funds — Organized real estate without direct ownership",
        "Category II — Debt Funds — Private credit, higher yields, secured lending",
        "Category III — Hedge Funds — Long-short, arbitrage, complex strategies",
      ],
      eligibilityBadge:
        "Minimum ₹1 Crore · SEBI Registered · Accredited Investors Only",
      oneLinerInsight:
        "The wealthy don't just invest in markets. They invest in what moves markets.",
      ctaLabel: "Explore AIF Opportunities",
    },
    {
      tabName: "Unlisted Shares",
      icon: Wallet,
      headline: "Unlisted Shares",
      body: "Invest in tomorrow's blue chips — today. Unlisted shares give you access to high-growth companies before they hit the stock exchange. Higher risk, higher potential, and the rare opportunity to be early.",
      items: [
        // "Pre-IPO Shares — Buy before the listing pop",
        "ESOP Monetisation — Unlock value from your employee stock options",
        "Startup Equity — Curated, vetted private company stakes",
        "Unicorn Secondaries — Secondary market stakes in late-stage startups",
        "Unlisted PSU / NBFC Shares — State-backed companies before disinvestment",
      ],
      riskBadge:
        "Higher Risk · Illiquid · Long Horizon · Expert Guidance Recommended",
      oneLinerInsight:
        "Every Infosys, Zomato, and Nykaa was once unlisted.",
      ctaLabel: "View Current Unlisted Opportunities",
    },
    {
      tabName: "Bonds & Fixed Income",
      icon: Landmark,
      headline: "Bonds & Fixed Income",
      body: "Predictable returns. Capital protection. Regular income. Fixed income isn't boring — it's the foundation every serious portfolio is built on. We help you go beyond FDs and unlock better yields with the right risk-return trade-off.",
      items: [
        "Government Securities (G-Secs)",
        "Corporate Bonds — Investment-grade companies, higher coupon",
        "Tax-Free Bonds — Exempt from income tax; ideal for high tax brackets",
        "Non-Convertible Debentures (NCDs) — Fixed returns from reputed issuers",
        "PSU Bonds — Government-backed enterprise bonds",
        "RBI Floating Rate Bonds — Inflation-linked, sovereign-backed",
        "SGBs (Sovereign Gold Bonds) — Gold exposure with 2.5% annual interest",
        "Market Linked Debentures (MLDs) — Capital protection with equity-linked upside",
      ],
      oneLinerInsight:
        "Your FD is quietly losing to inflation. Bonds earn more.",
      ctaLabel: "Explore Fixed Income Options",
    },
    {
      tabName: "Structured Products",
      icon: Shield,
      headline: "Structured Products",
      body: "Engineered for specific outcomes. Structured products combine multiple instruments — equity, debt, derivatives — to give you defined risk-return payoffs. Capital protection with upside participation, or enhanced yield with managed downside. Built for investors who want precision.",
      items: [
        "Capital Protected Structures — 100% principal safety + market-linked returns",
        "Principal at Risk Structures — Higher return potential with defined max loss",
        "Yield Enhancement Products — Higher income via options overlay strategies",
        "Market Linked Debentures (MLDs) — Debt + equity combo, tax-efficient",
        "Basket Structures — Multi-stock or multi-index payoff strategies",
        "Real Estate Structured Debt — Fixed return from real estate developers",
      ],
      eligibilityBadge: "Typically ₹5L+ · Tenure-Based · Suitable for HNIs",
      oneLinerInsight:
        "Structured products aren't complex — they're just precise.",
      ctaLabel: "Understand If This Fits Your Portfolio",
    },
    {
      tabName: "Global Investing",
      icon: FileText,
      headline: "Global Investing",
      body: "Your wealth shouldn't be limited by your passport. Investing globally gives you access to the world's most innovative companies, stronger currencies, and geographies that grow when India consolidates. Dollar-denominated assets. Diversification across borders. A truly international portfolio.",
      items: [
        "US Stocks & ETFs — Apple, Microsoft, S&P 500 — direct ownership",
        "International Mutual Funds — India-regulated funds with global exposure",
        "Feeder Funds — Access global fund houses via Indian feeder route",
        "GIFT City Funds — Tax-efficient global investing from India",
        "Foreign Currency Bonds — USD-denominated fixed income",
        "Emerging Market Funds — China, Southeast Asia, Latin America exposure",
        "Thematic Global ETFs — AI, Clean Energy, Semiconductor, Healthcare",
      ],
      regulatoryNote:
        "LRS Limit: USD 2,50,000 per year · RBI Regulated · FEMA Compliant",
      oneLinerInsight:
        "When the Nifty sleeps, the S&P 500 is wide awake.",
      ctaLabel: "Start Your Global Portfolio",
    },
  ];

  const processSteps = [
    {
      icon: ClipboardCheck,
      title: "Discovery Call",
      description:
        "We start with a detailed conversation to understand your financial situation, goals, and aspirations.",
      duration: "30 mins",
    },
    {
      icon: Target,
      title: "Risk Profiling",
      description:
        "Scientific assessment of your risk tolerance and investment temperament using proven methodologies.",
      duration: "45 mins",
    },
    {
      icon: Lightbulb,
      title: "Strategy Design",
      description:
        "Our experts craft a personalized wealth management strategy aligned with your unique profile.",
      duration: "2-3 days",
    },
    {
      icon: Zap,
      title: "Implementation",
      description:
        "Seamless execution of your investment plan with complete transparency and documentation.",
      duration: "1-2 days",
    },
    {
      icon: Eye,
      title: "Ongoing Review",
      description:
        "Regular monitoring, rebalancing, and quarterly reviews to ensure you stay on track.",
      duration: "Periodic",
    },
  ];

  // Removed pricing FAQ as per client instruction
  const faqs = [
    {
      question: "What is the minimum investment amount?",
      answer:
        "We don't have a strict minimum. We work with clients at various stages of their wealth journey. However, for comprehensive portfolio management services, we typically recommend starting with ₹10 lakhs to ensure proper diversification.",
    },
    {
      question: "How often will my portfolio be reviewed?",
      answer:
        "We conduct quarterly portfolio reviews with detailed performance reports. Additionally, we monitor your portfolio continuously and make tactical adjustments based on market conditions when necessary.",
    },
    {
      question: "Can I withdraw my money anytime?",
      answer:
        "Yes, you have complete liquidity. While we recommend staying invested for the long term to achieve your goals, you can withdraw your funds whenever needed with no lock-in from our side.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/30">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-28 lg:py-36">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80')] opacity-8 bg-cover bg-center" />
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
              <span className="text-emerald-300/80">Wealth Management</span>
            </motion.div>

            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 mb-6"
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-xs font-medium text-white/80">
                Wealth Management Services
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-5"
            >
              Maximise Returns,{" "}
              <span
                className="italic bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Minimise Risk
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base md:text-lg text-white/70 max-w-xl mx-auto mb-8 leading-relaxed"
            >
              Strategic portfolio management designed to grow your wealth while
              protecting it. Let our experts build your path to financial
              freedom.
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

      {/* ================= FEATURES ================= */}
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
                What We Offer
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Comprehensive Wealth{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Management
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-xl mx-auto">
              Our holistic approach covers every aspect of wealth creation,
              preservation, and growth tailored to your unique goals.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-100 transition-all duration-300 group"
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform duration-300`}
                >
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= INVESTMENT OPTIONS ================= */}
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
              <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">
                Investment Universe
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Beyond Mutual Funds
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-xl mx-auto">
              From your first SIP to a multi-crore alternative portfolio — every
              asset class, every risk appetite, one manager.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8">
            {investmentOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${activeTab === index
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                  }`}
              >
                <option.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {option.tabName}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-sm border border-gray-100"
          >
            <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-center">
              <div className="w-full md:w-1/2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white mb-4 sm:mb-6">
                  {React.createElement(investmentOptions[activeTab].icon, {
                    className: "w-7 h-7 sm:w-8 sm:h-8",
                  })}
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {investmentOptions[activeTab].headline}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  {investmentOptions[activeTab].body}
                </p>
                {investmentOptions[activeTab].eligibilityBadge && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {investmentOptions[activeTab].eligibilityBadge
                      .split("·")
                      .map((t) => t.trim())
                      .filter(Boolean)
                      .map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"
                        >
                          {t}
                        </span>
                      ))}
                  </div>
                )}

                {investmentOptions[activeTab].riskBadge && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {investmentOptions[activeTab].riskBadge.split("·").map((t) => t.trim()).filter(Boolean).map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {investmentOptions[activeTab].regulatoryNote && (
                  <p className="text-[11px] text-gray-600 mb-4">
                    {investmentOptions[activeTab].regulatoryNote}
                  </p>
                )}

                {investmentOptions[activeTab].oneLinerInsight && (
                  <p className="text-xs sm:text-sm text-gray-600 italic mb-4">
                    "{investmentOptions[activeTab].oneLinerInsight}"
                  </p>
                )}
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-sm sm:text-base hover:gap-3 transition-all"
                >
                  {investmentOptions[activeTab].ctaLabel || "Explore →"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="w-full md:w-1/2 grid grid-cols-2 gap-2 sm:gap-3">
                {investmentOptions[activeTab].items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-2 bg-emerald-50 rounded-xl p-3 sm:p-4"
                  >
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section id="how-it-works" className="py-12 sm:py-16 lg:py-20">
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
                Our Process
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              How We Build Your{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Wealth
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-xl mx-auto">
              A systematic 5-step approach to creating and managing your
              personalized investment portfolio.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5"
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="relative bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 text-center"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 leading-relaxed">
                  {step.description}
                </p>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 rounded-full text-[10px] sm:text-xs font-medium text-emerald-700">
                  <Clock className="w-3 h-3" />
                  {step.duration}
                </span>

                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-5 h-5 text-emerald-300" />
                  </div>
                )}
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
                name: "Financial Planning",
                path: "/services/financial-planning",
                icon: Calculator,
              },
              {
                name: "Tax Planning",
                path: "/services/tax-planning",
                icon: FileText,
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
                <TrendingUp className="w-6 h-6" />
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
                Ready to Grow Your Wealth?
              </h2>
              <p className="text-emerald-100/80 text-sm sm:text-base mb-6 sm:mb-8 max-w-lg mx-auto leading-relaxed">
                Start your wealth creation journey today with a free
                consultation. Our experts will help you design a personalized
                investment strategy.
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
                  <span>No Obligations</span>
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

export default WealthManagement;