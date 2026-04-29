import React, { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { usePublicPartnerLogos } from "../../hooks/usePartnerLogos";

export default function PartnerLogosSection() {
  const reduceMotion = useReducedMotion();
  const { data: logos = [], isLoading, isError } = usePublicPartnerLogos();

  const track = useMemo(() => {
    if (!logos.length) return [];
    const doubled = [...logos, ...logos];
    return logos.length <= 2 ? [...doubled, ...logos, ...logos] : doubled;
  }, [logos]);

  const displayLogos = reduceMotion ? logos : track;

  const durationSec = useMemo(() => {
    const n = logos.length || 1;
    return Math.min(42, Math.max(10, n * 4 + 6));
  }, [logos.length]);

  if (isLoading) {
    return (
      <section className="py-12 sm:py-14 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Loader2 className="w-7 h-7 animate-spin text-emerald-600/50" aria-hidden />
        </div>
      </section>
    );
  }

  if (isError || logos.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-emerald-100/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Trusted and supported by leading{" "}
          <span className="font-bold text-emerald-700">Financial</span> institutions and partners.
        </p>

        <div
          className="mt-10 relative"
          style={
            reduceMotion
              ? undefined
              : {
                  maskImage:
                    "linear-gradient(to right, transparent, black 6%, black 88%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 6%, black 88%, transparent)",
                }
          }
        >
          <div
            className={`flex items-center gap-0 ${
              reduceMotion
                ? "flex-wrap justify-center gap-y-6 w-full max-w-5xl mx-auto"
                : "partner-logo-marquee-track"
            }`}
            style={
              reduceMotion
                ? undefined
                : {
                    animationDuration: `${durationSec}s`,
                  }
            }
          >
            {displayLogos.map((logo, i) => (
              <div
                key={`${logo._id}-${i}`}
                className="flex-shrink-0 flex items-center justify-center px-8 sm:px-12 py-2"
              >
                <img
                  src={logo.imageUrl}
                  alt={logo.name || "Partner"}
                  className="h-9 sm:h-11 w-auto max-w-[160px] object-contain opacity-55 grayscale hover:opacity-90 hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
