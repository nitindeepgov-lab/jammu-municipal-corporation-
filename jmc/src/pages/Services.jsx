import { Link } from "react-router-dom";
import SubpageTemplate from "../components/SubpageTemplate";
import {
  ArrowUpRight,
  ExternalLink,
  Activity,
  Info,
  Link as LinkIcon,
  Download,
  Phone,
} from "lucide-react";

const topServices = [
  {
    name: "Pay Property Tax",
    desc: "Pay dues online instantly",
    to: "/pay-online",
    color: "bg-[#002B5E]",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  },
  {
    name: "Register Complaint",
    desc: "File grievances online",
    href: "https://jmc.jk.gov.in/OnlineGrievances.aspx",
    color: "bg-[#FF6600]",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
        />
      </svg>
    ),
  },
  {
    name: "Birth / Death Certificate",
    desc: "Apply via JAKSMAC portal",
    href: "https://serviceonline.gov.in/jammu/",
    color: "bg-teal-600",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    name: "Building Permission",
    desc: "Apply for plan sanction",
    href: "https://jmc.jk.gov.in/PermissionForm.aspx",
    color: "bg-amber-600",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    name: "Trade License",
    desc: "Apply or renew license",
    href: "https://jmc.jk.gov.in/easedoing.html",
    color: "bg-purple-600",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    name: "E-Governance Portal",
    desc: "All digital services hub",
    href: "https://jmc.jk.gov.in/egov.html",
    color: "bg-[#002B5E]",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    ),
  },
];

const categories = [
  {
    title: "Online Payments",
    accent: "#002B5E",
    icon: <Activity className="w-4 h-4" />,
    items: [
      {
        name: "Pay Property Tax",
        to: "/pay-online",
        desc: "Pay property tax dues online securely",
      },
      {
        name: "Water Bill Payment",
        href: "https://jmc.jk.gov.in/pddeservices.html",
        desc: "Pay water and sewerage bills",
      },
      {
        name: "Online Payment Portal",
        to: "/pay-online",
        desc: "All JMC dues, fees and charges",
      },
    ],
  },
  {
    title: "Certificates & Registrations",
    accent: "#0f766e",
    icon: <Info className="w-4 h-4" />,
    items: [
      {
        name: "Birth / Death Certificate",
        href: "https://serviceonline.gov.in/jammu/",
        desc: "Apply online via JAKSMAC portal",
      },
      {
        name: "Trade License",
        href: "https://jmc.jk.gov.in/easedoing.html",
        desc: "Apply or renew your trade license",
      },
      {
        name: "Ease of Doing Business",
        href: "https://jmc.jk.gov.in/easedoing.html",
        desc: "Business registration & facilitation",
      },
    ],
  },
  {
    title: "Building & Planning",
    accent: "#b45309",
    icon: <LinkIcon className="w-4 h-4" />,
    items: [
      {
        name: "Building Plan Permission",
        href: "https://jmc.jk.gov.in/PermissionForm.aspx",
        desc: "Apply for building plan sanction",
      },
      {
        name: "Rehri / Stall License",
        href: "https://jmc.jk.gov.in/easedoing.html",
        desc: "Apply for rehri stall licence",
      },
    ],
  },
  {
    title: "Grievances & Complaints",
    accent: "#be123c",
    icon: <Phone className="w-4 h-4" />,
    items: [
      {
        name: "Register a Complaint",
        href: "https://jmc.jk.gov.in/OnlineGrievances.aspx",
        desc: "File your grievance online",
      },
      {
        name: "Track Complaint Status",
        href: "https://jmc.jk.gov.in/OnlineGrievances.aspx",
        desc: "Check status of your complaint",
      },
    ],
  },
  {
    title: "Information Services",
    accent: "#4338ca",
    icon: <Download className="w-4 h-4" />,
    items: [
      {
        name: "E-Governance Portal",
        href: "https://jmc.jk.gov.in/egov.html",
        desc: "Access all e-governance services",
      },
      {
        name: "PDD E-Services",
        href: "https://jmc.jk.gov.in/pddeservices.html",
        desc: "Power Development Dept services",
      },
      {
        name: "E-Newsletter",
        href: "https://jmc.jk.gov.in/newsletter.aspx",
        desc: "Download JMC newsletters",
      },
    ],
  },
  {
    title: "Smart City Services",
    accent: "#0369a1",
    icon: <Activity className="w-4 h-4" />,
    items: [
      {
        name: "Smart City Portal",
        href: "https://jmc.jk.gov.in/smartcity.aspx",
        desc: "Smart City Mission — Jammu",
      },
    ],
  },
];

