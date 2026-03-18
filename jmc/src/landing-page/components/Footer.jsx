import { Link } from 'react-router-dom'

const footerNavLinks = [
  { name: 'Home', href: 'https://jmc.jk.gov.in/' },
  { name: 'About Us', href: 'https://jmc.jk.gov.in/information.html' },
  { name: 'Feedback', href: 'https://jmc.jk.gov.in/feedback.aspx' },
  { name: 'Website Policies', href: 'https://jmc.jk.gov.in/information.html' },
  { name: 'Contact Us', href: 'https://jmc.jk.gov.in/contactus.aspx' },
  { name: 'Help', href: 'https://jmc.jk.gov.in/information.html' },
  { name: 'Sitemap', href: 'https://jmc.jk.gov.in/quick-links.html' },
  { name: 'Web Information Manager', to: '/web-info-manager' },
  { name: 'Hyperlinking Policy', href: 'https://jmc.jk.gov.in/information.html' },
  { name: 'Privacy Policy', href: 'https://jmc.jk.gov.in/information.html' },
  { name: 'Disclaimer', href: 'https://jmc.jk.gov.in/information.html' },
  { name: 'Accessibility', href: 'https://jmc.jk.gov.in/information.html' },
  { name: 'Copyright Policy', href: 'https://jmc.jk.gov.in/information.html' },
  { name: 'Terms of Use', href: 'https://jmc.jk.gov.in/information.html' },
]

