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
    <SubpageTemplate
      title="Officers & Officials"
      breadcrumb={[{ name: "Officers & Officials" }]}
    >
      <div className="space-y-10 animate-fadeIn">
        {/* Enhanced Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#002B5E] text-xs font-bold tracking-wider uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#002B5E] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#002B5E]"></span>
                </span>
                JMC Administration
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-[#002B5E] tracking-tight">
                Officers & <span className="text-[#FF6600]">Officials</span>
              </h2>
              <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
                Meet the dedicated leadership and administrative team of the
                Jammu Municipal Corporation working towards a better city.
              </p>
            </div>
          </div>
        </div>

        <section>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-[#FF6600] rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="mt-6 text-sm font-bold text-gray-400 uppercase tracking-widest">
                Loading team...
              </p>
            </div>
          ) : officials.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                <svg
                  className="w-10 h-10 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.123-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-700 mb-1">
                No Officials Found
              </h3>
              <p className="text-gray-400 text-sm max-w-xs mx-auto">
                We couldn't find any officers at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {officials.map((officer, idx) => (
                <div
                  key={officer.id ?? idx}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Profile Image Container */}
                  <div className="relative pt-10 pb-6 flex justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
                    <div className="relative group-hover:scale-105 transition-transform duration-500">
                      <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#002B5E] to-[#FF6600] rounded-full opacity-10 group-hover:opacity-20 blur-sm transition-opacity" />
                      <div className="w-32 h-32 rounded-full bg-white p-1 shadow-md border border-gray-100 overflow-hidden relative">
                        {officer.picture?.url ? (
                          <img
                            src={officer.picture.url}
                            alt={officer.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(officer.name)}&size=256&background=002B5E&color=fff&bold=true`}
                            alt={officer.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-6 pb-8 text-center relative">
                    <div className="space-y-1 mb-8">
                      <h3 className="text-lg font-black text-[#002B5E] tracking-tight leading-tight group-hover:text-[#FF6600] transition-colors">
                        {officer.name}
                      </h3>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                        {officer.designation}
                      </p>
                    </div>

                    {/* Modern Profile Button */}
                    <button className="w-full bg-[#002B5E] hover:bg-[#FF6600] text-white text-[11px] font-black uppercase tracking-widest py-3.5 px-4 rounded-xl shadow-lg shadow-[#002B5E]/10 hover:shadow-[#FF6600]/20 transition-all active:scale-95">
                      View Full Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </SubpageTemplate>
  );
}
