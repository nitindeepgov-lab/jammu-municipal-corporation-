import { useEffect, useState } from "react";
import SubpageTemplate from "../components/SubpageTemplate";
import { getPhotoGalleryItems } from "../services/strapiApi";
import { STRAPI_URL } from "../config/api";
import { logError } from "../utils/errorLogger";

const resolveMediaUrl = (media) => {
  if (!media) return null;

  let candidate = media;
  if (Array.isArray(media)) {
    candidate = media[0];
  } else if (Array.isArray(media.data)) {
    candidate = media.data[0];
  } else if (media.data) {
    candidate = media.data;
  }

  const url = candidate?.url || candidate?.attributes?.url;
  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
};

const mapGalleryItems = (res) =>
  (res.data?.data || [])
    .map((item) => {
      const a = item.attributes || item;
      const src = resolveMediaUrl(a.image);
      if (!src) return null;
      return {
        id: item.id ?? item.documentId ?? a.id ?? a.documentId ?? src,
        src,
        alt: a.title || a.caption || "JMC Gallery",
        caption: a.caption || "",
      };
    })
    .filter(Boolean);

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPhotoGalleryItems()
      .then((res) => {
        setGalleryImages(mapGalleryItems(res));
        setError(false);
      })
      .catch((err) => {
        logError("Gallery - getPhotoGalleryItems", err);
        setGalleryImages([]);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

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
        ) : galleryImages.length === 0 ? (
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
                : "No gallery images available."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {galleryImages.map((img) => (
              <a
                key={img.id}
                href={img.src}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded shadow-sm hover:shadow-lg transition-shadow group"
              >
                <div className="h-40 overflow-hidden bg-gray-200">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.parentNode.innerHTML =
                        '<div class="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-xs">No Image</div>';
                    }}
                  />
                </div>
              </a>
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
      </div>
    </SubpageTemplate>
  );
}
