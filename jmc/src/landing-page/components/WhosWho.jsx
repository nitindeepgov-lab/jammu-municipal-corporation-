import { useEffect, useState } from 'react'
import { getOfficials } from '../../services/strapiApi'

const STRAPI_URL = 'http://localhost:1337'

function getInitials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

const avatarColors = ['#003366', '#1a6fa8', '#2e7d32', '#6a1b9a', '#e65100', '#00695c']

export default function WhosWho() {
  const [officials, setOfficials] = useState([])

  useEffect(() => {
    getOfficials()
      .then(res => setOfficials(res.data.data || []))
      .catch(() => setOfficials([]))
  }, [])

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-[#FF6600] rounded-full" />
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#003366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="font-bold text-[#003366] text-sm uppercase tracking-wider">Officers / Officials</h2>
          </div>
        </div>
        <span className="text-[10px] font-semibold text-[#003366] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full uppercase tracking-wide">JMC</span>
      </div>

      {/* Content */}
      <div className="h-[220px] sm:h-[260px] overflow-hidden relative">
        <div className="animate-slideUp">
          {[...officials, ...officials].map((official, idx) => {
            const imgUrl = official.picture?.url
              ? `${STRAPI_URL}${official.picture.url}`
              : null
            return (
            <div key={idx} className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-100 last:border-0 hover:bg-[#f8fafc] transition-colors">
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm overflow-hidden border-2 border-white shadow-sm"
                style={{ backgroundColor: avatarColors[idx % avatarColors.length] }}
              >
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt={official.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentNode.innerHTML = `<span class="text-xs font-bold">${getInitials(official.name)}</span>`
                    }}
                  />
                ) : (
                  <span className="text-xs font-bold">{getInitials(official.name)}</span>
                )}
              </div>
              {/* Info */}
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-[#003366] text-[13px] leading-tight truncate">{official.name}</h3>
                <p className="text-gray-500 text-[11px] mt-0.5 leading-snug">{official.designation}</p>
              </div>
              {/* Badge */}
              <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-4 py-2 bg-gray-50">
        <a href="/officials" className="text-[11px] font-semibold text-[#003366] hover:text-[#FF6600] flex items-center gap-1 transition-colors">
          View all officials
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  )
}
