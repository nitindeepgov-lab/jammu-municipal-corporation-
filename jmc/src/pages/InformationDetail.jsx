import { useParams } from 'react-router-dom'
import SubpageTemplate from '../components/SubpageTemplate'
import { infoItems } from './Information'

const details = {
  'about-jammu-city': {
    title: 'About Jammu City',
    summary:
      'Jammu District derives its name from its founder Raja Jamboo Lochan. The city lies between latitude 32.44°–32.73° N and longitude 74.55°–74.93° E at about 305m above sea level, bounded by Udhampur to the north/north-east, Kathua to the south/east, and Pakistan’s Sialkote district to the west.',
    points: [
      'Historical origin: Raja Jamboo Lochan, naming the town near a tawi crossing legend.',
      'Geography: winter capital, heritage city with surrounding hills and river plains.',
      'Location: roughly 32.5° N, 74.7° E; bordered by Udhampur, Kathua, and Sialkote.',
    ],
  },
  'administrative-set-up': {
    title: 'Administrative Set Up',
    summary:
      'JMC administration is headed by the Municipal Commissioner with dedicated wings for administration, works, finance, health, veterinary services, and elected representatives.',
    points: [
      'Municipal Commissioner at the apex.',
      'Joint Commissioner (Administration): Secretary; Chief Khilafwarzi Officer; Chief Revenue Officer; Chief Transport Officer; Law Officer.',
      'Joint Commissioner (Works): Executive Engineer (Central); Executive Engineer (Rural Division); Executive Engineer (Electric); Executive Engineer (Sewerage & Drainage).',
      'Chief Accounts Officer: Assistant Accounts Officer (Administration); Assistant Accounts Officer (Works).',
      'Health Officer: Sanitation Officer; Food Inspector; Sub Registrar Vital Statistics.',
      'Municipal Veterinary Officer.',
      'Public Representatives: Mayor; Deputy Mayor; Councillors.',
    ],
  },
  organogram: {
    title: 'Organogram',
    summary: 'High-level reporting and departmental structure of Jammu Municipal Corporation.',
    points: [
      'Shows lines of reporting across key civic departments.',
      'Clarifies coordination between administrative wings.',
    ],
  },
  'citizen-charter': {
    title: 'Citizen Charter',
    summary: 'Service standards, timelines, and grievance redress norms for civic services.',
    points: ['Defines expected timelines for citizen services.', 'Outlines grievance channels and escalation.'],
  },
  'polythene-control': {
    title: 'Polythene Control',
    summary: 'Guidelines and enforcement on restricted polythene usage within Jammu city.',
    points: ['Compliance requirements for businesses and citizens.', 'Enforcement and penalties for violations.'],
  },
  acts: {
    title: 'ACTs',
    summary: 'Key acts and regulations governing JMC operations and civic compliance.',
    points: ['Municipal governance statutes and local bylaws.', 'Reference for civic enforcement and compliance.'],
  },
  'city-map': {
    title: 'City Map',
    summary: 'Ward boundaries and key civic facilities across Jammu city.',
    points: ['Ward demarcations and zones.', 'Locations of key civic amenities.'],
  },
  'building-laws': {
    title: 'Building Laws',
    summary: 'Bylaws, approvals, and compliance checklists for construction within JMC jurisdiction.',
    points: ['Approval steps and required documents.', 'Setbacks, height, and safety norms.'],
  },
  'rehri-license-detail': {
    title: 'Rehri License Detail',
    summary: 'Information on street vending/rehri licensing within JMC limits.',
    points: ['Eligibility and application steps.', 'Documentation and renewal guidance.'],
  },
  noc: {
    title: 'NOC',
    summary: 'Guidance on No Objection Certificates issued by JMC.',
    points: ['Document requirements and processing steps.', 'Applicable use-cases for NOCs.'],
  },
  'public-notices': {
    title: 'Public Notices',
    summary: 'Recent circulars, tenders, and announcements from JMC.',
    points: ['Latest notices with dates.', 'Tenders and official announcements.'],
  },
}

export default function InformationDetail() {
  const { slug } = useParams()
  const item = details[slug]
  const fallback = infoItems.find((i) => i.slug === slug)

  if (!item) {
    return (
      <SubpageTemplate title="Information" breadcrumb={[{ name: 'Information', href: '/information' }, { name: 'Not found' }] }>
        <div className="bg-white rounded-xl border border-slate-200/70 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-[#003366] mb-2">Page not found</h2>
          <p className="text-gray-600 text-sm mb-4">The requested section is unavailable. Please return to the Information hub.</p>
          <a href="/information" className="text-[#003366] font-semibold text-sm">Back to Information</a>
        </div>
      </SubpageTemplate>
    )
  }

  return (
    <SubpageTemplate
      title={item.title}
      breadcrumb={[{ name: 'Information', href: '/information' }, { name: fallback?.title || item.title }] }
    >
      <div className="space-y-6">
        <section className="bg-white rounded-xl border border-slate-200/70 shadow-sm p-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#003366]/10 text-lg">
              {fallback?.icon || 'ℹ️'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#003366] leading-tight">{item.title}</h2>
              <p className="text-gray-600 text-sm mt-1 max-w-3xl">{item.summary}</p>
            </div>
          </div>
          <ul className="space-y-2 mt-3">
            {(item.points || []).map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-1 inline-block w-2 h-2 rounded-full bg-[#FF6600]" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </SubpageTemplate>
  )
}
