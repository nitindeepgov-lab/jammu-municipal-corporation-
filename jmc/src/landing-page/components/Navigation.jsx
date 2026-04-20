import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", to: "/", className: "bg-orange-500" },
  {
    name: "About JMC",
    to: "/about",
    hasDropdown: true,
    dropdown: [
      { name: "About JMC", to: "/about" },
      { name: "History", to: "/about#history" },
      { name: "Vision & Mission", to: "/about#vision" },
    ],
  },
  {
    name: "Governing Bodies",
    to: "/governing-bodies",
    hasDropdown: true,
    dropdown: [
      { name: "Hon'ble Mayor", to: "/governing-bodies?Mayor" },
      {
        name: "Hon'ble Deputy Mayor",
        to: "/governing-bodies?Deputy-Mayor",
      },
      {
        name: "Hon'ble Chairman Public Health and Sanitation Committee",
        to: "/governing-bodies?Chairman-PHSC",
      },
      {
        name: "Hon'ble Chairman Swachh Bharat Committee",
        to: "/governing-bodies?Chairman-SBC",
      },
      {
        name: "Hon'ble Chairman Social Justice Committee",
        to: "/governing-bodies?Chairman-SJC",
      },
      {
        name: "Commissioner Secretary to Govt. (HUDD)",
        to: "/governing-bodies?Principal-Secretary",
      },
      {
        name: "Municipal Commissioner, JMC",
        to: "/governing-bodies?Commissioner",
      },
    ],
  },
  {
    name: "E-Governance",
    to: "/egov",
    hasDropdown: true,
    dropdown: [
      {
        name: "Online Public Grievance System",
        href: "https://myjammu.jk.gov.in/Login/Index",
      },
      {
        name: "Online Birth/Death Certificate",
        href: "https://jansugam.jk.gov.in/login.do",
      },
      {
        name: "Online Building Permission",
        href: "https://obps.jk.gov.in/BPAMSClient/Home.aspx",
      },
      {
        name: "Online Pay Rent of Municipal Shop/Flat",
        href: "https://myjammu.jk.gov.in/Login/Index",
      },
      {
        name: "Online User Charges",
        href: "https://jmc.jk.gov.in/online-payment.html",
      },
      { name: "E-Tendering", href: "https://jktenders.gov.in/" },
      {
        name: "Online NOC/License System",
        href: "https://jmc.jk.gov.in/easedoing.html",
      },
      {
        name: "Apply for Rehri License",
        href: "https://jmc.jk.gov.in/easedoing.html",
      },
    ],
  },
  {
    name: "Orders & Circulars",
    to: "/notices",
    hasDropdown: true,
    dropdown: [
      { name: "Public Notices", to: "/notices" },
      { name: "Tenders", to: "/notices" },
      { name: "Council Updates", to: "/notices" },
      { name: "Smart City", to: "/smart-city" },
      { name: "Swachh Mission", to: "/swachh-mission" },
      { name: "Development Works", to: "/development-works" },
    ],
  },
  { name: "Tenders", href: "/notices" },
  {
    name: "RTI",
    to: "/rti",
    hasDropdown: true,
    dropdown: [
      {
        name: "Disclosure of information Under Sec 4 of RTI Act.",
        to: "/rti",
      },
      { name: "Details of APIO's/PIO/FAA of JMC.", to: "/rti" },
      { name: "RTI ACT 2005", to: "/rti/document/rti-act-2005" },
    ],
  },
  { name: "Contact Us", to: "/contact" },
  {
    name: "Ex Municipal Councillor",
    to: "/councillor-details",
    hasDropdown: true,
    dropdown: [{ name: "Councillor Details", to: "/councillor-details" }],
  },
];

