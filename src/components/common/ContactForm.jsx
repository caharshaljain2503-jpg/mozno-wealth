// components/ContactForm.jsx
import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import {
  Send,
  User,
  AtSign,
  Phone,
  FileText,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Building2,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import useContactForm from "../../hooks/useContact";
import { useEffect as useEffectReact } from "react";
import { fetchAssessmentChallenge } from "../../services/contactApi";

// ============ ZOD VALIDATION SCHEMA ============
const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s\u0900-\u097F'-]+$/, {
      message: "Only letters, spaces, hyphens allowed",
    }),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email")
    .max(150, "Email must be less than 150 characters"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (val) => {
        if (!val || val.trim() === "") return false;
        const cleaned = val.replace(/[\s\-\(\)\+]/g, "");
        return /^[\d]{10,15}$/.test(cleaned);
      },
      { message: "Enter a valid phone number (10-15 digits)" },
    ),

  company: z
    .string()
    .max(150, "Company name must be less than 150 characters")
    .optional()
    .or(z.literal("")),

  subject: z.string().min(1, "Please select a subject"),

  message: z.preprocess(
    (v) => (v === null || v === undefined ? "" : String(v).trim()),
    z.string().max(2000, "Message must be less than 2000 characters"),
  ),

  captcha: z
    .string()
    .min(1, "Please solve the math problem")
    .refine((val) => !isNaN(Number(val)), "Please enter a valid number"),
});
// ============ SUBJECT OPTIONS ============
const SUBJECT_OPTIONS = [
  { value: "", label: "Select a topic", disabled: true },
  { value: "wealth-management", label: "Wealth Management" },
  { value: "financial-planning", label: "Financial Planning" },
  { value: "tax-planning", label: "Tax Planning" },
  { value: "insurance", label: "Insurance Solutions" },
  { value: "borrowing", label: "Borrowing Solutions" },
  { value: "succession", label: "Succession Planning" },
  { value: "general", label: "General Inquiry" },
];

