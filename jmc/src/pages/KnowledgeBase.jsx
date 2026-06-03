import { useState } from "react";
import SubpageTemplate from "../components/SubpageTemplate";
import { Lightbulb, Search, BookOpen, Download, Calendar, ExternalLink } from "lucide-react";

const DOCS_DATABASE = [
  {
    id: "1",
    title: "Standard Operating Procedure (SOP) for Ward Sanitation",
    category: "SOPs",
    refNo: "JMC/SOP/2025/12",
    date: "14/11/2025",
    size: "1.4 MB",
    link: "https://jmc.jk.gov.in/forms/sop_sanitation.pdf",
    description: "Guidelines and inspection timelines for sanitation staff and supervisors across wards.",
  },
  {
    id: "2",
    title: "Rules of Business & Administrative Powers",
    category: "Manuals",
    refNo: "JMC/MANUAL/02",
    date: "05/01/2024",
    size: "4.5 MB",
    link: "https://jmc.jk.gov.in/forms/rules_of_business.pdf",
    description: "Comprehensive guide to financial and administrative delegation of powers in JMC.",
  },
  {
    id: "3",
    title: "Circular Regarding Bio-metric Attendance Compliance",
    category: "Circulars",
    refNo: "JMC/EST/CIRCULAR-104",
    date: "18/05/2026",
    size: "350 KB",
    link: "https://jmc.jk.gov.in/forms/biometric_compliance.pdf",
    description: "Notification regarding mandatory biometric punching at municipal building locations.",
  },
  {
    id: "4",
    title: "Solid Waste Management (SWM) Execution Plan 2026",
    category: "Guidelines",
    refNo: "JMC/SWM/PLAN-06",
    date: "10/02/2026",
    size: "2.8 MB",
    link: "https://jmc.jk.gov.in/forms/swm_plan2026.pdf",
    description: "Implementation rules and waste segregation protocols under SWM Rules 2016.",
  },
  {
    id: "5",
    title: "DDO Manual for Payroll Processing & NPS Claims",
    category: "Manuals",
    refNo: "JMC/PAY/DDO-M1",
    date: "22/07/2025",
    size: "3.1 MB",
    link: "https://jmc.jk.gov.in/forms/ddo_manual_payroll.pdf",
    description: "Manual for department cashiers and DDO clerks detailing NPS credits and pay slip generation.",
  },
  {
    id: "6",
    title: "Guidelines for Online Trade License NOC Issuance",
    category: "Guidelines",
    refNo: "JMC/NOC/GUIDELINES-02",
    date: "05/03/2026",
    size: "950 KB",
    link: "https://jmc.jk.gov.in/forms/trade_license_noc.pdf",
    description: "Standard checklist and workflow approvals for municipal trade licensing and NOCs.",
  }
];

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "SOPs", "Manuals", "Circulars", "Guidelines"];

  const filteredDocs = DOCS_DATABASE.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.refNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || doc.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <SubpageTemplate
      title="Employee Knowledge Base"
      breadcrumb={[
        { name: "Employee Corner", to: "/employee-corner" },
        { name: "Knowledge Base", to: null },
      ]}
    >
      <div className="space-y-6">
        {/* Search and Category Filter Card */}
        <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#FF6600]">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#002B5E]">
                  Internal Archives & Guidelines
                </h2>
                <p className="text-xs text-gray-500">
                  Search JMC rules of business, SOPs, official manuals, and regulations
                </p>
              </div>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search documents, ref numbers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-xs font-semibold focus:outline-none focus:border-[#002B5E] focus:bg-white transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 border-t border-slate-100 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-[#002B5E] text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Layout */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredDocs.length === 0 ? (
            <div className="md:col-span-2 bg-white rounded-xl border border-slate-100 p-12 text-center text-gray-400 font-medium text-xs">
              no archived files found matching the criteria. try a different search.
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="group bg-white rounded-xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  {/* Category and Ref No */}
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-orange-50 text-[#FF6600] uppercase tracking-wider">
                      {doc.category}
                    </span>
                    <span className="text-slate-400 uppercase tracking-wide">
                      Ref: {doc.refNo}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold text-[#002B5E] text-sm leading-snug group-hover:text-[#FF6600] transition-colors">
                    {doc.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    {doc.description}
                  </p>
                </div>

                {/* Footer details & Download */}
                <div className="flex items-center justify-between border-t border-slate-50 pt-3 text-[10px] text-gray-400 font-medium">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>Published: {doc.date}</span>
                  </div>
                  <button
                    onClick={() => alert(`Downloading Document: ${doc.title}`)}
                    className="inline-flex items-center gap-1 bg-[#002B5E]/5 text-[#002B5E] group-hover:bg-[#002B5E] group-hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    <Download className="w-3 h-3 shrink-0" />
                    <span>{doc.size}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </SubpageTemplate>
  );
}
