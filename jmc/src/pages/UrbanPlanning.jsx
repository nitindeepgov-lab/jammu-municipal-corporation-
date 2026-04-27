import SubpageTemplate from "../components/SubpageTemplate";

const stats = [
  { label: "Smart Projects", value: "25+", color: "border-blue-500" },
  { label: "Investment", value: "₹1,950 Cr", color: "border-green-500" },
  { label: "Wards Benefited", value: "75", color: "border-[#FF6600]" },
  { label: "Public Spaces Developed", value: "40+", color: "border-[#003366]" },
];

const projects = [
  {
    title: "Integrated Traffic Management System",
    status: "Completed",
    desc: "Deployment of ATCS (Adaptive Traffic Control System) at major intersections with AI-enabled signal management.",
    budget: "₹45 Cr",
  },
  {
    title: "Smart Street Lighting",
    status: "Completed",
    desc: "Installation of sensor-based LED street lights with remote monitoring capability across key corridors.",
    budget: "₹28 Cr",
  },
  {
    title: "Command & Control Centre",
    status: "Completed",
    desc: "24×7 surveillance with 1,000+ CCTV cameras integrated into a centralized command center.",
    budget: "₹35 Cr",
  },
  {
    title: "Smart Parks & Public Spaces",
    status: "Ongoing",
    desc: "Development of Wi-Fi enabled, surveillance-covered smart parks with modern amenities.",
    budget: "₹20 Cr",
  },
  {
    title: "Solid Waste Monitoring",
    status: "Ongoing",
    desc: "GPS tracking of garbage collection vehicles and IoT-based bin monitoring system.",
    budget: "₹12 Cr",
  },
  {
    title: "Heritage Area Development",
    status: "Ongoing",
    desc: "Revitalization of Purani Mandi, Raghunath Bazaar and old city areas with smart infrastructure.",
    budget: "₹60 Cr",
  },
];

const statusColor = {
  Completed: "bg-green-100 text-green-700",
  Ongoing: "bg-blue-100 text-blue-700",
  Planned: "bg-yellow-100 text-yellow-700",
};

const pillars = [
  { icon: "📡", title: "Smart Governance", desc: "Digital services, e-governance, and citizen portals for transparent administration." },
  { icon: "🚦", title: "Smart Mobility", desc: "ATCS, ITMS, public transit upgrades and non-motorised transport corridors." },
  { icon: "🌿", title: "Smart Environment", desc: "Smart meters, waste monitoring, air quality sensors and green spaces." },
  { icon: "💡", title: "Smart Economy", desc: "Innovation hubs, startup support and a business-friendly digital ecosystem." },
  { icon: "🏘️", title: "Smart People", desc: "Education, skill development, e-libraries and digital literacy programs." },
  { icon: "🔐", title: "Smart Safety", desc: "City surveillance, emergency response, disaster management and safe city initiatives." },
];

export default function UrbanPlanning() {
  return (
    <SubpageTemplate
      title="Urban Planning"
      breadcrumb={[{ name: "Departments", to: "/departments" }, { name: "Urban Planning" }]}
    >
      <div className="space-y-8">

        {/* Intro */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wide">Jammu Smart City</div>
          </div>
          <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
            Smart City &amp; Urban Development
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            The Urban Planning wing of JMC, in coordination with Jammu Smart City Limited, is implementing a comprehensive
            urban transformation of Jammu city. With an investment of ₹1,950 Crore, projects spanning smart mobility,
            surveillance, sanitation, heritage preservation, and digital governance are reshaping Jammu into a smart,
            livable, and sustainable city.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://jmc.jk.gov.in/smartcity.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white px-5 py-2 text-sm font-semibold transition-colors rounded-lg"
            >
              View on Official Portal
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href="/smart-city"
              className="inline-flex items-center gap-2 bg-[#003366] text-white px-5 py-2 text-sm font-semibold rounded-lg hover:bg-[#002244] transition-colors"
            >
              Smart City Page →
            </a>
          </div>
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

        {/* Six Pillars */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-[#003366] mb-5">Six Pillars of Smart City</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {pillars.map((p, i) => (
              <div key={i} className="flex gap-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                <span className="text-2xl">{p.icon}</span>
                <div>
                  <p className="font-semibold text-[#003366] text-sm">{p.title}</p>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#003366] text-white px-5 py-3 flex items-center justify-between">
            <h3 className="font-bold text-sm">Smart City Projects</h3>
            <a
              href="/smart-city-tenders"
              className="text-xs text-blue-200 hover:text-white underline"
            >
              View Tenders →
            </a>
          </div>
          <div className="divide-y divide-gray-100">
            {projects.map((p, idx) => (
              <div key={idx} className="px-5 py-4 hover:bg-gray-50 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-[#003366] text-sm">{p.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[p.status]}`}>
                      {p.status}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[#FF6600] font-bold text-sm">{p.budget}</p>
                  <p className="text-gray-400 text-xs">Budget</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Building Permission */}
        <div className="bg-gradient-to-br from-[#003366] to-[#002244] rounded-xl p-6 text-white">
          <h3 className="font-bold text-lg mb-2">Building Permission &amp; Planning Services</h3>
          <p className="text-blue-200 text-sm mb-4">Apply for building permission, check status, and access planning documents online.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {[
              { label: "Building Permission", href: "https://jmc.jk.gov.in/PermissionForm.aspx" },
              { label: "Check Permission Status", href: "http://jkapp.ulb.gov.in/bld_public_noc_JK/UserType.htm" },
              { label: "Jammu Master Plan 2032", href: "http://jmc.jk.gov.in/JMP2032.pdf" },
              { label: "Building Fee Payment", href: "https://jmc.jk.gov.in/BuildingFee.aspx" },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-lg transition-colors text-white text-xs font-medium"
              >
                <svg className="w-3.5 h-3.5 text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </SubpageTemplate>
  );
}
