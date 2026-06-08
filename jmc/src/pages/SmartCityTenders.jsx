import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import SubpageTemplate from "../components/SubpageTemplate";
import { getSmartCityTenders } from "../services/strapiApi";
import { STRAPI_URL } from "../config/api";
import { logError } from "../utils/errorLogger";

const STATUS_CONFIGS = {
  Active: {
    label: "Active / Bidding",
    colorClass: "bg-emerald-50 text-emerald-700 border-emerald-100/80",
    dotClass: "bg-emerald-500",
  },
  "Under Evaluation": {
    label: "Under Evaluation",
    colorClass: "bg-amber-50 text-amber-700 border-amber-100/80",
    dotClass: "bg-amber-500",
  },
  Awarded: {
    label: "Contract Awarded",
    colorClass: "bg-indigo-50 text-indigo-700 border-indigo-100/80",
    dotClass: "bg-indigo-500",
  },
  Closed: {
    label: "Closed",
    colorClass: "bg-slate-100 text-slate-600 border-slate-200",
    dotClass: "bg-slate-400",
  },
  Cancelled: {
    label: "Cancelled",
    colorClass: "bg-red-50 text-red-600 border-red-100/80",
    dotClass: "bg-red-500",
  },
};

const ALL_STATUSES = [
  "All",
  "Active",
  "Under Evaluation",
  "Awarded",
  "Closed",
  "Cancelled",
];

/* ── Skeleton Card Component ── */
function TenderSkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className="h-4.5 w-16 bg-slate-100 rounded-full" />
          <div className="h-4.5 w-24 bg-slate-100 rounded-full" />
        </div>
        <div className="h-5 w-20 bg-slate-100 rounded" />
      </div>
      <div className="space-y-2">
        <div className="h-5 bg-slate-100 rounded w-5/6" />
        <div className="h-5 bg-slate-100 rounded w-3/4" />
      </div>
      <div className="h-px bg-slate-100 w-full" />
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4">
          <div className="h-4 w-28 bg-slate-100 rounded" />
          <div className="h-4 w-28 bg-slate-100 rounded" />
        </div>
        <div className="h-8 w-24 bg-slate-100 rounded-xl" />
      </div>
    </div>
  );
}

