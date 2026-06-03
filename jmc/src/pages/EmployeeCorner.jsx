import { useState } from "react";
import SubpageTemplate from "../components/SubpageTemplate";
import { Link } from "react-router-dom";
import {
  Mail,
  UserCheck,
  Key,
  FileText,
  Building2,
  DollarSign,
  Receipt,
  FolderDown,
  Lightbulb,
  Eye,
  Scale,
  Lock,
  ExternalLink,
  Shield,
  X
} from "lucide-react";

const EMPLOYEE_TOOLS = [
  {
    name: "Official Login",
    description: "Sign in to the JMC Administrative and Municipal dashboard.",
    icon: UserCheck,
    type: "external",
    href: "https://myjammu.in/Login/Index",
    bgClass: "bg-teal-50 text-teal-600 border-teal-100",
    hoverBgClass: "hover:bg-teal-50/50 hover:border-teal-300",
  },
  {
    name: "Birth Certificate",
    description: "Verify, issue, and manage birth & death registration certificates.",
    icon: FileText,
    type: "external",
    href: "https://jansugam.jk.gov.in/login.do",
    bgClass: "bg-emerald-50 text-emerald-600 border-emerald-100",
    hoverBgClass: "hover:bg-emerald-50/50 hover:border-emerald-300",
  },
  {
    name: "Building Permission",
    description: "Manage online building permit applications and structural approvals.",
    icon: Building2,
    type: "external",
    href: "https://hudd.jk.gov.in/",
    bgClass: "bg-violet-50 text-violet-600 border-violet-100",
    hoverBgClass: "hover:bg-violet-50/50 hover:border-violet-300",
  },
  {
    name: "Salary Certificate",
    description: "Generate and download official Salary Certificates.",
    icon: DollarSign,
    type: "intranet",
    href: "https://jmc.jk.gov.in",
    bgClass: "bg-orange-50 text-orange-600 border-orange-100",
    hoverBgClass: "hover:bg-orange-50/50 hover:border-orange-300",
  },
  {
    name: "Pay Slip",
    description: "Access and print monthly employee salary slips.",
    icon: Receipt,
    type: "intranet",
    href: "https://jmc.jk.gov.in",
    bgClass: "bg-amber-50 text-amber-600 border-amber-100",
    hoverBgClass: "hover:bg-amber-50/50 hover:border-amber-300",
  },
  {
    name: "Pay Statement",
    description: "View annual income tax statements and payroll summaries.",
    icon: FileText,
    type: "intranet",
    href: "https://jmc.jk.gov.in",
    bgClass: "bg-sky-50 text-sky-600 border-sky-100",
    hoverBgClass: "hover:bg-sky-50/50 hover:border-sky-300",
  },
  {
    name: "File Dropbox",
    description: "Upload and share official internal documents and reports.",
    icon: FolderDown,
    type: "intranet",
    href: "https://jmc.jk.gov.in",
    bgClass: "bg-rose-50 text-rose-600 border-rose-100",
    hoverBgClass: "hover:bg-rose-50/50 hover:border-rose-300",
  },
  {
    name: "Knowledge Base System",
    description: "Read standard operating procedures, manuals, and circulars.",
    icon: Lightbulb,
    type: "intranet",
    href: "https://jmc.jk.gov.in",
    bgClass: "bg-yellow-50 text-yellow-600 border-yellow-100",
    hoverBgClass: "hover:bg-yellow-50/50 hover:border-yellow-300",
  },
  {
    name: "File Monitoring System",
    description: "Track the movement, feedback, and approvals of active files.",
    icon: Eye,
    type: "intranet",
    href: "https://jmc.jk.gov.in",
    bgClass: "bg-cyan-50 text-cyan-600 border-cyan-100",
    hoverBgClass: "hover:bg-cyan-50/50 hover:border-cyan-300",
  },
  {
    name: "Rules & Regulation Regarding JMC",
    description: "Browse legal acts, municipal regulations, and statutory codes.",
    icon: Scale,
    type: "internal",
    href: "/rti",
    bgClass: "bg-slate-50 text-slate-600 border-slate-100",
    hoverBgClass: "hover:bg-slate-50/50 hover:border-slate-300",
  },
];

export default function EmployeeCorner() {
  const [activeTool, setActiveTool] = useState(null);

  const handleToolClick = (tool, e) => {
    if (tool.type === "intranet") {
      e.preventDefault();
      setActiveTool(tool);
    }
  };

  const closeModal = () => {
    setActiveTool(null);
  };

  return (
    <SubpageTemplate
      title="Employee Corner"
      breadcrumb={[{ name: "Employee Corner", to: null }]}
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#FF6600] shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg  font-extrabold text-[#002B5E]">
              JMC Staff Portal
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Single window portal for municipal administrators, officers, and staff
            </p>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EMPLOYEE_TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isIntranet = tool.type === "intranet";
            const isInternal = tool.type === "internal";

            const cardContent = (
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl shrink-0 border flex items-center justify-center transition-transform group-hover:scale-110 duration-300 ${tool.bgClass}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="font-bold text-[#002B5E] text-sm group-hover:text-[#FF6600] transition-colors flex items-center gap-1.5">
                    {tool.name}
                    {isIntranet && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                        <Lock className="w-2.5 h-2.5" />
                        Intranet
                      </span>
                    )}
                    {!isIntranet && !isInternal && (
                      <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-[#FF6600] transition-colors" />
                    )}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    {tool.description}
                  </p>
                </div>
              </div>
            );

            return (
              <div key={tool.name}>
                {isIntranet ? (
                  <button
                    onClick={(e) => handleToolClick(tool, e)}
                    className={`w-full text-left group bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer ${tool.hoverBgClass}`}
                  >
                    {cardContent}
                  </button>
                ) : isInternal ? (
                  <Link
                    to={tool.href}
                    className={`block group bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ${tool.hoverBgClass}`}
                  >
                    {cardContent}
                  </Link>
                ) : (
                  <a
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block group bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ${tool.hoverBgClass}`}
                  >
                    {cardContent}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Intranet Warning Modal */}
      {activeTool && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeModal}
          />

          {/* Modal Container */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full border border-slate-100 relative z-10 transform scale-100 transition-all duration-300">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-slate-50 p-1.5 rounded-lg transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#FF6600] flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-extrabold text-[#002B5E]">
                  Secure Intranet Access Only
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Resource: <span className="text-[#FF6600] font-bold">{activeTool.name}</span>
                </p>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                This utility is hosted on the Jammu Municipal Corporation Intranet / J&K State Data Centre secure network. To proceed, make sure you are:
              </p>

              <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4 font-medium">
                <li>Connected to the JMC local building network (LAN/Wi-Fi).</li>
                <li>Or, running an active government-approved VPN connection (SDC/NIC VPN).</li>
              </ul>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href={activeTool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-[#002B5E] hover:bg-[#001D40] rounded-xl transition-all shadow-sm"
                  onClick={closeModal}
                >
                  Proceed to Portal
                </a>
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 text-xs font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </SubpageTemplate>
  );
}
