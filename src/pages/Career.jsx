import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Briefcase,
  MapPin,
  Clock,
  ChevronRight,
  Mail,
  Phone,
  X,
  CheckCircle,
  Users,
  Award,
  Heart,
  TrendingUp,
  ArrowRight,
  Zap,
  Loader2,
} from "lucide-react";
import CareerCard from "../components/career/CareerCard";
import { useJobs, useApplyJob } from "../hooks/useCareer";
import { toast } from "sonner";

// Indian cities for location filter
const allIndianCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
  "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Nagpur", "Indore",
  "Bhopal", "Visakhapatnam", "Patna", "Vadodara", "Guwahati",
  "Chandigarh", "Coimbatore", "Mysore", "Nashik", "Aurangabad"
];

// Color palette
const colors = {
  primary: "#0F172A",
  secondary: "#1E293B",
  accent: "#10B981", // Emerald-500 for Mozno
  highlight: "#F59E0B",
  light: "#F8FAFC",
  white: "#FFFFFF",
  muted: "#64748B",
  cardBg: "#FFFFFF",
  border: "#E2E8F0",
};

const Career = () => {
  // Use the jobs hook to fetch real data
  const { data: jobs = [], isLoading, isError, refetch } = useJobs();
    console.log("Inside Jobs",jobs)
  // Use the apply job hook
  const applyJobMutation = useApplyJob();

  // Form state
  const [applyForm, setApplyForm] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    jobId: "",
    resume: null,
    coverLetter: "",
  });

  // UI States
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const formRef = useRef(null);

  // Filter options
  const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Internship", "Remote"];

  // Filtered jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "All" || job.type === filterType;
    const matchesLocation = filterLocation === "All" || job.location === filterLocation;
    
    return matchesSearch && matchesType && matchesLocation;
  });

  // Handle form input
  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setApplyForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle apply
  const handleApply = (job) => {
    setSelectedJob(job);
    setApplyForm((prev) => ({
      ...prev,
      jobId: job._id || "",
      jobTitle: job.title || "",
      name: "",
      email: "",
      phone: "",
      resume: null,
      coverLetter: "",
    }));
    setShowForm(true);
    document.body.style.overflow = "hidden";
  };

  // Close modal
  const handleCloseModal = () => {
    setShowForm(false);
    setSelectedJob(null);
    document.body.style.overflow = "unset";
  };

  // Submit application
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      
      // Match backend expected fields exactly
      formData.append("jobId", selectedJob?._id || applyForm.jobId);
      formData.append("jobTitle", selectedJob?.jobTitle || applyForm.jobTitle);
      formData.append("name", applyForm.name);
      formData.append("email", applyForm.email);
      formData.append("phone", applyForm.phone);
      formData.append("coverLetter", applyForm.coverLetter || "");

      if (applyForm.resume) {
        formData.append("resume", applyForm.resume);
      } else {
        toast.error("Please upload your resume");
        setIsSubmitting(false);
        return;
      }

      await applyJobMutation.mutateAsync(formData);
      
      setIsSubmitting(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        handleCloseModal();
        setApplyForm({
          name: "",
          email: "",
          phone: "",
          jobTitle: "",
          jobId: "",
          resume: null,
          coverLetter: "",
        });
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      // Error is already handled by the mutation
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setFilterType("All");
    setFilterLocation("All");
  };

  // Check if filters are active
  const hasActiveFilters = searchTerm || filterType !== "All" || filterLocation !== "All";

  // Company stats
  const companyStats = [
    { icon: Users, value: "50+", label: "Team Members", color: colors.accent },
    { icon: Award, value: "100+", label: "Projects", color: colors.highlight },
    { icon: Heart, value: "98%", label: "Satisfaction", color: colors.accent },
    { icon: TrendingUp, value: "24/7", label: "Support", color: colors.highlight },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.light }}>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-28 md:pb-32 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: colors.primary }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 hidden sm:block">
          <div
            className="absolute top-20 left-10 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 rounded-full"
            style={{ backgroundColor: colors.accent }}
          />
          <div
            className="absolute bottom-20 right-10 w-24 sm:w-36 md:w-48 h-24 sm:h-36 md:h-48 rounded-full"
            style={{ backgroundColor: colors.highlight }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Accent Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 sm:mb-6 flex items-center justify-center"
            >
              <div
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
                style={{ backgroundColor: `${colors.accent}15` }}
              >
                <div
                  className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                />
                <span
                  className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider"
                  style={{ color: colors.muted }}
                >
                  CAREERS AT MOZNO TECHNOLOGIES
                </span>
                <div
                  className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full"
                  style={{ backgroundColor: colors.highlight }}
                />
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6"
              style={{ color: colors.white }}
            >
              Build Your{" "}
              <span
                className="block sm:inline"
                style={{
                  background: `linear-gradient(90deg, ${colors.accent}, ${colors.highlight})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                 fontFamily: "Playfair Display, serif" 
                }}
              >
                Future With Us
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-2"
              style={{ color: `${colors.white}90` }}
            >
              Join Mozno Technologies and help shape the future of financial technology.
              Find your perfect role and grow with industry experts.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide mb-6 sm:mb-8"
            >
              <div className="flex sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 md:gap-4 min-w-max sm:min-w-0">
                {companyStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border flex-shrink-0"
                    style={{
                      backgroundColor: colors.secondary,
                      borderColor: `${colors.border}50`,
                    }}
                  >
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}15` }}
                    >
                      <stat.icon
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        style={{ color: stat.color }}
                      />
                    </div>
                    <div className="text-left">
                      <div
                        className="text-sm sm:text-base font-bold"
                        style={{ color: colors.white }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="text-[10px] sm:text-xs"
                        style={{ color: colors.muted }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 sm:gap-3 shadow-lg"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.white,
                }}
                onClick={() =>
                  document
                    .getElementById("jobs-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>View Open Positions</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all hidden sm:block" />
              </motion.button>

              <motion.a
                href="mailto:careers@moznotechnologies.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 sm:gap-3 border"
                style={{
                  backgroundColor: colors.secondary,
                  color: colors.white,
                  borderColor: `${colors.border}50`,
                }}
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Contact HR</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section
        id="jobs-section"
        className="relative -mt-10 sm:-mt-14 md:-mt-16 px-4 sm:px-6 lg:px-8 z-10"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8"
            style={{
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.border}`,
              boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            }}
          >
            {/* Header */}
            <div className="mb-4 sm:mb-6">
              <h2
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2"
                style={{ color: colors.primary }}
              >
                Find Your Perfect Role
              </h2>
              <p
                className="text-sm sm:text-base md:text-lg"
                style={{ color: colors.muted }}
              >
                {isLoading ? "Loading positions..." : `${filteredJobs.length} positions available`}
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <Search
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5"
                  style={{ color: colors.accent }}
                />
                <input
                  type="text"
                  placeholder="Search jobs by title, department, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border focus:outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: colors.light,
                    borderColor: colors.border,
                    color: colors.primary,
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-4 h-4" style={{ color: colors.muted }} />
                  </button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
              {/* Type Filter */}
              <div className="relative">
                <Filter
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5"
                  style={{ color: colors.accent }}
                />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border appearance-none focus:outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: colors.light,
                    borderColor: filterType !== "All" ? colors.accent : colors.border,
                    color: colors.primary,
                  }}
                >
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === "All" ? "All Types" : type}
                    </option>
                  ))}
                </select>
                <ChevronRight
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rotate-90 pointer-events-none"
                  style={{ color: colors.muted }}
                />
              </div>

              {/* Location Filter */}
              <div className="relative">
                <MapPin
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5"
                  style={{ color: colors.accent }}
                />
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border appearance-none focus:outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: colors.light,
                    borderColor: filterLocation !== "All" ? colors.accent : colors.border,
                    color: colors.primary,
                  }}
                >
                  <option value="All">All Locations</option>
                  <option value="Remote">Remote</option>
                  {allIndianCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <ChevronRight
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rotate-90 pointer-events-none"
                  style={{ color: colors.muted }}
                />
              </div>
            </div>

            {/* Results Count and Clear */}
            <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 pt-2">
              <span className="text-xs sm:text-sm md:text-base" style={{ color: colors.muted }}>
                Showing{" "}
                <strong style={{ color: colors.primary }}>
                  {filteredJobs.length}
                </strong>{" "}
                of {jobs.length} positions
              </span>
              {hasActiveFilters && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: `${colors.accent}10`,
                    color: colors.accent,
                  }}
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  Clear Filters
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Jobs List Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16">
              <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin" style={{ color: colors.accent }} />
              <p className="mt-4 text-sm sm:text-base" style={{ color: colors.muted }}>
                Loading available positions...
              </p>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 sm:py-16 rounded-xl sm:rounded-2xl"
              style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${colors.accent}15` }}
              >
                <Briefcase className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: colors.accent }} />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2" style={{ color: colors.primary }}>
                Failed to load jobs
              </h3>
              <p className="text-sm sm:text-base md:text-lg mb-4" style={{ color: colors.muted }}>
                Please try again later
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => refetch()}
                className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.white,
                }}
              >
                Try Again
              </motion.button>
            </motion.div>
          )}

          {/* Jobs Grid */}
          {!isLoading && !isError && filteredJobs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-16">
              <AnimatePresence mode="popLayout">
                {filteredJobs.map((job, index) => (
                  <CareerCard
                    key={job._id || index}
                    job={job}
                    onClick={() => handleApply(job)}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* No Jobs Found */}
          {!isLoading && !isError && filteredJobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 sm:py-16 rounded-xl sm:rounded-2xl mb-12 sm:mb-16"
              style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${colors.accent}15` }}
              >
                <Briefcase className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: colors.accent }} />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2" style={{ color: colors.primary }}>
                No jobs found
              </h3>
              <p className="text-sm sm:text-base md:text-lg mb-4" style={{ color: colors.muted }}>
                Try adjusting your search criteria
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.white,
                }}
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Application Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[90vh] sm:max-h-[85vh] overflow-hidden flex flex-col"
              style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.border}`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div
                className="flex justify-between items-center p-4 sm:p-6 border-b flex-shrink-0"
                style={{ borderColor: colors.border }}
              >
                <div className="flex-1 min-w-0 pr-4">
                  <h2
                    className="text-base sm:text-lg md:text-xl font-bold truncate"
                    style={{ color: colors.primary }}
                  >
                    Apply for {selectedJob?.title}
                  </h2>
                  <p className="text-xs sm:text-sm truncate" style={{ color: colors.muted }}>
                    {selectedJob?.department} • {selectedJob?.location || "Remote"}
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                  style={{ color: colors.primary }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  {/* Form Fields */}
                  {[
                    { name: "name", label: "Full Name", type: "text", placeholder: "Enter your full name", icon: Users },
                    { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email", icon: Mail },
                    { name: "phone", label: "Phone Number", type: "tel", placeholder: "Enter your phone number", icon: Phone },
                  ].map((field) => (
                    <div key={field.name}>
                      <label
                        className="flex items-center gap-1.5 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                        style={{ color: colors.primary }}
                      >
                        <field.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: colors.accent }} />
                        {field.label} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={applyForm[field.name]}
                        onChange={handleFormChange}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all"
                        style={{
                          backgroundColor: colors.light,
                          borderColor: colors.border,
                          color: colors.primary,
                        }}
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}

                  {/* Resume */}
                  <div>
                    <label
                      className="flex items-center gap-1.5 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                      style={{ color: colors.primary }}
                    >
                      <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: colors.accent }} />
                      Resume/CV <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        name="resume"
                        onChange={handleFormChange}
                        required
                        accept=".pdf,.doc,.docx"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-medium file:cursor-pointer"
                        style={{
                          backgroundColor: colors.light,
                          borderColor: colors.border,
                          color: colors.primary,
                        }}
                      />
                    </div>
                    <p className="text-[10px] sm:text-xs mt-1" style={{ color: colors.muted }}>
                      PDF, DOC, DOCX up to 5MB
                    </p>
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label
                      className="flex items-center gap-1.5 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                      style={{ color: colors.primary }}
                    >
                      <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: colors.accent }} />
                      Cover Letter <span className="text-xs font-normal" style={{ color: colors.muted }}>(Optional)</span>
                    </label>
                    <textarea
                      name="coverLetter"
                      value={applyForm.coverLetter}
                      onChange={handleFormChange}
                      rows="3"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm resize-none focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: colors.light,
                        borderColor: colors.border,
                        color: colors.primary,
                      }}
                      placeholder="Tell us why you're a good fit for Mozno Technologies..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
                    className="w-full py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-2 disabled:cursor-not-allowed transition-all"
                    style={{
                      backgroundColor: isSubmitted ? colors.accent : colors.accent,
                      color: colors.white,
                      opacity: isSubmitting ? 0.8 : 1,
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Application Submitted!</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>

                <p className="text-[10px] sm:text-xs text-center mt-4" style={{ color: colors.muted }}>
                  By applying, you agree to Mozno Technologies' privacy policy
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            
            <div className="relative p-8 sm:p-12 md:p-16 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Don't See Your Perfect Role?
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Send us your resume and we'll keep you in mind for future opportunities at Mozno Technologies.
              </p>
              <motion.a
                href="mailto:careers@moznotechnologies.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:shadow-xl transition-all"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                Send Your Resume
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Custom CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        select {
          scrollbar-width: thin;
          scrollbar-color: ${colors.muted} ${colors.light};
        }
        
        select::-webkit-scrollbar {
          width: 6px;
        }
        
        select::-webkit-scrollbar-track {
          background: ${colors.light};
        }
        
        select::-webkit-scrollbar-thumb {
          background-color: ${colors.muted};
          border-radius: 3px;
        }
        
        select option {
          padding: 8px 12px;
        }
        
        select option:checked {
          background: ${colors.accent}20;
          color: ${colors.primary};
        }
        
        @media (min-width: 375px) {
          .xs\\:flex-row { flex-direction: row; }
          .xs\\:items-center { align-items: center; }
          .xs\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .xs\\:inline { display: inline; }
          .xs\\:hidden { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Career;