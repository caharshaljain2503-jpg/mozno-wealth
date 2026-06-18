import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  ArrowRight,
  ArrowLeft,
  Wallet,
  Shield,
  Umbrella,
  TrendingUp,
  CreditCard,
  Target,
  Printer,
  RotateCcw,
} from "lucide-react";
import AssessmentContactModal from "../components/common/AssessmentContactModal";
import {
  FINANCIAL_HEALTH_QUESTIONS,
  FINANCIAL_HEALTH_MAX_SCORE,
  getFinancialHealthCategory,
} from "../data/financialHealthQuestions";
import { submitAssessmentResultEmail } from "../services/assessmentResultEmail";

const FinancialHealthPage = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [phase, setPhase] = useState("welcome");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [leadDetails, setLeadDetails] = useState(null);
  const [emailStatus, setEmailStatus] = useState("idle");
  const [emailMessage, setEmailMessage] = useState("");

  const questions = FINANCIAL_HEALTH_QUESTIONS;
  const lastIndex = Math.max(0, questions.length - 1);
  const safeIndex = Math.max(0, Math.min(current, lastIndex));
  const q = questions[safeIndex];

  useEffect(() => {
    if (questions.length && current > lastIndex) {
      setCurrent(lastIndex);
    }
  }, [current, lastIndex, questions.length]);

  const handleBinaryAnswer = (score) => {
    const active = questions[safeIndex];
    if (!active) return;
    const selectedLabel = score === active.yesScore ? "Yes" : "No";
    const updated = {
      ...answers,
      [active.id]: {
        question: active.prompt,
        answer: selectedLabel,
        score,
      },
    };
    setAnswers(updated);
    if (safeIndex < lastIndex) {
      setTimeout(() => setCurrent(safeIndex + 1), 220);
    } else {
      const total = Object.values(updated).reduce((a, b) => a + Number(b.score), 0);
      const category = getFinancialHealthCategory(total);
      setResult({
        category,
        totalScore: total,
      });
      setEmailStatus("sending");
      setEmailMessage("Sending assessment result email...");
      submitAssessmentResultEmail({
        assessmentKind: "financial-health",
        fullName: leadDetails?.fullName,
        email: leadDetails?.email,
        phone: leadDetails?.phone,
        totalScore: total,
        profileLabel: category.label,
        answers: updated,
      })
        .then(() => {
          setEmailStatus("sent");
          setEmailMessage("Assessment result email sent to the client.");
        })
        .catch((err) => {
          console.error("Failed to submit financial health result:", err);
          setEmailStatus("failed");
          setEmailMessage(
            err?.response?.data?.message ||
              err?.message ||
              "Assessment result email could not be sent.",
          );
        });
    }
  };

  const resetAll = () => {
    setAnswers({});
    setCurrent(0);
    setResult(null);
    setLeadDetails(null);
    setEmailStatus("idle");
    setEmailMessage("");
    setPhase("welcome");
    setContactModalOpen(false);
  };

  const progress = Math.round(((safeIndex + 1) / questions.length) * 100);

  if (result) {
    const { category: c, totalScore } = result;
    return (
      <div className="min-h-screen bg-slate-50 pt-20 sm:pt-24 pb-12 px-4 flex items-start justify-center">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden print:shadow-none">
          <div
            className="px-6 py-8 sm:py-10 text-center text-white"
            style={{ background: c.color }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest opacity-90 mb-2">
              Your financial health
            </p>
            <p className="text-4xl mb-2" aria-hidden>
              {c.icon}
            </p>
            <h2 className="text-2xl sm:text-3xl font-black mb-2">{c.label}</h2>
            <p className="text-sm opacity-95 mb-1">
              Total score: <strong>{totalScore}</strong> / {FINANCIAL_HEALTH_MAX_SCORE}
            </p>
            <p className="text-xs opacity-85 font-medium">{c.band}</p>
          </div>
          <div className="p-6 sm:p-8 border-t border-gray-100" style={{ background: c.lightBg }}>
            <p className="text-gray-800 leading-relaxed text-sm sm:text-base">{c.desc}</p>
          </div>
          <div className="px-6 sm:px-8 pb-6">
            {emailStatus !== "idle" && (
              <p
                className={`mb-4 rounded-xl border px-4 py-3 text-xs font-medium ${
                  emailStatus === "failed"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : emailStatus === "sent"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-amber-200 bg-amber-50 text-amber-700"
                }`}
              >
                {emailMessage}
              </p>
            )}
            <p className="text-xs text-gray-500 leading-relaxed">
              <strong>Disclaimer:</strong> This assessment is indicative and based on your responses
              only. It is not financial advice. Please speak with a qualified advisor at Mozno Wealth
              before acting on the results.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 px-6 sm:px-8 pb-8">
            <button
              type="button"
              onClick={resetAll}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 font-semibold text-sm hover:bg-gray-50"
            >
              <RotateCcw className="w-4 h-4" />
              Start over
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700"
            >
              <Printer className="w-4 h-4" />
              Print / Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "quiz" && q) {
    return (
      <div className="min-h-screen bg-slate-100/90 pt-20 sm:pt-24 pb-12 px-3 sm:px-4 flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden">
            <div className="flex justify-between items-center px-4 sm:px-6 pt-5 pb-1 text-sm text-gray-600">
              <span className="font-semibold text-gray-900">
                Q{safeIndex + 1} / {questions.length}
                <span className="font-normal text-gray-500"> · Financial Health</span>
              </span>
              <span className="font-semibold text-emerald-600 tabular-nums">{progress}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 mx-4 sm:mx-6 rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <h2 className="text-base sm:text-lg font-bold text-gray-900 px-4 sm:px-6 pt-5 pb-3 leading-snug">
              {q.prompt}
            </h2>
            {q.context ? (
              <p className="text-xs sm:text-sm text-gray-500 px-4 sm:px-6 pb-2 leading-relaxed -mt-1">
                {q.context}
              </p>
            ) : null}

            <div className="px-4 sm:px-6 pb-6 pt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleBinaryAnswer(q.yesScore)}
                className="rounded-xl border-2 border-emerald-500 bg-emerald-50 py-4 sm:py-5 text-base font-bold text-emerald-900 shadow-sm transition-all hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleBinaryAnswer(q.noScore)}
                className="rounded-xl border-2 border-gray-200 bg-gray-50 py-4 sm:py-5 text-base font-bold text-gray-800 transition-all hover:border-emerald-200 hover:bg-emerald-50/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                No
              </button>
            </div>

            <div className="px-6 pb-6">
              <button
                type="button"
                onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                disabled={safeIndex === 0}
                className="text-sm text-gray-600 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:text-emerald-700 inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "quiz" && !q) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 text-gray-600 text-sm">
        Questionnaire unavailable.
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-emerald-50/20">
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-emerald-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 9, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 right-0 w-48 sm:w-80 h-48 sm:h-80 bg-cyan-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 pt-24 sm:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <Heart size={14} className="text-emerald-300" />
              <span className="text-xs sm:text-sm font-semibold text-white/80">
                Free · 10 questions · 100% Private
              </span>
            </div>
          </motion.div>

          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] mb-4 sm:mb-6"
            >
              Financial{" "}
              <span
                className="italic"
                style={{
                  fontFamily: "Georgia, serif",
                  background: "linear-gradient(135deg, #6ee7b7, #67e8f9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Health Check
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10"
            >
              Ten quick Yes / No questions on goals, comfort with investments, cash flow and
              resilience. Your score maps to a health band (Critical → Excellent).
            </motion.p>

            <button
              type="button"
              onClick={() => setContactModalOpen(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-all shadow-lg text-sm"
            >
              Take free assessment
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none" style={{ display: "block" }}>
            <path d="M0 80L360 40C720 0 1080 0 1440 40V80H0Z" fill="white" />
          </svg>
        </div>
      </section>

      <section className="py-10 sm:py-16 -mt-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10"
          >
            <p className="text-xs sm:text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-2">
              What We Analyse
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              6 Key Pillars of Financial Health
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { icon: Wallet, title: "Income & Expenses", desc: "Savings rate and budget habits" },
              { icon: Shield, title: "Emergency Fund", desc: "Liquidity buffer for surprises" },
              { icon: Umbrella, title: "Insurance", desc: "Life & health protection" },
              { icon: TrendingUp, title: "Investments", desc: "Wealth building portfolio" },
              { icon: CreditCard, title: "Debt & Liabilities", desc: "Loan and EMI management" },
              { icon: Target, title: "Financial Goals", desc: "Short & long-term planning" },
            ].map((item, i) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
                    <IconComponent size={18} className="text-emerald-600" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-[10px] sm:text-xs text-gray-500">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={() => setContactModalOpen(true)}
              className="inline-flex items-center gap-2 px-7 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 text-sm"
            >
              Take free assessment
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
    <AssessmentContactModal
      open={contactModalOpen}
      onClose={() => setContactModalOpen(false)}
      assessmentKind="financial-health"
      onSubmitSuccess={(details) => {
        setLeadDetails(details || null);
        setPhase("quiz");
        setCurrent(0);
        setAnswers({});
        setResult(null);
        setEmailStatus("idle");
        setEmailMessage("");
      }}
    />
    </>
  );
};

export default FinancialHealthPage;
