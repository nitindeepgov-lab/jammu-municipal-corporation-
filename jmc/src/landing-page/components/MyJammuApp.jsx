import { useState, useEffect } from 'react'

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Tax & Bill Payments',
    desc: 'Pay property tax, water bills and municipal dues instantly',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    title: 'Grievance Portal',
    desc: 'Register complaints and track resolution in real time',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    title: 'Live Notifications',
    desc: 'Get alerts on tenders, notices, events and orders',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Digital Certificates',
    desc: 'Apply for birth, death and trade certificates online',
  },
]

export default function MyJammuApp() {
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden bg-white border-t border-gray-100">

      <style>{`
        @keyframes float-phone {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(0.5deg); }
        }
        @keyframes float-phone-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-0.5deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 0.2; }
          100% { transform: scale(0.9); opacity: 0.6; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .phone-primary { animation: float-phone 5s ease-in-out infinite; }
        .phone-secondary { animation: float-phone-2 6s ease-in-out infinite 0.5s; }
        .shimmer-badge {
          background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        .feature-fade { animation: fade-up 0.4s ease-out; }
      `}</style>

      {/* Ambient background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-150px] right-[-100px] w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,102,0,0.04) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,51,102,0.04) 0%, transparent 70%)' }} />
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(rgba(0,51,102,0.4) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 py-16 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Left Column: Content ── */}
          <div className="flex-1 min-w-0 text-center lg:text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-1.5 rounded-full border border-[#003366]/10 bg-[#003366]/[0.03]">
              <div className="w-2 h-2 rounded-full bg-[#FF6600]" style={{ boxShadow: '0 0 8px rgba(255,102,0,0.4)' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#FF6600]">Official Mobile App</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] mb-4">
              <span className="text-[#003366]">{'Jammu City'}</span>
              <br className="hidden sm:block" />
              <span style={{ background: 'linear-gradient(135deg, #FF6600, #ff8533, #FF6600)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                One Tap Away
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-gray-500 text-base sm:text-lg mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Access all municipal services, track grievances, and stay updated — right from your phone.
            </p>

            {/* Feature cards with auto-rotation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((f, i) => (
                <div
                  key={i}
                  onClick={() => setActiveFeature(i)}
                  className={`flex items-start gap-3 p-3.5 rounded-xl cursor-pointer transition-all duration-300 border ${
                    activeFeature === i
                      ? 'bg-[#003366]/[0.04] border-[#FF6600]/20 shadow-md'
                      : 'bg-gray-50/50 border-gray-100 hover:bg-gray-50 hover:border-gray-200'
                  }`}
                  style={activeFeature === i ? { boxShadow: '0 4px 20px rgba(255,102,0,0.08)' } : {}}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    activeFeature === i ? 'bg-[#FF6600] text-white' : 'bg-[#003366]/[0.06] text-[#003366]'
                  }`}>
                    {f.icon}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold transition-colors duration-300 ${activeFeature === i ? 'text-[#003366]' : 'text-gray-700'}`}>
                      {f.title}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Download buttons */}
            <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
              <a
                href="https://play.google.com/store/apps/details?id=com.jammu.jammucitizenapp&hl=en_IN"
                className="group flex items-center gap-3 bg-[#003366] text-white px-5 py-3 rounded-xl hover:bg-[#004080] hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{ boxShadow: '0 4px 14px rgba(0,51,102,0.25)' }}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.33.18.7.24 1.06.17l11.26-11.26L4.24.41A2 2 0 003 2.33v19.34a2 2 0 00.18 2.09zM16.54 12l2.79 2.79-2.35 1.35-2.56-2.56 2.12-1.58zM5.83 1.07l10.7 6.17-2.12 1.58L5.83 1.07zM5.83 22.93l8.58-4.95-2.12-1.58-6.46 6.53z"/>
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[9px] text-white/60 uppercase tracking-wider font-medium">Get it on</div>
                  <div href="" className="text-sm font-bold">Google Play</div>
                </div>
              </a>
              <a
                href="#"
                className="group flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[9px] text-white/60 uppercase tracking-wider font-medium">Download on the</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </a>
            </div>
          </div>

          {/* ── Right Column: Phone Mockups ── */}
          <div className="hidden lg:flex flex-shrink-0 w-[480px] items-center justify-center relative" style={{ minHeight: '520px' }}>

            {/* Ambient glow rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[420px] h-[420px] rounded-full border border-[#003366]/[0.04]" style={{ animation: 'pulse-ring 6s ease-in-out infinite' }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[320px] h-[320px] rounded-full border border-[#FF6600]/[0.06]" style={{ animation: 'pulse-ring 6s ease-in-out infinite 1s' }} />
            </div>
            {/* Soft background circle */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[380px] h-[380px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,51,102,0.04) 0%, transparent 70%)' }} />
            </div>

            {/* Primary phone */}
            <div className="phone-primary relative z-20">
              <div
                className="w-[240px] h-[480px] rounded-[40px] overflow-hidden relative"
                style={{
                  background: 'linear-gradient(145deg, #0f2033 0%, #0a1628 100%)',
                  border: '3px solid rgba(0,0,0,0.1)',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05), 0 0 40px rgba(0,51,102,0.08)',
                }}
              >
                {/* Screen shine */}
                <div className="absolute inset-0 shimmer-badge rounded-[37px] pointer-events-none z-30" />

                {/* Status bar */}
                <div className="relative z-20 h-10 flex items-end justify-between px-6 pb-1">
                  <span className="text-[10px] text-white/60 font-semibold">9:41</span>
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-[2px]">
                      {[1,2,3,4].map(n => (
                        <div key={n} className="w-[3px] rounded-full bg-white/40" style={{ height: `${4 + n * 2}px` }} />
                      ))}
                    </div>
                    <svg className="w-3 h-3 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                    </svg>
                    <div className="w-5 h-2.5 border border-white/30 rounded-sm relative">
                      <div className="absolute inset-[1px] right-[3px] bg-green-400 rounded-sm" />
                    </div>
                  </div>
                </div>

                {/* Dynamic Island */}
                <div className="relative z-20 flex justify-center mt-0">
                  <div className="w-[90px] h-[25px] bg-black rounded-full" style={{ boxShadow: '0 0 10px rgba(0,0,0,0.8)' }} />
                </div>

                {/* App header */}
                <div className="relative z-20 px-5 mt-5">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF6600, #e65c00)' }}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold tracking-wide">My Jammu</p>
                      <p className="text-white/30 text-[10px]">JMC Official App</p>
                    </div>
                  </div>

                  {/* Quick action grid */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { label: 'Pay Tax', color: '#FF6600' },
                      { label: 'Grievance', color: '#0099ff' },
                      { label: 'Notices', color: '#22c55e' },
                    ].map((item, i) => (
                      <div key={i} className="h-16 rounded-xl flex flex-col items-center justify-center gap-1.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="w-6 h-6 rounded-lg" style={{ background: `${item.color}30`, border: `1px solid ${item.color}40` }} />
                        <span className="text-white/50 text-[9px] font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* List items */}
                  <div className="space-y-2">
                    {['Property Tax Due', 'Grievance #JMC-2847', 'New Tender Published'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: i === 0 ? '#FF6600' : i === 1 ? '#0099ff' : '#22c55e' }} />
                        <span className="text-white/40 text-[10px] font-medium flex-1">{item}</span>
                        <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom nav bar */}
                <div className="absolute bottom-0 left-0 right-0 z-20 px-5 pb-4 pt-3" style={{ background: 'linear-gradient(transparent, rgba(10,22,40,0.95))' }}>
                  <div className="flex items-center justify-between px-2">
                    {['Home', 'Services', 'Track', 'Profile'].map((item, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className={`w-5 h-5 rounded-md ${i === 0 ? 'bg-[#FF6600]' : 'bg-white/10'}`} />
                        <span className={`text-[8px] font-medium ${i === 0 ? 'text-[#FF6600]' : 'text-white/30'}`}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="w-[100px] h-[4px] bg-white/20 rounded-full mx-auto mt-3" />
                </div>
              </div>
            </div>

            {/* Secondary phone — offset */}
            <div className="phone-secondary absolute z-10" style={{ right: '-10px', bottom: '30px' }}>
              <div
                className="w-[190px] h-[380px] rounded-[34px] overflow-hidden relative opacity-40"
                style={{
                  background: 'linear-gradient(145deg, #0f2033, #0a1628)',
                  border: '2px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                }}
              >
                <div className="relative z-10 px-4 pt-14">
                  {/* Service grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {['Water Bill', 'Certificates', 'Building', 'RTI'].map((item, i) => (
                      <div key={i} className="h-16 rounded-xl flex flex-col items-center justify-center gap-1.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="w-6 h-6 rounded-lg bg-[#FF6600]/20" />
                        <span className="text-white/35 text-[9px] font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                  {/* Recent activity */}
                  <div className="mt-3 space-y-2">
                    {['Smart City Update', 'Ward Meeting'].map((item, i) => (
                      <div key={i} className="h-9 rounded-lg flex items-center px-3 gap-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <div className="w-2 h-2 rounded-full bg-[#FF6600]/30" />
                        <span className="text-white/30 text-[9px]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notification badge */}
            <div
              className="absolute z-30 top-16 left-4 px-3.5 py-2 rounded-xl feature-fade"
              style={{
                background: 'white',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-[#003366] font-semibold">Tax Paid</p>
                  <p className="text-[8px] text-gray-400">Property Tax — ₹12,450</p>
                </div>
              </div>
            </div>

            {/* Floating rating badge */}
            <div
              className="absolute z-30 bottom-20 left-0 px-3.5 py-2 rounded-xl"
              style={{
                background: 'white',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-[1px]">
                  {[1,2,3,4,5].map(n => (
                    <svg key={n} className={`w-3 h-3 ${n <= 4 ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-[10px] text-gray-500 font-medium">4.5 on Play Store</span>
              </div>
            </div>
          </div>
        </div>

        {/* QR codes row — desktop only */}
        <div className="hidden md:flex items-center justify-center lg:justify-start gap-8 mt-10 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-400 font-medium">Scan to download →</p>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                <img src="/app/QR.png" alt="Android QR" className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="flex-col items-center gap-1 hidden">
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
                  </svg>
                  <span className="text-[8px] text-gray-400">QR Code</span>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 font-medium">Android</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                <img src="/app/ios.png" alt="iOS QR" className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="flex-col items-center gap-1 hidden">
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
                  </svg>
                  <span className="text-[8px] text-gray-400">QR Code</span>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 font-medium">iOS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
