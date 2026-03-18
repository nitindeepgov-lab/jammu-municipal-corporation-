import { useState, useEffect, useRef } from 'react'

const newsItems = [
  { text: 'PHE WATER SUPPLY HELPLINE NUMBERS — Click to view contact details', href: 'https://jmc.jk.gov.in/adminjmcpanel/noticefiles/318202558462347.pdf' },
  { text: 'Online Building Permission: Apply at JMC Portal for building plan sanction', href: 'https://jmc.jk.gov.in/PermissionForm.aspx' },
  { text: 'PHE WATER SUPPLY HELPLINE NUMBERS — Click to view contact details', href: 'https://jmc.jk.gov.in/adminjmcpanel/noticefiles/318202558462347.pdf' },
  { text: 'Online Building Permission: Apply at JMC Portal for building plan sanction', href: 'https://jmc.jk.gov.in/PermissionForm.aspx' },
  { text: 'Pay Property Tax and other dues Online — Quick & Convenient', href: '/pay-online' },
  { text: 'Register your Grievance / Complaint online with Jammu Municipal Corporation', href: 'https://jmc.jk.gov.in/OnlineGrievances.aspx' },
  { text: 'Smart City Mission: View latest Smart City projects and developments in Jammu', href: 'https://jmc.jk.gov.in/smartcity.aspx' },
  { text: 'Download the latest E-Newsletter of Jammu Municipal Corporation', href: 'https://jmc.jk.gov.in/newsletter.aspx' },
]

export default function NewsTicker() {
  const [current, setCurrent] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const timerRef = useRef(null)

  const goTo = (idx) => {
    setCurrent(idx)
    setAnimKey(k => k + 1)
  }
  const next = () => goTo((current + 1) % newsItems.length)
  const prev = () => goTo((current - 1 + newsItems.length) % newsItems.length)

  useEffect(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % newsItems.length)
      setAnimKey(k => k + 1)
    }, 4500)
    return () => clearInterval(timerRef.current)
  }, [current])

  const item = newsItems[current]

  return (
    <div
      className="text-white relative"
      style={{
        background: 'linear-gradient(90deg, #001a33 0%, #002244 40%, #00253d 100%)',
        borderTop: '2px solid #FF6600',
      }}
    >

      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .ticker-text {
          display: inline-block;
          white-space: nowrap;
          animation: ticker-scroll 18s linear infinite;
        }
        .ticker-text:hover, .ticker-paused .ticker-text {
          animation-play-state: paused;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(0.8); }
        }
        .live-dot {
          animation: pulse-dot 1.5s ease-in-out infinite;
        }
        @keyframes progress-fill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .news-progress-bar {
          animation: progress-fill 4.5s linear;
        }
      `}</style>

      {/* Progress bar at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent z-10">
        <div
          key={animKey}
          className="news-progress-bar h-full rounded-r-full"
          style={{ background: 'linear-gradient(90deg, #FF6600, #ffaa33)' }}
        />
      </div>

      {/* ── Mobile layout (< md) ── */}
      <div className="md:hidden">
        {/* Label row */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded"
              style={{ background: 'linear-gradient(135deg, #FF6600, #e65c00)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white live-dot" />
              Latest News
            </span>
          </div>
          <span className="text-[10px] text-gray-500 font-mono tabular-nums">
            {String(current + 1).padStart(2, '0')}/{String(newsItems.length).padStart(2, '0')}
          </span>
        </div>

        {/* Scrolling text row */}
        <div className="flex items-center px-3 py-2.5 gap-2">
          <div className="flex-1 overflow-hidden relative h-5">
            <div>
              <a
                key={animKey}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ticker-text text-gray-200 text-[12px] hover:text-[#FF6600] transition-colors"
              >
                {item.text}
              </a>
            </div>
          </div>

          {/* Compact controls */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button onClick={prev} className="w-6 h-6 rounded flex items-center justify-center transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.08)' }}
              onMouseEnter={e => e.currentTarget.style.background = '#FF6600'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              aria-label="Previous">
              <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button onClick={next} className="w-6 h-6 rounded flex items-center justify-center transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.08)' }}
              onMouseEnter={e => e.currentTarget.style.background = '#FF6600'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              aria-label="Next">
              <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Desktop layout (≥ md) ── */}
      <div className="hidden md:flex w-full items-stretch" style={{ minHeight: '44px' }}>

        {/* Label with icon + live dot */}
        <div
          className="flex items-center gap-2 px-5 flex-shrink-0 mr-0 font-bold text-[13px] uppercase tracking-wider text-white"
          style={{ background: 'linear-gradient(135deg, #FF6600, #e65c00)' }}
        >
          <svg className="w-3.5 h-3.5 opacity-90" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2"/>
          </svg>
          <span className="w-1.5 h-1.5 rounded-full bg-white live-dot" />
          Latest News
        </div>

        {/* Separator accent */}
        <div className="w-[3px] flex-shrink-0" style={{ background: 'linear-gradient(180deg, #FF6600, #cc5200)' }} />

        {/* News text marquee */}
        <div className="flex-1 py-3 overflow-hidden text-sm flex items-center pl-5">
          <div className="w-full overflow-hidden">
            <a
              key={animKey}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ticker-text text-gray-200 hover:text-[#FF6600] transition-colors font-medium tracking-wide"
              style={{ fontSize: '13px' }}
            >
              ●&ensp;{item.text}
            </a>
          </div>
        </div>

        {/* Counter + Controls */}
        <div className="flex items-center gap-3 px-4 flex-shrink-0 border-l border-white/5">

          {/* Counter badge */}
          <span className="text-[11px] font-mono tabular-nums text-gray-400 select-none">
            <span className="text-[#FF6600] font-bold">{String(current + 1).padStart(2, '0')}</span>
            <span className="mx-0.5 text-gray-600">/</span>
            {String(newsItems.length).padStart(2, '0')}
          </span>

          {/* Nav buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={prev}
              className="w-7 h-7 flex items-center justify-center rounded transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(4px)' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#FF6600'; e.currentTarget.style.transform = 'scale(1.1)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'scale(1)' }}
              aria-label="Previous news"
            >
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              onClick={next}
              className="w-7 h-7 flex items-center justify-center rounded transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(4px)' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#FF6600'; e.currentTarget.style.transform = 'scale(1.1)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'scale(1)' }}
              aria-label="Next news"
            >
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

