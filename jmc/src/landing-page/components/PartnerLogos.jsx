const partners = [
  { name: 'Data.gov.in', logo: 'footer/data.png' },
  { name: 'Incredible India', logo: 'footer/incredible.png' },
  { name: 'India.gov.in', logo: 'footer/lion.png' },
  { name: 'Digital India', logo: 'footer/dic.png' },
  { name: 'MyGov', logo: 'footer/myGov.png' }
]

export default function PartnerLogos() {
  return (
    <section className="py-8 md:py-10 bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 mb-6">
        <div className="flex items-center justify-center gap-3">
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-gray-300" />
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] text-center">Our Partners &amp; Government Portals</p>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-gray-300" />
        </div>
      </div>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee whitespace-nowrap">
          {[...partners, ...partners, ...partners].map((partner, idx) => (
            <a key={idx} href="#" className="flex-shrink-0 mx-3 hover:opacity-90 transition-opacity group">
              <div className="w-40 h-20 bg-white rounded-xl border border-gray-200 flex items-center justify-center px-4 shadow-sm group-hover:shadow-md group-hover:border-gray-300 transition-all duration-300">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-[48px] max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                  onError={(e) => { 
                    e.target.style.display = 'none'
                    e.target.parentElement.innerHTML = `<span class="text-gray-600 text-xs font-medium text-center">${partner.name}</span>`
                  }}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
