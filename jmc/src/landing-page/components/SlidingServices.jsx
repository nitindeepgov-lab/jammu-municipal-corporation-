import { useState } from 'react'
import { Link } from 'react-router-dom'

const departments = [
  {
    name: 'Engineering Department', to: '/departments/engineering',
    icon: <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7.02 7.02 0 0 0-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.47.47 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.47.47 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.37 1.04.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.47.47 0 0 0-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" /></svg>
  },
  {
    name: 'Health Department', to: '/departments/health',
    icon: <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-7 3a1 1 0 0 1 1 1v3h3a1 1 0 0 1 0 2h-3v3a1 1 0 0 1-2 0v-3H8a1 1 0 0 1 0-2h3V7a1 1 0 0 1 1-1z" /></svg>
  },
  {
    name: 'Revenue & Taxation', to: '/departments/revenue-taxation',
    icon: <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" /></svg>
  },
  {
    name: 'Sanitation Department', to: '/departments/sanitation',
    icon: <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M21 9l-9-7-9 7v2h2v9h6v-5h2v5h6v-9h2V9zm-9-4.5L18.5 9H5.5L12 4.5z" /></svg>
  },
  {
    name: 'Urban Planning', to: '/departments/urban-planning',
    icon: <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5v-2h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z" /></svg>
  },
  {
    name: 'Water Supply Division', to: '/departments/water-supply',
    icon: <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
  },
  {
    name: 'Horticulture Department', to: '/departments/horticulture',
    icon: <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c4 0 4-2 8-2s4 2 8 2v-2c-4 0-4-2-8-2-.67 0-1.28.07-1.85.18C14.45 11.25 16 8 17 8z" /></svg>
  },
]

const importantLinks = [
  {
    name: 'Pay Online', to: '/pay-online',
    icon: <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" /></svg>
  },
  {
    name: 'Smart City Tenders', to: '/smart-city-tenders',
    icon: <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" /></svg>
  },
  {
    name: "Commissioner's Desk", to: '/commissioner',
    icon: <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" /></svg>
  },
  {
    name: 'E-Newsletter', to: '/newsletter',
    icon: <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
  },
  {
    name: 'Quick Links', href: '/quick-links',
    icon: <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" /></svg>
  },
  {
    name: 'Feedback', href: '/feedback',
    icon: <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z" /></svg>
  },
  {
    name: 'Web Information Manager', to: '/web-info-manager',
    icon: <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93H7c0 2.08.81 3.98 2.1 5.39L11 17v2.93zM12 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm5.32 3.39A7.966 7.966 0 0 0 19 12h3c0 4.07-2.44 7.58-6 9.13v-2.74Z" /></svg>
  },
]

function LinkItem({ link }) {
  const cls = "flex items-center gap-3.5 text-xs sm:text-sm text-slate-600 hover:text-[#002B5E] hover:bg-slate-50/70 px-3 py-2 rounded-xl transition-all duration-200 group font-bold"
  const inner = (
    <>
      <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-orange-50 group-hover:text-[#FF6600] transition-all duration-300 shrink-0">
        {link.icon}
      </div>
      <span className="flex-1 truncate">{link.name}</span>
      <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
      </svg>
    </>
  )
  if (link.to) return <Link to={link.to} className={cls}>{inner}</Link>
  return <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
}

export default function SlidingServices() {
  const [mobileTab, setMobileTab] = useState('departments')

  return (
    <section className="py-10 md:py-16 bg-[#f8fafc]">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* Section Header */}
        <div className="mb-10 text-left">
          <h2 className="text-2xl md:text-3xl font-black text-[#002B5E] tracking-tight">
            Directory
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1.5 font-medium">
            Browse departments, important civic links, and local information.
          </p>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex md:hidden mb-6 bg-slate-100 rounded-xl p-1 gap-1 border border-slate-200">
          {['departments', 'links', 'about'].map(tab => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              className={`flex-1 py-2.5 text-xs font-extrabold rounded-lg transition-all ${mobileTab === tab
                  ? 'bg-[#002B5E] text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab === 'departments' ? 'Departments' : tab === 'links' ? 'Important Links' : 'About Jammu'}
            </button>
          ))}
        </div>

        {/* Directory Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">

          {/* Col 1: Departments */}
          <div className={`bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 md:block ${mobileTab === 'departments' ? 'block' : 'hidden'}`}>
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-100">
              <div className="w-1 h-5 bg-[#002B5E] rounded-full" />
              <h3 className="font-extrabold text-[#002B5E] text-sm uppercase tracking-wider">Departments</h3>
            </div>
            <div className="space-y-1.5">
              {departments.map((dept, idx) => (
                <LinkItem key={idx} link={dept} />
              ))}
            </div>
            <div className="pt-4 border-t border-slate-50 mt-4">
              <Link
                to="/departments"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6600] hover:text-[#002B5E] transition-colors group"
              >
                View all departments
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Col 2: Important Links */}
          <div className={`bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 md:block ${mobileTab === 'links' ? 'block' : 'hidden'}`}>
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-100">
              <div className="w-1 h-5 bg-[#FF6600] rounded-full" />
              <h3 className="font-extrabold text-[#002B5E] text-sm uppercase tracking-wider">Important Links</h3>
            </div>
            <div className="space-y-1.5">
              {importantLinks.map((link, idx) => (
                <LinkItem key={idx} link={link} />
              ))}
            </div>
            <div className="pt-4 border-t border-slate-50 mt-4">
              <Link
                to="/quick-links"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6600] hover:text-[#002B5E] transition-colors group"
              >
                View all links
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Col 3: About Card */}
          <div className={`bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 md:block ${mobileTab === 'about' ? 'block' : 'hidden'}`}>
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-100">
              <div className="w-1 h-5 bg-green-600 rounded-full" />
              <h3 className="font-extrabold text-[#002B5E] text-sm uppercase tracking-wider">About Jammu</h3>
            </div>

            <div className="space-y-5">
              {/* Image Frame */}
              <div className="relative h-40 overflow-hidden rounded-xl shadow-sm group cursor-pointer">
                <img
                  src="circle/circle.jpeg"
                  alt="Jammu City"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <p className="text-white font-extrabold text-sm drop-shadow-sm">Jammu City</p>
                </div>
              </div>

              <div className="space-y-3 text-left">
                <h4 className="font-black text-[#002B5E] text-sm">Welcome to JMC</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                  Jammu, the winter capital of J&K Union Territory, is served by JMC for all civic
                  needs — from sanitation to infrastructure, property services to public health.
                </p>
                <div className="pt-2">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-1.5 text-xs text-[#FF6600] hover:text-[#002B5E] font-bold transition-colors group"
                  >
                    Know more
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
