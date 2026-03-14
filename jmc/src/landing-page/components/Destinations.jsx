const events = [
  {
    image: 'circle/circle.jpeg',
    title: 'JMC Commissioner Field Visit – Street Light Repairs',
    date: 'April 28, 2025',
    description:
      'JMC Commissioner conducted a comprehensive field visit to oversee ongoing street light repair works across all major roads in Jammu city.',
  },
  {
    image: 'circle/circle2.jpeg',
    title: 'Public Toilet Complex Foundation Stone Laying',
    date: 'April 25, 2025',
    description:
      'JMC Commissioner laid the foundation stone of a new public toilet complex as part of the ODF Plus initiative for cleaner Jammu city.',
  },
  {
    image: 'circle/circle3.jpeg',
    title: 'Cleanliness Drive at Gandhi Nagar Market',
    date: 'April 20, 2025',
    description:
      'A large-scale cleanliness drive was conducted at Gandhi Nagar Market involving sanitation staff, citizens, and local traders.',
  },
]

export default function Destinations() {
  return (
    <section className="py-8 md:py-10 bg-[#f5f5f5]">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">

          {/* Location Map */}
          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-1 pb-2 border-b-2 border-[#FF6600] inline-block">
              Our Location
            </h2>
            <div className="mt-4 rounded overflow-hidden border border-gray-200 shadow-sm h-[220px] md:h-[380px]">
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
            <div className="mt-3 bg-white rounded border border-gray-200 px-4 py-3 flex items-start gap-3">
              <svg className="w-5 h-5 text-[#FF6600] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <div>
                <p className="text-sm font-semibold text-[#003366]">Jammu Municipal Corporation</p>
                <p className="text-xs text-gray-500 mt-0.5">Gole Market, Jammu — 180001, J&amp;K (UT)</p>
                <a
                  href="https://maps.app.goo.gl/yQKSVBBr1tGtpXY2A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#FF6600] hover:underline mt-1 inline-block font-medium"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>

          {/* Events */}
          <div>
            <div className="bg-[#003366] text-white px-4 py-3 mb-4 inline-block rounded-sm">
              <h2 className="text-xl font-bold">Events &amp; Activities</h2>
            </div>
            <div className="h-[220px] md:h-[380px] overflow-y-auto space-y-4 pr-1">
              {events.map((event, idx) => (
                <div key={idx} className="bg-white rounded shadow-sm overflow-hidden flex">
                  <div className="w-24 flex-shrink-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
                      }}
                    />
                  </div>
                  <div className="p-3 flex-1 min-w-0">
                    <a href="#" className="text-sm font-semibold text-[#003366] hover:underline line-clamp-2 block">
                      {event.title}
                    </a>
                    <p className="text-xs text-[#FF6600] mt-1 font-medium">{event.date}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <a
                href="#"
                className="border border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white text-sm px-5 py-2 inline-block transition-colors rounded"
              >
                View All Events
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
