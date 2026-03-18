import { useState, useEffect, useRef } from 'react'

const events = [
  {
    image: 'circle/circle.jpeg',
    title: 'JMC Commissioner Field Visit – Street Light Repairs',
    date: 'April 28, 2025',
    category: 'Field Visit',
    description:
      'JMC Commissioner conducted a comprehensive field visit to oversee ongoing street light repair works across all major roads in Jammu city.',
  },
  {
    image: 'circle/circle2.jpeg',
    title: 'Public Toilet Complex Foundation Stone Laying',
    date: 'April 25, 2025',
    category: 'Infrastructure',
    description:
      'JMC Commissioner laid the foundation stone of a new public toilet complex as part of the ODF Plus initiative for cleaner Jammu city.',
  },
  {
    image: 'circle/circle3.jpeg',
    title: 'Cleanliness Drive at Gandhi Nagar Market',
    date: 'April 20, 2025',
    category: 'Swachh Bharat',
    description:
      'A large-scale cleanliness drive was conducted at Gandhi Nagar Market involving sanitation staff, citizens, and local traders.',
  },
  {
    image: 'circle/circle4.jpeg',
    title: 'Ward-Level Review Meeting on Smart City Projects',
    date: 'April 15, 2025',
    category: 'Smart City',
    description:
      'A comprehensive ward-level review meeting was held to assess the progress of ongoing Smart City projects and urban development initiatives.',
  },
]

/* helper: parse "April 28, 2025" → { day, month } */
function parseDate(str) {
  const d = new Date(str)
  return {
    day: d.getDate(),
    month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
  }
}

/* category → colour map */
const catColors = {
  'Field Visit': { bg: '#E8F5E9', text: '#2E7D32' },
  Infrastructure: { bg: '#E3F2FD', text: '#1565C0' },
  'Swachh Bharat': { bg: '#FFF3E0', text: '#E65100' },
  'Smart City': { bg: '#F3E5F5', text: '#7B1FA2' },
}

export default function Destinations() {
  /* stagger-in animation */
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-10 md:py-14" style={{ background: 'linear-gradient(180deg, #f0f4f8 0%, #e8ecf1 100%)' }}>
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">

          {/* ─── Location Map ─── */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            {/* heading */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #003366, #004d99)' }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </span>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#003366] leading-tight">Our Location</h2>
                <div className="h-[3px] w-12 rounded-full bg-[#FF6600] mt-1" />
              </div>
            </div>

            {/* map */}
            <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-black/5 h-[220px] md:h-[370px]">
              <iframe
                title="Jammu Municipal Corporation Location"
                src="https://maps.google.com/maps?q=Jammu+Municipal+Corporation,+Gole+Market,+Jammu,+Jammu+and+Kashmir&output=embed&z=16&t=k"
                width="100%"
                height="100%"
                className="block"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* address card */}
            <div className="mt-4 bg-white rounded-xl shadow-md ring-1 ring-black/5 px-5 py-4 flex items-start gap-4 hover:shadow-lg transition-shadow duration-300">
              <span
                className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 mt-0.5"
                style={{ background: 'linear-gradient(135deg, #FF6600, #ff8533)' }}
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </span>
              <div>
                <p className="text-sm font-bold text-[#003366]">Jammu Municipal Corporation</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">Gole Market, Jammu — 180001, J&amp;K (UT)</p>
                <a
                  href="https://maps.app.goo.gl/yQKSVBBr1tGtpXY2A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold mt-2 px-3 py-1 rounded-full transition-all duration-300"
                  style={{ background: '#FFF5EE', color: '#FF6600' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#FF6600'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#FFF5EE'; e.currentTarget.style.color = '#FF6600' }}
                >
                  Get Directions
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* ─── Events & Activities ─── */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '150ms',
            }}
          >
            {/* heading */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #003366, #004d99)' }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </span>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#003366] leading-tight">Events &amp; Activities</h2>
                <div className="h-[3px] w-12 rounded-full bg-[#FF6600] mt-1" />
              </div>
            </div>

            {/* scrollable event list */}
            <div
              className="space-y-4 pr-1 overflow-y-auto"
              style={{ maxHeight: '460px', scrollbarWidth: 'thin', scrollbarColor: '#003366 transparent' }}
            >
              {events.map((event, idx) => {
                const { day, month } = parseDate(event.date)
                const cat = catColors[event.category] || { bg: '#F5F5F5', text: '#333' }

                return (
                  <div
                    key={idx}
                    className="group bg-white rounded-xl shadow-md ring-1 ring-black/5 overflow-hidden flex hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateX(0)' : 'translateX(40px)',
                      transition: `opacity 0.5s ease ${200 + idx * 120}ms, transform 0.5s ease ${200 + idx * 120}ms, box-shadow 0.3s ease, translate 0.3s ease`,
                    }}
                  >
                    {/* image with overlay */}
                    <div className="w-28 md:w-32 flex-shrink-0 relative overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
                        }}
                      />
                      {/* gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      {/* date badge */}
                      <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 text-center shadow-sm min-w-[42px]">
                        <span className="block text-lg font-extrabold leading-none text-[#003366]">{day}</span>
                        <span className="block text-[10px] font-bold tracking-wider text-[#FF6600] uppercase">{month}</span>
                      </div>
                    </div>

                    {/* content */}
                    <div className="p-4 flex-1 min-w-0 flex flex-col justify-center">
                      {/* category tag */}
                      <span
                        className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 self-start"
                        style={{ background: cat.bg, color: cat.text }}
                      >
                        {event.category}
                      </span>

                      <a
                        href="#"
                        className="text-sm font-bold text-[#003366] leading-snug line-clamp-2 group-hover:text-[#FF6600] transition-colors duration-300"
                      >
                        {event.title}
                      </a>

                      <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>

                      {/* footer with date text + read more */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                          </svg>
                          {event.date}
                        </div>
                        <span className="text-[11px] font-semibold text-[#FF6600] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                          Read More
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA button */}
            <div className="mt-5">
              <a
                href="#"
                className="group/btn inline-flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                style={{ background: 'linear-gradient(135deg, #FF6600, #ff8533)', color: '#fff' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #e65c00, #FF6600)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #FF6600, #ff8533)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                View All Events
                <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
