import { useState, useEffect } from "react";
import SubpageTemplate from "../components/SubpageTemplate";
import { Link } from "react-router-dom";
import { getOfficials, getRtiDocuments } from "../services/strapiApi";
import { STRAPI_URL } from "../config/api";

export default function RTI() {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [docsLoading, setDocsLoading] = useState(true);
  const [docsError, setDocsError] = useState("");

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
            PIO: 1,
            "First Appellate Authority": 2,
            "Second Appellate Authority": 3,
          };
          filtered.sort(
            (a, b) =>
              (orderMap[a.rti_role] || 99) - (orderMap[b.rti_role] || 99),
          );
          setOfficers(filtered);
        } else {
          setOfficers([]);
        }
      })
      .catch((err) => {
        console.error("Failed to load RTI officers:", err);
        setOfficers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getRtiDocuments()
      .then((res) => {
        const data = res?.data?.data || [];
        const normalized = data.map((item) => {
          const attr = item.attributes || item;
          // In Strapi v4: media is in attr.document?.data?.attributes
          // In Strapi v5: media is directly in attr.document
          const media = attr.document?.data?.attributes || attr.document || {};
          const url = media?.url || attr.document?.data?.url || "";
          return {
            clause: attr.clause,
            particulars: attr.particulars,
            slug: attr.slug,
            documentUrl: url
              ? url.startsWith("http")
                ? url
                : `${STRAPI_URL}${url}`
              : "",
          };
        });
        setDocuments(normalized);
      })
      .catch((err) => {
        console.error("Failed to load RTI documents:", err);
        setDocsError(
          "Unable to load RTI documents from Strapi. Please check CMS permissions or refresh the page.",
        );
        setDocuments([]);
      })
      .finally(() => {
        setDocsLoading(false);
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
                        <span className="text-xs text-gray-500 font-semibold">
                          Loading PIO list...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : officers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center py-8 text-gray-400 text-sm"
                    >
                      No RTI officers are published in the CMS.
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
                          <span
                            className={`${roleColor} text-xs sm:text-sm px-2.5 py-1 rounded-full font-medium inline-block`}
                          >
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
                {docsError ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center py-8 text-red-600 text-sm"
                    >
                      {docsError}
                    </td>
                  </tr>
                ) : docsLoading && documents.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-8">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-gray-200 border-t-[#003366] rounded-full animate-spin" />
                        <span className="text-xs text-gray-500 font-semibold">
                          Loading RTI documents...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : documents.length === 0 ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center py-8 text-gray-400 text-sm"
                    >
                      No RTI disclosure documents are published in the CMS.
                    </td>
                  </tr>
                ) : (
                  documents.map((row, idx) => (
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
                        {row.particulars}
                      </td>
                      <td className="px-2.5 sm:px-4 py-2.5 sm:py-3 align-top">
                        {row.slug ? (
                          <Link
                            to={`/rti/document/${row.slug}`}
                            className="inline-flex items-center gap-1 text-sm sm:text-base bg-[#003366] hover:bg-[#004080] text-white px-3 py-1.5 rounded transition-colors"
                          >
                            View
                          </Link>
                        ) : row.documentUrl ? (
                          <a
                            href={row.documentUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-sm sm:text-base bg-[#003366] hover:bg-[#004080] text-white px-3 py-1.5 rounded transition-colors"
                          >
                            View
                          </a>
                        ) : (
                          <span className="text-sm text-gray-500">
                            No document attached
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SubpageTemplate>
  );
}
