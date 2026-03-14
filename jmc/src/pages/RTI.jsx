import SubpageTemplate from '../components/SubpageTemplate'

export default function RTI() {
  return (
    <SubpageTemplate title="Right to Information (RTI)" breadcrumb={[{ name: 'RTI' }]}>
      <div className="space-y-5">

            <div className="bg-white rounded shadow-sm p-6">
              <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
                About RTI Act
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                The Right to Information Act, 2005 empowers every citizen of India to seek information from any
                public authority. Jammu Municipal Corporation is committed to upholding the spirit of this act
                and ensuring transparency in its operations.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Citizens can file RTI applications to seek information about JMC's activities, expenditures,
                development works, tenders, appointments, and any other matter related to civic administration.
              </p>
            </div>

            <div className="bg-white rounded shadow-sm p-6">
              <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
                Public Information Officers (PIOs)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Officer</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Designation</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-700 font-medium">Chand Singh, JKAS</td>
                      <td className="px-4 py-3 text-gray-500">Secretary, JMC</td>
                      <td className="px-4 py-3"><span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">PIO</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-700 font-medium">Rajeev Khajuria, JKAS</td>
                      <td className="px-4 py-3 text-gray-500">Joint Commissioner (Adm.)</td>
                      <td className="px-4 py-3"><span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">First Appellate Authority</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-700 font-medium">Mr. Devansh Yadav, IAS</td>
                      <td className="px-4 py-3 text-gray-500">Municipal Commissioner</td>
                      <td className="px-4 py-3"><span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">Second Appellate Authority</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded shadow-sm p-6">
              <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
                How to File an RTI
              </h2>
              <ol className="space-y-3">
                {[
                  'Write a plain application addressed to the Public Information Officer (PIO), JMC Jammu.',
                  'Clearly mention the specific information you are seeking.',
                  'Attach application fee of ₹10/- via demand draft, postal order, or as specified.',
                  'Submit in person at JMC Head Office or send by post to: PIO, Jammu Municipal Corporation, Town Hall Jammu, Jammu and Kashmir 180001.',
                  'Alternatively, file online via the RTI Online Portal at rtionline.gov.in.',
                  'Response must be provided within 30 days of receipt of application.',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="w-6 h-6 rounded-full bg-[#003366] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-white rounded shadow-sm p-6">
              <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
                Suo Motu Disclosure — Section 4(1)(b)
              </h2>
              <p className="text-sm text-gray-600 mb-5">
                As per Section 4(1)(b) of the RTI Act 2005, Jammu Municipal Corporation has proactively disclosed the following information:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200">
                  <thead className="bg-[#003366] text-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold w-16">Clause</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold">Particulars</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold w-28">Document</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { clause: '4(1)(b)(i)', desc: 'Particulars of organisation, functions and duties', href: 'https://jmc.jk.gov.in/forms/sec4bi.pdf' },
                      { clause: '4(1)(b)(iii)', desc: 'Procedure followed in the decision-making process, including channels of supervision and accountability', href: 'https://jmc.jk.gov.in/forms/sec4b3.pdf' },
                      { clause: '4(1)(b)(iv–vi)', desc: 'Norms set for the discharge of functions; rules, regulations, instructions, manuals and records held', href: 'https://jmc.jk.gov.in/sec4rti-part2.html' },
                      { clause: '4(1)(b)(vii–viii)', desc: 'Statement of boards, councils and committees; minutes of meetings that are accessible to the public', href: 'https://jmc.jk.gov.in/forms/sec4vii%26viii.pdf' },
                      { clause: '4(1)(b)(ix)', desc: 'Directory of officers and employees', href: 'https://jmc.jk.gov.in/contactus.html' },
                      { clause: '4(1)(b)(xi)', desc: 'Budget allocated to each agency including plans, proposed expenditures and disbursements made', href: 'https://jmc.jk.gov.in/forms/budget.pdf' },
                      { clause: '4(1)(b)(xii–xiii)', desc: 'Manner of execution of subsidy programmes; recipients of concessions, permits or authorisations granted', href: 'https://jmc.jk.gov.in/forms/sec4xii%26xiii.pdf' },
                      { clause: '4(1)(b)(xiv)', desc: 'Details of information available to or held in electronic form', href: 'https://jmc.jk.gov.in/forms/sec4xiv.pdf' },
                      { clause: '4(1)(b)(xv)', desc: 'Particulars of facilities available to citizens for obtaining information', href: 'https://jmc.jk.gov.in/forms/sec4xv.pdf' },
                      { clause: '4(1)(b)(xvi)', desc: 'Names, designations and other particulars of Public Information Officers', href: 'https://jmc.jk.gov.in/forms/sec4xvi.pdf' },
                    ].map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}>
                        <td className="px-4 py-3 text-xs font-semibold text-[#003366] whitespace-nowrap">{row.clause}</td>
                        <td className="px-4 py-3 text-xs text-gray-700">{row.desc}</td>
                        <td className="px-4 py-3">
                          <a
                            href={row.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs bg-[#003366] hover:bg-[#004080] text-white px-3 py-1.5 rounded transition-colors"
                          >
                            View ↗
                          </a>
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
