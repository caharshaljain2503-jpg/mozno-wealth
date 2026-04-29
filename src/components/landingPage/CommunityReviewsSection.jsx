import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const googleReviews = [
  {
    name: "Michael",
    rating: 5,
    role: "MDS Manufacturing",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    text: "Clear guidance and strong portfolio planning. We finally got direction, not product pushing.",
  },
  {
    name: "Diane",
    rating: 5,
    role: "ABC Rentals",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    text: "Their integrated approach for tax, insurance and investments made everything simpler for our family.",
  },
  {
    name: "Allison",
    rating: 5,
    role: "Grand Party Rental",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80",
    text: "The Personal CFO model is real. They first understand goals and then design the plan.",
  },
  {
    name: "Harsh",
    rating: 5,
    role: "Business Owner",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    text: "Execution is fast and communication is excellent. Highly recommended for busy professionals.",
  },
];

export default function CommunityReviewsSection() {
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % googleReviews.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const visibleReviews = [
    googleReviews[activeReview % googleReviews.length],
    googleReviews[(activeReview + 1) % googleReviews.length],
    googleReviews[(activeReview + 2) % googleReviews.length],
  ];

  return (
    <section className="relative bg-gradient-to-b from-white via-emerald-50/20 to-white py-10 sm:py-14 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-5 sm:mb-7">
          <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-700">
            <Star className="w-3.5 h-3.5" />
            From Our Community
          </p>
          <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">
            Google Reviews
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visibleReviews.map((review, index) => (
            <motion.div
              key={`${review.name}-${index}-${activeReview}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md"
            >
              <img
                src={review.image}
                alt={review.name}
                className="w-full h-44 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <Quote className="w-4 h-4 text-emerald-500" />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  "{review.text}"
                </p>
                <p className="mt-3 font-semibold text-gray-900 text-sm">
                  {review.name}
                </p>
                <p className="text-xs text-gray-500">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-5">
          {googleReviews.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveReview(idx)}
              className={`h-2 rounded-full transition-all ${
                activeReview === idx ? "w-6 bg-emerald-500" : "w-2 bg-gray-300"
              }`}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
