import { Link } from "react-router-dom";
import SubpageTemplate from "../components/SubpageTemplate";

/**
 * 404 Not Found page — shown when no route matches.
 */
export default function NotFound() {
  return (
    <SubpageTemplate
      title="Page Not Found"
      breadcrumb={[{ name: "Page Not Found", to: null }]}
    >
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-6xl font-bold text-[#003366] mb-3">404</h1>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          Please check the URL or navigate back to the homepage.
        </p>

        <div className="flex gap-3 justify-center">
          <Link
            to="/"
            className="px-6 py-2.5 rounded-lg bg-[#003366] text-white text-sm font-semibold hover:bg-[#004080] transition-colors"
          >
            Go to Homepage
          </Link>
          <Link
            to="/sitemap"
            className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            View Sitemap
          </Link>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Jammu Municipal Corporation • Town Hall, Jammu — 180001
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Helpline: 1800-180-7207
          </p>
        </div>
      </div>
    </SubpageTemplate>
  );
}
