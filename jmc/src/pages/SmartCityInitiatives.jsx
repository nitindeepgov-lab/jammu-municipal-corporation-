import { Link } from "react-router-dom";
import SubpageTemplate from "../components/SubpageTemplate";

const initiatives = [
  {
    id: "junction-improvements",
    title:
      "REQUEST FOR PROPOSAL FOR ENGINEERING, PROCUREMENT AND CONSTRUCTION EPC CONTRACT FOR JUNCTION IMPROVEMENTS IN JAMMU CITY.",
    icon: "🛣️",
    url: "https://jktenders.gov.in/nicgep/app?component=%24DirectLink&page=FrontEndViewTender&service=direct&session=T&sp=SKyIDjX18kNjayj8%2Bpn3Eog%3D%3D",
  },
  {
    id: "smart-parking",
    title:
      "Install, operate, and maintain the IT based Smart Parking Management System for Jammu city.",
    icon: "🅿️",
    url: "https://jktenders.gov.in/nicgep/app?component=%24DirectLink&page=FrontEndViewTender&service=direct&session=T&sp=Sytme64FVZ8wSzZzecuZZRw%3D%3D",
  },
  {
    id: "smart-poles",
    title:
      "Turnkey project for implementation of Smart Poles in Jammu Smart City on PPP mode.",
    icon: "💡",
    url: "https://jktenders.gov.in/nicgep/app?component=%24DirectLink&page=FrontEndViewTender&service=direct&session=T&sp=Sytme64FVZ8wSzZzecuZZRw%3D%3D",
  },
  {
    id: "smart-payment",
    title:
      "Selection of Agency for implementation and operations of Jammu City Smart Payment System (City Smart Card, Mobile App and Portal) on PPP model is invited from bidders meeting the pre-qualification criteria as stated in the RFP document.",
    icon: "💳",
    url: "https://jktenders.gov.in/nicgep/app?component=%24DirectLink&page=FrontEndViewTender&service=direct&session=T&sp=Sb6IHG13Y5DKWsQMgzhS23w%3D%3D",
  },
  {
    id: "bicycle-sharing",
    title:
      "Engagement of agency for Procurement, Installation and Commissioning, Operation and Maintenance of Public Bicycle sharing system in Jammu city.",
    icon: "🚴",
    url: "https://jktenders.gov.in/nicgep/app?component=%24DirectLink&page=FrontEndViewTender&service=direct&session=T&sp=SwI7HUMTIjtpXf%2BzBFW0%2FkQ%3D%3D",
  },
  {
    id: "ad-panels",
    title:
      "Project for implementation of Ad Panels at Intersections and Junctions in Jammu Smart City.",
    icon: "📺",
    url: "https://jktenders.gov.in/nicgep/app?component=%24DirectLink&page=FrontEndViewTender&service=direct&session=T&sp=SFKLjJoiB4yyobubOEUBBjw%3D%3D",
  },
  {
    id: "smart-toilets",
    title:
      "Design, Supply, Installation, Testing, Commissioning, Operations and Maintenance of Smart Public Toilets in Jammu City through Public Private Partnership Mode.",
    icon: "🚽",
    url: "https://jktenders.gov.in/nicgep/app?component=%24DirectLink&page=FrontEndViewTender&service=direct&session=T&sp=SxrP0q%2B2r2%2BZ%2FVFCBq4bc8w%3D%3D",
  },
];

export default function SmartCityInitiatives() {
  return (
    <SubpageTemplate
      title="Smart City Initiatives"
      breadcrumb={[
        { name: "Smart City", to: "/smart-city" },
        { name: "Initiatives", to: null },
      ]}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Intro */}
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#FF6600]">
          <h2 className="text-2xl font-bold text-[#003366] mb-3">
            Smart City Portal Initiatives
          </h2>
          <p className="text-gray-700 text-md leading-relaxed">
            Jammu Smart City Mission encompasses multiple initiatives and
            projects aimed at transforming the city through technology,
            sustainability, and citizen-centric solutions. Below are the key
            initiatives and tender opportunities.
          </p>
        </div>

        {/* Initiatives List */}
        <div className="space-y-4">
          {initiatives.map((initiative) => (
            <a
              key={initiative.id}
              href={initiative.url || "#"}
              target={initiative.url ? "_blank" : undefined}
              rel={initiative.url ? "noopener noreferrer" : undefined}
              className="block bg-white rounded-lg shadow-sm p-5 hover:shadow-lg hover:bg-blue-50/30 transition-all border-l-4 border-transparent hover:border-[#FF6600]"
            >
              <div className="flex gap-4 items-start">
                <div className="text-2xl flex-shrink-0">{initiative.icon}</div>
                <p className="text-[#0066CC] text-md leading-relaxed font-light hover:font-normal transition-all">
                  {initiative.title}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
          <p className="text-gray-700 text-sm mb-4">
            For more information about these initiatives, tender documents, and
            participation guidelines, please visit the official Smart City
            portal or contact the Jammu Municipal Corporation office.
          </p>
          <Link
            to="/smart-city"
            className="inline-block bg-[#003366] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#004080] transition-colors"
          >
            ← Back to Smart City
          </Link>
        </div>
      </div>
    </SubpageTemplate>
  );
}
