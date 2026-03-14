import SubpageTemplate from '../components/SubpageTemplate'

const egovServices = [
  { name: 'Online Property Tax Payment', href: 'https://jmc.jk.gov.in/online-payment.html', desc: 'Pay property tax dues online quickly and securely.' },
  { name: 'Online Grievance Redressal', href: 'https://myjammu.in/grievance/GrievanceDepartment', desc: 'Register and track your complaints via the MyJammu portal.' },
  { name: 'Water Tanker Booking', href: 'https://myjammu.in/', desc: 'Book a water tanker online through the MyJammu service portal.' },
  { name: 'Building Plan Permission', href: 'https://jkhuddobps.in/', desc: 'Apply for building plan sanction via HUDD BPS portal.' },
  { name: 'Birth & Death Certificate', href: 'https://serviceonline.gov.in/jammu/', desc: 'Apply via JAKSMAC e-service portal.' },
  { name: 'Online NOC / Trade License', href: 'https://serviceonline.gov.in/jammu/', desc: 'Apply / renew trade license and obtain NOC online.' },
  { name: 'Rehri License', href: 'https://serviceonline.gov.in/jammu/', desc: 'Apply for Rehri (street vendor) license via JAKSMAC portal.' },
  { name: 'Pet Dog Registration', href: 'https://serviceonline.gov.in/jammu/', desc: 'Register your pet dog with JMC online.' },
  { name: 'Pay Rent – Municipal Shop/Flat', href: 'https://jmc.jk.gov.in/OtherFee.html', desc: 'Pay rent for JMC municipal shops and residential flats online.' },
  { name: 'Online User Charges', href: 'https://jmc.jk.gov.in/SanitationFee.html', desc: 'Pay sanitation / user charges online.' },
  { name: 'Sewerage Connection Verification', href: 'https://jmc.jk.gov.in/sewconnectverify.html', desc: 'Verify sewerage connection permission status.' },
  { name: 'Panjtirthi Slot Booking', href: 'https://jmc.jk.gov.in/index-2.html', desc: 'Book a slot at Panjtirthi facility online.' },
  { name: 'E-Tendering', href: 'https://jktenders.gov.in/', desc: 'View and participate in JMC tenders on J&K e-procurement portal.' },
  { name: 'E-Newsletter', href: 'https://jmc.jk.gov.in/newsletter.aspx', desc: 'Download JMC e-newsletters and publications.' },
  { name: 'Feedback & Suggestions', href: 'https://jmc.jk.gov.in/feedback.aspx', desc: 'Share your feedback with JMC.' },
]

export default function EGov() {
  return (
    <SubpageTemplate title="E-Governance" breadcrumb={[{ name: 'E-Governance' }]}>
      <div className="space-y-5">

        <div className="bg-white rounded shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
            About E-Governance at JMC
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Jammu Municipal Corporation has embraced e-governance to deliver faster, more transparent, and
            citizen-friendly civic services. Through technology-enabled platforms, citizens can now access
            a wide range of JMC services from any device, anytime, anywhere.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            JMC's e-governance initiatives are aligned with the Government of India's Digital India programme
            and the J&K Government's IT policy, aiming to reduce paperwork, increase transparency, and improve
            accountability in civic administration.
          </p>
          <div className="mt-4">
            <a
              href="https://jmc.jk.gov.in/egov.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white px-5 py-2 text-sm font-medium transition-colors rounded"
            >
              Visit E-Gov Portal →
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-6 inline-block">
            E-Services Available
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {egovServices.map((svc, idx) => (
              <a
                key={idx}
                href={svc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded shadow-sm p-5 hover:shadow-md transition-all hover:-translate-y-0.5 group block"
              >
                <div className="w-10 h-10 rounded-full bg-[#003366] flex items-center justify-center text-white text-lg mb-3 group-hover:bg-[#FF6600] transition-colors">
                  🖥️
                </div>
                <h3 className="text-[#003366] font-bold text-sm mb-1">{svc.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{svc.desc}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-[#003366] text-white rounded p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-base mb-1">Digital India Initiative</h3>
              <p className="text-blue-200 text-sm">JMC is proud to be part of India's Digital India programme, making governance more accessible and transparent.</p>
            </div>
            <a
              href="https://www.digitalindia.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-[#FF6600] hover:bg-[#e55a00] text-white px-6 py-3 rounded font-medium text-sm transition-colors"
            >
              Digital India →
            </a>
          </div>
        </div>

      </div>
    </SubpageTemplate>
  )
}
