import { useEffect, useState } from "react";
import SubpageTemplate from "../components/SubpageTemplate";
import { getCouncillors } from "../services/strapiApi";
import localData from "../assets/data.js";

// Party colour mapping
const PARTY_STYLES = {
  BJP: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    border: "border-orange-300",
  },
  CONGRESS: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-300",
  },
  INDEPENDENT: {
    bg: "bg-gray-100",
    text: "text-gray-600",
    border: "border-gray-300",
  },
};

function partyStyle(name = "") {
  const upper = name.toUpperCase().trim();
  return (
    PARTY_STYLES[upper] || {
      bg: "bg-slate-100",
      text: "text-slate-700",
      border: "border-slate-300",
    }
  );
}

function Avatar({ name, photoUrl }) {
  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={name}
        className="w-16 h-20 object-cover rounded shadow-sm border border-gray-200"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=128&background=002B5E&color=fff&bold=true`;
        }}
      />
    );
  }
  return (
    <img
      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=128&background=002B5E&color=fff&bold=true`}
      alt={name}
      className="w-16 h-20 object-cover rounded shadow-sm border border-gray-200"
    />
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"
          />
        </svg>
      </div>
      <p className="text-gray-500 text-sm">
        No councillors found for this ward.
      </p>
    </div>
  );
}

export default function CouncillorDetails() {
  const [councillors, setCouncillors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWard, setSelectedWard] = useState("all");
  const [source, setSource] = useState("cms"); // 'cms' | 'local'

  useEffect(() => {
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
      .catch(() => {
        setCouncillors(localData);
        setSource("local");
      })
      .finally(() => setLoading(false));
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
            : `${import.meta.env.VITE_STRAPI_URL || "http://localhost:1337"}${c.photo.url}`
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

  return (
    <SubpageTemplate
      title="Councillor Details"
      breadcrumb={[
        { name: "Ex Municipal Councillor", to: "/councillor-details" },
        { name: "Councillor Details" },
      ]}
    >
      <div className="space-y-6">
        {/* Header + filter bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#002B5E] border-b-2 border-[#FF6600] pb-1 inline-block">
              Ex-Municipal Councillor Details
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Ward-wise details of ex-municipal councillors of Jammu Municipal
              Corporation
            </p>
          </div>

          {/* Ward filter */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <label
              htmlFor="ward-filter"
              className="text-sm font-medium text-gray-600 whitespace-nowrap"
            >
              Select Ward No.
            </label>
            <select
              id="ward-filter"
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#002B5E] focus:border-[#002B5E] transition-all"
            >
              <option value="all">All Wards</option>
              {Array.from({ length: 75 }, (_, i) => (
                <option key={i + 1} value={String(i + 1)}>
                  Ward {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats bar */}
        {!loading && (
          <div className="flex items-center gap-4 text-xs text-gray-500 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2.5">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#002B5E] inline-block" />
              <strong className="text-[#002B5E]">{filtered.length}</strong>{" "}
              councillor{filtered.length !== 1 ? "s" : ""} shown
            </span>
            {selectedWard !== "all" && (
              <button
                onClick={() => setSelectedWard("all")}
                className="ml-auto text-[#FF6600] hover:underline font-medium"
              >
                ✕ Clear filter
              </button>
            )}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block w-8 h-8 border-2 border-[#002B5E] border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-gray-400 text-sm">Loading councillors...</p>
          </div>
        )}

        {/* Desktop Table */}
        {!loading && filtered.length > 0 && (
          <>
            <div className="hidden md:block overflow-x-auto rounded-lg shadow-sm border border-gray-200">
              <table className="w-full min-w-[700px] border-collapse text-sm">
                <thead>
                  <tr className="bg-[#002B5E] text-white">
                    <th className="px-4 py-3 text-center font-semibold text-xs uppercase tracking-wider w-16">
                      Ward No.
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider w-48">
                      Name & Photo
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-xs uppercase tracking-wider w-28">
                      Party Name
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider w-36">
                      Email Id
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider w-40">
                      Contact No.
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((c, idx) => {
                    const ps = partyStyle(c.party_name);
                    return (
                      <tr
                        key={c.ward_no}
                        className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-blue-50 transition-colors duration-150`}
                      >
                        {/* Ward No */}
                        <td className="px-4 py-4 text-center">
                          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#002B5E] text-white font-bold text-xs shadow-sm">
                            {c.ward_no}
                          </span>
                        </td>

                        {/* Name + Photo */}
                        <td className="px-4 py-4">
                          <div className="flex items-start gap-3">
                            <Avatar name={c.name} photoUrl={c.photoUrl} />
                            <div className="min-w-0 pt-1">
                              <p className="font-semibold text-[#002B5E] text-[13px] leading-snug">
                                {c.name}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Party */}
                        <td className="px-4 py-4 text-center">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${ps.bg} ${ps.text} ${ps.border}`}
                          >
                            {c.party_name || "—"}
                          </span>
                        </td>

                        {/* Address */}
                        <td className="px-4 py-4 text-gray-600 text-[13px] leading-snug max-w-xs">
                          {c.address || (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>

                        {/* Email */}
                        <td className="px-4 py-4 text-[13px]">
                          {c.email_id ? (
                            <a
                              href={`mailto:${c.email_id}`}
                              className="text-[#002B5E] hover:text-[#FF6600] hover:underline break-all"
                            >
                              {c.email_id}
                            </a>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>

                        {/* Contact */}
                        <td className="px-4 py-4 text-[13px] text-gray-700 font-medium">
                          {c.contact_no || (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {filtered.map((c) => {
                const ps = partyStyle(c.party_name);
                return (
                  <div
                    key={c.ward_no}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Card Header */}
                    <div className="bg-[#002B5E] px-4 py-2.5 flex items-center justify-between">
                      <span className="text-white font-bold text-sm">
                        Ward {c.ward_no}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${ps.bg} ${ps.text} ${ps.border}`}
                      >
                        {c.party_name || "—"}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="px-4 py-4 flex gap-4">
                      <div className="flex-shrink-0">
                        <Avatar name={c.name} photoUrl={c.photoUrl} />
                      </div>
                      <div className="min-w-0 space-y-2 text-sm">
                        <p className="font-bold text-[#002B5E] leading-snug">
                          {c.name}
                        </p>

                        {c.address && (
                          <div className="flex gap-2 text-gray-600">
                            <svg
                              className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#FF6600]"
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
                            <span className="text-xs leading-relaxed">
                              {c.address}
                            </span>
                          </div>
                        )}

                        {c.contact_no && (
                          <div className="flex gap-2 text-gray-600">
                            <svg
                              className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#FF6600]"
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
                            <span className="text-xs">{c.contact_no}</span>
                          </div>
                        )}

                        {c.email_id && (
                          <div className="flex gap-2 text-gray-600">
                            <svg
                              className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#FF6600]"
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
                            <a
                              href={`mailto:${c.email_id}`}
                              className="text-xs text-[#002B5E] hover:underline break-all"
                            >
                              {c.email_id}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && <EmptyState />}

        {/* Footer note */}
        {!loading && (
          <p className="text-center text-xs text-gray-400 pb-2">
            * Details of Ex-Municipal Councillors elected during the term
            2018–2023 under Jammu Municipal Corporation.
          </p>
        )}
      </div>
    </SubpageTemplate>
  );
}