function ServiceLink({ item }) {
  const cls =
    "group flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent hover:border-[#002B5E]/10 hover:bg-gray-50/50 transition-all duration-300 relative overflow-hidden";
  const content = (
    <>
      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600] flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform" />
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-bold text-gray-900 group-hover:text-[#002B5E] transition-colors leading-snug truncate">
          {item.name}
        </p>
        <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
          {item.desc}
        </p>
      </div>
      <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#FF6600] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
      <div className="absolute bottom-0 left-0 h-[2px] bg-[#FF6600] w-0 group-hover:w-full transition-all duration-500 ease-out" />
    </>
  );
  return item.to ? (
    <Link to={item.to} className={cls}>
      {content}
    </Link>
  ) : (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
    >
      {content}
    </a>
  );
}

export default function Services() {
  return (
    <SubpageTemplate
      title="Citizen Services"
      breadcrumb={[{ name: "Citizen Services" }]}
    >
      <div className="max-w-5xl mx-auto space-y-12 pb-6">
        {/* Intro banner */}
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-[#002B5E] tracking-tight mb-4">
            All JMC Services — One Place
          </h2>
          <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
            Pay taxes, apply for certificates, register complaints, and access
            all municipal services without visiting the office.
          </p>
          <a
            href="https://jmc.jk.gov.in/OnlineGrievances.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF6600] text-white text-[13.5px] font-bold rounded-xl hover:bg-[#e55a00] hover:shadow-sm transition-all"
          >
            Register Complaint <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Most Used Services */}
        <div>
          <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-6">
            Most Used Services
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {topServices.map((s, i) => {
              const cls = `${s.color} text-white rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 relative overflow-hidden group`;
              const inner = (
                <>
                  <span className="opacity-90 group-hover:scale-110 transition-transform duration-300">
                    {s.icon}
                  </span>
                  <span className="text-[13px] font-bold leading-tight z-10">
                    {s.name}
                  </span>
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              );
              return s.to ? (
                <Link key={i} to={s.to} className={cls}>
                  {inner}
                </Link>
              ) : (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls}
                >
                  {inner}
                </a>
              );
            })}
          </div>
        </div>

        {/* All Service Categories */}
        <div>
          <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-6">
            Service Categories
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-200 overflow-hidden hover:border-[#002B5E]/20 transition-all duration-300"
              >
                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${cat.accent}15`,
                      color: cat.accent,
                    }}
                  >
                    {cat.icon}
                  </div>
                  <h3 className="font-bold text-[14px] text-gray-900 tracking-tight">
                    {cat.title}
                  </h3>
                </div>
                <div className="p-2 space-y-1">
                  {cat.items.map((item, i) => (
                    <ServiceLink key={i} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help bar */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FF6600]/10 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-[#FF6600]" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-gray-900 mb-1">
                Need Assistance?
              </h3>
              <p className="text-[13.5px] text-gray-600 leading-relaxed">
                Our helpline is available on all working days (10:00 AM – 5:00
                PM)
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center justify-center px-6 py-3 bg-white border border-[#FF6600]/20 rounded-xl shadow-sm">
            <span className="text-[#FF6600] font-black text-xl tracking-tight">
              1800 180 7207
            </span>
          </div>
        </div>
      </div>
    </SubpageTemplate>
  );
}