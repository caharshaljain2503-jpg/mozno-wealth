import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  ChevronRight,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";

const colors = {
  primary: "#0F172A",
  secondary: "#1E293B",
  accent: "#10B981",
  highlight: "#F59E0B",
  light: "#F8FAFC",
  white: "#FFFFFF",
  muted: "#64748B",
  cardBg: "#FFFFFF",
  border: "#E2E8F0",
};

// Helper: relative time from date string
const getTimeAgo = (dateStr) => {
  if (!dateStr) return "Recently";
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 5) return `${diffWeeks}w ago`;
  return `${diffMonths}mo ago`;
};

// Helper: accent color based on department
const getDeptAccent = (department) => {
  switch (department?.toLowerCase()) {
    case "engineering":
    case "development":
      return "#10B981";
    case "design":
    case "ui/ux":
      return "#8B5CF6";
    case "sales":
    case "marketing":
      return "#F59E0B";
    case "hr":
    case "people":
      return "#EC4899";
    case "finance":
      return "#3B82F6";
    default:
      return "#10B981";
  }
};

// Helper: status color
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
    case "open":
      return "#10B981";
    case "closed":
    case "inactive":
      return "#EF4444";
    case "paused":
    case "on-hold":
      return "#F59E0B";
    default:
      return "#10B981";
  }
};

const CareerCard = ({ job, onClick, index = 0 }) => {
  const {
    id,
    jobTitle = "Position",
    jobType = "Full-time",
    location = "Remote",
    department = "General",
    experience = "Fresher",
    jobDescription = "",
    jobStatus = "active",
    requirements = [],
    createdAt,
    updatedAt,
  } = job;

  const accentColor = getDeptAccent(department);
  const statusColor = getStatusColor(jobStatus);
  const postedAgo = getTimeAgo(createdAt);
  const updatedAgo = getTimeAgo(updatedAt);

  // Clean HTML from description
  const cleanDesc = jobDescription
    ? jobDescription.replace(/<[^>]*>/g, "").trim()
    : "";

  // Parse requirements - handle string, array, or comma-separated
  const parsedRequirements = Array.isArray(requirements)
    ? requirements
    : typeof requirements === "string"
    ? requirements
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean)
    : [];

  return (
    <motion.div
      key={id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="rounded-xl sm:rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl"
      style={{
        backgroundColor: colors.cardBg,
        borderColor: colors.border,
      }}
    >
      <div className="p-4 sm:p-5 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            <h3
              className="text-base sm:text-lg md:text-xl font-bold mb-1 truncate"
              style={{ color: colors.primary }}
            >
              {jobTitle}
            </h3>
            <p
              className="text-xs sm:text-sm font-medium"
              style={{ color: accentColor }}
            >
              Mozno Technologies • {department}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
            {/* Job Type Badge */}
            <span
              className="px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap"
              style={{
                backgroundColor: `${accentColor}15`,
                color: accentColor,
              }}
            >
              {jobType}
            </span>

            {/* Job Status Badge */}
            <span
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium whitespace-nowrap"
              style={{
                backgroundColor: `${statusColor}12`,
                color: statusColor,
              }}
            >
              {jobStatus?.toLowerCase() === "active" ||
              jobStatus?.toLowerCase() === "open" ? (
                <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              ) : (
                <XCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              )}
              {jobStatus}
            </span>
          </div>
        </div>

        {/* Description */}
        {cleanDesc && (
          <p
            className="text-xs sm:text-sm md:text-base mb-3 sm:mb-4 line-clamp-2"
            style={{ color: colors.muted }}
          >
            {cleanDesc.slice(0, 120)}
            {cleanDesc.length > 120 ? "…" : ""}
          </p>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
          {[
            { icon: MapPin, value: location },
            {
              icon: Briefcase,
              value:
                typeof experience === "number"
                  ? `${experience} yr${experience !== 1 ? "s" : ""} exp`
                  : experience,
            },
            { icon: Clock, value: postedAgo },
            ...(updatedAt && updatedAt !== createdAt
              ? [{ icon: Calendar, value: `Updated ${updatedAgo}` }]
              : []),
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5 sm:gap-2">
              <item.icon
                className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                style={{ color: accentColor }}
              />
              <span
                className="text-[10px] sm:text-xs md:text-sm truncate"
                style={{ color: colors.primary }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Requirements / Skills Tags */}
        {parsedRequirements.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
            {parsedRequirements.slice(0, 4).map((req, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] md:text-xs font-medium rounded-full border"
                style={{
                  backgroundColor: colors.light,
                  color: colors.muted,
                  borderColor: colors.border,
                }}
              >
                {req}
              </span>
            ))}
            {parsedRequirements.length > 4 && (
              <span
                className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] md:text-xs font-medium rounded-full"
                style={{
                  backgroundColor: `${accentColor}10`,
                  color: accentColor,
                }}
              >
                +{parsedRequirements.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Apply Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClick}
          className="w-full py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm flex items-center justify-center gap-2"
          style={{
            backgroundColor: accentColor,
            color: colors.white,
            boxShadow: `0 4px 12px ${accentColor}30`,
          }}
        >
          Apply Now <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CareerCard;