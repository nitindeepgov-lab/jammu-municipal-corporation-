import { Link } from 'react-router-dom'

const cards = [
  {
    icon: (
      <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: 'Pay Online',
    description: 'Pay dues, download receipts and check outstanding property tax balances.',
    to: '/pay-online',
    accent: '#FF6600',
    tag: 'Property Tax',
  },
  {
    icon: (
      <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Public Grievance',
    description: 'Report civic issues and track resolution status in real time.',
    href: 'https://myjammu.jk.gov.in/Login/Index',
    accent: '#0284c7',
    tag: 'Complaint Portal',
  },
  {
    icon: (
      <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Birth / Death Certificate',
    description: 'Apply for birth, death and marriage certificates via the govt portal.',
    href: 'https://jansugam.jk.gov.in/login.do',
    accent: '#16a34a',
    tag: 'eServices',
  },
  {
    icon: (
      <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: 'Orders & Notices',
    description: 'Access official orders, circulars, govt notifications and public notices.',
    to: '/notices',
    accent: '#9333ea',
    tag: 'Circulars',
  },
  {
    icon: (
      <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Building Permission',
    description: 'Submit and track plan sanction & construction permit applications.',
    href: 'https://obps.jk.gov.in/BPAMSClient/Home.aspx',
    accent: '#ea580c',
    tag: 'Urban Planning',
  },
  {
    icon: (
      <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    ),
    title: 'File a Grievance',
    description: 'Register complaints online and track the resolution status.',
    href: 'https://jmc.jk.gov.in/OnlineGrievances.aspx',
    accent: '#dc2626',
    tag: 'Grievance Cell',
  },
  {
    icon: (
      <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    title: 'Tenders',
    description: 'View latest JMC tenders, NIT notices and e-procurement opportunities.',
    to: '/notices',
    accent: '#0d9488',
    tag: 'Procurement',
  },
  {
    icon: (
      <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Smart City',
    description: 'View Jammu Smart City Limited tenders, RFPs, and smart infrastructure updates.',
    to: '/smart-city-tenders',
    accent: '#2563eb',
    tag: 'Smart Jammu',
  },
]

function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
}

function ServiceCard({ card, idx }) {
  const isInternal = card.to || (card.href && card.href.startsWith('/'))
  const delay = `${idx * 40}ms`
  const rgb = hexToRgb(card.accent)

  const inner = (
    <div
      className="service-card-minimal"
      style={{
        '--card-accent': card.accent,
        '--card-accent-light': `${card.accent}10`,
        '--card-accent-rgb': rgb
      }}
    >
      <div className="relative p-5 sm:p-6 flex flex-col h-full z-10">

        {/* Card Header: Icon + Category Badge */}
        <div className="flex items-center justify-between mb-5">
          <div className="service-icon-box">
            {card.icon}
          </div>
          <span className="service-tag">
            {card.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="service-title">
          {card.title}
        </h3>

        {/* Description */}
        <p className="service-desc">
          {card.description}
        </p>

        {/* Bottom CTA */}
        <div className="service-cta">
          <span>Access Portal</span>
          <svg
            className="w-3.5 h-3.5"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>

      </div>
    </div>
  )

  if (isInternal) {
    return (
      <Link
        key={idx}
        to={card.to || card.href}
        className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#002B5E]/30 rounded-2xl"
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
      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#002B5E]/30 rounded-2xl"
      style={{ animationDelay: delay }}
    >
      {inner}
    </a>
  )
}

export default function QuickInfoCards() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-[#fafbfc]">

      {/* Premium ambient glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#002B5E]/3 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#FF6600]/3 blur-[100px] pointer-events-none" />

      {/* Subtle Dot texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #002B5E 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-[1250px] mx-auto px-4 sm:px-6">

        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            {/* Label */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1">
                <div className="w-5 h-[3px] rounded-full bg-[#FF6600]" />
                <div className="w-2.5 h-[3px] rounded-full bg-[#002B5E]/20" />
              </div>
              <span className="text-[10px] font-extrabold text-[#FF6600] tracking-[0.25em] uppercase">
                Services
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#002B5E] tracking-tight mb-3 leading-tight">
              Citizen <span className="text-[#FF6600]">Services</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-[15px] max-w-lg leading-relaxed">
              Quick access to essential municipal services — online, transparent, and available 24×7.
            </p>
          </div>

          {/* Stats row + View all */}
          <div className="flex items-center gap-6 shrink-0">
            {/* Mini stats */}
            <div className="hidden md:flex items-center gap-6">
              <div className="w-px h-8 bg-slate-200" />
            </div>

            <Link
              to="/services"
              className="group hidden md:inline-flex items-center gap-2 bg-[#002B5E] hover:bg-[#FF6600] text-white text-xs font-extrabold uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              View all
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, idx) => (
            <ServiceCard key={idx} card={card} idx={idx} />
          ))}
        </div>

        {/* ── Mobile: View all button ── */}
        <div className="mt-8 md:hidden">
          <Link
            to="/services"
            className="flex items-center justify-center gap-2 w-full bg-[#002B5E] text-white font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-sm"
          >
            View all services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>

      {/* Modern custom CSS */}
      <style>{`
        .service-card-minimal {
          position: relative;
          height: 100%;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 2px 4px -2px rgba(0, 0, 0, 0.01);
        }

        .service-card-minimal:hover {
          transform: translateY(-4px);
          border-color: var(--card-accent);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.02), 0 8px 10px -6px rgba(0, 0, 0, 0.02), 0 0 20px rgba(var(--card-accent-rgb), 0.05);
        }

        .service-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f8fafc;
          border: 1px solid #f1f5f9;
          color: #64748b;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-card-minimal:hover .service-icon-box {
          background-color: var(--card-accent);
          border-color: var(--card-accent);
          color: #ffffff;
          transform: scale(1.05) rotate(2deg);
        }

        .service-tag {
          font-size: 8.5px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          padding: 4px 9px;
          border-radius: 9999px;
          background-color: #f8fafc;
          color: #64748b;
          border: 1px solid #f1f5f9;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-card-minimal:hover .service-tag {
          background-color: var(--card-accent-light);
          color: var(--card-accent);
          border-color: transparent;
        }

        .service-title {
          font-size: 14.5px;
          font-weight: 700;
          color: #002B5E;
          margin-bottom: 6px;
          line-height: 1.4;
          transition: color 0.3s ease;
        }

        .service-card-minimal:hover .service-title {
          color: #001e42;
        }

        .service-desc {
          font-size: 12.5px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 20px;
          flex-grow: 1;
        }

        .service-cta {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #64748b;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: auto;
          transition: all 0.3s ease;
        }

        .service-card-minimal:hover .service-cta {
          color: var(--card-accent);
        }

        .service-cta svg {
          transition: transform 0.3s ease;
        }

        .service-card-minimal:hover .service-cta svg {
          transform: translateX(3px);
        }
      `}</style>
    </section>
  )
}
