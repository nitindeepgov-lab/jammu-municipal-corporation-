import { Link } from 'react-router-dom'

const cards = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
      </svg>
    ),
    title: 'Pay Online',
    description: 'Pay dues, download receipts and check outstanding property tax balances.',
    href: '/pay-online',
    accent: '#FF6600',
    from: '#FF6600',
    to: '#e85500',
    tag: 'Property Tax',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    title: 'Public Grievance',
    description: 'Report civic issues and track resolution status in real time.',
    href: 'https://myjammu.jk.gov.in/Login/Index',
    accent: '#0284c7',
    from: '#0284c7',
    to: '#0369a1',
    tag: 'Complaint Portal',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
    title: 'Birth / Death Certificate',
    description: 'Apply for birth, death and marriage certificates via the govt portal.',
    href: 'https://jansugam.jk.gov.in/login.do',
    accent: '#16a34a',
    from: '#16a34a',
    to: '#15803d',
    tag: 'eServices',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
      </svg>
    ),
    title: 'Orders & Notices',
    description: 'Access official orders, circulars, govt notifications and public notices.',
    href: '/notices',
    accent: '#9333ea',
    from: '#9333ea',
    to: '#7e22ce',
    tag: 'Circulars',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
    title: 'Building Permission',
    description: 'Submit and track plan sanction & construction permit applications.',
    href: 'https://obps.jk.gov.in/BPAMSClient/Home.aspx',
    accent: '#ea580c',
    from: '#ea580c',
    to: '#c2410c',
    tag: 'Urban Planning',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
      </svg>
    ),
    title: 'File a Grievance',
    description: 'Register complaints online and track the resolution status.',
    href: 'https://jmc.jk.gov.in/OnlineGrievances.aspx',
    accent: '#dc2626',
    from: '#dc2626',
    to: '#b91c1c',
    tag: 'Grievance Cell',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
      </svg>
    ),
    title: 'Tenders',
    description: 'View latest JMC tenders, NIT notices and e-procurement opportunities.',
    href: '/notices',
    accent: '#0d9488',
    from: '#0d9488',
    to: '#0f766e',
    tag: 'Procurement',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: 'Smart City',
    description: 'View Jammu Smart City Limited tenders, RFPs, and smart infrastructure updates.',
    to: '/smart-city-tenders',
    accent: '#2563eb',
    from: '#2563eb',
    to2: '#1d4ed8',
    tag: 'Smart Jammu',
  },
]

function ServiceCard({ card, idx }) {
  const isInternal = card.to || (card.href && card.href.startsWith('/'))
  const delay = `${idx * 60}ms`

  const inner = (
    <div
      className="group relative h-full bg-white rounded-2xl border border-slate-200/80 hover:border-transparent overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10 flex flex-col"
      style={{ '--accent': card.accent }}
    >
      {/* Top accent gradient bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: `linear-gradient(90deg, ${card.from}, ${card.accent}aa)` }}
      />

      {/* Hover background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${card.accent}08 0%, transparent 70%)` }}
      />

      <div className="relative p-5 sm:p-6 flex flex-col flex-1">
        {/* Tag chip */}
        <div className="flex items-start justify-between mb-4">
          {/* Icon box */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm"
            style={{
              backgroundColor: `${card.accent}15`,
              color: card.accent,
            }}
          >
            {card.icon}
          </div>

          {/* Category tag */}
          <span
            className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-1 rounded-full opacity-80"
            style={{ backgroundColor: `${card.accent}12`, color: card.accent }}
          >
            {card.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-extrabold text-[#002B5E] mb-1.5 group-hover:text-[#001f4d] transition-colors leading-snug">
          {card.title}
        </h3>

        {/* Description */}
        <p className="text-[13px] text-slate-500 leading-relaxed flex-1 mb-5">
          {card.description}
        </p>

        {/* CTA link */}
        <div
          className="mt-auto flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-wider transition-all duration-200"
          style={{ color: card.accent }}
        >
          Access Portal
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>

      {/* Bottom corner decoration */}
      <div
        className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{ backgroundColor: `${card.accent}06` }}
      />
    </div>
  )

  if (isInternal) {
    return (
      <Link
        key={idx}
        to={card.to || card.href}
        className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#002B5E] rounded-2xl"
        style={{ animationDelay: delay }}
      >
        {inner}
      </Link>
    )
  }
  return (
    <a
      key={idx}
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#002B5E] rounded-2xl"
      style={{ animationDelay: delay }}
    >
      {inner}
    </a>
  )
}

export default function QuickInfoCards() {
  return (
    <section className="py-12 md:py-18 relative overflow-hidden" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[#f7f9fc]" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #002B5E 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-[1250px] mx-auto px-4 sm:px-6">

        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            {/* Label */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1">
                <div className="w-6 h-[3px] rounded-full bg-[#FF6600]" />
                <div className="w-3 h-[3px] rounded-full bg-[#002B5E]/30" />
              </div>
              <span className="text-[11px] font-extrabold text-[#FF6600] tracking-[0.2em] uppercase">
                Services
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#002B5E] tracking-tight mb-2 leading-tight">
              Citizen <span className="text-[#FF6600]">Services</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-md leading-relaxed">
              Quick access to essential municipal services — online, transparent, and available 24×7.
            </p>
          </div>

          {/* Stats row + View all */}
          <div className="flex items-center gap-6 shrink-0">
            {/* Mini stats */}
            <div className="hidden md:flex items-center gap-5">
              {[
                { val: '8', label: 'Services' },
                { val: '24×7', label: 'Available' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-xl font-black text-[#002B5E] leading-none">{s.val}</p>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">{s.label}</p>
                </div>
              ))}
              <div className="w-px h-8 bg-slate-200" />
            </div>

            <Link
              to="/services"
              className="group hidden md:inline-flex items-center gap-2 bg-[#002B5E] hover:bg-[#FF6600] text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              View all
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {cards.map((card, idx) => (
            <ServiceCard key={idx} card={card} idx={idx} />
          ))}
        </div>

        {/* ── Mobile: View all button ── */}
        <div className="mt-7 md:hidden">
          <Link
            to="/services"
            className="flex items-center justify-center gap-2 w-full bg-[#002B5E] text-white font-bold text-sm py-3 rounded-xl shadow-sm"
          >
            View all services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}
