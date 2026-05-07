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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {albums.map((album) => (
              <button
                key={album.id}
                type="button"
                onClick={() => openAlbum(album)}
                className="group text-left bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="relative h-44 overflow-hidden bg-gray-200">
                  <img
                    src={album.images[0]}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.parentNode.innerHTML =
                        '<div class="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-xs">No Image</div>';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-sm font-semibold truncate">
                      {album.title}
                    </p>
                    <p className="text-white/80 text-xs">
                      {album.images.length} photos
                    </p>
                  </div>
                </div>
                {album.caption ? (
                  <div className="px-3 py-2 text-xs text-gray-600">
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
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-full max-w-5xl">
              <button
                type="button"
                onClick={closeAlbum}
                className="absolute -top-10 right-0 text-white text-sm font-semibold hover:text-gray-200"
              >
                Close
              </button>

              <div className="relative bg-black rounded-lg overflow-hidden">
                <img
                  src={activeAlbum.images[activeIndex]}
                  alt={activeAlbum.title}
                  className="w-full max-h-[70vh] object-contain bg-black"
                  onError={(e) => {
                    e.target.parentNode.innerHTML =
                      '<div class="w-full h-[60vh] flex items-center justify-center bg-gray-900 text-gray-400 text-sm">No Image</div>';
                  }}
                />

                <button
                  type="button"
                  onClick={showPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white text-xs px-3 py-2 rounded"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white text-xs px-3 py-2 rounded"
                >
                  Next
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="text-white text-sm font-semibold">
                  {activeAlbum.title}
                </div>
                <div className="text-white/80 text-xs">
                  {activeIndex + 1} / {activeAlbum.images.length}
                </div>
              </div>
              {activeAlbum.caption ? (
                <p className="text-gray-200 text-xs mt-1">
                  {activeAlbum.caption}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </SubpageTemplate>
  );
}
