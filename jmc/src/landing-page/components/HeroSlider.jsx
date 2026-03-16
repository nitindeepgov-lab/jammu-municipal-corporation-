import { useState, useEffect, useRef } from 'react'
import NewsTicker from './NewsTicker'

const slides = [
  {
    image: '/banner/banner8.jpeg',
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
    image: '/banner/banner1.jpg',
    title: 'Infrastructure Development',
    subtitle: 'Building roads, parks, and amenities for a better Jammu',
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  const next = () => setCurrent(c => (c + 1) % slides.length)
  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length)

  useEffect(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [])

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
              className="w-full h-full object-cover md:object-fill  bg-black"
              onError={(e) => { e.target.src = '/banner/banner1.jpg' }}
            />
            {/* gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
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

      <NewsTicker />

    </section>
  )
}
