import { useEffect, useState } from "react";
import SubpageTemplate from "../components/SubpageTemplate";
import { getCouncillors } from "../services/strapiApi";
import { logError } from "../utils/errorLogger";
import localData from "../assets/data.js";

// Party colour mapping with more vibrant colors
const PARTY_STYLES = {
  BJP: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    dot: "bg-orange-500",
  },
  CONGRESS: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },
  INDEPENDENT: {
    bg: "bg-gray-50",
    text: "text-gray-600",
    border: "border-gray-200",
    dot: "bg-gray-400",
  },
};

function partyStyle(name = "") {
  const upper = name.toUpperCase().trim();
  return (
    PARTY_STYLES[upper] || {
      bg: "bg-slate-50",
      text: "text-slate-700",
      border: "border-slate-200",
      dot: "bg-slate-400",
    }
  );
}

function Avatar({ name, photoUrl }) {
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=128&background=002B5E&color=fff&bold=true`;

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#002B5E] to-[#FF6600] rounded opacity-20 group-hover:opacity-40 transition duration-300 blur-[1px]"></div>
      <div className="relative">
        <img
          src={photoUrl || fallbackUrl}
          alt={name}
          className="w-16 h-20 object-cover rounded shadow-sm border border-white bg-white"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackUrl;
          }}
        />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 animate-fadeIn">
      <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-sm">
        <svg
          className="w-10 h-10 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.123-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"
          />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-gray-700 mb-1">
        No Councillors Found
      </h3>
      <p className="text-gray-400 text-sm max-w-xs mx-auto">
        We couldn't find any councillors for the selected ward. Please try
        another ward.
      </p>
    </div>
  );
}

export default function CouncillorDetails() {
  const [councillors, setCouncillors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWard, setSelectedWard] = useState("all");
  const [source, setSource] = useState("cms"); // 'cms' | 'local'
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  useEffect(() => {
    // Set minimum loading time to 3 minutes (180000 milliseconds)
    const minLoadingTime = 180000; // 3 minutes
    const startTime = Date.now();

    getCouncillors()
      .then((res) => {
        const data = res.data.data || [];
        if (data.length > 0) {
          setCouncillors(data);
          setSource("cms");
        } else {
          setCouncillors(localData);
          setSource("local");
        }
      })
      .catch((err) => {
        logError("CouncillorDetails", err);
        setCouncillors(localData);
        setSource("local");
      })
      .finally(() => {
        // Calculate remaining time until 3 minutes have passed
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        // Set loading to false only after 3 minutes have passed
        setTimeout(() => {
          setLoading(false);
        }, remainingTime);
      });
  }, []);

  // Normalise a councillor entry regardless of source
  const normalise = (c) => {
    if (source === "cms") {
      return {
        ward_no: String(c.ward_no ?? ""),
        name: c.name,
        party_name: c.party_name || "",
        address: c.address || "",
        email_id: c.email_id || "",
        contact_no: c.contact_no || "",
        photoUrl: c.photo?.url
          ? c.photo.url.startsWith("http")
            ? c.photo.url
            : `${import.meta.env.VITE_STRAPI_URL || "http://localhost:1338"}${c.photo.url}`
          : null,
      };
    }
    return {
      ward_no: c.ward_no,
      name: c.name,
      party_name: c.party_name || "",
      address: c.address || "",
      email_id: c.email_id || "",
      contact_no: c.contact_no || "",
      photoUrl: null,
    };
  };

  const filtered = councillors
    .map(normalise)
    .filter((c) => selectedWard === "all" || c.ward_no === selectedWard);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <SubpageTemplate
      title="Councillor Details"
      breadcrumb={[
        { name: "Ex Municipal Councillor", to: "/councillor-details" },
        { name: "Councillor Details" },
      ]}
    >
      <div className="space-y-8 animate-fadeIn">
        {/* Enhanced Header + Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-black text-[#002B5E] tracking-tight">
                Ex-Municipal <span className="text-[#FF6600]">Councillor</span>{" "}
                Details
              </h2>
              <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
                Access ward-wise representative details for the Jammu Municipal
                Corporation. Search by ward number to find contact information
                and addresses.
              </p>
            </div>

            {/* Modern Ward Filter */}
            <div className="flex-shrink-0">
              <div className="relative group">
                <label
                  htmlFor="ward-filter"
                  className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1"
                >
                  Filter by Ward Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400 group-focus-within:text-[#002B5E] transition-colors"
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
                  </div>
                  <select
                    id="ward-filter"
                    value={selectedWard}
                    onChange={(e) => {
                      setSelectedWard(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="appearance-none w-full lg:w-64 pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#002B5E]/10 focus:border-[#002B5E] transition-all cursor-pointer"
                  >
                    <option value="all">All Wards (1-75)</option>
                    {Array.from({ length: 75 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1)}>
                        Ward No. {i + 1}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
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
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-[#FF6600] rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="mt-6 text-sm font-bold text-gray-400 uppercase tracking-widest">
              Fetching Data...
            </p>
          </div>
        )}

        {/* Desktop Table View */}
        {!loading && filtered.length > 0 && (
          <div className="hidden md:block">
            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center w-24">
                      Ward
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                      Representative Info
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">
                      Political Affiliation
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                      Address Details
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                      Contact Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginated.map((c) => {
                    const ps = partyStyle(c.party_name);
                    return (
                      <tr
                        key={c.ward_no}
                        className="group hover:bg-gray-50/50 transition-colors duration-200"
                      >
                        {/* Ward No */}
                        <td className="px-6 py-6 text-center">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#002B5E]/5 text-[#002B5E] font-black text-sm group-hover:bg-[#002B5E] group-hover:text-white transition-all duration-300">
                            {c.ward_no}
                          </div>
                        </td>

                        {/* Representative Name + Photo */}
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-4">
                            <Avatar name={c.name} photoUrl={c.photoUrl} />
                            <div className="space-y-0.5">
                              <p className="font-bold text-[#002B5E] text-sm tracking-tight leading-tight">
                                {c.name}
                              </p>
                              <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                                Councillor
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Party Badge */}
                        <td className="px-6 py-6 text-center">
                          <div
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border ${ps.bg} ${ps.text} ${ps.border} transition-all duration-300 group-hover:scale-105`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${ps.dot}`}
                            ></span>
                            {c.party_name || "Independent"}
                          </div>
                        </td>

                        {/* Address */}
                        <td className="px-6 py-6">
                          <p className="text-xs text-gray-600 leading-relaxed max-w-[200px]">
                            {c.address || (
                              <span className="text-gray-300 italic">
                                Not available
                              </span>
                            )}
                          </p>
                        </td>

                        {/* Contact Info */}
                        <td className="px-6 py-6">
                          <div className="space-y-2">
                            {c.contact_no && (
                              <div className="flex items-center gap-2 text-gray-700">
                                <div className="w-6 h-6 rounded-lg bg-green-50 flex items-center justify-center">
                                  <svg
                                    className="w-3 h-3 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                  </svg>
                                </div>
                                <span className="text-xs font-bold tracking-tight">
                                  {c.contact_no}
                                </span>
                              </div>
                            )}
                            {c.email_id && (
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
                                  <svg
                                    className="w-3 h-3 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                  </svg>
                                </div>
                                <a
                                  href={`mailto:${c.email_id}`}
                                  className="text-xs font-medium text-gray-500 hover:text-[#FF6600] transition-colors truncate max-w-[150px]"
                                >
                                  {c.email_id}
                                </a>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Mobile Cards View */}
        {!loading && filtered.length > 0 && (
          <div className="md:hidden space-y-4">
            {paginated.map((c) => {
              const ps = partyStyle(c.party_name);
              return (
                <div
                  key={c.ward_no}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="bg-[#002B5E] px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white text-xs font-black">
                        {c.ward_no}
                      </span>
                      <span className="text-white font-bold text-xs uppercase tracking-wider">
                        Ward Representative
                      </span>
                    </div>
                    <div
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${ps.bg} ${ps.text} ${ps.border}`}
                    >
                      {c.party_name || "Independent"}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <div className="flex gap-4 mb-5">
                      <Avatar name={c.name} photoUrl={c.photoUrl} />
                      <div className="min-w-0 flex flex-col justify-center">
                        <p className="font-black text-[#002B5E] text-lg leading-tight mb-1">
                          {c.name}
                        </p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          Ex-Municipal Councillor
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {c.address && (
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-xl bg-orange-50 flex-shrink-0 flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-[#FF6600]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                              Office Address
                            </p>
                            <p className="text-xs text-gray-600 leading-relaxed font-medium">
                              {c.address}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 gap-3 pt-2 border-t border-gray-50">
                        {c.contact_no && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-green-50 flex-shrink-0 flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                Contact
                              </p>
                              <p className="text-xs font-bold text-gray-700">
                                {c.contact_no}
                              </p>
                            </div>
                          </div>
                        )}

                        {c.email_id && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-blue-50 flex-shrink-0 flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                Email Address
                              </p>
                              <a
                                href={`mailto:${c.email_id}`}
                                className="text-xs font-bold text-[#002B5E] hover:text-[#FF6600] truncate block"
                              >
                                {c.email_id}
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && <EmptyState />}

        {/* Modern Pagination */}
        {!loading && filtered.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Showing page <span className="text-[#002B5E]">{currentPage}</span>{" "}
              of <span className="text-[#002B5E]">{totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>
              <button
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-[#002B5E] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#003366] shadow-sm shadow-[#002B5E]/20 transition-all active:scale-95"
              >
                Next
                <svg
                  className="w-4 h-4"
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
              </button>
            </div>
          </div>
        )}
      </div>
    </SubpageTemplate>
  );
}
