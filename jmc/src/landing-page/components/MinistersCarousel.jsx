import { useMemo, useState, useEffect } from 'react'

const ministerSlides = [
  { image: '/officials/LG.jpg', title: "Hon'ble Lt. Governor", name: 'Manoj Sinha', gender: 'M', social: { facebook: '#', twitter: '#', linkedin: '#' } },
  { image: '/officials/cm.jpg', title: "Hon'ble Chief Minister", name: 'Omar Abdullah', gender: 'M', social: { facebook: '#', twitter: '#', linkedin: '#' } },
  { image: '/officials/cs.jpg', title: 'Chief Secretary', name: 'Atul Dulloo, IAS', gender: 'M', social: { facebook: '#', twitter: '#', linkedin: '#' } },
    { image: '/officials/comSec.jpg', title: 'Commissioner Secretary', name: 'Mandeep Kaur, IAS', gender: 'F', social: { facebook: '#', twitter: '#', linkedin: '#' } },
  { image: '/officials/com.jpg', title: 'Commissioner JMC', name: 'Devansh Yadav, IAS', gender: 'M', social: { facebook: '#', twitter: '#', linkedin: '#' } },
]

export default function MinistersCarousel() {
  // Ensure consistent ordering without rotation
  const slides = useMemo(() => ministerSlides, [])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const update = () => setIsMobile(window.matchMedia('(max-width: 767px)').matches)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const visibleSlides = useMemo(() => {
    if (!isMobile) return slides
    // Show the first two on mobile; no paging controls
    return slides.slice(0, 2)
  }, [isMobile, slides])

  return (
    <div className="bg-white max-w-7xl mx-auto px-4 py-3">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h2 className="font-semibold text-lg text-gray-800 tracking-tight">Governing Bodies</h2>
      </div>

      <div className="p-1 rounded-lg bg-white">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-7">
          {visibleSlides.map((minister, idx) => {
            const honorific = minister.gender === 'F' ? 'Ms.' : 'Mr.'
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 p-4 md:p-7 shadow-sm flex flex-col items-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#003366]/30 hover:bg-gradient-to-b hover:from-white hover:via-[#f7fbff] hover:to-white"
              >
                {/* Profile Image Container */}
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

                {/* Content */}
                <div className="text-center mb-5 flex-1 w-full">
                  <h3 className="text-sm font-semibold text-[#003366] mb-2 leading-tight">
                    {minister.title}
                  </h3>
                  <p className="text-xs text-gray-700 font-medium">
                    {honorific} {minister.name}
                  </p>
                </div>

                {/* Profile Button */}
                <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700 text-xs font-semibold py-2.5 px-4 rounded-md transition-all hover:bg-gray-50">
                  Profile
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
