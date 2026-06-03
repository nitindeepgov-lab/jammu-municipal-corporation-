import { useState } from "react";
import SubpageTemplate from "../components/SubpageTemplate";
import { Shield, Printer, ArrowLeft, RefreshCw, FileText } from "lucide-react";

export default function PayStatement() {
  const [empCode, setEmpCode] = useState("");
  const [finYear, setFinYear] = useState("2025-2026");
  const [isLoading, setIsLoading] = useState(false);
  const [statementData, setStatementData] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!empCode.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      // Create mock monthly details
      const months = [
        "April", "May", "June", "July", "August", "September",
        "October", "November", "December", "January", "February", "March"
      ];
      
      const basic = 47600;
      const da = Math.round(basic * 0.46);
      const hra = Math.round(basic * 0.18);
      const ta = 3600;
      const special = 2000;
      const gross = basic + da + hra + ta + special;

      const gpf = Math.round(basic * 0.1);
      const tax = 2500;
      const profTax = 200;
      const health = 350;
      const deductions = gpf + tax + profTax + health;
      const net = gross - deductions;

      const monthlyDetails = months.map(m => ({
        month: m,
        basic,
        da,
        hra,
        gross,
        deductions,
        net
      }));

      const totals = {
        basic: basic * 12,
        da: da * 12,
        hra: hra * 12,
        gross: gross * 12,
        deductions: deductions * 12,
        net: net * 12
      };

      setStatementData({
        empCode: empCode.toUpperCase(),
        name: "Sh. Rakesh Sharma",
        designation: "Assistant Executive Engineer (AEE)",
        department: "Engineering Division - IT & Works",
        gpfNumber: "JMC/GPF/EE-8422",
        pan: "ABCPS8422K",
        finYear,
        monthlyDetails,
        totals
      });
      setIsLoading(false);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <SubpageTemplate
      title="Annual Pay Statement"
      breadcrumb={[
        { name: "Employee Corner", to: "/employee-corner" },
        { name: "Pay Statement", to: null },
      ]}
    >
      <div className="space-y-6">
        {!statementData ? (
          <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm max-w-xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#FF6600]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-[#002B5E]">
                  Generate Annual Pay Statement
                </h2>
                <p className="text-xs text-gray-500">
                  Generate annual salary breakdown and TDS projections for tax assessment
                </p>
              </div>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Employee Code / CPIS ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. JMC102345"
                  value={empCode}
                  onChange={(e) => setEmpCode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#002B5E] focus:bg-white transition-all font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Financial Year
                </label>
                <select
                  value={finYear}
                  onChange={(e) => setFinYear(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#002B5E] focus:bg-white transition-all font-semibold"
                >
                  <option value="2025-2026">2025 - 2026 (Current)</option>
                  <option value="2024-2025">2024 - 2025</option>
                  <option value="2023-2024">2023 - 2024</option>
                  <option value="2022-2023">2022 - 2023</option>
                  <option value="2021-2022">2021 - 2022</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-xs font-bold text-white bg-[#002B5E] hover:bg-[#001D40] disabled:bg-slate-300 transition-all shadow-sm"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating Statement...
                  </>
                ) : (
                  "Generate Statement"
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Control Bar */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm print:hidden">
              <button
                onClick={() => setStatementData(null)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Form
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#FF6600] hover:bg-[#e55b00] rounded-lg transition-all shadow-sm"
              >
                <Printer className="w-4 h-4" />
                Print Statement
              </button>
            </div>

            {/* Print Layout */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-10 shadow-md max-w-4xl mx-auto space-y-6 relative overflow-hidden print:shadow-none print:border-none print:p-0">
              {/* Header */}
              <div className="border-b border-slate-300 pb-4 text-center">
                <h1 className="text-lg font-black text-[#002B5E] tracking-wide uppercase">
                  Jammu Municipal Corporation
                </h1>
                <p className="text-xs text-gray-500 font-bold">
                  Annual Salary Statement (Financial Year: {statementData.finYear})
                </p>
              </div>

              {/* Bio Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border border-slate-200 rounded-xl p-4 bg-slate-50/50 text-xs">
                <div>
                  <span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider block">Employee Name</span>
                  <span className="font-extrabold text-slate-800">{statementData.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider block">Employee Code</span>
                  <span className="font-extrabold text-slate-800">{statementData.empCode}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider block">Designation</span>
                  <span className="font-extrabold text-slate-800">{statementData.designation}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider block">Department</span>
                  <span className="font-extrabold text-slate-800">{statementData.department}</span>
                </div>
              </div>

              {/* Statement Table */}
              <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-sm">
                <table className="w-full text-xs text-left min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 font-black uppercase text-slate-700 text-[10px] tracking-wider">
                      <th className="px-4 py-2.5">Month</th>
                      <th className="px-4 py-2.5">Basic Pay</th>
                      <th className="px-4 py-2.5">DA</th>
                      <th className="px-4 py-2.5">HRA</th>
                      <th className="px-4 py-2.5">Gross Pay</th>
                      <th className="px-4 py-2.5">Total Deduct</th>
                      <th className="px-4 py-2.5">Net Pay</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {statementData.monthlyDetails.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 text-slate-700">
                        <td className="px-4 py-2.5 font-bold text-slate-900">{row.month}</td>
                        <td className="px-4 py-2.5">₹{row.basic.toLocaleString()}</td>
                        <td className="px-4 py-2.5">₹{row.da.toLocaleString()}</td>
                        <td className="px-4 py-2.5">₹{row.hra.toLocaleString()}</td>
                        <td className="px-4 py-2.5 font-bold text-slate-900">₹{row.gross.toLocaleString()}</td>
                        <td className="px-4 py-2.5 text-rose-600 font-bold">₹{row.deductions.toLocaleString()}</td>
                        <td className="px-4 py-2.5 text-emerald-700 font-bold">₹{row.net.toLocaleString()}</td>
                      </tr>
                    ))}
                    {/* Totals Row */}
                    <tr className="bg-slate-50 border-t border-slate-200 font-extrabold text-slate-900 text-[11px] tracking-wide">
                      <td className="px-4 py-3 uppercase">Total (FY)</td>
                      <td className="px-4 py-3">₹{statementData.totals.basic.toLocaleString()}</td>
                      <td className="px-4 py-3">₹{statementData.totals.da.toLocaleString()}</td>
                      <td className="px-4 py-3">₹{statementData.totals.hra.toLocaleString()}</td>
                      <td className="px-4 py-3">₹{statementData.totals.gross.toLocaleString()}</td>
                      <td className="px-4 py-3 text-rose-700">₹{statementData.totals.deductions.toLocaleString()}</td>
                      <td className="px-4 py-3 text-emerald-800">₹{statementData.totals.net.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Tax projection warning banner */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-[11px] text-gray-600 leading-relaxed font-semibold">
                Note: This statement lists actual payments compiled by the JMC Accounts Section and serves as a provisional statement for tax computations under Section 192 of the Income Tax Act. For final filing, please refer to Form 16 issued by the DDO.
              </div>

              {/* Footer */}
              <div className="pt-6 flex justify-between items-end border-t border-slate-200">
                <span className="text-[9px] text-gray-400 font-semibold">
                  Statement compiled on: {new Date().toLocaleDateString()} | System Reference: CAO-STMT-FY-8422
                </span>
                <div className="text-center w-36 space-y-1">
                  <div className="h-6" />
                  <div className="border-t border-slate-900 pt-1 text-[10px] font-black uppercase text-slate-950">
                    Accounts Officer
                  </div>
                  <div className="text-[8px] text-slate-400 font-bold">
                    JMC Accounts Wing
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SubpageTemplate>
  );
}
