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
    <aside className="space-y-4">

      {/* Page Navigation — styled like the main nav bar */}
      <div className="bg-[#002B5E] rounded-md overflow-hidden shadow-sm">
        <ul>
          {PAGE_NAV.map((item, idx) => {
            const active = location.pathname === item.to
            return (
              <li key={item.to} className={idx !== 0 ? 'border-t border-white/10' : ''}>
                <Link
                  to={item.to}
                  className={`flex items-center px-4 py-2.5 text-[13px] font-medium transition-colors ${
                    active
                      ? 'bg-[#FF6600] text-white'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Important Links */}
      <div className="rounded-md overflow-hidden shadow-sm border border-gray-200">
        <div className="bg-[#FF6600] text-white px-4 py-2.5 text-[13px] font-bold uppercase tracking-wider">
          Important Links
        </div>
        <ul className="bg-white">
          {IMPORTANT_LINKS.map((link, idx) => (
            <li key={link.to || link.href} className={idx !== 0 ? 'border-t border-gray-100' : ''}>
              {link.to ? (
                <Link
                  to={link.to}
                  className="block px-4 py-2.5 text-[13px] text-gray-600 hover:text-[#FF6600] hover:bg-gray-50 transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2.5 text-[13px] text-gray-600 hover:text-[#FF6600] hover:bg-gray-50 transition-colors"
                >
                  {link.name}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default function SubpageTemplate({ title, breadcrumb = [], children }) {
  return (
    <PageLayout>
      {/* Clean Banner */}
      <div className="bg-[#002B5E] border-b-[3px] border-[#FF6600]">
        <div className="max-w-[1200px] mx-auto px-4 py-7 md:py-9">
          <h1 className="text-xl md:text-2xl font-bold text-white leading-tight mb-2">
            {title}
          </h1>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 text-[12px]">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">Home</Link>
              </li>
              {breadcrumb.map((crumb, i) => (
                <li key={i} className="flex items-center gap-1">
                  <span className="text-slate-500">/</span>
                  {crumb.to ? (
                    <Link to={crumb.to} className="text-slate-400 hover:text-white transition-colors">{crumb.name}</Link>
                  ) : (
                    <span className="text-[#FF6600] font-medium">{crumb.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {/* Content area */}
      <div className="bg-white py-6">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Main content */}
            <main className="flex-1 min-w-0">
              {children}
            </main>

            {/* Sidebar */}
            <div className="w-full lg:w-64 xl:w-72 flex-shrink-0">
              <Sidebar />
            </div>

          </div>
        </div>
      </div>
    </PageLayout>
  )
}
