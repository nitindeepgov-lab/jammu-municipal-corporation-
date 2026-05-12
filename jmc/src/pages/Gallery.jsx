import { useEffect, useState } from "react";
import SubpageTemplate from "../components/SubpageTemplate";
import { getPhotoGalleryItems } from "../services/strapiApi";
import { STRAPI_URL } from "../config/api";
import { logError } from "../utils/errorLogger";

const resolveMediaUrls = (media) => {
  if (!media) return [];

  let items = [];
  if (Array.isArray(media)) {
    items = media;
  } else if (Array.isArray(media.data)) {
    items = media.data;
  } else if (media.data) {
    items = [media.data];
  } else {
    items = [media];
  }

  return items
    .map((item) => item?.url || item?.attributes?.url)
    .filter(Boolean)
    .map((url) => (url.startsWith("http") ? url : `${STRAPI_URL}${url}`));
};

const mapGalleryItems = (res) =>
  (res.data?.data || [])
    .map((item) => {
      const a = item.attributes || item;
      const images = resolveMediaUrls(a.images);
      if (images.length === 0) return null;
      return {
        id: item.id ?? item.documentId ?? a.id ?? a.documentId ?? images[0],
        title: a.title || "Photo Gallery",
        caption: a.caption || "",
        images,
      };
    })
    .filter(Boolean);