export default function Navigation({ mobileMenuOpen, setMobileMenuOpen }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const location = useLocation();

  const isActive = (to) =>
    to && to !== "#" && location.pathname === to.split("#")[0];

  // Beautiful modern styling classes
  const subLinkClass =
    "block px-5 py-3 text-slate-600 hover:text-[#003366] hover:bg-slate-50 text-[13px] font-medium transition-all duration-200 border-l-[3px] border-transparent hover:border-[#FF6600]";
  const mobileSubLinkClass =
    "flex items-center px-8 py-3.5 text-slate-300 hover:text-white hover:bg-white/5 text-[13px] border-b border-white/5 last:border-0 transition-colors";

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileDropdown(null);
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="bg-[#002B5E] sticky top-0 z-50 shadow-lg border-b-2 border-[#FF6600]">
        <div className="max-w-[1300px] mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between lg:justify-start h-[48px]">
            {/* Mobile: Hamburger Button */}
            <button
              className="lg:hidden flex-shrink-0 flex items-center justify-center text-white/80 w-10 h-10 rounded-md hover:bg-white/10 active:bg-white/20 transition-colors"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setMobileDropdown(null);
              }}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>

            {/* Mobile: Branding Center */}
            <div className="lg:hidden flex-1 text-center">
              <p className="text-white font-bold text-[14px] leading-tight tracking-wide">
                Jammu Municipal Corporation
              </p>
              <p className="text-[#FF6600] text-[9px] uppercase tracking-[0.2em] mt-0.5">
                Govt. of J&K (UT)
              </p>
            </div>

            {/* Desktop: Navigation Links */}
            <ul className="hidden lg:flex flex-1 items-stretch h-full">
              {navLinks.map((item, idx) => {
                const isNavActive = isActive(item.to);
                return (
                  <li
                    key={idx}
                    className="relative flex"
                    onMouseEnter={() => setOpenDropdown(idx)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center px-3 h-full text-[13px] font-bold tracking-wide transition-all duration-200 group relative whitespace-nowrap
                          ${item.className || ""}
                          ${isNavActive ? "text-white" : "text-slate-200 hover:text-white"}`}
                      >
                        {item.name}
                        {item.hasDropdown && (
                          <svg
                            className={`w-3.5 h-3.5 ml-1.5 transition-transform duration-200 ${openDropdown === idx ? "rotate-180 text-[#FF6600]" : "opacity-60"}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                        {/* Hover accent line */}
                        <span
                          className={`absolute bottom-0 left-0 w-full h-[3px] bg-[#FF6600] origin-left transition-transform duration-300 ease-out
                          ${isNavActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                        />
                      </a>
                    ) : (
                      <Link
                        to={item.to || "/"}
                        className={`flex items-center px-3 h-full text-[13px] font-bold tracking-wide transition-all duration-200 group relative whitespace-nowrap
                          ${item.className || ""}
                          ${isNavActive ? "text-white" : "text-slate-200 hover:text-white"}`}
                      >
                        {item.name}
                        {item.hasDropdown && (
                          <svg
                            className={`w-3.5 h-3.5 ml-1.5 transition-transform duration-200 ${openDropdown === idx ? "rotate-180 text-[#FF6600]" : "opacity-60"}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                        {/* Hover accent line */}
                        <span
                          className={`absolute bottom-[-2px] left-0 w-full h-[3px] bg-[#FF6600] origin-left transition-transform duration-300 ease-out
                          ${isNavActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                        />
                      </Link>
                    )}

                    {/* Desktop Dropdown */}
                    {item.hasDropdown && openDropdown === idx && (
                      <div className="absolute left-0 top-[calc(100%+2px)] w-[260px] pt-1 pb-2 bg-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] rounded-b-md z-[60] border border-slate-100 animate-slideDown">
                        <ul className="flex flex-col">
                          {item.dropdown.map((sub, subIdx) => (
                            <li key={subIdx}>
                              {sub.href ? (
                                <a
                                  href={sub.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={subLinkClass}
                                >
                                  {sub.name}
                                </a>
                              ) : (
                                <Link to={sub.to} className={subLinkClass}>
                                  {sub.name}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Search Icon */}
            <button
              className="flex-shrink-0 hidden lg:flex items-center justify-center text-white/80 w-10 h-10 rounded-full hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Search"
            >
              <svg
                className="w-4 h-4 shadow-sm"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Backdrop Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-[#00142ccc]/80 backdrop-blur-sm z-[65] transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile Slide-in Drawer */}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`lg:hidden fixed top-0 left-0 bottom-0 w-[85vw] max-w-[320px] bg-[#001D40] z-[70] flex flex-col shadow-2xl transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="bg-[#002B5E] px-5 py-5 flex items-center justify-between border-b-[3px] border-[#FF6600] flex-shrink-0 shadow-sm relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.03] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <p className="text-[#FF6600] text-[9px] uppercase tracking-[0.2em] font-bold mb-0.5">
              Govt. of J&K
            </p>
            <p className="text-white font-bold text-sm leading-tight">
              Jammu Municipal
            </p>
            <p className="text-slate-300 font-semibold text-xs mt-0.5">
              Corporation
            </p>
          </div>
          <button
            className="relative z-10 text-white/50 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors bg-black/10"
            onClick={closeMobileMenu}
            aria-label="Close navigation"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Nav Items */}
        <ul className="flex-1 overflow-y-auto w-full py-2">
          {navLinks.map((item, idx) => {
            const isNavActive = isActive(item.to);
            return (
              <li key={idx} className="border-b border-white/5 last:border-0">
                <div className="flex items-stretch min-h-[52px]">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileMenu}
                      className={`flex-1 flex items-center px-6 py-3.5 text-slate-200 text-sm font-medium hover:bg-white/5 hover:text-white transition-colors ${item.className || ""}`}
                    >
                      <span className="text-[#FF6600] mr-3 text-lg leading-none opacity-80">
                        ·
                      </span>
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.to || "/"}
                      onClick={() => !item.hasDropdown && closeMobileMenu()}
                      className={`flex-1 flex items-center px-6 py-3.5 text-sm font-medium transition-colors ${item.className || ""} ${
                        isNavActive
                          ? "bg-gradient-to-r from-[#FF6600]/10 to-transparent text-white border-l-2 border-[#FF6600]"
                          : "text-slate-200 hover:bg-white/5 hover:text-white border-l-2 border-transparent"
                      }`}
                    >
                      <span
                        className={`mr-3 text-lg leading-none ${isNavActive ? "text-[#FF6600]" : "text-slate-500"}`}
                      >
                        ·
                      </span>
                      {item.name}
                    </Link>
                  )}
                  {item.hasDropdown && (
                    <button
                      className={`px-5 flex items-center justify-center transition-colors ${mobileDropdown === idx ? "bg-white/5 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
                      onClick={() =>
                        setMobileDropdown((d) => (d === idx ? null : idx))
                      }
                      aria-label={
                        mobileDropdown === idx
                          ? "Collapse submenu"
                          : "Expand submenu"
                      }
                      aria-expanded={mobileDropdown === idx}
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${mobileDropdown === idx ? "rotate-180 text-[#FF6600]" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Mobile Submenu Dropdown */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileDropdown === idx ? "max-h-[500px] opacity-100 bg-black/20" : "max-h-0 opacity-0"}`}
                >
                  <ul className="py-2">
                    {item.dropdown?.map((sub, subIdx) => (
                      <li key={subIdx}>
                        {sub.href ? (
                          <a
                            href={sub.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMobileMenu}
                            className={mobileSubLinkClass}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600]/60 mr-3 shadow-[0_0_4px_rgba(255,102,0,0.5)]"></span>
                            {sub.name}
                          </a>
                        ) : (
                          <Link
                            to={sub.to}
                            onClick={closeMobileMenu}
                            className={mobileSubLinkClass}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600]/60 mr-3 shadow-[0_0_4px_rgba(255,102,0,0.5)]"></span>
                            {sub.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Drawer Footer — Helpline */}
        <div className="bg-[#00132B] px-6 py-5 flex-shrink-0 border-t border-white/5">
          <a href="tel:18001807207" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6600] to-[#E65C00] shadow-[0_4px_10px_rgba(255,102,0,0.3)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <p className="text-white text-sm font-bold tracking-wide group-hover:text-[#FF6600] transition-colors">
                1800-180-7207
              </p>
              <p className="text-slate-400 text-[10px] uppercase font-semibold tracking-wider mt-0.5">
                Municipal Helpline
              </p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
