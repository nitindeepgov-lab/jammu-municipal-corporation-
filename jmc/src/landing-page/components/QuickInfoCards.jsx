import { Link } from 'react-router-dom'

const cards = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
      </svg>
    ),
    title: 'Property Tax',
    description: 'Pay dues online, download receipts and check outstanding balances.',
    href: 'https://jmc.jk.gov.in/online-payment.html',
    tag: 'Online Payment',
    color: '#003366',
    bg: '#eef2f7',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    title: 'Water Supply',
    description: 'Report issues, pay water bills and check area supply schedules.',
    href: 'https://jmc.jk.gov.in/pddeservices.html',
    tag: 'Utility',
    color: '#1a6fa8',
    bg: '#e8f4fb',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
    title: 'Certificates',
    description: 'Apply for birth, death and marriage certificates via the govt portal.',
    href: 'https://serviceonline.gov.in/jammu/',
    tag: 'Registration',
    color: '#2e7d32',
    bg: '#e8f5e9',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
      </svg>
    ),
    title: 'Orders & Notices',
    description: 'Access official orders, circulars, govt notifications and public notices.',
    href: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Public',
    tag: 'Information',
    color: '#6a1b9a',
    bg: '#f3e5f5',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
    title: 'Building Permission',
    description: 'Submit and track applications for plan sanction and construction permits.',
    href: 'https://jmc.jk.gov.in/PermissionForm.aspx',
    tag: 'Approval',
    color: '#e65100',
    bg: '#fff3e0',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
      </svg>
    ),
    title: 'File a Grievance',
    description: 'Register complaints online and track the resolution status in real time.',
    href: 'https://jmc.jk.gov.in/OnlineGrievances.aspx',
    tag: 'Complaint',
    color: '#c62828',
    bg: '#ffebee',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
      </svg>
    ),
    title: 'Tenders',
    description: 'View latest JMC tenders, NIT notices and e-procurement opportunities.',
    href: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Tender',
    tag: 'Procurement',
    color: '#00695c',
    bg: '#e0f2f1',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: 'Smart City',
    description: 'Explore Smart City Mission projects and development initiatives in Jammu.',
    href: 'https://jmc.jk.gov.in/smartcity.aspx',
    tag: 'Initiative',
    color: '#1565c0',
    bg: '#e3f2fd',
  },
]

export default function QuickInfoCards() {
  return (
    <section className="py-0 bg-white">
      {/* Section header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="w-1 h-10 bg-[#FF6600] rounded-full flex-shrink-0" />
            <div>
              <p className="text-[11px] font-semibold text-[#FF6600] uppercase tracking-widest mb-0.5">Jammu Municipal Corporation</p>
              <h2 className="text-[#003366] text-xl sm:text-2xl font-bold leading-tight">Citizen Services</h2>
              <p className="text-gray-500 text-xs mt-0.5">Quick access to all civic services — online, fast and paperless</p>
            </div>
          </div>
          <Link
            to="/services"
            className="flex-shrink-0 self-start sm:self-center inline-flex items-center gap-2 border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200"
          >
            View All Services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* Cards grid */}
      <div className="bg-[#f0f4f8] px-4 py-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {cards.map((card, idx) => (
              <a
                key={idx}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 hover:border-transparent transition-all duration-200 hover:-translate-y-0.5 flex flex-col"
              >
                {/* Top accent bar */}
                <div className="h-1 w-full" style={{ backgroundColor: card.color }} />

                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  {/* Icon + tag row */}
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: card.bg, color: card.color }}
                    >
                      {card.icon}
                    </div>
                    <span
                      className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded hidden sm:inline-block"
                      style={{ backgroundColor: card.bg, color: card.color }}
                    >
                      {card.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-bold text-sm sm:text-[15px] mb-1.5 leading-snug transition-colors group-hover:text-[#FF6600]"
                    style={{ color: card.color }}
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed flex-1 hidden sm:block">
                    {card.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-1 mt-3 sm:mt-4">
                    <span className="text-[11px] sm:text-xs font-semibold text-[#FF6600]">Learn More</span>
                    <svg className="w-3.5 h-3.5 text-[#FF6600] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
