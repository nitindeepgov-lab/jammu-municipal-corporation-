import { useEffect, useState } from "react";
import SubpageTemplate from "../components/SubpageTemplate";
import { getOfficials, getCouncillors } from "../services/strapiApi";
import { STRAPI_URL } from "../config/api";
import { 
  Search, 
  Mail, 
  Phone, 
  ExternalLink 
} from "lucide-react";

export default function OfficerDirectory() {
  const [officers, setOfficers] = useState([]);
  const [councillors, setCouncillors] = useState([]);
  const [loadingOfficers, setLoadingOfficers] = useState(true);
  const [loadingCouncillors, setLoadingCouncillors] = useState(true);
  const [activeTab, setActiveTab] = useState("admin"); // 'admin' | 'sanitation' | 'enforcement' | 'works' | 'councillors'
  const [searchQuery, setSearchQuery] = useState("");

  const getAvatarName = (fullName = "") => {
    const trimmed = String(fullName).trim();
    if (!trimmed) return "";
    const primary = trimmed.split(",")[0].trim();
    if (!primary) return trimmed;
    const parts = primary.split(/\s+/).filter(Boolean);
    if (parts.length <= 2) return parts.join(" ");
    return `${parts[0]} ${parts[parts.length - 1]}`;
  };

  useEffect(() => {
    // Fetch administrative officials
    getOfficials()
      .then((res) => {
        setOfficers(res?.data?.data || []);
      })
      .catch(() => {
        setOfficers([]);
      })
      .finally(() => setLoadingOfficers(false));

    // Fetch councillors list
    getCouncillors()
      .then((res) => {
        setCouncillors(res?.data?.data || []);
      })
      .catch(() => {
        setCouncillors([]);
      })
      .finally(() => setLoadingCouncillors(false));
  }, []);

  const getStaffCategory = (designation = "") => {
    const des = designation.toLowerCase();
    
    // Sanitation Staff
    if (
      des.includes("health") ||
      des.includes("sanitation") ||
      des.includes("cto") ||
      des.includes("transport") ||
      des.includes("veterinary") ||
      des.includes("animal") ||
      des.includes("h & s") ||
      des.includes("hygiene")
    ) {
      return "sanitation";
    }
    
    // Enforcement Staff
    if (
      des.includes("r&e") ||
      des.includes("building") ||
      des.includes("town planner") ||
      des.includes("enforcement")
    ) {
      return "enforcement";
    }
    
    // Works Staff
    if (
      des.includes("works") ||
      des.includes("engineer") ||
      des.includes("phe") ||
      des.includes("ueed") ||
      des.includes("mechanical") ||
      des.includes("electrical") ||
      des.includes("division") ||
      des.includes("projects") ||
      des.includes("div-")
    ) {
      return "works";
    }
    
    return "other";
  };

  // Compile active list based on selected tab
  const getRawList = () => {
    if (activeTab === "councillors") {
      return councillors.map((c, idx) => ({
        id: c.id || idx,
        name: c.name,
        designation: `Ex-Councillor (Ward ${c.ward_no}${c.party_name ? ` - ${c.party_name}` : ""})`,
        office_phone: c.address || "",
        mobile: c.contact_no || "",
        email: c.email_id || "",
        pictureUrl: c.photo?.url 
          ? (c.photo.url.startsWith("http") ? c.photo.url : `${STRAPI_URL}${c.photo.url}`)
          : null,
      }));
    }
    
    const baseOfficers = officers.map((o) => ({
      id: o.id,
      name: o.name,
      designation: o.designation,
      office_phone: o.office_phone || "",
      mobile: o.mobile || "",
      email: o.email || "",
      pictureUrl: o.picture?.url 
        ? (o.picture.url.startsWith("http") ? o.picture.url : `${STRAPI_URL}${o.picture.url}`)
        : null,
      category: getStaffCategory(o.designation),
    }));

    if (activeTab === "admin") {
      return baseOfficers;
    }
    
    return baseOfficers.filter((o) => o.category === activeTab);
  };

  const currentList = getRawList();

  // Filter officers/councillors based on search query
  const filteredList = currentList.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.name?.toLowerCase().includes(query) ||
      item.designation?.toLowerCase().includes(query) ||
      item.email?.toLowerCase().includes(query) ||
      item.mobile?.toLowerCase().includes(query) ||
      item.office_phone?.toLowerCase().includes(query)
    );
  });

  return (
    <SubpageTemplate title="Officer Directory" breadcrumb={[{ name: "Officer Directory" }]}>
      <div className="max-w-6xl mx-auto space-y-8 pb-10">
        
        {/* Intro Banner */}
        <div className="bg-gradient-to-r from-[#003366] to-[#004a8f] rounded-2xl p-6 text-white relative overflow-hidden shadow-md border-b-4 border-[#FF6600]">
          <div className="absolute -right-16 -top-16 w-36 h-36 bg-white/5 rounded-full" />
          <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-[#FF6600]/10 rounded-full" />
          
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              JMC Official Administration Directory
            </h2>
            <p className="mt-1.5 text-white/80 text-xs md:text-sm leading-relaxed">
              Find contact details and designations for officials, department heads, and representatives across Jammu Municipal Corporation. Select a category below to filter records instantly.
            </p>
          </div>
        </div>

        {/* Directory Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 space-y-6">
          
          {/* Tabs Section (Staff Lists & Resources) */}
          <div className="border-b border-slate-100 pb-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Staff Lists & Resources
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "admin", label: "Administration Contacts", icon: "🏢" },
                { id: "sanitation", label: "Sanitation Staff", icon: "🧹" },
                { id: "enforcement", label: "Enforcement Staff", icon: "👮" },
                { id: "works", label: "Works Staff", icon: "🏗️" },
                { id: "councillors", label: "Municipal Councillors", icon: "👥" },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSearchQuery("");
                    }}
                    className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? "bg-[#003366] border-[#003366] text-white shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:text-[#003366] hover:border-[#003366] hover:bg-slate-100/50"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-base font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-1.5 inline-block">
                📞 {activeTab === "councillors" ? "Municipal Councillors Contacts" : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Staff Directory`}
              </h2>
              <p className="text-xs text-slate-500">
                Official contact details. For Birth/Death support: <strong className="text-slate-600">0191-2578503</strong>.
              </p>
            </div>
            
            {/* Live Search Input */}
            <div className="relative w-full md:max-w-xs shrink-0">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder={`Search ${activeTab === "councillors" ? "councillors" : "directory"}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#003366]/10 focus:border-[#003366] transition-all bg-slate-50/50 focus:bg-white"
              />
            </div>
          </div>

          {/* Directory Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-[#003366] text-white font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-3.5 text-center w-14">S.No</th>
                  <th className="px-3 py-3.5 text-center w-14">Photo</th>
                  <th className="px-4 py-3.5">Name</th>
                  <th className="px-4 py-3.5">Designation</th>
                  <th className="px-4 py-3.5 w-44">{activeTab === "councillors" ? "Address" : "Office No."}</th>
                  <th className="px-4 py-3.5 w-36">Mobile</th>
                  <th className="px-4 py-3.5">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {loadingOfficers && activeTab !== "councillors" && officers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-slate-200 border-t-[#003366] rounded-full animate-spin" />
                        <span>Loading directory data...</span>
                      </div>
                    </td>
                  </tr>
                ) : loadingCouncillors && activeTab === "councillors" ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-slate-200 border-t-[#003366] rounded-full animate-spin" />
                        <span>Loading directory data...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400 font-semibold">
                      No records match "{searchQuery}"
                    </td>
                  </tr>
                ) : (
                  filteredList.map((item, idx) => (
                    <tr
                      key={item.id ?? idx}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="px-4 py-3 text-center text-slate-400 font-bold border-r border-slate-100">
                        {idx + 1}
                      </td>
                      <td className="px-3 py-2 text-center align-middle whitespace-nowrap">
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden mx-auto flex items-center justify-center text-xs font-bold text-slate-500 shadow-sm">
                          {item.pictureUrl ? (
                            <img
                              src={item.pictureUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.parentNode.innerHTML = `<span class="text-[10px] font-bold">${getAvatarName(item.name)[0] || "U"}</span>`;
                              }}
                            />
                          ) : (
                            getAvatarName(item.name)[0] || "U"
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-900 font-bold text-[13px]">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {item.designation}
                      </td>
                      <td className="px-4 py-3 text-slate-500 font-mono">
                        {item.office_phone || "—"}
                      </td>
                      <td className="px-4 py-3">
                        {item.mobile ? (
                          <a
                            href={`tel:${item.mobile}`}
                            className="inline-flex items-center gap-1 bg-[#003366]/5 text-[#003366] hover:bg-[#003366] hover:text-white px-2.5 py-1 rounded-lg transition-all font-semibold font-mono"
                          >
                            <Phone className="w-3 h-3" />
                            {item.mobile}
                          </a>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {item.email ? (
                          <a
                            href={`mailto:${item.email}`}
                            className="inline-flex items-center gap-1.5 bg-[#FF6600]/5 text-[#FF6600] hover:bg-[#FF6600] hover:text-white px-2.5 py-1 rounded-lg transition-all font-semibold break-all"
                          >
                            <Mail className="w-3 h-3 shrink-0" />
                            {item.email}
                          </a>
                        ) : (
                          <span className="text-slate-400">—</span>
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
