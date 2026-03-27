import SubpageTemplate from "../components/SubpageTemplate";

const STRAPI_BASE_URL = (
  import.meta.env.VITE_STRAPI_URL || "http://localhost:1338"
).replace(/\/$/, "");
const CMS_RTI_BASE = `${STRAPI_BASE_URL}/uploads/rti`;

const sectionItems = [
  {
    id: 1,
    title: "Municipal Corporation Act, 2000.",
    url: `${CMS_RTI_BASE}/municipal-corporation-act-2000.pdf`,
  },
  { id: 2, title: "JMC Bye Laws", url: `${CMS_RTI_BASE}/jmc-bye-laws.pdf` },
  {
    id: 3,
    title: "Jammu Master Plan (Revised)",
    url: `${CMS_RTI_BASE}/jammu-master-plan-revised.pdf`,
  },
  {
    id: 4,
    title: "Birth and Death Act",
    url: `${CMS_RTI_BASE}/birth-and-death-act.pdf`,
  },
  {
    id: 5,
    title: "J&K Control of Building Operations Act",
    url: `${CMS_RTI_BASE}/jk-control-of-building-operations-act.pdf`,
  },
  {
    id: 6,
    title: "J&K RTI Act 2009",
    url: `${CMS_RTI_BASE}/jk-rti-act-2009.pdf`,
  },
  {
    id: 7,
    title: "J&K RTI Rules 2010",
    url: `${CMS_RTI_BASE}/jk-rti-rules-2010.pdf`,
  },
  {
    id: 8,
    title: "J&K RTI Rules 2012",
    url: `${CMS_RTI_BASE}/jk-rti-rules-2012.pdf`,
  },
];

export default function RTISection4Part2() {
  return (
    <SubpageTemplate
      title="RTI Section 4(1)(b)(iv-vi)"
      breadcrumb={[{ name: "RTI", to: "/rti" }, { name: "4(1)(b)(iv-vi)" }]}
    >
      <div className="space-y-5">
        <div className="bg-white rounded shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-[#003366] border-b-2 border-[#FF6600] pb-2 mb-4 inline-block">
            Norms, Rules and Manuals
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            This section contains the rules, regulations, instructions, manuals,
            and records used by Jammu Municipal Corporation for discharge of its
            functions under Section 4(1)(b)(iv-vi) of the RTI Act.
          </p>
        </div>

        <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#003366] px-4 py-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
              Disclosure Documents
            </h3>
          </div>

          <div className="divide-y divide-gray-100">
            {sectionItems.map((item) => {
              return (
                <div
                  key={item.id}
                  className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-gray-50"
                >
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold text-[#003366] mr-2">
                      ({item.id})
                    </span>
                    {item.title}
                  </p>

                  <a
                    href={item.url}
                    className="inline-flex items-center text-xs bg-[#003366] hover:bg-[#004080] text-white px-3 py-1.5 rounded transition-colors"
                  >
                    View
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SubpageTemplate>
  );
}
