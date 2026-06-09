import { useState, useEffect, useRef } from 'react'
import NewsTicker from './NewsTicker'
import { getHeroSlides } from '../../services/strapiApi'
import { STRAPI_URL } from '../../config/api'

function getImageUrl(slide) {
  const url = slide?.image?.url || slide?.image_url
  if (!url) return null
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  // Relative paths (e.g. /api/neon-uploads/...) must be served from the CMS, not the frontend origin
  return `${STRAPI_URL}${url.startsWith('/') ? url : `/${url}`}`
}

function normaliseSlide(item) {
  return {
    image: getImageUrl(item),
    title: item.title || '',
    subtitle: item.subtitle || '',
  }
}

export default function HeroSlider() {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(0)
  const [loadedIndices, setLoadedIndices] = useState([0, 1])
  const timerRef = useRef(null)

  useEffect(() => {
    getHeroSlides()
      .then((res) => {
        const data = res?.data?.data || []
        setSlides(data.map(normaliseSlide).filter((slide) => slide.image))
      })
      .catch(() => setSlides([]))
      .finally(() => setLoading(false))
  }, [])

  const next = () => {
    if (slides.length <= 1) return
    setCurrent((c) => (c + 1) % slides.length)
  }
  const prev = () => {
    if (slides.length <= 1) return
    setCurrent((c) => (c - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    if (slides.length <= 1) return
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [slides.length])

  // Smart prefetching: only load current slide and next slide to save bandwidth
  useEffect(() => {
    if (slides.length > 0) {
      const nextIdx = (current + 1) % slides.length
      setLoadedIndices((prev) => {
        if (!prev.includes(current) || !prev.includes(nextIdx)) {
          const nextSet = new Set([...prev, current, nextIdx])
          return Array.from(nextSet)
        }
        return prev
      })
    }
  }, [current, slides.length])

  return (
    <section className="relative overflow-hidden" aria-roledescription="carousel" aria-label="JMC Home Banner">

      {/* ── Slide images ── */}
      <div className="relative h-[220px] sm:h-[320px] md:h-[460px] lg:h-[490px]">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[#002b5e] to-[#001f3d] text-white">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="text-sm font-medium tracking-wide">Loading CMS banners...</span>
            </div>
          </div>
        ) : slides.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[#002b5e] to-[#001f3d] text-white">
            <span className="text-sm font-medium tracking-wide">No banner slides are published in the CMS.</span>
          </div>
        ) : slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={idx !== current}
          >
            {loadedIndices.includes(idx) && (
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover md:object-fill bg-black"
                loading={idx === 0 ? "eager" : "lazy"}
                onError={(e) => { e.target.src = '/banner/banner10.png' }}
              />
            )}
            {/* gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
          </div>
        ))}
      </div>

        {slides.length > 1 && (
          <>
            {/* ── Arrows ── */}
            <button onClick={prev} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-[#FF6600] text-white p-1.5 sm:p-2.5 rounded-full transition-colors z-10" aria-label="Previous slide">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button onClick={next} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-[#FF6600] text-white p-1.5 sm:p-2.5 rounded-full transition-colors z-10" aria-label="Next slide">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </button>
          </>
        )}

      <NewsTicker />

    </section>
  )
}
