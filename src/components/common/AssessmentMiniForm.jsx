import React, { useState, useCallback, useEffect } from "react";
import { User, AtSign, Phone, MessageSquare, Loader2, RefreshCw, Send } from "lucide-react";
import { fetchAssessmentChallenge, submitAssessmentLead } from "../../services/contactApi";

const SERVICE_BY_KIND = {
  "financial-health": "financial-health-questionnaire",
  "risk-profiling": "risk-profiling-questionnaire",
};

export default function AssessmentMiniForm({ assessmentKind, onSubmitSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [challenge, setChallenge] = useState(null);
  const [loadingChallenge, setLoadingChallenge] = useState(true);
  const [challengeError, setChallengeError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadChallenge = useCallback(async () => {
    setLoadingChallenge(true);
    setChallengeError("");
    setCaptchaInput("");
    try {
      const data = await fetchAssessmentChallenge();
      if (!data?.success || data.n1 == null || data.n2 == null || !data.sig || !data.exp) {
        throw new Error("Invalid challenge");
      }
      setChallenge({ n1: data.n1, n2: data.n2, exp: data.exp, sig: data.sig });
    } catch (e) {
      setChallenge(null);
      setChallengeError(e?.response?.data?.message || e?.message || "Could not load verification.");
    } finally {
      setLoadingChallenge(false);
    }
  }, []);

  useEffect(() => {
    loadChallenge();
  }, [loadChallenge]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const nameT = name.trim();
    const emailT = email.trim();
    const phoneT = phone.trim();
    const msgT = message.trim();

    if (nameT.length < 3) {
      setSubmitError("Please enter your full name (at least 3 characters).");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailT)) {
      setSubmitError("Please enter a valid email.");
      return;
    }
    const phoneClean = phoneT.replace(/[\s\-\(\)\+]/g, "");
    if (!/^[\d]{10,15}$/.test(phoneClean)) {
      setSubmitError("Enter a valid phone number (10–15 digits).");
      return;
    }
    if (!challenge) {
      setSubmitError("Verification not loaded. Refresh and try again.");
      return;
    }
    if (captchaInput.trim() === "") {
      setSubmitError("Enter the answer to the math question.");
      return;
    }

    const service = SERVICE_BY_KIND[assessmentKind];
    if (!service) {
      setSubmitError("Invalid form type.");
      return;
    }

    setSubmitting(true);
    try {
      await submitAssessmentLead({
        name: nameT,
        email: emailT,
        phone: phoneT,
        message: msgT || "",
        service,
        captcha: {
          n1: challenge.n1,
          n2: challenge.n2,
          answer: captchaInput.trim(),
          exp: challenge.exp,
          sig: challenge.sig,
        },
      });
      onSubmitSuccess?.();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";
      setSubmitError(msg);
      loadChallenge();
    } finally {
      setSubmitting(false);
    }
  };

  const busy = submitting;

  return (
    <div className="relative z-10 px-1 sm:px-2 py-2">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md">
          <Send className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Your details</h2>
          <p className="text-xs text-gray-500">
            {assessmentKind === "financial-health"
              ? "After you submit, the Financial Health questionnaire starts."
              : "After you submit, the Risk Profiling questionnaire starts."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Your name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              placeholder="Full name"
              disabled={busy}
              autoComplete="name"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              placeholder="you@example.com"
              disabled={busy}
              autoComplete="email"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              placeholder="+91 98765 43210"
              disabled={busy}
              autoComplete="tel"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Message <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              maxLength={1000}
              className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none resize-none"
              placeholder="How can we help?"
              disabled={busy}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-0.5 text-right">{message.length}/1000</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-3">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-medium text-gray-700">Verification</span>
            <button
              type="button"
              onClick={loadChallenge}
              disabled={loadingChallenge || busy}
              className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium hover:underline disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingChallenge ? "animate-spin" : ""}`} />
              New question
            </button>
          </div>
          {loadingChallenge && (
            <div className="flex items-center gap-2 text-sm text-gray-500 py-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading…
            </div>
          )}
          {!loadingChallenge && challengeError && (
            <p className="text-sm text-red-600">{challengeError}</p>
          )}
          {!loadingChallenge && challenge && !challengeError && (
            <>
              <p className="text-sm text-gray-800 mb-2">
                What is{" "}
                <span className="font-semibold tabular-nums">
                  {challenge.n1} + {challenge.n2}
                </span>
                ?
              </p>
              <input
                type="text"
                inputMode="numeric"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value.replace(/\D/g, ""))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                placeholder="Your answer"
                disabled={busy}
                autoComplete="off"
              />
            </>
          )}
        </div>

        {submitError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || loadingChallenge || !challenge || !!challengeError}
          className="w-full py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Take free assessment
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
