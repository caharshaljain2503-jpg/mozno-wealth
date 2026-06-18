import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import AssessmentMiniForm from "./AssessmentMiniForm";

/**
 * Lightweight lead form (name, email, phone, message, math captcha) before questionnaire.
 * Submissions use the same /api/contact pipeline as Contact Us → Admin Leads.
 */
export default function AssessmentContactModal({
  open,
  onClose,
  assessmentKind,
  onSubmitSuccess,
}) {
  const handleSuccess = useCallback((leadDetails) => {
    onSubmitSuccess?.(leadDetails);
    onClose?.();
  }, [onSubmitSuccess, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 xs:p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Your details"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md max-h-[min(92vh,900px)] flex flex-col rounded-2xl border border-emerald-100/80 bg-white shadow-2xl shadow-emerald-900/15 overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-emerald-50/90 border border-transparent hover:border-emerald-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain pt-10 sm:pt-3 pb-4 px-3 sm:px-4">
          <AssessmentMiniForm assessmentKind={assessmentKind} onSubmitSuccess={handleSuccess} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
