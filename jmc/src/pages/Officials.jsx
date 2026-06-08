import { useEffect, useState } from "react";
import SubpageTemplate from "../components/SubpageTemplate";
import { getOfficials } from "../services/strapiApi";
import { STRAPI_URL } from "../config/api";
import {
  Search,
  Mail,
  Phone,
  User,
  X,
  Copy,
  Check,
  MessageSquare,
  Award,
  ChevronRight,
  Shield,
  Wrench,
  Building,
  HeartHandshake
} from "lucide-react";

export default function Officials() {
  const [officials, setOfficials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'leadership' | 'works' | 'sanitation' | 'enforcement'
  const [selectedOfficial, setSelectedOfficial] = useState(null);
  const [copiedText, setCopiedText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 6;

  const getAvatarInitials = (fullName = "") => {
    const trimmed = String(fullName).trim();
    if (!trimmed) return "U";
    const cleanName = trimmed.replace(/^(sh\.|smt\.|dr\.|er\.|mr\.|mrs\.)\s+/i, "");
    const parts = cleanName.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "U";
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getOfficialCategory = (designation = "") => {
    const des = designation.toLowerCase();
    if (
      des.includes("works") ||
      des.includes("engineer") ||
      des.includes("phe") ||
      des.includes("ueed") ||
      des.includes("division") ||
      des.includes("projects") ||
      des.includes("electrical") ||
      des.includes("mechanical")
    ) {
      return "works";
    }
    if (
      des.includes("health") ||
      des.includes("sanitation") ||
      des.includes("cto") ||
      des.includes("veterinary") ||
      des.includes("animal") ||
      des.includes("hygiene")
    ) {
      return "sanitation";
    }
    if (
      des.includes("enforcement") ||
      des.includes("town planner") ||
      des.includes("building") ||
      des.includes("r&e")
    ) {
      return "enforcement";
    }
    return "leadership";
  };

  useEffect(() => {
    getOfficials()
      .then((res) => setOfficials(res.data.data || []))
      .catch((err) => {
        console.error("Failed to load officials:", err);
        setOfficials([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCopy = (text, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(""), 1500);
  };

  const avatarGradients = [
    "from-blue-600 to-indigo-600",
    "from-indigo-600 to-purple-600",
    "from-purple-600 to-pink-600",
    "from-teal-600 to-emerald-600",
    "from-orange-600 to-amber-600",
    "from-sky-600 to-blue-600",
  ];

  // Filtering logic
  const filteredOfficials = officials.filter((officer) => {
    const matchSearch =
      officer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      officer.designation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      officer.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      officer.mobile?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      officer.office_phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      officer.rti_role?.toLowerCase().includes(searchQuery.toLowerCase());

    const category = getOfficialCategory(officer.designation || "");
    const matchCategory = activeTab === "all" || category === activeTab;

    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filteredOfficials.length / PAGE_SIZE) || 1;
  const paginatedOfficials = filteredOfficials.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const categories = [
    { id: "all", label: "All Members", count: officials.length, icon: User },
    {
      id: "leadership",
      label: "Leadership & Admin",
      count: officials.filter(o => getOfficialCategory(o.designation) === "leadership").length,
      icon: Shield
    },
    {
      id: "works",
      label: "Engineering & Works",
      count: officials.filter(o => getOfficialCategory(o.designation) === "works").length,
      icon: Wrench
    },
    {
      id: "sanitation",
      label: "Health & Sanitation",
      count: officials.filter(o => getOfficialCategory(o.designation) === "sanitation").length,
      icon: HeartHandshake
    },
    {
      id: "enforcement",
      label: "Enforcement & Town Planning",
      count: officials.filter(o => getOfficialCategory(o.designation) === "enforcement").length,
      icon: Building
    }
  ];

  return (
    <SubpageTemplate
      title="Officers & Officials"
      breadcrumb={[{ name: "Officers & Officials" }]}
    >
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-[#003366] via-[#004a8f] to-[#003366] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg border-b-4 border-[#FF6600]">
          {/* Decorative Elements */}
          <div className="absolute -right-20 -top-20 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute -left-16 -bottom-16 w-36 h-36 bg-[#FF6600]/10 rounded-full blur-xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl space-y-2">
              <span className="bg-[#FF6600] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                Who's Who
              </span>
              <h2 className="text-xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Key Officers & Officials
              </h2>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                Meet the administrative heads, commissioners, and key executive officers who coordinate urban operations and development programs across Jammu Municipal Corporation.
              </p>
            </div>
            
            {/* Quick Metrics */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex items-center gap-4 self-start md:self-auto shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#FF6600]/20 flex items-center justify-center text-white border border-[#FF6600]/20">
                <Award className="w-5 h-5 text-[#FF6600]" />
              </div>
              <div>
                <p className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">Total Roster</p>
                <p className="text-xl font-bold">{officials.length} Key Officials</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-5">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search by name, designation, contact or role..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#003366]/10 focus:border-[#003366] transition-all bg-slate-50/50 focus:bg-white text-slate-700"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Showing <span className="font-bold text-[#003366]">{filteredOfficials.length}</span> of {officials.length} records
            </div>
          </div>

          {/* Categories Tab */}
          <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
            {categories.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCurrentPage(1);
                  }}
                  className={`inline-flex items-center gap-2 text-[11px] font-bold px-3.5 py-2 rounded-xl border transition-all duration-200 ${
                    isActive
                      ? "bg-[#003366] border-[#003366] text-white shadow-md shadow-[#003366]/10 scale-[1.02]"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:text-[#003366] hover:border-[#003366] hover:bg-slate-100/50"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#FF6600]" : "text-slate-400"}`} />
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${isActive ? "bg-white/20 text-white" : "bg-slate-200/60 text-slate-500"}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading State / Shimmer Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 shadow-sm animate-pulse">
                <div className="h-4 bg-slate-100 rounded w-1/4 self-end ml-auto" />
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-24 h-24 rounded-full bg-slate-100" />
                  <div className="h-4 bg-slate-100 rounded w-1/2" />
                  <div className="h-3 bg-slate-100 rounded w-3/4" />
                </div>
                <div className="pt-4 border-t border-slate-50 flex justify-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-slate-100" />
                  <div className="w-8 h-8 rounded-lg bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredOfficials.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="w-16 h-16 mx-auto bg-slate-50 rounded-full flex items-center justify-center text-slate-400 border border-slate-100 shadow-inner">
              <User className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800">No Officials Found</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                No official profiles match your search criteria. Please adjust your keywords or filters.
              </p>
            </div>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="text-xs font-bold text-[#003366] hover:text-[#FF6600] underline transition-colors"
              >
                Clear Search Query
              </button>
            )}
          </div>
        ) : (
          /* Grid of Official Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedOfficials.map((officer, idx) => {
              const category = getOfficialCategory(officer.designation || "");
              const initials = getAvatarInitials(officer.name);
              const gradientIndex = (officer.name?.length || idx) % avatarGradients.length;
              const imgUrl = officer.picture?.url
                ? (officer.picture.url.startsWith("http") ? officer.picture.url : `${STRAPI_URL}${officer.picture.url}`)
                : null;

              return (
                <div
                  key={officer.id ?? idx}
                  onClick={() => setSelectedOfficial(officer)}
                  className="group relative bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-slate-200/80 transition-all duration-300 flex flex-col cursor-pointer overflow-hidden transform hover:-translate-y-1"
                >
                  {/* Background accent block */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#003366] to-[#0055aa]/70" />

                  {/* RTI Badges / Category indicator */}
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                      category === "leadership" ? "bg-blue-50 text-blue-700" :
                      category === "works" ? "bg-amber-50 text-amber-700" :
                      category === "sanitation" ? "bg-teal-50 text-teal-700" :
                      "bg-purple-50 text-purple-700"
                    }`}>
                      {category === "leadership" ? "Admin / Executive" :
                       category === "works" ? "Works / Engineering" :
                       category === "sanitation" ? "Health & Sanitation" :
                       "Enforcement"}
                    </span>

                    {officer.rti_role && (
                      <span className="bg-[#FF6600]/10 text-[#FF6600] text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Award className="w-2.5 h-2.5" />
                        RTI: {officer.rti_role}
                      </span>
                    )}
                  </div>

                  {/* Avatar & Info */}
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative">
                      {/* Circle image container */}
                      <div className="w-24 h-24 rounded-full bg-slate-50 border-4 border-white shadow-md overflow-hidden relative transition-transform duration-500 group-hover:scale-105">
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={officer.name}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${avatarGradients[gradientIndex]} flex items-center justify-center text-white font-extrabold text-2xl`}>
                            {initials}
                          </div>
                        )}
                      </div>
                      
                      {/* Subtle Message Icon Indicator */}
                      {officer.message && (
                        <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#FF6600] text-white flex items-center justify-center shadow-md animate-bounce">
                          <MessageSquare className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-800 group-hover:text-[#003366] transition-colors leading-tight">
                        {officer.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#FF6600] uppercase tracking-wider">
                        {officer.designation}
                      </p>
                      <p className="text-[10px] text-slate-400">Jammu Municipal Corp.</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && filteredOfficials.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100 mt-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Showing page <span className="text-[#003366]">{currentPage}</span> of{" "}
              <span className="text-[#003366]">{totalPages}</span>
              <span className="ml-2">
                ({filteredOfficials.length} matching official{filteredOfficials.length !== 1 ? "s" : ""})
              </span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 bg-white"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>
              <button
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-[#003366] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#002244] shadow-sm shadow-[#003366]/20 transition-all active:scale-95"
              >
                Next
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Profile Detail Modal */}
      {selectedOfficial && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setSelectedOfficial(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full border border-slate-100 transform scale-100 transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Cover */}
            <div className="h-28 bg-gradient-to-r from-[#003366] via-[#004a8f] to-[#003366] relative flex justify-end p-4">
              <button
                onClick={() => setSelectedOfficial(null)}
                className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="relative px-6 pb-6 pt-16">
              {/* Picture Overlapping Header Cover */}
              <div className="absolute -top-16 left-6 w-28 h-28 rounded-full bg-slate-100 border-4 border-white shadow-lg overflow-hidden">
                {selectedOfficial.picture?.url ? (
                  <img
                    src={selectedOfficial.picture.url.startsWith("http") ? selectedOfficial.picture.url : `${STRAPI_URL}${selectedOfficial.picture.url}`}
                    alt={selectedOfficial.name}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${avatarGradients[(selectedOfficial.name?.length || 0) % avatarGradients.length]} flex items-center justify-center text-white font-extrabold text-3xl`}>
                    {getAvatarInitials(selectedOfficial.name)}
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="space-y-1">
                {selectedOfficial.rti_role && (
                  <span className="inline-flex items-center gap-1 bg-[#FF6600]/10 text-[#FF6600] text-[10px] font-bold px-2.5 py-0.5 rounded-md mb-2">
                    <Award className="w-3 h-3" />
                    RTI Role: {selectedOfficial.rti_role}
                  </span>
                )}
                
                <h3 className="text-xl font-extrabold text-[#003366]">
                  {selectedOfficial.name}
                </h3>
                <p className="text-sm font-bold text-[#FF6600] uppercase tracking-wide">
                  {selectedOfficial.designation}
                </p>
                <p className="text-xs text-slate-400">Jammu Municipal Corporation</p>
              </div>

              {/* Contact Information Cards */}
              <div className="mt-6 space-y-2.5">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contact Channels</h4>
                
                {selectedOfficial.office_phone && (
                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#003366]/5 text-[#003366] flex items-center justify-center font-bold">
                        📞
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Office Line</p>
                        <p className="text-xs font-mono font-bold text-slate-700">{selectedOfficial.office_phone}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleCopy(selectedOfficial.office_phone, e)}
                      className="p-1.5 hover:bg-slate-200/50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                      title="Copy Number"
                    >
                      {copiedText === selectedOfficial.office_phone ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}

                {selectedOfficial.mobile && (
                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#003366]/5 text-[#003366] flex items-center justify-center">
                        <Phone className="w-4 h-4 text-[#003366]" />
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Mobile Number</p>
                        <p className="text-xs font-mono font-bold text-slate-700">{selectedOfficial.mobile}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <a
                        href={`tel:${selectedOfficial.mobile}`}
                        className="p-1.5 hover:bg-slate-200/50 rounded-lg text-[#003366]"
                        title="Call Mobile"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={(e) => handleCopy(selectedOfficial.mobile, e)}
                        className="p-1.5 hover:bg-slate-200/50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                        title="Copy Number"
                      >
                        {copiedText === selectedOfficial.mobile ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                )}

                {selectedOfficial.email && (
                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FF6600]/5 text-[#FF6600] flex items-center justify-center">
                        <Mail className="w-4 h-4 text-[#FF6600]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Email Address</p>
                        <p className="text-xs font-bold text-slate-700 truncate max-w-[220px]">{selectedOfficial.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <a
                        href={`mailto:${selectedOfficial.email}`}
                        className="p-1.5 hover:bg-slate-200/50 rounded-lg text-[#FF6600]"
                        title="Send Email"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={(e) => handleCopy(selectedOfficial.email, e)}
                        className="p-1.5 hover:bg-slate-200/50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                        title="Copy Email"
                      >
                        {copiedText === selectedOfficial.email ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Message from Official */}
              {selectedOfficial.message && (
                <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#FF6600]" />
                    Official Statement / Message
                  </h4>
                  <div className="bg-[#003366]/5 rounded-2xl p-4 border border-[#003366]/5 relative">
                    <span className="absolute -top-3 left-4 text-3xl font-serif text-[#003366]/10 select-none">“</span>
                    <div className="text-xs text-slate-600 leading-relaxed font-medium max-h-48 overflow-y-auto pr-1">
                      {selectedOfficial.message.split("\n\n").map((para, i) => (
                        <p key={i} className="mb-2 last:mb-0">{para}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </SubpageTemplate>
  );
}
