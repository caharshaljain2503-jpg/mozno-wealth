import React, { useMemo, memo } from "react";
import { motion as Motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImage from "../../assets/22911.jpg.jpeg";

const CFO_TAGLINES = [
  "Stop chasing returns. Start building wealth.",
  "Your money deserves a CFO, not a salesman.",
  "Most advisors sell you products. We build your plan.",
  "Maximising Returns, Minimising Risk",
  "Financial Freedom with Peace of Mind",
  "Smart Decisions, Secure Retirement",
  "Personalized Strategy with Expert Guidance",
];

const HeroSection = () => {
  const typingSequences = useMemo(
    () => CFO_TAGLINES.flatMap((line) => [line, 3200]),
    [],
  );

  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

  return (
    <section
      className="relative bg-white overflow-hidden min-h-screen flex items-center"
    >
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Motion.div initial="hidden" animate="visible" className="w-full">

          {/* Heading */}
          <Motion.div variants={fadeInUp} custom={1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Your Personal CFO
            </h1>

            {/* 🔥 BIG TAGLINE */}
            <div className="flex justify-center items-center mb-8">
              <TypeAnimation
                sequence={typingSequences}
                wrapper="span"
                speed={40}
                deletionSpeed={50}
                repeat={Infinity}
                className="text-[#0d9568] font-semibold italic text-center leading-tight"

                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.2rem, 3.2vw, 2rem)",  
                  maxWidth: "95%",
                  whiteSpace: "normal",                 
                }}
              />
            </div>

            {/* Description */}
            <Motion.div variants={fadeInUp} custom={2}>
              <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl mx-auto mb-8">
                <span className="font-semibold">Mozno Wealth</span> is your
                comprehensive wealth partner. We offer integrated financial
                solutions tailored specifically for YOU.
              </p>
            </Motion.div>
          </Motion.div>

          {/* CTA */}
          <Motion.div variants={fadeInUp} custom={3}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-black text-lg font-semibold rounded-xl shadow-lg transition"
            >
              Book Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  );
};

export default memo(HeroSection);
