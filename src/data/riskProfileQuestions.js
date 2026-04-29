/** Full Mozno risk profiler — scores per client questionnaire; total maps to profile bands. */

export const RISK_QUESTIONS = [
  {
    id: 1,
    section: "Age",
    question: "What is your current age?",
    options: [
      { label: "Less than 25 years", score: 20 },
      { label: "25–35 years", score: 18 },
      { label: "35–45 years", score: 14 },
      { label: "45–55 years", score: 10 },
      { label: "55–65 years", score: 6 },
      { label: "Above 65 years", score: 2 },
    ],
  },
  {
    id: 2,
    section: "Time horizon (nearest goal)",
    question: "What is the time horizon for your nearest financial goal?",
    options: [
      { label: "Less than 1 year", score: 2 },
      { label: "1–3 years", score: 6 },
      { label: "3–5 years", score: 10 },
      { label: "5–10 years", score: 15 },
      { label: "10–15 years", score: 18 },
      { label: "More than 15 years", score: 20 },
    ],
  },
  {
    id: 3,
    section: "Primary investment objective",
    question: "What is your primary investment objective?",
    options: [
      { label: "Capital preservation and safety (no losses acceptable)", score: 2 },
      { label: "Income generation with minimal risk (steady returns)", score: 6 },
      { label: "Balanced growth and income (moderate returns)", score: 10 },
      { label: "Capital appreciation (above-average returns)", score: 15 },
      { label: "Maximum growth (aggressive returns over 10+ years)", score: 20 },
    ],
  },
  {
    id: 4,
    section: "Annual household income (post-tax)",
    question: "What is your approximate annual household income (after taxes)?",
    options: [
      { label: "Less than ₹5 lakh", score: 4 },
      { label: "₹5 lakh – ₹15 lakh", score: 8 },
      { label: "₹15 lakh – ₹30 lakh", score: 12 },
      { label: "₹30 lakh – ₹75 lakh", score: 16 },
      { label: "₹75 lakh – ₹2 crore", score: 19 },
      { label: "Above ₹2 crore", score: 20 },
    ],
  },
  {
    id: 5,
    section: "Income stability",
    question: "What is the stability of your income source(s)?",
    options: [
      { label: "Very unstable (subject to major fluctuations)", score: 2 },
      { label: "Unstable (noticeable annual variations)", score: 5 },
      { label: "Somewhat stable (minor variations expected)", score: 10 },
      { label: "Stable (regular and predictable income)", score: 15 },
      { label: "Very stable (guaranteed/fixed income)", score: 20 },
    ],
  },
  {
    id: 6,
    section: "EMI / debt ratio",
    question: "What percentage of your monthly income is allocated to debt repayment?",
    options: [
      { label: "Above 50% (high debt burden)", score: 2 },
      { label: "40–50% (significant debt burden)", score: 5 },
      { label: "25–40% (moderate debt burden)", score: 10 },
      { label: "10–25% (manageable debt)", score: 15 },
      { label: "0–10% (minimal debt)", score: 20 },
    ],
  },
  {
    id: 7,
    section: "Emergency fund coverage",
    question: "How is your emergency fund coverage?",
    options: [
      { label: "No emergency fund or less than 1 month of expenses", score: 2 },
      { label: "1–3 months of expenses", score: 5 },
      { label: "3–6 months of expenses", score: 10 },
      { label: "6–12 months of expenses", score: 15 },
      { label: "More than 12 months of expenses", score: 20 },
    ],
  },
  {
    id: 8,
    section: "Total net worth",
    question: "What is your total net worth?",
    options: [
      { label: "Negative or zero net worth", score: 2 },
      { label: "Positive but less than ₹25 lakh", score: 5 },
      { label: "₹25 lakh – ₹1 crore", score: 10 },
      { label: "₹1 crore – ₹5 crore", score: 15 },
      { label: "₹5 crore – ₹25 crore", score: 18 },
      { label: "Above ₹25 crore", score: 20 },
    ],
  },
  {
    id: 9,
    section: "Insurance adequacy",
    question: "How adequate is your insurance coverage?",
    options: [
      { label: "No insurance or severely inadequate coverage", score: 2 },
      { label: "Minimal coverage (only basic health, no life insurance)", score: 5 },
      { label: "Partially adequate (some life + basic health, gaps exist)", score: 10 },
      { label: "Mostly adequate (good life + health + disability coverage)", score: 15 },
      { label: "Comprehensive coverage (life + health + disability + critical illness)", score: 20 },
    ],
  },
  {
    id: 10,
    section: "Depth of market knowledge",
    question: "How would you rate your depth of knowledge about financial markets?",
    options: [
      { label: "No knowledge", score: 2 },
      { label: "Basic knowledge", score: 5 },
      { label: "Moderate knowledge", score: 10 },
      { label: "Good knowledge", score: 15 },
      { label: "Advanced knowledge", score: 20 },
    ],
  },
  {
    id: 11,
    section: "Years of investing experience",
    question: "How many years of active investment experience do you have?",
    options: [
      { label: "No experience (first-time investor)", score: 2 },
      { label: "Less than 2 years", score: 5 },
      { label: "2–5 years", score: 10 },
      { label: "5–10 years", score: 15 },
      { label: "More than 10 years", score: 20 },
    ],
  },
  {
    id: 12,
    section: "Breadth across asset classes",
    question: "How familiar are you with different asset classes (breadth)?",
    options: [
      { label: "Not familiar — I only know 1–2 types", score: 3 },
      { label: "Somewhat familiar — basic differences", score: 7 },
      { label: "Familiar — understand risk/return of stocks, gold, real estate", score: 12 },
      { label: "Very familiar — understand correlations", score: 16 },
      { label: "Expert — can evaluate and combine all asset classes effectively", score: 20 },
    ],
  },
  {
    id: 13,
    section: "Behaviour in past drawdowns",
    question: "Have you experienced a significant market downturn (20%+ decline) with your investments?",
    options: [
      { label: "No, never experienced a major decline", score: 5 },
      { label: "Yes, but sold during the decline (panic selling)", score: 8 },
      { label: "Yes, held reluctantly", score: 13 },
      { label: "Yes, held calmly", score: 17 },
      { label: "Yes, bought more during the decline", score: 20 },
    ],
  },
  {
    id: 14,
    section: "Acceptable return/volatility band",
    question: "How would you describe your acceptable range of annual portfolio returns?",
    options: [
      { label: "Worst 0–2%, Best 4–8% (very stable)", score: 3 },
      { label: "Worst −5% to 0%, Best 8–15% (low volatility)", score: 7 },
      { label: "Worst −10% to −5%, Best 12–25% (moderate volatility)", score: 12 },
      { label: "Worst −15% to −10%, Best 20–35% (high volatility)", score: 16 },
      { label: "Worst −25% or worse, Best 35% or better (very high volatility)", score: 20 },
    ],
  },
  {
    id: 15,
    section: "Preference: guaranteed vs growth",
    question: "What is your preference between guaranteed/stable returns vs variable returns with growth?",
    options: [
      { label: "Strongly prefer guaranteed returns", score: 2 },
      { label: "Prefer stable returns with very little fluctuation", score: 5 },
      { label: "Okay with some fluctuation for moderate extra returns", score: 10 },
      { label: "Accept significant fluctuation for substantial growth", score: 15 },
      { label: "Willing to accept high volatility for maximum long-term growth", score: 20 },
    ],
  },
  {
    id: 16,
    section: "Emotional reaction to −10% month",
    question: "How would you emotionally feel if your portfolio dropped 10% in a single month?",
    options: [
      { label: "Very stressed and anxious", score: 2 },
      { label: "Concerned and worried", score: 5 },
      { label: "Somewhat uncomfortable", score: 10 },
      { label: "Calm", score: 15 },
      { label: "Unaffected", score: 20 },
    ],
  },
  {
    id: 17,
    section: "Expected withdrawal timeline",
    question: "When do you anticipate needing to withdraw money from your investments?",
    options: [
      { label: "Within the next year", score: 2 },
      { label: "1–3 years", score: 5 },
      { label: "3–5 years", score: 10 },
      { label: "5–10 years", score: 15 },
      { label: "More than 10 years or no planned withdrawals", score: 20 },
    ],
  },
  {
    id: 18,
    section: "Tolerance for illiquidity",
    question: "What percentage of your invested capital could you afford to lock away for 5+ years?",
    options: [
      { label: "None — need all liquid", score: 3 },
      { label: "Less than 20%", score: 6 },
      { label: "20–40%", score: 11 },
      { label: "40–60%", score: 16 },
      { label: "More than 60%", score: 20 },
    ],
  },
  {
    id: 19,
    section: "Need for regular income",
    question: "How important is regular income (dividends, interest) from your investments?",
    options: [
      { label: "Critical — depend on regular income", score: 2 },
      { label: "Important — prefer some income", score: 5 },
      { label: "Neutral — income and growth equally important", score: 10 },
      { label: "Not important — can reinvest all income", score: 15 },
      { label: "Not needed — seek maximum capital appreciation", score: 20 },
    ],
  },
  {
    id: 20,
    section: "Marital/dependent status",
    question: "What is your marital/dependent status?",
    options: [
      { label: "Single with multiple dependents", score: 4 },
      { label: "Single with one dependent or married with multiple dependents", score: 6 },
      { label: "Married with children", score: 8 },
      { label: "Married without dependents", score: 14 },
      { label: "Single with no dependents or substantial financial obligations", score: 20 },
    ],
  },
  {
    id: 21,
    section: "Upcoming major obligations",
    question: "Do you have any major upcoming financial obligations?",
    options: [
      { label: "Yes, within 1–2 years (significant amount)", score: 3 },
      { label: "Yes, within 2–5 years (significant amount)", score: 7 },
      { label: "Yes, but beyond 5 years or moderate amounts", score: 11 },
      { label: "Minor obligations only", score: 16 },
      { label: "No known major obligations", score: 19 },
    ],
  },
  {
    id: 22,
    section: "Recent windfall",
    question: "Have you received a windfall in the past 5 years?",
    options: [
      { label: "No, wealth stable or declining", score: 5 },
      { label: "Small increase (<20% of net worth)", score: 10 },
      { label: "Moderate increase (20–50%)", score: 14 },
      { label: "Significant increase (>50%)", score: 18 },
      { label: "Very significant increase (doubled net worth)", score: 20 },
    ],
  },
  {
    id: 23,
    section: "Stated risk philosophy",
    question: "What is your risk tolerance philosophy?",
    options: [
      { label: "Avoid risk at all costs", score: 2 },
      { label: "Minimize risk", score: 5 },
      { label: "Balanced approach", score: 10 },
      { label: "Accept calculated risk", score: 15 },
      { label: "Embrace risk", score: 20 },
    ],
  },
  {
    id: 24,
    section: "Decision-making confidence",
    question: "How would you rate your investment decision-making confidence?",
    options: [
      { label: "Very low — prefer someone else to decide", score: 3 },
      { label: "Low — need significant guidance", score: 6 },
      { label: "Moderate — can decide with some guidance", score: 11 },
      { label: "High — can make most decisions independently", score: 16 },
      { label: "Very high — can make complex decisions confidently", score: 20 },
    ],
  },
  {
    id: 25,
    section: "Loss aversion / disposition effect",
    question: "Do losses feel twice as bad as equal gains feel good?",
    options: [
      { label: "Hold losing stock indefinitely rather than accept loss", score: 2 },
      { label: "Very reluctant to sell losers; wait for recovery", score: 5 },
      { label: "Try to let losses go but it hurts emotionally", score: 10 },
      { label: "Can rationally accept losses; sell if fundamentals change", score: 15 },
      { label: "View losses as rebalancing opportunities; indifferent to losses vs gains", score: 20 },
    ],
  },
  {
    id: 26,
    section: "Social influence / herding",
    question: "Do you make investment decisions based on what others are doing rather than independent analysis?",
    options: [
      { label: "Often invest in whatever is “hot” because many others are", score: 2 },
      { label: "Pay attention to what others do and factor it in", score: 5 },
      { label: "Research independently but aware of market trends", score: 10 },
      { label: "Try to do independent research, though aware of others", score: 15 },
      { label: "Deliberately go against crowd trends", score: 20 },
    ],
  },
  {
    id: 27,
    section: "Anchoring to past prices",
    question: "When making decisions, do you get anchored to past prices (e.g., “I won’t sell below my buy price”)?",
    options: [
      { label: "Often use purchase price as main decision point", score: 2 },
      { label: "Entry price strongly influences decisions; reluctant to sell below", score: 5 },
      { label: "Consider entry price but focus mainly on fundamentals", score: 10 },
      { label: "Try to ignore entry price; focus on forward fundamentals", score: 15 },
      { label: "Indifferent to entry price; evaluate on current value and prospects", score: 20 },
    ],
  },
  {
    id: 28,
    section: "Recency bias",
    question: "Do recent market events disproportionately influence your investment decisions?",
    options: [
      { label: "Make major changes based on last 3–6 months performance", score: 2 },
      { label: "Recent events influence decisions more than long-term patterns", score: 5 },
      { label: "Try to balance recent performance with longer-term trends", score: 10 },
      { label: "Primarily focus on longer-term trends; ignore recent noise", score: 15 },
      { label: "Deliberately dismiss recent performance; focus on 5+ year trends", score: 20 },
    ],
  },
  {
    id: 29,
    section: "Attribution bias (skill vs luck)",
    question: "When your investments do well or poorly, how do you attribute the outcome?",
    options: [
      { label: "Gains = my skill, losses = bad luck", score: 2 },
      { label: "Give more credit for gains than blame for losses", score: 5 },
      { label: "Attribute gains and losses equally to self and market", score: 10 },
      { label: "Recognize most returns come from market conditions", score: 15 },
      { label: "View all outcomes as market-driven, not skill", score: 20 },
    ],
  },
  {
    id: 30,
    section: "Confirmation bias",
    question: "When evaluating whether to keep/add/sell an investment, what information matters most?",
    options: [
      { label: "Prefer recent positive reports that reinforce confidence", score: 2 },
      { label: "Focus on latest earnings and positive news; rarely change based on negative news", score: 5 },
      { label: "Review both positive and negative developments; positive is more reassuring", score: 10 },
      { label: "Deliberately seek negative information to challenge view", score: 15 },
      { label: "Specifically search for evidence that would prove thesis wrong", score: 20 },
    ],
  },
];

