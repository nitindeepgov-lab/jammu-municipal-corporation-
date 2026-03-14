import SubpageTemplate from '../components/SubpageTemplate'

export default function About() {
  return (
    <SubpageTemplate title="About Jammu Municipal Corporation" breadcrumb={[{ name: 'About JMC' }]}>
      <div className="space-y-5">

            {/* About section */}
            <section className="bg-white rounded shadow-sm p-6">
              <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">About JMC</h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Jammu Municipal Corporation (JMC) is the urban local body responsible for the civic administration
                of Jammu city — the winter capital of Jammu &amp; Kashmir Union Territory. JMC was established
                under the Jammu &amp; Kashmir Municipal Corporation Act to ensure efficient delivery of municipal
                services to citizens.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                The Corporation is committed to improving the quality of life for residents through quality civic
                services including sanitation, water supply, road maintenance, property tax management, solid waste
                management, and public health initiatives.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                JMC encompasses a large geographical area covering all wards of Jammu city and continually
                strives to modernise its operations through e-governance, transparency, and citizen-centric
                initiatives under various Government of India schemes including Smart Cities Mission and
                Swachh Bharat Mission.
              </p>
            </section>

            {/* Vision & Mission */}
            <section id="vision" className="bg-white rounded shadow-sm p-6">
              <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">Vision &amp; Mission</h2>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="border-l-4 border-[#FF6600] pl-4">
                  <h3 className="font-bold text-[#003366] mb-2">Our Vision</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To make Jammu a clean, green, smart, and liveable city — a model of efficient urban
                    governance that places citizens at the centre of all its activities.
                  </p>
                </div>
                <div className="border-l-4 border-[#006400] pl-4">
                  <h3 className="font-bold text-[#003366] mb-2">Our Mission</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To provide efficient, transparent, and accountable civic services to all residents of
                    Jammu city, leveraging technology and best practices in urban management.
                  </p>
                </div>
              </div>
            </section>

            {/* History */}
            <section id="history" className="bg-white rounded shadow-sm p-6">
              <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">History</h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                The history of municipal governance in Jammu dates back to the era of the Dogra rulers. The
                Jammu Municipal Committee was one of the earliest civic bodies in the region, later upgraded
                to the Jammu Municipal Corporation under the J&amp;K Municipal Corporation Act.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Over the decades, JMC has grown in both scope and scale, expanding its jurisdiction to cover
                a large part of the city and its surrounding areas. The Corporation has undertaken numerous
                infrastructure development projects, improved public health services, and modernised revenue
                collection through technology-driven solutions.
              </p>
            </section>

            {/* Acts & Rules */}
            <section id="acts" className="bg-white rounded shadow-sm p-6">
              <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">Acts &amp; Rules</h2>
              <ul className="space-y-3">
                {[
                  'Jammu & Kashmir Municipal Corporation Act',
                  'Solid Waste Management Rules, 2016',
                  'J&K Property Tax (Determination &amp; Collection) Rules',
                  'Building Bye-Laws for Jammu',
                  'J&K Right to Information Act',
                  'Swachh Bharat Mission (Urban) Guidelines',
                ].map((act, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-[#FF6600] mt-0.5 flex-shrink-0">►</span>
                    {act}
                  </li>
                ))}
              </ul>
            </section>
      </div>
    </SubpageTemplate>
  )
}
