import { Link, useLocation } from 'react-router-dom'
import PageLayout from './PageLayout'

const PAGE_NAV = [
  { name: 'Home', to: '/' },
  { name: 'About JMC', to: '/about' },
  { name: 'Governing Bodies', to: '/officials' },
  { name: "Commissioner's Desk", to: '/commissioner' },
  { name: 'E-Governance', to: '/egov' },
  { name: 'Citizen Services', to: '/services' },
  { name: 'Orders & Circulars', to: '/notices' },
  { name: 'Smart City', to: '/smart-city' },
  { name: 'Development Works', to: '/development-works' },
  { name: 'Photo Gallery', to: '/gallery' },
  { name: 'Swachh Mission', to: '/swachh-mission' },
  { name: 'RTI', to: '/rti' },
  { name: 'Contact Us', to: '/contact' },
  { name: 'Feedback', to: '/feedback' },
]

const IMPORTANT_LINKS = [
  { name: 'Pay Online', to: '/pay-online' },
  { name: 'Online Grievance', href: 'https://jmc.jk.gov.in/OnlineGrievances.aspx' },
  { name: 'JAKSMAC e-Services', href: 'https://serviceonline.gov.in/jammu/' },
  { name: 'PDD E-Services', href: 'https://jmc.jk.gov.in/pddeservices.html' },
  { name: 'Tenders', href: 'https://jmc.jk.gov.in/tenders.aspx' },
  { name: 'RTI Online', href: 'https://rtionline.gov.in/' },
  { name: 'JMC Official Portal', href: 'https://jmc.jk.gov.in/' },
  { name: 'Web Information Manager', to: '/web-info-manager' },
]

function Sidebar() {
  const location = useLocation()

  return (
    <aside className="space-y-5">

      {/* Page Navigation */}
      <div className="bg-white shadow-sm rounded overflow-hidden">
        <div className="bg-[#003366] text-white px-4 py-3 text-sm font-bold uppercase tracking-wide border-l-4 border-[#FF6600]">
          Navigate
        </div>
        <ul className="divide-y divide-gray-100">
          {PAGE_NAV.map((item) => {
            const active = location.pathname === item.to
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center px-4 py-2.5 text-sm transition-colors ${
                    active
                      ? 'bg-[#FF6600] text-white font-medium'
                      : 'text-[#003366] hover:bg-[#f5f5f5] hover:text-[#FF6600]'
                  }`}
                >
                  <span className={`mr-2 text-xs ${active ? 'text-white' : 'text-[#FF6600]'}`}>›</span>
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Important Links */}
      <div className="bg-white shadow-sm rounded overflow-hidden">
        <div className="bg-[#FF6600] text-white px-4 py-3 text-sm font-bold uppercase tracking-wide">
          Important Links
        </div>
        <ul className="divide-y divide-gray-100">
          {IMPORTANT_LINKS.map((link) => (
            <li key={link.to || link.href}>
              {link.to ? (
                <Link
                  to={link.to}
                  className="flex items-center px-4 py-2.5 text-sm text-[#003366] hover:bg-[#f5f5f5] hover:text-[#FF6600] transition-colors"
                >
                  <span className="mr-2 text-[#FF6600] text-xs">›</span>
                  {link.name}
                </Link>
              ) : (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2.5 text-sm text-[#003366] hover:bg-[#f5f5f5] hover:text-[#FF6600] transition-colors"
                >
                  <span className="mr-2 text-[#FF6600] text-xs">›</span>
                  {link.name}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Helpline */}
      <div className="bg-[#003366] text-white rounded shadow-sm p-4">
        <h3 className="font-bold text-sm mb-3 border-b border-blue-400 pb-2 text-[#FF6600] uppercase tracking-wide">
          Helpline
        </h3>
        <div className="space-y-2 text-sm">
          <div>
            <p className="text-blue-200 text-xs">Toll Free</p>
            <a href="tel:18001807207" className="font-bold text-white hover:text-[#FF6600]">1800-180-7207</a>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Commissioner's Office</p>
            <a href="tel:01912520677" className="font-bold text-white hover:text-[#FF6600]">0191-252-0677</a>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Email</p>
            <a href="mailto:commissionerjmc@jk.gov.in" className="text-xs text-blue-200 hover:text-white break-all">commissionerjmc@jk.gov.in</a>
          </div>
        </div>
      </div>

      {/* Download App */}
      <div className="bg-white shadow-sm rounded p-4 text-center">
        <p className="text-[#003366] font-bold text-sm mb-1">JMC Citizen App</p>
        <p className="text-gray-500 text-xs mb-3">Register complaints, pay taxes & track services</p>
        <a
          href="https://jmc.jk.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#003366] text-white text-xs px-4 py-2 rounded hover:bg-[#FF6600] transition-colors"
        >
          Visit Portal →
        </a>
      </div>

    </aside>
  )
}

export default function SubpageTemplate({ title, breadcrumb = [], children }) {
  return (
    <PageLayout>
      {/* S3WaaS-style Inner Banner */}
      <div
        className="relative overflow-hidden border-t-4 border-[#FF6600]"
        style={{
          background: 'linear-gradient(135deg, #001f4d 0%, #003366 60%, #004080 100%)',
          backgroundImage: `url('/banner/banner1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,33,80,0.92) 0%, rgba(0,51,102,0.85) 100%)' }} />
        {/* Subtle diagonal stripe texture */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }} />

        <div className="relative max-w-[1200px] mx-auto px-4 py-10 md:py-14">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
            {title}
          </h1>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm">
              <li>
                <Link to="/" className="text-blue-200 hover:text-white transition-colors">Home</Link>
              </li>
              {breadcrumb.map((crumb, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="text-[#FF6600]">›</span>
                  {crumb.to ? (
                    <Link to={crumb.to} className="text-blue-200 hover:text-white transition-colors">{crumb.name}</Link>
                  ) : (
                    <span className="text-white font-medium">{crumb.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Bottom orange accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF6600]" />
      </div>

      {/* Two-column content area */}
      <div className="bg-[#f5f5f5] py-8">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Main content — 75% */}
            <main className="flex-1 min-w-0 space-y-5">
              {children}
            </main>

            {/* Sidebar — 25% */}
            <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
              <Sidebar />
            </div>

          </div>
        </div>
      </div>
    </PageLayout>
  )
}
