import SubpageTemplate from '../components/SubpageTemplate'

const quickLinksData = [
  // Row pairs — left column, right column
  { name: 'J&K Government', href: 'https://jk.gov.in/' },
  { name: 'J&K IMPA', href: 'https://jkimpa.nic.in/' },
  { name: 'GAD Orders and Circulars', href: 'https://jkgad.nic.in/leftMenu/OrderCircular.aspx' },
  { name: 'Disaster Resource Network', href: 'https://drn.nidm.gov.in/' },
  { name: 'Divisional Commissioner, Jammu', href: 'https://divcomjammu.nic.in/' },
  { name: 'J&K Civil Defence & SDRF', href: 'https://jkcdsdrf.nic.in/' },
  { name: 'Jammu Municipal Corporation', href: 'https://jmc.jk.gov.in/' },
  { name: 'J&K Police', href: 'https://jkpolice.gov.in/' },
  { name: 'Jammu & Kashmir Tourism', href: 'https://jktourism.jk.gov.in/' },
  { name: 'Know More About J&K', href: 'https://jk.gov.in/' },
  { name: 'Govt. Medical College Jammu', href: 'https://gmcjammu.nic.in/' },
  { name: 'National Portal of India', href: 'https://india.gov.in/' },
  { name: 'University of Jammu', href: 'https://jammuuniversity.ac.in/' },
  { name: 'Income Tax Department', href: 'https://incometaxindia.gov.in/' },
  { name: 'J&K State Education Board', href: 'https://jkbose.nic.in/' },
  { name: 'Intra IAS', href: 'https://intranets.nic.in/' },
  { name: 'J&K Public Service Commission', href: 'https://jkpsc.nic.in/' },
  { name: 'National Informatics Centre', href: 'https://nic.in/' },
  { name: 'J&K Service Selection Board', href: 'https://jkssb.nic.in/' },
  { name: 'Government Web Directory', href: 'https://goidirectory.gov.in/' },
]

const sidebarCards = [
  {
    title: 'Information',
    href: 'https://jmc.jk.gov.in/information.html',
    gradient: 'from-blue-600 to-blue-800',
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    ),
  },
  {
    title: 'Pay Online',
    to: '/pay-online',
    gradient: 'from-emerald-600 to-emerald-800',
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
      </svg>
    ),
  },
  {
    title: 'Register a Complaint',
    href: 'https://jmc.jk.gov.in/OnlineGrievances.aspx',
    gradient: 'from-amber-600 to-amber-800',
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z" />
      </svg>
    ),
  },
  {
    title: "Commissioner's Desk",
    href: 'https://jmc.jk.gov.in/commissioner.html',
    gradient: 'from-slate-600 to-slate-800',
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
      </svg>
    ),
  },
]

export default function QuickLinksPage() {
  return (
    <SubpageTemplate title="Quick Links" breadcrumb={[{ name: 'Quick Links' }]}>
      <div className="space-y-6">

        {/* Main content card */}
        <section className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#003366] to-[#004a8f] px-6 py-5">
            <h2 className="text-xl font-bold text-white tracking-wide">Quick Links</h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-[2px] w-12 bg-[#FF6600]" />
              <div className="w-2 h-2 rounded-full bg-[#FF6600]" />
              <div className="h-[2px] w-12 bg-[#FF6600]" />
            </div>
          </div>

          <div className="p-6">
            <p className="text-gray-600 text-sm mb-6 border-l-4 border-[#FF6600] pl-4 bg-orange-50/50 py-2 rounded-r">
              Quickly Find What You Are Looking For
            </p>

            {/* Links Grid */}
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-0">
              {quickLinksData.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 py-3 border-b border-gray-100 last:border-b-0 transition-colors hover:bg-blue-50/50 px-2 rounded"
                >
                  <span className="text-[#FF6600] text-sm font-bold group-hover:translate-x-0.5 transition-transform">»</span>
                  <span className="text-sm text-[#003366] group-hover:text-[#FF6600] transition-colors font-medium">
                    {link.name}
                  </span>
                  <svg
                    className="w-3.5 h-3.5 ml-auto text-gray-300 group-hover:text-[#FF6600] transition-all opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access Cards */}
        <section>
          <h3 className="text-lg font-bold text-[#003366] mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#FF6600] rounded-full" />
            Quick Access
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sidebarCards.map((card, idx) => {
              const inner = (
                <div
                  key={idx}
                  className={`relative overflow-hidden bg-gradient-to-br ${card.gradient} rounded-xl p-4 text-center text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer`}
                >
                  {/* Decorative circles */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
                  <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-white/5 rounded-full" />

                  <div className="relative flex flex-col items-center gap-2">
                    <div className="p-2 bg-white/15 rounded-lg group-hover:bg-white/25 transition-colors">
                      {card.icon}
                    </div>
                    <span className="text-xs font-semibold tracking-wide">{card.title}</span>
                  </div>
                </div>
              )

              if (card.to) {
                // Internal link — use Link but import is already handled by SubpageTemplate
                return (
                  <a key={idx} href={card.to} style={{ textDecoration: 'none' }}>
                    {inner}
                  </a>
                )
              }
              return (
                <a key={idx} href={card.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  {inner}
                </a>
              )
            })}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-[#003366] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
            <div>
              <h4 className="text-sm font-semibold text-[#003366] mb-1">Disclaimer</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                These links are provided for informational purposes. Jammu Municipal Corporation is not responsible for the content of external websites. 
                Links do not constitute endorsement. Please verify information independently from the respective official websites.
              </p>
            </div>
          </div>
        </section>

      </div>
    </SubpageTemplate>
  )
}
