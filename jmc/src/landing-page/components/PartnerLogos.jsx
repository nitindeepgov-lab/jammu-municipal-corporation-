const partners = [
  { name: 'Data.gov.in', logo: 'footer/data.png' },
  { name: 'Incredible India', logo: 'footer/incredible.png' },
  { name: 'India.gov.in', logo: 'footer/lion.png' },
  { name: 'Digital India', logo: 'footer/dic.png' },
  { name: 'MyGov', logo: 'footer/myGov.png' }
]

export default function PartnerLogos() {
  return (
    <section className="py-5 md:py-6 bg-white border-t border-gray-200 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 mb-3">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Our Partners &amp; Government Portals</p>
      </div>
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...partners, ...partners].map((partner, idx) => (
            <a key={idx} href="#" className="flex-shrink-0 mx-2 hover:opacity-80 transition-opacity">
              <div className="w-34 h-20 bg-gray-100 rounded border border-gray-200 flex items-center justify-center ">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
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
