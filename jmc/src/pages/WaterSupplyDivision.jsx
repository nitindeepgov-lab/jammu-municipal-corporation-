import SubpageTemplate from "../components/SubpageTemplate";

const stats = [
  { label: "Water Connections", value: "1.2 L+", color: "border-blue-500" },
  { label: "Daily Water Supply", value: "80 MLD", color: "border-cyan-500" },
  { label: "Wards Covered", value: "75", color: "border-[#FF6600]" },
  { label: "Water Pumping Stations", value: "12", color: "border-[#003366]" },
];

const services = [
  { icon: "🚰", title: "New Water Connection", desc: "Apply for a new water supply connection for residential or commercial property." },
  { icon: "📄", title: "No Dues Certificate", desc: "Obtain no dues certificate for water bills — required for property transactions." },
  { icon: "💧", title: "Water Bill Payment", desc: "Pay your water/sewerage charges online through the JMC payment portal." },
  { icon: "🔧", title: "Pipe Repair & Maintenance", desc: "Report water pipe leakages, low pressure, or contamination complaints for quick resolution." },
  { icon: "📊", title: "Meter Testing", desc: "Request calibration and testing of your water meter for accurate billing." },
  { icon: "🏗️", title: "Pipeline Infrastructure", desc: "Planning and execution of new water supply pipelines across expanding areas of Jammu." },
];

const supplyZones = [
  { zone: "Zone A — Old City", areas: "Raghunath Bazaar, Purani Mandi, Gujjar Nagar", timing: "6 AM – 9 AM", duration: "3 hrs" },
  { zone: "Zone B — North Jammu", areas: "Trikuta Nagar, Gandhi Nagar, Bakshi Nagar", timing: "5 AM – 9 AM", duration: "4 hrs" },
  { zone: "Zone C — South Jammu", areas: "Rehari, Canal Road, Nanak Nagar", timing: "6 AM – 10 AM", duration: "4 hrs" },
  { zone: "Zone D — Industrial", areas: "Narwal, Bari Brahmana, Digiana", timing: "7 AM – 11 AM", duration: "4 hrs" },
];

const eServices = [
  { label: "Apply for New Connection", href: "https://serviceonline.gov.in/jammu/" },
  { label: "PDD E-Services Portal", href: "https://jmc.jk.gov.in/pddeservices.html" },
  { label: "Pay Water Bill Online", href: "/pay-online" },
  { label: "Register Water Complaint", href: "https://jmc.jk.gov.in/OnlineGrievances.aspx" },
];

export default function WaterSupplyDivision() {
  return (
    <SubpageTemplate
      title="Water Supply Division"
      breadcrumb={[{ name: "Departments", to: "/departments" }, { name: "Water Supply Division" }]}
    >
      <div className="space-y-8">

        {/* Intro */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
            Water Supply &amp; Sewerage Services
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            The Water Supply Division of JMC ensures the provision of safe, adequate, and reliable drinking water
            to all residents of Jammu city. The division manages water treatment, distribution networks, pipeline
            maintenance, new connections, and sewerage services across all 75 wards.
          </p>
          <a
            href="https://jmc.jk.gov.in/pddeservices.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white px-5 py-2 text-sm font-semibold transition-colors rounded-lg"
          >
            View PDD E-Services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 border-l-4 ${stat.color} text-center`}>
              <p className="text-2xl font-bold text-[#003366]">{stat.value}</p>
              <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-[#003366] mb-5">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <div key={i} className="flex gap-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="font-semibold text-[#003366] text-sm">{s.title}</p>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Water Supply Timings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#003366] text-white px-5 py-3">
            <h3 className="font-bold text-sm">Water Supply Schedule by Zone</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600 uppercase">Zone</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600 uppercase">Areas</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600 uppercase">Timing</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600 uppercase">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {supplyZones.map((z, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-[#003366] font-semibold text-xs">{z.zone}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{z.areas}</td>
                    <td className="px-4 py-3 text-gray-700 font-medium text-xs">{z.timing}</td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">{z.duration}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* E-Services */}
        <div className="bg-gradient-to-br from-cyan-700 to-[#003366] rounded-xl p-6 text-white">
          <h3 className="font-bold text-lg mb-2">Online Water Services</h3>
          <p className="text-blue-200 text-sm mb-5">Access all water supply services online — fast and paperless.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {eServices.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4 text-cyan-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {s.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </SubpageTemplate>
  );
}
