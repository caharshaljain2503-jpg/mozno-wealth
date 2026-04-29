import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useBlogs } from "../../hooks/useBlog";

export default function BlogSection() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // ✅ Fetch blogs from API
  const {
    data: response,
    isLoading,
    isError,
  } = useBlogs({
    page: 1,
    limit: 6,
  });

  const blogs = response?.blogs || [];

  // Format date helper
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return "Unknown date";
    }
  };

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="py-10 sm:py-16 md:py-20 lg:py-24 px-3 xs:px-4 sm:px-6">
        <div className="max-w-7xl mx-auto rounded-2xl sm:rounded-3xl p-4 xs:p-6 sm:p-8 md:p-10 lg:p-12 bg-gradient-to-b from-[#123c42] to-[#0b2428] text-white">
          <h2 className="text-center text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-10 lg:mb-14 px-2">
            Latest{" "}
            <span
             style={{ fontFamily: "Playfair Display, serif" }}
              className="text-teal-300 relative inline-block"
            >
              Blog & Articles
              <span className="absolute left-0 bottom-1 sm:bottom-2 w-full h-2 sm:h-3 bg-teal-400/30 -z-10 rounded"></span>
            </span>
          </h2>

          <div className="flex gap-4 sm:gap-6 md:gap-8 overflow-hidden pb-4 -mx-2 px-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex-shrink-0 w-[260px] xs:w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] rounded-xl sm:rounded-2xl overflow-hidden bg-white/5 border border-white/10"
              >
                <div className="h-36 xs:h-40 sm:h-48 md:h-52 lg:h-56 bg-white/10 animate-pulse" />
                <div className="p-3 xs:p-4 sm:p-5 md:p-6">
                  <div className="h-4 bg-white/10 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-white/10 rounded animate-pulse w-3/4 mb-3" />
                  <div className="h-3 bg-white/10 rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error or no blogs
  if (isError || blogs.length === 0) return null;

  return (
    <section className="py-10 sm:py-16 md:py-20 lg:py-24 px-3 xs:px-4 sm:px-6">
      <div className="max-w-7xl mx-auto rounded-2xl sm:rounded-3xl p-4 xs:p-6 sm:p-8 md:p-10 lg:p-12 bg-gradient-to-b from-[#123c42] to-[#0b2428] text-white">
        {/* ===== Heading ===== */}
        <h2 className="text-center text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-10 lg:mb-14 px-2">
          Latest{" "}
          <span
           style={{ fontFamily: "Playfair Display, serif" }}
            className="text-teal-300 relative inline-block"
          >
            Blog & Articles
            <span className="absolute left-0 bottom-1 sm:bottom-2 w-full h-2 sm:h-3 bg-teal-400/30 -z-10 rounded"></span>
          </span>
        </h2>

        {/* ===== Cards Container ===== */}
        <div className="relative">
          {/* Scroll Container */}
          <div
            ref={scrollRef}
            onScroll={checkScrollButtons}
            className="
              flex gap-4 sm:gap-6 md:gap-8
              overflow-x-auto
              scroll-smooth
              pb-4
              -mx-2 px-2
              snap-x snap-mandatory
              scrollbar-hide
            "
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {blogs.map((blog) => (
              <Link
                to={`/blogs/${blog.slug || blog._id}`}
                key={blog._id}
                className="
                  group
                  flex-shrink-0
                  w-[260px]
                  xs:w-[280px]
                  sm:w-[300px]
                  md:w-[320px]
                  lg:w-[340px]
                  rounded-xl
                  sm:rounded-2xl
                  overflow-hidden
                  bg-white/5
                  backdrop-blur-md
                  border border-white/10
                  shadow-xl
                
                  transition
                  duration-300
                  snap-start
                "
              >
                {/* Image */}
                <div className="relative h-36 xs:h-40 sm:h-48 md:h-52 lg:h-56 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x250?text=Blog";
                    }}
                  />

                  {/* Tag Badge */}
                  <span className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 bg-teal-500 text-white text-[10px] xs:text-xs px-2 xs:px-3 sm:px-4 py-0.5 sm:py-1 rounded-full font-medium">
                    {blog.category || "General"}
                  </span>
                </div>

                {/* Content */}
                <div className="p-3 xs:p-4 sm:p-5 md:p-6">
                  <h3 className="font-semibold text-sm sm:text-base md:text-lg leading-snug mb-2 sm:mb-3 md:mb-4 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-[10px] xs:text-xs sm:text-sm text-gray-300">
                    By{" "}
                    <span className="text-teal-400 font-medium">
                      {"Mozno Wealth"}
                    </span>{" "}
                    • {formatDate(blog.createdAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Gradient Overlays for scroll indication */}
          <div className="hidden sm:block absolute left-0 top-0 bottom-4 w-8 md:w-12 bg-gradient-to-r from-[#123c42] to-transparent pointer-events-none opacity-60" />
          <div className="hidden sm:block absolute right-0 top-0 bottom-4 w-8 md:w-12 bg-gradient-to-l from-[#0b2428] to-transparent pointer-events-none opacity-60" />
        </div>

        {/* ===== Navigation Arrows ===== */}
        <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`
              w-10 h-10 
              sm:w-11 sm:h-11 
              md:w-12 md:h-12 
              rounded-lg sm:rounded-xl 
              bg-white/10 
              border border-white/20 
              flex items-center justify-center 
              transition
              ${
                canScrollLeft
                  ? "hover:bg-teal-500 cursor-pointer"
                  : "opacity-40 cursor-not-allowed"
              }
            `}
            aria-label="Scroll left"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`
              w-10 h-10 
              sm:w-11 sm:h-11 
              md:w-12 md:h-12 
              rounded-lg sm:rounded-xl 
              bg-white/10 
              border border-white/20 
              flex items-center justify-center 
              transition
              ${
                canScrollRight
                  ? "hover:bg-teal-500 cursor-pointer"
                  : "opacity-40 cursor-not-allowed"
              }
            `}
            aria-label="Scroll right"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* ===== Scroll Indicator Dots (Mobile) ===== */}
        <div className="flex justify-center gap-1.5 mt-4 sm:hidden">
          {blogs.map((_, index) => (
            <div key={index} className="w-1.5 h-1.5 rounded-full bg-white/30" />
          ))}
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
