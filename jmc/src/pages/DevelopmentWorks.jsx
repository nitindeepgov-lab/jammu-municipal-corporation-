import SubpageTemplate from '../components/SubpageTemplate'

const works = [
  { title: 'Road Repair Works — Gandhi Nagar to Raghunath Bazaar', ward: 'Ward 3–5', status: 'Completed', budget: '₹45 Lakh' },
  { title: 'Construction of Drain / Nullah Covering', ward: 'Ward 12–14', status: 'Ongoing', budget: '₹62 Lakh' },
  { title: 'Footpath Development along Canal Road', ward: 'Ward 7', status: 'Completed', budget: '₹28 Lakh' },
  { title: 'Construction of Public Toilet Complex — Rail Head Complex', ward: 'Ward 2', status: 'Completed', budget: '₹18 Lakh' },
  { title: 'Street Light Upgradation — LED Installation', ward: 'All Wards', status: 'Ongoing', budget: '₹1.2 Crore' },
  { title: 'Road Widening — Purani Mandi to Residency Road', ward: 'Ward 1–3', status: 'Ongoing', budget: '₹80 Lakh' },
  { title: 'Storm Water Drain Construction — Subash Nagar', ward: 'Ward 18', status: 'Tendered', budget: '₹35 Lakh' },
  { title: 'Community Hall Renovation — Trikuta Nagar', ward: 'Ward 20', status: 'Completed', budget: '₹22 Lakh' },
]

const statusColor = {
  Completed: 'bg-green-100 text-green-700',
  Ongoing: 'bg-blue-100 text-blue-700',
  Tendered: 'bg-yellow-100 text-yellow-700',
}

export default function DevelopmentWorks() {
  return (
    <SubpageTemplate title="Development Works" breadcrumb={[{ name: 'Development Works' }]}>
      <div className="space-y-5">

        <div className="bg-white rounded shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
            Infrastructure &amp; Development Projects
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Jammu Municipal Corporation undertakes a wide range of development and infrastructure works aimed at
            improving the urban environment of Jammu city. These include road construction and repair, drain
            construction, footpath development, public convenience facilities, and street lighting.
          </p>
          <a
            href="https://jmc.jk.gov.in/developwork.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white px-5 py-2 text-sm font-medium transition-colors rounded"
          >
            View All on JMC Portal →
          </a>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Projects Completed', value: '120+', color: 'border-green-500' },
            { label: 'Projects Ongoing', value: '35+', color: 'border-blue-500' },
            { label: 'Total Wards Covered', value: '75', color: 'border-[#FF6600]' },
            { label: 'Total Investment', value: '₹120 Cr+', color: 'border-[#003366]' },
          ].map((stat, i) => (
            <div key={i} className={`bg-white rounded shadow-sm p-5 border-l-4 ${stat.color} text-center`}>
              <p className="text-2xl font-bold text-[#003366]">{stat.value}</p>
              <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Works table */}
        <div className="bg-white rounded shadow-sm overflow-hidden">
          <div className="bg-[#003366] text-white px-5 py-3">
            <h3 className="font-bold text-sm">Recent Works</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Work Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ward</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Budget</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {works.map((work, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">{work.title}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{work.ward}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{work.budget}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[work.status] || 'bg-gray-100 text-gray-600'}`}>
                        {work.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </SubpageTemplate>
  )
}
