import { useEffect, useState } from "react";
import SubpageTemplate from "../components/SubpageTemplate";
import { 
  MapPin, 
  ArrowUpRight, 
  Landmark, 
  ExternalLink,
  PhoneCall
} from "lucide-react";
import { getOfficeLocations } from "../services/strapiApi";

export default function Contact() {
  const [offices, setOffices] = useState([]);
  const [loadingOffices, setLoadingOffices] = useState(true);

  useEffect(() => {
    getOfficeLocations()
      .then((res) => {
        setOffices(res?.data?.data || []);
      })
      .catch(() => {
        setOffices([]);
      })
      .finally(() => setLoadingOffices(false));
  }, []);

  return (
    <SubpageTemplate title="Contact Us" breadcrumb={[{ name: "Contact Us" }]}>
      <div className="max-w-6xl mx-auto space-y-10 pb-10">
        
        {/* Intro Hero Section */}
        <div className="bg-gradient-to-r from-[#003366] to-[#004a8f] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg border-b-4 border-[#FF6600]">
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/5 rounded-full" />
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-[#FF6600]/10 rounded-full" />
          
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1 bg-[#FF6600] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-3">
              JMC Connect
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Get in Touch with Jammu Municipal Corporation
            </h2>
            <p className="mt-2 text-white/80 text-sm md:text-base leading-relaxed">
              Reach out to our offices, call our emergency helplines, query the administrative officer directory, or submit formal complaints directly online.
            </p>
          </div>
        </div>

        {/* Quick Contact & Form Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Column: Office Addresses & Helplines */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Helplines Box */}
            <div className="bg-gradient-to-br from-slate-900 to-[#0A1628] text-white rounded-2xl shadow-md p-6 border border-slate-800">
              <h2 className="text-base font-bold tracking-wide uppercase text-[#FF6600] flex items-center gap-2 mb-4">
                <PhoneCall className="w-5 h-5" /> Emergency Helplines
              </h2>
              
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors">
                  <span className="text-xs font-semibold text-white/70">General Helpline (Toll Free)</span>
                  <strong className="text-white text-base font-bold tracking-wider sm:text-right">
                    1800 180 7207
                  </strong>
                </div>
                
                <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors">
                  <span className="text-xs font-semibold text-white/70">PHE Water Supply Help</span>
                  <a
                    href="https://jmc.jk.gov.in/adminjmcpanel/noticefiles/318202558462347.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#FF6600] hover:text-[#ff8533] text-xs font-bold transition-colors"
                  >
                    View PDF <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                
                <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors">
                  <span className="text-xs font-semibold text-white/70">Online Grievance Desk</span>
                  <a
                    href="https://jmc.jk.gov.in/OnlineGrievances.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#FF6600] hover:text-[#ff8533] text-xs font-bold transition-colors"
                  >
                    Register Now <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Office Addresses */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 space-y-5">
              <h2 className="text-base font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-2 inline-block">
                🏢 Office Locations
              </h2>
              
              <div className="space-y-4">
                {loadingOffices ? (
                  <div className="py-8 text-center text-sm text-slate-400">
                    Loading office locations from CMS...
                  </div>
                ) : offices.length === 0 ? (
                  <div className="py-8 text-center text-sm text-slate-400">
                    No office locations are published in the CMS.
                  </div>
                ) : (
                  offices.map((office, idx) => {
                    const attr = office.attributes || office;
                    const isMainOffice = idx === 0;
                    const icon = isMainOffice ? (
                      <Landmark className="w-5 h-5 text-[#003366]" />
                    ) : (
                      <MapPin className="w-5 h-5 text-[#FF6600]" />
                    );
                    const color = isMainOffice
                      ? "border-l-4 border-[#003366]"
                      : "border-l-4 border-[#FF6600]";

                    return (
                      <div 
                        key={office.id ?? idx} 
                        className={`p-4 bg-slate-50/50 rounded-xl border border-slate-100 ${color} hover:bg-slate-50 hover:shadow-sm transition-all duration-300`}
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          {icon}
                          <h3 className="font-bold text-[#003366] text-sm">
                            {attr.title}
                          </h3>
                        </div>
                        <div className="space-y-1.5 text-xs text-slate-600 pl-7">
                          <p className="flex items-start gap-1.5">
                            <span className="text-slate-400">Address:</span>
                            <span>{attr.address}</span>
                          </p>
                          <p className="flex items-center gap-1.5">
                            <span className="text-slate-400">Phone:</span>
                            <span className="font-semibold text-slate-700">{attr.phone || "—"}</span>
                          </p>
                          <p className="flex items-center gap-1.5">
                            <span className="text-slate-400">Hours:</span>
                            <span>{attr.hours || "—"}</span>
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Complaint / Grievance Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8">
            <h2 className="text-lg font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-6 inline-block">
              ✍️ Register a Complaint / Grievance
            </h2>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.open(
                  "https://jmc.jk.gov.in/OnlineGrievances.aspx",
                  "_blank",
                );
              }}
              className="space-y-5"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]/10 focus:border-[#003366] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    className="w-full border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]/10 focus:border-[#003366] transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]/10 focus:border-[#003366] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="w-full border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]/10 focus:border-[#003366] transition-all cursor-pointer bg-white"
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
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Complaint Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your grievance or complaint in detail..."
                  className="w-full border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]/10 focus:border-[#003366] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#003366] to-[#004a8f] hover:from-[#00254c] hover:to-[#003366] text-white py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
              >
                Submit on JMC Portal <ExternalLink className="w-4 h-4" />
              </button>
              
              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                Clicking submit redirects you to the official Jammu Municipal Corporation Integrated Grievance Portal. For immediate assistance, please call Toll Free: <strong className="text-slate-600">1800 180 7207</strong>.
              </p>
            </form>
          </div>

        </div>

        {/* Map Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6">
          <h2 className="text-base font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
            🗺️ Find Us on Map
          </h2>
          <div className="rounded-xl overflow-hidden border border-slate-200 h-80 shadow-inner relative">
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
