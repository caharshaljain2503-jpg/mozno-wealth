import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  ArrowRight,
  Shield,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  RISK_QUESTIONS,
  RISK_SCORE_MAX,
  getRiskProfileFromTotal,
} from "../data/riskProfileQuestions";
import AssessmentContactModal from "../components/common/AssessmentContactModal";
import { submitAssessmentResultEmail } from "../services/assessmentResultEmail";

const RiskProfilingPage = () => {
  const questions = Array.isArray(RISK_QUESTIONS) ? RISK_QUESTIONS : [];
  const lastIndex = Math.max(0, questions.length - 1);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [phase, setPhase] = useState("welcome");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [leadDetails, setLeadDetails] = useState(null);
  const [emailStatus, setEmailStatus] = useState("idle");
  const [emailMessage, setEmailMessage] = useState("");

  const safeIndex = Math.max(0, Math.min(current, lastIndex));
  const q = questions[safeIndex];

  useEffect(() => {
    if (questions.length && current > lastIndex) {
      setCurrent(lastIndex);
    }
  }, [current, lastIndex, questions.length]);

  const handleSelect = (option) => {
    const active = questions[safeIndex];
    if (!active) return;

    const updated = {
      ...answers,
      [active.id]: {
        section: active.section,
        question: active.question,
        answer: option.label,
        score: option.score,
      },
    };
    setAnswers(updated);

    if (safeIndex < lastIndex) {
      const next = safeIndex + 1;
      setTimeout(() => setCurrent(next), 250);
    } else {
      const total = Object.values(updated).reduce((a, b) => a + Number(b.score), 0);
      const profile = getRiskProfileFromTotal(total);
      setResult({
        profile,
        totalScore: total,
      });
      setEmailStatus("sending");
      setEmailMessage("Sending assessment result email...");
      submitAssessmentResultEmail({
        assessmentKind: "risk-profiling",
        fullName: leadDetails?.fullName,
        email: leadDetails?.email,
        phone: leadDetails?.phone,
        totalScore: total,
        profileLabel: profile.type,
        answers: updated,
      })
        .then(() => {
          setEmailStatus("sent");
          setEmailMessage("Assessment result email sent to the client.");
        })
        .catch((err) => {
          console.error("Failed to submit risk profiling result:", err);
          setEmailStatus("failed");
          setEmailMessage(
            err?.response?.data?.message ||
              err?.message ||
              "Assessment result email could not be sent.",
          );
        });
    }
  };

  const reset = () => {
    setAnswers({});
    setCurrent(0);
    setResult(null);
    setLeadDetails(null);
    setEmailStatus("idle");
    setEmailMessage("");
    setPhase("welcome");
    setContactModalOpen(false);
  };

  // ── RESULT SCREEN ──────────────────────────────────────────────
  if (result) {
    const { profile: p, totalScore } = result;
    return (
      <div style={{ ...styles.page, marginTop: "60px" }}>
        <div style={styles.cardWide}>
          <div
            style={{
              ...styles.resultHeader,
              background: p.color,
            }}
          >
            <p style={styles.resultLabel}>Your Risk Profile</p>
            <h2 style={styles.resultType}>{p.type}</h2>
            <p style={styles.scoreLine}>
              Total score: <strong>{totalScore}</strong> / {RISK_SCORE_MAX}
            </p>
            <p style={styles.bandLine}>{p.band}</p>
            <p style={styles.resultDesc}>{p.desc}</p>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Suggested Allocation</h3>
            {Object.entries(p.allocation).map(([key, val]) => (
              <div key={key} style={styles.allocRow}>
                <span style={styles.allocLabel}>{key}</span>
                <div style={styles.barBg}>
                  <div
                    style={{
                      ...styles.barFill,
                      width: val,
                      background: p.color,
                    }}
                  />
                </div>
                <span style={styles.allocVal}>{val}</span>
              </div>
            ))}
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Recommended Products</h3>
            <ul style={styles.productList}>
              {p.products.map((item) => (
                <li key={item} style={styles.productItem}>
                  <span style={{ ...styles.dot, background: p.color }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={styles.section}>
            {emailStatus !== "idle" && (
              <p
                style={{
                  ...styles.emailStatus,
                  ...(emailStatus === "failed"
                    ? styles.emailStatusFailed
                    : emailStatus === "sent"
                      ? styles.emailStatusSent
                      : styles.emailStatusSending),
                }}
              >
                {emailMessage}
              </p>
            )}
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              <strong>Disclaimer:</strong> This risk assessment is based on your
              responses and is provided as educational information. It does not
              constitute investment advice. We recommend discussing your risk
              profile with our financial advisors before making investment
              decisions. Past performance is not indicative of future results.
            </p>
          </div>

          <div
            style={{ display: "flex", gap: "12px", padding: "12px 24px 20px" }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                ...styles.retakeBtn,
                width: "calc(50% - 6px)",
                margin: 0,
                background: "#f1f5f9",
                color: "#1e293b",
                border: "1px solid #e2e8f0",
              }}
            >
              Retake
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              style={{ ...styles.retakeBtn, width: "calc(50% - 6px)", margin: 0 }}
            >
              Print / Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "welcome") {
    const riskPillarTop = [
      {
        icon: Target,
        title: "Goals & horizon",
        desc: "When you need the money",
      },
      {
        icon: TrendingUp,
        title: "Market comfort",
        desc: "How you handle ups and downs",
      },
      {
        icon: Shield,
        title: "Capacity for loss",
        desc: "Income, savings & obligations",
      },
    ];
    const riskPillarBottom = [
      {
        icon: Clock,
        title: "Experience",
        desc: "Familiarity with volatile assets",
      },
      {
        icon: BarChart3,
        title: "Behaviour",
        desc: "Reactions in past corrections",
      },
    ];
    const riskPillarCardClass =
      "bg-teal-50 border border-teal-200 rounded-2xl p-4 sm:p-5";

    return (
      <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-teal-50/20">
        <section className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-emerald-900 to-slate-900">
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
                <BarChart3 size={14} className="text-emerald-300" />
                <span className="text-xs sm:text-sm font-semibold text-white/80">
                  Free · Private · Educational only
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
                Risk{" "}
                <span
                  className="italic"
                  style={{
                    fontFamily: "Georgia, serif",
                    background: "linear-gradient(135deg, #6ee7b7, #67e8f9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Profiling
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10"
              >
                Understand how much risk you can comfortably take before we map
                it to investments.
              </motion.p>

              <button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-teal-800 font-semibold rounded-xl hover:bg-emerald-50 transition-all shadow-lg text-sm"
              >
                Take free assessment
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 80"
              fill="none"
              className="w-full"
              preserveAspectRatio="none"
              style={{ display: "block" }}
            >
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
              <p className="text-xs sm:text-sm font-semibold text-teal-600 uppercase tracking-widest mb-2">
                What we assess
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                Drivers of your risk profile
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {riskPillarTop.map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className={riskPillarCardClass}
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-100 flex items-center justify-center mb-3">
                      <IconComponent size={18} className="text-teal-600" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-500">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
            <div className="flex justify-center mt-3 sm:mt-4">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md sm:max-w-xl">
                {riskPillarBottom.map((item, i) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (3 + i) * 0.07 }}
                      className={riskPillarCardClass}
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-100 flex items-center justify-center mb-3">
                        <IconComponent size={18} className="text-teal-600" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-500">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-200 text-sm"
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
        assessmentKind="risk-profiling"
        onSubmitSuccess={(details) => {
          setLeadDetails(details || null);
          setPhase("quiz");
          setAnswers({});
          setCurrent(0);
          setResult(null);
          setEmailStatus("idle");
          setEmailMessage("");
        }}
      />
      </>
    );
  }

  if (!questions.length || !q) {
    return (
      <div style={{ ...styles.page, marginTop: "60px" }}>
        <p style={{ color: "#64748b", textAlign: "center" }}>
          Risk questionnaire is unavailable. Please refresh the page.
        </p>
      </div>
    );
  }

  // ── QUESTION SCREEN ────────────────────────────────────────────
  const progress = Math.round(((safeIndex + 1) / questions.length) * 100);

  return (
    <div style={{ ...styles.page, marginTop: "60px" }}>
      <div style={styles.cardWide}>
        <div style={styles.topBar}>
          <span style={styles.qCount}>
            Q{safeIndex + 1} / {questions.length}
            <span style={styles.sectionTag}> · {q.section}</span>
          </span>
          <span style={styles.progressText}>{progress}%</span>
        </div>

        <div style={styles.progressBg}>
          <div
            style={{
              ...styles.progressFill,
              width: `${progress}%`,
            }}
          />
        </div>

        <h2 style={styles.questionText}>{q.question}</h2>

        <div style={styles.optionList}>
          {q.options.map((opt, idx) => (
            <button
              type="button"
              key={`${q.id}-${idx}`}
              onClick={() => handleSelect(opt)}
              style={{
                ...styles.optionBtn,
                ...(answers[q.id]?.score === opt.score ? styles.optionSelected : {}),
              }}
            >
              <span style={styles.optionLabel}>{opt.label}</span>
            </button>
          ))}
        </div>

        <div style={styles.nav}>
          <button
            type="button"
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={safeIndex === 0}
            style={{
              ...styles.navBtn,
              opacity: safeIndex === 0 ? 0.3 : 1,
              cursor: safeIndex === 0 ? "not-allowed" : "pointer",
            }}
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 12px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  cardWide: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    width: "100%",
    maxWidth: "720px",
    overflow: "hidden",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px 8px",
    color: "#64748b",
    fontSize: "13px",
  },
  qCount: { fontWeight: 600, color: "#1e293b" },
  sectionTag: { fontWeight: 500, color: "#64748b" },
  progressText: { fontWeight: 600, color: "#16a34a" },
  progressBg: {
    height: "6px",
    background: "#e2e8f0",
    margin: "0 24px",
    borderRadius: "99px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "#16a34a",
    borderRadius: "99px",
    transition: "width 0.3s ease",
  },
  questionText: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#1e293b",
    padding: "20px 16px 10px",
    lineHeight: 1.5,
    margin: 0,
  },
  optionList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "10px 16px 16px",
    maxHeight: "min(52vh, 480px)",
    overflowY: "auto",
  },
  optionBtn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    background: "#f8fafc",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    padding: "10px 14px",
    textAlign: "left",
    fontSize: "13px",
    color: "#334155",
    cursor: "pointer",
    transition: "all 0.15s",
    fontFamily: "inherit",
  },
  optionLabel: { flex: 1, lineHeight: 1.45 },
  optionSelected: {
    borderColor: "#16a34a",
    background: "#f0fdf4",
    color: "#15803d",
    fontWeight: 600,
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 24px 20px",
    gap: "12px",
  },
  navBtn: {
    background: "none",
    border: "none",
    color: "#64748b",
    fontSize: "14px",
    cursor: "pointer",
    padding: "6px 12px",
    fontWeight: 500,
    transition: "color 0.2s",
  },

  resultHeader: {
    padding: "28px 24px",
    textAlign: "center",
    color: "#fff",
  },
  resultLabel: {
    fontSize: "13px",
    opacity: 0.85,
    margin: "0 0 6px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: 600,
  },
  resultType: {
    fontSize: "32px",
    fontWeight: 800,
    margin: "0 0 8px",
  },
  scoreLine: {
    fontSize: "16px",
    margin: "0 0 6px",
    opacity: 0.95,
  },
  bandLine: {
    fontSize: "13px",
    margin: "0 0 12px",
    opacity: 0.88,
    fontWeight: 500,
  },
  resultDesc: {
    fontSize: "15px",
    opacity: 0.95,
    margin: 0,
    lineHeight: 1.6,
  },
  section: {
    padding: "24px 24px",
    borderTop: "1px solid #f1f5f9",
  },
  emailStatus: {
    margin: "0 0 14px",
    padding: "12px 14px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: 1.5,
  },
  emailStatusSending: {
    color: "#92400e",
    background: "#fffbeb",
    border: "1px solid #fde68a",
  },
  emailStatusSent: {
    color: "#047857",
    background: "#ecfdf5",
    border: "1px solid #a7f3d0",
  },
  emailStatusFailed: {
    color: "#b91c1c",
    background: "#fef2f2",
    border: "1px solid #fecaca",
  },
  sectionTitle: {
    fontSize: "12px",
    fontWeight: 700,
    color: "#475569",
    margin: "0 0 16px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  allocRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "14px",
  },
  allocLabel: {
    fontSize: "13px",
    color: "#64748b",
    width: "70px",
    flexShrink: 0,
    fontWeight: 500,
  },
  barBg: {
    flex: 1,
    height: "10px",
    background: "#f1f5f9",
    borderRadius: "99px",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: "99px",
    transition: "width 0.6s ease",
  },
  allocVal: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#1e293b",
    width: "40px",
    textAlign: "right",
  },
  productList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  productItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "14px",
    color: "#334155",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  retakeBtn: {
    display: "block",
    width: "calc(100% - 48px)",
    margin: "20px 24px 24px",
    padding: "13px",
    background: "#1e293b",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.2s",
  },
};

export default RiskProfilingPage;
