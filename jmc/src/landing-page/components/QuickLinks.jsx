import { Link } from 'react-router-dom'

const quickLinks = [
  {
    name: 'Pay Online', to: '/pay-online',
    icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>)
  },
  {
    name: 'Information', href: 'https://jmc.jk.gov.in/information.html',
    icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>)
  },
  {
    name: 'Register a Complaint', href: 'https://jmc.jk.gov.in/OnlineGrievances.aspx',
    icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>)
  },
  {
    name: 'Our Achievements', href: 'https://jmc.jk.gov.in/forms/achievement1.pdf',
    icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>)
  },
  {
    name: 'Quick Links', href: 'https://jmc.jk.gov.in/quick-links.html',
    icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>)
  },
  {
    name: 'Feedback', href: 'https://jmc.jk.gov.in/feedback.aspx',
    icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>)
  },
  {
    name: 'Web Info Manager', to: '/web-info-manager',
    icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>)
  },
]

export default function QuickLinks() {
  return (
    <section className="py-8 bg-[#eef2f7] border-t border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-[#003366] uppercase tracking-widest">Quick Links</h2>
          <div className="flex items-center justify-center gap-2 mt-1.5">
            <div className="h-[2px] w-10 bg-[#FF6600]" />
            <div className="w-2 h-2 rounded-full bg-[#FF6600]" />
            <div className="h-[2px] w-10 bg-[#FF6600]" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 sm:gap-3">
          {quickLinks.map((link, idx) => {
            const cls = 'group flex flex-col items-center gap-2 bg-white hover:bg-[#003366] border border-gray-200 hover:border-[#003366] rounded-lg p-4 text-center transition-all duration-200 shadow-sm hover:shadow-md'
            const inner = (<><span className="text-[#003366] group-hover:text-[#FF6600] transition-colors">{link.icon}</span><span className="text-[11px] font-semibold text-gray-700 group-hover:text-white leading-tight transition-colors">{link.name}</span></>)
            return link.to
              ? <Link key={idx} to={link.to} className={cls}>{inner}</Link>
              : <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
          })}
        </div>
      </div>
    </section>
  )
}
