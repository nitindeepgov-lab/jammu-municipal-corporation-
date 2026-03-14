import SubpageTemplate from '../components/SubpageTemplate'

const galleryImages = [
  { src: 'https://jmc.jk.gov.in/adminjmcpanel/photo/small/851619341020241901633.jpeg', alt: 'JMC Activity' },
  { src: 'https://jmc.jk.gov.in/adminjmcpanel/photo/small/63050193310202419050567.jpeg', alt: 'JMC Activity' },
  { src: 'https://jmc.jk.gov.in/adminjmcpanel/photo/small/367471719202417047321.jpeg', alt: 'JMC Activity' },
  { src: 'https://jmc.jk.gov.in/adminjmcpanel/photo/small/9093717589202417037846.jpeg', alt: 'JMC Activity' },
  { src: 'https://jmc.jk.gov.in/adminjmcpanel/photo/small/43143281110202428043428.jpg', alt: 'JMC Officials' },
  { src: 'https://jmc.jk.gov.in/adminjmcpanel/photo/small/32136203511202520036306.jpg', alt: 'JMC Officers' },
  { src: 'https://jmc.jk.gov.in/adminjmcpanel/photo/small/80855283710202428055780.jpg', alt: 'JMC Event' },
  { src: 'https://jmc.jk.gov.in/adminjmcpanel/photo/small/83517282710202428017821.jpg', alt: 'JMC Event' },
  { src: 'https://jmc.jk.gov.in/adminjmcpanel/photo/small/72724283010202428024669.jpg', alt: 'JMC Health' },
  { src: 'https://jmc.jk.gov.in/adminjmcpanel/photo/small/40511282610202428011379.jpg', alt: 'JMC Works' },
  { src: 'https://jmc.jk.gov.in/adminjmcpanel/photo/small/64939282910202428039618.jpg', alt: 'JMC Officials' },
  { src: 'https://jmc.jk.gov.in/adminjmcpanel/photo/small/66235282510202428035615.jpg', alt: 'JMC Event' },
]

export default function Gallery() {
  return (
    <SubpageTemplate title="Photo Gallery" breadcrumb={[{ name: 'Photo Gallery' }]}>
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {galleryImages.map((img, idx) => (
            <a
              key={idx}
              href={img.src}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded shadow-sm hover:shadow-lg transition-shadow group"
            >
              <div className="h-40 overflow-hidden bg-gray-200">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.parentNode.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-xs">No Image</div>`
                  }}
                />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://jmc.jk.gov.in/photogallery.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#003366] hover:bg-[#004080] text-white px-8 py-3 rounded font-medium transition-colors"
          >
            View Full Gallery on JMC Portal →
          </a>
        </div>
      </div>
    </SubpageTemplate>
  )
}
