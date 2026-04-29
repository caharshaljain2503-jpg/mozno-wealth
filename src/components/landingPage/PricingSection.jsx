import { motion } from "framer-motion";
import { Check, X, Sparkles, Crown, ArrowRight, Shield, Zap } from "lucide-react";
import { useState } from "react";

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      badge: "Essential",
      description: "Perfect for individuals starting their wealth journey",
      monthlyPrice: 2999,
      yearlyPrice: 29990,
      popular: false,
      features: [
        { text: "Portfolio Analysis", included: true },
        { text: "Basic Financial Planning", included: true },
        { text: "Tax Filing Assistance", included: true },
        { text: "Email Support", included: true },
        { text: "Investment Advisory", included: false },
        { text: "Dedicated Manager", included: false },
      ],
      cta: "Get Started",
    },
    {
      name: "Premium",
      badge: "Most Popular",
      description: "Comprehensive wealth management for growing portfolios",
      monthlyPrice: 7999,
      yearlyPrice: 79990,
      popular: true,
      features: [
        { text: "Everything in Starter", included: true },
        { text: "Investment Advisory", included: true },
        { text: "Tax Optimization", included: true },
        { text: "Insurance Planning", included: true },
        { text: "Priority Support", included: true },
        { text: "Quarterly Reviews", included: true },
      ],
      cta: "Start Free Trial",
    },
    {
      name: "Elite",
      badge: "Enterprise",
      description: "Full-spectrum wealth services for HNIs & families",
      monthlyPrice: 19999,
      yearlyPrice: 199990,
      popular: false,
      features: [
        { text: "Everything in Premium", included: true },
        { text: "Dedicated Wealth Manager", included: true },
        { text: "Succession Planning", included: true },
        { text: "Alternative Investments", included: true },
        { text: "Family Office Services", included: true },
        { text: "24/7 Concierge", included: true },
      ],
      cta: "Contact Us",
    },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-48 h-48 min-[375px]:w-64 min-[375px]:h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-emerald-50/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 min-[375px]:w-64 min-[375px]:h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-teal-50/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-[375px]:py-14 sm:py-16 md:py-20 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 min-[375px]:mb-10 sm:mb-12 lg:mb-14"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 min-[375px]:gap-2 px-3 min-[375px]:px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 mb-4 min-[375px]:mb-5 sm:mb-6">
            <Sparkles className="w-3.5 h-3.5 min-[375px]:w-4 min-[375px]:h-4 text-emerald-600" />
            <span className="text-[11px] min-[375px]:text-xs sm:text-sm font-medium text-emerald-700">
              Simple Pricing
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl min-[375px]:text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-3 min-[375px]:mb-4 leading-tight">
            Plans that grow
            <span style={{ fontFamily: "Playfair Display, serif" }} className="block min-[375px]:inline min-[375px]:ml-2 text-emerald-600">
              With You.
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm min-[375px]:text-base sm:text-lg max-w-xl mx-auto mb-6 min-[375px]:mb-8 sm:mb-10 leading-relaxed px-2">
            Transparent pricing with no hidden fees. Choose a plan that fits your needs.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center p-1 min-[375px]:p-1.5 bg-gray-100 rounded-xl min-[375px]:rounded-2xl">
            <button
              onClick={() => setIsYearly(false)}
              className={`relative px-3.5 min-[375px]:px-4 sm:px-6 py-2 min-[375px]:py-2.5 rounded-lg min-[375px]:rounded-xl text-xs min-[375px]:text-sm sm:text-base font-semibold transition-all ${
                !isYearly
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`relative px-3.5 min-[375px]:px-4 sm:px-6 py-2 min-[375px]:py-2.5 rounded-lg min-[375px]:rounded-xl text-xs min-[375px]:text-sm sm:text-base font-semibold transition-all flex items-center gap-1.5 min-[375px]:gap-2 ${
                isYearly
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Yearly
              <span className="text-[9px] min-[375px]:text-[10px] sm:text-xs bg-emerald-500 text-white px-1.5 min-[375px]:px-2 py-0.5 rounded-full font-bold">
                -17%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-[375px]:gap-5 sm:gap-6 lg:gap-8 max-w-sm min-[375px]:max-w-md md:max-w-none mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              isYearly={isYearly}
              index={index}
              formatPrice={formatPrice}
            />
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 min-[375px]:mt-12 sm:mt-14 lg:mt-16"
        >
          <div className="bg-gray-50 rounded-xl min-[375px]:rounded-2xl sm:rounded-3xl p-4 min-[375px]:p-5 sm:p-6 lg:p-8 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 min-[375px]:gap-5 sm:gap-6">
              {/* Trust points */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 min-[375px]:gap-4 sm:gap-5 lg:gap-6">
                {[
                  { icon: Shield, text: "SEBI Compliant" },
                  { icon: Zap, text: "Cancel Anytime" },
                  { icon: Check, text: "No Hidden Fees" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 min-[375px]:gap-2 text-gray-600"
                  >
                    <item.icon className="w-3.5 h-3.5 min-[375px]:w-4 min-[375px]:h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-[11px] min-[375px]:text-xs sm:text-sm font-medium whitespace-nowrap">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="https://wa.me/919820507696"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 min-[375px]:gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-xs min-[375px]:text-sm group flex-shrink-0"
              >
                Need a custom plan?
                <ArrowRight className="w-3.5 h-3.5 min-[375px]:w-4 min-[375px]:h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Pricing Card Component
function PricingCard({ plan, isYearly, index, formatPrice }) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={`relative ${plan.popular ? "lg:-mt-3 lg:mb-3" : ""}`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-3 min-[375px]:-top-3.5 left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center gap-1 min-[375px]:gap-1.5 px-2.5 min-[375px]:px-3 sm:px-4 py-1 min-[375px]:py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg">
            <Crown className="w-3 h-3 min-[375px]:w-3.5 min-[375px]:h-3.5 text-white" />
            <span className="text-[10px] min-[375px]:text-xs font-bold text-white uppercase tracking-wide">
              Popular
            </span>
          </div>
        </div>
      )}

      {/* Card */}
      <div
        className={`
        relative h-full rounded-xl min-[375px]:rounded-2xl sm:rounded-3xl p-4 min-[375px]:p-5 sm:p-6 lg:p-8 transition-all duration-300 overflow-hidden
        ${
          plan.popular
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white shadow-xl shadow-gray-900/20"
            : "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg"
        }
      `}
      >
        {/* Decorative Elements for Popular */}
        {plan.popular && (
          <>
            <div className="absolute top-0 right-0 w-24 min-[375px]:w-32 sm:w-40 h-24 min-[375px]:h-32 sm:h-40 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-20 min-[375px]:w-24 sm:w-32 h-20 min-[375px]:h-24 sm:h-32 bg-teal-500/10 rounded-full blur-2xl" />
          </>
        )}

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-4 min-[375px]:mb-5 sm:mb-6">
            {!plan.popular && (
              <span className="inline-block text-[10px] min-[375px]:text-xs font-medium text-emerald-600 bg-emerald-50 px-2 min-[375px]:px-2.5 sm:px-3 py-0.5 min-[375px]:py-1 rounded-full mb-2 min-[375px]:mb-3">
                {plan.badge}
              </span>
            )}
            {plan.popular && <div className="h-5 min-[375px]:h-6" />}

            <h3
            style={{ fontFamily: "Playfair Display, serif" }}
              className={`text-lg min-[375px]:text-xl sm:text-2xl  font-bold mb-1 min-[375px]:mb-1.5 sm:mb-2 ${
                plan.popular ? "text-white" : "text-gray-900"
              }`}
            >
              {plan.name}
            </h3>

            <p
              className={`text-xs min-[375px]:text-sm sm:text-base leading-relaxed ${
                plan.popular ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {plan.description}
            </p>
          </div>

          {/* Price */}
          <div className="mb-4 min-[375px]:mb-5 sm:mb-6">
            <div className="flex items-baseline gap-0.5 min-[375px]:gap-1">
              <span
                className={`text-xs min-[375px]:text-sm ${
                  plan.popular ? "text-gray-400" : "text-gray-500"
                }`}
              >
                ₹
              </span>
              <span
                className={`text-2xl min-[375px]:text-3xl sm:text-4xl lg:text-5xl font-bold ${
                  plan.popular ? "text-white" : "text-gray-900"
                }`}
              >
                {formatPrice(price)}
              </span>
            </div>
            <p
              className={`text-[11px] min-[375px]:text-xs sm:text-sm mt-0.5 min-[375px]:mt-1 ${
                plan.popular ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {isYearly ? "per year" : "per month"}
            </p>
          </div>

          {/* CTA Button */}
          <motion.a
            href="https://wa.me/919820507696"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              w-full flex items-center justify-center gap-1.5 min-[375px]:gap-2 px-4 min-[375px]:px-5 sm:px-6 py-2.5 min-[375px]:py-3 sm:py-3.5 rounded-lg min-[375px]:rounded-xl font-semibold text-xs min-[375px]:text-sm sm:text-base transition-all mb-4 min-[375px]:mb-5 sm:mb-6
              ${
                plan.popular
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }
            `}
          >
            {plan.cta}
            <ArrowRight className="w-3.5 h-3.5 min-[375px]:w-4 min-[375px]:h-4" />
          </motion.a>

          {/* Features */}
          <div className="space-y-2.5 min-[375px]:space-y-3 sm:space-y-4">
            <p
              className={`text-[10px] min-[375px]:text-xs font-semibold uppercase tracking-wider ${
                plan.popular ? "text-gray-400" : "text-gray-400"
              }`}
            >
              What's included
            </p>

            <ul className="space-y-2 min-[375px]:space-y-2.5 sm:space-y-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 min-[375px]:gap-2.5 sm:gap-3">
                  <div
                    className={`
                    w-4 h-4 min-[375px]:w-[18px] min-[375px]:h-[18px] sm:w-5 sm:h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                    ${
                      feature.included
                        ? plan.popular
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-emerald-100 text-emerald-600"
                        : plan.popular
                        ? "bg-gray-700 text-gray-500"
                        : "bg-gray-100 text-gray-400"
                    }
                  `}
                  >
                    {feature.included ? (
                      <Check className="w-2.5 h-2.5 min-[375px]:w-3 min-[375px]:h-3" />
                    ) : (
                      <X className="w-2.5 h-2.5 min-[375px]:w-3 min-[375px]:h-3" />
                    )}
                  </div>
                  <span
                    className={`text-xs min-[375px]:text-sm sm:text-base leading-tight ${
                      feature.included
                        ? plan.popular
                          ? "text-gray-200"
                          : "text-gray-700"
                        : plan.popular
                        ? "text-gray-500"
                        : "text-gray-400"
                    }`}
                  >
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}