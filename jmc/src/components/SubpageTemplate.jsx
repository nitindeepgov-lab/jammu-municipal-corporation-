import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import PageLayout from "./PageLayout";
import {
  Home,
  Building2,
  Users,
  FileText,
  Globe,
  Briefcase,
  Bell,
  Building,
  Wrench,
  Camera,
  Info,
  Phone,
  MessageSquare,
  CreditCard,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

const PAGE_NAV = [
  { name: "Home", to: "/", icon: Home },
  { name: "About JMC", to: "/about", icon: Building2 },
  { name: "Governing Bodies", to: "/officials", icon: Users },
  { name: "Commissioner's Desk", to: "/commissioner", icon: Briefcase },
  { name: "E-Governance", to: "/egov", icon: Globe },
  { name: "Citizen Services", to: "/services", icon: FileText },
  {
    name: "Orders & Circulars",
    to: "/notices",
    icon: Bell,
    children: [
      { name: "General Tenders", to: "/notices?tab=tender" },
      { name: "Smart City Tenders", to: "/smart-city-tenders" },
    ],
  },
  { name: "Smart City", to: "/smart-city", icon: Building },
  { name: "Development Works", to: "/development-works", icon: Wrench },
  { name: "Photo Gallery", to: "/gallery", icon: Camera },
  { name: "Officer Directory", to: "/officers-directory", icon: Users },
  { name: "Employee Corner", to: "/employee-corner", icon: Briefcase },
  { name: "RTI", to: "/rti", icon: Info },
  { name: "Contact Us", to: "/contact", icon: Phone },
  { name: "Feedback", to: "/feedback", icon: MessageSquare },
];

const IMPORTANT_LINKS = [
  { name: "Pay Online", to: "/pay-online", icon: CreditCard },
  { name: "Commissioner's Desk", to: "/commissioner", icon: Briefcase },
  {
    name: "Online Grievance",
    href: "https://jmc.jk.gov.in/OnlineGrievances.aspx",
    icon: MessageSquare,
  },
  {
    name: "Web Information Manager",
    to: "/web-info-manager",
    icon: Users,
  },
  {
    name: "Tenders",
    href: "/notices",
    icon: FileText,
  },
];

function Sidebar() {
  const location = useLocation();
  const [expanded, setExpanded] = useState({});

  // Auto-expand menu on mount if current page is parent or child
  useEffect(() => {
    const initial = {};
    PAGE_NAV.forEach((item) => {
      if (item.children) {
        const isParentActive = location.pathname === item.to;
        const isChildActive = item.children.some(
          (child) =>
            location.pathname + location.search === child.to ||
            location.pathname === child.to.split("?")[0]
        );
        if (isParentActive || isChildActive) {
          initial[item.name] = true;
        }
      }
    });
    setExpanded(initial);
  }, [location]);

  const toggleExpand = (name) => {
    setExpanded((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <aside className="space-y-6 sm:space-y-8">
      {/* Minimalist Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-white border-b border-gray-200 py-2 pl-7 sm:pl-8 text-[13px] sm:text-sm focus:outline-none focus:border-[#002B5E] transition-all"
        />
        <Globe className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
      </div>

      {/* Navigation - Collapsible Dropdowns */}
      <nav aria-label="Section navigation">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 px-1 select-none">
          Menu
        </h2>
        <ul className="space-y-1">
          {PAGE_NAV.map((item) => {
            const hasChildren = !!item.children;
            const isParentActive = location.pathname === item.to;
            const isChildActive =
              hasChildren &&
              item.children.some(
                (child) =>
                  location.pathname + location.search === child.to ||
                  location.pathname === child.to.split("?")[0]
              );
            const active = isParentActive || isChildActive;
            const isOpen = !!expanded[item.name];
            const Icon = item.icon;

            return (
              <li key={item.name} className="space-y-1">
                <div className="flex items-center justify-between gap-1 group">
                  <Link
                    to={item.to}
                    className={`flex-1 flex items-center gap-2.5 sm:gap-3 px-2.5 sm:px-3 py-2.5 rounded-lg text-[12px] sm:text-[13px] font-semibold transition-all duration-200 ${
                      active
                        ? "bg-slate-50 text-[#002B5E]"
                        : "text-gray-500 hover:text-[#002B5E] hover:bg-gray-50/50"
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                        active
                          ? "text-[#FF6600]"
                          : "text-gray-300 group-hover:text-gray-400"
                      }`}
                    />
                    <span className="flex-1 truncate">{item.name}</span>
                    {active && !hasChildren && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF6600]"></div>
                    )}
                  </Link>

                  {hasChildren && (
                    <button
                      onClick={() => toggleExpand(item.name)}
                      className={`p-2 rounded-lg text-gray-400 hover:text-[#002B5E] hover:bg-gray-50 transition-all duration-350 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-label="Toggle submenu"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {hasChildren && isOpen && (
                  <ul className="pl-6 sm:pl-7 pr-2 py-1.5 space-y-1.5 border-l border-slate-100 ml-4 sm:ml-5">
                    {item.children.map((child) => {
                      const isChildActive =
                        location.pathname + location.search === child.to ||
                        location.pathname === child.to.split("?")[0];
                      return (
                        <li key={child.to}>
                          <Link
                            to={child.to}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[11px] sm:text-[12px] font-bold transition-colors ${
                              isChildActive
                                ? "text-[#FF6600] font-semibold"
                                : "text-gray-500 hover:text-[#002B5E] hover:bg-gray-50/50"
                            }`}
                          >
                            <span
                              className={`w-1 h-1 rounded-full ${
                                isChildActive ? "bg-[#FF6600]" : "bg-gray-300"
                              }`}
                            />
                            {child.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Quick Access - Refined */}
      <div className="space-y-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1 select-none">
          Quick Access
        </h2>
        <div className="grid grid-cols-1 gap-2">
          {IMPORTANT_LINKS.map((link) => {
            const Icon = link.icon;
            const isExternal = !!link.href;

            const linkContent = (
              <div className="flex items-center gap-2.5 sm:gap-3 w-full min-w-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#FF6600] group-hover:bg-orange-50 transition-all shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="flex-1 min-w-0 text-[12px] sm:text-[13px] leading-tight font-bold text-gray-600 group-hover:text-[#002B5E] transition-colors">
                  {link.name}
                </span>
                {isExternal && (
                  <ExternalLink className="w-3 h-3 text-gray-300 shrink-0" />
                )}
              </div>
            );

            return (
              <div key={link.to || link.href}>
                {link.to ? (
                  <Link
                    to={link.to}
                    className="group flex items-center p-1.5 rounded-xl hover:bg-gray-50 transition-all"
                  >
                    {linkContent}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center p-1.5 rounded-xl hover:bg-gray-50 transition-all"
                  >
                    {linkContent}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default function SubpageTemplate({
  title,
  breadcrumb = [],
  children,
}) {
  return (
    <PageLayout>
      {/* Clean & Professional Banner with subtle gradient and modern vector accents */}
      <div className="bg-gradient-to-br from-[#001a33] via-[#002B5E] to-[#004488] relative overflow-hidden shadow-inner">
        {/* Soft decorative ambient glow circles */}
        <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />

        {/* Subtle grid pattern background overlay */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="mx-auto w-[min(96%,1400px)] px-1.5 sm:px-4 py-8 sm:py-10 md:py-14 lg:py-16 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4">
              {/* Minimal Breadcrumb */}
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] sm:tracking-widest">
                  <li>
                    <Link
                      to="/"
                      className="text-blue-300/60 hover:text-white transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  {breadcrumb.map((crumb, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-blue-300/30"></div>
                      {crumb.to ? (
                        <Link
                          to={crumb.to}
                          className="text-blue-300/60 hover:text-white transition-colors"
                        >
                          {crumb.name}
                        </Link>
                      ) : (
                        <span className="text-[#FF6600]">{crumb.name}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>

              {/* Refined Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] break-words">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-[#f8fafc] min-h-screen">
        <div className="mx-auto w-[min(96%,1400px)] px-1.5 sm:px-4 py-8 sm:py-10 md:py-14 lg:py-16">
          <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
            {/* Sidebar - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:block w-full xl:w-72 flex-shrink-0 xl:sticky xl:top-6 xl:self-start">
              <Sidebar />
            </div>

            {/* Content Container */}
            <main className="flex-1 min-w-0">
              <div className="prose prose-slate max-w-none">
                <div className="animate-fadeIn">{children}</div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
