import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getVisitorCount,
  incrementVisitorCount,
  getFooterLinks,
} from "../../services/strapiApi";
import { logError } from "../../utils/errorLogger";

let hasIncrementedVisitorCount = false;

// ── Static nav links (bottom policy bar — always static, not CMS-managed) ───

const STATIC_NAV_LINKS = [
  { name: "Home", to: "/" },
  { name: "About Us", to: "/about" },
  { name: "Feedback", to: "/feedback" },
  { name: "Contact Us", to: "/contact" },
  { name: "Help", to: "/contact" },
  { name: "Sitemap", to: "/sitemap" },
  { name: "Web Information Manager", to: "/web-info-manager" },
  { name: "Hyperlink Policy", to: "/hyperlink-policy" },
  { name: "Privacy Policy", to: "/privacy-policy" },
  { name: "Disclaimer", to: "/disclaimer" },
  { name: "Accessibility", to: "/accessibility" },
  { name: "Copyright Policy", to: "/copyright-policy" },
  { name: "Terms & Conditions", to: "/terms-conditions" },
];

// ── Static column fallback (used only when CMS is unreachable) ───────────────

const STATIC_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { name: "About JMC", url: "/about", is_external: false },
      {
        name: "About Jammu City",
        url: "/information/about-jammu-city",
        is_external: false,
      },
      { name: "Photo Gallery", url: "/gallery", is_external: false },
      { name: "Tenders", url: "/notices", is_external: false },
      { name: "Public Notices", url: "/notices", is_external: false },
      { name: "E-Newsletter", url: "/newsletter", is_external: false },
      { name: "RTI", url: "/rti", is_external: false },
    ],
  },
  {
    title: "Citizen Services",
    links: [
      { name: "Pay Online", url: "/pay-online", is_external: false },
      { name: "Register a Complaint", url: "/feedback", is_external: false },
      { name: "Apply for Rehri License", url: "/egov", is_external: false },
      { name: "Building Permission", url: "/egov", is_external: false },
      { name: "Birth / Death Certificate", url: "https://serviceonline.gov.in/jammu/", is_external: true },
      { name: "Trade License", url: "/egov", is_external: false },
      { name: "E-Tendering", url: "/egov", is_external: false },
    ],
  },
  {
    title: "Information",
    links: [
      {
        name: "Achievements",
        url: "/footer/achievement1.pdf",
        is_external: true,
      },
      { name: "Smart City Projects", url: "/smart-city", is_external: false },
      {
        name: "Swachh Bharat Mission",
        url: "/swachh-mission",
        is_external: false,
      },
      { name: "Council Updates", url: "/notices", is_external: false },
      { name: "E-Governance Portal", url: "/egov", is_external: false },
      {
        name: "Polythene Control",
        url: "/information/polythene-control",
        is_external: false,
      },
      { name: "Commissioner's Desk", url: "/commissioner", is_external: false },
    ],
  },
];

// Ordered column definitions — drives display order and column titles
const COLUMN_DEFS = [
  { section: "quick-links", title: "Quick Links" },
  { section: "citizen-services", title: "Citizen Services" },
  { section: "information", title: "Information" },
];

// ── Helper: group flat CMS link array by section ─────────────────────────────

function buildColumnsFromCMS(items) {
  // Group items by section
  const bySection = {};
  for (const item of items) {
    if (!bySection[item.section]) bySection[item.section] = [];
    bySection[item.section].push(item);
  }

  // Map to column structure, preserving order defined in COLUMN_DEFS
  return COLUMN_DEFS.map(({ section, title }) => ({
    title,
    links: bySection[section] ?? [],
  })).filter((col) => col.links.length > 0);
}

// ── FooterLink renderer ───────────────────────────────────────────────────────

function FooterLink({ link }) {
  const cls =
    "text-gray-400 text-[13px] hover:text-[#FF6600] transition-colors duration-200";

  if (link.is_external || link.url?.startsWith("http")) {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        {link.name}
      </a>
    );
  }

  return (
    <Link to={link.url} className={cls}>
      {link.name}
    </Link>
  );
}

