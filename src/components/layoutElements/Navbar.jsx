import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Mail, ArrowRight, LogIn, ExternalLink } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Mozno Logo Horizontal.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [navbarVisible, setNavbarVisible] = useState(true);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const dropdownTimeout = useRef(null);
  const location = useLocation();

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY.current;

      setIsScrolled(currentScrollY > 20);

      if (Math.abs(difference) > 15) {
        if (difference > 0 && currentScrollY > 120) {
          setNavbarVisible(false);
          if (isMenuOpen) {
            setIsMenuOpen(false);
            setActiveDropdown(null);
          }
        } else if (difference < 0) {
          setNavbarVisible(true);
        }
        lastScrollY.current = currentScrollY;
      }
    };

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    const closeOnRouteChange = setTimeout(() => {
      setIsMenuOpen(false);
      setActiveDropdown(null);
    }, 0);
    return () => clearTimeout(closeOnRouteChange);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Cleanup dropdown timeout
  useEffect(() => {
    return () => {
      if (dropdownTimeout.current) {
        clearTimeout(dropdownTimeout.current);
      }
    };
  }, []);

  // Navigation Data
  const servicesItems = [
    { name: "Wealth Management", path: "/services/wealth-management" },
    { name: "Financial Planning", path: "/services/financial-planning" },
    { name: "Tax Planning", path: "/services/tax-planning" },
    { name: "Insurance Planning", path: "/services/insurance-planning" },
    { name: "Borrowing Solutions", path: "/services/borrowing-solutions" },
    { name: "Succession Planning", path: "/services/succession-planning" },
  ];

  const toolsItems = [
    { name: "Financial Health", path: "/tools/financial-health" },
    { name: "Risk Profiling", path: "/tools/risk-profile" },
    { name: "Financial Calculators", path: "/calculators" },
  ];

  const insightsItems = [
    { name: "Blogs", path: "/blogs" },
    // { name: "IPO Section", path: "/insights/ipo" },
    { name: "Market Data", path: "/insights/market-data" },
  ];

  const isActive = (path) => location.pathname === path;
  const isServicesActive = () => location.pathname.startsWith("/services");
  const isToolsActive = () =>
    location.pathname.startsWith("/tools") ||
    location.pathname.startsWith("/calculators");
  const isInsightsActive = () =>
    location.pathname.startsWith("/insights") ||
    location.pathname === "/blogs";

  const handleDropdownEnter = (dropdown) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
      dropdownTimeout.current = null;
    }
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      {/* ====== NAVBAR WRAPPER ====== */}
      <div
        className={`
          fixed left-0 right-0 z-50 
          px-3 sm:px-4 lg:px-6
          transition-all duration-500 ease-out
          ${navbarVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
        `}
        style={{ top: "8px" }}
      >
        {/* ====== NAVBAR ====== */}
        <header
          className={`
            max-w-7xl mx-auto
            bg-white/95 backdrop-blur-xl
            rounded-2xl sm:rounded-full
            transition-all duration-300
            border border-gray-100
            ${isScrolled ? "shadow-lg" : "shadow-md"}
          `}
        >
          <div className="px-4 sm:px-5 lg:px-6">
            <div className="flex items-center justify-between h-14 sm:h-16">
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center shrink-0 h-8 sm:h-9 lg:h-10"
              >
                <img
                  src={logo}
                  alt="Mozno Wealth"
                  className="h-full w-auto object-contain"
                />
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-1">
                <NavLink href="/" active={isActive("/")}>
                  Home
                </NavLink>
                <NavLink href="/about" active={isActive("/about")}>
                  About
                </NavLink>

                {/* Services Dropdown */}
                <DesktopDropdown
                  title="Services"
                  isOpen={activeDropdown === "services"}
                  onEnter={() => handleDropdownEnter("services")}
                  onLeave={handleDropdownLeave}
                  isActive={isServicesActive()}
                  allLink="/services"
                  items={servicesItems}
                  onItemClick={() => setActiveDropdown(null)}
                  currentPath={location.pathname}
                />

                {/* Tools Dropdown */}
                <DesktopDropdown
                  title="Tools"
                  isOpen={activeDropdown === "tools"}
                  onEnter={() => handleDropdownEnter("tools")}
                  onLeave={handleDropdownLeave}
                  isActive={isToolsActive()}
                  items={toolsItems}
                  onItemClick={() => setActiveDropdown(null)}
                  currentPath={location.pathname}
                  showAllLink={false}
                />

                {/* Financial Insights Dropdown */}
                <DesktopDropdown
                  title="Insight"
                  isOpen={activeDropdown === "insights"}
                  onEnter={() => handleDropdownEnter("insights")}
                  onLeave={handleDropdownLeave}
                  isActive={isInsightsActive()}
                  items={insightsItems}
                  onItemClick={() => setActiveDropdown(null)}
                  currentPath={location.pathname}
                  showAllLink={false}
                />

                <NavLink href="/contact" active={isActive("/contact")}>
                  Contact Us
                </NavLink>

                <div className="w-px h-5 bg-gray-200 mx-2" />

                {/* Login */}
                <a
                  href="https://mozno.investwell.app/app/#/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </a>
              </nav>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-4">
                  <span
                    className={`absolute left-0 w-full h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${
                      isMenuOpen
                        ? "top-1/2 -translate-y-1/2 rotate-45"
                        : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 w-full h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${
                      isMenuOpen
                        ? "top-1/2 -translate-y-1/2 -rotate-45"
                        : "bottom-0"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* ====== MOBILE MENU ====== */}
        <div
          className={`
            lg:hidden mt-2 max-w-7xl mx-auto
            bg-white rounded-2xl border border-gray-100
            overflow-hidden transition-all duration-300
            ${
              isMenuOpen
                ? "opacity-100 translate-y-0 shadow-xl"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }
          `}
          style={{ maxHeight: isMenuOpen ? "80vh" : "0" }}
        >
          <div className="p-4 overflow-y-auto max-h-[75vh]">
            {/* Navigation Links */}
            <div className="space-y-1">
              <MobileNavLink
                href="/"
                active={isActive("/")}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </MobileNavLink>

              <MobileNavLink
                href="/about"
                active={isActive("/about")}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </MobileNavLink>

              {/* Services */}
              <MobileAccordion
                title="Services"
                isOpen={activeDropdown === "services"}
                setIsOpen={() => toggleMobileDropdown("services")}
                isActive={isServicesActive()}
                allLink="/services"
                items={servicesItems}
                onItemClick={() => setIsMenuOpen(false)}
                currentPath={location.pathname}
              />

              {/* Tools */}
              <MobileAccordion
                title="Tools"
                isOpen={activeDropdown === "tools"}
                setIsOpen={() => toggleMobileDropdown("tools")}
                isActive={isToolsActive()}
                items={toolsItems}
                onItemClick={() => setIsMenuOpen(false)}
                currentPath={location.pathname}
                showAllLink={false}
              />

              {/* Financial Insights */}
              <MobileAccordion
                title="Insight"
                isOpen={activeDropdown === "insights"}
                setIsOpen={() => toggleMobileDropdown("insights")}
                isActive={isInsightsActive()}
                items={insightsItems}
                onItemClick={() => setIsMenuOpen(false)}
                currentPath={location.pathname}
                showAllLink={false}
              />

              <MobileNavLink
                href="/contact"
                active={isActive("/contact")}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </MobileNavLink>
            </div>

            {/* Divider */}
            <div className="my-4 h-px bg-gray-100" />

            {/* Login */}
            <a
              href="https://mozno.investwell.app/app/#/login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <LogIn className="w-4 h-4" />
              <span>Login to Your Account</span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>

            {/* Contact Card */}
            <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-500 font-medium mb-3">
                Get in Touch
              </p>
              <a
                href="mailto:contact@mozno.in"
                className="flex items-center gap-3 text-sm text-gray-700"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <span className="font-medium block">contact@mozno.in</span>
                  <span className="text-xs text-gray-400">
                    Less than 24 hrs response
                  </span>
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ====== OVERLAY ====== */}
      <div
        className={`
          fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden
          transition-opacity duration-300
          ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setIsMenuOpen(false)}
      />
    </>
  );
};

