import { useEffect, useState } from 'react'
import SubpageTemplate from '../components/SubpageTemplate'
import { getOfficials } from '../services/strapiApi'

export default function Officials() {
  const [officials, setOfficials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOfficials()
      .then(res => setOfficials(res.data.data || []))
      .catch(() => setOfficials([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <SubpageTemplate title="Officers &amp; Officials" breadcrumb={[{ name: 'Officials' }]}>
      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-6 inline-block">
            Officers / Officials of JMC
          </h2>

          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading officials...</div>
          ) : officials.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No officials found.</div>
          ) : (
            <div className="overflow-x-auto bg-white rounded shadow-sm">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-[#003366] text-white">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-semibold w-10">S.No</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold">Name</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold">Designation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {officials.map((officer, idx) => (
                    <tr key={officer.id ?? idx} className={idx % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}>
                      <td className="px-3 py-2.5 text-gray-400 text-xs">{idx + 1}</td>
                      <td className="px-3 py-2.5 text-gray-800 font-medium text-xs">{officer.name}</td>
                      <td className="px-3 py-2.5 text-gray-600 text-xs">{officer.designation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </SubpageTemplate>
  )
}
