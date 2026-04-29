import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  TrendingUp,
  Landmark,
  Shield,
  HandCoins,
  ScrollText,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const tabs = [
  {
    id: "wealth",
    label: "Wealth Management",
    title: "Wealth Management",
    description:
      "Diversified investment options curated for long-term growth and disciplined wealth creation.",
    path: "/services/wealth-management",
    icon: PieChart,
    subServices: [
      "Mutual Fund",
      "Specialized Investment Funds",
      "Portfolio Management Services",
      "Alternative Investment Funds",
      "Unlisted Shares",
      "Fixed Income Products",
      "Structured Products",
    ],
  },
  {
    id: "planning",
    label: "Financial Planning",
    title: "Financial Planning",
    description:
      "Goal-based planning framework to align savings, investments and life goals with clarity.",
    path: "/services/financial-planning",
    icon: TrendingUp,
    subServices: [
      "Strategy Asset Allocation",
      "Goal Based Planning",
      "Retirement Planning",
      "Cash Flow Management & Budgeting",
    ],
  },
  {
    id: "tax",
    label: "Tax Advisory",
    title: "Tax Advisory",
    description:
      "Smart tax optimisation across salary, business and investments with compliant strategies.",
    path: "/services/tax-planning",
    icon: Landmark,
    subServices: [
      "Income Tax",
      "Goods & Service Tax",
      "Other Indirect Taxes",
      "NRI Compliance",
    ],
  },
  {
    id: "insurance",
    label: "Insurance",
    title: "Insurance",
    description:
      "Right protection cover to secure your income, family goals and future liabilities.",
    path: "/services/insurance-planning",
    icon: Shield,
    subServices: [
      "Life Insurance",
      "Health Insurance",
      "Medical Insurance",
      "Motor Insurance",
      "Other General Insurance",
    ],
  },
  {
    id: "borrowing",
    label: "Borrowing",
    title: "Borrowing",
    description:
      "Borrow smarter with lender comparison and structures matched to home, LAP, LAS, and business needs.",
    path: "/services/borrowing-solutions",
    icon: HandCoins,
    subServices: [
      "Distress Funding",
      "Home Loan",
      "Loan Against Property",
      "Loan against Securities",
      "Unsecured Loan",
      "Business Loan",
      "Consumer Loan",
    ],
  },
  {
    id: "succession",
    label: "Succession Planning",
    title: "Succession Planning",
    description:
      "Protect and transfer wealth smoothly with legal and structured succession planning.",
    path: "/services/succession-planning",
    icon: ScrollText,
    subServices: [
      "Estate Planning & Wealth Transfer",
      "Will Drafting",
      "Private Trust",
      "Family Governance & Legacy Planning",
      "Probate & Estate Administration",
    ],
  },
];

export default function OurServicesSection() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const activeService = useMemo(
    () => tabs.find((tab) => tab.id === activeTab) || tabs[0],
    [activeTab],
  );

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-emerald-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-100 bg-emerald-50 text-xs font-semibold text-emerald-700">
            <span aria-hidden>🌟</span>
            What we Offer
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">
            Personal Finance Made{" "}
            <span
              className="italic text-emerald-600"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Easy
            </span>
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Mozno Wealth is your comprehensive wealth partner. We offer integrated financial solutions
            tailored specifically for YOU.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-emerald-500 border-emerald-500 text-white shadow-md"
                    : "bg-white border-gray-200 text-gray-700 hover:border-emerald-200 hover:text-emerald-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
                <activeService.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {activeService.title}
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                {activeService.description}
              </p>
              <Link
                to={activeService.path}
                className="inline-flex items-center gap-2 mt-5 text-emerald-700 font-semibold hover:text-emerald-800"
              >
                Explore Options
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeService.subServices.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
