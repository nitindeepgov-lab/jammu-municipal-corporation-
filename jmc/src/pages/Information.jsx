import { Link } from 'react-router-dom'
import SubpageTemplate from '../components/SubpageTemplate'

export const infoItems = [
  { slug: 'about-jammu-city', title: 'About Jammu City', icon: '🏛️' },
  { slug: 'administrative-set-up', title: 'Administrative Set Up', icon: '🗂️' },
  { slug: 'organogram', title: 'Organogram', icon: '🧭' },
  { slug: 'citizen-charter', title: 'Citizen Charter', icon: '📜' },
  { slug: 'polythene-control', title: 'Polythene Control', icon: '🛡️' },
  { slug: 'acts', title: 'ACTs', icon: '⚖️' },
  { slug: 'city-map', title: 'City Map', icon: '🗺️' },
  { slug: 'building-laws', title: 'Building Laws', icon: '🏗️' },
  { slug: 'rehri-license-detail', title: 'Rehri License Detail', icon: '🧾' },
  { slug: 'noc', title: 'NOC', icon: '✅' },
  { slug: 'public-notices', title: 'Public Notices', icon: '📢' },
]

export default function Information() {
  return (
    <SubpageTemplate title="Information" breadcrumb={[{ name: 'Information' }] }>
      <div className="grid lg:grid-cols-1 gap-6">
        <section className="bg-white rounded-xl shadow-sm p-7 border border-slate-200/70">
          <h2 className="text-2xl font-bold text-[#003366] tracking-tight border-b-2 border-[#FF6600] pb-3 mb-5 inline-block">Citizen Information Hub</h2>
          <p className="text-gray-600 text-sm mb-6 max-w-3xl">Browse key information areas from the official JMC portal. Icons help you spot topics faster; each card mirrors a tile from the site for quick recognition.</p>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 md:gap-6">
            {infoItems.map((item, idx) => (
              <Link
                key={item.slug}
                to={`/information/${item.slug}`}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-sm p-5 hover:shadow-md hover:border-[#FF6600]/60 transition-all"
              >
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-[#FF6600]/10 to-[#003366]/10 rotate-12 rounded-full" aria-hidden />
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wide font-semibold text-[#FF6600]/90">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#003366]/10 text-lg">{item.icon}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-[#0b3a73] leading-snug group-hover:text-[#1a4f8b] transition-colors">{item.title}</h3>
                    <span className="text-xs text-[#FF6600] opacity-0 group-hover:opacity-100 transition-opacity">Open →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </SubpageTemplate>
  )
}
