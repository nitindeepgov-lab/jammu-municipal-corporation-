import SubpageTemplate from "../components/SubpageTemplate";

const campaigns = [
  { name: "My Town My Pride", icon: "🏙️", desc: "A citywide cleanliness drive encouraging citizens to take pride in keeping Jammu clean and green." },
  { name: "Fogging Drive", icon: "🌫️", desc: "Regular fogging operations across all wards to control mosquito breeding and prevent dengue/malaria." },
  { name: "Clean & Green Jammu", icon: "🌿", desc: "Plantation drives and waste management campaigns to make Jammu greener and healthier." },
  { name: "International Anti-Corruption Day", icon: "🛡️", desc: "Awareness events promoting transparency in municipal health services and public administration." },
  { name: "Constitution Day", icon: "📜", desc: "Special health awareness programs held on Constitution Day to promote citizen rights and duties." },
  { name: "Swachh Survekshan", icon: "⭐", desc: "Participation in national cleanliness survey to benchmark Jammu's sanitation standards." },
];

const stats = [
  { label: "Fogging Operations / Year", value: "500+", color: "border-blue-500" },
  { label: "Wards Covered", value: "75", color: "border-green-500" },
  { label: "Sanitation Workers", value: "1,200+", color: "border-[#FF6600]" },
  { label: "Dustbins Installed", value: "10,000+", color: "border-[#003366]" },
];

const services = [
  { icon: "🧹", title: "Solid Waste Management", desc: "Door-to-door garbage collection and scientific disposal of municipal solid waste." },
  { icon: "🦟", title: "Vector Control", desc: "Anti-larval operations, fogging drives, and malaria/dengue prevention activities." },
  { icon: "🏥", title: "Public Health Monitoring", desc: "Regular inspection of food establishments, markets, and public hygiene compliance." },
  { icon: "🚿", title: "Sanitation Facilities", desc: "Construction and maintenance of community toilets, urinals, and bathing ghats." },
  { icon: "♻️", title: "Waste Segregation", desc: "Promoting dry/wet waste segregation at source for effective recycling." },
  { icon: "📢", title: "Health Awareness", desc: "Community campaigns, workshops and IEC activities for public health education." },
];

export default function HealthDepartment() {
  return (
    <SubpageTemplate
      title="Health Department"
      breadcrumb={[{ name: "Departments", to: "/departments" }, { name: "Health Department" }]}
    >
      <div className="space-y-8">

        {/* Intro */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
            Swachh Bharat Mission — JMC
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            The Health Department of Jammu Municipal Corporation is committed to ensuring public health, hygiene, and
            sanitation across the city. Operating under the Swachh Bharat Mission (Urban), the department drives
            cleanliness campaigns, solid waste management, and vector control operations to make Jammu a healthy city for all.
          </p>
          <a
            href="https://jmc.jk.gov.in/swachhgallery.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white px-5 py-2 text-sm font-semibold transition-colors rounded-lg"
          >
            View Swachh Gallery on Official Portal
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
          <h2 className="text-lg font-bold text-[#003366] mb-5">Swachh Bharat Campaigns</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {campaigns.map((c, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-colors">
                <span className="text-3xl">{c.icon}</span>
                <div>
                  <p className="font-semibold text-[#003366] text-sm">{c.name}</p>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Swachh Bharat Banner */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">🇮🇳</span>
            <div>
              <h3 className="font-bold text-lg">Swachh Bharat Mission (Urban)</h3>
              <p className="text-green-100 text-sm">JMC is committed to making Jammu Open Defecation Free and achieving 100% waste processing.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-yellow-300 mt-0.5">📞</span>
              <div>
                <p className="font-semibold">Health Wing Helpline</p>
                <p className="text-green-200">0191-2544227</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-300 mt-0.5">📧</span>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-green-200">jmcjammu@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </SubpageTemplate>
  );
}
