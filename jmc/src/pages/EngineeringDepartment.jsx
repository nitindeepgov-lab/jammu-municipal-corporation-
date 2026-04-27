import SubpageTemplate from "../components/SubpageTemplate";

const projects = [
  { title: "Road Repair — Gandhi Nagar to Raghunath Bazaar", ward: "Ward 3–5", status: "Completed", budget: "₹45 Lakh" },
  { title: "Construction of Drain / Nullah Covering", ward: "Ward 12–14", status: "Ongoing", budget: "₹62 Lakh" },
  { title: "Footpath Development along Canal Road", ward: "Ward 7", status: "Completed", budget: "₹28 Lakh" },
  { title: "Public Toilet Complex — Rail Head Complex", ward: "Ward 2", status: "Completed", budget: "₹18 Lakh" },
  { title: "Street Light Upgradation — LED Installation", ward: "All Wards", status: "Ongoing", budget: "₹1.2 Crore" },
  { title: "Road Widening — Purani Mandi to Residency Road", ward: "Ward 1–3", status: "Ongoing", budget: "₹80 Lakh" },
  { title: "Storm Water Drain Construction — Subash Nagar", ward: "Ward 18", status: "Tendered", budget: "₹35 Lakh" },
  { title: "Community Hall Renovation — Trikuta Nagar", ward: "Ward 20", status: "Completed", budget: "₹22 Lakh" },
  { title: "Construction of Retaining Wall — Bakshi Nagar", ward: "Ward 9", status: "Completed", budget: "₹15 Lakh" },
  { title: "Parking Area Development — Hari Market", ward: "Ward 6", status: "Ongoing", budget: "₹30 Lakh" },
];

const statusColor = {
  Completed: "bg-green-100 text-green-700",
  Ongoing: "bg-blue-100 text-blue-700",
  Tendered: "bg-yellow-100 text-yellow-700",
};

const stats = [
  { label: "Projects Completed", value: "120+", color: "border-green-500" },
  { label: "Projects Ongoing", value: "35+", color: "border-blue-500" },
  { label: "Total Wards Covered", value: "75", color: "border-[#FF6600]" },
  { label: "Total Investment", value: "₹120 Cr+", color: "border-[#003366]" },
];

const services = [
  { icon: "🏗️", title: "Road Construction & Repair", desc: "Construction, widening and repair of roads across all 75 wards to ensure smooth connectivity." },
  { icon: "💧", title: "Drain & Nullah Works", desc: "Construction and covering of drains and nullahs to prevent water-logging and flooding." },
  { icon: "🚶", title: "Footpath Development", desc: "Building safe pedestrian footpaths along major roads for citizen convenience." },
  { icon: "💡", title: "Street Lighting", desc: "Installation and maintenance of LED streetlights for a safer and smarter Jammu." },
  { icon: "🚻", title: "Public Conveniences", desc: "Construction of modern public toilet complexes at key locations in the city." },
  { icon: "🏛️", title: "Community Infrastructure", desc: "Building and renovating community halls, parks, and civic spaces across wards." },
];

export default function EngineeringDepartment() {
  return (
    <SubpageTemplate
      title="Engineering Department"
      breadcrumb={[{ name: "Departments", to: "/departments" }, { name: "Engineering Department" }]}
    >
      <div className="space-y-8">

        {/* Intro */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
            Infrastructure &amp; Development
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            The Engineering Department of Jammu Municipal Corporation is responsible for planning, execution, and
            supervision of all civil engineering works within Jammu city limits. From road construction to drain
            covering, footpath development to street lighting — the department drives the physical infrastructure of the city.
          </p>
          <a
            href="https://jmc.jk.gov.in/developwork.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white px-5 py-2 text-sm font-semibold transition-colors rounded-lg"
          >
            View on Official JMC Portal
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

        {/* Projects Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#003366] text-white px-5 py-3">
            <h3 className="font-bold text-sm">Recent Projects</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600 uppercase">Project Name</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600 uppercase">Ward</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600 uppercase">Budget</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {projects.map((p, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">{p.title}</td>
                    <td className="px-4 py-3 text-gray-500">{p.ward}</td>
                    <td className="px-4 py-3 text-gray-500">{p.budget}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[p.status] || "bg-gray-100 text-gray-600"}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-[#003366] rounded-xl p-6 text-white">
          <h3 className="font-bold text-lg mb-2">Contact Engineering Department</h3>
          <p className="text-blue-200 text-sm mb-4">For project inquiries, complaints or status updates, reach out to the Engineering Wing of JMC.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-[#FF6600] mt-0.5">📞</span>
              <div>
                <p className="font-semibold">Helpline</p>
                <p className="text-blue-200">0191-2544227</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#FF6600] mt-0.5">📍</span>
              <div>
                <p className="font-semibold">Office Address</p>
                <p className="text-blue-200">JMC Head Office, Jammu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubpageTemplate>
  );
}
