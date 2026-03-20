import { Link } from 'react-router-dom'

const quickLinks = [
  {
    name: 'Pay Online', to: '/pay-online',
    icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>)
  },
  {
    name: 'Information', href: 'https://jmc.jk.gov.in/information.html',
    icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>)
  },
  {
    name: 'Complaints', href: 'https://jmc.jk.gov.in/OnlineGrievances.aspx',
    icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>)
  },
  {
    name: 'Achievements', href: 'https://jmc.jk.gov.in/forms/achievement1.pdf',
    icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>)
  },
  {
    name: 'Quick Links', to: '/quick-links',
    icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>)
  },
  {
    name: 'Feedback', href: 'https://jmc.jk.gov.in/feedback.aspx',
    icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>)
  },
  {
    name: 'Web Info Manager', to: '/web-info-manager',
    icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>)
  },
  {
    name: 'Sitemap', to: '/sitemap',
    icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>)
  },
]

export default function QuickLinks() {
  return (
    <section className="py-6 bg-white border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {quickLinks.map((link, idx) => {
            const cls = 'group flex flex-col items-center gap-2.5 py-4 px-2 text-center rounded-lg hover:bg-gray-50 transition-all duration-200'
            const inner = (
              <>
                <span className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-[#003366] flex items-center justify-center text-gray-500 group-hover:text-white transition-all duration-200">
                  {link.icon}
                </span>
                <span className="text-[11px] font-semibold text-gray-600 group-hover:text-[#003366] leading-tight transition-colors">
                  {link.name}
                </span>
              </>
            )
            return link.to
              ? <Link key={idx} to={link.to} className={cls}>{inner}</Link>
              : <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
          })}
        </div>
      </div>
    </section>
  )
}
