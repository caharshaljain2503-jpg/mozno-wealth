import { ArrowRight, Clock } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const teal = "#009677";
const mint = "#E6F7F2";

/* ================= DATA ================= */
const steps = [
  {
    id: "01",
    title: "Schedule Your Free Consultation",
    desc: "We start with a detailed conversation to understand your financial situation, goals, and aspirations.",
    duration: "30 mins",
  },
  {
    id: "02",
    title: "Risk Profiling",
    desc: "Scientific assessment of your risk tolerance and investment temperament using proven methodologies.",
    duration: "45 mins",
  },
  {
    id: "03",
    title: "Design Your Personalized Wealth Plan",
    desc: "Our experts craft a personalized wealth management strategy with asset allocations aligned with your unique profile.",
    duration: "2-3 days",
  },
  {
    id: "04",
    title: "Execute",
    desc: "Seamless execution of your investment plan with complete transparency and documentation.",
    duration: "1-2 days",
  },
  {
    id: "05",
    title: "Ongoing Review",
    desc: "Regular monitoring, rebalancing, and quarterly reviews to ensure you stay on track.",
    duration: "Periodic.",
  },
];

function DurationPill({ children, className = "", iconClassName = "text-gray-400" }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full border border-gray-200/80 bg-gray-50 px-2.5 py-0.5 text-[11px] font-medium text-gray-600 sm:text-xs ${className}`}
    >
      <Clock className={`h-3 w-3 shrink-0 ${iconClassName}`} strokeWidth={2} />
      {children}
    </span>
  );
}

/* ================= MAIN COMPONENT ================= */
export default function StickyOverlapStepsSection() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const index = Math.min(Math.floor(v * steps.length), steps.length - 1);
      setActiveStep(Math.max(0, index));
    });
    return () => unsub();
  }, [scrollYProgress]);

  const current = steps[activeStep];

  return (
    <section ref={containerRef} className="relative bg-white py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* =============== LEFT: step stack (matches design — cards first in reading order on desktop) =============== */}
          <div className="order-1 lg:order-1">
            {/* Mobile & tablet */}
            <div className="space-y-3 sm:space-y-4 lg:hidden">
              {steps.map((step, index) => {
                const isActive = index === activeStep;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className={`rounded-xl border bg-white p-5 sm:rounded-2xl sm:p-6 ${
                      isActive ? "border-[#B8E8D9] shadow-sm" : "border-gray-200/90"
                    }`}
                  >
                    <div className="flex flex-wrap items-start gap-3 sm:gap-4">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
                        style={{
                          backgroundColor: mint,
                          color: teal,
                        }}
                      >
                        {step.id}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Desktop — sticky overlap */}
            <div
              className="relative hidden lg:block"
              style={{ minHeight: `${steps.length * 160 + 320}px` }}
            >
              {steps.map((step, index) => {
                const isActive = index === activeStep;
                const topPosition = 80 + index * 32;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{
                      y: -2,
                      transition: { type: "spring", stiffness: 380, damping: 28 },
                    }}
                    className={`group sticky mb-5 rounded-[14px] border bg-white p-6 transition-[box-shadow,border-color] duration-300 ${
                      isActive
                        ? "shadow-md"
                        : "border-gray-200/90 shadow-sm hover:border-gray-300"
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
                        {step.id}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-bold text-gray-900 sm:text-lg">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-gray-600">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              <div className="h-40" aria-hidden />
            </div>
          </div>

          {/* =============== RIGHT: header + current step + CTA =============== */}
          <div className="order-2 h-fit lg:sticky lg:top-24 lg:order-2 lg:self-start">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 mb-5"
              style={{ backgroundColor: mint, borderColor: `${teal}22` }}
            >
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: teal }} />
              <span className="text-xs font-medium" style={{ color: teal }}>
                How It Works
              </span>
            </div>

            <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">
              Simple Steps To{" "}
              <span
                className="italic font-bold"
                style={{ fontFamily: '"Playfair Display", serif', color: teal }}
              >
                Get Started
              </span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-700 sm:mt-5 sm:text-base">
              Your wealth management journey begins here. Follow these streamlined steps to start
              managing your finances confidently.
            </p>

            {/* Current step card */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-8 rounded-[14px] border border-gray-200/90 bg-white p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white sm:h-12 sm:w-12 sm:text-base"
                    style={{ backgroundColor: teal }}
                  >
                    {current.id}
                  </div>
                  <span className="text-sm font-semibold sm:text-base" style={{ color: teal }}>
                    Current Step
                  </span>
                </div>
                <DurationPill
                  className="border-transparent bg-[#E6F7F2] font-medium text-[#009677]"
                  iconClassName="text-[#009677]/55"
                >
                  {current.duration}
                </DurationPill>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">{current.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">{current.desc}</p>
            </motion.div>

            <Link to="/contact" className="mt-6 block">
              <button
                type="button"
                className="group flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-95 sm:text-base"
                style={{ backgroundColor: teal }}
              >
                Start Your Journey
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
