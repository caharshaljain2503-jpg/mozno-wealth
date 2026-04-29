import { motion } from "framer-motion";
import {
  TrendingUp,
  Target,
  FileText,
  Shield,
  Landmark,
  ScrollText,
  Check,
  ChevronRight,
  Sparkles,
  UserCheck,
  Building2,
  GraduationCap,
  MessageSquareText,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mozno Wealth's 6 Core Services
const features = [
  {
    icon: TrendingUp,
    title: "Wealth Management",
    description: "MF, PMS, AIFs & Bonds",
  },
  {
    icon: Target,
    title: "Financial Planning",
    description: "Goal-based strategies",
  },
  {
    icon: FileText,
    title: "Tax Planning",
    description: "Direct & Indirect tax",
  },
  {
    icon: Shield,
    title: "Insurance Planning",
    description: "Life & Health coverage",
  },
  {
    icon: Landmark,
    title: "Borrowing Solutions",
    description: "Home & Consumer loans",
  },
  {
    icon: ScrollText,
    title: "Succession Planning",
    description: "Will & Estate services",
  },
];

// Updated "Why Choose Us" — 5 points from client's email
const whyChooseUs = [
  {
    icon: UserCheck,
    title: "Your Own Personal CFO, Not a Seller",
    description:
      "Mozno Wealth doesn't push products – it acts as your personal CFO. We first understand your income, goals, risks, family needs and existing portfolio, and only then design a plan.",
  },
  {
    icon: Building2,
    title: "One Roof for Every Major Money Decision",
    description:
      "No more running to different people for investments, insurance, loans, taxes and wills. One integrated team handling everything, so every decision talks to the other.",
  },
  {
    icon: GraduationCap,
    title: "Led by Experts with Real-World Insight",
    description:
      "Founded by Harshal Jain, who brings institutional-grade knowledge to everyday Indian investors. Deep technical expertise translated into clear, practical actions.",
  },
  {
    icon: MessageSquareText,
    title: "Simple Language, Clear Trade-Offs, India Context",
    description:
      "We cut the jargon and explain everything in simple English/Hinglish with India-specific tax and regulation in mind. Every recommendation comes with clear pros and cons.",
  },
  {
    icon: Smartphone,
    title: "Built for Busy, Digital-First Indians",
    description:
      "Whether you're in Tier I or a tier-II/III city, Mozno Wealth is designed for your schedule and lifestyle with digital-first processes and education-led content.",
  },
];

export default function FeaturesSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-2/3 sm:w-1/2 h-1/2 bg-gradient-to-br from-emerald-50/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-2/3 sm:w-1/2 h-1/2 bg-gradient-to-tl from-slate-50/60 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 min-[375px]:px-4 sm:px-6 lg:px-8 py-10 min-[375px]:py-12 sm:py-16 md:py-20 lg:py-24">
        {/* ===== HEADER ===== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-6 min-[375px]:mb-8 sm:mb-10 lg:mb-14"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            custom={0}
            className="mb-3 min-[375px]:mb-4 sm:mb-5"
          >
            <span className="inline-flex items-center gap-1.5 min-[375px]:gap-2 px-3 min-[375px]:px-3.5 sm:px-4 py-1.5 min-[375px]:py-1.5 bg-emerald-50 border border-emerald-100 rounded-full whitespace-nowrap">
              <Sparkles className="w-3 h-3 min-[375px]:w-3.5 min-[375px]:h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
              <span className="text-[11px] min-[375px]:text-[12px] sm:text-xs md:text-sm font-medium text-emerald-700">
                Our Services
              </span>
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeInUp}
            custom={1}
            className="text-[1.375rem] min-[375px]:text-[1.625rem] sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-2.5 min-[375px]:mb-3 sm:mb-4"
          >
            Personal Finance{" "}
            <span
              style={{ fontFamily: "Playfair Display, serif" }}
              className="text-emerald-600"
            >
              Made
            </span>{" "}
            Easy
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-[13px] min-[375px]:text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-1"
          >
            Mozno Wealth is your comprehensive wealth partner. We offer integrated financial solutions
            tailored specifically for YOU.
          </motion.p>
        </motion.div>

        {/* ===== FEATURE GRID (6 Services) ===== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 min-[375px]:gap-3 sm:gap-4 md:gap-5 mb-10 min-[375px]:mb-12 sm:mb-16 lg:mb-20"
        >
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={fadeInUp}
                custom={i * 0.1}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-lg min-[375px]:rounded-xl sm:rounded-2xl p-2.5 min-[375px]:p-3 sm:p-4 md:p-5 border border-gray-100 hover:border-emerald-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer text-center"
              >
                {/* Icon */}
                <div className="w-8 h-8 min-[375px]:w-10 min-[375px]:h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg min-[375px]:rounded-xl bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center mx-auto mb-1.5 min-[375px]:mb-2 sm:mb-3 transition-colors">
                  <Icon className="w-4 h-4 min-[375px]:w-5 min-[375px]:h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-emerald-600" />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-[10px] min-[375px]:text-xs sm:text-sm md:text-base text-gray-900 group-hover:text-emerald-700 transition-colors mb-0.5 leading-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="hidden min-[375px]:block text-[9px] sm:text-[10px] md:text-xs text-gray-500 leading-tight">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ===== WHY CHOOSE US SECTION ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-[375px]:gap-8 sm:gap-10 lg:gap-14 xl:gap-16 items-center">
          {/* LEFT - Image with Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative order-2 lg:order-1"
          >
            {/* Main Image */}
            <div className="relative rounded-lg min-[375px]:rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-md min-[375px]:shadow-lg sm:shadow-xl md:shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop"
                alt="Wealth management"
                className="w-full h-[220px] min-[375px]:h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] xl:h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Floating Stats Card - Top Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -left-1 min-[375px]:-left-2 sm:-left-4 md:-left-5 top-3 min-[375px]:top-4 sm:top-6 md:top-8 bg-white rounded-lg min-[375px]:rounded-xl sm:rounded-2xl shadow-md min-[375px]:shadow-lg sm:shadow-xl p-2 min-[375px]:p-3 sm:p-4 md:p-5 border border-gray-100 w-[95px] min-[375px]:w-[110px] sm:w-[130px] md:w-[145px]"
            >
              <div className="space-y-1.5 min-[375px]:space-y-2 sm:space-y-3 md:space-y-4">
                <StatItem value="6" label="Integrated Services" />
                <div className="h-px bg-gray-100" />
                <StatItem value="Pan India" label="Coverage" highlight />
                <div className="h-px bg-gray-100" />
                <StatItem value="Digital" label="First Approach" />
              </div>
            </motion.div>

            {/* Floating Badge - Bottom Right — Updated: AMFI Registered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -right-1 min-[375px]:-right-2 sm:-right-4 md:-right-5 bottom-3 min-[375px]:bottom-4 sm:bottom-6 md:bottom-8 bg-white rounded-lg min-[375px]:rounded-xl sm:rounded-2xl shadow-md min-[375px]:shadow-lg sm:shadow-xl p-2 min-[375px]:p-2.5 sm:p-3 md:p-4 border border-gray-100"
            >
              <div className="flex items-center gap-1.5 min-[375px]:gap-2 sm:gap-2.5 md:gap-3">
                <div className="w-7 h-7 min-[375px]:w-8 min-[375px]:h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-md sm:rounded-lg md:rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-3.5 h-3.5 min-[375px]:w-4 min-[375px]:h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[10px] min-[375px]:text-[11px] sm:text-xs md:text-sm font-semibold text-gray-900">
                    AMFI Registered
                  </p>
                  <p className="text-[8px] min-[375px]:text-[9px] sm:text-[10px] md:text-xs text-gray-500">
                    ARN-338534
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT - Why Choose Us (How It Works–style stagger, from the right) */}
          <div className="order-1 lg:order-2">
            {/* Badge */}
            <motion.div
              className="mb-2.5 min-[375px]:mb-3 sm:mb-4 md:mb-5"
              initial={{ opacity: 0, x: 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
            >
              <span className="inline-flex items-center gap-1 min-[375px]:gap-1.5 sm:gap-2 px-2.5 min-[375px]:px-3 sm:px-4 py-1 min-[375px]:py-1.5 bg-emerald-50 border border-emerald-100 rounded-full">
                <span className="w-1.5 h-1.5 min-[375px]:w-2 min-[375px]:h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] min-[375px]:text-[11px] sm:text-xs md:text-sm font-medium text-emerald-700">
                  Why Choose Us
                </span>
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h3
              className="text-lg min-[375px]:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2.5 min-[375px]:mb-3 sm:mb-4 md:mb-5 break-words"
              initial={{ opacity: 0, x: 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              Your Personal{" "}
              <span
                style={{ fontFamily: "Playfair Display, serif" }}
                className="text-emerald-600"
              >
                CFO
              </span>
              , Not Just
              <span className="block min-[480px]:inline min-[480px]:ml-1">
                {" "}
                Another Advisor
              </span>
            </motion.h3>

            {/* Description */}
            <motion.p
              className="text-[12px] min-[375px]:text-[13px] sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed mb-4 min-[375px]:mb-5 sm:mb-6 md:mb-8 break-words overflow-wrap-break-word"
              initial={{ opacity: 0, x: 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              Mozno Wealth is your comprehensive wealth partner. We offer integrated financial solutions tailored specifically for YOU.
            </motion.p>

            {/* Why Choose Us List — 5 items from client */}
            <div className="space-y-2 min-[375px]:space-y-2.5 sm:space-y-3 md:space-y-4 mb-5 min-[375px]:mb-6 sm:mb-7 md:mb-8">
              {whyChooseUs.map((item, index) => (
                <WhyChooseUsItem
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  index={index}
                />
              ))}
            </div>

            <motion.div
              className="flex flex-col min-[375px]:flex-row gap-2 min-[375px]:gap-2.5 sm:gap-3 md:gap-4"
              initial={{ opacity: 0, x: 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.3 + whyChooseUs.length * 0.1,
              }}
            >
              <Link to="/contact" className="w-full min-[375px]:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full min-[375px]:w-auto group flex items-center justify-center gap-1.5 min-[375px]:gap-2 px-3.5 min-[375px]:px-4 sm:px-5 md:px-6 py-2 min-[375px]:py-2.5 sm:py-3 md:py-3.5 bg-gray-900 hover:bg-gray-800 text-white text-[11px] min-[375px]:text-xs sm:text-sm md:text-base font-semibold rounded-lg min-[375px]:rounded-xl transition-colors"
                >
                  Book Free Consultation
                  <ChevronRight className="w-3.5 h-3.5 min-[375px]:w-4 min-[375px]:h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
}

// ===== SUB COMPONENTS =====

function StatItem({ value, label, highlight = false }) {
  return (
    <div className="text-center break-words">
      <p
        className={`text-[11px] min-[375px]:text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-tight ${highlight ? "text-emerald-600" : "text-gray-900"} break-words`}
      >
        {value}
      </p>
      <p className="text-[7px] min-[375px]:text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-gray-500 font-medium leading-tight mt-0.5 break-words">
        {label}
      </p>
    </div>
  );
}

function WhyChooseUsItem({ icon: Icon, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: 0.3 + index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      }}
      className="group flex items-start gap-2 min-[375px]:gap-2.5 sm:gap-3 md:gap-4 p-2 min-[375px]:p-2.5 sm:p-3 md:p-4 rounded-lg min-[375px]:rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-md transition-all"
    >
      <div className="w-6 h-6 min-[375px]:w-7 min-[375px]:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-md min-[375px]:rounded-lg sm:rounded-xl bg-emerald-100 group-hover:bg-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
        <Icon className="w-3 h-3 min-[375px]:w-3.5 min-[375px]:h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 text-emerald-600" />
      </div>
      <div className="min-w-0 flex-1 break-words">
        <h4 className="font-semibold text-[10px] min-[375px]:text-[11px] sm:text-xs md:text-sm lg:text-base text-gray-900 group-hover:text-emerald-700 transition-colors leading-tight mb-0.5 min-[375px]:mb-1 break-words">
          {title}
        </h4>
        <p className="text-[9px] min-[375px]:text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-gray-500 leading-relaxed line-clamp-2 sm:line-clamp-none break-words">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
