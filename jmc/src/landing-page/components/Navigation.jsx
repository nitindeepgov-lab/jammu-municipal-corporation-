
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'About JMC', to: '/about', hasDropdown: true, dropdown: [
    { name: 'About JMC', to: '/about' },
    { name: 'History', to: '/about#history' },
    { name: 'Vision & Mission', to: '/about#vision' },
    { name: 'Acts & Rules', to: '/about#acts' },
    { name: 'Gallery', to: '/gallery' },
  ] },
  { name: 'Governing Bodies', to: '/officials', hasDropdown: true, dropdown: [
    { name: "Hon'ble Mayor", href: 'https://jmc.jk.gov.in/mayor.aspx' },
    { name: "Hon'ble Deputy Mayor", href: 'https://jmc.jk.gov.in/deputymayor.aspx' },
    { name: "Hon'ble Chairman Public Health and Sanitation Committee", href: 'https://jmc.jk.gov.in/governingbodies.aspx' },
    { name: "Hon'ble Chairman Swachh Bharat Committee", href: 'https://jmc.jk.gov.in/governingbodies.aspx' },
    { name: "Hon'ble Chairman Social Justice Committee", href: 'https://jmc.jk.gov.in/governingbodies.aspx' },
    { name: 'Commissioner Secretary to Govt. (HUDD)', to: '/officials' },
    { name: 'Municipal Commissioner, JMC', to: '/commissioner' },
  ] },
  { name: 'E-Governance', to: '/egov', hasDropdown: true, dropdown: [
    { name: 'Doorstep Governance', href: 'https://jmc.jk.gov.in/doorstep.aspx' },
    { name: 'Online Public Grievance System', href: 'https://jmc.jk.gov.in/OnlineGrievances.aspx' },
    { name: 'Online Birth/Death Certificate', href: 'https://serviceonline.gov.in/jammu/' },
    { name: 'Online Building Permission', href: 'https://jmc.jk.gov.in/PermissionForm.aspx' },
    { name: 'Online Pay Rent of Municipal Shop/Flat', href: 'https://jmc.jk.gov.in/online-payment.html' },
    { name: 'Online User Charges', href: 'https://jmc.jk.gov.in/online-payment.html' },
    { name: 'E-Tendering', href: 'https://jktenders.gov.in/' },
    { name: 'Online NOC/License System', href: 'https://jmc.jk.gov.in/easedoing.html' },
    { name: 'Apply for Rehri License', href: 'https://jmc.jk.gov.in/easedoing.html' },
    { name: 'PDD E-Services', href: 'https://jmc.jk.gov.in/pddeservices.html' },
  ] },
  { name: 'Departments', to: '/about', hasDropdown: true, dropdown: [
    { name: 'Health & Sanitation', href: 'https://jmc.jk.gov.in/HealthDept.aspx' },
    { name: 'Enforcement', href: 'https://jmc.jk.gov.in/enforcement.aspx' },
    { name: 'Establishment', href: 'https://jmc.jk.gov.in/establishment.aspx' },
    { name: 'Electric', href: 'https://jmc.jk.gov.in/electric.aspx' },
    { name: 'Civil Works', href: 'https://jmc.jk.gov.in/developwork.aspx' },
    { name: 'UEED', href: 'https://jmc.jk.gov.in/ueed.aspx' },
    { name: 'Census', href: 'https://jmc.jk.gov.in/census.aspx' },
    { name: 'Revenue', href: 'https://jmc.jk.gov.in/taxassessment.aspx' },
    { name: 'Building', href: 'https://jmc.jk.gov.in/PermissionForm.aspx' },
    { name: 'Accounts', href: 'https://jmc.jk.gov.in/accounts.aspx' },
    { name: 'Transport', href: 'https://jmc.jk.gov.in/transport.aspx' },
    { name: 'Legal', href: 'https://jmc.jk.gov.in/legal.aspx' },
    { name: 'Veterinary', href: 'https://jmc.jk.gov.in/veterinary.aspx' },
  ] },
  { name: 'Orders & Circulars', to: '/notices', hasDropdown: true, dropdown: [
    { name: 'Public Notices', to: '/notices' },
    { name: 'Tenders', to: '/notices' },
    { name: 'Council Updates', to: '/notices' },
    { name: 'Smart City', to: '/smart-city' },
    { name: 'Swachh Mission', to: '/swachh-mission' },
    { name: 'Development Works', to: '/development-works' },
  ] },
  { name: 'Tenders', href: 'https://jmc.jk.gov.in/tenders.aspx' },
  { name: 'RTI', to: '/rti', hasDropdown: true, dropdown: [
    { name: 'Disclosure of information Under Sec 4 of RTI Act.', href: 'https://jmc.jk.gov.in/RTI.aspx' },
    { name: "Details of APIO's/PIO/FAA of JMC.", to: '/rti' },
    { name: 'RTI ACT 2005', href: 'https://rtionline.gov.in/' },
  ] },
  { name: 'Contact Us', to: '/contact' },
  { name: 'Ex Municipal Councillor', href: 'https://jmc.jk.gov.in/wardcouncillor.aspx', hasDropdown: true, dropdown: [
    { name: 'Councillor Details', href: 'https://jmc.jk.gov.in/wardcouncillor.aspx' },
  ] },
]

