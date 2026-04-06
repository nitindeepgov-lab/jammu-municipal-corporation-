import SubpageTemplate from "../components/SubpageTemplate";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const egovServices = [
  {
    name: "Online Property Tax Payment",
    href: "/pay-online",
    desc: "Pay property tax dues online quickly and securely.",
  },
  {
    name: "Online Grievance Redressal",
    href: "https://myjammu.in/grievance/GrievanceDepartment",
    desc: "Register and track your complaints via the MyJammu portal.",
  },
  {
    name: "Water Tanker Booking",
    href: "https://myjammu.in/",
    desc: "Book a water tanker online through the MyJammu service portal.",
  },
  {
    name: "Building Plan Permission",
    href: "https://jkhuddobps.in/",
    desc: "Apply for building plan sanction via HUDD BPS portal.",
  },
  {
    name: "Birth & Death Certificate",
    href: "https://serviceonline.gov.in/jammu/",
    desc: "Apply via JAKSMAC e-service portal.",
  },
  {
    name: "Online NOC / Trade License",
    href: "https://serviceonline.gov.in/jammu/",
    desc: "Apply / renew trade license and obtain NOC online.",
  },
  {
    name: "Rehri License",
    href: "https://serviceonline.gov.in/jammu/",
    desc: "Apply for Rehri (street vendor) license via JAKSMAC portal.",
  },
  {
    name: "Pet Dog Registration",
    href: "https://serviceonline.gov.in/jammu/",
    desc: "Register your pet dog with JMC online.",
  },
  {
    name: "Pay Rent – Municipal Shop/Flat",
    href: "https://jmc.jk.gov.in/OtherFee.html",
    desc: "Pay rent for JMC municipal shops and residential flats online.",
  },
  {
    name: "Online User Charges",
    href: "https://jmc.jk.gov.in/SanitationFee.html",
    desc: "Pay sanitation / user charges online.",
  },
  {
    name: "Sewerage Connection Verification",
    href: "https://jmc.jk.gov.in/sewconnectverify.html",
    desc: "Verify sewerage connection permission status.",
  },
  {
    name: "Panjtirthi Slot Booking",
    href: "https://jmc.jk.gov.in/index-2.html",
    desc: "Book a slot at Panjtirthi facility online.",
  },
  {
    name: "E-Tendering",
    href: "https://jktenders.gov.in/",
    desc: "View and participate in JMC tenders on J&K e-procurement portal.",
  },
  {
    name: "E-Newsletter",
    href: "https://jmc.jk.gov.in/newsletter.aspx",
    desc: "Download JMC e-newsletters and publications.",
  },
  {
    name: "Feedback & Suggestions",
    href: "https://jmc.jk.gov.in/feedback.aspx",
    desc: "Share your feedback with JMC.",
  },
];

export default function EGov() {
  return (
    <SubpageTemplate
      title="E-Governance"
      breadcrumb={[{ name: "E-Governance" }]}
    >
      <div className="max-w-5xl mx-auto space-y-12 pb-6">
        {/* Header Section */}
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-[#002B5E] tracking-tight mb-4">
            Digital Services for Citizens
          </h2>
          <p className="text-[15px] text-gray-600 leading-relaxed mb-4">
            Jammu Municipal Corporation has embraced e-governance to deliver
            faster, more transparent, and citizen-friendly civic services.
            Through technology-enabled platforms, citizens can now access a wide
            range of JMC services from any device, anytime, anywhere.
          </p>
          <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
            Aligned with the Government of India's Digital India programme and
            the J&K Government's IT policy, our initiatives aim to reduce
            paperwork, increase transparency, and improve accountability in
            civic administration.
          </p>
          <a
            href="https://jmc.jk.gov.in/egov.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#FF6600] hover:text-[#e55a00] transition-colors"
          >
            Visit Official E-Gov Portal <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Services Grid */}
        <div>
          <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-6">
            Available E-Services
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {egovServices.map((svc, idx) => (
              <a
                key={idx}
                href={svc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col p-6 bg-white border border-gray-200 rounded-2xl hover:border-[#002B5E]/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex-1 mb-2">
                  <h4 className="text-[15px] font-bold text-gray-900 group-hover:text-[#002B5E] transition-colors pr-6 mb-2">
                    {svc.name}
                  </h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    {svc.desc}
                  </p>
                </div>

                <div className="absolute top-6 right-6 text-gray-300 group-hover:text-[#FF6600] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>

                {/* Minimal tracking line */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-[#FF6600] w-0 group-hover:w-full transition-all duration-500 ease-out" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer Banner */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-[15px] font-bold text-gray-900 mb-1.5">
              Digital India Initiative
            </h3>
            <p className="text-[13.5px] text-gray-600 leading-relaxed">
              JMC is proud to be part of India's Digital India programme, making
              governance more accessible and transparent.
            </p>
          </div>
          <a
            href="https://www.digitalindia.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-[13.5px] font-bold rounded-xl hover:border-gray-400 hover:text-gray-900 hover:shadow-sm transition-all"
          >
            <ExternalLink className="w-4 h-4 text-gray-400" />
            Digital India
          </a>
        </div>
      </div>
    </SubpageTemplate>
  );
}
