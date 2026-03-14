import SubpageTemplate from '../components/SubpageTemplate'

export default function WebInfoManager() {
  return (
    <SubpageTemplate
      title="Web Information Manager"
      breadcrumb={[{ name: 'Web Information Manager', to: null }]}
    >
      <div className="space-y-5">

        {/* Working Hours */}
        <div className="bg-[#003366] text-white rounded px-5 py-3 text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Working Hours: 10:00 AM to 04:00 PM
        </div>

        {/* Office Address */}
        <div className="bg-white rounded shadow-sm p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-3 inline-block">
              Office Address
            </h2>
            <address className="not-italic text-sm text-gray-700 leading-7">
              Information Technology Centre<br />
              Jammu Municipal Corporation,<br />
              2nd Floor, Town Hall Complex,<br />
              Gummat, Jammu.
            </address>
          </div>

          {/* WIM Badge */}
          <div className="inline-flex items-center gap-2 bg-[#003366] text-white text-xs font-semibold px-4 py-2 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Web Information Manager
          </div>
        </div>

        {/* Officer Details */}
        <div className="bg-white rounded shadow-sm p-6">
          <h2 className="text-base font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
            Nodal Officer
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Designation</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Contact No.</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">Shri Ankush Kapoor</td>
                  <td className="px-4 py-3 text-gray-500">Informatics Officer</td>
                  <td className="px-4 py-3 text-gray-700">
                    <a href="tel:01912478933" className="hover:text-[#003366] transition-colors">0191-2478933</a>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <a href="mailto:jmc.jammu@gmail.com" className="hover:text-[#003366] transition-colors break-all">
                      jmc.jammu@gmail.com
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Important Telephone / Email */}
        <div className="bg-white rounded shadow-sm p-6">
          <h2 className="text-base font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
            Important Telephone Nos. / Email Addresses
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Department / Section</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { dept: 'Municipal Commissioner', phone: '0191-2542500', email: 'mc.jmc@jk.gov.in' },
                  { dept: 'Secretary, JMC', phone: '0191-2547697', email: 'secy.jmcjmu@gmail.com' },
                  { dept: 'IT Cell / Web Manager', phone: '0191-2478933', email: 'jmc.jammu@gmail.com' },
                  { dept: 'Toll Free Helpline', phone: '1800-180-7207', email: '—' },
                ].map(({ dept, phone, email }) => (
                  <tr key={dept} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">{dept}</td>
                    <td className="px-4 py-3 text-gray-600">
                      <a href={`tel:${phone.replace(/-/g, '')}`} className="hover:text-[#003366] transition-colors">{phone}</a>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {email === '—' ? '—' : (
                        <a href={`mailto:${email}`} className="hover:text-[#003366] transition-colors break-all">{email}</a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Policy note */}
        <div className="bg-blue-50 border border-blue-100 rounded p-4 flex gap-3 items-start text-sm text-gray-600">
          <svg className="w-5 h-5 text-[#003366] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="leading-relaxed">
            This website is designed, developed&nbsp;&amp;&nbsp;maintained by the IT Cell of Jammu Municipal Corporation.
            For content-related queries, please contact the Web Information Manager at the address above.
          </p>
        </div>

      </div>
    </SubpageTemplate>
  )
}
