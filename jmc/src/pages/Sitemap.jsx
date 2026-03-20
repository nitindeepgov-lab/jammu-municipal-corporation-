import { Link } from 'react-router-dom'
import SubpageTemplate from '../components/SubpageTemplate'

export default function Sitemap() {
  const sitemapData = [
    {
      title: 'Main Navigation',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
      ),
      links: [
        { label: 'Home', path: '/' },
        { label: 'About JMC', path: '/about' },
        { label: 'Gallery', path: '/gallery' },
        { label: 'Contact Us', path: '/contact' },
        { label: 'Feedback / Grievance', path: '/feedback' },
        { label: 'Sitemap', path: '/sitemap' },
      ],
    },
    {
      title: 'About the Corporation',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
      ),
      links: [
        { label: 'Overview', path: '/about' },
        { label: 'Vision & Mission', path: '/about#vision' },
        { label: 'History', path: '/about#history' },
        { label: 'Acts & Rules', path: '/about#acts' },
      ],
    },
    {
      title: 'Administration & Officials',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
      ),
      links: [
        { label: 'Commissioner', path: '/commissioner' },
        { label: 'Key Officials / Who\'s Who', path: '/officials' },
        { label: 'Web Information Manager', path: '/web-info-manager' },
      ],
    },
    {
      title: 'E-Governance & Services',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      links: [
        { label: 'All Services Overview', path: '/services' },
        { label: 'E-Governance Portals', path: '/egov' },
        { label: 'Pay Tax Online', path: '/pay-online' },
        { label: 'Property Tax', href: 'https://myjammu.jk.gov.in/Login/Index' },
        { label: 'Online Grievance Registration', href: 'https://jmc.jk.gov.in/OnlineGrievances.aspx' },
        { label: 'Building Permission', href: 'https://obps.jk.gov.in/BPAMSClient/Home.aspx' },
        { label: 'Birth/Death Certificates', href: 'https://jansugam.jk.gov.in/login.do' },
      ],
    },
    {
      title: 'Public Information',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
      ),
      links: [
        { label: 'Orders & Circulars', path: '/notices' },
        { label: 'Public Notices', path: '/notices' },
        { label: 'News & Press Releases', path: '/news/1' },
      ],
    },
    {
      title: 'Projects & Tenders',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      ),
      links: [
        { label: 'Tenders & NITs', path: '/notices' },
        { label: 'Development Works', path: '/development-works' },
        { label: 'Smart City Projects', path: '/smart-city' },
        { label: 'Smart City Tenders', path: '/smart-city-tenders' },
        { label: 'Swachh Bharat Mission', path: '/swachh-mission' },
      ],
    },
    {
      title: 'Transparency',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      links: [
        { label: 'RTI (Right to Information)', path: '/rti' },
        { label: 'Quick Links', path: '/quick-links' },
      ],
    },
  ]

  return (
    <SubpageTemplate title="Sitemap" breadcrumb={[{ name: 'Sitemap' }]}>
      <div className="bg-white rounded shadow-sm border border-gray-100 p-6 md:p-8">
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#003366] mb-3">Website Structure</h2>
          <p className="text-gray-600 text-sm">
            Navigate through all sections of the Jammu Municipal Corporation website.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {sitemapData.map((section, idx) => (
            <div key={idx} className="relative group">
              {/* Vertical line connecting the tree */}
              <div className="absolute left-2.5 top-10 bottom-2 text-transparent border-l border-gray-200 group-hover:border-blue-200 transition-colors duration-300" />
              
              <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-3">
                <div className="text-[#003366]">
                  {section.icon}
                </div>
                <h3 className="font-bold text-[#003366] text-[17px] tracking-tight">{section.title}</h3>
              </div>
              
              <ul className="space-y-4 ml-8 relative z-10">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx} className="flex relative items-center group/link">
                    {/* Horizontal connector line */}
                    <div className="absolute -left-6 top-1/2 w-4 border-t border-gray-200 group-hover:border-blue-200 transition-colors duration-300" />
                    <span className="absolute -left-2.5 w-1.5 h-1.5 rounded-full bg-gray-300 transition-colors group-hover/link:bg-[#FF6600]" />
                    
                    {link.path ? (
                      <Link 
                        to={link.path} 
                        className="text-gray-600 hover:text-[#003366] text-[15px] font-medium transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a 
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-[#FF6600] text-[15px] font-medium transition-colors flex items-center gap-1.5"
                      >
                        {link.label}
                        <svg className="w-3.5 h-3.5 opacity-40 group-hover/link:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </SubpageTemplate>
  )
}