const footerColumns = [
  {
    title: 'Quick Links',
    links: [
      { name: 'About JMC', href: 'https://jmc.jk.gov.in/information.html' },
      { name: 'About Jammu City', href: 'https://jmc.jk.gov.in/information.html' },
      { name: 'Photo Gallery', href: 'https://jmc.jk.gov.in/photogallery.aspx' },
      { name: 'Tenders', href: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Tender' },
      { name: 'Public Notices', href: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Public' },
      { name: 'E-Newsletter', href: 'https://jmc.jk.gov.in/newsletter.aspx' },
      { name: 'RTI', href: 'https://jmc.jk.gov.in/RTI.aspx' },
    ],
  },
  {
    title: 'Citizen Services',
    links: [
      { name: 'Pay Online', to: '/pay-online' },
      { name: 'Register a Complaint', href: 'https://jmc.jk.gov.in/OnlineGrievances.aspx' },
      { name: 'Apply for Rehri License', href: 'https://jmc.jk.gov.in/easedoing.html' },
      { name: 'Building Permission', href: 'https://jmc.jk.gov.in/PermissionForm.aspx' },
      { name: 'Birth / Death Certificate', href: 'https://serviceonline.gov.in/jammu/' },
      { name: 'Trade License', href: 'https://jmc.jk.gov.in/easedoing.html' },
      { name: 'E-Tendering', href: 'https://jktenders.gov.in/' },
    ],
  },
  {
    title: 'Information',
    links: [
      { name: 'Achievements', href: 'https://jmc.jk.gov.in/forms/achievement1.pdf' },
      { name: 'Smart City Projects', href: 'https://jmc.jk.gov.in/smartcity.aspx' },
      { name: 'Swachh Bharat Mission', href: 'https://jmc.jk.gov.in/swachhgallery.aspx' },
      { name: 'Council Updates', href: 'https://jmc.jk.gov.in/notices.aspx?noticetype=Council' },
      { name: 'E-Governance Portal', href: 'https://jmc.jk.gov.in/egov.html' },
      { name: 'Polythene Control', href: 'https://jmc.jk.gov.in/swachhgallery.aspx' },
      { name: "Commissioner's Desk", href: 'https://jmc.jk.gov.in/commissioner.html' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#002244] text-white">

      {/* Top orange accent border */}
      <div className="h-1 bg-[#FF6600]" />

      {/* Contact info strip */}
      <div className="bg-[#001833] border-b border-[#003a6e]">
        <div className="max-w-[1200px] mx-auto px-4 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FF6600]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <p className="text-[#FF6600] text-[10px] font-bold uppercase tracking-wider">Address</p>
                <p className="text-gray-300 text-xs leading-snug">Jammu Municipal Corporation<br/>Jammu — 180001, J&amp;K (UT)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FF6600]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div>
                <p className="text-[#FF6600] text-[10px] font-bold uppercase tracking-wider">Toll Free</p>
                <p className="text-gray-300 text-xs font-semibold">18001807207</p>
                <p className="text-gray-500 text-[10px]">10AM – 5PM (Working Days)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FF6600]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <p className="text-[#FF6600] text-[10px] font-bold uppercase tracking-wider">Email</p>
                <p className="text-gray-300 text-xs">commissionerjmc@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FF6600]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                </svg>
              </div>
              <div>
                <p className="text-[#FF6600] text-[10px] font-bold uppercase tracking-wider">Website</p>
                <a href="https://jmc.jk.gov.in" target="_blank" rel="noopener noreferrer" className="text-gray-300 text-xs hover:text-[#FF6600] transition-colors">www.jmc.jk.gov.in</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Main: columns */}
      <div className="border-b border-[#003a6e]">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">

            {/* Brand column */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/circle/circle.jpeg"
                  alt="JMC Logo"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#FF6600]"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <div>
                  <p className="font-bold text-sm text-white leading-tight">Jammu Municipal</p>
                  <p className="font-bold text-sm text-[#FF6600] leading-tight">Corporation</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">Govt. of J&amp;K (UT)</p>
                </div>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">
                JMC is the urban local body responsible for civic services to the residents of Jammu city —
                sanitation, water supply, property tax, infrastructure, and public health.
              </p>
              <p className="text-[#FF6600] text-[10px] font-bold uppercase tracking-wider mb-2">Follow Us</p>
              <div className="flex gap-2">
                <a href="https://www.facebook.com/JammuSmartCity" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#3b5998] rounded flex items-center justify-center text-white text-xs font-bold hover:opacity-90 transition-opacity" title="Facebook">f</a>
                <a href="https://twitter.com/jmcjammu" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#111] border border-gray-600 rounded flex items-center justify-center text-white text-xs font-bold hover:opacity-90 transition-opacity" title="X / Twitter">𝕏</a>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#cc0000] rounded flex items-center justify-center text-white text-xs hover:opacity-90 transition-opacity" title="YouTube">▶</a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gradient-to-br from-[#f09433] via-[#e1306c] to-[#833ab4] rounded flex items-center justify-center text-white text-[10px] font-bold hover:opacity-90 transition-opacity" title="Instagram">ig</a>
              </div>
            </div>

            {/* Link columns */}
            {footerColumns.map((col, idx) => (
              <div key={idx}>
                <h4 className="font-bold mb-4 text-white text-sm uppercase tracking-wider border-b border-[#003a6e] pb-2 flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#FF6600] rounded-full inline-block" />
                  {col.title}
                </h4>
                <ul className="space-y-1.5">
                  {col.links.map((link, lidx) => (
                    <li key={lidx}>
                      {link.to ? (
                        <Link to={link.to} className="text-gray-400 text-xs hover:text-[#FF6600] transition-colors flex items-center gap-1.5 group">
                          <span className="text-[#FF6600] text-xs group-hover:translate-x-0.5 transition-transform">›</span>
                          {link.name}
                        </Link>
                      ) : (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 text-xs hover:text-[#FF6600] transition-colors flex items-center gap-1.5 group">
                          <span className="text-[#FF6600] text-xs group-hover:translate-x-0.5 transition-transform">›</span>
                          {link.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Footer nav links row */}
      <div className="border-b border-[#003a6e] bg-[#001833]">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <nav className="flex flex-wrap justify-center gap-x-1 gap-y-1">
            {footerNavLinks.map((link, idx) => (
              <span key={idx} className="flex items-center">
                {link.to ? (
                  <Link to={link.to} className="text-gray-400 hover:text-[#FF6600] text-xs transition-colors px-1">{link.name}</Link>
                ) : (
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF6600] text-xs transition-colors px-1">
                    {link.name}
                  </a>
                )}
                {idx < footerNavLinks.length - 1 && <span className="text-gray-700 text-xs">|</span>}
              </span>
            ))}
          </nav>
        </div>
      </div>

      {/* Footer bottom: copyright + logos */}
      <div className="bg-[#001122]">
        <div className="max-w-[1200px] mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-xs mb-1">
                Copyright &copy; 2026{' '}
                <strong className="text-gray-300">Jammu Municipal Corporation </strong>
                . All Rights Reserved.
              </p>
              <p className="text-gray-500 text-xs">
                Developed and hosted by{' '}
                <a href="http://www.nic.in/" className="text-gray-400 hover:text-[#FF6600] hover:underline">National Informatics Centre</a>
                ,{' '}
                <a href="http://meity.gov.in/" className="text-gray-400 hover:text-[#FF6600] hover:underline">Ministry of Electronics &amp; IT</a>
                , Government of India
              </p>
              <p className="text-gray-600 text-xs mt-1">
                Last Updated:{' '}
                <strong className="text-gray-500">
                  {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
                </strong>
              </p>
              <p className="text-gray-600 text-xs mt-1">
                Version{' '}
                <span className="inline-flex items-center gap-1 bg-[#003366] text-[#FF9933] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#FF6600]/30 ml-0.5">
                  v2.0.0
                </span>
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <a href="https://s3waas.gov.in/" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                <img src="footer/lion.png" alt="S3WaaS" className="h-10 w-auto"
                  onError={(e) => { e.target.outerHTML = '<span class="text-gray-500 text-xs border border-gray-700 px-2 py-1 rounded">S3WaaS</span>' }} />
              </a>
              <a href="http://www.nic.in/" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                <img src="footer/data.png" alt="NIC" className="h-10 w-auto"
                  onError={(e) => { e.target.outerHTML = '<span class="text-gray-500 text-xs border border-gray-700 px-2 py-1 rounded">NIC</span>' }} />
              </a>
              <a href="http://www.digitalindia.gov.in/" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                <img src="footer/dic.png" alt="Digital India" className="h-10 w-auto"
                  onError={(e) => { e.target.outerHTML = '<span class="text-gray-500 text-xs border border-gray-700 px-2 py-1 rounded">Digital India</span>' }} />
              </a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}
