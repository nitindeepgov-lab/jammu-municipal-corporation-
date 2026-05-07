import { Link } from 'react-router-dom'

const cards = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
      </svg>
    ),
    title: 'Pay Online',
    description: 'Pay dues online, download receipts and check outstanding balances.',
    href: '/pay-online',
    color: '#003366', // navy
    bg: '#eef2f7',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    title: 'Public Grievance',
    description: 'Report issues, pay water bills and check area supply schedules.',
    href: 'https://myjammu.jk.gov.in/Login/Index',
    color: '#0284c7', // light blue
    bg: '#f0f9ff',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
    title: 'Apply for Birth/Death Certificate',
    description: 'Apply for birth, death and marriage certificates via the govt portal.',
    href: 'https://jansugam.jk.gov.in/login.do',
    color: '#16a34a', // green
    bg: '#f0fdf4',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
      </svg>
    ),
    title: 'Orders & Notices',
    description: 'Access official orders, circulars, govt notifications and public notices.',
    href: '/notices',
    color: '#9333ea', // purple
    bg: '#faf5ff',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
    title: 'Building Permission',
    description: 'Submit and track applications for plan sanction and construction permits.',
    href: 'https://obps.jk.gov.in/BPAMSClient/Home.aspx',
    color: '#ea580c', // orange
    bg: '#fff7ed',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
      </svg>
    ),
    title: 'File a Grievance',
    description: 'Register complaints online and track the resolution status in real time.',
    href: 'https://jmc.jk.gov.in/OnlineGrievances.aspx',
    color: '#dc2626', // red
    bg: '#fef2f2',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
      </svg>
    ),
    title: 'Tenders',
    description: 'View latest JMC tenders, NIT notices and e-procurement opportunities.',
    href: '/notices',
    color: '#0d9488', // teal
    bg: '#f0fdfa',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: 'Smart City',
    description: 'View Jammu Smart City Limited tenders, RFPs, and procurement opportunities.',
    to: '/smart-city-tenders',
    color: '#2563eb', // blue
    bg: '#eff6ff',
  },
]

export default function QuickInfoCards() {
  return (
    <section className="py-4 bg-white border-b border-gray-100">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight mb-2">
              Citizen Services
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Quick access to essential municipal services.
            </p>
          </div>
          <Link
            to="/services"
            className="group hidden md:inline-flex items-center gap-2 text-sm font-medium text-[#003366] hover:text-[#FF6600] transition-colors"
          >
            View all services
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {cards.map((card, idx) => {
            const isInternal = card.to || (card.href && card.href.startsWith('/'))
            
            const cardInner = (
              <div 
                className="group h-full bg-white rounded-xl p-6 border border-gray-200 hover:shadow-sm transition-all duration-200 flex flex-col"
                style={{ '--hover-color': card.color }}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 transition-colors"
                  style={{ backgroundColor: card.bg, color: card.color }}
                >
                  {card.icon}
                </div>
                <h3 className="text-[15px] font-semibold text-gray-900 mb-2 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                  {card.description}
                </p>
                <div 
                  className="mt-auto flex items-center text-sm font-medium text-gray-400 transition-colors"
                  style={{ color: card.color }}
                >
                  Access Portal
                  <svg className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            )

            return isInternal ? (
              <Link key={idx} to={card.to || card.href} className="block h-full outline-none focus:ring-2 focus:ring-[#003366] rounded-xl cursor-pointer">
                {cardInner}
              </Link>
            ) : (
              <a key={idx} href={card.href} target="_blank" rel="noopener noreferrer" className="block h-full outline-none focus:ring-2 focus:ring-[#003366] rounded-xl cursor-pointer">
                {cardInner}
              </a>
            )
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 md:hidden">
          <Link
            to="/services"
            className="block w-full text-center bg-gray-50 hover:bg-gray-100 text-[#003366] font-medium py-3 rounded-xl transition-colors"
          >
            View all services
          </Link>
        </div>
      </div>
    </section>
  )
}
