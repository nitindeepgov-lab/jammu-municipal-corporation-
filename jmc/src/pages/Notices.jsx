import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SubpageTemplate from "../components/SubpageTemplate";
import {
  getNotices,
  getTenders,
  getBulletinItems,
} from "../services/strapiApi";
import { STRAPI_URL } from "../config/api";
import { formatDate } from "../utils/dateFormatter";
import { logError } from "../utils/errorLogger";
import { ArrowRight, FileText } from "lucide-react";

const tabs = [
  { id: "public", label: "Orders & Circulars" },
  { id: "tender", label: "Tenders" },
  { id: "council", label: "Council Updates" },
];

const parseDateParts = (dateStr) => {
  if (!dateStr) return { day: "", monthYear: "" };
  const parts = dateStr.split(" ");
  if (parts.length >= 3) {
    return { day: parts[0], monthYear: `${parts[1]} ${parts[2]}` };
  }
  return { day: dateStr, monthYear: "" };
};

function DateWidget({ dateStr }) {
  const { day, monthYear } = parseDateParts(dateStr);
  return (
    <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl py-2.5 px-3 min-w-[76px] shadow-sm select-none shrink-0 group-hover:bg-[#003366] group-hover:border-[#003366] transition-all duration-300">
      <span className="text-xl font-extrabold text-[#003366] group-hover:text-white leading-none tracking-tight">
        {day}
      </span>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-white/80 mt-1.5 leading-none">
        {monthYear}
      </span>
    </div>
  );
}

function getCategoryBadge(title) {
  const t = title.toLowerCase();
  if (t.includes("press release") || t.includes("press")) {
    return { label: "Press Release", bg: "bg-emerald-50 text-emerald-700 border-emerald-100/80" };
  }
  if (t.includes("circular")) {
    return { label: "Circular", bg: "bg-purple-50 text-purple-700 border-purple-100/80" };
  }
  if (t.includes("tender")) {
    return { label: "Tender", bg: "bg-amber-50 text-amber-700 border-amber-100/80" };
  }
  if (t.includes("notice")) {
    return { label: "Notice", bg: "bg-blue-50 text-blue-700 border-blue-100/80" };
  }
  return { label: "Document", bg: "bg-slate-50 text-slate-700 border-slate-100/80" };
}

export default function Notices() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [active, setActive] = useState(tabParam || "public");
  const [notices, setNotices] = useState({
    public: [],
    tender: [],
    council: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tabParam && ["public", "tender", "council"].includes(tabParam)) {
      setActive(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tabId) => {
    setActive(tabId);
    setSearchParams({ tab: tabId });
  };

  useEffect(() => {
    const cleanTitle = (str) => {
      if (!str) return "";
      return str.replace(/^[♦•►■➔\s]+/, "").trim();
    };

    const mapNoticeItems = (res) =>
      (res.data?.data || []).map((item) => {
        const a = item.attributes || item;
        let href = a.link || "#";
        if (a.document?.data?.attributes?.url) {
          href = `${STRAPI_URL}${a.document.data.attributes.url}`;
        } else if (a.document?.url) {
          href = `${STRAPI_URL}${a.document.url}`;
        }
        return { title: cleanTitle(a.title), date: formatDate(a.notice_date), href };
      });

    const mapBulletinItems = (res) =>
      (res.data?.data || []).map((item) => {
        const a = item.attributes || item;
        const id = item.documentId || item.id;
        const href = id ? `/notices/orders-circulars/${id}` : "#";
        return {
          title: cleanTitle(a.title),
          date: formatDate(a.release_date || a.notice_date),
          href,
          internal: true
        };
      });

    const mapTenderItems = (res) =>
      (res.data?.data || []).map((item) => {
        const a = item.attributes || item;
        let href = a.link || "#";
        if (a.document?.data?.attributes?.url) {
          href = `${STRAPI_URL}${a.document.data.attributes.url}`;
        } else if (a.document?.url) {
          href = `${STRAPI_URL}${a.document.url}`;
        }
        return { title: cleanTitle(a.title), date: formatDate(a.tender_date), href };
      });

    Promise.all([
      getBulletinItems().catch((err) => {
        logError("Notices - getBulletinItems", err);
        return { data: { data: [] } };
      }),
      getTenders().catch((err) => {
        logError("Notices - getTenders", err);
        return { data: { data: [] } };
      }),
      getNotices("council").catch((err) => {
        logError("Notices - getNotices", err);
        return { data: { data: [] } };
      }),
    ])
      .then(([bulletinRes, tenderRes, councilRes]) => {
        setNotices({
          public: mapBulletinItems(bulletinRes),
          tender: mapTenderItems(tenderRes),
          council: mapNoticeItems(councilRes),
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const currentItems = notices[active] || [];

  return (
    <SubpageTemplate
      title="Orders &amp; Circulars"
      breadcrumb={[{ name: "Notices & Tenders" }]}
    >
      <div>
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
          {/* Tab bar */}
          <div className="flex flex-wrap border-b border-slate-100 bg-slate-50/50 p-2.5 gap-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3 text-[13px] font-extrabold transition-all duration-300 rounded-2xl active:scale-95 select-none ${
                  active === tab.id
                    ? "bg-[#003366] text-white shadow-md shadow-[#003366]/10"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/60"
                }`}
              >
                {tab.label}
                {notices[tab.id]?.length > 0 && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black transition-all ${
                    active === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-200/80 text-slate-600"
                  }`}>
                    {notices[tab.id].length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Loading */}
            {loading && (
              <div className="py-16 text-center">
                <div className="inline-block w-8 h-8 border-3 border-slate-200 border-t-[#003366] rounded-full animate-spin mb-3" />
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Loading Updates…</p>
              </div>
            )}

            {/* Notice list */}
            {!loading && (
              <>
                {currentItems.length === 0 ? (
                  <div className="py-16 text-center">
                    <FileText className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                    <p className="text-slate-500 text-sm font-semibold">
                      No {tabs.find((t) => t.id === active)?.label.toLowerCase()} available at the moment.
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-3.5">
                    {currentItems.map((notice, idx) => (
                      <li
                        key={idx}
                        className="group relative bg-white hover:bg-slate-50/40 border border-slate-100 hover:border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.015)]"
                      >
                        {/* JMC Orange indicator */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-[#FF6600] rounded-l-2xl transition-colors duration-300" />
                        
                        <DateWidget dateStr={notice.date} />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2 select-none">
                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 border rounded-full ${getCategoryBadge(notice.title).bg}`}>
                              {getCategoryBadge(notice.title).label}
                            </span>
                          </div>
                          
                          {notice.internal ? (
                            <Link
                              to={notice.href}
                              className="text-slate-800 group-hover:text-[#003366] text-sm font-semibold hover:underline transition-colors block leading-snug"
                            >
                              {notice.title}
                            </Link>
                          ) : (
                            <a
                              href={notice.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-800 group-hover:text-[#003366] text-sm font-semibold hover:underline transition-colors block leading-snug"
                            >
                              {notice.title}
                            </a>
                          )}
                        </div>
                        
                        <div className="w-full sm:w-auto flex justify-end shrink-0 mt-3 sm:mt-0">
                          {notice.internal ? (
                            <Link
                              to={notice.href}
                              className="flex items-center gap-1.5 border border-[#FF6600]/25 text-[#FF6600] group-hover:bg-[#FF6600] group-hover:text-white text-xs font-black px-4 py-2 rounded-xl transition-all duration-300 active:scale-95 shadow-sm"
                            >
                              View
                              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                          ) : (
                            <a
                              href={notice.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 border border-[#FF6600]/25 text-[#FF6600] group-hover:bg-[#FF6600] group-hover:text-white text-xs font-black px-4 py-2 rounded-xl transition-all duration-300 active:scale-95 shadow-sm"
                            >
                              View
                              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </SubpageTemplate>
  );
}
