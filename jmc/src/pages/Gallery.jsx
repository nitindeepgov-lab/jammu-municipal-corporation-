import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import SubpageTemplate from "../components/SubpageTemplate";
import { getPhotoGalleryItems } from "../services/strapiApi";
import { STRAPI_URL } from "../config/api";
import { logError } from "../utils/errorLogger";

/* ─── helpers ─────────────────────────────────────────────────────────────── */

/* Pick the best available Strapi image URL.
   Strapi stores processed variants in item.attributes.formats (or item.formats).
   Priority: original url  >  large  >  medium  >  small  >  thumbnail  */
const getBestUrl = (item) => {
  const attrs = item?.attributes || item || {};
  // The top-level `url` is always the original upload – highest quality
  const original = attrs.url;
  const formats = attrs.formats || {};
  // Prefer original, fall back down through format sizes
  return (
    original ||
    formats.large?.url ||
    formats.medium?.url ||
    formats.small?.url ||
    formats.thumbnail?.url ||
    null
  );
};

const resolveMediaUrls = (media) => {
  if (!media) return [];
  let items = [];
  if (Array.isArray(media)) items = media;
  else if (Array.isArray(media.data)) items = media.data;
  else if (media.data) items = [media.data];
  else items = [media];
  return items
    .map(getBestUrl)
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

/* ─── Lightbox Component ───────────────────────────────────────────────────── */

function Lightbox({ album, index, onClose, onPrev, onNext, onGoto }) {
  const closeRef = useRef(null);
  const stripRef = useRef(null);

  /* keyboard navigation */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  /* lock body scroll */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* scroll active thumbnail into view */
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const active = strip.querySelector("[data-active='true']");
    if (active) active.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  const total = album.images.length;
  const src = album.images[index];

  return (
    /* Backdrop */
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${album.title} – image ${index + 1} of ${total}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100000,
        backgroundColor: "rgba(0,0,0,0.92)",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* ── Top bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          flexShrink: 0,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(0,0,0,0.6)",
          gap: 12,
          minHeight: 60,
          boxSizing: "border-box",
        }}
      >
        {/* Title + caption */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              color: "#fff",
              fontWeight: 700,
              fontSize: "clamp(13px, 2vw, 17px)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontFamily: "'Segoe UI', system-ui, sans-serif",
            }}
          >
            {album.title}
          </p>
          {album.caption ? (
            <p
              style={{
                margin: "2px 0 0",
                color: "rgba(255,255,255,0.5)",
                fontSize: "clamp(11px, 1.5vw, 13px)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {album.caption}
            </p>
          ) : null}
        </div>

        {/* Counter + close */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <span
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "clamp(11px, 1.5vw, 13px)",
              background: "rgba(255,255,255,0.08)",
              padding: "4px 12px",
              borderRadius: 999,
              fontVariantNumeric: "tabular-nums",
              whiteSpace: "nowrap",
            }}
          >
            {index + 1} / {total}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close slideshow"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              minWidth: 40,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              cursor: "pointer",
              flexShrink: 0,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.25)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Main image area ── */}
      <div
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {/* Blurred background fill */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(20px) brightness(0.3)",
            transform: "scale(1.1)",
            zIndex: 0,
          }}
        />

        {/* Image – fills the entire zone, object-fit keeps aspect ratio */}
        <div
          style={{
            position: "absolute",
            inset: "0 60px",   /* 60px gap on each side for nav arrows */
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            key={src}
            src={src}
            alt={`${album.title} – photo ${index + 1} of ${total}`}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              userSelect: "none",
              boxShadow: "0 8px 60px rgba(0,0,0,0.9)",
              borderRadius: 4,
            }}
            onError={(e) => { e.currentTarget.style.opacity = "0"; }}
          />
        </div>

        {/* Prev button */}
        {total > 1 && (
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous photo"
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              cursor: "pointer",
              flexShrink: 0,
              backdropFilter: "blur(4px)",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.6)"; e.currentTarget.style.transform = "translateY(-50%) scale(1)"; }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Next button */}
        {total > 1 && (
          <button
            type="button"
            onClick={onNext}
            aria-label="Next photo"
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              cursor: "pointer",
              flexShrink: 0,
              backdropFilter: "blur(4px)",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.6)"; e.currentTarget.style.transform = "translateY(-50%) scale(1)"; }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      {total > 1 && (
        <div
          style={{
            flexShrink: 0,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(0,0,0,0.7)",
            padding: "10px 16px",
            overflowX: "auto",
            overflowY: "hidden",
            boxSizing: "border-box",
          }}
        >
          <div
            ref={stripRef}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              justifyContent: "center",
              minWidth: "max-content",
              margin: "0 auto",
            }}
          >
            {album.images.map((img, i) => (
              <button
                key={`${img}-${i}`}
                type="button"
                data-active={i === index ? "true" : "false"}
                onClick={() => onGoto(i)}
                aria-label={`Go to photo ${i + 1}`}
                aria-pressed={i === index}
                style={{
                  flexShrink: 0,
                  width: 72,
                  height: 50,
                  padding: 0,
                  border: i === index ? "2px solid #fff" : "2px solid rgba(255,255,255,0.15)",
                  borderRadius: 6,
                  overflow: "hidden",
                  cursor: "pointer",
                  opacity: i === index ? 1 : 0.45,
                  transform: i === index ? "scale(1.06)" : "scale(1)",
                  transition: "all 0.2s ease",
                  background: "#000",
                  outline: "none",
                }}
                onMouseEnter={(e) => { if (i !== index) { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1.04)"; } }}
                onMouseLeave={(e) => { if (i !== index) { e.currentTarget.style.opacity = "0.45"; e.currentTarget.style.transform = "scale(1)"; } }}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── AlbumCard ────────────────────────────────────────────────────────────── */

function AlbumCard({ album, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(album)}
      className="group text-left bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 w-full"
    >
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={album.images[0]}
          alt={album.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.parentNode.innerHTML =
              '<div class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-xs">No Image</div>';
          }}
        />
        {/* Count badge */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {album.images.length}
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white font-semibold text-sm leading-tight truncate">
            {album.title}
          </p>
        </div>
      </div>
      {album.caption ? (
        <div className="px-4 py-3 text-xs text-gray-500 truncate">{album.caption}</div>
      ) : null}
    </button>
  );
}

/* ─── Main page ────────────────────────────────────────────────────────────── */

export default function Gallery() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getPhotoGalleryItems()
      .then((res) => { setAlbums(mapGalleryItems(res)); setError(false); })
      .catch((err) => { logError("Gallery - getPhotoGalleryItems", err); setAlbums([]); setError(true); })
      .finally(() => setLoading(false));
  }, []);

  const openAlbum = useCallback((album) => {
    setActiveAlbum(album);
    setActiveIndex(0);
  }, []);

  const closeAlbum = useCallback(() => {
    setActiveAlbum(null);
    setActiveIndex(0);
  }, []);

  const showPrev = useCallback(() => {
    if (!activeAlbum) return;
    setActiveIndex((p) => (p - 1 + activeAlbum.images.length) % activeAlbum.images.length);
  }, [activeAlbum]);

  const showNext = useCallback(() => {
    if (!activeAlbum) return;
    setActiveIndex((p) => (p + 1) % activeAlbum.images.length);
  }, [activeAlbum]);

  return (
    <SubpageTemplate title="Photo Gallery" breadcrumb={[{ name: "Photo Gallery" }]}>
      <div>
        {loading ? (
          <div className="py-16 text-center">
            <div className="inline-block w-8 h-8 border-[3px] border-gray-200 border-t-[#003366] rounded-full animate-spin mb-3" />
            <p className="text-gray-500 text-sm">Loading gallery…</p>
          </div>
        ) : albums.length === 0 ? (
          <div className="py-16 text-center">
            <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500 text-sm">
              {error ? "Gallery could not be loaded right now." : "No gallery albums available."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} onOpen={openAlbum} />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox – rendered via portal so it escapes SubpageTemplate stacking context */}
      {activeAlbum ? createPortal(
        <Lightbox
          album={activeAlbum}
          index={activeIndex}
          onClose={closeAlbum}
          onPrev={showPrev}
          onNext={showNext}
          onGoto={setActiveIndex}
        />,
        document.body
      ) : null}
    </SubpageTemplate>
  );
}
