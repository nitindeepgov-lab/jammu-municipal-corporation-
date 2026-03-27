import { useEffect, useState } from "react";
import SubpageTemplate from "../components/SubpageTemplate";
import { getOfficials } from "../services/strapiApi";

export default function Officials() {
  const [officials, setOfficials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOfficials()
      .then((res) => setOfficials(res.data.data || []))
      .catch(() => setOfficials([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SubpageTemplate
      title="Officers & Officials"
      breadcrumb={[{ name: "Officers & Officials" }]}
    >
      <div className="space-y-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#002B5E] tracking-tight">
            Officers & Officials
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-2xl leading-relaxed">
            Meet the leadership and administrative team of Jammu Municipal
            Corporation.
          </p>
        </div>

        <section>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-200">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-[#002B5E] rounded-full animate-spin" />
              <p className="mt-4 text-sm font-semibold text-gray-500">
                Loading officials...
              </p>
            </div>
          ) : officials.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
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
              <h3 className="text-lg font-semibold text-gray-700 mb-1">
                No Officials Found
              </h3>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">
                Official records are currently unavailable.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {officials.map((officer, idx) => (
                <div
                  key={officer.id ?? idx}
                  className="bg-white rounded-xl border border-gray-200 p-6"
                >
                  <div className="flex justify-center mb-5">
                    <div className="w-28 h-28 rounded-full bg-gray-100 p-1 border border-gray-200 overflow-hidden">
                      {officer.picture?.url ? (
                        <img
                          src={officer.picture.url}
                          alt={officer.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(officer.name)}&size=256&background=1f2937&color=fff`}
                          alt={officer.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-lg font-bold text-[#002B5E] leading-tight">
                      {officer.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      {officer.designation}
                    </p>
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