export const RISK_SCORE_MAX = RISK_QUESTIONS.reduce(
  (sum, q) => sum + Math.max(...q.options.map((o) => o.score)),
  0,
);

/** Total score → profile (thresholds per questionnaire matrix). */
export function getRiskProfileFromTotal(total) {
  if (total <= 120) {
    return {
      type: "Conservative",
      color: "#16a34a",
      band: "Total score ≤ 120",
      desc: "You prefer safe, stable investments with minimal risk. Your primary focus is capital preservation.",
      allocation: { Equity: "20%", Debt: "65%", Gold: "10%", Cash: "5%" },
      products: [
        "Fixed Deposits",
        "PPF",
        "Debt Mutual Funds",
        "Government Bonds",
        "Liquid Funds",
      ],
    };
  }
  if (total <= 240) {
    return {
      type: "Moderately Conservative",
      color: "#2563eb",
      band: "Total score > 120 and ≤ 240",
      desc: "You want some growth but prioritize safety. You're comfortable with low to moderate volatility.",
      allocation: { Equity: "40%", Debt: "45%", Gold: "10%", Cash: "5%" },
      products: [
        "Large Cap Funds",
        "Balanced Funds",
        "Corporate Bonds",
        "Monthly Income Plans",
        "Dividend Funds",
      ],
    };
  }
  if (total <= 360) {
    return {
      type: "Moderate",
      color: "#d97706",
      band: "Total score > 240 and ≤ 360",
      desc: "You're comfortable with moderate ups and downs. You balance growth and income needs well.",
      allocation: { Equity: "60%", Debt: "30%", Gold: "5%", Cash: "5%" },
      products: [
        "Multi Cap Funds",
        "Index Funds",
        "NPS",
        "International Funds",
        "Hybrid Funds",
      ],
    };
  }
  if (total <= 480) {
    return {
      type: "Moderately Aggressive",
      color: "#ea580c",
      band: "Total score > 360 and ≤ 480",
      desc: "You can handle higher volatility for better returns. You're confident in your long-term strategy.",
      allocation: { Equity: "75%", Debt: "15%", Gold: "5%", Cash: "5%" },
      products: [
        "Mid Cap Funds",
        "Small Cap Funds",
        "Sectoral Funds",
        "International Equities",
        "Growth Funds",
      ],
    };
  }
  return {
    type: "Aggressive",
    color: "#dc2626",
    band: "Total score > 480",
    desc: "You focus on maximum returns and can handle significant market swings. You have a strong conviction.",
    allocation: { Equity: "85%", Debt: "10%", Gold: "0%", Cash: "5%" },
    products: [
      "Small Cap Funds",
      "Direct Equity",
      "PMS",
      "Startup Investments",
      "Emerging Opportunities",
    ],
  };
}
