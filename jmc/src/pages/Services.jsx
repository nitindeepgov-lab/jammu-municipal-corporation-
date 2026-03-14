import { Link } from 'react-router-dom'
import SubpageTemplate from '../components/SubpageTemplate'

const topServices = [
  {
    name: 'Pay Property Tax',
    desc: 'Pay dues online instantly',
    to: '/pay-online',
    color: 'bg-blue-600',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    name: 'Register Complaint',
    desc: 'File grievances online',
    href: 'https://jmc.jk.gov.in/OnlineGrievances.aspx',
    color: 'bg-rose-600',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
  {
    name: 'Birth / Death Certificate',
    desc: 'Apply via JAKSMAC portal',
    href: 'https://serviceonline.gov.in/jammu/',
    color: 'bg-teal-600',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    name: 'Building Permission',
    desc: 'Apply for plan sanction',
    href: 'https://jmc.jk.gov.in/PermissionForm.aspx',
    color: 'bg-amber-600',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    name: 'Trade License',
    desc: 'Apply or renew license',
    href: 'https://jmc.jk.gov.in/easedoing.html',
    color: 'bg-purple-600',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    name: 'E-Governance Portal',
    desc: 'All digital services hub',
    href: 'https://jmc.jk.gov.in/egov.html',
    color: 'bg-indigo-600',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
]

const categories = [
  {
    title: 'Online Payments',
    accent: '#1d4ed8',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    items: [
      { name: 'Pay Property Tax', to: '/pay-online', desc: 'Pay property tax dues online securely' },
      { name: 'Water Bill Payment', href: 'https://jmc.jk.gov.in/pddeservices.html', desc: 'Pay water and sewerage bills' },
      { name: 'Online Payment Portal', to: '/pay-online', desc: 'All JMC dues, fees and charges' },
    ],
  },
  {
    title: 'Certificates & Registrations',
    accent: '#0f766e',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    items: [
      { name: 'Birth / Death Certificate', href: 'https://serviceonline.gov.in/jammu/', desc: 'Apply online via JAKSMAC portal' },
      { name: 'Trade License', href: 'https://jmc.jk.gov.in/easedoing.html', desc: 'Apply or renew your trade license' },
      { name: 'Ease of Doing Business', href: 'https://jmc.jk.gov.in/easedoing.html', desc: 'Business registration & facilitation' },
    ],
  },
  {
    title: 'Building & Planning',
    accent: '#b45309',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    items: [
      { name: 'Building Plan Permission', href: 'https://jmc.jk.gov.in/PermissionForm.aspx', desc: 'Apply for building plan sanction' },
      { name: 'Rehri / Stall License', href: 'https://jmc.jk.gov.in/easedoing.html', desc: 'Apply for rehri stall licence' },
    ],
  },
  {
    title: 'Grievances & Complaints',
    accent: '#be123c',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    ),
    items: [
      { name: 'Register a Complaint', href: 'https://jmc.jk.gov.in/OnlineGrievances.aspx', desc: 'File your grievance online' },
      { name: 'Track Complaint Status', href: 'https://jmc.jk.gov.in/OnlineGrievances.aspx', desc: 'Check status of your complaint' },
    ],
  },
  {
    title: 'Information Services',
    accent: '#4338ca',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    items: [
      { name: 'E-Governance Portal', href: 'https://jmc.jk.gov.in/egov.html', desc: 'Access all e-governance services' },
      { name: 'PDD E-Services', href: 'https://jmc.jk.gov.in/pddeservices.html', desc: 'Power Development Dept services' },
      { name: 'E-Newsletter', href: 'https://jmc.jk.gov.in/newsletter.aspx', desc: 'Download JMC newsletters' },
    ],
  },
  {
    title: 'Smart City Services',
    accent: '#0369a1',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    items: [
      { name: 'Smart City Portal', href: 'https://jmc.jk.gov.in/smartcity.aspx', desc: 'Smart City Mission — Jammu' },
      { name: 'Jammu Suraksha Yojana', href: 'http://www.jammusuraksha.com/', desc: 'Security and welfare scheme' },
    ],
  },
]

function ServiceLink({ item }) {
  const cls =
    'flex items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:border-[#003366]/10 hover:bg-[#f0f4ff] group transition-all duration-150'
  const content = (
    <>
      <span className="w-2 h-2 rounded-full bg-[#FF6600] flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform" />
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-[#003366] group-hover:text-[#FF6600] transition-colors leading-snug truncate">
          {item.name}
        </p>
        <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{item.desc}</p>
      </div>
      <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#FF6600] ml-auto flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
      </svg>
    </>
  )
  return item.to ? (
    <Link to={item.to} className={cls}>{content}</Link>
  ) : (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>{content}</a>
  )
}

export default function Services() {
  return (
    <SubpageTemplate title="Citizen Services" breadcrumb={[{ name: 'Citizen Services' }]}>
      <div className="space-y-8">

        {/* Intro banner */}
        <div className="bg-gradient-to-r from-[#003366] to-[#00509e] rounded-xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-white font-bold text-base mb-1">All JMC Services — One Place</h2>
            <p className="text-blue-200 text-sm leading-relaxed">
              Pay taxes, apply for certificates, register complaints, and access all municipal services
              without visiting the office.
            </p>
          </div>
          <a
            href="https://jmc.jk.gov.in/OnlineGrievances.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 bg-[#FF6600] hover:bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
          >
            Register Complaint
          </a>
        </div>

        {/* Most Used Services */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-[#FF6600] rounded-full" />
            <h2 className="text-sm font-bold text-[#003366] uppercase tracking-wider">Most Used Services</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {topServices.map((s, i) => {
              const cls = `${s.color} text-white rounded-xl p-4 flex flex-col items-center text-center gap-2 hover:opacity-90 hover:shadow-lg transition-all duration-200 cursor-pointer`
              const inner = (
                <>
                  <span className="opacity-90">{s.icon}</span>
                  <span className="text-[11px] font-semibold leading-tight">{s.name}</span>
                  <span className="text-[10px] opacity-75 leading-tight hidden sm:block">{s.desc}</span>
                </>
              )
              return s.to ? (
                <Link key={i} to={s.to} className={cls}>{inner}</Link>
              ) : (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
              )
            })}
          </div>
        </div>

        {/* All Service Categories */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-[#FF6600] rounded-full" />
            <h2 className="text-sm font-bold text-[#003366] uppercase tracking-wider">All Service Categories</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div
                  className="px-5 py-3 flex items-center gap-3"
                  style={{ backgroundColor: cat.accent }}
                >
                  <span className="text-white opacity-90">{cat.icon}</span>
                  <h3 className="text-white font-bold text-sm tracking-wide">{cat.title}</h3>
                  <span className="ml-auto bg-white/20 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    {cat.items.length} services
                  </span>
                </div>
                <div className="p-3 space-y-0.5">
                  {cat.items.map((item, i) => (
                    <ServiceLink key={i} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help bar */}
        <div className="bg-gradient-to-r from-[#FF6600] to-orange-500 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm">Need Assistance?</p>
              <p className="text-orange-100 text-xs">Our helpline is available on all working days</p>
            </div>
          </div>
          <div className="sm:ml-auto flex flex-wrap items-center gap-3">
            <div className="bg-white text-[#FF6600] font-bold text-lg px-5 py-2 rounded-lg shadow-sm">
              1800 180 7207
            </div>
            <span className="text-orange-100 text-xs">10:00 AM – 5:00 PM</span>
          </div>
        </div>

      </div>
    </SubpageTemplate>
  )
}
