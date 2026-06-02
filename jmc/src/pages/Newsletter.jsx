import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SubpageTemplate from "../components/SubpageTemplate";
import { getBulletinItemById } from "../services/strapiApi";
import { PROD_STRAPI_URL } from "../config/api";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || PROD_STRAPI_URL;

function Skeleton() {
  return (
    <div className="animate-pulse space-y-6 max-w-4xl mx-auto mt-8">
      <div className="h-12 bg-gray-200 rounded w-2/3 mx-auto" />
      <div className="h-5 bg-gray-100 rounded w-1/4 mx-auto" />
      <div className="h-64 bg-gray-200 rounded-xl" />
      <div className="space-y-4">
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-11/12" />
        <div className="h-4 bg-gray-100 rounded w-4/5" />
      </div>
    </div>
  );
}

export default function Newsletter() {
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

  const attributes = item?.attributes || item;
  const imageUrl = attributes?.image?.url ? `${STRAPI_URL}${attributes.image.url}` : null;
  const documentUrl = attributes?.document?.data?.attributes?.url
    ? `${STRAPI_URL}${attributes.document.data.attributes.url}`
    : attributes?.document?.url
    ? `${STRAPI_URL}${attributes.document.url}`
    : attributes?.link;

  return (
    <SubpageTemplate
      title="Order & Circular Details"
      breadcrumb={[
        { name: "Notices & Tenders", to: "/notices" },
        { name: "Newsletter", to: null },
      ]}
    >
      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-8 min-h-[60vh]">
          <Skeleton />
        </div>
      ) : error || !item ? (
        <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-16 text-center space-y-5 min-h-[50vh] flex flex-col justify-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <svg
              className="w-10 h-10 text-red-400"
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
          <p className="text-gray-500 text-lg">This order could not be loaded.</p>
          <Link
            to="/notices"
            className="inline-flex items-center gap-2 text-[#003366] hover:text-[#FF6600] font-semibold text-sm transition-all"
          >
            ← Back to Notices
          </Link>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto my-6 sm:my-10 bg-[#fdfdfd] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 transition-all duration-500 hover:shadow-3xl">
          {/* Masthead */}
          <div className="bg-[#003366] text-white px-6 py-4 flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FF6600] opacity-10 rounded-full translate-y-24 -translate-x-12" />
            <div className="relative z-10">
              <span className="text-xs font-bold tracking-widest text-[#FF9933] uppercase">JMC Official</span>
              <h2 className="text-xl font-serif mt-1">Order & Circular</h2>
            </div>
            <div className="relative z-10 text-right">
              <p className="text-sm font-semibold opacity-80">{attributes.release_date || attributes.notice_date}</p>
              <p className="text-xs opacity-60">Jammu Municipal Corporation</p>
            </div>
          </div>

          {/* Header Section */}
          <div className="px-6 py-10 sm:px-12 sm:py-16 text-center bg-gradient-to-b from-gray-50 to-white relative">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#002855] leading-tight max-w-4xl mx-auto font-serif tracking-tight drop-shadow-sm">
              {attributes.title}
            </h1>
            <div className="mt-8 flex justify-center">
              <span className="h-1 w-24 bg-[#FF6600] rounded-full" />
            </div>
          </div>

          {/* Image (if exists) */}
          {imageUrl && (
            <div className="px-6 sm:px-12 pb-8">
              <div className="rounded-2xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-[1.02]">
                <img src={imageUrl} alt={attributes.title} className="w-full h-auto object-cover max-h-[500px]" />
              </div>
            </div>
          )}

          {/* Content Body */}
          <div className="px-6 sm:px-12 py-8 bg-white">
            {attributes.description ? (
              <div className="prose prose-lg sm:prose-xl max-w-none text-gray-700 leading-relaxed font-serif">
                {attributes.description}
              </div>
            ) : (
              <div className="text-gray-400 text-center py-10 italic font-serif">
                No extended description is available for this circular. Please refer to the official document attached below.
              </div>
            )}
          </div>

          {/* Call to Action / Document Link */}
          {documentUrl && (
            <div className="px-6 sm:px-12 pb-12 pt-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 opacity-20 rounded-full blur-2xl group-hover:bg-blue-300 transition-colors" />
                <div className="relative z-10 flex items-center gap-5 mb-6 sm:mb-0">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md text-[#003366]">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[#002855] font-bold text-lg">Official Document</h4>
                    <p className="text-gray-500 text-sm">Download or view the original circular</p>
                  </div>
                </div>
                <a
                  href={documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 px-8 py-3 bg-[#003366] hover:bg-[#002244] text-white font-semibold rounded-full shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-xl flex items-center gap-2"
                >
                  View Document
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-200 px-6 sm:px-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link
              to="/notices"
              className="text-[#003366] hover:text-[#FF6600] font-semibold text-sm flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Return to Notices
            </Link>
            <p className="text-xs text-gray-400 font-medium tracking-wide">
              © {new Date().getFullYear()} Jammu Municipal Corporation
            </p>
          </div>
        </div>
      )}
    </SubpageTemplate>
  );
}
