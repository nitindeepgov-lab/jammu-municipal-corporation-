import SubpageTemplate from "../components/SubpageTemplate";

const taxCategories = [
  { type: "Residential", rate: "0.5% – 2% of Annual Value", period: "Half-Yearly", desc: "Applicable to all residential properties including apartments and independent houses." },
  { type: "Commercial", rate: "2% – 5% of Annual Value", period: "Half-Yearly", desc: "Applicable to shops, offices, hotels, and all commercial establishments." },
  { type: "Industrial", rate: "2% – 4% of Annual Value", period: "Annual", desc: "Applicable to factories, godowns, and industrial units within JMC limits." },
  { type: "Mixed Use", rate: "Assessed Separately", period: "Half-Yearly", desc: "Properties with mixed residential and commercial use are assessed by the revenue wing." },
];

const services = [
  { icon: "🏠", title: "Property Tax Assessment", desc: "Self-assessment and regular assessment of property taxes for all properties in JMC limits." },
  { icon: "💳", title: "Online Tax Payment", desc: "Pay your property tax online through the JMC portal — convenient, fast and paperless." },
  { icon: "📋", title: "No Objection Certificate", desc: "Obtain NOC for property transactions, bank loans, and other legal requirements." },
  { icon: "🔄", title: "Name Mutation", desc: "Transfer of property tax records on purchase, inheritance or gift of property." },
  { icon: "📊", title: "Tax Rebate Schemes", desc: "Early payment rebates and concessions for senior citizens and women property owners." },
  { icon: "📞", title: "Grievance Redressal", desc: "Dispute resolution and appeals against tax assessments through a transparent process." },
];

const stats = [
  { label: "Registered Properties", value: "2.5 L+", color: "border-blue-500" },
  { label: "Tax Collection (Annual)", value: "₹85 Cr+", color: "border-green-500" },
  { label: "Online Payments", value: "60%+", color: "border-[#FF6600]" },
  { label: "Assessment Wards", value: "75", color: "border-[#003366]" },
];

export default function RevenueTaxation() {
  return (
    <SubpageTemplate
      title="Revenue & Taxation"
      breadcrumb={[{ name: "Departments", to: "/departments" }, { name: "Revenue & Taxation" }]}
    >
      <div className="space-y-8">

        {/* Intro */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
            Property Tax &amp; Revenue Services
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            The Revenue & Taxation Department of Jammu Municipal Corporation manages all property tax assessments,
            collections, and revenue-related functions. Property tax is the primary source of revenue for JMC,
            funding civic amenities and infrastructure development across Jammu city.
          </p>
          <a
            href="/pay-online"
            className="inline-flex items-center gap-2 bg-[#FF6600] text-white px-5 py-2 text-sm font-semibold rounded-lg hover:bg-[#e55a00] transition-colors"
          >
            Pay Property Tax Online
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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

        {/* Tax Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#003366] text-white px-5 py-3">
            <h3 className="font-bold text-sm">Property Tax Rate Schedule</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600 uppercase">Property Type</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600 uppercase">Rate</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600 uppercase">Period</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-600 uppercase">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {taxCategories.map((cat, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700 font-medium">{cat.type}</td>
                    <td className="px-4 py-3 text-[#FF6600] font-semibold">{cat.rate}</td>
                    <td className="px-4 py-3 text-gray-500">{cat.period}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{cat.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How to pay */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-[#003366] mb-5">How to Pay Property Tax</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Find Your Property", desc: "Search using your house/property number or owner name on the JMC portal.", icon: "🔍" },
              { step: "2", title: "View Tax Dues", desc: "Check the outstanding tax amount, including any arrears or penalties.", icon: "📊" },
              { step: "3", title: "Make Payment", desc: "Pay securely online via UPI, Net Banking, Credit/Debit Card, or visit the JMC office.", icon: "💳" },
            ].map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center p-5 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold text-sm mb-3">{step.step}</div>
                <span className="text-3xl mb-2">{step.icon}</span>
                <p className="font-semibold text-[#003366] text-sm">{step.title}</p>
                <p className="text-gray-500 text-xs mt-1">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 text-center">
            <a
              href="/pay-online"
              className="inline-flex items-center gap-2 bg-[#FF6600] text-white px-6 py-2.5 text-sm font-semibold rounded-lg hover:bg-[#e55a00] transition-colors"
            >
              Pay Now Online →
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-[#003366] rounded-xl p-6 text-white">
          <h3 className="font-bold text-lg mb-2">Revenue Department Contact</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-4">
            <div className="flex items-start gap-3">
              <span className="text-[#FF6600] mt-0.5">📞</span>
              <div>
                <p className="font-semibold">Helpline</p>
                <p className="text-blue-200">0191-2544227</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#FF6600] mt-0.5">⏰</span>
              <div>
                <p className="font-semibold">Office Hours</p>
                <p className="text-blue-200">Mon – Sat: 10:00 AM – 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </SubpageTemplate>
  );
}
