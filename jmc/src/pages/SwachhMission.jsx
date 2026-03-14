import SubpageTemplate from '../components/SubpageTemplate'

export default function SwachhMission() {
  return (
    <SubpageTemplate title="Swachh Bharat Mission — Jammu" breadcrumb={[{ name: 'Swachh Mission' }]}>
      <div className="space-y-5">

        {/* Historical Background */}
        <div className="bg-white rounded shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#006400] pb-2 mb-4 inline-block">
            About Swachh Bharat Abhiyaan
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            Swachh Bharat Abhiyaan (Clean India Mission) is a nationwide campaign launched by Prime Minister
            Narendra Modi on <strong>2nd October 2014</strong> — the 145th birth anniversary of Mahatma Gandhi.
            The mission aims to achieve an Open Defecation Free (ODF) India and ensure proper solid waste management
            across every urban local body in the country.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            At its launch, the Prime Minister invited nine prominent public figures — each nominated to carry forward
            the mission — as part of a "chain" pledging 100 hours of voluntary cleanliness work per year.
            This spirit of mass participation and shared responsibility forms the cornerstone of the Abhiyaan.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Jammu Municipal Corporation is a key implementing agency for Swachh Bharat Mission (Urban) in Jammu city,
            coordinating with ward councillors, resident welfare associations, schools, and sanitation workers to
            make Jammu a cleaner, greener, and more liveable city.
          </p>
        </div>

        {/* Intro */}
        <div className="bg-white rounded shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#006400] pb-2 mb-4 inline-block">
            A Clean and Green Jammu
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Jammu Municipal Corporation is actively implementing the Swachh Bharat Mission (Urban) across
            all wards of Jammu city. The city's vision is a trash-free environment — clean roads, open spaces,
            rivers, and public places — that enhances quality of life and boosts tourism potential.
            JMC has undertaken large-scale tree plantation drives, sanitation campaigns, and civic awareness
            programmes to embed cleanliness as a daily civic habit.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            JMC has deployed Garbage Collection Vehicles (GCVs), constructed public toilet complexes,
            installed community bins, and regularly conducts cleanliness drives in partnership with ward
            councillors and citizen groups. The mission aims to make Jammu Open Defecation Free (ODF) and ensure
            solid waste management with 100% door-to-door collection, segregation, and scientific disposal.
          </p>
          <div className="mt-4">
            <a
              href="https://jmc.jk.gov.in/swachhgallery.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-[#006400] text-[#006400] hover:bg-[#006400] hover:text-white px-5 py-2 text-sm font-medium transition-colors rounded"
            >
              View Swachh Gallery →
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Wards Covered', value: '75', icon: '🗺️' },
            { label: 'Public Toilets', value: '120+', icon: '🚽' },
            { label: 'GCV Vehicles', value: '80+', icon: '🚛' },
            { label: 'Sanitation Workers', value: '2000+', icon: '👷' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded shadow-sm p-5 text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-2xl font-bold text-[#006400]">{stat.value}</p>
              <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Initiatives */}
        <div className="bg-white rounded shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#006400] pb-2 mb-5 inline-block">
            Key Initiatives
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Door-to-Door Collection', desc: 'Daily garbage collection from residential and commercial areas by dedicated GCV teams.' },
              { title: 'Waste Segregation', desc: 'Wet/dry waste segregation drive with distribution of two-bin systems to households.' },
              { title: 'Scientific Disposal', desc: 'Scientific solid waste processing and disposal at JMC sanitary landfill sites.' },
              { title: 'ODF+ Certification', desc: 'Jammu has achieved ODF+ status with construction of adequate public toilets across the city.' },
              { title: 'Anti-Polythene Drive', desc: 'Strict enforcement against single-use plastic and polythene bags in commercial areas.' },
              { title: 'Swachh Survekshan', desc: 'Participation in national ranking survey to improve Jammu\'s cleanliness ranking.' },
            ].map((item, i) => (
              <div key={i} className="border border-gray-200 rounded p-4 hover:border-[#006400] transition-colors">
                <h3 className="font-bold text-[#003366] text-sm mb-2">🌿 {item.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Link out */}
        <div className="bg-[#006400] text-white rounded p-6 text-center">
          <h3 className="font-bold text-lg mb-2">View Swachh Mission Photo Gallery</h3>
          <p className="text-green-200 text-sm mb-4">See our cleanliness drives, events, and activities in pictures.</p>
          <a
            href="https://jmc.jk.gov.in/swachhgallery.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#006400] hover:bg-green-50 px-8 py-3 rounded font-medium text-sm transition-colors"
          >
            Open Gallery →
          </a>
        </div>

      </div>
    </SubpageTemplate>
  )
}
