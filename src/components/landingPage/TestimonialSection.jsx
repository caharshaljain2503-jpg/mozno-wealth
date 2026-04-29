import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Quote,
  Sparkles,
  Award,
  TrendingUp,
  Users,
  User,
  Loader2,
} from "lucide-react";
import { useAllTestimonials } from "../../hooks/useTestionial";

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Fetch testimonials from API
  const {
    data: testimonials = [],
    isLoading,
    isError,
  } = useAllTestimonials(10);

  const displayTestimonials = testimonials;

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying || displayTestimonials.length === 0) return;

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % displayTestimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, displayTestimonials.length]);

  // Handle testimonial click
  const handleTestimonialClick = (index) => {
    setActiveTestimonial(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Calculate stats from testimonials
  const totalClients = displayTestimonials.length || 500;
  const avgRating =
    displayTestimonials.length > 0
      ? (
          displayTestimonials.reduce((acc, t) => acc + (t.rating || 5), 0) /
          displayTestimonials.length
        ).toFixed(1)
      : 5.0;

  const locations = [
    ...new Set(displayTestimonials.map((t) => t.location).filter(Boolean)),
  ];

  // Loading state
  if (isLoading) {
    return (
      <section className="w-full bg-gradient-to-br from-white via-emerald-50/30 to-white py-10 sm:py-14 md:py-20 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        </div>
      </section>
    );
  }

  if (isError || displayTestimonials.length === 0) {
    return null;
  }

  const activeTestimonialData = displayTestimonials[activeTestimonial];

  return (
    <section className="w-full bg-gradient-to-br from-white via-emerald-50/30 to-white py-10 sm:py-14 md:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 md:mb-14 lg:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 mb-3 sm:mb-4">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
            <span className="text-xs sm:text-sm font-medium text-emerald-700">
              Trusted Across India
            </span>
          </div>

          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-2 sm:mb-3 md:mb-4 px-2">
            Success Stories from{" "}
            <span
             style={{ fontFamily: "Playfair Display, serif" }}
              className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
            >
              Our Valued Clients
            </span>
          </h2>

          <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Join 500+ Indian businesses who transformed their financial journey
            with Mozno Wealth's expert guidance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start">
          {/* LEFT: Testimonial Showcase */}
          <div className="relative order-1">
            {/* Main Testimonial Card */}
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, scale: 0.95, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-4 xs:p-5 sm:p-6 md:p-8 border border-gray-100 overflow-hidden"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400" />
              <div className="absolute -top-6 -right-6 w-16 sm:w-24 h-16 sm:h-24 bg-emerald-100/20 rounded-full blur-2xl" />

              {/* Quote Icon */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                <Quote className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-emerald-100" />
              </div>

              {/* Rating */}
              <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4 md:mb-6">
                {[...Array(activeTestimonialData.rating || 5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-amber-400 fill-amber-400"
                  />
                ))}
                {/* Fill remaining stars if less than 5 */}
                {[...Array(5 - (activeTestimonialData.rating || 5))].map(
                  (_, i) => (
                    <Star
                      key={`empty-${i}`}
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-200"
                    />
                  ),
                )}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 md:mb-8 pr-4 sm:pr-8 break-words">
                "{activeTestimonialData.content || activeTestimonialData.text}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4">
                <div className="relative flex-shrink-0">
                  {activeTestimonialData.avatar ? (
                    <img
                      src={activeTestimonialData.avatar}
                      alt={activeTestimonialData.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover border-2 border-emerald-100"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML = `
                          <div class="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md border-2 border-emerald-100">
                            <svg class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        `;
                      }}
                    />
                  ) : (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md border-2 border-emerald-100">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1 break-words">
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg truncate break-words">
                    {activeTestimonialData.name}
                  </h4>
                  <p className="text-emerald-600 text-xs sm:text-sm truncate break-words">
                    {activeTestimonialData.designation ||
                      activeTestimonialData.role ||
                      (activeTestimonialData.company
                        ? `at ${activeTestimonialData.company}`
                        : "")}
                  </p>
                  <div className="flex items-center gap-1.5 sm:gap-2 mt-1 flex-wrap">
                    {activeTestimonialData.location && (
                      <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full">
                        {activeTestimonialData.location}
                      </span>
                    )}
                    {activeTestimonialData.industry && (
                      <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                        {activeTestimonialData.industry}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial Navigation Dots */}
            {displayTestimonials.length > 1 && (
              <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 md:mt-8">
                {displayTestimonials.map((_, index) => (
                  <span
                    key={index}
                    onClick={() => handleTestimonialClick(index)}
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                      activeTestimonial === index
                        ? "w-5 sm:w-6 md:w-8 bg-gradient-to-r from-emerald-500 to-teal-500"
                        : "w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Cities Map Visualization - Hidden on small screens */}
            {locations.length > 0 && (
              <div className="hidden sm:block mt-6 md:mt-8 lg:mt-12">
                <div className="relative bg-gradient-to-r from-emerald-50/50 to-teal-50/50 rounded-xl sm:rounded-2xl border border-emerald-100/50 p-4 sm:p-5 md:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                        Serving Across India
                      </h4>
                      <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                        {locations.slice(0, 6).map((city) => (
                          <span
                            key={city}
                            className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 bg-white border border-gray-200 rounded-full text-gray-700"
                          >
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-left sm:text-right flex-shrink-0">
                      <div className="text-xl sm:text-2xl font-bold text-emerald-600">
                        {locations.length}+
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Cities
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Stats & Metrics */}
          <div className="order-2 grid grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
            {/* Large Stat Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="col-span-2"
            >
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 text-white shadow-lg sm:shadow-xl overflow-hidden relative">
                <div className="absolute -top-8 sm:-top-12 -right-8 sm:-right-12 w-32 sm:w-48 h-32 sm:h-48 bg-white/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <p className="text-emerald-100 text-xs sm:text-sm md:text-base">
                    Wealth Managed Across India
                  </p>
                  <div className="mt-3 sm:mt-4 md:mt-6 flex items-center gap-1.5 sm:gap-2">
                    <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    <span className="text-xs sm:text-sm">
                      40% Average Annual Growth
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Medium Stat Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-5 md:p-6 shadow-md sm:shadow-lg border border-gray-100 col-span-1"
            >
              <div className="flex items-start sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-emerald-500 flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    {totalClients}+
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 truncate">
                    <span
                      style={{ fontFamily: "Playfair Display, serif" }}
                      className="italic"
                    >
                      Valued Clients
                    </span>
                  </p>
                </div>
              </div>
              <div className="w-full h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "98%" }}
                  transition={{ duration: 1, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-5 md:p-6 shadow-md sm:shadow-lg border border-gray-100 col-span-1"
            >
              <div className="flex items-start sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-teal-500 flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    98%
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 truncate">
                    Client Retention
                  </p>
                </div>
              </div>
              <div className="text-[10px] xs:text-xs text-gray-500">
                <span className="text-emerald-600 font-semibold">
                  {avgRating}
                </span>{" "}
                Average Rating
              </div>
            </motion.div>
          </div>
        </div>

        {/* Trust Badges - Mobile Only */}
        <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-2 xs:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 lg:hidden">
          {[
            { value: "6-in-1", label: "Integrated services" },
            { value: "SEBI", label: "Compliant" },
            { value: "24/7", label: "Support" },
            { value: "100%", label: "Confidential" },
          ].map((badge, index) => (
            <div
              key={index}
              className="bg-white rounded-lg sm:rounded-xl p-2.5 xs:p-3 sm:p-4 text-center border border-gray-100 shadow-sm"
            >
              <div className="text-sm xs:text-base sm:text-lg font-bold text-emerald-600">
                {badge.value}
              </div>
              <div className="text-[10px] xs:text-xs text-gray-600">
                {badge.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
