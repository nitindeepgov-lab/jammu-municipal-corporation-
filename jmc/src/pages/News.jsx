import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import SubpageTemplate from "../components/SubpageTemplate";
import { getBulletinItemById } from "../services/strapiApi";
import { PROD_STRAPI_URL } from "../config/api";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || PROD_STRAPI_URL;

/* ── Reading progress bar ── */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-gray-200/50">
      <div
        className="h-full bg-gradient-to-r from-[#002B5E] via-[#FF6600] to-[#FF8533] transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* ── Skeleton loader ── */
function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Image placeholder */}
        <div className="h-64 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
        {/* Meta strip */}
        <div className="px-6 py-4 border-b border-gray-100 flex gap-6">
          <div className="h-4 bg-gray-200 rounded w-28" />
          <div className="h-4 bg-gray-200 rounded w-44" />
        </div>
        {/* Body */}
        <div className="px-6 py-8 space-y-3">
          <div className="h-7 bg-gray-200 rounded w-3/4" />
          <div className="h-5 bg-gray-100 rounded w-1/2 mb-6" />
          <div className="space-y-2.5">
            {[100, 95, 87, 92, 78, 60].map((w, i) => (
              <div key={i} className={`h-3.5 bg-gray-100 rounded`} style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Error state ── */
function ErrorState() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-red-400 to-red-600" />
      <div className="p-12 text-center space-y-5">
        <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto">
          <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>
        <div>
          <p className="text-gray-800 font-bold text-lg">Article Not Found</p>
          <p className="text-gray-400 text-sm mt-1 max-w-xs mx-auto">
            This news item could not be loaded. It may have been moved or removed.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#002B5E] hover:bg-[#001f4d] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Home
        </Link>
      </div>
    </div>
  );
}

/* ── Share button ── */
function ShareButton({ title }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#002B5E] border border-slate-200 hover:border-[#002B5E]/30 px-3 py-1.5 rounded-lg transition-all hover:bg-slate-50"
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-green-600">Link Copied!</span>
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </>
      )}
    </button>
  );
}

/* ── Formatted date ── */
function formatDate(raw) {
  if (!raw) return null;
  try {
    const d = new Date(raw);
    return {
      full: d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
      short: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    };
  } catch {
    return { full: raw, short: raw };
  }
}

