import { useMemo, useState, useEffect, useCallback } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { STRAPI_URL } from "../../config/api";
import { getMinisters } from "../../services/strapiApi";
import { logError } from "../../utils/errorLogger";

function getMediaUrl(path) {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${STRAPI_URL}${path}`;
}

function normaliseCmsMinister(item) {
  const entry = item?.attributes || item;
  const media =
    entry?.image?.data?.attributes || entry?.image?.data || entry?.image;
  const imageUrl = getMediaUrl(media?.url || media?.formats?.thumbnail?.url);

  return {
    image: imageUrl,
    title: entry?.title || "",
    name: entry?.name || "",
    gender: entry?.gender || "M",
    is_active: entry?.is_active,
    social: {
      facebook: entry?.facebook || "#",
      twitter: entry?.twitter || "#",
      linkedin: entry?.linkedin || "#",
    },
  };
}

function isValidSocialUrl(url) {
  if (!url || url === "#") return false;
  return url.startsWith("http://") || url.startsWith("https://");
}

function MinisterCard({ minister }) {
  const honorific = minister.gender === "F" ? "Ms." : "Mr.";
  const socialLinks = [
    {
      key: "facebook",
      url: minister.social?.facebook,
      icon: FaFacebookF,
      label: "Facebook",
    },
    {
      key: "twitter",
      url: minister.social?.twitter,
      icon: FaTwitter,
      label: "Twitter",
    },
    {
      key: "linkedin",
      url: minister.social?.linkedin,
      icon: FaLinkedinIn,
      label: "LinkedIn",
    },
  ].filter((item) => isValidSocialUrl(item.url));

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm flex flex-col items-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_-12px_rgba(0,51,102,0.15)] hover:border-[#003366]/20">
      <div className="mb-4 relative">
        <div className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center rounded-full overflow-hidden border-[3px] border-gray-200 group-hover:border-[#FF6600]/50 transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <img
            src={
              minister.image ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(minister.name)}&size=256&background=f3f4f6&color=003366`
            }
            alt={minister.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(minister.name)}&size=256&background=f3f4f6&color=003366`;
            }}
          />
        </div>
        {/* Online indicator */}
        <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-sm" />
      </div>
      <div className="text-center mb-4 flex-1 w-full">
        <h3 className="text-[13px] font-bold text-[#003366] mb-1.5 leading-tight">
          {minister.title}
        </h3>
        <p className="text-xs text-gray-600 font-medium">
          {honorific} {minister.name}
        </p>
      </div>
      {socialLinks.length > 0 && (
        <div className="w-full flex items-center justify-center gap-2">
          {socialLinks.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.key}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${minister.name} on ${item.label}`}
                className="w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:text-[#003366] hover:border-[#003366]/40 hover:bg-[#003366]/5 transition-colors duration-200 flex items-center justify-center"
              >
                <IconComponent className="w-3.5 h-3.5" />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MinistersCarousel() {
  const [ministerSlides, setMinisterSlides] = useState([]);
  const [currentPair, setCurrentPair] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  const allSlides = useMemo(() => {
    if (ministerSlides.length === 0) return [];
    return [...ministerSlides, ministerSlides[0]];
  }, [ministerSlides]);

  const totalPairs = Math.max(1, Math.ceil(allSlides.length / 2));

  useEffect(() => {
    let isMounted = true;

    getMinisters()
      .then((res) => {
        const data = res?.data?.data || [];
        const cmsSlides = data
          .map(normaliseCmsMinister)
          .filter((item) => item.name && item.title)
          .filter((item) => item.is_active !== false);

        if (isMounted) setMinisterSlides(cmsSlides);
      })
      .catch((err) => {
        logError("MinistersCarousel", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const update = () =>
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const goTo = useCallback(
    (idx) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentPair(idx);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning],
  );

  const goNext = useCallback(() => {
    goTo((currentPair + 1) % totalPairs);
  }, [currentPair, totalPairs, goTo]);

  const goPrev = useCallback(() => {
    goTo((currentPair - 1 + totalPairs) % totalPairs);
  }, [currentPair, totalPairs, goTo]);

  // Auto-advance every 4 seconds (mobile only)
  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [goNext, isMobile]);

  // Get current pair of slides for mobile
  const currentSlides = useMemo(() => {
    if (allSlides.length === 0) return [];
    const startIdx = currentPair * 2;
    return allSlides.slice(startIdx, startIdx + 2);
  }, [allSlides, currentPair]);

  return (
    <div className="bg-white max-w-7xl mx-auto px-4 py-3">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 className="font-semibold text-lg text-gray-800 tracking-tight">
            Governing Bodies
          </h2>
        </div>

        {/* Navigation arrows — mobile only */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={goPrev}
            className="w-8 h-8 rounded-full border border-gray-200 hover:border-[#003366] hover:bg-[#003366] hover:text-white text-gray-400 flex items-center justify-center transition-all duration-200"
            aria-label="Previous"
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
          </button>
          <button
            onClick={goNext}
            className="w-8 h-8 rounded-full border border-gray-200 hover:border-[#003366] hover:bg-[#003366] hover:text-white text-gray-400 flex items-center justify-center transition-all duration-200"
            aria-label="Next"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-1 rounded-lg bg-white overflow-hidden">
        {loading ? (
          /* Skeleton shimmer while fetching */
          <div className="hidden md:flex md:gap-7">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="min-w-[210px] max-w-[230px] flex-1 bg-gray-100 rounded-2xl p-6 flex flex-col items-center animate-pulse">
                <div className="w-28 h-28 rounded-full bg-gray-200 mb-4" />
                <div className="h-3 w-3/4 bg-gray-200 rounded mb-2" />
                <div className="h-2.5 w-1/2 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : ministerSlides.length === 0 ? null : (
          <>
            {/* Desktop: horizontal scroll for many ministers */}
            <div className="hidden md:flex md:gap-7 md:overflow-x-auto md:pb-2 md:snap-x md:snap-mandatory [scrollbar-width:thin]">
              {ministerSlides.map((minister, idx) => (
                <div
                  key={idx}
                  className="min-w-[210px] max-w-[230px] flex-1 snap-start"
                >
                  <MinisterCard minister={minister} />
                </div>
              ))}
            </div>

            {/* Mobile: 2-column slideshow with pairs */}
            <div
              className="grid grid-cols-2 gap-4 md:hidden transition-opacity duration-500"
              style={{ opacity: isTransitioning ? 0 : 1 }}
            >
              {currentSlides.map((minister, idx) => (
                <MinisterCard
                  key={`${currentPair}-${idx}`}
                  minister={minister}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Dot indicators — mobile only */}
      {ministerSlides.length > 0 && (
        <div className="flex md:hidden justify-center gap-2 mt-4">
          {Array.from({ length: totalPairs }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentPair
                  ? "w-6 bg-[#003366]"
                  : "w-1.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
