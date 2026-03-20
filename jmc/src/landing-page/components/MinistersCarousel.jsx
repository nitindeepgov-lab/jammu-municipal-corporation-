import { useMemo, useState, useEffect, useCallback } from 'react'

const ministerSlides = [
  { image: '/officials/Lg.webp', title: "Hon'ble Lt. Governor", name: 'Manoj Sinha', gender: 'M', social: { facebook: '#', twitter: '#', linkedin: '#' } },
  { image: '/officials/cm.jpeg', title: "Hon'ble Chief Minister", name: 'Omar Abdullah', gender: 'M', social: { facebook: '#', twitter: '#', linkedin: '#' } },
  { image: '/officials/cs.jpg', title: 'Chief Secretary', name: 'Atul Dulloo, IAS', gender: 'M', social: { facebook: '#', twitter: '#', linkedin: '#' } },
  { image: '/officials/comSec.png', title: 'Commissioner Secretary', name: 'Mandeep Kaur, IAS', gender: 'F', social: { facebook: '#', twitter: '#', linkedin: '#' } },
  { image: '/officials/com.jpg', title: 'Commissioner JMC', name: 'Devansh Yadav, IAS', gender: 'M', social: { facebook: '#', twitter: '#', linkedin: '#' } },
]

// Repeat the first minister at the end to make 6 (3 pairs for mobile slideshow)
const allSlides = [...ministerSlides, ministerSlides[0]]

function MinisterCard({ minister }) {
  const honorific = minister.gender === 'F' ? 'Ms.' : 'Mr.'
  return (
    <div className="bg-white border border-slate-200 p-4 md:p-7 shadow-sm flex flex-col items-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#003366]/30 hover:bg-gradient-to-b hover:from-white hover:via-[#f7fbff] hover:to-white">
      <div className="mb-4">
        <div className="w-28 h-28 md:w-36 md:h-36 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-full overflow-hidden border-[3px] border-gray-200">
          <img
            src={minister.image}
            alt={minister.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${minister.name}&size=256&background=f3f4f6&color=003366`
            }}
          />
        </div>
      </div>
      <div className="text-center mb-5 flex-1 w-full">
        <h3 className="text-sm font-semibold text-[#003366] mb-2 leading-tight">{minister.title}</h3>
        <p className="text-xs text-gray-700 font-medium">{honorific} {minister.name}</p>
      </div>
      <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700 text-xs font-semibold py-2.5 px-4 rounded-md transition-all hover:bg-gray-50">
        Profile
      </button>
    </div>
  )
}

export default function MinistersCarousel() {
  const totalPairs = Math.ceil(allSlides.length / 2) // 3 pairs
  const [currentPair, setCurrentPair] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const update = () => setIsMobile(window.matchMedia('(max-width: 767px)').matches)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const goTo = useCallback((idx) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentPair(idx)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning])

  const goNext = useCallback(() => {
    goTo((currentPair + 1) % totalPairs)
  }, [currentPair, totalPairs, goTo])

  const goPrev = useCallback(() => {
    goTo((currentPair - 1 + totalPairs) % totalPairs)
  }, [currentPair, totalPairs, goTo])

  // Auto-advance every 4 seconds (mobile only)
  useEffect(() => {
    if (!isMobile) return
    const timer = setInterval(goNext, 4000)
    return () => clearInterval(timer)
  }, [goNext, isMobile])

  // Get current pair of slides for mobile
  const currentSlides = useMemo(() => {
    const startIdx = currentPair * 2
    return allSlides.slice(startIdx, startIdx + 2)
  }, [currentPair])

  return (
    <div className="bg-white max-w-7xl mx-auto px-4 py-3">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="font-semibold text-lg text-gray-800 tracking-tight">Governing Bodies</h2>
        </div>

        {/* Navigation arrows — mobile only */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={goPrev}
            className="w-8 h-8 rounded-full border border-gray-200 hover:border-[#003366] hover:bg-[#003366] hover:text-white text-gray-400 flex items-center justify-center transition-all duration-200"
            aria-label="Previous"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button
            onClick={goNext}
            className="w-8 h-8 rounded-full border border-gray-200 hover:border-[#003366] hover:bg-[#003366] hover:text-white text-gray-400 flex items-center justify-center transition-all duration-200"
            aria-label="Next"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="p-1 rounded-lg bg-white overflow-hidden">
        {/* Desktop: original 5-column grid showing all ministers */}
        <div className="hidden md:grid md:grid-cols-5 gap-7">
          {ministerSlides.map((minister, idx) => (
            <MinisterCard key={idx} minister={minister} />
          ))}
        </div>

        {/* Mobile: 2-column slideshow with pairs */}
        <div
          className="grid grid-cols-2 gap-4 md:hidden transition-opacity duration-500"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          {currentSlides.map((minister, idx) => (
            <MinisterCard key={`${currentPair}-${idx}`} minister={minister} />
          ))}
        </div>
      </div>

      {/* Dot indicators — mobile only */}
      <div className="flex md:hidden justify-center gap-2 mt-4">
        {Array.from({ length: totalPairs }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentPair
                ? 'w-6 bg-[#003366]'
                : 'w-1.5 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
