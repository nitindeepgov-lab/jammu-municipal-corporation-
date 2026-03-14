export default function Header() {
  return (
    <>
      {/* Indian Tricolor Strip */}
      <div className="flex h-[5px] w-full">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white border-y border-gray-200" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      <header className="bg-white border-b-2 border-[#003366] shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between py-2.5 md:py-3">

            {/* Left — Emblem and Title */}
            <div className="flex items-center gap-3 md:gap-5 min-w-0">
              <div className="border-r border-gray-200 pr-3 md:pr-5 flex-shrink-0">
                <img
                  src="/banner/images.jpeg"
                  alt="Government Emblem"
                  className="h-11 sm:h-[64px] md:h-[80px] w-auto"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[#006400] text-[9px] sm:text-xs font-semibold tracking-widest uppercase leading-none">
                  Government of Jammu &amp; Kashmir
                </p>
                <h1 className="text-[#003366] text-[17px] sm:text-2xl md:text-3xl font-extrabold leading-tight tracking-tight mt-0.5">
                  Jammu Municipal Corporation
                </h1>
                <p className="text-[#FF6600] text-[9px] sm:text-xs font-medium tracking-wide mt-0.5 uppercase leading-tight">
                  Committed to Serving the Citizens of Jammu
                </p>

                {/* Desktop helpline row */}
                <div className="hidden sm:flex items-center gap-3 mt-1.5">
                  <span className="inline-flex items-center gap-1 text-[#003366] text-[11px] font-semibold border border-[#003366] rounded px-2 py-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    Toll Free: 18001807207
                  </span>
                  <span className="text-gray-300 text-xs">|</span>
                  <span className="text-gray-500 text-[11px]">10:00 AM – 05:00 PM (Working Days)</span>
                </div>

                {/* Mobile-only compact helpline */}
                <div className="sm:hidden mt-1">
                  <a
                    href="tel:18001807207"
                    className="inline-flex items-center gap-1 text-[#003366] text-[9px] font-semibold border border-[#003366]/40 rounded px-1.5 py-0.5 hover:bg-[#003366] hover:text-white transition-colors"
                  >
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    1800-180-7207
                  </a>
                </div>
              </div>
            </div>

            {/* Right — Logos (tablet+) */}
            <div className="hidden md:flex flex-col items-end gap-3 flex-shrink-0">
              <a href="https://www.digitalindia.gov.in/" target="_blank" rel="noopener noreferrer">
                <img
                  src="/footer/dic.png"
                  alt="Digital India"
                  className="h-[45px] w-auto"
                  onError={(e) => { e.target.src = 'https://www.digitalindia.gov.in/sites/all/themes/digitalindia/images/logo.png' }}
                />
              </a>
              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                Website is best viewed in Chrome / Firefox
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
