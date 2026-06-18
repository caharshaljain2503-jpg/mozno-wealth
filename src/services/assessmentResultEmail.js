const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

function buildAnswerText(answers = {}) {
  return Object.entries(answers)
    .map(([key, value]) => {
      if (!value || typeof value !== "object") {
        return `Q${key}: ${String(value ?? "")}`;
      }

      return [
        `Q${key}`,
        value.section ? `Section: ${value.section}` : null,
        value.question ? `Question: ${value.question}` : null,
        value.answer ? `Answer: ${value.answer}` : null,
        value.score !== undefined ? `Score: ${value.score}` : null,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");
}

function buildMessage({
  assessmentKind,
  fullName,
  email,
  phone,
  profileLabel,
  totalScore,
  answers,
}) {
  const kindTitle =
    assessmentKind === "financial-health"
      ? "Financial Health"
      : "Risk Profiling";

  return [
    `${kindTitle} Assessment Result`,
    `Result: ${profileLabel}`,
    `Total score: ${totalScore}`,
    fullName ? `Name: ${fullName}` : null,
    email ? `Email: ${email}` : null,
    phone ? `Phone: ${phone}` : null,
    "",
    "Answers:",
    buildAnswerText(answers) || "No answers provided",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export async function submitAssessmentResultEmail(payload) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    throw new Error("VITE_WEB3FORMS_ACCESS_KEY is not configured in mozno-wealth/.env");
  }

  const subject =
    payload.assessmentKind === "financial-health"
      ? "Financial Health assessment result"
      : "Risk Profiling assessment result";

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject,
      from_name: "Mozno Wealth Website",
      name: payload.fullName || "Website visitor",
      email: payload.email || "",
      phone: payload.phone || "",
      assessment_kind: payload.assessmentKind,
      profile_label: payload.profileLabel,
      total_score: String(payload.totalScore),
      message: buildMessage(payload),
      botcheck: false,
    }),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.success === false) {
    throw new Error(result.message || `Web3Forms request failed with status ${response.status}`);
  }

  return result;
}
