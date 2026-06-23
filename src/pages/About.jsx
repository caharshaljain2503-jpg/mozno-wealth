import React from "react";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import founderImage from "../assets/IMG_0756.jpeg";
import apiClient from "../api/axios.instance";
import MoznoMeaningSection from "../components/landingPage/MoznoMeaningSection";
import {
  Target,
  TrendingUp,
  Users,
  Shield,
  MapPin,
  Eye,
  Heart,
  Award,
  CheckCircle,
  ArrowRight,
  Calendar,
  BookOpen,
  Sparkles,
  Building2,
  Linkedin,
  Instagram,
  Youtube,
  Star,
  Briefcase,
  Trophy,
  Zap,
  Globe,
  Clock,
} from "lucide-react";

const ABOUT_STAT_ICONS = [Users, TrendingUp, Heart, Calendar];
const ABOUT_STAT_COLORS = [
  "from-emerald-500 to-teal-500",
  "from-cyan-500 to-blue-500",
  "from-teal-500 to-emerald-500",
  "from-blue-500 to-cyan-500",
];
const MILESTONE_ICONS = [Building2, Shield, Zap, Trophy, Globe, Star];

const About = () => {
  const { data: settingsData } = useQuery({
    queryKey: ["public-settings-about"],
    queryFn: async () => apiClient.get("/settings/public"),
    staleTime: 30000,
  });

  const siteContent = settingsData?.siteContent || null;
  const showAboutStats = !!siteContent?.aboutStats?.enabled;
  const showJourney = !!siteContent?.aboutJourney?.enabled;
  const stats = (siteContent?.aboutStats?.items || []).map((item, index) => ({
    value: item?.value || "",
    label: item?.label || "",
    icon: ABOUT_STAT_ICONS[index % ABOUT_STAT_ICONS.length],
    color: ABOUT_STAT_COLORS[index % ABOUT_STAT_COLORS.length],
  }));
  const milestones = (siteContent?.aboutJourney?.items || []).map((item, index) => ({
    year: item?.year || "",
    title: item?.title || "",
    description: item?.description || "",
    icon: MILESTONE_ICONS[index % MILESTONE_ICONS.length],
  }));

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
    visible: { opacity: 1, scale: 1 },
  };

  const values = [
    {
      icon: Award,
      title: "Excellence",
      description:
        "We lose sleep over your returns, not our commissions.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Shield,
      title: "Trust",
      description:
        "We tell you when NOT to invest. That's what trust looks like.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description:
        "We use tech to serve you better, not to replace your advisor.",
      color: "from-teal-500 to-emerald-500",
    },
    {
      icon: Heart,
      title: "Client First",
      description:
        "We align our goals with yours for mutual growth.",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const credentials = [
    { icon: Briefcase, title: "AMFI Registered", org: "ARN: 338534" },
    { icon: BookOpen, title: "APMI Registered", org: "APRN: 08037" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/30 overflow-x-hidden ">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden pb-10 sm:pb-16 md:pb-20 lg:pb-28 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1600&q=80')] opacity-10 bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-black/20" />

          {/* Animated Orbs - Hidden on very small screens */}
          <Motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="hidden sm:block absolute top-1/4 -left-20 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-emerald-500/20 rounded-full blur-3xl"
          />
          <Motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="hidden sm:block absolute bottom-1/4 -right-20 w-40 sm:w-60 md:w-96 h-40 sm:h-60 md:h-96 bg-cyan-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            {/* Badge */}
            <Motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4 sm:mb-6"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-300" />
              <span className="text-[10px] sm:text-xs md:text-sm font-medium text-white/90">
                About Mozno Wealth
              </span>
            </Motion.div>

            {/* Title */}
            <Motion.h1
              variants={fadeInUp}
              className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-3 sm:mb-4 md:mb-6 px-2"
            >
              Building Financial{" "}
              <span className="block sm:inline">
                <span
                  className="italic bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Futures
                </span>
              </span>
              <br className="hidden md:block" />
              <span className="block sm:inline"> With Trust & Expertise</span>
            </Motion.h1>

            {/* Subtitle */}
            <Motion.p
              variants={fadeInUp}
              className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80 max-w-2xl mx-auto mb-5 sm:mb-6 md:mb-8 px-4"
            >
              Your Personal CFO — bringing institutional-grade financial
              expertise with a personal touch.
            </Motion.p>

            {/* CTA Buttons */}
            <Motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 md:gap-4 px-4"
            >
              <Link
                to="/contact"
                className="w-full sm:w-auto group flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-all shadow-lg shadow-white/20 text-xs sm:text-sm md:text-base"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="w-full sm:w-auto group flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all text-xs sm:text-sm md:text-base"
              >
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span>Explore Services</span>
              </Link>
            </Motion.div>
          </Motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            className="w-full h-6 sm:h-10 md:h-16 lg:h-20"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Our Core Philosophy + MOZNO with Meaning (same as Home) */}
      <section className="relative bg-gradient-to-b from-white via-emerald-50/20 to-white pb-6 pt-8 sm:pb-8 sm:pt-10 md:pb-10 md:pt-12 lg:pb-12 lg:pt-14">
        <div className="mx-auto max-w-7xl space-y-8 px-4 sm:space-y-10 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle className="h-3.5 w-3.5" />
              Our Core Philosophy
            </p>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              MOZNO with Meaning
            </h2>
            <div className="mx-auto mt-4 max-w-3xl overflow-hidden rounded-full border border-emerald-100 bg-emerald-50/70 px-2 py-2">
              <Motion.div
                className="flex whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              >
                <p
                  className="pr-10 text-base font-medium italic text-emerald-700 sm:text-lg"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  We act as your Personal CFO. We do not sell random products, we
                  build one connected financial plan around your life.
                </p>
                <p
                  className="pr-10 text-base font-medium italic text-emerald-700 sm:text-lg"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  We act as your Personal CFO. We do not sell random products, we
                  build one connected financial plan around your life.
                </p>
              </Motion.div>
            </div>
          </div>
          <MoznoMeaningSection compact />
        </div>
      </section>

      {/* ================= QUICK STATS ================= */}
      {showAboutStats && stats.length > 0 && (
      <section className="py-4 sm:py-6 md:py-8 -mt-2 sm:-mt-4 md:-mt-6 relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <Motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6"
          >
            {stats.map((stat, index) => (
              <Motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-2.5 sm:p-3 md:p-4 lg:p-6 shadow-md sm:shadow-lg border border-gray-100 text-center"
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-1.5 sm:mb-2 md:mb-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}
                >
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-gray-900">
                  {stat.value}
                </h3>
                <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-gray-600">
                  {stat.label}
                </p>
              </Motion.div>
            ))}
          </Motion.div>
        </div>
      </section>
      )}

      {/* ================= MISSION & VISION SECTION ================= */}
      <section className="pt-4 pb-8 sm:pt-6 sm:pb-10 md:pt-8 md:pb-14 lg:pt-10 lg:pb-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {/* Mission Card */}
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-xl border border-gray-100 p-4 sm:p-5 md:p-6 lg:p-8 relative overflow-hidden"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-bl-full opacity-50" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white flex-shrink-0">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                      Our Mission
                    </h2>
                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                      What drives us every day
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed mb-3 sm:mb-4 md:mb-6">
                  To make strategic financial advice{" "}
                  <span className="text-emerald-600 font-semibold">
                    accessible to every Indian
                  </span>{" "}
                  by simplifying complex financial concepts and providing
                  personalized solutions that align with individual goals and
                  risk appetites.
                </p>

                <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
                  {[
                    "No minimum investment requirements",
                    "Clear, jargon-free explanations",
                    "Customized strategies for your goals",
                    "Regular progress tracking",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start sm:items-center gap-2 sm:gap-3"
                    >
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-emerald-500 flex-shrink-0 mt-0.5 sm:mt-0" />
                      <span className="text-[10px] sm:text-xs md:text-sm text-gray-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Motion.div>

            {/* Vision Card */}
            <Motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-xl p-4 sm:p-5 md:p-6 lg:p-8 relative overflow-hidden text-white"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 bg-white/10 rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-white/10 rounded-tr-full" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0">
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                      Our Vision
                    </h2>
                    <p className="text-[10px] sm:text-xs md:text-sm text-emerald-100">
                      Where we're headed
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-emerald-50 leading-relaxed mb-3 sm:mb-4 md:mb-6">
                  To become India's most{" "}
                  <span className="font-bold text-white">
                    trusted financial firm
                  </span>
                  , known for transparency, expertise, and unwavering commitment
                  to client success in their financial journey.
                </p>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                  {[
                    { title: "Transparency", desc: "Clear fee structures" },
                    { title: "Expertise", desc: "Qualified professionals" },
                    { title: "Client Success", desc: "Your goals first" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center"
                    >
                      <h4 className="font-bold text-[10px] sm:text-xs md:text-sm lg:text-base mb-0.5 sm:mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[8px] sm:text-[10px] md:text-xs text-emerald-100 leading-tight">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* ================= VALUES SECTION ================= */}
      <section className="py-6 sm:py-10 md:py-14 lg:py-20 bg-gradient-to-b from-white to-emerald-50/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Section Header */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-50 rounded-full border border-emerald-100 mb-2.5 sm:mb-3 md:mb-4">
              <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-emerald-600" />
              <span className="text-[10px] sm:text-xs md:text-sm font-medium text-emerald-700">
                Our Core Values
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 px-2">
              The Principles That{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Guide Us
              </span>
            </h2>
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-600 max-w-2xl mx-auto px-4">
              These values form the foundation of our culture and define how we
              serve our clients every single day.
            </p>
          </Motion.div>

          {/* Values Grid */}
          <Motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 lg:gap-6"
          >
            {values.map((value, index) => (
              <Motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-md sm:shadow-lg border border-gray-100 hover:shadow-xl transition-all"
              >
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white mb-2 sm:mb-3 md:mb-4`}
                >
                  <value.icon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                </div>
                <h3 className="text-xs sm:text-sm md:text-base lg:text-xl font-bold text-gray-900 mb-1 sm:mb-1.5 md:mb-2">
                  {value.title}
                </h3>
                <p
                  className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-emerald-800 leading-relaxed italic font-medium"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  &ldquo;{value.description}&rdquo;
                </p>
              </Motion.div>
            ))}
          </Motion.div>
        </div>
      </section>

      {/* ================= FOUNDER SECTION ================= */}
      <section className="py-5 sm:py-8 md:py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Section Header — compact */}
          <Motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-4 sm:mb-5 md:mb-7"
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-emerald-50 rounded-full border border-emerald-100 mb-1.5 sm:mb-2">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
              <span className="text-[9px] sm:text-[11px] md:text-xs font-medium text-emerald-700">
                Meet Our Founder
              </span>
            </div>
            <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 px-2">
              Leadership That{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Inspires Trust
              </span>
            </h2>
          </Motion.div>

          {/* Founder Card */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              {/* Left: Photo & Basic Info */}
              <div className="lg:col-span-2 bg-gradient-to-br from-emerald-600 to-teal-600 p-3 sm:p-4 md:p-5 lg:p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 sm:w-28 sm:h-28 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 mx-auto mb-3 sm:mb-4 rounded-2xl md:rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/30 overflow-hidden shadow-md">
                    <img
                      src={founderImage}
                      alt="Harshal Jain"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="text-center mb-3 sm:mb-4">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:py-1 bg-white/10 rounded-full mb-1.5">
                      <span className="text-[9px] sm:text-[11px] font-semibold">
                        Founder & CEO
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-0.5">
                      Harshal Jain
                    </h3>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
                      <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-[8px] sm:text-[9px] text-emerald-200">
                          Based in
                        </p>
                        <p className="text-[10px] sm:text-xs font-semibold">
                          Mumbai, India
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
                      <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-[8px] sm:text-[9px] text-emerald-200">
                          Experience
                        </p>
                        <p className="text-[10px] sm:text-xs font-semibold">
                          10+ Years
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/20">
                    <h5 className="text-[10px] sm:text-xs font-bold text-white/95 mb-2 tracking-wide uppercase">
                      Regulatory registrations
                    </h5>
                    <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
                      {credentials.map((cred, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-white/10 rounded-lg p-2 border border-white/10"
                        >
                          <div className="w-8 h-8 rounded-md bg-white/20 flex items-center justify-center flex-shrink-0">
                            <cred.icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] sm:text-[11px] font-semibold text-white leading-snug">
                              {cred.title}
                            </p>
                            <p className="text-[9px] sm:text-[10px] text-emerald-100/90">
                              {cred.org}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
                    {[
                      {
                        title: "Integrated approach",
                        desc: "Investments, tax, insurance, and borrowing aligned in one strategy",
                      },
                      {
                        title: "Holistic expertise",
                        desc: "Experience spanning auditing, investment advisory, tax, and compliance",
                      },
                      {
                        title: "Client-First Approach",
                        desc: "Acts as your Personal CFO, not a product seller",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 bg-white/5 rounded-lg p-2 border border-white/10"
                      >
                        <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-200 mt-0.5 flex-shrink-0" />
                        <p className="text-[9px] sm:text-[10px] md:text-[11px] text-emerald-50/95 leading-snug">
                          <span className="font-semibold text-white">
                            {item.title}:
                          </span>{" "}
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center gap-2 mt-3 sm:mt-4 pt-3 border-t border-white/20">
                    {[
                      {
                        icon: Linkedin,
                        href: "https://www.linkedin.com/in/harshalvjain/",
                      },
                      {
                        icon: Instagram,
                        href: "https://www.instagram.com/the_awareness_initiative",
                      },
                      {
                        icon: Youtube,
                        href: "https://www.youtube.com/@theawarenessinitiative",
                      },
                    ].map((social, index) => (
                      <Motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.96 }}
                        className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                      >
                        <social.icon className="w-4 h-4" />
                      </Motion.a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: From the Founder — narrative */}
              <div className="lg:col-span-3 p-4 sm:p-5 md:p-6 lg:p-8">
                <h2
                  id="from-the-founder"
                  className="mb-4 sm:mb-5 text-xl sm:text-2xl md:text-3xl italic font-semibold text-emerald-600 tracking-tight"
                  style={{ fontFamily: "Playfair Display, Georgia, serif" }}
                >
                  From the Founder
                </h2>

                <div className="max-w-3xl space-y-3 sm:space-y-3.5 text-sm sm:text-[0.9375rem] text-gray-700 leading-relaxed">
                  <p className="text-[0.9375rem] sm:text-base font-semibold text-gray-900">
                    The problem was never a lack of money. It was always a lack
                    of a plan.
                  </p>

                  <p>
                    I&apos;ve sat across the table from enough Indian families
                    to know this firsthand. Salaried professionals earning well
                    but investing randomly. Business owners building wealth but
                    ignoring succession. Young earners buying the wrong insurance
                    and missing the right SIPs.
                  </p>

                  <p className="font-semibold text-gray-900">
                    Everyone had products. Almost no one had a plan. That&apos;s
                    the gap Mozno Wealth was built to close.
                  </p>

                  <p>
                    Over 10+ years in financial services — across auditing,
                    investment advisory, taxation, and compliance — I&apos;ve
                    seen how fragmented financial advice in India really is. One
                    advisor for insurance. Another for mutual funds. A separate
                    tax filer. A lawyer for wills.
                  </p>

                  <p className="font-medium text-gray-800">
                    No coordination. No single view. No complete strategy.
                  </p>

                  <p className="font-semibold text-gray-900">
                    So we built something different.
                  </p>

                  <p>
                    <span
                      className="block text-[0.9375rem] sm:text-base italic font-semibold text-emerald-700 mb-1.5"
                      style={{
                        fontFamily: "Playfair Display, Georgia, serif",
                      }}
                    >
                      Your Personal CFO — one team, one strategy, one clear
                      direction
                    </span>
                    At Mozno Wealth, we act as your Personal CFO, bringing
                    everything together into one integrated plan across wealth,
                    taxes, insurance, loans, and succession.
                  </p>

                  <p>
                    We don&apos;t start with products. We start with your life
                    — your income, your family, your goals, your risks — and we
                    build a strategy around that. Products come later, only if
                    they truly fit.
                  </p>

                  <p
                    className="italic font-medium text-emerald-700"
                    style={{ fontFamily: "Playfair Display, Georgia, serif" }}
                  >
                    Personal finance should be simple. Making it simple is our
                    job.
                  </p>
                </div>

                <figure className="max-w-3xl mt-5 sm:mt-6 border-l-4 border-emerald-500 bg-emerald-50/90 pl-4 sm:pl-5 pr-3 sm:pr-4 py-3.5 sm:py-4 rounded-r-xl shadow-sm">
                  <blockquote
                    className="text-sm sm:text-base text-gray-900 italic font-medium leading-snug"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                    }}
                  >
                    &ldquo;I don&apos;t want to be the advisor who sold you the
                    best product. I want to be the one who built you the best
                    plan.&rdquo;
                  </blockquote>
                  <figcaption className="mt-2 text-xs sm:text-sm text-gray-600 font-medium not-italic tracking-wide">
                    — Harshal Jain, Founder &amp; CEO
                  </figcaption>
                </figure>
              </div>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* ================= JOURNEY TIMELINE ================= */}
      {showJourney && milestones.length > 0 && (
      <section className="py-6 sm:py-10 md:py-14 lg:py-20 bg-gradient-to-b from-emerald-50/50 to-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Section Header */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-50 rounded-full border border-emerald-100 mb-2.5 sm:mb-3 md:mb-4">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-emerald-600" />
              <span className="text-[10px] sm:text-xs md:text-sm font-medium text-emerald-700">
                {siteContent?.aboutJourney?.badgeText || "Our Journey"}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 px-2">
              {siteContent?.aboutJourney?.headingPrefix || "Milestones That"}{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {siteContent?.aboutJourney?.headingHighlight || "Define Us"}
              </span>
            </h2>
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-600 max-w-2xl mx-auto px-4">
              {siteContent?.aboutJourney?.description ||
                "From a vision to becoming a trusted name in Indian wealth management"}
            </p>
          </Motion.div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-3 sm:left-4 md:left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-200 via-emerald-400 to-emerald-200 lg:-translate-x-1/2" />

            {/* Milestones */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
              {milestones.map((milestone, index) => (
                <Motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-start gap-3 sm:gap-4 md:gap-6 ${index % 2 === 0
                      ? "lg:flex-row"
                      : "lg:flex-row-reverse lg:text-right"
                    }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-3 sm:left-4 md:left-6 lg:left-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-emerald-500 rounded-full border-2 sm:border-4 border-white shadow-lg lg:-translate-x-1/2 z-10" />

                  {/* Content */}
                  <div
                    className={`flex-1 ml-8 sm:ml-10 md:ml-14 lg:ml-0 ${index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"
                      }`}
                  >
                    <Motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-md sm:shadow-lg border border-gray-100"
                    >
                      <div
                        className={`flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3 ${index % 2 === 0
                            ? ""
                            : "lg:flex-row-reverse lg:justify-end"
                          }`}
                      >
                        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white flex-shrink-0">
                          <milestone.icon className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] sm:text-xs md:text-sm font-bold text-emerald-600">
                            {milestone.year}
                          </span>
                          <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900">
                            {milestone.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-gray-600">
                        {milestone.description}
                      </p>
                    </Motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block flex-1" />
                </Motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ================= DUAL CTA — side-by-side on lg ================= */}
      <section className="py-6 sm:py-10 md:py-14 lg:py-20 bg-gradient-to-b from-white via-emerald-50/40 to-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 items-stretch">
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg sm:shadow-xl md:shadow-2xl relative overflow-hidden h-full flex flex-col"
            >
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10 text-white text-center flex flex-col flex-1">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 px-2">
                  Book Your Free Consultation Now
                </h3>
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-emerald-100 mb-4 sm:mb-5 md:mb-6 flex-1 px-2 leading-relaxed">
                  Get your portfolio reviewed today. Schedule a free consultation
                  with our experts to discuss your financial goals and get
                  personalized advice.
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6 px-2">
                  {[
                    "No obligations",
                    "Personalized assessment",
                    "Actionable recommendations",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-1.5 sm:gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-emerald-200 flex-shrink-0" />
                      <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-3.5 bg-white text-emerald-700 font-semibold rounded-lg sm:rounded-xl hover:bg-emerald-50 transition-all text-[10px] sm:text-xs md:text-sm lg:text-base shadow-lg w-full max-w-md mx-auto"
                >
                  Get Your Portfolio Reviewed Today
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 shrink-0" />
                </Link>
              </div>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 text-white text-center relative overflow-hidden h-full flex flex-col shadow-lg sm:shadow-xl md:shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-emerald-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-cyan-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

              <div className="relative z-10 flex flex-col flex-1">
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 px-2">
                  Ready to Start Your Financial Journey?
                </h2>
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-300 mb-4 sm:mb-5 md:mb-6 flex-1 px-2 leading-relaxed max-w-xl mx-auto">
                  Join our satisfied group of clients who trust Mozno Wealth with
                  their financial future. Let&apos;s build your wealth together.
                </p>

                <div className="flex w-full max-w-md mx-auto flex-col items-stretch justify-center gap-2 sm:gap-3 md:gap-4">
                  <Link
                    to="/contact"
                    className="w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all text-[10px] sm:text-xs md:text-sm lg:text-base"
                  >
                    Schedule Consultation
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  </Link>
                  <Link
                    to="/services"
                    className="w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-lg sm:rounded-xl border border-white/20 hover:bg-white/20 transition-all text-[10px] sm:text-xs md:text-sm lg:text-base"
                  >
                    <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    Explore Services
                  </Link>
                </div>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