/* ═══════════════════════════════════════════
   Main News article page
═══════════════════════════════════════════ */
export default function News() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imgError, setImgError] = useState(false);
  const articleRef = useRef(null);

  const [prevId, setPrevId] = useState(id);

  if (id !== prevId) {
    setPrevId(id);
    setLoading(true);
    setError(false);
    setItem(null);
    setImgError(false);
  }

  useEffect(() => {
    getBulletinItemById(id)
      .then((res) => setItem(res.data?.data || null))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  const imageUrl = item?.image?.url && !imgError ? `${STRAPI_URL}${item.image.url}` : null;
  const date = formatDate(item?.release_date);

  /* Estimate reading time from description */
  const readingTime = item?.description
    ? Math.max(1, Math.ceil(item.description.split(/\s+/).length / 200))
    : null;

  return (
    <>
      <ReadingProgress />
      <SubpageTemplate
        title="News & Press Releases"
        breadcrumb={[{ name: "News & Press Releases" }]}
      >
        {loading ? (
          <Skeleton />
        ) : error || !item ? (
          <ErrorState />
        ) : (
          <article ref={articleRef} className="space-y-4">

            {/* ── Hero card ── */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">

              {/* Image / gradient hero */}
              {imageUrl ? (
                <div className="relative h-56 sm:h-72 md:h-80 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={item.title}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                  {/* Layered gradients for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#001f44]/40 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 bg-[#FF6600] text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Press Release
                    </span>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 px-5 sm:px-8 py-5 sm:py-7">
                    {date && (
                      <p className="text-[#FF9933] text-[10px] font-bold uppercase tracking-widest mb-2">
                        {date.full}
                      </p>
                    )}
                    <h1 className="text-white text-lg sm:text-2xl font-extrabold leading-snug drop-shadow-md max-w-3xl">
                      {item.title}
                    </h1>
                  </div>
                </div>
              ) : (
                /* No image — premium gradient banner */
                <div className="relative overflow-hidden bg-gradient-to-135 from-[#001a33] via-[#002B5E] to-[#003d85] px-5 sm:px-8 py-8 sm:py-12"
                  style={{ background: 'linear-gradient(135deg, #001a33 0%, #002B5E 50%, #003d85 100%)' }}>
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF6600]/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute top-4 right-4 opacity-5 pointer-events-none">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="white">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
                    </svg>
                  </div>

                  <div className="relative z-10 max-w-3xl">
                    <span className="inline-flex items-center gap-1.5 bg-[#FF6600] text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Press Release
                    </span>
                    {date && (
                      <p className="text-blue-300/80 text-xs font-semibold uppercase tracking-widest mb-2">
                        {date.full}
                      </p>
                    )}
                    <h1 className="text-white text-xl sm:text-3xl font-extrabold leading-tight">
                      {item.title}
                    </h1>
                  </div>
                </div>
              )}

              {/* ── Meta strip ── */}
              <div className="px-5 sm:px-8 py-3 bg-slate-50/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  {/* Date */}
                  {date && (
                    <span className="flex items-center gap-1.5 font-semibold">
                      <svg className="w-3.5 h-3.5 text-[#002B5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {date.short}
                    </span>
                  )}
                  {/* Publisher */}
                  <span className="flex items-center gap-1.5 font-semibold">
                    <svg className="w-3.5 h-3.5 text-[#002B5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5" />
                    </svg>
                    <span className="hidden sm:inline">Jammu Municipal Corporation</span>
                    <span className="sm:hidden">JMC</span>
                  </span>
                  {/* Reading time */}
                  {readingTime && (
                    <span className="flex items-center gap-1.5 font-semibold">
                      <svg className="w-3.5 h-3.5 text-[#002B5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {readingTime} min read
                    </span>
                  )}
                </div>
                {/* Share */}
                <ShareButton title={item.title} />
              </div>

              {/* ── Article body ── */}
              <div className="px-5 sm:px-8 py-6 sm:py-8">

                {/* Title (shown below image, above body when image present) */}
                {imageUrl && (
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#002B5E] leading-snug mb-5 border-l-4 border-[#FF6600] pl-4">
                    {item.title}
                  </h2>
                )}

                {/* Description */}
                {item.description ? (
                  <div className="prose prose-slate prose-sm sm:prose-base max-w-none">
                    {item.description.split(/\n\n+/).map((para, i) => (
                      <p key={i} className="text-gray-700 leading-loose text-sm sm:text-[15px] mb-4 last:mb-0">
                        {para}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 py-6 px-5 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 text-sm italic">
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    No additional description provided for this press release.
                  </div>
                )}

                {/* ── Official document link ── */}
                {item.link && (
                  <div className="mt-7 flex items-center gap-4 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#002B5E]/5 to-[#FF6600]/5 border border-[#002B5E]/10">
                    <div className="w-11 h-11 rounded-xl bg-[#002B5E] flex items-center justify-center flex-shrink-0 shadow">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">
                        Official Reference Document
                      </p>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#002B5E] hover:text-[#FF6600] font-bold text-sm transition-colors break-all leading-snug"
                      >
                        View Official Document →
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Footer bar ── */}
              <div className="px-5 sm:px-8 py-4 bg-slate-50/60 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-[#002B5E] hover:bg-[#001f4d] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Home
                </Link>
                <p className="text-xs text-slate-400 font-medium hidden sm:block">
                  Jammu Municipal Corporation — Official Press Release
                </p>
              </div>

              {/* ── Bottom accent ── */}
              <div className="h-1 bg-gradient-to-r from-[#002B5E] via-[#FF6600] to-[#002B5E]" />
            </div>

            {/* ── Disclaimer note ── */}
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200/80 rounded-xl">
              <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <p className="text-xs text-amber-700 leading-relaxed font-medium">
                This is an official press release published by Jammu Municipal Corporation. For queries, please contact the JMC Public Relations office or visit{" "}
                <a href="https://jmc.jk.gov.in" target="_blank" rel="noopener noreferrer" className="underline font-bold">
                  jmc.jk.gov.in
                </a>.
              </p>
            </div>

          </article>
        )}
      </SubpageTemplate>
    </>
  );
}