export default function Navigation({ mobileMenuOpen, setMobileMenuOpen }) {
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileDropdown, setMobileDropdown] = useState(null)
  const location = useLocation()

  const isActive = (to) => to && to !== '#' && location.pathname === to.split('#')[0]

  const subLinkClass = 'block px-4 py-2.5 text-[#003366] hover:bg-[#FF6600] hover:text-white text-sm leading-snug transition-colors'
  const mobileSubLinkClass = 'flex items-center px-7 py-3 text-gray-400 hover:text-white hover:bg-white/10 text-sm border-b border-white/5 last:border-0 transition-colors'

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setMobileDropdown(null)
  }

  return (
    <>
      {/* Navigation bar */}
      <nav className="bg-[#003366] sticky top-0 z-50 shadow-md" style={{ borderBottom: '3px solid #FF6600' }}>
        <div className="max-w-[1300px] mx-auto px-3 md:px-4">
          <div className="flex items-center h-12 md:h-auto md:min-h-[46px]">

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex-shrink-0 flex items-center justify-center text-white w-10 h-10 rounded hover:bg-white/10 active:bg-white/20 transition-colors"
              onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setMobileDropdown(null) }}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                  d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>

            {/* Mobile center branding */}
            <div className="md:hidden flex-1 text-center px-2">
              <p className="text-white font-bold text-[13px] leading-none tracking-wide">Jammu Municipal Corporation</p>
              <p className="text-[#FF6600] text-[9px] uppercase tracking-widest mt-0.5">Official Portal · J&amp;K Govt</p>
            </div>

            {/* Desktop nav links */}
            <ul className="hidden md:flex flex-1 flex-wrap">
              {navLinks.map((item, idx) => (
                <li
                  key={idx}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(idx)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-3.5 text-white text-[13px] font-medium hover:bg-[#FF6600] transition-colors whitespace-nowrap"
                    >
                      {item.name}
                      {item.hasDropdown && (
                        <svg className="w-2.5 h-2.5 ml-1.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </a>
                  ) : (
                    <Link
                      to={item.to || '/'}
                      className={`flex items-center px-3 py-3.5 text-white text-[13px] font-medium hover:bg-[#FF6600] transition-colors whitespace-nowrap ${isActive(item.to) ? 'bg-[#FF6600]' : ''}`}
                    >
                      {item.name}
                      {item.hasDropdown && (
                        <svg className="w-2.5 h-2.5 ml-1.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </Link>
                  )}

                  {/* Desktop dropdown */}
                  {item.hasDropdown && openDropdown === idx && (
                    <ul className="absolute left-0 top-full w-[240px] bg-white shadow-xl rounded-b z-50 py-1 border-t-2 border-[#FF6600]">
                      {item.dropdown.map((sub, subIdx) => (
                        <li key={subIdx} className={subIdx !== 0 ? 'border-t border-gray-100' : ''}>
                          {sub.href ? (
                            <a href={sub.href} target="_blank" rel="noopener noreferrer" className={subLinkClass}>{sub.name}</a>
                          ) : (
                            <Link to={sub.to} className={subLinkClass}>{sub.name}</Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            {/* Search */}
            <button
              className="flex-shrink-0 flex items-center justify-center text-white w-10 h-10 rounded hover:bg-white/10 active:bg-white/20 transition-colors"
              aria-label="Search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile backdrop */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 z-[65] transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile slide-in drawer */}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`md:hidden fixed top-0 left-0 bottom-0 w-[82vw] max-w-[300px] bg-[#001f4d] z-[70] flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Drawer header */}
        <div className="bg-[#003366] px-4 py-4 flex items-center justify-between border-b-2 border-[#FF6600] flex-shrink-0">
          <div>
            <p className="text-[#FF6600] text-[9px] uppercase tracking-widest font-bold">Govt. of Jammu &amp; Kashmir</p>
            <p className="text-white font-bold text-sm leading-snug mt-0.5">Jammu Municipal Corporation</p>
          </div>
          <button
            className="text-white/70 hover:text-white p-1.5 hover:bg-white/10 rounded transition-colors"
            onClick={closeMobileMenu}
            aria-label="Close navigation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <ul className="flex-1 overflow-y-auto divide-y divide-white/10">
          {navLinks.map((item, idx) => (
            <li key={idx}>
              <div className="flex items-stretch">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                    className="flex-1 flex items-center px-5 py-3.5 text-white/90 text-sm font-medium hover:bg-[#FF6600] hover:text-white transition-colors"
                  >
                    <span className="text-[#FF6600] mr-2.5 text-xs">›</span>
                    {item.name}
                  </a>
                ) : (
                  <Link
                    to={item.to || '/'}
                    onClick={() => !item.hasDropdown && closeMobileMenu()}
                    className={`flex-1 flex items-center px-5 py-3.5 text-sm font-medium transition-colors ${
                      isActive(item.to)
                        ? 'bg-[#FF6600] text-white'
                        : 'text-white/90 hover:bg-[#FF6600] hover:text-white'
                    }`}
                  >
                    <span className={`mr-2.5 text-xs ${isActive(item.to) ? 'text-white' : 'text-[#FF6600]'}`}>›</span>
                    {item.name}
                  </Link>
                )}
                {item.hasDropdown && (
                  <button
                    className="px-4 text-white/50 hover:text-white hover:bg-white/10 transition-colors border-l border-white/10 flex items-center"
                    onClick={() => setMobileDropdown(d => d === idx ? null : idx)}
                    aria-label={mobileDropdown === idx ? 'Collapse submenu' : 'Expand submenu'}
                    aria-expanded={mobileDropdown === idx}
                  >
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileDropdown === idx ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Mobile submenu */}
              {item.hasDropdown && mobileDropdown === idx && (
                <ul className="bg-[#001030]">
                  {item.dropdown.map((sub, subIdx) => (
                    <li key={subIdx}>
                      {sub.href ? (
                        <a href={sub.href} target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu} className={mobileSubLinkClass}>
                          <span className="text-[#FF6600] mr-2 text-[10px] flex-shrink-0">▸</span>{sub.name}
                        </a>
                      ) : (
                        <Link to={sub.to} onClick={closeMobileMenu} className={mobileSubLinkClass}>
                          <span className="text-[#FF6600] mr-2 text-[10px] flex-shrink-0">▸</span>{sub.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Drawer footer — helpline */}
        <div className="bg-[#002255] px-4 py-3 flex-shrink-0 border-t border-white/10">
          <a href="tel:18001807207" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-[#FF6600] flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </div>
            <div>
              <p className="text-white text-xs font-semibold group-hover:text-[#FF6600] transition-colors">1800-180-7207</p>
              <p className="text-gray-400 text-[10px]">Helpline · Toll Free</p>
            </div>
          </a>
        </div>
      </div>
    </>
  )
}
