import React from 'react';
import { Mail, MapPin, Linkedin, Instagram, Youtube, ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
// import Aibot from './bot';
import footerLogo from "../../assets/Mozno Wealth Logo with Name New.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
          
          {/* Brand Column */}
          <div className="xs:col-span-2 lg:col-span-1 space-y-4 sm:space-y-6">
            <div className="flex items-start">
              <img
                src={footerLogo}
                alt="Mozno Wealth"
                className="h-[10.01rem] sm:h-[12.87rem] md:h-[14.3rem] lg:h-[15.73rem] xl:h-[17.16rem] max-w-full w-auto object-contain object-left"
              />
            </div>
            
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Comprehensive wealth management and financial advisory services. Your trusted partner for financial success.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4 md:mb-6 pb-2 border-b border-gray-700">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Our Services', path: '/services' },
                { name: 'Financial Health', path: '/tools/financial-health' },
                { name: 'Calculators', path: '/calculators' },
                { name: 'Blogs', path: '/blogs' },
                // { name: 'IPO Updates', path: '/insights/ipo' },
                { name: 'Market Data', path: '/insights/market-data' },
                { name: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-1.5 sm:gap-2 group text-xs sm:text-sm md:text-base"
                  >
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4 md:mb-6 pb-2 border-b border-gray-700">
              Our Services
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: 'Wealth Management', path: '/services/wealth-management' },
                { name: 'Financial Planning', path: '/services/financial-planning' },
                { name: 'Tax Planning', path: '/services/tax-planning' },
                { name: 'Insurance Planning', path: '/services/insurance-planning' },
                { name: 'Borrowing Solutions', path: '/services/borrowing-solutions' },
                { name: 'Succession Planning', path: '/services/succession-planning' },
              ].map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.path}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-1.5 sm:gap-2 group text-xs sm:text-sm md:text-base"
                  >
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="xs:col-span-2 lg:col-span-1">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4 md:mb-6 pb-2 border-b border-gray-700">
              Contact Us
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <a 
                href="mailto:contact@mozno.in" 
                className="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-blue-400 transition-colors duration-300 group"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-blue-900/30 transition-colors flex-shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-xs sm:text-sm md:text-base">contact@mozno.in</p>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-gray-400">Less than 24 hrs response time</p>
                </div>
              </a>
              
              <a 
                href="https://wa.me/919820507696" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-green-400 transition-colors duration-300 group"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-green-900/30 transition-colors flex-shrink-0">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-xs sm:text-sm md:text-base">WhatsApp Us</p>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-gray-400">Quick Response</p>
                </div>
              </a>
              
              <a 
                href="https://share.google/VNKicOtItWUL4lP5P" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-amber-400 transition-colors duration-300 group"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-amber-900/30 transition-colors flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-xs sm:text-sm md:text-base">Mumbai Office</p>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-gray-400 leading-relaxed whitespace-pre-line">
                    {`C, 106, Shyam Kamal Rd, next to Rajwadi Chai,
above IIFL Office, Agarwal Market,
Vile Parle East, Vile Parle, Mumbai,
Maharashtra 400057`}
                  </p>
                </div>
              </a>
            </div>

            {/* Social Media */}
            <div className="mt-4 sm:mt-6 md:mt-8">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 md:mb-4">
                Connect With Us
              </h4>
              <div className="flex gap-2 sm:gap-3 flex-wrap">
                {[
                  { 
                    icon: <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />, 
                    href: "https://www.linkedin.com/in/harshalvjain/", 
                    label: "LinkedIn",
                    hoverBg: "hover:bg-blue-900"
                  },
                  { 
                    icon: <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />, 
                    href: "https://www.instagram.com/the_awareness_initiative", 
                    label: "Instagram",
                    hoverBg: "hover:bg-pink-900"
                  },
                  { 
                    icon: <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />, 
                    href: "https://www.youtube.com/@theawarenessinitiative", 
                    label: "YouTube",
                    hoverBg: "hover:bg-red-900"
                  },
                  { 
                    icon: <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />, 
                    href: "https://wa.me/919820507696", 
                    label: "WhatsApp",
                    hoverBg: "hover:bg-green-900"
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-gray-800 flex items-center justify-center ${social.hoverBg} hover:text-white transition-all duration-300 hover:scale-110`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-5 md:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-[10px] xs:text-xs sm:text-sm">
                © {currentYear} Mozno Wealth. All rights reserved.
              </p>
              <p className="text-gray-500 text-[10px] xs:text-xs mt-0.5 sm:mt-1">
                Mozno Advisory | Proprietorship Firm
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4 md:gap-6 text-[10px] xs:text-xs sm:text-sm">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/term-conditions" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/disclaimer" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <Aibot/> */}
    </footer>
  );
};

export default Footer;
