import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Home,
  ArrowLeft,
  Search,
  MessageCircle,
  Mail,
  HelpCircle,
  TrendingUp,
  PieChart,
  Calculator,
  Shield,
  Landmark,
  Users,
  Compass,
} from "lucide-react";

const NotFound = () => {
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

  // Quick Links
  const quickLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Services", path: "/services", icon: Compass },
    { name: "About Us", path: "/about", icon: Users },
    { name: "Contact", path: "/contact", icon: MessageCircle },
  ];

  // Popular Services
  const popularServices = [
    { name: "Wealth Management", path: "/services/wealth-management", icon: TrendingUp },
    { name: "Financial Planning", path: "/services/financial-planning", icon: PieChart },
    { name: "Tax Planning", path: "/services/tax-planning", icon: Calculator },
    { name: "Insurance Planning", path: "/services/insurance-planning", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/30 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated 404 */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mb-8"
          >
            {/* 404 Number */}
            <motion.div
              variants={fadeInUp}
              className="relative inline-block"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-full scale-150" />
              
              {/* 404 Text */}
              <div className="relative flex items-center justify-center gap-2 sm:gap-4">
                <motion.span
                  animate={{ 
                    rotateY: [0, 10, -10, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="text-7xl sm:text-8xl md:text-9xl font-bold bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  4
                </motion.span>
                
                {/* Animated Compass/Search Icon */}
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-2xl"
                >
                  <Compass className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                </motion.div>
                
                <motion.span
                  animate={{ 
                    rotateY: [0, -10, 10, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="text-7xl sm:text-8xl md:text-9xl font-bold bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  4
                </motion.span>
              </div>
            </motion.div>

            {/* Message */}
            <motion.div variants={fadeInUp} className="mt-6 sm:mt-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Oops! Page Not Found
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-lg mx-auto">
                Looks like you've ventured into uncharted financial territory. 
                Don't worry, let's get you back on track!
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8"
            >
              <Link
                to="/"
                className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all text-sm sm:text-base"
              >
                <Home className="w-5 h-5" />
                Go to Homepage
              </Link>
              <button
                onClick={() => window.history.back()}
                className="group flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all text-sm sm:text-base"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </button>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 sm:mt-16"
          >
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
              Quick Links
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-100 hover:border-emerald-300 hover:shadow-lg transition-all group"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                      <link.icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-600 transition-colors">
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Popular Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 sm:mt-12"
          >
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
              Popular Services
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {popularServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Link
                    to={service.path}
                    className="block p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl text-white hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
                  >
                    <service.icon className="w-6 h-6 mb-2 mx-auto" />
                    <span className="text-xs sm:text-sm font-medium">{service.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-12 sm:mt-16 p-6 bg-white rounded-2xl border border-gray-100 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-sm text-gray-600">Need help?</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
                <a
                  href="https://wa.me/919820507696"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp us
                </a>
                <a
                  href="mailto:ceo@mozno.in"
                  className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  ceo@mozno.in
                </a>
              </div>
            </div>
          </motion.div>

          {/* Fun Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-8 text-xs sm:text-sm text-gray-400 italic"
          >
            "Even the best investors take wrong turns sometimes. What matters is finding the way back!" 💡
          </motion.p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-60 h-60 sm:w-96 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-20 -right-20 w-60 h-60 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl"
        />
      </div>
    </div>
  );
};

export default NotFound;