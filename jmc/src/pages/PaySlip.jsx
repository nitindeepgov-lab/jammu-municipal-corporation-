import { useState } from "react";
import SubpageTemplate from "../components/SubpageTemplate";
import { Shield, Printer, ArrowLeft, RefreshCw, Receipt } from "lucide-react";

export default function PaySlip() {
  const [empCode, setEmpCode] = useState("");
  const [month, setMonth] = useState("April");
  const [year, setYear] = useState("2026");
  const [isLoading, setIsLoading] = useState(false);
  const [paySlipData, setPaySlipData] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!empCode.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
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

      setPaySlipData({
        empCode: empCode.toUpperCase(),
        name: "Sh. Rakesh Sharma",
        designation: "Assistant Executive Engineer (AEE)",
        department: "Engineering Division - IT & Works",
        gpfNumber: "JMC/GPF/EE-8422",
        pan: "ABCPS8422K",
        bankName: "Jammu & Kashmir Bank",
        accountNo: "0012010200045842",
        month,
        year,
        earnings: { basic, da, hra, ta, special, gross },
        deductions: { gpf, tax, profTax, health, deductions },
        net,
      });
      setIsLoading(false);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <SubpageTemplate
      title="Employee Pay Slip"
      breadcrumb={[
        { name: "Employee Corner", to: "/employee-corner" },
        { name: "Pay Slip", to: null },
      ]}
    >
      <div className="space-y-6">
        {!paySlipData ? (
          <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm max-w-xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#FF6600]">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-[#002B5E]">
                  Generate Monthly Pay Slip
                </h2>
                <p className="text-xs text-gray-500">
                  Enter employee details to retrieve and download monthly pay slips
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Month
                  </label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#002B5E] focus:bg-white transition-all font-semibold"
                  >
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Year
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#002B5E] focus:bg-white transition-all font-semibold"
                  >
                    {Array.from({ length: 12 }, (_, i) => 2026 - i).map((y) => (
                      <option key={y} value={y.toString()}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-xs font-bold text-white bg-[#002B5E] hover:bg-[#001D40] disabled:bg-slate-300 transition-all shadow-sm"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating Pay Slip...
                  </>
                ) : (
                  "Generate Pay Slip"
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Control Bar */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm print:hidden">
              <button
                onClick={() => setPaySlipData(null)}
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
                Print Pay Slip
              </button>
            </div>

            {/* Print Pay Slip layout */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-10 shadow-md max-w-4xl mx-auto space-y-6 relative overflow-hidden print:shadow-none print:border-none print:p-0">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-slate-300 pb-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#002B5E]/5 text-[#002B5E] rounded-xl flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-base font-black text-[#002B5E] tracking-wide uppercase">
                      Jammu Municipal Corporation
                    </h1>
                    <p className="text-[11px] font-semibold text-gray-500">
                      Town Hall, Jammu (J&K UT)
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black uppercase text-[#FF6600]">
                    Monthly Pay Slip
                  </div>
                  <div className="text-[11px] text-gray-500 font-bold">
                    For: {paySlipData.month} {paySlipData.year}
                  </div>
                </div>
              </div>

              {/* Employee Bio Table */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border border-slate-200 rounded-xl p-4 bg-slate-50/50 text-xs">
                <div>
                  <span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider block">Employee Name</span>
                  <span className="font-extrabold text-slate-800">{paySlipData.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider block">Employee ID</span>
                  <span className="font-extrabold text-slate-800">{paySlipData.empCode}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider block">Designation</span>
                  <span className="font-extrabold text-slate-800">{paySlipData.designation}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider block">Department</span>
                  <span className="font-extrabold text-slate-800">{paySlipData.department}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider block">GPF / NPS No</span>
                  <span className="font-extrabold text-slate-800">{paySlipData.gpfNumber}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider block">PAN ID</span>
                  <span className="font-extrabold text-slate-800">{paySlipData.pan}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider block">Bank Details</span>
                  <span className="font-extrabold text-slate-800">{paySlipData.bankName}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider block">Bank Account No</span>
                  <span className="font-extrabold text-slate-800">{paySlipData.accountNo}</span>
                </div>
              </div>

              {/* Financial Breakdown Grid */}
              <div className="grid md:grid-cols-2 gap-6 text-xs">
                {/* Earnings */}
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200">
                        <th className="px-4 py-2 text-left font-black uppercase text-slate-700 tracking-wider text-[10px]">Earnings</th>
                        <th className="px-4 py-2 text-right font-black uppercase text-slate-700 tracking-wider text-[10px]">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="px-4 py-2.5 flex justify-between">
                        <td className="text-slate-600 font-medium">Basic Salary</td>
                        <td className="font-bold text-slate-800">₹{paySlipData.earnings.basic.toLocaleString()}</td>
                      </tr>
                      <tr className="px-4 py-2.5 flex justify-between">
                        <td className="text-slate-600 font-medium">Dearness Allowance (DA)</td>
                        <td className="font-bold text-slate-800">₹{paySlipData.earnings.da.toLocaleString()}</td>
                      </tr>
                      <tr className="px-4 py-2.5 flex justify-between">
                        <td className="text-slate-600 font-medium">House Rent Allowance (HRA)</td>
                        <td className="font-bold text-slate-800">₹{paySlipData.earnings.hra.toLocaleString()}</td>
                      </tr>
                      <tr className="px-4 py-2.5 flex justify-between">
                        <td className="text-slate-600 font-medium">Travel Allowance (TA)</td>
                        <td className="font-bold text-slate-800">₹{paySlipData.earnings.ta.toLocaleString()}</td>
                      </tr>
                      <tr className="px-4 py-2.5 flex justify-between">
                        <td className="text-slate-600 font-medium">Special Pay</td>
                        <td className="font-bold text-slate-800">₹{paySlipData.earnings.special.toLocaleString()}</td>
                      </tr>
                      <tr className="bg-slate-50 px-4 py-3 flex justify-between border-t border-slate-200 font-black text-slate-800">
                        <td>Gross Earnings</td>
                        <td>₹{paySlipData.earnings.gross.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Deductions */}
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200">
                        <th className="px-4 py-2 text-left font-black uppercase text-slate-700 tracking-wider text-[10px]">Deductions</th>
                        <th className="px-4 py-2 text-right font-black uppercase text-slate-700 tracking-wider text-[10px]">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="px-4 py-2.5 flex justify-between">
                        <td className="text-slate-600 font-medium">GPF / NPS Contribution</td>
                        <td className="font-bold text-slate-800">₹{paySlipData.deductions.gpf.toLocaleString()}</td>
                      </tr>
                      <tr className="px-4 py-2.5 flex justify-between">
                        <td className="text-slate-600 font-medium">Income Tax Deducted (TDS)</td>
                        <td className="font-bold text-slate-800">₹{paySlipData.deductions.tax.toLocaleString()}</td>
                      </tr>
                      <tr className="px-4 py-2.5 flex justify-between">
                        <td className="text-slate-600 font-medium">Professional Tax</td>
                        <td className="font-bold text-slate-800">₹{paySlipData.deductions.profTax.toLocaleString()}</td>
                      </tr>
                      <tr className="px-4 py-2.5 flex justify-between">
                        <td className="text-slate-600 font-medium">State Health Insurance</td>
                        <td className="font-bold text-slate-800">₹{paySlipData.deductions.health.toLocaleString()}</td>
                      </tr>
                      <tr className="bg-slate-50 px-4 py-3 flex justify-between border-t border-slate-200 font-black text-slate-800">
                        <td>Total Deductions</td>
                        <td>₹{paySlipData.deductions.deductions.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Net Salary Row */}
              <div className="bg-[#002B5E] text-white rounded-xl p-4 flex justify-between items-center shadow-sm">
                <div>
                  <h3 className="font-black uppercase tracking-wider text-[10px] text-orange-400">
                    Net Take-Home Salary
                  </h3>
                  <p className="text-[10px] text-slate-300 font-semibold mt-0.5">
                    Disbursed directly into the Bank Account
                  </p>
                </div>
                <div className="text-xl font-black">
                  ₹{paySlipData.net.toLocaleString()}
                </div>
              </div>

              {/* Stamp and sign */}
              <div className="pt-6 flex justify-between items-end border-t border-slate-200">
                <span className="text-[9px] text-gray-400 font-semibold">
                  This is a computer-generated JMC Pay Slip. No physical signature is required.
                </span>
                <div className="text-center w-36 space-y-1">
                  <div className="h-6" />
                  <div className="border-t border-slate-900 pt-1 text-[10px] font-black uppercase text-slate-950">
                    Accounts Officer
                  </div>
                  <div className="text-[8px] text-slate-400 font-bold">
                    JMC Town Hall
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
