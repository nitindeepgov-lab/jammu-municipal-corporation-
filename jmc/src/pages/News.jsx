import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SubpageTemplate from "../components/SubpageTemplate";
import { getBulletinItemById } from "../services/strapiApi";
import { PROD_STRAPI_URL } from "../config/api";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || PROD_STRAPI_URL;

function Skeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-10 bg-gray-200 rounded w-3/4" />
      <div className="h-5 bg-gray-100 rounded w-1/3" />
      <div className="h-64 bg-gray-200 rounded-xl" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-5/6" />
        <div className="h-4 bg-gray-100 rounded w-4/6" />
      </div>
    </div>
  );
}

export default function News() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getBulletinItemById(id)
      .then((res) => setItem(res.data?.data || null))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  const imageUrl = item?.image?.url ? `${STRAPI_URL}${item.image.url}` : null;

  return (
    <SubpageTemplate
      title="News & Press Releases"
      breadcrumb={[{ name: "News & Press Releases", to: null }]}
    >
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-8">
          <Skeleton />
        </div>
      ) : error || !item ? (
        <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
          </div>
          <p className="text-gray-500">This news item could not be loaded.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-[#003366] hover:text-[#FF6600] font-medium text-sm transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      ) : (
        <article className="space-y-0 rounded-xl overflow-hidden shadow-md border border-gray-100">
          {/* ── Hero banner: image OR gradient ── */}
          {imageUrl ? (
            <div className="relative h-40 sm:h-56 overflow-hidden">
              <img
                src={imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001f44dd] via-[#003366aa] to-transparent" />
              <div className="absolute top-3 left-3 sm:left-4">
                <span className="inline-flex items-center gap-1 bg-[#FF6600] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                  Press Release
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-3 sm:px-5 py-3 sm:py-4">
                <p className="text-[#FF9933] text-[10px] font-semibold uppercase tracking-widest mb-1">
                  {item.release_date}
                </p>
                <h1 className="text-white text-sm sm:text-lg font-bold leading-snug drop-shadow">
                  {item.title}
                </h1>
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden bg-gradient-to-br from-[#001f44] via-[#003366] to-[#00509e] px-4 sm:px-5 py-5 sm:py-6">
              <div className="absolute -top-8 -right-8 w-36 h-36 bg-white/5 rounded-full" />
              <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-[#FF6600]/10 rounded-full" />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1 bg-[#FF6600] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-3 shadow">
                  Press Release
                </span>
                <p className="text-[#FF9933] text-[10px] font-semibold uppercase tracking-widest mb-1.5">
                  {item.release_date}
                </p>
                <h1 className="text-white text-sm sm:text-lg font-bold leading-snug max-w-2xl">
                  {item.title}
                </h1>
              </div>
            </div>
          )}

          {/* ── Meta strip ── */}
          <div className="bg-[#f5f8fc] border-b border-gray-200 px-3 sm:px-5 py-2 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-[#003366]"
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
              {item.release_date}
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-[#003366]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5"
                />
              </svg>
              <span className="hidden sm:inline">
                Jammu Municipal Corporation
              </span>
              <span className="sm:hidden">JMC</span>
            </span>
          </div>

          {/* ── Body ── */}
          <div className="bg-white px-3 sm:px-5 py-4 sm:py-5 space-y-4 sm:space-y-5">
            {/* Description */}
            {item.description ? (
              <div className="text-gray-700 leading-relaxed whitespace-pre-line border-l-4 border-[#FF6600] pl-3 sm:pl-5 bg-orange-50/30 py-3 sm:py-4 pr-3 sm:pr-4 rounded-r-lg text-sm sm:text-base">
                {item.description}
              </div>
            ) : (
              <div className="text-gray-400 text-sm italic text-center py-4">
                No additional description provided.
              </div>
            )}

            {/* Official document link */}
            {item.link && (
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-[#003366]/5 border border-[#003366]/10">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#003366] flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide font-semibold">
                    Official Document / Reference
                  </p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#003366] hover:text-[#FF6600] font-semibold text-sm transition-colors break-all"
                  >
                    View Official Document →
                  </a>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-gray-100 pt-4 sm:pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-[#003366] hover:bg-[#002855] text-white text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-colors shadow-sm"
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Home
              </Link>

              <span className="text-xs text-gray-400 italic hidden sm:inline">
                Jammu Municipal Corporation — Official Press Release
              </span>
            </div>
          </div>

          {/* ── Bottom accent bar ── */}
          <div className="h-1 bg-gradient-to-r from-[#003366] via-[#FF6600] to-[#003366]" />
        </article>
      )}
    </SubpageTemplate>
  );
}
