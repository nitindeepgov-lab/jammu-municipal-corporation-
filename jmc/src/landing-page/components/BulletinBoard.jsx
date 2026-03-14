import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBulletinItems } from '../../services/strapiApi';

export default function BulletinBoard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getBulletinItems()
      .then((res) => {
        const data = res.data?.data;
        setItems(
          (data || []).map((entry) => ({
            documentId: entry.documentId,
            release_date: entry.release_date,
            title: entry.title,
            link: entry.link || null,
          }))
        );
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);


  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-[#FF6600] rounded-full" />
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#003366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h2 className="font-bold text-[#003366] text-sm uppercase tracking-wider">Bulletin Board</h2>
          </div>
        </div>
        <span className="text-[10px] font-semibold text-[#FF6600] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full uppercase tracking-wide">Live</span>
      </div>

      {/* Content */}
      <div className="h-[220px] sm:h-[260px] overflow-hidden relative">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-[#003366] border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-gray-400">Loading…</p>
            </div>
          </div>
        ) : error ? (
          <p className="text-sm text-red-400 text-center mt-8">Could not load bulletin board.</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-gray-400 text-center mt-8">No bulletin items available.</p>
        ) : (
          <div className="animate-slideUp">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-0 border-b border-gray-100 last:border-0 hover:bg-[#f8fafc] transition-colors">
                <div className="w-1 bg-[#003366] self-stretch flex-shrink-0" />
                <div className="px-3 py-2.5 flex-1 min-w-0">
                  <span className="inline-block text-[10px] font-semibold text-white bg-[#003366] px-1.5 py-0.5 rounded mb-1">
                    {item.release_date}
                  </span>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] text-gray-700 hover:text-[#FF6600] leading-snug block font-medium transition-colors"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <Link
                      to={`/news/${item.documentId}`}
                      className="text-[12px] text-gray-700 hover:text-[#FF6600] leading-snug block font-medium transition-colors"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-4 py-2 bg-gray-50">
        <Link to="/notices" className="text-[11px] font-semibold text-[#003366] hover:text-[#FF6600] flex items-center gap-1 transition-colors">
          View all notices
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
        </Link>
      </div>
    </div>
  );
}
