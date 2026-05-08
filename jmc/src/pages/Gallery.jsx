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
          <div className="fixed inset-0 z-50 bg-[#05070e]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
            <div className="relative w-full max-w-6xl">
              <div className="flex flex-col bg-[#0b0f1a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[82vh]">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                  <div>
                    <p
                      className="text-white text-sm font-semibold"
                      style={{
                        fontFamily:
                          '"Space Grotesk", "Segoe UI", sans-serif',
                      }}
                    >
                      {activeAlbum.title}
                    </p>
                    {activeAlbum.caption ? (
                      <p className="text-white/70 text-xs mt-0.5">
                        {activeAlbum.caption}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/70 text-[11px] tracking-wide uppercase">
                      Slide {activeIndex + 1} of {activeAlbum.images.length}
                    </span>
                    <button
                      type="button"
                      onClick={closeAlbum}
                      className="text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30 hover:border-white/60 hover:text-white"
                    >
                      Close
                    </button>
                  </div>
                </div>

                <div className="relative flex-1 min-h-[45vh] bg-black">
                  {activeImage ? (
                    <img
                      key={activeImage}
                      src={activeImage}
                      alt={activeAlbum.title}
                      className="w-full h-full object-contain bg-black transition-opacity duration-300"
                      onError={(e) => {
                        e.target.parentNode.innerHTML =
                          '<div class="w-full h-[60vh] flex items-center justify-center bg-gray-900 text-gray-400 text-sm">No Image</div>';
                      }}
                    />
                  ) : null}

                  <button
                    type="button"
                    onClick={showPrev}
                    aria-label="Previous image"
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white text-lg border border-white/30 shadow-lg backdrop-blur transition"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next image"
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white text-lg border border-white/30 shadow-lg backdrop-blur transition"
                  >
                    →
                  </button>
                </div>

                <div className="px-5 py-4 border-t border-white/10 bg-[#0b0f1a]">
                  <div className="flex items-center gap-3 overflow-x-auto pb-1">
                    {activeAlbum.images.map((img, idx) => (
                      <button
                        key={`${img}-${idx}`}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border transition-all ${
                          idx === activeIndex
                            ? "border-white shadow-lg scale-[1.03]"
                            : "border-white/20 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </SubpageTemplate>
  );
}
