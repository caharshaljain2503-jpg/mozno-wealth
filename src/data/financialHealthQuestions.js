/**
 * Financial Health Check — 10 Yes/No questions, 1 point each (max 10).
 * Bands: 0–2 Just Getting Started, 3–4 Warming Up, 5–6 Building Momentum, 7–8 On Solid Ground, 9–10 Money Smart & Prepared
 *
 * Each question: `yesScore` / `noScore` encode the "healthier" choice for scoring.
 */

export const FINANCIAL_HEALTH_QUESTIONS = [
  {
    id: 1,
    prompt:
      "Do you have an emergency fund in liquid assets (savings, sweep FD, liquid fund, etc.) covering at least 3 months of essential expenses?",
    context: null,
    yesScore: 1,
    noScore: 0,
  },
  {
    id: 2,
    prompt: "Do you have personal (non‑employer) health insurance for yourself and all your dependents with adequate cover for major hospitalisation?",
    context: null,
    yesScore: 1,
    noScore: 0,
  },
  {
    id: 3,
    prompt: "If you have financial dependents, do you have a pure term life insurance policy in your name? (If you have no dependents, mark \"Yes\".)",
    context: null,
    yesScore: 1,
    noScore: 0,
  },
  {
    id: 4,
    prompt:
      "Do you avoid keeping any outstanding balance on high‑interest unsecured loans or credit cards (i.e., you pay them off in full every month)?",
    context: null,
    yesScore: 1,
    noScore: 0,
  },
  {
    id: 5,
    prompt: "Is your total monthly EMI (home, car, personal, etc.) less than 40% of your monthly take‑home income?",
    context: null,
    yesScore: 1,
    noScore: 0,
  },
  {
    id: 6,
    prompt: "Do you track your monthly spending and follow a basic budget or spending plan?",
    context: null,
    yesScore: 1,
    noScore: 0,
  },
  {
    id: 7,
    prompt:
      "Have you calculated how much corpus you need for a comfortable retirement (even roughly) and by when you want to retire?",
    context: null,
    yesScore: 1,
    noScore: 0,
  },
  {
    id: 8,
    prompt:
      "Are you regularly investing towards retirement (EPF/NPS/PPF/mutual funds, etc.) in line with that retirement target?",
    context: null,
    yesScore: 1,
    noScore: 0,
  },
  {
    id: 9,
    prompt: "Have you updated nominee details for all your bank accounts, insurance policies and investments?",
    context: null,
    yesScore: 1,
    noScore: 0,
  },
  {
    id: 10,
    prompt: "Have you documented key financial information (accounts, investments, policies, logins) and put in place a basic Will or succession plan, and informed at least one trusted family member?",
    context: null,
    yesScore: 1,
    noScore: 0,
  },
];

export const FINANCIAL_HEALTH_MAX_SCORE = FINANCIAL_HEALTH_QUESTIONS.length;

/** @param {number} total Integer 0–10 */
export function getFinancialHealthCategory(total) {
  const t = Math.max(
    0,
    Math.min(FINANCIAL_HEALTH_MAX_SCORE, Math.round(total)),
  );

  if (t <= 2) {
    return {
      key: "just-getting-started",
      label: "Just Getting Started",
      icon: "🔴",
      color: "#dc2626",
      lightBg: "#fef2f2",
      band: "Score 0 – 2",
      desc: "Your score shows you're at the very beginning of your financial journey. That's perfectly okay—this is your baseline, and every \"Yes\" you add from here is pure progress.",
    };
  }
  if (t <= 4) {
    return {
      key: "warming-up",
      label: "Warming Up",
      icon: "🟠",
      color: "#ea580c",
      lightBg: "#fff7ed",
      band: "Score 3 – 4",
      desc: "You've taken some good first steps and your financial basics are warming up. With a few more conscious moves, you can quickly move into a more comfortable zone.",
    };
  }
  if (t <= 6) {
    return {
      key: "building-momentum",
      label: "Building Momentum",
      icon: "🟡",
      color: "#ca8a04",
      lightBg: "#fefce8",
      band: "Score 5 – 6",
      desc: "Your score shows that you've built some momentum with your money habits. Keep focusing on turning your remaining \"No\" answers into \"Yes\" and your overall financial confidence will keep rising.",
    };
  }
  if (t <= 8) {
    return {
      key: "on-solid-ground",
      label: "On Solid Ground",
      icon: "🟢",
      color: "#16a34a",
      lightBg: "#f0fdf4",
      band: "Score 7 – 8",
      desc: "You seem to be on solid financial ground with many healthy practices already in place. Now it's about fine‑tuning and staying consistent so your money keeps working better for you.",
    };
  }
  return {
    key: "money-smart-prepared",
    label: "Money Smart & Prepared",
    icon: "💚",
    color: "#15803d",
    lightBg: "#ecfdf5",
    band: "Score 9 – 10",
    desc: "Your score suggests you're managing your finances thoughtfully and are well prepared for most situations. Keep reviewing things periodically so your financial strength continues to support the life you want.",
  };
}