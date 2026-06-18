import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
void motion;
import {
  Mail,
  MessageCircle,
  MapPin,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Building2,
  Globe,
  HeadphonesIcon,
} from "lucide-react";
import ContactForm from "../components/common/ContactForm";
import apiClient from "../api/axios.instance";

const CONTACT_STAT_ICONS = [HeadphonesIcon, Mail, CheckCircle, Globe];
const CONTACT_STAT_COLORS = [
  "from-emerald-500 to-teal-500",
  "from-cyan-500 to-blue-500",
  "from-teal-500 to-emerald-500",
  "from-blue-500 to-cyan-500",
];
const DEFAULT_ADDRESS =
  "106, Shyamkamal 'C' Building, Agarwal Market, Vile Parle East, Mumbai - 400 057";
const DEFAULT_MAP_LINK = "https://maps.app.goo.gl/STjHCGiRPECf3hJR6?g_st=ac";
const LEGACY_DEFAULT_MAP_LINK = "https://maps.app.goo.gl/VQSp7vAJ3kTvGcW47";

const getMapEmbedSrc = (contactInfo) => {
  if (contactInfo?.mapEmbedUrl) return contactInfo.mapEmbedUrl;
  const address = contactInfo?.address || DEFAULT_ADDRESS;
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=17&hl=en&output=embed`;
};

const Contact = () => {
  const { data: settingsData } = useQuery({
    queryKey: ["public-settings-contact"],
    queryFn: async () => apiClient.get("/settings/public"),
    staleTime: 30000,
  });
  const siteContent = settingsData?.siteContent || null;
  const contactInfo = settingsData?.siteSettings?.contactInfo || {};
  const mapLink =
    !contactInfo.mapLink || contactInfo.mapLink === LEGACY_DEFAULT_MAP_LINK
      ? DEFAULT_MAP_LINK
      : contactInfo.mapLink;
  const mapEmbedSrc = getMapEmbedSrc(contactInfo);
  const contactStats = (siteContent?.contactStats?.items || []).map((item, index) => ({
    value: item?.value || "",
    label: item?.label || "",
    icon: CONTACT_STAT_ICONS[index % CONTACT_STAT_ICONS.length],
    color: CONTACT_STAT_COLORS[index % CONTACT_STAT_COLORS.length],
  }));
  const showContactStats = !!siteContent?.contactStats?.enabled;

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/30">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden pb-10 sm:pb-14 md:pb-20 lg:pb-24 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80')] opacity-10 bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-black/20" />

          {/* Animated Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 -left-20 w-40 h-40 xs:w-60 xs:h-60 sm:w-80 sm:h-80 bg-emerald-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 -right-20 w-40 h-40 xs:w-60 xs:h-60 sm:w-96 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4 xs:mb-6"
            >
              <MessageSquare className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-emerald-300" />
              <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-white/90">
                We're Here to Help
              </span>
            </motion.div>

            {/* Title — flex stack so lines sit tight (no extra line-box gap) */}
            <motion.h1
              variants={fadeInUp}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-0 flex flex-col items-center gap-0 leading-none [&>span]:block"
            >
              <span>Contact Us For</span>
              <span
                className="italic bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent font-normal"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Personalized
              </span>
              <span>Wealth Management</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-sm xs:text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto mt-1 mb-6 xs:mb-8 px-2 leading-snug"
            >
              Ready to take control of your financial future? 
            </motion.p>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            className="w-full h-8 xs:h-12 sm:h-16 md:h-20"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ================= QUICK STATS ================= */}
      {showContactStats && contactStats.length > 0 && (
      <section className="py-6 xs:py-8 sm:py-10 -mt-4 xs:-mt-6 sm:-mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 sm:gap-6"
          >
            {contactStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-6 shadow-lg border border-gray-100 text-center"
              >
                <div
                  className={`w-10 h-10 xs:w-12 xs:h-12 mx-auto mb-2 xs:mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}
                >
                  <stat.icon className="w-5 h-5 xs:w-6 xs:h-6" />
                </div>
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">
                  {stat.value}
                </h3>
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      )}

      {/* ================= MAP SECTION ================= */}
      <section className="py-6 xs:py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl xs:rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Map Container */}
            <div className="relative h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
              <iframe
                title="Mozno Wealth Office Location"
                src={mapEmbedSrc}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              {/* Floating Card on Map */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-4 left-4 right-4 xs:right-auto xs:max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-6 shadow-2xl border border-gray-100"
              >
                <div className="flex items-start gap-3 xs:gap-4">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white flex-shrink-0">
                    <Building2 className="w-5 h-5 xs:w-6 xs:h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm xs:text-base sm:text-lg">
                      Mozno Wealth
                    </h3>
                    <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 mt-1">
                      {contactInfo.address || DEFAULT_ADDRESS}
                    </p>
                    <a
                      href={mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-emerald-600 font-medium text-xs xs:text-sm mt-2 hover:gap-2.5 transition-all"
                    >
                      Locate on map
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= MAIN CONTACT SECTION ================= */}
      <section className="py-8 xs:py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 lg:gap-16">
            {/* ================= LEFT: CONTACT FORM ================= */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <ContactForm
                onSubmitSuccess={(data) => {
                  console.log("Form submitted:", data);
                  // Redirect, show toast, etc.
                }}
              />
            </motion.div>

            {/* ================= RIGHT: CONTACT INFO ================= */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              {/* Header */}
              <div className="mb-6 xs:mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-3 xs:px-4 py-1.5 xs:py-2 bg-emerald-50 rounded-full mb-3 xs:mb-4"
                >
                  <Sparkles className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-emerald-600" />
                  <span className="text-xs xs:text-sm font-medium text-emerald-700">
                    Get in Touch
                  </span>
                </motion.div>

                <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-3 xs:mb-4">
                  Let's Start Your{" "}
                  <span
                    className="italic text-emerald-600"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    Financial Journey
                  </span>
                </h2>

                <p className="text-sm xs:text-base text-gray-600 leading-relaxed">
                  Whether you're planning for retirement, optimizing taxes, or
                  seeking investment advice, our team is ready to guide you
                  towards financial success.
                </p>
              </div>

              {/* Contact Cards */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4 mb-6 xs:mb-8"
              >
                {[
                  {
                    icon: MapPin,
                    title: "Visit Our Office",
                    text: contactInfo.address || DEFAULT_ADDRESS,
                    subtext: "Google Maps",
                    color: "from-emerald-500 to-teal-500",
                    link: mapLink,
                  },
                  {
                    icon: Mail,
                    title: "Email Us",
                    text: contactInfo.email || "contact@mozno.in",
                    subtext: "Less than 24 hrs response time",
                    color: "from-cyan-500 to-blue-500",
                    link: `mailto:${contactInfo.email || "contact@mozno.in"}`,
                  },
                  {
                    icon: MessageCircle,
                    title: "Chat on WhatsApp",
                    text: "Message us directly",
                    color: "from-teal-500 to-emerald-500",
                    link: contactInfo.whatsapp || "https://wa.me/919820507696",
                  },
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link || "#"}
                    target={
                      item.link?.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      item.link?.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    variants={scaleIn}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group bg-white rounded-xl xs:rounded-2xl p-4 xs:p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 xs:w-12 xs:h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-3 xs:mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <item.icon className="w-5 h-5 xs:w-6 xs:h-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm xs:text-base mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs xs:text-sm text-gray-600">
                      {item.text}
                    </p>
                    {item.subtext && (
                      <p className="text-[10px] xs:text-xs text-gray-500 mt-0.5">
                        {item.subtext}
                      </p>
                    )}
                  </motion.a>
                ))}
              </motion.div>

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl xs:rounded-2xl p-4 xs:p-6 text-white"
              >
                <h3 className="font-semibold text-sm xs:text-base mb-3 xs:mb-4">
                  Connect With Us
                </h3>
                <div className="flex flex-wrap gap-2 xs:gap-3">
                  {[
                    {
                      icon: Linkedin,
                      href: settingsData?.siteSettings?.socialLinks?.linkedin || "https://www.linkedin.com/in/harshalvjain/",
                      label: "LinkedIn",
                      color: "hover:bg-blue-600",
                    },
                    {
                      icon: Instagram,
                      href: settingsData?.siteSettings?.socialLinks?.instagram || "https://www.instagram.com/the_awareness_initiative",
                      label: "Instagram",
                      color: "hover:bg-pink-600",
                    },
                    {
                      icon: Youtube,
                      href: settingsData?.siteSettings?.socialLinks?.youtube || "https://www.youtube.com/@awareness_initiative",
                      label: "YouTube",
                      color: "hover:bg-red-600",
                    },
                    {
                      icon: Facebook,
                      href: settingsData?.siteSettings?.socialLinks?.facebook || "#",
                      label: "Facebook",
                      color: "hover:bg-blue-700",
                    },
                    {
                      icon: Twitter,
                      href: settingsData?.siteSettings?.socialLinks?.twitter || "#",
                      label: "Twitter",
                      color: "hover:bg-sky-500",
                    },
                  ].filter(social => social.href && social.href !== "#").map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 xs:w-11 xs:h-11 flex items-center justify-center bg-white/10 rounded-lg xs:rounded-xl ${social.color} transition-all`}
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4 xs:w-5 xs:h-5" />
                    </motion.a>
                  ))}
                </div>
                <p className="text-xs xs:text-sm text-gray-400 mt-3 xs:mt-4">
                  Follow us for financial tips, market insights, and updates.
                </p>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
