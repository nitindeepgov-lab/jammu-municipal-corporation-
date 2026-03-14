import { useState, useEffect, useRef } from 'react'

// Icon button for accessibility panel
function AccessBtn({ onClick, active, label, children }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`relative flex flex-col items-center justify-center gap-1 p-2 border rounded text-xs transition-colors w-full
        ${active
          ? 'bg-[#1a1a1a] text-white border-[#333]'
          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:bg-gray-50'
        }`}
    >
      {active && (
        <span className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
          <svg width="8" height="8" fill="white" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      )}
      <span className="text-[18px] leading-none">{children}</span>
      <span className="text-[10px] text-center leading-tight">{label}</span>
    </button>
  )
}

export default function TopBar() {
  const [fontSize, setFontSize] = useState(100)
  const [contrast, setContrast] = useState('normal') // 'normal' | 'high' | 'invert' | 'saturate'
  const [highlightLinks, setHighlightLinks] = useState(false)
  const [textSpacing, setTextSpacing] = useState(false)
  const [lineHeight, setLineHeight] = useState(false)
  const [hideImages, setHideImages] = useState(false)
  const [bigCursor, setBigCursor] = useState(false)

  const [searchOpen, setSearchOpen] = useState(false)
  const [socialOpen, setSocialOpen] = useState(false)
  const [accessOpen, setAccessOpen] = useState(false)

  const accessRef = useRef(null)
  const searchRef = useRef(null)
  const socialRef = useRef(null)

  // Apply contrast mode to body
  useEffect(() => {
    const body = document.body
    body.classList.remove('ac-high-contrast', 'ac-invert', 'ac-saturate')
    if (contrast === 'high') body.classList.add('ac-high-contrast')
    else if (contrast === 'invert') body.classList.add('ac-invert')
    else if (contrast === 'saturate') body.classList.add('ac-saturate')
  }, [contrast])

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`
  }, [fontSize])

  useEffect(() => {
    document.body.classList.toggle('ac-highlight-links', highlightLinks)
  }, [highlightLinks])

  useEffect(() => {
    document.body.style.letterSpacing = textSpacing ? '0.12em' : ''
    document.body.style.wordSpacing = textSpacing ? '0.16em' : ''
  }, [textSpacing])

  useEffect(() => {
    document.body.style.lineHeight = lineHeight ? '2' : ''
  }, [lineHeight])

  useEffect(() => {
    document.querySelectorAll('img').forEach(img => {
      img.style.visibility = hideImages ? 'hidden' : ''
    })
  }, [hideImages])

  useEffect(() => {
    document.body.style.cursor = bigCursor ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 24 24\'%3E%3Cpath d=\'M4 0l16 12-7 1 4 8-3 1-4-8-6 4z\' fill=\'black\'/%3E%3C/svg%3E") 0 0, auto' : ''
  }, [bigCursor])

  // Click-outside handlers
  useEffect(() => {
    const handler = (e) => {
      if (accessRef.current && !accessRef.current.contains(e.target)) setAccessOpen(false)
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false)
      if (socialRef.current && !socialRef.current.contains(e.target)) setSocialOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const resetAll = () => {
    setFontSize(100)
    setContrast('normal')
    setHighlightLinks(false)
    setTextSpacing(false)
    setLineHeight(false)
    setHideImages(false)
    setBigCursor(false)
  }

  return (
    <div className="bg-[#003366] text-white text-xs border-b border-[#002244] relative z-[60]">
      <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-stretch" style={{ minHeight: '42px' }}>
        {/* Left: skip links */}
        <div className="hidden sm:flex items-center gap-3">
          <a href="#main-content" className="hover:underline text-white py-2">Skip to Main Content</a>
          <span className="text-[#FFFFFF33]">|</span>
          <a href="#" className="hover:underline text-white py-2">Screen Reader Access</a>
        </div>

        {/* Right: tool buttons */}
        <div className="flex items-stretch">

          {/* Search */}
          <div className="relative" ref={searchRef}>
            <button
              onClick={() => setSearchOpen(o => !o)}
              className={`h-full px-3 flex items-center hover:bg-[#FF6600] transition-colors ${searchOpen ? 'bg-[#FF6600]' : ''}`}
              aria-label="Search"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10.5 2a8.5 8.5 0 105.74 14.74l4.26 4.26 1.42-1.42-4.26-4.26A8.5 8.5 0 0010.5 2zm0 2a6.5 6.5 0 110 13 6.5 6.5 0 010-13z"/>
              </svg>
            </button>
            {searchOpen && (
              <div className="absolute top-full right-0 bg-white shadow-lg p-3 z-[9999] w-64 mt-px">
                <div className="flex gap-2">
                  <input type="search" placeholder="Search..." autoFocus className="flex-1 border border-gray-300 px-2 py-1.5 text-gray-800 text-sm rounded" />
                  <button className="bg-[#FF6600] text-white px-3 py-1.5 text-sm rounded hover:bg-[#e65c00]">Go</button>
                </div>
              </div>
            )}
          </div>

          {/* Social Media */}
          <div className="relative" ref={socialRef}>
            <button
              onClick={() => setSocialOpen(o => !o)}
              className={`h-full px-3 flex items-center hover:bg-[#FF6600] transition-colors ${socialOpen ? 'bg-[#FF6600]' : ''}`}
              aria-label="Social Media"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2a3 3 0 1 1-2.77 4.14l-6.26 3.13a3 3 0 0 1 0 1.46l6.26 3.13A3 3 0 1 1 14 16a3 3 0 0 1 .23-1.14L8 11.73a3 3 0 1 1 0-3.46l6.26-3.13A3 3 0 0 1 18 2z"/>
              </svg>
            </button>
            {socialOpen && (
              <div className="absolute top-full right-0 bg-white shadow-lg p-3 z-[9999] mt-px flex gap-2">
                <a href="#" className="w-8 h-8 bg-[#3b5998] rounded-full flex items-center justify-center text-white text-xs font-bold hover:opacity-80">f</a>
                <a href="#" className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold hover:opacity-80">𝕏</a>
                <a href="#" className="w-8 h-8 bg-[#ff0000] rounded-full flex items-center justify-center text-white text-xs hover:opacity-80">▶</a>
                <a href="#" className="w-8 h-8 bg-[#e1306c] rounded-full flex items-center justify-center text-white text-xs font-bold hover:opacity-80">ig</a>
              </div>
            )}
          </div>

          {/* Sitemap */}
          <a href="#" className="h-full px-3 flex items-center hover:bg-[#FF6600] transition-colors" aria-label="Sitemap">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9h4V5H3v4zm0 5h4v-4H3v4zm5 0h4v-4H8v4zm5 0h4v-4h-4v4zM8 9h4V5H8v4zm5-4v4h4V5h-4zM3 19h4v-4H3v4zm5 0h4v-4H8v4zm5 0h4v-4h-4v4z"/>
            </svg>
          </a>
          {/* Bhashini */}
          <a href="#" className="h-full bg-white px-2 py-1 flex items-center hover:bg-[#e65c00] transition-colors" aria-label="Bhashini">
            <img src="/bhashini.png" alt="Bhashini Logo" className="w-7 h-4 sm:w-11 sm:h-6 object-contain" />
          </a>

          {/* Accessibility Tools */}
          <div className="relative" ref={accessRef}>
            <button
              onClick={() => setAccessOpen(o => !o)}
              className={`h-full px-3 flex items-center gap-1.5 hover:bg-[#FF6600] transition-colors ${accessOpen ? 'bg-[#FF6600]' : ''}`}
              aria-label="Accessibility Tools"
              aria-expanded={accessOpen}
            >
              <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm8 7h-5.5l.5 2h3l-2 7-3.5-4-3.5 4-2-7H9l.5-2H4l.5-2h15L20 9z"/>
              </svg>
            </button>

            {accessOpen && (
              <div className="absolute top-full right-0 bg-white shadow-2xl z-[9999] mt-px border border-gray-200" style={{ width: '320px' }}>
                {/* Panel header */}
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                  <h3 className="text-gray-800 font-semibold text-sm">Accessibility Tools</h3>
                  <button onClick={resetAll} className="text-xs text-[#FF6600] hover:underline font-medium">Reset All</button>
                </div>

                <div className="p-4 space-y-4">
                  {/* Color Contrast */}
                  <div>
                    <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider mb-2">Color Contrast</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      <AccessBtn onClick={() => setContrast(c => c === 'high' ? 'normal' : 'high')} active={contrast === 'high'} label="High Contrast">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18V4c4.42 0 8 3.58 8 8s-3.58 8-8 8z"/></svg>
                      </AccessBtn>
                      <AccessBtn onClick={() => setContrast('normal')} active={contrast === 'normal'} label="Normal Contrast">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                      </AccessBtn>
                      <AccessBtn onClick={() => setHighlightLinks(h => !h)} active={highlightLinks} label="Highlight Links">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-2-4h6v2H9z"/></svg>
                      </AccessBtn>
                      <AccessBtn onClick={() => setContrast(c => c === 'invert' ? 'normal' : 'invert')} active={contrast === 'invert'} label="Invert">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 13c-3.04 0-5.5-2.46-5.5-5.5S8.96 6.5 12 6.5s5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5zm0-9a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/></svg>
                      </AccessBtn>
                      <AccessBtn onClick={() => setContrast(c => c === 'saturate' ? 'normal' : 'saturate')} active={contrast === 'saturate'} label="Saturation">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                      </AccessBtn>
                    </div>
                  </div>

                  {/* Text Size */}
                  <div>
                    <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider mb-2">Text Size</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      <AccessBtn onClick={() => setFontSize(f => Math.min(130, f + 10))} active={fontSize > 100} label="Font Size Increase">
                        <span className="font-bold text-lg leading-none">A+</span>
                      </AccessBtn>
                      <AccessBtn onClick={() => setFontSize(f => Math.max(80, f - 10))} active={fontSize < 100} label="Font Size Decrease">
                        <span className="font-bold text-lg leading-none">A-</span>
                      </AccessBtn>
                      <AccessBtn onClick={() => setFontSize(100)} active={fontSize === 100} label="Normal Font">
                        <span className="font-bold text-base leading-none">A</span>
                      </AccessBtn>
                      <AccessBtn onClick={() => setTextSpacing(t => !t)} active={textSpacing} label="Text Spacing">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M9 7v2H5v10H3V9H0V7h9zm12 0v10h-2v-4h-4v4h-2V7h2v4h4V7h2z"/></svg>
                      </AccessBtn>
                      <AccessBtn onClick={() => setLineHeight(l => !l)} active={lineHeight} label="Line Height">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6 7h2.5L5 3.5 1.5 7H4v10H1.5L5 20.5 8.5 17H6V7zm4-2v2h12V5H10zm0 14h12v-2H10v2zm0-6h12v-2H10v2z"/></svg>
                      </AccessBtn>
                    </div>
                  </div>

                  {/* Other Controls */}
                  <div>
                    <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider mb-2">Other controls</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      <AccessBtn onClick={() => setHideImages(h => !h)} active={hideImages} label="Hide Images">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M21 17.243l-5.5-5.5L10 17l-3-3.5-4 4.5h18v-.757zM1 5v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2zm2-2h18v16H3V3zm5.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/><path d="M2.1 4.93 1 6.04l1 1V19c0 1.1.9 2 2 2h13l1 1 1.07-1.07L2.1 4.93zM3 19V9.04l9.96 9.96H3z"/></svg>
                      </AccessBtn>
                      <AccessBtn onClick={() => setBigCursor(b => !b)} active={bigCursor} label="Big Cursor">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M4 0l5.5 19 3.5-6 6 4L22 14l-6-3.5 6-3.5L4 0z"/></svg>
                      </AccessBtn>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Language */}
          <div className="flex items-center border-l border-[#FFFFFF22] pl-2 ml-1">
            <select className="bg-transparent text-white border-0 px-2 py-1 text-xs cursor-pointer hover:text-[#FF6600] transition-colors appearance-none">
              <option value="en">ENGLISH</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>

        </div>
      </div>
    </div>
  )
}
