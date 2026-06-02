import { useState, useEffect } from "react";
import SubpageTemplate from "../components/SubpageTemplate";
import { Link } from "react-router-dom";
import { getOfficials } from "../services/strapiApi";
import { rtiDocuments } from "./rtiDocuments";

const fallbackOfficers = [
  {
    name: "Chand Singh, JKAS",
    designation: "Secretary, JMC",
    rti_role: "PIO",
  },
  {
    name: "Rajeev Khajuria, JKAS",
    designation: "Joint Commissioner (Adm.)",
    rti_role: "First Appellate Authority",
  },
  {
    name: "Mr. Devansh Yadav, IAS",
    designation: "Municipal Commissioner",
    rti_role: "Second Appellate Authority",
  },
];

export default function RTI() {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOfficials()
      .then((res) => {
        const data = res?.data?.data || [];
        const filtered = data
          .filter((item) => {
            const attr = item.attributes || item;
            return !!attr.rti_role;
          })
          .map((item) => {
            const attr = item.attributes || item;
            return {
              name: attr.name,
              designation: attr.designation,
              rti_role: attr.rti_role,
            };
          });

        if (filtered.length > 0) {
          // Sort by role hierarchy: PIO -> FAA -> SAA
          const orderMap = {
            "PIO": 1,
            "First Appellate Authority": 2,
            "Second Appellate Authority": 3,
          };
          filtered.sort(
            (a, b) => (orderMap[a.rti_role] || 99) - (orderMap[b.rti_role] || 99)
          );
          setOfficers(filtered);
        } else {
          setOfficers(fallbackOfficers);
        }
      })
      .catch((err) => {
        console.error("Failed to load RTI officers:", err);
        setOfficers(fallbackOfficers);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <SubpageTemplate
      title="Right to Information (RTI)"
      breadcrumb={[{ name: "RTI" }]}
    >
      <div className="space-y-5">
        <div className="bg-white rounded shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
            Public Information Officers (PIOs)
          </h2>
          <div className="w-full">
            <table className="w-full table-fixed text-sm sm:text-base">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2.5 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase whitespace-normal break-words">
                    Officer
                  </th>
                  <th className="px-2.5 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase whitespace-normal break-words">
                    Designation
                  </th>
                  <th className="px-2.5 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase whitespace-normal break-words">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading && officers.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-8">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-gray-200 border-t-[#003366] rounded-full animate-spin" />
                        <span className="text-xs text-gray-500 font-semibold">Loading PIO list...</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  officers.map((row, idx) => {
                    let roleColor = "bg-blue-100 text-blue-700";
                    if (row.rti_role === "First Appellate Authority")
                      roleColor = "bg-green-100 text-green-700";
                    if (row.rti_role === "Second Appellate Authority")
                      roleColor = "bg-purple-100 text-purple-700";

                    return (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-2.5 sm:px-4 py-2.5 sm:py-3 text-gray-700 font-medium align-top break-words">
                          {row.name}
                        </td>
                        <td className="px-2.5 sm:px-4 py-2.5 sm:py-3 text-gray-500 align-top break-words">
                          {row.designation}
                        </td>
                        <td className="px-2.5 sm:px-4 py-2.5 sm:py-3 align-top break-words">
                          <span className={`${roleColor} text-xs sm:text-sm px-2.5 py-1 rounded-full font-medium inline-block`}>
                            {row.rti_role}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
            Suo Motu Disclosure — Section 4(1)(b)
          </h2>
          <p className="text-sm text-gray-600 mb-5">
            As per Section 4(1)(b) of the RTI Act 2005, Jammu Municipal
            Corporation has proactively disclosed the following information:
          </p>
          <div className="w-full">
            <table className="w-full table-fixed sm:table-auto text-sm sm:text-base border border-gray-200">
              <thead className="bg-[#003366] text-white">
                <tr>
                  <th className="px-2.5 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-semibold w-14 sm:w-24 whitespace-normal sm:whitespace-nowrap break-words sm:break-normal">
                    Clause
                  </th>
                  <th className="px-2.5 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-semibold whitespace-normal break-words">
                    Particulars
                  </th>
                  <th className="px-2.5 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-semibold w-20 sm:w-32 whitespace-normal sm:whitespace-nowrap break-words sm:break-normal">
                    Document
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rtiDocuments.map((row, idx) => (
                  <tr
                    key={idx}
                    className={
                      idx % 2 === 0
                        ? "bg-white hover:bg-gray-50"
                        : "bg-gray-50 hover:bg-gray-100"
                    }
                  >
                    <td className="px-2.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-[#003366] align-top break-words sm:break-normal sm:whitespace-nowrap">
                      {row.clause}
                    </td>
                    <td className="px-2.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-700 align-top break-words">
                      {row.desc}
                    </td>
                    <td className="px-2.5 sm:px-4 py-2.5 sm:py-3 align-top">
                      <Link
                        to={row.to || `/rti/document/${row.slug}`}
                        className="inline-flex items-center gap-1 text-sm sm:text-base bg-[#003366] hover:bg-[#004080] text-white px-3 py-1.5 rounded transition-colors"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SubpageTemplate>
  );
}
