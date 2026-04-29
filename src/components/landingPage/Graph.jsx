import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import MoznoMeaningSection from "./MoznoMeaningSection";

const teal = "#009677";
const mint = "#E6F7F2";

/* Same five points as FeatureSection (client copy) */
const whyChooseItems = [
  {
    id: "01",
    title: "Your Own Personal CFO, Not a Seller",
    desc: "Mozno Wealth doesn't push products – it acts as your personal CFO. We first understand your income, goals, risks, family needs and existing portfolio, and only then design a plan.",
  },
  {
    id: "02",
    title: "One Roof for Every Major Money Decision",
    desc: "No more running to different people for investments, insurance, loans, taxes and wills. One integrated team handling everything, so every decision talks to the other.",
  },
  {
    id: "03",
    title: "Led by Experts with Real-World Insight",
    desc: "Founded by Harshal Jain, who brings institutional-grade knowledge to everyday Indian investors. Deep technical expertise translated into clear, practical actions.",
  },
  {
    id: "04",
    title: "Simple Language, Clear Trade-Offs, India Context",
    desc: "We cut the jargon and explain everything in simple English/Hinglish with India-specific tax and regulation in mind. Every recommendation comes with clear pros and cons.",
  },
  {
    id: "05",
    title: "Built for Busy, Digital-First Indians",
    desc: "Whether you're in Tier I or a tier-II/III city, Mozno Wealth is designed for your schedule and lifestyle with digital-first processes and education-led content.",
  },
];

const AnimatedGraphSection = () => {
  const whyChooseRef = useRef(null);
  const [activeWhy, setActiveWhy] = useState(0);
  const n = whyChooseItems.length;

  const { scrollYProgress } = useScroll({
    target: whyChooseRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const index = Math.min(Math.floor(v * n), n - 1);
      setActiveWhy(Math.max(0, index));
    });
    return () => unsub();
  }, [scrollYProgress, n]);

  return (
    <section className="relative bg-gradient-to-b from-white via-emerald-50/20 to-white py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 md:space-y-12">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-xs font-semibold text-emerald-700">
            <CheckCircle className="w-3.5 h-3.5" />
            Our Core Philosophy
          </p>
        </div>

        <MoznoMeaningSection />

        {/* Why Choose Us — layout + styling aligned with How It Works (ServiceStep); copy from FeatureSection */}
        <div
          ref={whyChooseRef}
          className="relative rounded-2xl bg-white py-12 sm:py-16 lg:py-24 sm:px-2"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20 px-0 sm:px-4 lg:px-8">
            {/* Left column: heading + in-focus card + CTA (sticky on desktop while right column scrolls) */}
            <div className="h-fit lg:sticky lg:top-24 lg:self-start">
              <div
                className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
                style={{ backgroundColor: mint, borderColor: `${teal}22` }}
              >
                <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: teal }} />
                <span className="text-xs font-medium" style={{ color: teal }}>
                  Why Choose Us
                </span>
              </div>

              <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">
                Your Personal{" "}
                <span
                  className="italic font-bold"
                  style={{ fontFamily: '"Playfair Display", serif', color: teal }}
                >
                  CFO
                </span>
                , Not Just
                <span className="block min-[480px]:inline min-[480px]:ml-1">Another Advisor</span>
              </h2>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-700 sm:mt-5 sm:text-base">
                Mozno Wealth is your comprehensive wealth partner. We offer integrated financial solutions
                tailored specifically for YOU.
              </p>

              <motion.div
                key={activeWhy}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-8 rounded-[14px] border border-gray-200/90 bg-white p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white sm:h-12 sm:w-12 sm:text-base"
                    style={{ backgroundColor: teal }}
                  >
                    {whyChooseItems[activeWhy]?.id}
                  </div>
                  <span className="text-sm font-semibold sm:text-base" style={{ color: teal }}>
                    In focus
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                  {whyChooseItems[activeWhy]?.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {whyChooseItems[activeWhy]?.desc}
                </p>
              </motion.div>

              <Link to="/contact" className="mt-6 block">
                <button
                  type="button"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-95 sm:text-base"
                  style={{ backgroundColor: teal }}
                >
                  Book Free Consultation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </Link>
            </div>

            {/* Right column: scroll-synced step cards (same behavior as before) */}
            <div>
              <div className="space-y-3 sm:space-y-4 lg:hidden">
                {whyChooseItems.map((item, index) => {
                  const isActive = index === activeWhy;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: index * 0.08, duration: 0.4 }}
                      className={`rounded-xl border bg-white p-5 sm:rounded-2xl sm:p-6 ${
                        isActive ? "border-[#B8E8D9] shadow-sm" : "border-gray-200/90"
                      }`}
                    >
                      <div className="flex flex-wrap items-start gap-3 sm:gap-4">
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
                          style={{ backgroundColor: mint, color: teal }}
                        >
                          {item.id}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-bold text-gray-900 sm:text-base">{item.title}</h3>
                          <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">{item.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div
                className="relative hidden lg:block"
                style={{ minHeight: `${n * 160 + 320}px` }}
              >
                {whyChooseItems.map((item, index) => {
                  const isActive = index === activeWhy;
                  const topPosition = 80 + index * 32;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
                      viewport={{ once: true, margin: "-50px" }}
                      whileHover={{
                        y: -2,
                        transition: { type: "spring", stiffness: 380, damping: 28 },
                      }}
                      className={`group sticky mb-5 rounded-[14px] border bg-white p-6 transition-[box-shadow,border-color] duration-300 ${
                        isActive ? "shadow-md" : "border-gray-200/90 shadow-sm hover:border-gray-300"
                      }`}
                      style={{
                        top: `${topPosition}px`,
                        zIndex: 10 + index,
                        borderColor: isActive ? "#B8E8D9" : undefined,
                      }}
                    >
                      <div className="flex gap-4">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-bold"
                          style={{ backgroundColor: mint, color: teal }}
                        >
                          {item.id}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-bold text-gray-900 sm:text-lg">{item.title}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                <div className="h-40" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedGraphSection;