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


        {activeAlbum ? (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: "rgba(5,5,10,0.97)",
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              width: "100vw",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                flexShrink: 0,
                background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
              }}
            >
              <div style={{ flex: 1, minWidth: 0, paddingRight: 16 }}>
                <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 600, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {activeAlbum.title}
                </h3>
                {activeAlbum.caption ? (
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, margin: "4px 0 0" }}>{activeAlbum.caption}</p>
                ) : null}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, background: "rgba(255,255,255,0.1)", padding: "5px 14px", borderRadius: 999, letterSpacing: 1 }}>
                  {activeIndex + 1} / {activeAlbum.images.length}
                </span>
                <button
                  type="button"
                  onClick={closeAlbum}
                  aria-label="Close"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "none",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    transition: "background 0.2s",
                  }}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Image Zone */}
            <div
              style={{
                position: "relative",
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "calc(100vh - 80px - 140px)",
                overflow: "hidden",
                padding: "0 80px",
              }}
            >
              {activeImage ? (
                <img
                  key={activeImage}
                  src={activeImage}
                  alt={activeAlbum.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                    userSelect: "none",
                    filter: "drop-shadow(0 8px 40px rgba(0,0,0,0.9))",
                    transition: "opacity 0.3s ease",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : null}

              {/* Prev Arrow */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); showPrev(); }}
                aria-label="Previous image"
                style={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.55)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "50%",
                  width: 52,
                  height: 52,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  cursor: "pointer",
                  zIndex: 10,
                  backdropFilter: "blur(8px)",
                  transition: "all 0.2s",
                }}
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Arrow */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); showNext(); }}
                aria-label="Next image"
                style={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.55)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "50%",
                  width: 52,
                  height: 52,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  cursor: "pointer",
                  zIndex: 10,
                  backdropFilter: "blur(8px)",
                  transition: "all 0.2s",
                }}
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div
              style={{
                flexShrink: 0,
                padding: "12px 16px 20px",
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  overflowX: "auto",
                  justifyContent: "center",
                  paddingBottom: 4,
                  scrollbarWidth: "none",
                }}
              >
                {activeAlbum.images.map((img, idx) => (
                  <button
                    key={`${img}-${idx}`}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    style={{
                      flexShrink: 0,
                      width: 90,
                      height: 60,
                      borderRadius: 10,
                      overflow: "hidden",
                      border: idx === activeIndex ? "2px solid #fff" : "2px solid transparent",
                      opacity: idx === activeIndex ? 1 : 0.45,
                      transform: idx === activeIndex ? "scale(1.08)" : "scale(1)",
                      transition: "all 0.25s ease",
                      cursor: "pointer",
                      padding: 0,
                      background: "none",
                    }}
                  >
                    <img
                      src={img}
                      alt={`Slide ${idx + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </SubpageTemplate>
  );
}
