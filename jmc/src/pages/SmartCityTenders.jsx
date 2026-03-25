import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SubpageTemplate from "../components/SubpageTemplate";
import { getSmartCityTenders } from "../services/strapiApi";
import { logError } from "../utils/errorLogger";

const STATUS_COLORS = {
  Active: "bg-green-100 text-green-700 border-green-200",
  "Under Evaluation": "bg-amber-100 text-amber-700 border-amber-200",
  Awarded: "bg-blue-100 text-blue-700 border-blue-200",
  Closed: "bg-gray-100 text-gray-600 border-gray-200",
  Cancelled: "bg-red-100 text-red-600 border-red-200",
};

const ALL_STATUSES = [
  "All",
  "Active",
  "Under Evaluation",
  "Awarded",
  "Closed",
  "Cancelled",
];

export default function SmartCityTenders() {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    getSmartCityTenders()
      .then((res) => {
        const items = (res.data?.data || []).map((item) => {
          const a = item.attributes || item;
          return {
            id: a.tender_id || item.id,
            title: a.title,
            category: a.category || "General",
            status: a.status || "Active",
            department: a.department || "",
            publishedDate: a.published_date || "",
            closingDate: a.closing_date || "",
            estimatedCost: a.estimated_cost || "",
            description: a.description || "",
          };
        });
        setTenders(items);
        setError(null);
      })
      .catch((err) => {
        logError("SmartCityTenders", err);
        setError("Unable to load tenders from server.");
        setTenders([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Derived data
  const categories = ["All", ...new Set(tenders.map((t) => t.category))];
  const filteredTenders = tenders.filter((tender) => {
    const matchesCategory =
      selectedCategory === "All" || tender.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All" || tender.status === selectedStatus;
    const matchesSearch =
      tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(tender.id).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const activeTenders = tenders.filter((t) => t.status === "Active").length;
  const underEvaluation = tenders.filter(
    (t) => t.status === "Under Evaluation",
  ).length;
  const awardedTenders = tenders.filter((t) => t.status === "Awarded").length;

  return (
    <SubpageTemplate
      title="Jammu Smart City Limited Tenders"
      breadcrumb={[
        { name: "Smart City", to: "/smart-city" },
        { name: "Tenders" },
      ]}
    >
      <div className="space-y-5">
        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              label: "Total Tenders",
              value: tenders.length,
              color: "#003366",
              bg: "#eef2f7",
              icon: "📋",
            },
            {
              label: "Active",
              value: activeTenders,
              color: "#16a34a",
              bg: "#f0fdf4",
              icon: "🟢",
            },
            {
              label: "Under Evaluation",
              value: underEvaluation,
              color: "#d97706",
              bg: "#fffbeb",
              icon: "🔍",
            },
            {
              label: "Awarded",
              value: awardedTenders,
              color: "#2563eb",
              bg: "#eff6ff",
              icon: "✅",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
          <h2 className="text-lg font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
            About Smart City Tenders
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            Jammu Smart City Limited (JSCL) invites proposals and bids for
            various infrastructure, IT, and urban development projects under the
            Smart Cities Mission. All tenders follow the Government of India
            procurement guidelines and e-tendering procedures.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/smart-city"
              className="inline-flex items-center gap-1.5 border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              Smart City Projects
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
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
              <input
                type="text"
                placeholder="Search tenders by title or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]/20 focus:border-[#003366] transition-colors"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]/20 focus:border-[#003366] bg-white cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]/20 focus:border-[#003366] bg-white cursor-pointer"
            >
              {ALL_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s === "All" ? "All Statuses" : s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow-sm p-10 text-center border border-gray-100">
            <div className="inline-block w-8 h-8 border-3 border-gray-200 border-t-[#003366] rounded-full animate-spin mb-3" />
            <p className="text-gray-500 text-sm">
              Loading tenders from server...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
              </svg>
              <div>
                <h4 className="text-sm font-semibold text-amber-800 mb-1">
                  Could not load tenders
                </h4>
                <p className="text-xs text-amber-700">
                  Please try again later or check back shortly.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tenders List */}
        {!loading && !error && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-600">
                Showing {filteredTenders.length} of {tenders.length} tenders
              </h3>
            </div>

            {filteredTenders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-10 text-center border border-gray-100">
                <svg
                  className="w-12 h-12 mx-auto text-gray-300 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-gray-500 text-sm">
                  {tenders.length === 0
                    ? "No tenders available at the moment."
                    : "No tenders found matching your criteria."}
                </p>
                {tenders.length > 0 && (
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedStatus("All");
                      setSearchQuery("");
                    }}
                    className="mt-3 text-[#FF6600] text-sm font-medium hover:underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              filteredTenders.map((tender, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 overflow-hidden group"
                >
                  {/* Top accent */}
                  <div className="h-[3px] bg-gradient-to-r from-[#003366] via-[#0066cc] to-[#FF6600]" />

                  <div className="p-5">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                            {tender.id}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${STATUS_COLORS[tender.status] || STATUS_COLORS.Active}`}
                          >
                            {tender.status}
                          </span>
                          <span className="text-[10px] font-semibold text-[#003366] bg-blue-50 px-2 py-0.5 rounded">
                            {tender.category}
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-[#003366] leading-relaxed group-hover:text-[#0055a4] transition-colors">
                          • {tender.title}
                        </h3>
                      </div>
                    </div>

                    {/* Meta Row */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-3 border-t border-gray-100">
                      {tender.department && (
                        <div className="flex items-center gap-1.5">
                          <svg
                            className="w-3.5 h-3.5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"
                            />
                          </svg>
                          <span>{tender.department}</span>
                        </div>
                      )}
                      {tender.publishedDate && (
                        <div className="flex items-center gap-1.5">
                          <svg
                            className="w-3.5 h-3.5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>Published: {tender.publishedDate}</span>
                        </div>
                      )}
                      {tender.closingDate && (
                        <div className="flex items-center gap-1.5">
                          <svg
                            className="w-3.5 h-3.5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>Closing: {tender.closingDate}</span>
                        </div>
                      )}
                      {tender.estimatedCost && (
                        <div className="flex items-center gap-1.5 ml-auto">
                          <span className="font-semibold text-[#003366]">
                            {tender.estimatedCost}
                          </span>
                          <span className="text-gray-400">(Est.)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Info Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-[#003366] flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
            <div>
              <h4 className="text-sm font-semibold text-[#003366] mb-1">
                Note
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                All Smart City tenders are published through the official J&K
                e-Tendering portal. For detailed tender documents, eligibility
                criteria, and submission guidelines, please visit{" "}
                <a
                  href="https://jktenders.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF6600] font-semibold hover:underline"
                >
                  jktenders.gov.in
                </a>
                . Bidders are advised to regularly check the portal for
                corrigendum and addendum updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SubpageTemplate>
  );
}
