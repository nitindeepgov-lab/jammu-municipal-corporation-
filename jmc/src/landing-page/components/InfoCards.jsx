import { Link } from 'react-router-dom'
import WhosWho from './WhosWho'
import BulletinBoard from './BulletinBoard'

export default function InfoCards() {
  return (
    <section className="py-3 bg-gradient-to-b from-[#eef2f6] via-[#f6f8fb] to-white border-t border-slate-200/60">
      <div className="max-w-[1250px] mx-auto px-4 space-y-6 md:space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0b3a73] tracking-tight">What&apos;s new</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* About JMC - Left */}
          <div className="relative h-full">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#FF6600] to-[#FF8a33] opacity-15 blur" aria-hidden />
            <div className="relative h-full bg-white border border-slate-200/80 rounded-2xl shadow-sm p-3 md:p-3.5 flex flex-col">
              <div className="flex items-start gap-2.5">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center rounded-full bg-[#003366]/10 text-[#003366] text-[9.5px] font-semibold px-2.5 py-[5px] tracking-tight">City Services</span>
                    <span className="h-px flex-1 bg-slate-200" aria-hidden />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-[13px] md:text-sm font-semibold text-[#003366] tracking-tight">About JMC</h3>
                    <p className="text-gray-700 leading-5 text-[12px]">
                      Jammu Municipal Corporation is the urban local body responsible for civic administration and service delivery to the residents of Jammu city.
                    </p>
                    <p className="text-gray-600 leading-5 text-[12px]">
                      We provide comprehensive civic services including sanitation, water supply, road maintenance, and public health infrastructure across the city.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF6600] shadow-[0_0_0_2px_rgba(255,102,0,0.12)]" aria-hidden />
                      Responsive governance
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0b3a73] shadow-[0_0_0_2px_rgba(11,58,115,0.14)]" aria-hidden />
                      Citizen-first services
                    </div>
                  </div>
                  <Link
                    to="/information"
                    className="inline-flex items-center gap-1.5 text-[#003366] hover:text-[#1a5a96] font-semibold text-[10px] transition-colors"
                  >
                    Learn More
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className="relative w-28 md:w-32  flex-shrink-0 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF6600]/18 via-white to-[#003366]/14 rounded-xl blur" aria-hidden />
                  <div className="absolute -inset-1 rounded-2xl bg-white/60 border border-white/70 shadow-inner" aria-hidden />
                  <img
                    src="/app/aboutimage.png"
                    alt="Jammu Municipal Corporation"
                    className="relative w-full h-full object-cover rounded-xl shadow-md transition-transform duration-300 ease-out scale-110 group-hover:scale-115"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bulletin Board - Middle */}
          <div className="relative h-full">
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-[#0b3a73] via-[#0d63b2] to-[#1d9bf0] opacity-20 blur" aria-hidden />
            <div className="relative h-full bg-white/90 backdrop-blur border border-slate-200 rounded-3xl shadow-[0_14px_38px_rgba(16,24,40,0.08)] p-4 md:p-5">
              <BulletinBoard />
            </div>
          </div>

          {/* Officers / Officials - Right */}
          <div className="relative h-full">
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-[#ff7a18] via-[#ff9f43] to-[#ffd166] opacity-20 blur" aria-hidden />
            <div className="relative h-full bg-white/90 backdrop-blur border border-slate-200 rounded-3xl shadow-[0_14px_38px_rgba(16,24,40,0.08)] p-4 md:p-5">
              <WhosWho />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
