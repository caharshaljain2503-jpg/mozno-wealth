import apiClient from "../api/axios.instance";

export const submitContactForm = async (formData) => {
  const payload = {
    fullName: formData.name.trim(),
    email: formData.email.trim().toLowerCase(),
    phone: formData.phone?.trim() || "",
    company: formData.company?.trim() || null,
    service: formData.subject,
    message: formData.message.trim(),
    assessmentCaptcha: {
      n1: formData.captchaChallenge.n1,
      n2: formData.captchaChallenge.n2,
      answer: formData.captcha.trim(),
      exp: formData.captchaChallenge.exp,
      sig: formData.captchaChallenge.sig,
    },
  };

  const response = await apiClient.post("/contact", payload);
  return response;
};

/** Math captcha challenge for Financial Health / Risk Profiling pre-form */
export const fetchAssessmentChallenge = async () => {
  return apiClient.get("/contact/assessment-challenge");
};

/**
 * Same lead pipeline as Contact Us (shows in Admin → Leads); uses simple math captcha.
 */
export const submitAssessmentLead = async ({
  name,
  email,
  phone,
  message,
  service,
  captcha,
}) => {
  const payload = {
    fullName: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    message: message.trim(),
    service,
    assessmentCaptcha: {
      n1: captcha.n1,
      n2: captcha.n2,
      answer: captcha.answer,
      exp: captcha.exp,
      sig: captcha.sig,
    },
  };
  return apiClient.post("/contact", payload);
};