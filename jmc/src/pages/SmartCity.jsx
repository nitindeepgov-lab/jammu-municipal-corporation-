import SubpageTemplate from '../components/SubpageTemplate'

const projects = [
  {
    title: 'Smart Road Lighting Project',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-700',
    location: 'Entire Jammu City',
    desc: 'Installation of LED smart streetlights across all wards to improve energy efficiency and safety.',
  },
  {
    title: 'Integrated Command & Control Centre',
    status: 'Ongoing',
    statusColor: 'bg-blue-100 text-blue-700',
    location: 'Jammu',
    desc: 'A centralised ICCC for real-time monitoring of city operations, traffic, and public utilities.',
  },
  {
    title: 'Smart Parking System',
    status: 'Ongoing',
    statusColor: 'bg-blue-100 text-blue-700',
    location: 'Gandhi Nagar, Raghunath Bazaar, Residency Road',
    desc: 'Sensor-based smart parking management to ease congestion in commercial zones.',
  },
  {
    title: 'Public Bicycle Sharing System',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-700',
    location: 'Major Localities of Jammu',
    desc: 'Non-motorised transport through app-enabled bicycle sharing at docking stations.',
  },
  {
    title: 'Smart Heritage Zone Development',
    status: 'Planned',
    statusColor: 'bg-yellow-100 text-yellow-700',
    location: 'Old Jammu Heritage Area',
    desc: 'Beautification and digitalisation of heritage sites in the old city area.',
  },
  {
    title: 'Swachh Jammu Clean Rivers Initiative',
    status: 'Ongoing',
    statusColor: 'bg-blue-100 text-blue-700',
    location: 'Tawi River Bank',
    desc: 'Riverfront development, solid waste prevention, and beautification of the Tawi river belt.',
  },
]

export default function SmartCity() {
  return (
    <SubpageTemplate title="Smart City Mission — Jammu" breadcrumb={[{ name: 'Smart City' }]}>
      <div className="space-y-5">

        {/* Intro */}
        <div className="bg-white rounded shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
            About Smart City Jammu
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Jammu was selected under the Smart Cities Mission by the Government of India. The Mission
            aims to promote cities that provide core infrastructure, a clean and sustainable environment,
            and give a decent quality of life to their citizens through smart solutions.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            The Smart City proposal for Jammu focuses on Area-Based Development (ABD) of the core city
            area along with pan-city smart solutions including intelligent traffic management, smart
            parking, and a city-wide sensor network.
          </p>
          <a
            href="https://jmc.jk.gov.in/smartcity.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white px-5 py-2 text-sm font-medium transition-colors rounded"
          >
            Visit Smart City Portal →
          </a>
        </div>

        {/* Projects */}
        <div>
          <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-6 inline-block">
            Key Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-white rounded shadow-sm p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-bold text-[#003366] text-sm">{project.title}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium flex-shrink-0 ${project.statusColor}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2">📍 {project.location}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{project.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SubpageTemplate>
  )
}
