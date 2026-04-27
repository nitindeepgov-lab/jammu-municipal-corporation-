import { Link } from "react-router-dom";
import SubpageTemplate from "../components/SubpageTemplate";

const departments = [
  {
    name: "Engineering Department",
    to: "/departments/engineering",
    icon: "⚙️",
    desc: "Infrastructure, roads, drains, footpaths, street lighting, and all civil engineering works across Jammu city.",
    color: "border-blue-500",
    tag: "Infrastructure",
  },
  {
    name: "Health Department",
    to: "/departments/health",
    icon: "🏥",
    desc: "Public health, sanitation drives, vector control, Swachh Bharat Mission activities and community hygiene.",
    color: "border-red-500",
    tag: "Public Health",
  },
  {
    name: "Revenue & Taxation",
    to: "/departments/revenue-taxation",
    icon: "💰",
    desc: "Property tax assessment, collection, online payment, NOC, name mutation, and revenue-related services.",
    color: "border-yellow-500",
    tag: "Revenue",
  },
  {
    name: "Sanitation Department",
    to: "/departments/sanitation",
    icon: "🧹",
    desc: "Solid waste management, door-to-door collection, street sweeping, drain cleaning, and community toilets.",
    color: "border-green-500",
    tag: "Sanitation",
  },
  {
    name: "Urban Planning",
    to: "/departments/urban-planning",
    icon: "🏙️",
    desc: "Smart City projects, building permissions, Jammu Master Plan 2032, and urban development initiatives.",
    color: "border-purple-500",
    tag: "Planning",
  },
  {
    name: "Water Supply Division",
    to: "/departments/water-supply",
    icon: "💧",
    desc: "Drinking water supply, sewerage, new connections, pipe maintenance, and water bill services.",
    color: "border-cyan-500",
    tag: "Water",
  },
  {
    name: "Horticulture Department",
    to: "/departments/horticulture",
    icon: "🌳",
    desc: "Parks, gardens, tree plantation, avenue greening, nurseries, and beautification of public spaces.",
    color: "border-emerald-500",
    tag: "Horticulture",
  },
];

export default function DepartmentsPage() {
  return (
    <SubpageTemplate
      title="Departments"
      breadcrumb={[{ name: "Departments" }]}
    >
      <div className="space-y-8">
        {/* Intro */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
            JMC Departments
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Jammu Municipal Corporation is organized into specialized departments, each responsible for a key
            aspect of city management and civic services. Select a department below to learn more about its
            functions, services, and contacts.
          </p>
        </div>

        {/* Department Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {departments.map((dept, i) => (
            <Link
              key={i}
              to={dept.to}
              className={`group bg-white rounded-xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all p-5 border-l-4 ${dept.color}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{dept.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-[#003366] text-sm group-hover:text-[#002244] transition-colors">{dept.name}</p>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full shrink-0">{dept.tag}</span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{dept.desc}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-[#FF6600] group-hover:gap-2 transition-all">
                    Learn more
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SubpageTemplate>
  );
}
