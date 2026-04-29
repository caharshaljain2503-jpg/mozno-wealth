import React, { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Simple horizontal carousel (no external deps).
 * Used on both Home and Services pages.
 */
export default function ServicesCarousel({ items = [] }) {
  const scrollerRef = useRef(null);

  const canShow = items.length > 0;

  const scrollByCards = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;

    // Scroll by ~card width; works well with responsive min-width.
    el.scrollBy({ left: dir * 420, behavior: "smooth" });
  };

  const content = useMemo(() => {
    return items.map((item, idx) => {
      const Icon = item.icon;
      const card = (
        <div className="h-full bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all duration-300 group">
          <div className="flex items-start gap-3">
            {Icon ? (
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors">
                <Icon className="w-5 h-5 text-emerald-700" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100" />
            )}

            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                {item.label}
              </h3>
              {item.desc ? (
                <p className="mt-1.5 text-[11px] sm:text-xs text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      );

      const wrapperClassName =
        "snap-start flex-shrink-0 w-[260px] sm:w-[280px] lg:w-[320px]";

      if (item.path) {
        return (
          <Link
            key={`${item.label}-${idx}`}
            to={item.path}
            className={wrapperClassName}
          >
            {card}
          </Link>
        );
      }

      return (
        <div key={`${item.label}-${idx}`} className={wrapperClassName}>
          {card}
        </div>
      );
    });
  }, [items]);

  if (!canShow) return null;

  return (
    <div className="relative">
      <div className="hidden lg:block absolute -left-3 top-1/2 -translate-y-1/2 z-10">
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scrollByCards(-1)}
          className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {content}
      </div>

      <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollByCards(1)}
          className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex items-center justify-center"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
}

