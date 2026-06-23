import React from "react";
import moznoLogo from "../../assets/Mozno Wealth Logo New.png";

/**
 * Full-screen branded preloader. Pass active={false} to fade out (route settled).
 */
const MoznoLogoPreloader = ({ active = true }) => {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50"
      style={{
        opacity: active ? 1 : 0,
        pointerEvents: active ? "auto" : "none",
        transition: "opacity 200ms ease",
      }}
      aria-hidden={!active}
    >
      <div className="flex flex-col items-center gap-6 px-6">
        <img
          src={moznoLogo}
          alt=""
          data-page-preloader-image
          className="h-24 w-auto max-w-[min(280px,80vw)] object-contain animate-pulse motion-reduce:animate-none drop-shadow-[0_12px_32px_rgba(16,185,129,0.18)]"
          decoding="sync"
          loading="eager"
        />
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce motion-reduce:animate-none"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoznoLogoPreloader;
