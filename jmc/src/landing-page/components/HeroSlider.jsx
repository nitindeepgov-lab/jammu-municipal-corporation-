import { useState, useEffect, useRef } from 'react'

const slides = [
  {
    image: '/banner/banner1.jpg',
    title: 'Jammu Municipal Corporation',
    subtitle: 'Committed to serving the residents of Jammu City',
  },
  {
    image: '/banner/banner2.jpg',
    title: 'Smart Urban Services',
    subtitle: 'Online payments, digital services, and more for citizens',
  },
  {
    image: '/banner/banner3.jpg',
    title: 'Cleaner, Greener Jammu',
    subtitle: "JMC's commitment to sanitation and environment",
  },
  {
    image: '/banner/banner4.jpg',
    title: 'Infrastructure Development',
    subtitle: 'Building roads, parks, and amenities for a better Jammu',
  },
   {
    image: '/banner/banner5.jpg',
    title: 'Infrastructure Development',
    subtitle: 'Building roads, parks, and amenities for a better Jammu',
  },
   {
    image: '/banner/banner6.jpg',
    title: 'Infrastructure Development',
    subtitle: 'Building roads, parks, and amenities for a better Jammu',
  },
]

const officials = [
  { title: "Hon'ble Lt. Governor", name: 'Mr. Manoj Sinha', image: '/officials/LG.jpg' },
  { title: "Hon'ble Chief Minister", name: 'Omar Abdullah', image: '/officials/cm.jpg' },
  { title: 'Chief Secretary', name: 'Atul Dulloo (IAS)', image: '/officials/cs.jpg' },
  { title: 'Municipal Commissioner', name: 'Devansh Yadav, IAS', image: '/officials/com.jpg' },
  { title: "Ms. Mandeep Kaur, (IAS)\
Commissioner Secretary,  JKHUDD", name: 'Ms. Mandeep Kaur', image: '/officials/comSec.jpg' },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [profileIdx, setProfileIdx] = useState(0)
  const timerRef = useRef(null)
  const profileTimerRef = useRef(null)

  const next = () => setCurrent(c => (c + 1) % slides.length)
  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length)

  useEffect(() => {
    clearInterval(timerRef.current)
    if (!paused) timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [paused])

  useEffect(() => {
    profileTimerRef.current = setInterval(() => {
      setProfileIdx(i => (i + 2) % officials.length)
    }, 4000)
    return () => clearInterval(profileTimerRef.current)
  }, [])  // officials.length is constant, safe to omit

  const VALUES = ['Transparency', 'Accountability', 'Accessibility']

  return (
    <section className="relative overflow-hidden" aria-roledescription="carousel" aria-label="JMC Home Banner">

      {/* ── Slide images ── */}
      <div className="relative h-[220px] sm:h-[320px] md:h-[460px] lg:h-[490px]">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={idx !== current}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = '/banner/banner1.jpg' }}
            />
            {/* gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
          </div>
        ))}

        {/* ── Welcome To + JMC card — top left ── */}
        <div className="absolute bottom-8 left-4 sm:top-8 sm:bottom-auto sm:left-8 md:top-10 md:left-24 z-20">
          <p className="text-white font-extrabold italic text-sm sm:text-4xl md:text-5xl drop-shadow-lg leading-tight mb-1 sm:mb-4"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
            Welcome To
          </p>
          {/* White brand card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl px-3 py-2 sm:px-8 sm:py-5 md:px-2 md:py-2 flex items-center gap-3 sm:gap-5 w-[200px] sm:w-[380px] md:w-[520px] border border-white/60">
            {/* Mobile: show logo.jpeg */}
            <img
              src="/logo.jpeg"
              alt="JMC Logo"
              className="sm:hidden rounded-lg w-14 h-14 border-2 border-[#FF6600] flex-shrink-0 object-contain"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            {/* Desktop: show banner.jpg, wider */}
            <img
              src="/banner/banner.jpg"
              alt="JMC Logo"
              className="hidden sm:block rounded-md sm:w-32 sm:h-28 md:w-full md:h-auto border border-[#FF6600]  object-cover"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <div className="sm:hidden">
              <p className="text-[#003366] font-extrabold text-xs leading-tight">Jammu Municipal</p>
              <p className="text-[#FF6600] font-extrabold text-xs leading-tight">Corporation</p>
            </div>
          </div>
        </div>

        {/* ── Officials cards — top right (lg only) ── */}
        <div className="absolute top-4 right-2 hidden lg:flex gap-3 z-20">
          {[officials[profileIdx % officials.length], officials[(profileIdx + 1) % officials.length]].map((person, i) => (
            <div key={`${profileIdx}-${i}`} className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl px-8 py-6 text-center w-64 flex flex-col items-center transition-all duration-700">
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-[#FF6600]/40 mb-3 bg-gray-100">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&size=300&background=cccccc&color=555` }}
                />
              </div>
              <p className="text-[#003366] font-bold text-base leading-tight mb-1">{person.title}</p>
              <p className="text-gray-500 text-sm">{person.name}</p>
            </div>
          ))}
        </div>

        {/* ── Arrows ── */}
        <button onClick={prev} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-[#FF6600] text-white p-1.5 sm:p-2.5 rounded-full transition-colors z-10" aria-label="Previous slide">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button onClick={next} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-[#FF6600] text-white p-1.5 sm:p-2.5 rounded-full transition-colors z-10" aria-label="Next slide">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
        </button>

        {/* ── Dots + pause ── */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => setCurrent(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${idx === current ? 'bg-[#FF6600]' : 'bg-white/60 hover:bg-white'}`}
              aria-label={`Go to slide ${idx + 1}`} />
          ))}
          <button onClick={() => setPaused(p => !p)}
            className="w-6 h-6 bg-black/40 hover:bg-[#FF6600] text-white flex items-center justify-center rounded-full ml-1 transition-colors"
            aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}>
            {paused
              ? <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              : <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>}
          </button>
        </div>
      </div>

      {/* ── Values strip ── */}
      <div className="bg-gradient-to-r from-[#001833] via-[#002855] to-[#001833] border-t-2 border-[#FF6600]">
        <div className="max-w-[1200px] mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-center flex-wrap gap-0">
            {VALUES.map((val, idx) => (
              <span key={val} className="flex items-center">
                <span className="text-white font-bold text-sm sm:text-base md:text-lg tracking-wide px-4 sm:px-6 py-1 hover:text-[#FF9933] transition-colors cursor-default">
                  {val}
                </span>
                {idx < VALUES.length - 1 && (
                  <span className="text-[#FF6600] font-light text-xl select-none">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
