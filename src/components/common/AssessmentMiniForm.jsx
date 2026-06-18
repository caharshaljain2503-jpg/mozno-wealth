import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { User, AtSign, Phone, MessageSquare, Loader2, Send } from "lucide-react";
import { submitAssessmentLead } from "../../services/contactApi";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const SERVICE_BY_KIND = {
  "financial-health": "financial-health-questionnaire",
  "risk-profiling": "risk-profiling-questionnaire",
};

export default function AssessmentMiniForm({ assessmentKind, onSubmitSuccess }) {
  const recaptchaRef = useRef(null);
  const recaptchaSize =
    typeof window !== "undefined" && window.innerWidth < 380 ? "compact" : "normal";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaError, setRecaptchaError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setRecaptchaError("");

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
    if (!RECAPTCHA_SITE_KEY) {
      setSubmitError("Google CAPTCHA site key is missing.");
      return;
    }
    if (!recaptchaToken) {
      setSubmitError("Please complete the Google CAPTCHA.");
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
        recaptchaToken,
      });
      onSubmitSuccess?.({
        fullName: nameT,
        email: emailT.toLowerCase(),
        phone: phoneT,
      });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";
      setSubmitError(msg);
      setRecaptchaToken("");
      recaptchaRef.current?.reset();
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
          <span className="block text-xs font-medium text-gray-700 mb-2">Verification</span>
          {!RECAPTCHA_SITE_KEY ? (
            <p className="text-sm text-red-600">Google CAPTCHA site key is missing.</p>
          ) : (
            <div className="min-h-[78px] overflow-hidden">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                size={recaptchaSize}
                onChange={(token) => {
                  setRecaptchaToken(token || "");
                  setRecaptchaError("");
                  setSubmitError("");
                }}
                onExpired={() => {
                  setRecaptchaToken("");
                  setRecaptchaError("CAPTCHA expired. Please verify again.");
                }}
                onErrored={() => {
                  setRecaptchaToken("");
                  setRecaptchaError("CAPTCHA could not load. Please refresh the page.");
                }}
              />
            </div>
          )}
          {recaptchaError && (
            <p className="text-sm text-red-600 mt-2">{recaptchaError}</p>
          )}
        </div>

        {submitError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || !RECAPTCHA_SITE_KEY || !recaptchaToken}
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