/* ====== DESKTOP NAV LINK ====== */
const NavLink = ({ href, active, children }) => (
  <Link
    to={href}
    className={`
      px-3 py-2 rounded-lg text-sm font-medium transition-colors
      ${
        active
          ? "text-emerald-700 bg-emerald-50"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
      }
    `}
  >
    {children}
  </Link>
);

/* ====== DESKTOP DROPDOWN ====== */
const DesktopDropdown = ({
  title,
  isOpen,
  onEnter,
  onLeave,
  isActive,
  allLink,
  items,
  onItemClick,
  currentPath,
  showAllLink = true,
}) => (
  <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
    <button
      className={`
        flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors
        ${
          isOpen || isActive
            ? "text-emerald-700 bg-emerald-50"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }
      `}
    >
      <span>{title}</span>
      <ChevronDown
        className={`w-3.5 h-3.5 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>

    <div
      className={`
        absolute left-1/2 -translate-x-1/2 mt-2 w-56
        bg-white rounded-xl border border-gray-100 shadow-xl
        py-2 transition-all duration-200 origin-top
        ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }
      `}
    >
      <div className="absolute top-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />

      {showAllLink && allLink && (
        <Link
          to={allLink}
          className={`
            flex items-center justify-between px-4 py-2.5 text-sm font-semibold border-b border-gray-100
            ${
              currentPath === allLink
                ? "bg-emerald-50 text-emerald-700"
                : "text-gray-700 hover:bg-gray-50"
            }
          `}
          onClick={onItemClick}
        >
          <span>All {title}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}

      {items.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`
            flex items-center px-4 py-2.5 text-sm transition-colors
            ${
              currentPath === item.path
                ? "bg-emerald-50 text-emerald-700 font-medium"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }
          `}
          onClick={onItemClick}
        >
          {item.name}
        </Link>
      ))}
    </div>
  </div>
);

/* ====== MOBILE NAV LINK ====== */
const MobileNavLink = ({ href, active, onClick, children }) => (
  <Link
    to={href}
    onClick={onClick}
    className={`
      flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors
      ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : "text-gray-700 hover:bg-gray-50"
      }
    `}
  >
    {active && (
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-3" />
    )}
    {children}
  </Link>
);

/* ====== MOBILE ACCORDION ====== */
const MobileAccordion = ({
  title,
  isOpen,
  setIsOpen,
  isActive,
  allLink,
  items,
  onItemClick,
  currentPath,
  showAllLink = true,
}) => (
  <div>
    <button
      onClick={setIsOpen}
      className={`
        w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors
        ${
          isActive
            ? "bg-emerald-50 text-emerald-700"
            : "text-gray-700 hover:bg-gray-50"
        }
      `}
    >
      <span>{title}</span>
      <ChevronDown
        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>

    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="ml-4 pl-4 border-l-2 border-emerald-100 py-1 space-y-1">
        {showAllLink && allLink && (
          <Link
            to={allLink}
            className={`
              flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold
              ${
                currentPath === allLink
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-700 hover:bg-gray-50"
              }
            `}
            onClick={onItemClick}
          >
            <span>All {title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}

        {items.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`
              flex items-center px-3 py-2 rounded-lg text-sm transition-colors
              ${
                currentPath === item.path
                  ? "bg-emerald-50 text-emerald-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }
            `}
            onClick={onItemClick}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default Navbar;