import SubpageTemplate from "../components/SubpageTemplate";

const stats = [
  { label: "Parks Maintained", value: "150+", color: "border-green-500" },
  { label: "Trees Planted (Annual)", value: "50,000+", color: "border-emerald-500" },
  { label: "Green Cover (Hectares)", value: "800+", color: "border-[#FF6600]" },
  { label: "Nurseries", value: "8", color: "border-[#003366]" },
];

const services = [
  { icon: "🌳", title: "Tree Plantation Drives", desc: "Annual plantation drives across the city in collaboration with schools, RWAs, and corporates." },
  { icon: "🌺", title: "Park Development", desc: "Development and beautification of parks, gardens, and public green spaces in all wards." },
  { icon: "🌿", title: "Avenue Plantation", desc: "Planting of trees along major roads, dividers, and footpaths for shade and aesthetics." },
  { icon: "🪴", title: "Nursery Services", desc: "Maintenance of municipal nurseries supplying saplings to citizens at subsidized rates." },
  { icon: "✂️", title: "Tree Trimming & Pruning", desc: "Periodic trimming of road-side trees to prevent encroachment on power lines and roads." },
  { icon: "🏡", title: "Vertical Gardens", desc: "Installation of vertical green walls and planters at key public spaces and roundabouts." },
];

const parks = [
  { name: "Bahu Fort Park", area: "Bahu Fort Road", size: "5 Acres", features: ["Children Play Area", "Fountains", "Walking Track"] },
  { name: "Bikram Chowk Garden", area: "Bikram Chowk", size: "2 Acres", features: ["Flower Beds", "Seating", "Lighting"] },
  { name: "Trikuta Nagar Park", area: "Trikuta Nagar", size: "3 Acres", features: ["Open Gym", "Jogging Track", "Kids Zone"] },
  { name: "Gandhi Nagar Garden", area: "Gandhi Nagar", size: "1.5 Acres", features: ["Heritage Trees", "Fountain", "Wi-Fi Zone"] },
];

const links = [
  { label: "Register for Building Permission", href: "https://jmc.jk.gov.in/PermissionForm.aspx" },
  { label: "Online NOC / License System", href: "https://serviceonline.gov.in/jammu/" },
  { label: "Apply for Rehri License", href: "https://serviceonline.gov.in/jammu/" },
  { label: "Jammu Master Plan 2032", href: "http://jmc.jk.gov.in/JMP2032.pdf" },
];

export default function HorticultureDepartment() {
  return (
    <SubpageTemplate
      title="Horticulture Department"
      breadcrumb={[{ name: "Departments", to: "/departments" }, { name: "Horticulture Department" }]}
    >
      <div className="space-y-8">

        {/* Intro */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
            Green &amp; Beautiful Jammu
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            The Horticulture Department of JMC is dedicated to greening and beautifying Jammu city through
            systematic plantation drives, park development, and management of urban green spaces. With over 150 parks
            and 800 hectares of green cover, the department plays a vital role in improving air quality, biodiversity,
            and the aesthetic appeal of Jammu.
          </p>
          <a
            href="https://jmc.jk.gov.in/easedoing.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white px-5 py-2 text-sm font-semibold transition-colors rounded-lg"
          >
            Ease of Doing Business Portal
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
              <div key={i} className="flex gap-3 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="font-semibold text-[#003366] text-sm">{s.title}</p>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Parks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-[#003366] mb-5">Major Parks &amp; Gardens</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {parks.map((park, i) => (
              <div key={i} className="p-5 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-[#003366] text-sm">{park.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">📍 {park.area}</p>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap">{park.size}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {park.features.map((f, j) => (
                    <span key={j} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ease of Doing Business Links */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-[#003366] mb-5">Ease of Doing Business — Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <svg className="w-4 h-4 text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm font-medium group-hover:text-[#003366] transition-colors">{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-br from-green-700 to-green-800 rounded-xl p-6 text-white">
          <h3 className="font-bold text-lg mb-2">Horticulture Department Contact</h3>
          <p className="text-green-100 text-sm mb-4">For park maintenance requests, tree trimming, or plantation drives, contact us.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-yellow-300 mt-0.5">📞</span>
              <div>
                <p className="font-semibold">Helpline</p>
                <p className="text-green-200">0191-2544227</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-300 mt-0.5">📍</span>
              <div>
                <p className="font-semibold">Office</p>
                <p className="text-green-200">JMC Head Office, Jammu</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </SubpageTemplate>
  );
}
