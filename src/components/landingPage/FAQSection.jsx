import { HelpCircle, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import apiClient from "../../api/axios.instance";

const defaultFaqs = [
  {
    q: "What is Mozno Wealth and how is it different from other financial advisors?",
    a: [
      "Mozno Wealth is a comprehensive wealth management firm founded by Harshal Jain.",
      "Unlike traditional advisors, we offer integrated services under one roof:",
      [
        "Wealth management",
        "Financial planning",
        "Tax advisory",
        "Insurance",
        "Borrowing solutions",
        "Succession planning",
      ],
      "Our SEBI/RBI/IRDAI compliant approach delivers institutional-grade expertise with personal attention.",
    ],
  },

  {
    q: "What specific wealth management services do you offer?",
    a: [
      [
        "Portfolio construction (Mutual Funds, PMS, AIFs, Bonds, Unlisted Shares)",
        "Comprehensive retirement & goal planning",
        "Tax planning & filing",
        "Insurance management",
        "Borrowing solutions",
        "Estate & succession planning",
      ],
      "All services are delivered through our tech-forward digital platform with AI-powered insights.",
    ],
  },

  {
    q: "How does your 100% free consultation work?",
    a: [
      "During a 30-minute free consultation, we:",
      [
        "Analyze your current finances",
        "Discuss goals",
        "Identify gaps",
        "Provide recommendations",
        "Explain pricing transparently",
      ],
      "No obligations. No hidden charges.",
    ],
  },

  {
    q: "I'm based outside Mumbai. Can I still use your services?",
    a: [
      "Yes. We serve clients across India and globally.",
      [
        "Virtual consultations",
        "Digital documents",
        "Online portfolio monitoring",
        "Secure platform access",
      ],
    ],
  },

  {
    q: "How do you ensure regulatory compliance?",
    a: [
      [
        "SEBI regulations for investments",
        "RBI guidelines for borrowing",
        "IRDAI norms for insurance",
        "Income Tax Act compliance",
      ],
      "Our processes are built to meet high governance and compliance standards.",
    ],
  },

  {
    q: "What technology tools do you provide?",
    a: [
      [
        "Portfolio dashboard",
        "Financial health calculator",
        "Secure document upload",
        "AI-powered insights",
        "Real-time market tracking",
      ],
      "Accessible anytime through our client portal.",
    ],
  },

  {
    q: "Can you help with business finances too?",
    a: [
      [
        "Corporate tax planning",
        "Business valuation",
        "Fundraising advisory",
        "M&A support",
        "Employee wealth programs",
      ],
      "Plus complete personal wealth management.",
    ],
  },

  {
    q: "What is your fee structure?",
    a: [
      [
        "Wealth Management: 0.5% – 1.5% annually",
        "Financial Planning: ₹15k – ₹1L+",
        "Tax Filing: ₹2.5k – ₹25k",
        "Insurance: fee-only advisory",
        "Borrowing: no client fees",
      ],
      "All fees discussed transparently during consultation.",
    ],
  },

  {
    q: "How do you protect client data?",
    a: [
      [
        "Bank-grade encryption",
        "Secure document storage",
        "Security audits",
        "Indian data protection compliance",
        "Confidentiality agreements",
      ],
    ],
  },

  {
    q: "What happens if I discontinue services?",
    a: [
      [
        "100% ownership remains with you",
        "No lock-in periods",
        "Full transfer support",
        "Smooth exit anytime",
      ],
    ],
  },

  {
    q: "Do you offer estate & succession planning?",
    a: [
      [
        "Will drafting",
        "Trust creation",
        "Business succession",
        "Inheritance tax planning",
        "Family governance structures",
      ],
    ],
  },

  {
    q: "How do you stay updated with regulations?",
    a: [
      [
        "Dedicated compliance team",
        "Ongoing regulatory training",
        "Industry memberships",
        "Automated alerts",
      ],
    ],
  },

  {
    q: "What support do you provide after onboarding?",
    a: [
      [
        "Quarterly reviews",
        "Annual financial checkups",
        "Tax season assistance",
        "Market updates",
        "Dedicated relationship manager",
        "24/7 dashboard access",
      ],
    ],
  },

  {
    q: "Can I start with one service first?",
    a: [
      "Yes. Many clients start small and expand later.",
      [
        "Tax filing",
        "Insurance review",
        "Portfolio health check",
      ],
    ],
  },

  {
    q: "How do I get started with Mozno Wealth?",
    a: [
      [
        "Schedule free consultation",
        "Initial assessment",
        "Receive personalized plan",
        "Complete onboarding",
        "Implementation & monitoring",
      ],
      "Simple. Transparent. Efficient.",
    ],
  },
];

// Helper function to render answer content
const renderAnswer = (answer) => {
  return answer.map((item, idx) => {
    if (Array.isArray(item)) {
      return (
        <ul key={idx} className="list-disc list-inside space-y-1 my-2 break-words">
          {item.map((listItem, listIdx) => (
            <li key={listIdx} className="text-xs sm:text-sm md:text-base break-words">
              {listItem}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={idx} className="text-xs sm:text-sm md:text-base break-words">
        {item}
      </p>
    );
  });
};

export default function FAQSection() {
  const { data: dynamicFaqs } = useQuery({
    queryKey: ["public-settings", "faqs"],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/settings/public");
        const faqs = response?.faqs || response?.website?.faqs || [];
        return Array.isArray(faqs) ? faqs : [];
      } catch {
        return [];
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const faqsToRender = (dynamicFaqs || []).map((item) => ({
    q: item.q || item.question || "",
    a: Array.isArray(item.a || item.answer)
      ? item.a || item.answer
      : [item.a || item.answer || ""],
  }));

  // FAQ section is now fully backend-driven (no hardcoded fallback).
  if (!faqsToRender.length) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 sm:mb-4 md:mb-6 break-words">
            Frequently <br className="hidden xs:block" />
            <span style={{ fontFamily: "Playfair Display, serif" }} className="text-teal-600 break-words">
              Asked Questions
            </span>
          </h2>
          <p className="text-gray-500 max-w-md text-xs sm:text-sm md:text-base">
            No FAQs published yet. Please add FAQs from Admin (FAQs page).
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">

          {/* ================= LEFT STICKY ================= */}
          <div className="lg:sticky lg:top-24 xl:top-28 h-fit">

            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 sm:mb-4 md:mb-6 break-words">
              Frequently <br className="hidden xs:block" />
              <span
               style={{ fontFamily: "Playfair Display, serif" }}
                className="text-teal-600 break-words"
              >
                Asked Questions
              </span>
            </h2>

            <p className="text-gray-500 mb-4 sm:mb-6 md:mb-8 max-w-md text-xs sm:text-sm md:text-base">
              Find answers to common questions about our wealth management services, 
              fees, and how we can help secure your financial future.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center bg-teal-600 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl shadow-md hover:bg-teal-700 transition text-xs sm:text-sm md:text-base"
            >
              More Questions →
            </Link>
          </div>

          {/* ================= RIGHT SCROLLABLE ================= */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10">

            {faqsToRender.map((faq, index) => (
              <div key={index} className="space-y-2 sm:space-y-3 md:space-y-4">

                {/* Question */}
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-4 h-4 sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px]" />
                  </div>

                  <div className="bg-gray-100 rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 w-full min-w-0 break-words">
                    <p className="font-medium text-gray-800 text-xs sm:text-sm md:text-base leading-snug break-words">
                      {faq.q}
                    </p>
                  </div>
                </div>

                {/* Answer */}
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4 ml-10 sm:ml-12 md:ml-14">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px]" />
                  </div>

                  <div className="bg-teal-50 rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 text-gray-700 leading-relaxed w-full min-w-0 space-y-2 break-words">
                    {renderAnswer(faq.a)}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}