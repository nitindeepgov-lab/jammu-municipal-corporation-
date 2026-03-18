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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {officials.map((officer, idx) => (
                <div
                  key={officer.id ?? idx}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Profile Image Container */}
                  <div className="flex justify-center pt-6 pb-4 bg-gray-50">
                    <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden border-4 border-white">
                      {officer.picture?.url ? (
                        <img
                          src={officer.picture.url}
                          alt={officer.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={`https://ui-avatars.com/api/?name=${officer.name}&size=224&background=003366&color=fff`}
                          alt={officer.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-4 pb-6 pt-4 text-center">
                    <h3 className="text-sm font-bold text-[#003366] mb-1">
                      {officer.name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-4">
                      {officer.designation}
                    </p>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-2 mb-4">
                      <a
                        href="#"
                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Facebook"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5C18.52.5 15.76 0 14.22 0 9.6 0 7.38 2.3 7.38 7v2.3H4.77v3.93h2.6V24h4.33V13.23h3.13l.5-3.93h-3.63v-1.75c.04-.9.46-1.45 1.77-1.45z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-blue-400 hover:bg-blue-50 rounded transition-colors"
                        title="Twitter"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                        title="LinkedIn"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.006 1.422-.103.249-.129.597-.129.946v5.437h-3.554s.046-8.816 0-9.737h3.554v1.378c.43-.664 1.195-1.611 2.91-1.611 2.126 0 3.719 1.395 3.719 4.391v5.579zM5.337 9.341c-1.144 0-1.891-.761-1.891-1.711 0-.951.725-1.71 1.875-1.71.001 0 .001 0 .001 0 1.144 0 1.891.76 1.891 1.71 0 .951-.733 1.711-1.876 1.711zM4.095 20.452H7.61V10.715H4.095v9.737zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z" />
                        </svg>
                      </a>
                    </div>

                    {/* Profile Button */}
                    <button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white text-xs font-semibold py-2 px-3 rounded transition-all">
                      Profile →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </SubpageTemplate>
  )
}
