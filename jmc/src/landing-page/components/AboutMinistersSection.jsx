import MinistersCarousel from './MinistersCarousel'

export default function AboutMinistersSection() {
  return (
    <section className="py-8 md:py-10 bg-[#f5f7fa] border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 bg-[#FF6600] rounded" />
              <h2 className="text-lg font-bold text-[#003366] uppercase tracking-wide">About JMC</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-4">
              Jammu Municipal Corporation (JMC) is the urban local body responsible for civic
              administration of Jammu city. JMC is committed to providing quality civic services
              including sanitation, water supply, road maintenance, property tax management, and
              public health to the residents of Jammu.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              Established under the J&K Municipal Corporation Act, JMC works towards making
              Jammu a clean, green, and smart city through various government schemes and
              citizen-centric initiatives.
            </p>
            <a
              href="https://jmc.jk.gov.in/information.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#003366] hover:bg-[#FF6600] text-white px-5 py-2 text-sm font-semibold transition-colors rounded shadow-sm"
            >
              Read More
            </a>
          </div>

          <div className="flex flex-col">
            <MinistersCarousel />
          </div>
        </div>
      </div>
    </section>
  )
}
