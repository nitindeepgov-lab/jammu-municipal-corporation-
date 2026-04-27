import SubpageTemplate from "../components/SubpageTemplate";

const stats = [
  { label: "Sanitation Workers", value: "1,200+", color: "border-blue-500" },
  { label: "Wards Covered", value: "75", color: "border-green-500" },
  { label: "Waste Collected / Day", value: "350 MT", color: "border-[#FF6600]" },
  { label: "Community Toilets", value: "300+", color: "border-[#003366]" },
];

const services = [
  { icon: "🗑️", title: "Door-to-Door Collection", desc: "Daily waste collection from households across all 75 wards of Jammu city." },
  { icon: "♻️", title: "Waste Segregation", desc: "Promotion of dry-wet waste segregation at source for scientific disposal and recycling." },
  { icon: "🚛", title: "Bulk Waste Removal", desc: "Removal of bulk waste from markets, construction sites and commercial establishments." },
  { icon: "🚻", title: "Community Toilets", desc: "Operation and maintenance of 300+ community and public toilet complexes." },
  { icon: "🧹", title: "Street Sweeping", desc: "Manual and mechanized sweeping of main roads, lanes, and market areas daily." },
  { icon: "🌊", title: "Drain Cleaning", desc: "Regular de-silting and cleaning of surface drains and nullahs to prevent flooding." },
];

const campaigns = [
  { name: "Fogging Drive", icon: "🌫️", desc: "Anti-mosquito fogging operations in all wards to curb vector-borne diseases." },
  { name: "Cleanliness Awareness", icon: "📢", desc: "IEC campaigns, nukkad nataks, and street plays to promote civic hygiene awareness." },
  { name: "Plastic-Free Jammu", icon: "🚫", desc: "Drive against single-use plastic with fines for violators and distribution of cloth bags." },
  { name: "Swachh Survekshan", icon: "⭐", desc: "Participating in the national cleanliness survey to improve Jammu's overall ranking." },
];

export default function SanitationDepartment() {
  return (
    <SubpageTemplate
      title="Sanitation Department"
      breadcrumb={[{ name: "Departments", to: "/departments" }, { name: "Sanitation Department" }]}
    >
      <div className="space-y-8">

        {/* Intro */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
            Clean &amp; Hygienic Jammu
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            The Sanitation Department of Jammu Municipal Corporation is dedicated to maintaining cleanliness
            and hygienic conditions across Jammu city. With a workforce of over 1,200 sanitation workers,
            the department handles solid waste management, street sweeping, drain cleaning, and community sanitation
            under the Swachh Bharat Mission (Urban).
          </p>
          <a
            href="https://jmc.jk.gov.in/swachhgallery.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white px-5 py-2 text-sm font-semibold transition-colors rounded-lg"
          >
            View Swachh Gallery
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
              <div key={i} className="flex gap-3 p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="font-semibold text-[#003366] text-sm">{s.title}</p>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaigns */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-[#003366] mb-5">Key Campaigns</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {campaigns.map((c, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-colors">
                <span className="text-3xl">{c.icon}</span>
                <div>
                  <p className="font-semibold text-[#003366] text-sm">{c.name}</p>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Waste Management Process */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-[#003366] mb-5">Waste Management Process</h2>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            {[
              { label: "Collection", icon: "🏠", color: "bg-blue-100 text-blue-700" },
              { label: "Segregation", icon: "♻️", color: "bg-green-100 text-green-700" },
              { label: "Transport", icon: "🚛", color: "bg-yellow-100 text-yellow-700" },
              { label: "Processing", icon: "🏭", color: "bg-purple-100 text-purple-700" },
              { label: "Disposal", icon: "✅", color: "bg-orange-100 text-orange-700" },
            ].map((step, i, arr) => (
              <div key={i} className="flex items-center gap-2 flex-1">
                <div className={`flex-1 flex flex-col items-center p-3 rounded-xl ${step.color}`}>
                  <span className="text-2xl mb-1">{step.icon}</span>
                  <span className="text-xs font-bold">{step.label}</span>
                </div>
                {i < arr.length - 1 && (
                  <svg className="w-4 h-4 text-gray-300 shrink-0 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-[#003366] rounded-xl p-6 text-white">
          <h3 className="font-bold text-lg mb-2">Sanitation Department Contact</h3>
          <p className="text-blue-200 text-sm mb-4">For complaints regarding waste collection, drain cleaning, or public toilets, contact us.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-[#FF6600] mt-0.5">📞</span>
              <div>
                <p className="font-semibold">Helpline</p>
                <p className="text-blue-200">0191-2544227</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#FF6600] mt-0.5">📧</span>
              <div>
                <p className="font-semibold">Register Complaint Online</p>
                <a
                  href="https://jmc.jk.gov.in/OnlineGrievances.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white underline text-xs"
                >
                  JMC Grievance Portal →
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </SubpageTemplate>
  );
}
