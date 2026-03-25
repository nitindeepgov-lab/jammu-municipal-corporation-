import { useState, useEffect } from "react";
import SubpageTemplate from "../components/SubpageTemplate";
import {
  getNotices,
  getTenders,
  getBulletinItems,
} from "../services/strapiApi";
import { STRAPI_URL } from "../config/api";
import { formatDate } from "../utils/dateFormatter";
import { logError } from "../utils/errorLogger";

const tabs = [
  { id: "public", label: "Public Notices" },
  { id: "tender", label: "Tenders" },
  { id: "council", label: "Council Updates" },
];

export default function Notices() {
  const [active, setActive] = useState("public");
  const [notices, setNotices] = useState({
    public: [],
    tender: [],
    council: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mapNoticeItems = (res) =>
      (res.data?.data || []).map((item) => {
        const a = item.attributes || item;
        let href = a.link || "#";
        if (a.document?.data?.attributes?.url) {
          href = `${STRAPI_URL}${a.document.data.attributes.url}`;
        } else if (a.document?.url) {
          href = `${STRAPI_URL}${a.document.url}`;
        }
        return { title: a.title, date: formatDate(a.notice_date), href };
      });

    const mapBulletinItems = (res) =>
      (res.data?.data || []).map((item) => {
        const a = item.attributes || item;
        let href = a.link || "#";
        if (a.document?.data?.attributes?.url) {
          href = `${STRAPI_URL}${a.document.data.attributes.url}`;
        } else if (a.document?.url) {
          href = `${STRAPI_URL}${a.document.url}`;
        }
        return {
          title: a.title,
          date: formatDate(a.release_date || a.notice_date),
          href,
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
        return { title: a.title, date: formatDate(a.tender_date), href };
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
      title="Notices &amp; Tenders"
      breadcrumb={[{ name: "Notices & Tenders" }]}
    >
      <div>
        <div className="bg-white rounded shadow-sm overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`px-6 py-4 text-sm font-semibold transition-colors border-b-2 ${
                  active === tab.id
                    ? "border-[#FF6600] text-[#FF6600] bg-orange-50"
                    : "border-transparent text-gray-600 hover:text-[#003366] hover:bg-gray-50"
                }`}
              >
                {tab.label}
                {notices[tab.id]?.length > 0 && (
                  <span className="ml-2 text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full font-bold">
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
              <div className="py-12 text-center">
                <div className="inline-block w-8 h-8 border-3 border-gray-200 border-t-[#003366] rounded-full animate-spin mb-3" />
                <p className="text-gray-500 text-sm">Loading...</p>
              </div>
            )}

            {/* Notice list */}
            {!loading && (
              <>
                {currentItems.length === 0 ? (
                  <div className="py-12 text-center">
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
                      No{" "}
                      {tabs.find((t) => t.id === active)?.label.toLowerCase()}{" "}
                      available at the moment.
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {currentItems.map((notice, idx) => (
                      <li key={idx} className="py-4 flex items-start gap-4">
                        <div className="flex-shrink-0 bg-[#003366] text-white text-center px-3 py-1.5 rounded text-xs min-w-[80px]">
                          {notice.date}
                        </div>
                        <div className="flex-1">
                          <a
                            href={notice.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#003366] hover:text-[#FF6600] text-sm font-medium hover:underline transition-colors"
                          >
                            <span className="text-[#FF6600] mr-1">►</span>
                            {notice.title}
                          </a>
                        </div>
                        <a
                          href={notice.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 border border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white text-xs px-3 py-1 rounded transition-colors"
                        >
                          View
                        </a>
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
