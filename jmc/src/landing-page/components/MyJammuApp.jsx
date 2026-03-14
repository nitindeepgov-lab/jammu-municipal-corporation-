export default function MyJammuApp() {
  return (
    <section className="bg-white border-t border-gray-100 py-12 md:py-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* Left: Text content */}
          <div className="flex-1 min-w-0">
            {/* Label */}
            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
              <div className="w-8 h-1 bg-[#FF6600] rounded-full" />
              <span className="text-[#FF6600] text-xs font-bold uppercase tracking-widest">Official Mobile App</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#003366] leading-tight mb-3 text-center md:text-left">
              Stay Connected<br />
              <span className="text-[#FF6600]">with My Jammu</span>
            </h2>

            {/* Tagline */}
            <p className="text-gray-500 text-base mb-6 text-center md:text-left">
              Your city at your fingertips — anytime, anywhere.
            </p>

            {/* Feature bullets */}
            <ul className="space-y-2.5 mb-8">
              {[
                'Pay property tax and water bills instantly',
                'Register and track grievances in real time',
                'Get notifications on tenders and public notices',
                'Access certificates and municipal services online',
                'View development works and smart city updates',
              ].map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-1 w-4 h-4 rounded-full bg-[#003366] flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-sm">{feat}</span>
                </li>
              ))}
            </ul>

            {/* Download heading */}
            <p className="text-[#003366] font-bold text-sm mb-3 uppercase tracking-wide text-center md:text-left">Download the App</p>

            {/* Store badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6 justify-center md:justify-start">
              <a
                href="#"
                className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.33.18.7.24 1.06.17l11.26-11.26L4.24.41A2 2 0 003 2.33v19.34a2 2 0 00.18 2.09zM16.54 12l2.79 2.79-2.35 1.35-2.56-2.56 2.12-1.58zM5.83 1.07l10.7 6.17-2.12 1.58L5.83 1.07zM5.83 22.93l8.58-4.95-2.12-1.58-6.46 6.53z"/>
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[9px] text-gray-300 uppercase tracking-wide">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[9px] text-gray-300 uppercase tracking-wide">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
            </div>

            {/* QR codes */}
            <div className="hidden sm:flex items-start gap-6 justify-center md:justify-start">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src="/app/QR.png" alt="Android QR" className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.parentNode.innerHTML = '<div class="flex flex-col items-center gap-1"><svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/></svg><span class="text-[9px] text-gray-400">QR Code</span></div>'
                    }}
                  />
                </div>
                <p className="text-[10px] text-gray-500 mt-1.5 font-medium">Android</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src="/app/ios.png" alt="iOS QR" className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.parentNode.innerHTML = '<div class="flex flex-col items-center gap-1"><svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/></svg><span class="text-[9px] text-gray-400">QR Code</span></div>'
                    }}
                  />
                </div>
                <p className="text-[10px] text-gray-500 mt-1.5 font-medium">iOS</p>
              </div>
            </div>
          </div>

          {/* Right: Phone mockup area */}
          <div className="hidden md:flex flex-shrink-0 md:w-[520px] items-center justify-center relative min-h-[420px]">
            {/* Background decoration */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-96 h-96 rounded-full bg-gradient-to-br from-[#003366]/8 to-[#FF6600]/8" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[#003366]/6 to-[#FF6600]/6" />
            </div>

            {/* Phone frame — vacant, ready for screenshot */}
            <div className="relative z-10 flex gap-4 items-end">
              {/* Primary phone */}
              <div className="w-[210px] h-[390px] bg-[#0d1b2e] rounded-[36px] border-[7px] border-[#1a2d45] shadow-2xl flex flex-col overflow-hidden">
                {/* Status bar */}
                <div className="h-7 bg-[#0d1b2e] flex items-center justify-between px-4 flex-shrink-0">
                  <span className="text-[9px] text-white/60 font-medium">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-2 border border-white/40 rounded-sm"><div className="w-3 h-full bg-white/40 rounded-sm" /></div>
                  </div>
                </div>
                {/* Notch */}
                <div className="flex justify-center -mt-1 flex-shrink-0">
                  <div className="w-16 h-4 bg-[#0d1b2e] rounded-b-full" />
                </div>
                {/* App content area — vacant */}
                <div className="flex-1 bg-[#0d1b2e] flex flex-col items-center justify-center gap-4 px-4">
                  <div className="w-20 h-20 rounded-3xl bg-[#003366] flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-white text-sm font-bold">My Jammu</p>
                    <p className="text-white/40 text-[10px] mt-0.5">JMC Official App</p>
                  </div>
                  <div className="w-full space-y-2 mt-1">
                    {['Pay Tax', 'Grievance', 'Notices'].map(label => (
                      <div key={label} className="w-full h-7 bg-white/5 rounded-lg flex items-center px-3 gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#FF6600]" />
                        <span className="text-white/50 text-[10px]">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Bottom bar */}
                <div className="h-7 bg-[#0d1b2e] flex items-center justify-center flex-shrink-0">
                  <div className="w-20 h-1 bg-white/20 rounded-full" />
                </div>
              </div>

              {/* Secondary phone — slightly behind */}
              <div className="w-[170px] h-[320px] bg-[#111d30] rounded-[30px] border-[6px] border-[#1a2d45] shadow-xl flex flex-col overflow-hidden opacity-70 mb-4">
                <div className="h-6 bg-[#111d30] flex-shrink-0" />
                <div className="flex-1 bg-[#111d30] flex flex-col items-center justify-center gap-2 px-4">
                  <div className="grid grid-cols-2 gap-2 w-full">
                    {['Tax', 'Water', 'Pass', 'RTI'].map((item, i) => (
                      <div key={i} className="h-14 bg-white/5 rounded-xl flex flex-col items-center justify-center gap-1">
                        <div className="w-5 h-5 rounded-md bg-[#FF6600]/40" />
                        <span className="text-white/40 text-[9px]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-5 bg-[#111d30] flex items-center justify-center flex-shrink-0">
                  <div className="w-12 h-0.5 bg-white/20 rounded-full" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