export default function Gallery() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getPhotoGalleryItems()
      .then((res) => {
        setAlbums(mapGalleryItems(res));
        setError(false);
      })
      .catch((err) => {
        logError("Gallery - getPhotoGalleryItems", err);
        setAlbums([]);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const openAlbum = (album, index = 0) => {
    setActiveAlbum(album);
    setActiveIndex(index);
  };

  const closeAlbum = () => {
    setActiveAlbum(null);
    setActiveIndex(0);
  };

  const showPrev = () => {
    if (!activeAlbum) return;
    setActiveIndex(
      (prev) =>
        (prev - 1 + activeAlbum.images.length) % activeAlbum.images.length,
    );
  };

  const showNext = () => {
    if (!activeAlbum) return;
    setActiveIndex((prev) => (prev + 1) % activeAlbum.images.length);
  };

  const activeImage = activeAlbum
    ? activeAlbum.images[activeIndex]
    : null;

  return (
    <SubpageTemplate
      title="Photo Gallery"
      breadcrumb={[{ name: "Photo Gallery" }]}
    >
      <div>
        {loading ? (
          <div className="py-12 text-center">
            <div className="inline-block w-8 h-8 border-3 border-gray-200 border-t-[#003366] rounded-full animate-spin mb-3" />
            <p className="text-gray-500 text-sm">Loading gallery...</p>
          </div>
        ) : albums.length === 0 ? (
          <div className="py-12 text-center">
            <div className="w-12 h-12 mx-auto text-gray-300 mb-3">
              <svg
                className="w-full h-full"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 5h18M3 19h18M5 7l4 4 4-4 6 6"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">
              {error
                ? "Gallery could not be loaded right now."
                : "No gallery albums available."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <button
                key={album.id}
                type="button"
                onClick={() => openAlbum(album)}
                className="group text-left bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#f8fafc] via-white to-[#eef4ff]">
                  <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[#ffedd5] opacity-60" />
                  <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-[#dbeafe] opacity-70" />
                  <div className="absolute inset-0 p-4">
                    <div className="relative h-full rounded-2xl overflow-hidden shadow-md">
                      <img
                        src={album.images[0]}
                        alt={album.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          e.target.parentNode.innerHTML =
                            '<div class="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-xs">No Image</div>';
                        }}
                      />
                      {album.images[1] ? (
                        <img
                          src={album.images[1]}
                          alt=""
                          className="absolute -bottom-6 -right-6 w-28 h-28 object-cover rounded-xl border-4 border-white shadow-lg"
                        />
                      ) : null}
                      {album.images[2] ? (
                        <img
                          src={album.images[2]}
                          alt=""
                          className="absolute -top-6 -left-6 w-24 h-24 object-cover rounded-xl border-4 border-white shadow-lg"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p
                          className="text-white text-[15px] font-semibold truncate"
                          style={{
                            fontFamily:
                              '"Space Grotesk", "Segoe UI", sans-serif',
                          }}
                        >
                          {album.title}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="bg-white/90 text-[#003366] text-[11px] font-bold px-2 py-0.5 rounded-full">
                            {album.images.length} photos
                          </span>
                          <span className="text-white/80 text-[11px]">
                            Open slideshow →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {album.caption ? (
                  <div className="px-4 py-3 text-xs text-gray-600">
                    {album.caption}
                  </div>
                ) : null}
              </button>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href="https://jmc.jk.gov.in/photogallery.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#003366] hover:bg-[#004080] text-white px-8 py-3 rounded font-medium transition-colors"
          >
            View Full Gallery on JMC Portal →
          </a>
        </div>

        {activeAlbum ? (
          <div className="fixed inset-0 z-[9999] bg-[#020202]/95 flex flex-col overflow-hidden backdrop-blur-xl transition-all duration-300">
            {/* Header / Top Bar */}
            <div className="flex items-start sm:items-center justify-between px-4 sm:px-8 py-4 sm:py-6 bg-gradient-to-b from-black/80 to-transparent z-10">
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="text-white text-lg sm:text-2xl font-semibold tracking-tight truncate">
                  {activeAlbum.title}
                </h3>
                {activeAlbum.caption ? (
                  <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2 line-clamp-2 sm:line-clamp-1">
                    {activeAlbum.caption}
                  </p>
                ) : null}
              </div>
              <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
                <span className="text-white/80 text-xs sm:text-sm font-medium tracking-widest bg-white/10 px-3 py-1.5 rounded-full hidden sm:block">
                  {activeIndex + 1} / {activeAlbum.images.length}
                </span>
                <button
                  type="button"
                  onClick={closeAlbum}
                  className="group flex items-center justify-center p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all hover:rotate-90 duration-300"
                  aria-label="Close album"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Main Image Viewport */}
            <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden px-2 sm:px-20 py-2 sm:py-6">
              {activeImage ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    key={activeImage}
                    src={activeImage}
                    alt={activeAlbum.title}
                    className="max-w-full max-h-full object-contain select-none drop-shadow-2xl transition-opacity duration-300"
                    onError={(e) => {
                      e.target.parentNode.innerHTML =
                        '<div class="flex flex-col items-center justify-center text-gray-500"><svg class="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><p>Image could not be loaded</p></div>';
                    }}
                  />
                </div>
              ) : null}

              {/* Navigation Arrows */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); showPrev(); }}
                className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 p-3 sm:p-5 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/10 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 group z-10"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); showNext(); }}
                className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 p-3 sm:p-5 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/10 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 group z-10"
                aria-label="Next image"
              >
                <svg className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="bg-gradient-to-t from-black to-transparent pt-12 pb-4 sm:pb-8 px-4 z-10">
              <div 
                className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-4 justify-start sm:justify-center max-w-7xl mx-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {activeAlbum.images.map((img, idx) => (
                  <button
                    key={`${img}-${idx}`}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`relative flex-shrink-0 h-16 w-24 sm:h-20 sm:w-32 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer group ${
                      idx === activeIndex
                        ? "ring-2 ring-white ring-offset-2 ring-offset-black shadow-2xl scale-110 z-10"
                        : "opacity-40 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${idx === activeIndex ? "opacity-0" : "group-hover:opacity-20"}`} />
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
              <div className="text-center sm:hidden mt-1">
                <span className="text-white/60 text-xs font-medium tracking-widest bg-white/10 px-3 py-1 rounded-full">
                  {activeIndex + 1} OF {activeAlbum.images.length}
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </SubpageTemplate>
  );
}