// ── Column skeleton while loading ─────────────────────────────────────────────

function ColumnSkeleton() {
  return (
    <>
      {COLUMN_DEFS.map((_, idx) => (
        <div key={idx}>
          <div className="h-4 bg-white/5 rounded animate-pulse w-24 mb-4" />
          <ul className="space-y-2.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i}>
                <span className="inline-block h-3 bg-white/5 rounded animate-pulse w-28" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

// ── Main Footer component ─────────────────────────────────────────────────────

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState(null);
  // null = loading | array = ready (either CMS data or static fallback)
  const [columns, setColumns] = useState(null);

  // ── Visitor counter ───────────────────────────────────────────────────────
  useEffect(() => {
    let isActive = true;

    const applyCount = (count) => {
      if (!isActive) return;
      if (Number.isFinite(count)) setVisitorCount(count);
    };

    const loadVisitorCount = async () => {
      try {
        if (!hasIncrementedVisitorCount) {
          const res = await incrementVisitorCount();
          hasIncrementedVisitorCount = true;
          applyCount(res?.data?.count);
          return;
        }
      } catch (error) {
        logError("VisitorCount", error);
      }
      try {
        const res = await getVisitorCount();
        applyCount(res?.data?.count);
      } catch (error) {
        logError("VisitorCount", error);
      }
    };

    loadVisitorCount();
    return () => {
      isActive = false;
    };
  }, []);

  // ── Footer column links from CMS ─────────────────────────────────────────
  useEffect(() => {
    let isActive = true;

    const loadFooterLinks = async () => {
      try {
        console.log("[Footer] 🔄 Fetching footer links from CMS...");
        const res = await getFooterLinks();
        if (!isActive) return;

        // Strapi v5 response: { data: [ { id, documentId, name, url, ... } ], meta: {...} }
        const items = Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data)
            ? res.data // fallback in case axios unwraps differently
            : [];

        console.log(
          `[Footer] ✅ Fetched ${items.length} footer links from CMS:`,
          items,
        );

        if (items.length === 0) {
          // CMS returned no active column links → use static fallback
          console.warn(
            "[Footer] ⚠️  No active footer links in CMS, using static fallback",
          );
          setColumns(STATIC_COLUMNS);
          return;
        }

        const built = buildColumnsFromCMS(items);
        console.log("[Footer] 📋 Built columns from CMS:", built);
        setColumns(built.length > 0 ? built : STATIC_COLUMNS);
      } catch (error) {
        console.error("[Footer] ❌ Error loading footer links:", error.message);
        console.error("[Footer] Full error object:", error);
        if (error.response) {
          console.error("[Footer] API Response status:", error.response.status);
          console.error("[Footer] API Response data:", error.response.data);
        }
        logError("FooterLinks", error);
        if (!isActive) return;
        console.warn("[Footer] Using static fallback due to error");
        setColumns(STATIC_COLUMNS); // Silent fallback on any error
      }
    };

    loadFooterLinks();
    return () => {
      isActive = false;
    };
  }, []);

  const safeCount = Number.isFinite(visitorCount)
    ? Math.max(0, visitorCount)
    : 0;
  const countDigits = String(safeCount).padStart(6, "0").split("");

  return (
    <footer className="bg-[#0a1929] text-white">
      {/* Orange accent line */}
      <div className="h-1 bg-gradient-to-r from-[#FF6600] via-[#FF8533] to-[#FF6600]" />

      {/* Contact strip */}
      <div className="bg-[#003366]">
        <div className="max-w-[1200px] mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                label: "Address",
                value: (
                  <>
                    Jammu Municipal Corporation
                    <br />
                    Jammu — 180001, J&K (UT)
                  </>
                ),
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                ),
              },
              {
                label: "Toll Free",
                value: (
                  <>
                    1800-180-7207
                    <br />
                    <span className="text-blue-300/60 text-[10px]">
                      10 AM – 5 PM (Working Days)
                    </span>
                  </>
                ),
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                ),
              },
              {
                label: "Email",
                value: "commissionerjmc@gmail.com",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                ),
              },
              {
                label: "Website",
                value: (
                  <a
                    href="https://jmc.jk.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    www.jmc.jk.gov.in
                  </a>
                ),
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                ),
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#FF6600]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-[#FF6600]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {item.icon}
                  </svg>
                </div>
                <div>
                  <p className="text-[#FF6600]/70 text-[10px] font-semibold uppercase tracking-widest mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-blue-100/90 text-xs leading-snug">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="max-w-[1200px] mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">
          {/* Brand column — spans 2 cols on md */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/logo.jpeg"
                alt="JMC Logo"
                className="w-12 h-12 rounded-lg object-cover ring-2 ring-[#FF6600]/30"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <div>
                <p className="font-bold text-[15px] text-white leading-tight tracking-tight">
                  Jammu Municipal Corporation
                </p>
                <p className="text-gray-500 text-[11px] mt-0.5">
                  Government of J&K (UT)
                </p>
              </div>
            </div>
            <p className="text-gray-500 text-[13px] leading-relaxed mb-5 max-w-xs">
              The urban local body responsible for civic services to the
              residents of Jammu city — sanitation, water supply, property tax,
              infrastructure, and public health.
            </p>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/JammuSmartCity"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#1877F2] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                title="Facebook"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/jmcjammu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                title="X / Twitter"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#FF0000] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                title="YouTube"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e1306c] hover:to-[#833ab4] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                title="Instagram"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* CMS-managed link columns — skeleton while loading */}
          {columns === null ? (
            <ColumnSkeleton />
          ) : (
            columns.map((col, idx) => (
              <div key={idx}>
                <h4 className="font-semibold text-[13px] text-white uppercase tracking-wider mb-4 pb-2 border-b border-[#FF6600]/30 flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#FF6600] rounded-full inline-block" />
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link, lidx) => (
                    <li key={link.documentId ?? lidx}>
                      <FooterLink link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom policy nav bar — always static */}
      <div className="border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <nav className="flex flex-wrap justify-center gap-x-1 gap-y-1">
            {STATIC_NAV_LINKS.map((link, idx) => (
              <span key={idx} className="flex items-center">
                <Link
                  to={link.to}
                  className="text-gray-500 hover:text-gray-300 text-[11px] transition-colors px-1.5"
                >
                  {link.name}
                </Link>
                {idx < STATIC_NAV_LINKS.length - 1 && (
                  <span className="text-white/10 text-[10px]">|</span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>

      {/* Copyright / version bar */}
      <div className="bg-[#060e1a] border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 py-5">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <p className="text-gray-500 text-[11px] mb-1.5">
                © {new Date().getFullYear()}{" "}
                <strong className="text-gray-300">
                  Jammu Municipal Corporation
                </strong>
                . All Rights Reserved.
              </p>
            </div>

            <div className="w-full lg:w-auto flex flex-wrap items-center justify-center lg:justify-end gap-4 lg:ml-auto">
              {/* Version Badge */}
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)] animate-pulse" />
                <span className="text-gray-400 text-[10px] font-semibold tracking-wider">
                  VERSION v2.0.0
                </span>
              </div>

              {/* Visitor Count */}
              <div className="flex items-center gap-2 bg-[#001833] border border-[#FF6600]/30 px-3 py-1 rounded-md">
                <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">
                  Visitors:
                </span>
                <div className="flex gap-[1px]">
                  {countDigits.map((digit, i) => (
                    <span
                      key={i}
                      className="bg-black text-[#FF6600] text-xs font-mono font-bold px-1.5 py-0.5 rounded-sm shadow-inner"
                    >
                      {digit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
