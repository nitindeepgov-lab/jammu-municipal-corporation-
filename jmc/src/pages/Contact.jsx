import { useEffect, useState } from "react";
import SubpageTemplate from "../components/SubpageTemplate";
import { 
  MapPin, 
  ArrowUpRight, 
  Landmark, 
  ExternalLink,
  PhoneCall,
  Mail,
  Phone,
  Clock,
  Copy,
  Check,
  Compass,
  HelpCircle,
  Send
} from "lucide-react";
import { getOfficeLocations } from "../services/strapiApi";

export default function Contact() {
  const [offices, setOffices] = useState([]);
  const [loadingOffices, setLoadingOffices] = useState(true);
  const [copiedText, setCopiedText] = useState("");

  useEffect(() => {
    getOfficeLocations()
      .then((res) => {
        setOffices(res?.data?.data || []);
      })
      .catch((err) => {
        console.error("Failed to load office locations:", err);
        setOffices([]);
      })
      .finally(() => setLoadingOffices(false));
  }, []);

  const handleCopy = (text, e) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(""), 1500);
  };

  return (
    <SubpageTemplate title="Contact Us" breadcrumb={[{ name: "Contact Us" }]}>
      <div className="max-w-6xl mx-auto space-y-10 pb-12">
        
        {/* Intro Section - Minimalist & Professional */}
        <div className="flex flex-col gap-2 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-6 rounded-full bg-[#FF6600]" />
            <span className="text-[10px] font-bold text-[#FF6600] uppercase tracking-wider font-sans">Support Center</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-[#003366] tracking-tight">
            Connect with Jammu Municipal Corporation
          </h2>
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-3xl">
            Have a question, feedback, or need to log a complaint? Get in touch with our administrative offices, reach out via active emergency helplines, or submit grievances directly to the integrated online portal.
          </p>
        </div>

        {/* Quick Contact & Form Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Column: Office Addresses & Helplines */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Helplines Box - Minimalist & Premium */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-50">
                <div className="w-8 h-8 rounded-lg bg-[#FF6600]/10 flex items-center justify-center text-[#FF6600]">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-black text-slate-805 uppercase tracking-wider">
                  Emergency Helplines
                </h3>
              </div>
              
              <div className="space-y-3">
                {/* Toll Free Helpline */}
                <div className="flex flex-col p-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-100/50 rounded-xl transition-all group">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">General Helpline (Toll Free)</span>
                  <div className="flex items-center justify-between">
                    <a
                      href="tel:18001807207"
                      className="text-[#003366] hover:text-[#FF6600] text-sm md:text-base font-mono font-extrabold tracking-wider transition-colors"
                    >
                      1800 180 7207
                    </a>
                    <button
                      onClick={() => handleCopy("1800 180 7207")}
                      className="p-1 hover:bg-slate-200/50 rounded text-slate-400 hover:text-slate-600 transition-colors"
                      title="Copy Helpline"
                    >
                      {copiedText === "1800 180 7207" ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                
                {/* PHE Help PDF */}
                <div className="flex items-center justify-between p-3.5 border border-slate-100 hover:border-slate-200 rounded-xl bg-white transition-all">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-bold text-slate-600">PHE Water Supply Help</span>
                  </div>
                  <a
                    href="https://jmc.jk.gov.in/adminjmcpanel/noticefiles/318202558462347.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#003366] hover:text-[#FF6600] text-[11px] font-bold transition-colors"
                  >
                    View Info PDF <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                
                {/* Online Grievance Portal link */}
                <div className="flex items-center justify-between p-3.5 border border-slate-100 hover:border-slate-200 rounded-xl bg-white transition-all">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-bold text-slate-600">Online Grievance Desk</span>
                  </div>
                  <a
                    href="https://jmc.jk.gov.in/OnlineGrievances.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#FF6600] hover:text-[#e05a00] text-[11px] font-bold transition-colors"
                  >
                    Register Online <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Office Addresses - Minimalist */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-50">
                <div className="w-8 h-8 rounded-lg bg-[#003366]/5 flex items-center justify-center text-[#003366]">
                  <Landmark className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-black text-slate-805 uppercase tracking-wider">
                  Office Locations
                </h3>
              </div>
              
              <div className="space-y-4">
                {loadingOffices ? (
                  <div className="py-8 text-center text-xs text-slate-400 animate-pulse">
                    Loading locations from CMS...
                  </div>
                ) : offices.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    No office locations found in the CMS.
                  </div>
                ) : (
                  offices.map((office, idx) => {
                    const attr = office.attributes || office;
                    const isMainOffice = idx === 0;
                    
                    return (
                      <div 
                        key={office.id ?? idx} 
                        className={`p-4 rounded-xl border border-slate-100/60 bg-slate-50/30 hover:bg-slate-55 hover:border-slate-200 transition-all duration-300 relative ${
                          isMainOffice ? "border-l-4 border-l-[#003366]" : "border-l-4 border-l-slate-400"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2.5">
                          <div className="flex items-center gap-2">
                            {isMainOffice ? (
                              <Landmark className="w-4 h-4 text-[#003366]" />
                            ) : (
                              <MapPin className="w-4 h-4 text-slate-400" />
                            )}
                            <h4 className="font-extrabold text-[#003366] text-[13px]">
                              {attr.title}
                            </h4>
                          </div>
                          
                          {isMainOffice && (
                            <span className="bg-[#003366]/10 text-[#003366] text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                              Main HQ
                            </span>
                          )}
                        </div>

                        <div className="space-y-2 text-xs text-slate-600 pl-6">
                          <p className="flex items-start gap-1">
                            <span className="text-slate-400 font-medium shrink-0">Add:</span>
                            <span className="text-slate-600">{attr.address}</span>
                          </p>
                          
                          {attr.phone && (
                            <p className="flex items-center gap-1 justify-between">
                              <span className="flex items-center gap-1">
                                <span className="text-slate-400 font-medium">Phone:</span>
                                <span className="font-mono font-bold text-slate-700">{attr.phone}</span>
                              </span>
                              <button
                                onClick={(e) => handleCopy(attr.phone, e)}
                                className="p-1 hover:bg-slate-200/50 rounded text-slate-400 hover:text-slate-600 transition-colors"
                                title="Copy Number"
                              >
                                {copiedText === attr.phone ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                              </button>
                            </p>
                          )}
                          
                          {attr.hours && (
                            <p className="flex items-center gap-1">
                              <span className="text-slate-400 font-medium">Hours:</span>
                              <span className="text-slate-600">{attr.hours}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Complaint / Grievance Redirection Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-50">
                <div className="w-8 h-8 rounded-lg bg-[#003366]/5 flex items-center justify-center text-[#003366]">
                  <Send className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-black text-slate-805 uppercase tracking-wider">
                  Online Complaint / Grievance Form
                </h3>
              </div>

              <p className="text-slate-400 text-xs leading-relaxed">
                This digital desk helps you structure your details before redirecting to the official Integrated Grievance Portal. Please fill out the required parameters.
              </p>

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
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-[#FF6600]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      className="w-full border border-slate-200 bg-slate-50/30 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#003366]/5 focus:border-[#003366] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Mobile Number <span className="text-[#FF6600]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      className="w-full border border-slate-200 bg-slate-50/30 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#003366]/5 focus:border-[#003366] transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full border border-slate-200 bg-slate-50/30 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#003366]/5 focus:border-[#003366] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Department <span className="text-[#FF6600]">*</span>
                    </label>
                    <select
                      required
                      className="w-full border border-slate-200 bg-slate-50/30 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#003366]/5 focus:border-[#003366] transition-all cursor-pointer bg-white"
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
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Complaint Description <span className="text-[#FF6600]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your grievance or complaint in detail..."
                    className="w-full border border-slate-200 bg-slate-50/30 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#003366]/5 focus:border-[#003366] transition-all resize-none text-slate-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#003366] hover:bg-[#002244] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#003366]/10 flex items-center justify-center gap-1.5"
                >
                  File Complaint on JMC Portal <ExternalLink className="w-3.5 h-3.5" />
                </button>
                
                <p className="text-[10px] text-slate-400 text-center leading-relaxed font-sans">
                  Upon submission, you will be redirected to the Integrated Grievance Portal to finalize registration and track updates.
                </p>
              </form>
            </div>
          </div>

        </div>

        {/* Map Section - Minimalist */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-50">
            <span className="text-xs font-black text-slate-805 uppercase tracking-wider">
              Find Us on Map
            </span>
          </div>
          <div className="rounded-xl overflow-hidden border border-slate-100 h-80 relative shadow-sm">
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