/* ── Individual Tender Card Component ── */
function TenderCard({ tender }) {
  const [expanded, setExpanded] = useState(false);
  const statusCfg = STATUS_CONFIGS[tender.status] || STATUS_CONFIGS.Active;
  const hasDesc = tender.description && tender.description.trim().length > 0;

  return (
    <div className="tender-dashboard-card bg-white rounded-2xl border border-slate-200/60 overflow-hidden transition-all duration-300">
      <div className="p-5 sm:p-6">
        
        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-extrabold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
              {tender.id}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
              {tender.category}
            </span>
          </div>
          
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-full border ${statusCfg.colorClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dotClass}`} />
            {statusCfg.label}
          </span>
        </div>

        {/* Title */}
        <a
          href={tender.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[15px] font-bold text-[#002B5E] hover:text-[#FF6600] transition-colors leading-relaxed block mb-4"
        >
          {tender.title}
        </a>

        {/* Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-6 text-xs text-slate-500 pb-5 border-b border-slate-100">
          {tender.department && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
              </svg>
              <div className="min-w-0">
                <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">Department</p>
                <p className="font-semibold text-slate-600 truncate">{tender.department}</p>
              </div>
            </div>
          )}
          
          {tender.publishedDate && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">Published Date</p>
                <p className="font-semibold text-slate-600">{tender.publishedDate}</p>
              </div>
            </div>
          )}

          {tender.closingDate && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">Closing Date</p>
                <p className="font-semibold text-slate-600">{tender.closingDate}</p>
              </div>
            </div>
          )}
        </div>

        {/* Description Toggle & Cost Area */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <div className="flex items-center gap-4">
            {tender.estimatedCost && (
              <div className="bg-[#002B5E]/5 border border-[#002B5E]/10 rounded-xl px-3 py-1.5 flex items-center gap-2">
                <span className="text-[9px] font-black uppercase tracking-wider text-[#002B5E]/60">Est. Cost:</span>
                <span className="text-xs font-extrabold text-[#002B5E]">{tender.estimatedCost}</span>
              </div>
            )}
            
            {hasDesc && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs font-bold text-slate-500 hover:text-[#002B5E] flex items-center gap-1.5 transition-colors focus:outline-none"
              >
                {expanded ? "Hide Details" : "Show Details"}
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            )}
          </div>

          {tender.href && tender.href !== "#" && (
            <a
              href={tender.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#002B5E] hover:bg-[#FF6600] text-white text-xs font-extrabold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm"
            >
              View Tender
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>

        {/* Collapsible Rich Description */}
        {hasDesc && expanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 animate-fadeIn">
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">Scope of Work &amp; Description</p>
            <div className="prose prose-sm max-w-none text-slate-600 text-xs leading-relaxed bg-slate-50/50 rounded-xl p-4 border border-slate-100">
              {tender.description}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function SmartCityTenders() {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // States for search and filter options
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let active = true;
    getSmartCityTenders()
      .then((res) => {
        if (!active) return;
        const raw = res.data?.data || res.data || [];
        const items = raw.map((item) => {
          const a = item.attributes || item;
          let href = a.link || "#";
          if (a.document?.data?.attributes?.url) {
            href = `${STRAPI_URL}${a.document.data.attributes.url}`;
          } else if (a.document?.url) {
            href = `${STRAPI_URL}${a.document.url}`;
          }
          return {
            id: a.tender_id || item.id,
            title: a.title,
            category: a.category || "General",
            status: a.status || "Active",
            department: a.department || "Jammu Smart City Limited",
            publishedDate: a.published_date || "",
            closingDate: a.closing_date || "",
            estimatedCost: a.estimated_cost || "",
            description: a.description || "",
            href,
          };
        });
        setTenders(items);
        setError(null);
      })
      .catch((err) => {
        logError("SmartCityTenders", err);
        if (active) {
          setError("Unable to load tenders from server.");
          setTenders([]);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Filter lists dynamically
  const categories = useMemo(() => {
    return ["All", ...new Set(tenders.map((t) => t.category))].sort();
  }, [tenders]);

  const filteredTenders = useMemo(() => {
    return tenders.filter((tender) => {
      const matchesCategory =
        selectedCategory === "All" || tender.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "All" || tender.status === selectedStatus;
      const matchesSearch =
        tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(tender.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tender.department && tender.department.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [tenders, selectedCategory, selectedStatus, searchQuery]);

  // Statistics counters
  const stats = useMemo(() => {
    const activeCount = tenders.filter((t) => t.status === "Active").length;
    const evaluationCount = tenders.filter((t) => t.status === "Under Evaluation").length;
    const awardedCount = tenders.filter((t) => t.status === "Awarded").length;
    return {
      total: tenders.length,
      active: activeCount,
      evaluation: evaluationCount,
      awarded: awardedCount,
    };
  }, [tenders]);

  const hasActiveFilters = selectedCategory !== "All" || selectedStatus !== "All" || searchQuery.trim() !== "";

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedStatus("All");
    setSearchQuery("");
  };

  return (
    <SubpageTemplate
      title="Jammu Smart City Limited Tenders"
      breadcrumb={[
        { name: "Smart City", to: "/smart-city" },
        { name: "Tenders" },
      ]}
    >
      <div className="space-y-6">
        
        {/* ── Stats Dashboard ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total Tenders",
              value: stats.total,
              color: "text-[#002B5E]",
              bg: "bg-[#002B5E]/5 border-[#002B5E]/10",
              icon: (
                <svg className="w-5 h-5 text-[#002B5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
            },
            {
              label: "Active Tenders",
              value: stats.active,
              color: "text-emerald-700",
              bg: "bg-emerald-50 border-emerald-100",
              icon: (
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            },
            {
              label: "Under Evaluation",
              value: stats.evaluation,
              color: "text-amber-700",
              bg: "bg-amber-50 border-amber-100",
              icon: (
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              ),
            },
            {
              label: "Contract Awarded",
              value: stats.awarded,
              color: "text-indigo-700",
              bg: "bg-indigo-50 border-indigo-100",
              icon: (
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              ),
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl border p-4 flex items-center justify-between ${stat.bg}`}
            >
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  {stat.label}
                </span>
                <span className={`text-2xl font-black ${stat.color}`}>
                  {loading ? "..." : stat.value}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0 border border-slate-100">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* ── Info Banner ── */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border-l-4 border-[#FF6600] border-y border-r border-slate-100">
          <h2 className="text-base font-bold text-[#003366] mb-1">
            Jammu Smart City Limited (JSCL) Tenders
          </h2>
          <p className="text-slate-600 text-xs leading-relaxed">
            Jammu Smart City Limited invites competitive bids for smart infrastructure, IT solutions, legacy restoration, and sustainability projects. Browse active procurement contracts and track statuses below. Click any tender title or the "View" button to download detailed bidding terms on the e-Tendering portal.
          </p>
        </div>

        {/* ── Toolbar: Search & Filters ── */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-3.5 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by tender ID, title, scope..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002B5E]/10 focus:border-[#002B5E] transition-all bg-slate-50/50"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto min-w-[140px] px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002B5E]/10 focus:border-[#002B5E] bg-white cursor-pointer"
              >
                <option value="All">All Categories</option>
                {categories.filter(c => c !== "All").map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full sm:w-auto min-w-[145px] px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002B5E]/10 focus:border-[#002B5E] bg-white cursor-pointer"
              >
                <option value="All">All Statuses</option>
                {ALL_STATUSES.filter(s => s !== "All").map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Content Grid / List ── */}
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <TenderSkeletonCard key={idx} />
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-5 text-center">
            <svg className="w-10 h-10 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h4 className="text-sm font-extrabold text-red-800 uppercase tracking-wider mb-1">Failed to Sync Tenders</h4>
            <p className="text-xs text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors"
            >
              Retry Connection
            </button>
          </div>
        ) : filteredTenders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/60 p-12 text-center shadow-sm">
            <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-800 font-bold text-sm">No tenders match your selection</p>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">Try resetting filters or modifying search keywords to locate smart city listings.</p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-[#002B5E] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl hover:bg-[#FF6600] transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
              <span>Showing {filteredTenders.length} active listings</span>
              <span>Sorted by Date (Newest First)</span>
            </div>
            
            <div className="space-y-4">
              {filteredTenders.map((tender, idx) => (
                <TenderCard key={tender.id || idx} tender={tender} idx={idx} />
              ))}
            </div>
          </div>
        )}

        {/* ── Official Footer Info Note ── */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 mt-0.5 text-blue-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#002B5E] mb-1">Official Bidding Notice</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              All Smart City tenders are officially hosted and handled on the Jammu &amp; Kashmir Government e-Procurement Portal. Bidders must register and submit proposal files directly at{' '}
              <a
                href="https://jktenders.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF6600] font-semibold hover:underline"
              >
                jktenders.gov.in
              </a>. Please check the official portal frequently for clarifications, corrigenda, or extension updates.
            </p>
          </div>
        </div>
        
      </div>

      <style>{`
        .tender-dashboard-card {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 2px 4px -2px rgba(0, 0, 0, 0.01);
        }
        .tender-dashboard-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -10px rgba(0, 43, 94, 0.04), 0 4px 12px -5px rgba(0, 0, 0, 0.01);
          border-color: #002B5E/20;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </SubpageTemplate>
  );
}
