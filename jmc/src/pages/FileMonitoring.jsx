import { useState } from "react";
import SubpageTemplate from "../components/SubpageTemplate";
import { Eye, Search, FileText, CheckCircle2, Circle, AlertCircle, RefreshCw } from "lucide-react";

export default function FileMonitoring() {
  const [fileNumber, setFileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!fileNumber.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      // Clean and analyze the input to return realistic dummy tracking
      const num = fileNumber.trim().toUpperCase();
      
      const stages = [
        {
          stageName: "File Drafted & Initiated",
          department: "IT & E-Governance Cell",
          officer: "Sh. Ankush Kapoor (CIO)",
          status: "completed",
          date: "12/05/2026",
          remarks: "File created regarding upgrade of JMC citizen portal infrastructure.",
        },
        {
          stageName: "Budget Feasibility Check",
          department: "Finance & Accounts Wing",
          officer: "Smt. Neha Gupta (CAO)",
          status: "completed",
          date: "18/05/2026",
          remarks: "Verified under FY 2026-27 IT Infrastructure head. Funds earmarked.",
        },
        {
          stageName: "Administrative Scrutiny",
          department: "Establishment Section",
          officer: "Sh. Devender Singh (JC Adm)",
          status: "completed",
          date: "25/05/2026",
          remarks: "Recommended and forwarded to Legal for review of terms.",
        },
        {
          stageName: "Legal NOC Clearance",
          department: "Legal Cell JMC",
          officer: "Adv. Rahul Sharma (Legal Advisor)",
          status: "in-progress",
          date: "Active",
          remarks: "Under review. Checking draft service level agreement clauses.",
        },
        {
          stageName: "Final Administrative Sanction",
          department: "Commissioner's Desk",
          officer: "Municipal Commissioner",
          status: "pending",
          date: "—",
          remarks: "Awaiting legal clearance before signature.",
        }
      ];

      setTrackingResult({
        fileNumber: num,
        subject: "Procurement of Servers and Networking Equipment for Town Hall IT Cell",
        currentStatus: "Under Legal Review",
        lastUpdated: "25/05/2026",
        stages
      });
      setIsLoading(false);
    }, 1200);
  };

  return (
    <SubpageTemplate
      title="File Monitoring System"
      breadcrumb={[
        { name: "Employee Corner", to: "/employee-corner" },
        { name: "File Monitoring", to: null },
      ]}
    >
      <div className="space-y-6">
        {/* Tracking Input Card */}
        <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm max-w-xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#FF6600]">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#002B5E]">
                Track Active File Status
              </h2>
              <p className="text-xs text-gray-500">
                Enter your file reference number to see timeline movements
              </p>
            </div>
          </div>

          <form onSubmit={handleTrack} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                File Tracking Number
              </label>
              <input
                type="text"
                required
                placeholder="e.g. JMC/2026/EST/8422"
                value={fileNumber}
                onChange={(e) => setFileNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#002B5E] focus:bg-white transition-all font-semibold"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-xs font-bold text-white bg-[#002B5E] hover:bg-[#001D40] disabled:bg-slate-300 transition-all shadow-sm cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Searching File database...
                </>
              ) : (
                "Search & Track File"
              )}
            </button>
          </form>
        </div>

        {/* Tracking Details Results */}
        {trackingResult && (
          <div className="grid lg:grid-cols-3 gap-6 items-start max-w-5xl mx-auto">
            {/* Subject Summary Card */}
            <div className="bg-[#002B5E] text-white rounded-xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-400 shrink-0" />
                <h3 className="text-xs font-black uppercase tracking-wider text-orange-400">
                  File Summary Details
                </h3>
              </div>

              <div className="space-y-3 text-xs leading-normal">
                <div>
                  <span className="text-slate-300 font-bold uppercase text-[9px] tracking-wider block">File Number</span>
                  <span className="font-extrabold text-sm text-white">{trackingResult.fileNumber}</span>
                </div>

                <div>
                  <span className="text-slate-300 font-bold uppercase text-[9px] tracking-wider block">File Subject</span>
                  <p className="font-bold text-white mt-0.5">{trackingResult.subject}</p>
                </div>

                <div className="border-t border-white/10 pt-3">
                  <span className="text-slate-300 font-bold uppercase text-[9px] tracking-wider block">Current Status</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-orange-500 text-white font-extrabold mt-1 text-[10px]">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {trackingResult.currentStatus}
                  </span>
                </div>

                <div className="text-[10px] text-slate-300 font-semibold pt-2">
                  Last Movement Logged: {trackingResult.lastUpdated}
                </div>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
              <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider mb-6 border-b border-slate-50 pb-2">
                Movement Timeline Logs
              </h3>

              <div className="relative border-l-2 border-slate-100 pl-6 ml-3 space-y-6">
                {trackingResult.stages.map((stage, idx) => {
                  const isCompleted = stage.status === "completed";
                  const isInProgress = stage.status === "in-progress";

                  return (
                    <div key={idx} className="relative">
                      {/* Stepper Bullet Node */}
                      <span className="absolute -left-[31px] top-0 bg-white rounded-full p-1 select-none">
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 bg-white" />
                        ) : isInProgress ? (
                          <span className="relative flex h-5 w-5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <AlertCircle className="relative inline-flex rounded-full w-5 h-5 text-orange-500 bg-white" />
                          </span>
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300 bg-white" />
                        )}
                      </span>

                      {/* Content */}
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className={`text-xs font-extrabold ${isCompleted ? "text-slate-900" : isInProgress ? "text-[#FF6600]" : "text-gray-400"}`}>
                            {stage.stageName}
                          </h4>
                          <span className="text-[10px] text-gray-400 font-medium">
                            {stage.date}
                          </span>
                        </div>

                        <p className="text-[10px] text-[#002B5E] font-bold">
                          Dept: {stage.department} | Handle By: {stage.officer}
                        </p>

                        <p className="text-[11px] text-gray-500 leading-relaxed font-semibold">
                          Remarks: {stage.remarks}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </SubpageTemplate>
  );
}
