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
    <div className="bg-[#002244] text-white" style={{ borderTop: '3px solid #FF6600', borderBottom: '1px solid #001833' }}>

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
      `}</style>

      {/* ── Mobile layout (< md) ── */}
      <div className="md:hidden">
        {/* Label row */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10">
          <span className="bg-[#FF6600] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
            Latest News
          </span>
        </div>

        {/* Scrolling text row */}
        <div className="flex items-center px-3 py-2.5 gap-2">
          {/* Marquee scroll area — restarts animation each time item changes */}
          <div className="flex-1 overflow-hidden relative h-5">
            <div>
              <a
                key={animKey}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ticker-text text-gray-200 text-[12px] hover:text-[#FF6600]"
              >
                {item.text}
              </a>
            </div>
          </div>

          {/* Compact controls */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button onClick={prev} className="w-6 h-6 bg-white/10 hover:bg-[#FF6600] rounded flex items-center justify-center transition-colors" aria-label="Previous">
              <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button onClick={next} className="w-6 h-6 bg-white/10 hover:bg-[#FF6600] rounded flex items-center justify-center transition-colors" aria-label="Next">
              <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Desktop layout (≥ md) ── */}
      <div className="hidden md:flex w-full px-4 items-stretch" style={{ minHeight: '42px' }}>
        {/* Label */}
        <div className="bg-[#FF6600] text-white px-5 font-bold text-sm flex items-center flex-shrink-0 mr-4 uppercase tracking-wider">
          Latest News
        </div>

        {/* News text (right-side marquee) */}
        <div className="flex-1 py-3 overflow-hidden text-sm text-gray-200 flex items-center justify-end">
          <div className="w-full overflow-hidden">
            <a
              key={animKey}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ticker-text hover:text-[#FF6600] transition-colors"
            >
              {item.text}
            </a>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 ml-2 flex-shrink-0 py-2">
          <button onClick={prev} className="w-7 h-7 bg-[#333] hover:bg-[#FF6600] flex items-center justify-center rounded transition-colors" aria-label="Previous news">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button onClick={next} className="w-7 h-7 bg-[#333] hover:bg-[#FF6600] flex items-center justify-center rounded transition-colors" aria-label="Next news">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

    </div>
  )
}