// ============ INITIAL FORM STATE ============
const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  message: "",
  captcha: "",
};
// ============ INPUT COMPONENT ============
const FormInput = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  required,
  error,
  touched,
  icon: Icon,
  label,
  disabled,
}) => {
  const showError = Boolean(error && touched);

  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className="block text-[11px] xs:text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5"
      >
        {label}{" "}
        {required ? (
          <span className="text-red-500">*</span>
        ) : (
          <span className="text-gray-400 text-[10px] xs:text-xs font-normal">
            (Optional)
          </span>
        )}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-2.5 xs:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-[18px] sm:h-[18px] text-gray-400 pointer-events-none" />
        )}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={
            type === "email"
              ? "email"
              : type === "tel"
                ? "tel"
                : name === "name"
                  ? "name"
                  : name === "company"
                    ? "organization"
                    : "off"
          }
          aria-invalid={showError}
          aria-describedby={showError ? `${id}-error` : undefined}
          className={`
            w-full py-2 xs:py-2.5 sm:py-3 bg-gray-50 border rounded-lg sm:rounded-xl 
            text-[13px] xs:text-sm sm:text-base text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${Icon ? "pl-8 xs:pl-9 sm:pl-10 pr-2.5 xs:pr-3 sm:pr-4" : "px-2.5 xs:px-3 sm:px-4"}
            ${
              showError
                ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                : "border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500"
            }
          `}
        />
      </div>
      <AnimatePresence mode="wait">
        {showError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            id={`${id}-error`}
            className="mt-0.5 xs:mt-1 text-[10px] xs:text-xs sm:text-sm text-red-600 flex items-center gap-0.5 xs:gap-1"
            role="alert"
          >
            <AlertCircle className="w-2.5 h-2.5 xs:w-3 xs:h-3 flex-shrink-0" />
            <span className="leading-tight">{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
// ============ SELECT COMPONENT ============
const FormSelect = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  options,
  required,
  error,
  touched,
  icon: Icon,
  label,
  disabled,
}) => {
  const showError = Boolean(error && touched);

  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className="block text-[11px] xs:text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-2.5 xs:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-[18px] sm:h-[18px] text-gray-400 pointer-events-none z-10" />
        )}
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={showError}
          aria-describedby={showError ? `${id}-error` : undefined}
          className={`
            w-full py-2 xs:py-2.5 sm:py-3 bg-gray-50 border rounded-lg sm:rounded-xl 
            text-[13px] xs:text-sm sm:text-base appearance-none cursor-pointer
            focus:outline-none focus:ring-2 transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${Icon ? "pl-8 xs:pl-9 sm:pl-10 pr-8 xs:pr-9 sm:pr-11" : "px-2.5 xs:px-3 sm:px-4 pr-8"}
            ${
              showError
                ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                : "border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500"
            }
            ${!value ? "text-gray-400" : "text-gray-900"}
          `}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="text-gray-900"
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 xs:right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-[18px] sm:h-[18px] text-gray-400 pointer-events-none" />
      </div>
      <AnimatePresence mode="wait">
        {showError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            id={`${id}-error`}
            className="mt-0.5 xs:mt-1 text-[10px] xs:text-xs sm:text-sm text-red-600 flex items-center gap-0.5 xs:gap-1"
            role="alert"
          >
            <AlertCircle className="w-2.5 h-2.5 xs:w-3 xs:h-3 flex-shrink-0" />
            <span className="leading-tight">{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
// ============ TEXTAREA COMPONENT ============
const FormTextarea = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  required,
  error,
  touched,
  label,
  rows = 4,
  maxLength = 2000,
  disabled,
}) => {
  const showError = Boolean(error && touched);
  const charCount = value?.length || 0;

  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className="block text-[11px] xs:text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5"
      >
        {label}{" "}
        {required ? (
          <span className="text-red-500">*</span>
        ) : (
          <span className="text-gray-400 text-[10px] xs:text-xs font-normal">
            (Optional)
          </span>
        )}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        aria-invalid={showError}
        aria-describedby={showError ? `${id}-error` : undefined}
        className={`
          w-full px-2.5 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 bg-gray-50 border 
          rounded-lg sm:rounded-xl text-[13px] xs:text-sm sm:text-base text-gray-900 
          placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
          resize-none disabled:opacity-50 disabled:cursor-not-allowed
          ${
            showError
              ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
              : "border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500"
          }
        `}
      />
      <div className="flex justify-between items-start mt-0.5 xs:mt-1 gap-1.5 xs:gap-2">
        <AnimatePresence mode="wait">
          {showError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              id={`${id}-error`}
              className="text-[10px] xs:text-xs sm:text-sm text-red-600 flex items-center gap-0.5 xs:gap-1 flex-1"
              role="alert"
            >
              <AlertCircle className="w-2.5 h-2.5 xs:w-3 xs:h-3 flex-shrink-0" />
              <span className="leading-tight">{error}</span>
            </motion.p>
          )}
        </AnimatePresence>
        <span
          className={`text-[9px] xs:text-[10px] sm:text-xs flex-shrink-0 ml-auto ${
            charCount > maxLength * 0.9
              ? charCount >= maxLength
                ? "text-red-500 font-medium"
                : "text-amber-500"
              : "text-gray-400"
          }`}
        >
          {charCount}/{maxLength.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
// ============ MAIN CONTACT FORM COMPONENT ============
const ContactForm = ({ onSubmitSuccess, className = "" }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const [captchaError, setCaptchaError] = useState("");
  const [captchaLoading, setCaptchaLoading] = useState(true);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setTouched({});
    setCaptchaError("");
    loadCaptcha();
  }, []);

  const loadCaptcha = async () => {
    setCaptchaLoading(true);
    try {
      const response = await fetchAssessmentChallenge();
      
      if (response?.success && response.n1 && response.n2 && response.sig && response.exp) {
        const { n1, n2, exp, sig } = response;
        setCaptcha({
          n1,
          n2,
          exp,
          sig,
          question: `${n1} + ${n2} = ?`,
          answer: (n1 + n2).toString()
        });
        setCaptchaError("");
      } else {
        throw new Error("Invalid captcha response from server");
      }
    } catch (error) {
      console.error("Failed to load captcha:", error);
      setCaptchaError("Failed to load security check. Please refresh the page.");
      setCaptcha(null);
    } finally {
      setCaptchaLoading(false);
    }
  };

  const refreshCaptcha = () => {
    setFormData(prev => ({ ...prev, captcha: "" }));
    setCaptchaError("");
    loadCaptcha();
  };

  // Load captcha on mount
  useEffectReact(() => {
    loadCaptcha();
  }, []);

  const {
    submitForm,
    isSubmitting,
    isSuccess,
    isError,
    errorMessage,
    reset: resetMutation,
  } = useContactForm({
    onSuccess: (data, variables) => {
      setShowSuccess(true);
      resetForm();
      if (onSubmitSuccess) onSubmitSuccess(data, variables);
    },
  });

  useEffect(() => {
    if (!showSuccess) return;
    const timer = setTimeout(() => {
      setShowSuccess(false);
      resetMutation();
    }, 6000);
    return () => clearTimeout(timer);
  }, [showSuccess, resetMutation]);

  useEffect(() => {
    if (!isError) return;
    setFormData(prev => ({ ...prev, captcha: "" }));
    loadCaptcha();
  }, [isError]);
  const sanitizeInput = useCallback((value) => {
    if (typeof value !== "string") return value;
    return value
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<[^>]*>/g, "");
  }, []);

  const validateField = useCallback((fieldName, value) => {
    try {
      const fieldSchema = contactFormSchema.shape[fieldName];
      if (!fieldSchema) return null;
      fieldSchema.parse(value);
      return null;
    } catch (err) {
      if (err instanceof z.ZodError && err.errors?.length > 0) {
        return err.errors[0].message;
      }
      return "Invalid input";
    }
  }, []);

  const validateAllFields = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    const allTouched = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    return { isValid, errors: newErrors };
  }, [formData, validateField]);

  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      const sanitizedValue = type === "checkbox" ? checked : sanitizeInput(value);
      setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
      if (isError) resetMutation();
      if (touched[name]) {
        const fieldError = validateField(name, sanitizedValue);
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
      }
    },
    [touched, isError, sanitizeInput, validateField, resetMutation],
  );

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const fieldError = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    },
    [validateField],
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isError) resetMutation();

    const { isValid, errors: validationErrors } = validateAllFields();

    if (!isValid) {
      const firstErrorField = Object.keys(validationErrors).find(
        (key) => validationErrors[key],
      );
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => element.focus(), 300);
        }
      }
      return;
    }

    // Validate custom captcha
    if (!captcha || formData.captcha !== captcha.answer) {
      setCaptchaError("Incorrect answer. Please try again.");
      refreshCaptcha();
      return;
    }

    setCaptchaError("");

    const submissionData = {
      ...formData,
      message: formData.message,
      captchaChallenge: {
        n1: captcha.n1,
        n2: captcha.n2,
        exp: captcha.exp,
        sig: captcha.sig
      }
    };
    
    submitForm(submissionData);
  };
  return (
    <div
      className={`
        bg-white 
        rounded-xl xs:rounded-2xl sm:rounded-2xl lg:rounded-3xl 
        shadow-md xs:shadow-lg sm:shadow-xl 
        border border-gray-100 
        p-3 xs:p-4 sm:p-6 lg:p-8 
        relative overflow-hidden 
        w-full max-w-2xl mx-auto
        ${className}
      `}
    >
      {/* Decorative Elements */}
      <div
        className="absolute top-0 right-0 w-16 h-16 xs:w-20 xs:h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 
          bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-bl-full 
          opacity-50 xs:opacity-60 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-12 h-12 xs:w-16 xs:h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28 
          bg-gradient-to-tr from-teal-100 to-emerald-100 rounded-tr-full 
          opacity-50 xs:opacity-60 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Form Header */}
        <div className="mb-3.5 xs:mb-4 sm:mb-6 lg:mb-8">
          <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3">
            <div
              className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 
                rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 
                flex items-center justify-center text-white flex-shrink-0 
                shadow-md sm:shadow-lg shadow-emerald-500/25"
            >
              <Send className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 leading-tight">
                Send a Message
              </h2>
              <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 leading-tight mt-0.5">
                Less than 24 hrs response time
              </p>
            </div>
          </div>
        </div>
        {/* Success Message */}
        <AnimatePresence mode="wait">
          {showSuccess && isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="mb-3 xs:mb-4 sm:mb-5 p-2.5 xs:p-3 sm:p-4 bg-emerald-50 border border-emerald-200 
                rounded-lg sm:rounded-xl flex items-start gap-2 xs:gap-2.5 sm:gap-3"
              role="alert"
            >
              <CheckCircle className="w-4 h-4 xs:w-5 xs:h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs xs:text-sm font-semibold text-emerald-800">
                  Message Sent!
                </p>
                <p className="text-[10px] xs:text-xs sm:text-sm text-emerald-700 mt-0.5 leading-tight">
                  Thank you for reaching out. We'll get back to you soon.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Server Error Message */}
        <AnimatePresence mode="wait">
          {isError && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="mb-3 xs:mb-4 sm:mb-5 p-2.5 xs:p-3 sm:p-4 bg-red-50 border border-red-200 
                rounded-lg sm:rounded-xl flex items-start gap-2 xs:gap-2.5 sm:gap-3"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 xs:w-5 xs:h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs xs:text-sm font-semibold text-red-800">
                  Something went wrong
                </p>
                <p className="text-[10px] xs:text-xs sm:text-sm text-red-700 mt-0.5 leading-tight">
                  {errorMessage}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-2.5 xs:space-y-3 sm:space-y-4"
          noValidate
        >
          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 xs:gap-3 sm:gap-4">
            <FormInput
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="John Doe"
              required
              error={errors.name}
              touched={touched.name}
              icon={User}
              label="Your Name"
              disabled={isSubmitting}
            />
            <FormInput
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="john@example.com"
              required
              error={errors.email}
              touched={touched.email}
              icon={AtSign}
              label="Email Address"
              disabled={isSubmitting}
            />
          </div>

          {/* Phone & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 xs:gap-3 sm:gap-4">
            <FormInput
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="+91 98765 43210"
              required
              error={errors.phone}
              touched={touched.phone}
              icon={Phone}
              label="Phone Number"
              disabled={isSubmitting}
            />
            <FormInput
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Acme Corp"
              required={false}
              error={errors.company}
              touched={touched.company}
              icon={Building2}
              label="Company"
              disabled={isSubmitting}
            />
          </div>
          {/* Subject */}
          <FormSelect
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            options={SUBJECT_OPTIONS}
            required
            error={errors.subject}
            touched={touched.subject}
            icon={FileText}
            label="Subject"
            disabled={isSubmitting}
          />

          {/* Message */}
          <FormTextarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tell us how we can help you..."
            required={false}
            error={errors.message}
            touched={touched.message}
            label="Your Message"
            rows={3}
            maxLength={2000}
            disabled={isSubmitting}
          />

          {/* Custom Math Captcha */}
          <div className="rounded-lg sm:rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-3 sm:px-4 sm:py-4">
            <label className="block text-[11px] xs:text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Security Check <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center bg-white border border-gray-200 rounded-lg px-3 py-2 xs:py-2.5 sm:py-3 text-sm font-mono h-[40px] xs:h-[44px] sm:h-[48px] min-w-[100px]">
                {captchaLoading || !captcha ? (
                  <span className="text-gray-400">Loading...</span>
                ) : (
                  <span className="text-gray-700">{captcha.question}</span>
                )}
              </div>
              <div className="flex-1">
                <input
                  id="captcha"
                  name="captcha"
                  type="text"
                  value={formData.captcha}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Answer"
                  disabled={isSubmitting || captchaLoading || !captcha}
                  className={`
                    w-full py-2 xs:py-2.5 sm:py-3 bg-gray-50 border rounded-lg sm:rounded-xl 
                    text-[13px] xs:text-sm sm:text-base text-gray-900 placeholder-gray-400
                    focus:outline-none focus:ring-2 transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed
                    px-2.5 xs:px-3 sm:px-4 h-[40px] xs:h-[44px] sm:h-[48px]
                    ${
                      (errors.captcha && touched.captcha) || captchaError
                        ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                        : "border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500"
                    }
                  `}
                />
              </div>
              <button
                type="button"
                onClick={refreshCaptcha}
                disabled={captchaLoading}
                className="p-2 xs:p-2.5 sm:p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors h-[40px] xs:h-[44px] sm:h-[48px] w-[40px] xs:w-[44px] sm:w-[48px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                title="Refresh captcha"
              >
                <RefreshCw className={`w-4 h-4 ${captchaLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            {((errors.captcha && touched.captcha) || captchaError) && (
              <p className="text-sm text-red-600 mt-2 flex items-center gap-1" role="alert">
                <AlertCircle className="w-4 h-4" />
                {captchaError || errors.captcha}
              </p>
            )}
          </div>
          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className={`
              w-full py-2.5 xs:py-3 sm:py-3.5 lg:py-4 
              rounded-lg sm:rounded-xl 
              font-semibold text-xs xs:text-sm sm:text-base 
              flex items-center justify-center gap-1.5 xs:gap-2 
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-1 sm:focus:ring-offset-2
              ${
                isSubmitting
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/30 active:shadow-md"
              }
            `}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-4 h-4 xs:w-5 xs:h-5 border-2 border-gray-400 border-t-transparent rounded-full"
                />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
              </>
            )}
          </motion.button>
        </form>
        {/* Privacy Note */}
        <p className="text-[9px] xs:text-[10px] sm:text-xs text-gray-500 text-center mt-2.5 xs:mt-3 sm:mt-4 leading-relaxed px-1">
          By submitting this form, you agree to our{" "}
          <Link
            to="/privacy-policy"
            className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium transition-colors"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            to="/term-conditions"
            className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium transition-colors"
          >
            Terms of Service
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ContactForm;