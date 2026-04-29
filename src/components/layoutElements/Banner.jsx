import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Mail, Sparkles, ArrowRight } from "lucide-react";

const Banner = () => {
  return (
    <div>
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        }}
      >
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between py-2 sm:py-2.5">
            {/* Contact Info */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <a
                href="https://wa.me/919820507696"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 sm:gap-1.5 text-gray-300 hover:text-emerald-400 transition-colors duration-200 group shrink-0"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                  <MessageCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-emerald-400" />
                </div>
                <span className="text-[10px] sm:text-xs font-medium">
                  WhatsApp
                </span>
              </a>

              <div className="hidden sm:block w-px h-4 bg-gray-600" />

              <a
                href="mailto:ceo@mozno.in"
                className="hidden sm:flex items-center gap-1.5 text-gray-300 hover:text-blue-400 transition-colors duration-200 group"
              >
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <Mail className="h-3 w-3 text-blue-400" />
                </div>
                <span className="text-xs font-medium">ceo@mozno.in</span>
              </a>
            </div>

            {/* CTA Button */}
            <Link
              to="/contact"
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-white shrink-0 hover:scale-105 active:scale-95 transition-transform duration-200"
              style={{
                background:
                  "linear-gradient(135deg, #059669 0%, #0d9488 50%, #0284c7 100%)",
                boxShadow: "0 2px 10px rgba(5, 150, 105, 0.3)",
              }}
            >
              <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              <span className="hidden sm:inline">Free</span> Consultation
              <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
