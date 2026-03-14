import { useState, useEffect } from 'react'

const ministerSlides = [
  { image: '/officials/LG.jpg', title: "Hon'ble Minister, H&UD", name: 'Satish Sharma' },
  { image: '/officials/cm.jpg', title: "Hon'ble Chief Minister", name: 'Omar Abdullah' },
  { image: '/officials/cs.jpg', title: "Commissioner JMC", name: 'Devansh Yadav, IAS' },
  { image: '/officials/minister3.jpg', title: "Mayor, JMC", name: 'Rajinder Sharma' },
  { image: '/officials/minister4.jpg', title: "Dy. Mayor, JMC", name: 'Purnima Sharma' },
  { image: '/officials/minister5.jpg', title: "Joint Commissioner", name: 'Rajeev Khajuria, JKAS' }
]

export default function MinistersCarousel() {
  const [galleryIndex, setGalleryIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setGalleryIndex((prev) => (prev + 2) % ministerSlides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-white rounded shadow-sm overflow-hidden">
      <div className="bg-[#003366] text-white px-4 py-3 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h2 className="font-bold text-lg">Ministers Profile</h2>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-2 gap-3">
          {[0, 1].map((offset) => {
            const idx = (galleryIndex + offset) % ministerSlides.length
            const minister = ministerSlides[idx]
            return (
              <div key={offset} className="text-center group">
                <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 group-hover:border-[#FF6600] transition-colors">
                  <img
                    src={minister.image}
                    alt={minister.name}
                    className="w-full h-[120px] object-cover transition-transform group-hover:scale-105"
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${minister.name}&size=200&background=003366&color=fff` }}
                  />
                </div>
                <h4 className="text-[#003366] text-xs font-bold mt-2 truncate">{minister.title}</h4>
                <p className="text-gray-600 text-[11px] truncate">{minister.name}</p>
              </div>
            )
          })}
        </div>
        <div className="flex justify-center gap-1 mt-3">
          {[0, 2, 4].map((dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setGalleryIndex(dotIdx)}
              className={`w-2 h-2 rounded-full transition-colors ${galleryIndex === dotIdx ? 'bg-[#FF6600]' : 'bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
