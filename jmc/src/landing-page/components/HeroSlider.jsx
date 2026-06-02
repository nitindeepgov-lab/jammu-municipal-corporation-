import { useState, useEffect, useRef } from 'react'
import NewsTicker from './NewsTicker'
import { getHeroSlides } from '../../services/strapiApi'
import { STRAPI_URL } from '../../config/api'

// Fallback slides used until CMS data loads or if CMS has no entries
const FALLBACK_SLIDES = [
  { image: '/banner/jmc-office.jpeg',  title: 'Infrastructure Development',      subtitle: 'Building roads, parks, and amenities for a better Jammu' },
  { image: '/banner/banner10.png',     title: 'Jammu Municipal Corporation',     subtitle: 'Committed to serving the residents of Jammu City' },
  { image: '/banner/banner9.jpg',      title: 'Cleaner, Greener Jammu',          subtitle: "JMC's commitment to sanitation and environment" },
  { image: '/banner/banner1.jpg',      title: 'Infrastructure Development',      subtitle: 'Building roads, parks, and amenities for a better Jammu' },
  { image: '/banner/banner8.jpeg',     title: 'Infrastructure Development',      subtitle: 'Building roads, parks, and amenities for a better Jammu' },
]

function getImageUrl(slide) {
  const url = slide?.image?.url
  if (!url) return null
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${STRAPI_URL}${url}`
}

function normaliseSlide(item) {
  return {
    image: getImageUrl(item) || '/banner/banner10.png',
    title: item.title || '',
    subtitle: item.subtitle || '',
  }
}

export default function HeroSlider() {
  const [slides, setSlides] = useState(FALLBACK_SLIDES)
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    getHeroSlides()
      .then((res) => {
        const data = res?.data?.data || []
        if (data.length > 0) {
          setSlides(data.map(normaliseSlide))
        }
        // If CMS empty, keep fallback slides
      })
      .catch(() => {
        // Keep fallback slides on error
      })
  }, [])

  const next = () => setCurrent(c => (c + 1) % slides.length)
  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length)

  useEffect(() => {
    if (slides.length <= 1) return
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [slides.length])

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
              className="w-full h-full object-cover md:object-fill bg-black"
              onError={(e) => { e.target.src = '/banner/banner10.png' }}
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
