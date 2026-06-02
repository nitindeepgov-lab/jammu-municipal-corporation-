import { useEffect, useState } from "react";
import SubpageTemplate from "../components/SubpageTemplate";
import { getOfficials } from "../services/strapiApi";

const offices = [
  {
    title: "Main Office (Head Quarters)",
    address: "Town Hall Jammu, Jammu and Kashmir 180001",
    phone: "18001807207 (Toll Free)",
    hours: "10:00 AM – 05:00 PM (Working Days)",
  },
  {
    title: "Zone – North Office",
    address: "Peer Mitha, Jammu",
    phone: "Contact HQ",
    hours: "10:00 AM – 05:00 PM",
  },
  {
    title: "Zone – South Office",
    address: "Bohri, Jammu",
    phone: "Contact HQ",
    hours: "10:00 AM – 05:00 PM",
  },
];

export default function Contact() {
  const [officers, setOfficers] = useState([]);
  const [loadingOfficers, setLoadingOfficers] = useState(true);

  useEffect(() => {
    getOfficials()
      .then((res) => {
        setOfficers(res?.data?.data || []);
      })
      .catch(() => {
        setOfficers([]);
      })
      .finally(() => setLoadingOfficers(false));
  }, []);

  return (
    <SubpageTemplate title="Contact Us" breadcrumb={[{ name: "Contact Us" }]}>
      <div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-5 inline-block">
                Office Addresses
              </h2>
              {offices.map((office, idx) => (
                <div key={idx} className="mb-5 last:mb-0">
                  <h3 className="font-bold text-[#003366] text-sm mb-2">
                    {office.title}
                  </h3>
                  <div className="pl-3 border-l-2 border-gray-200 space-y-1 text-sm text-gray-600">
                    <p>📍 {office.address}</p>
                    <p>📞 {office.phone}</p>
                    <p>🕐 {office.hours}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#003366] text-white rounded shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Helpline Numbers</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-white/10 rounded px-4 py-3">
                  <span className="text-sm">General Helpline (Toll Free)</span>
                  <strong className="text-[#FF6600] text-sm">
                    18001807207
                  </strong>
                </div>
                <div className="flex justify-between items-center bg-white/10 rounded px-4 py-3">
                  <span className="text-sm">PHE Water Supply Helpline</span>
                  <a
                    href="https://jmc.jk.gov.in/adminjmcpanel/noticefiles/318202558462347.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF6600] text-sm hover:underline"
                  >
                    View Numbers
                  </a>
                </div>
                <div className="flex justify-between items-center bg-white/10 rounded px-4 py-3">
                  <span className="text-sm">Online Grievance Portal</span>
                  <a
                    href="https://jmc.jk.gov.in/OnlineGrievances.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF6600] text-sm hover:underline"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Grievance Form */}
          <div className="bg-white rounded shadow-sm p-6">
            <h2 className="text-lg font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-5 inline-block">
              Register a Complaint / Grievance
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.open(
                  "https://jmc.jk.gov.in/OnlineGrievances.aspx",
                  "_blank",
                );
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#003366]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#003366]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#003366]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department *
                </label>
                <select
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#003366] bg-white"
                >
                  <option value="">Select Department</option>
                  <option>Water Supply / PHE</option>
                  <option>Sanitation / Solid Waste</option>
                  <option>Roads / Engineering</option>
                  <option>Street Lighting</option>
                  <option>Property Tax</option>
                  <option>Health Department</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Complaint Description *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your grievance in detail..."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#003366] resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#003366] hover:bg-[#004080] text-white py-2.5 rounded font-medium text-sm transition-colors"
              >
                Submit on JMC Portal
              </button>
              <p className="text-xs text-gray-500 text-center">
                For immediate help, call Toll Free: <strong>18001807207</strong>
              </p>
            </form>
          </div>
        </div>

        {/* Officer Directory */}
        <div className="mt-8 bg-white rounded shadow-sm p-6">
          <h2 className="text-lg font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
            Officer Directory
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            For PHE Water Supply helpline numbers,{" "}
            <a
              href="https://jmc.jk.gov.in/adminjmcpanel/noticefiles/318202558462347.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#003366] underline"
            >
              click here (PDF)
            </a>
            . For online birth &amp; death certificate helpline:{" "}
            <strong>0191-2578503</strong>.
          </p>
          <div className="w-full">
            <table className="w-full table-fixed text-sm sm:text-sm border border-gray-200">
              <thead className="bg-[#003366] text-white">
                <tr>
                  <th className="px-2.5 sm:px-3 py-2.5 sm:py-3 text-center text-[11px] font-semibold w-12 whitespace-nowrap">
                    S.No
                  </th>
                  <th className="px-2.5 sm:px-3 py-2.5 sm:py-3 text-left text-[11px] font-semibold whitespace-normal break-words">
                    Name
                  </th>
                  <th className="px-2.5 sm:px-3 py-2.5 sm:py-3 text-left text-[11px] font-semibold whitespace-normal break-words">
                    Designation
                  </th>
                  <th className="px-2.5 sm:px-3 py-2.5 sm:py-3 text-left text-[11px] font-semibold whitespace-normal break-words">
                    Office
                  </th>
                  <th className="px-2.5 sm:px-3 py-2.5 sm:py-3 text-left text-[11px] font-semibold whitespace-normal break-words">
                    Mobile
                  </th>
                  <th className="px-2.5 sm:px-3 py-2.5 sm:py-3 text-left text-[11px] font-semibold whitespace-normal break-words">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loadingOfficers ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-sm text-gray-400">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-[#003366] rounded-full animate-spin" />
                        Loading officer directory...
                      </div>
                    </td>
                  </tr>
                ) : officers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-sm text-gray-400">
                      No officer records found. Please check back later.
                    </td>
                  </tr>
                ) : (
                  officers.map((officer, idx) => (
                    <tr
                      key={officer.id ?? idx}
                      className={
                        idx % 2 === 0
                          ? "bg-white hover:bg-gray-50"
                          : "bg-gray-50 hover:bg-gray-100"
                      }
                    >
                      <td className="px-2.5 sm:px-3 py-2.5 text-gray-400 text-sm text-center align-middle whitespace-nowrap">
                        {idx + 1}
                      </td>
                      <td className="px-2.5 sm:px-3 py-2.5 text-gray-800 font-medium text-sm align-top break-words">
                        {officer.name}
                      </td>
                      <td className="px-2.5 sm:px-3 py-2.5 text-gray-600 text-sm align-top break-words">
                        {officer.designation}
                      </td>
                      <td className="px-2.5 sm:px-3 py-2.5 text-gray-600 text-sm align-top break-words">
                        {officer.office_phone || "—"}
                      </td>
                      <td className="px-2.5 sm:px-3 py-2.5 text-sm align-top break-all">
                        {officer.mobile ? (
                          <a
                            href={`tel:${officer.mobile}`}
                            className="text-[#003366] hover:underline"
                          >
                            {officer.mobile}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-2.5 sm:px-3 py-2.5 text-sm align-top break-all">
                        {officer.email ? (
                          <a
                            href={`mailto:${officer.email}`}
                            className="text-[#003366] hover:underline break-all"
                          >
                            {officer.email}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <a
              href="https://jmc.jk.gov.in/sanitationstaff.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 border border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white px-3 py-1.5 rounded transition-colors"
            >
              Sanitation Staff →
            </a>
            <a
              href="https://jmc.jk.gov.in/enforcementstaff.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 border border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white px-3 py-1.5 rounded transition-colors"
            >
              Enforcement Staff →
            </a>
            <a
              href="https://jmc.jk.gov.in/worksstaff.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 border border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white px-3 py-1.5 rounded transition-colors"
            >
              Works Staff →
            </a>
            <a
              href="https://jmc.jk.gov.in/councillors.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 border border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white px-3 py-1.5 rounded transition-colors"
            >
              Municipal Councillors →
            </a>
          </div>
        </div>

        {/* Map */}
        <div className="mt-8 bg-white rounded shadow-sm p-6">
          <h2 className="text-lg font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
            Location
          </h2>
          <div className="rounded overflow-hidden border border-gray-200 h-72">
            <iframe
              title="JMC Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3370.8!2d74.8636!3d32.7266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e84b2f2e35c5d%3A0x2b3e5c98e4e64a3e!2sJammu%20Municipal%20Corporation!5e1!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </SubpageTemplate>
  );
}
