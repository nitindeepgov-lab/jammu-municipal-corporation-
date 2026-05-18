import { Link } from 'react-router-dom'
import WhosWho from './WhosWho'
import BulletinBoard from './BulletinBoard'

export default function InfoCards() {
  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-[#f8fafc] to-white border-b border-gray-100">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-10 md:mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-[3px] rounded-full bg-[#FF6600]" />
            <span className="text-[11px] font-bold text-[#FF6600] tracking-widest uppercase">Updates</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2">
            What's New
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-lg">
            Latest updates and information from the corporation.
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-5 md:gap-6">
          
          {/* About JMC Card */}
          <div className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col h-full hover:border-[#003366]/20 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.1)] transition-all duration-300">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF6600] group-hover:bg-[#FF6600] group-hover:text-white transition-all duration-300 mb-6 group-hover:scale-105">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#003366] transition-colors">
              About JMC
            </h3>
            
            <div className="space-y-3 text-gray-500 text-[13.5px] leading-relaxed mb-6 flex-1">
              <p>
                The urban local body responsible for civic administration and service delivery to the vibrant residents of Jammu city.
              </p>
              <p>
                We provide comprehensive civic services including sanitation, water supply, road maintenance, and public health infrastructure to build a better tomorrow.
              </p>
            </div>

            <div className="mt-auto">
              <Link
                to="/information"
                className="inline-flex items-center text-sm font-semibold text-[#003366] hover:text-[#FF6600] transition-colors group/link"
              >
                Read more
                <svg className="w-4 h-4 ml-1.5 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Bulletin Board Card */}
          <div className="group bg-white border border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col p-6 md:p-8">
            <BulletinBoard />
          </div>

          {/* Officers / WhosWho Card */}
          <div className="group bg-white border border-gray-200 rounded-2xl hover:border-teal-200 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col p-6 md:p-8">
            <WhosWho />
          </div>

        </div>
      </div>
    </section>
  )
}
