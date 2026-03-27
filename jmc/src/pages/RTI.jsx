import SubpageTemplate from "../components/SubpageTemplate";
import { Link } from "react-router-dom";
import { rtiDocuments } from "./rtiDocuments";

export default function RTI() {
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
                <tr className="hover:bg-gray-50">
                  <td className="px-2.5 sm:px-4 py-2.5 sm:py-3 text-gray-700 font-medium align-top break-words">
                    Chand Singh, JKAS
                  </td>
                  <td className="px-2.5 sm:px-4 py-2.5 sm:py-3 text-gray-500 align-top break-words">
                    Secretary, JMC
                  </td>
                  <td className="px-2.5 sm:px-4 py-2.5 sm:py-3 align-top break-words">
                    <span className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-full">
                      PIO
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-2.5 sm:px-4 py-2.5 sm:py-3 text-gray-700 font-medium align-top break-words">
                    Rajeev Khajuria, JKAS
                  </td>
                  <td className="px-2.5 sm:px-4 py-2.5 sm:py-3 text-gray-500 align-top break-words">
                    Joint Commissioner (Adm.)
                  </td>
                  <td className="px-2.5 sm:px-4 py-2.5 sm:py-3 align-top break-words">
                    <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded-full">
                      First Appellate Authority
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-2.5 sm:px-4 py-2.5 sm:py-3 text-gray-700 font-medium align-top break-words">
                    Mr. Devansh Yadav, IAS
                  </td>
                  <td className="px-2.5 sm:px-4 py-2.5 sm:py-3 text-gray-500 align-top break-words">
                    Municipal Commissioner
                  </td>
                  <td className="px-2.5 sm:px-4 py-2.5 sm:py-3 align-top break-words">
                    <span className="bg-purple-100 text-purple-700 text-sm px-2 py-1 rounded-full">
                      Second Appellate Authority
                    </span>
                  </td>
                </tr>
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
