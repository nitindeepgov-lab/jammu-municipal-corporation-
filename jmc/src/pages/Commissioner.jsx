import SubpageTemplate from '../components/SubpageTemplate'

export default function Commissioner() {
  return (
    <SubpageTemplate
      title="Commissioner's Desk"
      breadcrumb={[{ name: "Commissioner's Desk" }]}
    >
      <div className="grid md:grid-cols-3 gap-6">

          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded shadow-sm overflow-hidden">
              <div className="h-64 bg-[#003366] overflow-hidden">
                <img
                  src="/officials/com.jpg"
                  alt="Municipal Commissioner"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.parentNode.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white text-6xl font-bold">DY</div>`
                  }}
                />
              </div>
              <div className="p-5 text-center">
                <h2 className="text-[#003366] font-bold text-base">Mr. Devansh Yadav, IAS</h2>
                <p className="text-[#FF6600] text-sm font-medium mt-1">Municipal Commissioner</p>
                <p className="text-gray-500 text-xs mt-0.5">Jammu Municipal Corporation</p>
                <div className="mt-4 pt-4 border-t border-gray-100 text-left space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-[#003366]">📍</span>
                    Rail Head Complex, Jammu – 180012
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#003366]">📞</span>
                    18001807207 (Toll Free)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#003366]">🌐</span>
                    <a href="https://jmc.jk.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#003366] hover:underline">jmc.jk.gov.in</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Commissioner's Message */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-[#FF6600] rounded-full"></div>
                <h2 className="text-xl font-bold text-[#003366]">Commissioner's Message</h2>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                The Jammu Municipal Corporation is deeply committed to serving the citizens of Jammu with
                integrity, efficiency, and transparency. Our goal is to ensure that every resident of this
                historic city receives quality civic services, ranging from sanitation and water supply to
                road infrastructure and public health.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                We are actively working towards making Jammu a smart, clean, and green city under various
                Government of India flagship programmes including the Smart Cities Mission and Swachh Bharat
                Mission (Urban). Our teams are working round the clock to address citizen grievances and improve
                the overall quality of urban life.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                I invite all citizens to engage with our e-governance portal for hassle-free access to municipal
                services — pay your property tax online, register your complaints, apply for building plans, and
                access birth/death certificates from the comfort of your home.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Your feedback and suggestions are invaluable for us to continually improve. Together, let us
                build a Jammu that we all are proud of.
              </p>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="font-bold text-[#003366] text-sm">Mr. Devansh Yadav, IAS</p>
                <p className="text-gray-500 text-xs">Municipal Commissioner, Jammu</p>
              </div>
            </div>

            {/* Key Initiatives */}
            <div className="bg-white rounded shadow-sm p-6">
              <h3 className="font-bold text-[#003366] text-base mb-4">Key Initiatives</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: '🏙️', title: 'Smart City Mission', desc: 'Technology-driven urban development projects for Jammu' },
                  { icon: '🧹', title: 'Swachh Bharat Mission', desc: 'Cleanliness and solid waste management drives' },
                  { icon: '💡', title: 'Street Lighting', desc: 'LED street light upgrades across all wards' },
                  { icon: '🏗️', title: 'Development Works', desc: 'Road repair, drainage, and public infrastructure' },
                  { icon: '💧', title: 'Water Supply', desc: 'Improved water supply and PHE connectivity' },
                  { icon: '🌿', title: 'Urban Greening', desc: 'Parks, gardens, and horticulture development' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded border border-gray-100 hover:border-[#FF6600] transition-colors">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-[#003366] text-xs">{item.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

      </div>
    </SubpageTemplate>
  )
}
