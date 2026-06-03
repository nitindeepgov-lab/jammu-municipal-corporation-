import { useState } from "react";
import SubpageTemplate from "../components/SubpageTemplate";
import { Shield, Printer, ArrowLeft, RefreshCw, FileText } from "lucide-react";

export default function SalaryCertificate() {
  const [empCode, setEmpCode] = useState("");
  const [month, setMonth] = useState("April");
  const [year, setYear] = useState("2026");
  const [isLoading, setIsLoading] = useState(false);
  const [certificateData, setCertificateData] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!empCode.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      // Generate realistic mock data based on employee code
      const basic = 47600;
      const da = Math.round(basic * 0.46); // 46% DA
      const hra = Math.round(basic * 0.18); // 18% HRA
      const ta = 3600;
      const special = 2000;
      const gross = basic + da + hra + ta + special;

      const gpf = Math.round(basic * 0.1); // 10% GPF
      const tax = 2500;
      const profTax = 200;
      const health = 350;
      const deductions = gpf + tax + profTax + health;
      const net = gross - deductions;

      setCertificateData({
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
      title="Salary Certificate"
      breadcrumb={[
        { name: "Employee Corner", to: "/employee-corner" },
        { name: "Salary Certificate", to: null },
      ]}
    >
      <div className="space-y-6">
        {!certificateData ? (
          <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm max-w-xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#FF6600]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-[#002B5E]">
                  Generate Salary Certificate
                </h2>
                <p className="text-xs text-gray-500">
                  Select employee credentials and year to download your certificate
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
                    Generating Certificate...
                  </>
                ) : (
                  "Generate Certificate"
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Control Bar */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm print:hidden">
              <button
                onClick={() => setCertificateData(null)}
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
                Print Certificate
              </button>
            </div>

            {/* Print Certificate layout */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 shadow-md max-w-4xl mx-auto space-y-8 relative overflow-hidden print:shadow-none print:border-none print:p-0">
              {/* Watermark logo accent */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center select-none">
                <Shield className="w-96 h-96" />
              </div>

              {/* JMC Official Header */}
              <div className="text-center border-b-2 border-slate-900 pb-6 relative z-10">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-wide">
                  Jammu Municipal Corporation
                </h1>
                <p className="text-xs sm:text-sm font-bold text-slate-700 tracking-wider mt-1">
                  Town Hall, Jammu, Jammu & Kashmir (UT) - 180001
                </p>
                <p className="text-xs font-bold text-slate-500 uppercase mt-0.5">
                  OFFICE OF THE CHIEF ACCOUNTS OFFICER
                </p>
                <div className="mt-4 inline-block bg-slate-100 px-4 py-1.5 rounded text-xs font-black uppercase text-slate-800 tracking-widest border border-slate-200">
                  Salary Certificate
                </div>
              </div>

              {/* Certificate content statement */}
              <div className="text-sm text-slate-800 leading-relaxed space-y-4">
                <p>
                  Certified that <span className="font-extrabold text-slate-950">{certificateData.name}</span>, holding the designation of <span className="font-extrabold text-slate-950">{certificateData.designation}</span>, is a permanent employee of the <span className="font-bold">Jammu Municipal Corporation</span> in the department of <span className="font-semibold">{certificateData.department}</span>.
                </p>
                <p>
                  His CPIS / Employee ID is <span className="font-extrabold text-slate-950">{certificateData.empCode}</span> and his GPF Account number is <span className="font-semibold">{certificateData.gpfNumber}</span>. The salary details for the month of <span className="font-bold">{certificateData.month} {certificateData.year}</span> drawn from this corporation are as follows:
                </p>
              </div>

              {/* Financial Statement Tables */}
              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Earnings Table */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                    <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                      Earnings & Allowances
                    </h3>
                  </div>
                  <table className="w-full text-xs">
                    <tbody className="divide-y divide-slate-100">
                      <tr className="px-4 py-2.5 flex justify-between">
                        <td className="font-medium text-slate-600">Basic Pay</td>
                        <td className="font-bold text-slate-900">₹{certificateData.earnings.basic.toLocaleString()}</td>
                      </tr>
                      <tr className="px-4 py-2.5 flex justify-between">
                        <td className="font-medium text-slate-600">Dearness Allowance (DA)</td>
                        <td className="font-bold text-slate-900">₹{certificateData.earnings.da.toLocaleString()}</td>
                      </tr>
                      <tr className="px-4 py-2.5 flex justify-between">
                        <td className="font-medium text-slate-600">House Rent Allowance (HRA)</td>
                        <td className="font-bold text-slate-900">₹{certificateData.earnings.hra.toLocaleString()}</td>
                      </tr>
                      <tr className="px-4 py-2.5 flex justify-between">
                        <td className="font-medium text-slate-600">Travel Allowance (TA)</td>
                        <td className="font-bold text-slate-900">₹{certificateData.earnings.ta.toLocaleString()}</td>
                      </tr>
                      <tr className="px-4 py-2.5 flex justify-between">
                        <td className="font-medium text-slate-600">Special Pay</td>
                        <td className="font-bold text-slate-900">₹{certificateData.earnings.special.toLocaleString()}</td>
                      </tr>
                      <tr className="bg-slate-100 px-4 py-3 flex justify-between border-t border-slate-200 font-extrabold text-slate-900">
                        <td>Gross Salary</td>
                        <td>₹{certificateData.earnings.gross.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Deductions Table */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                    <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                      Deductions & Recoveries
                    </h3>
                  </div>
                  <table className="w-full text-xs">
                    <tbody className="divide-y divide-slate-100">
                      <tr className="px-4 py-2.5 flex justify-between">
                        <td className="font-medium text-slate-600">GPF / NPS Contribution</td>
                        <td className="font-bold text-slate-900">₹{certificateData.deductions.gpf.toLocaleString()}</td>
                      </tr>
                      <tr className="px-4 py-2.5 flex justify-between">
                        <td className="font-medium text-slate-600">Income Tax (TDS)</td>
                        <td className="font-bold text-slate-900">₹{certificateData.deductions.tax.toLocaleString()}</td>
                      </tr>
                      <tr className="px-4 py-2.5 flex justify-between">
                        <td className="font-medium text-slate-600">Professional Tax</td>
                        <td className="font-bold text-slate-900">₹{certificateData.deductions.profTax.toLocaleString()}</td>
                      </tr>
                      <tr className="px-4 py-2.5 flex justify-between">
                        <td className="font-medium text-slate-600">J&K Health Insurance Scheme</td>
                        <td className="font-bold text-slate-900">₹{certificateData.deductions.health.toLocaleString()}</td>
                      </tr>
                      <tr className="bg-slate-100 px-4 py-3 flex justify-between border-t border-slate-200 font-extrabold text-slate-900">
                        <td>Total Deductions</td>
                        <td>₹{certificateData.deductions.deductions.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Net Pay Card */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800">
                    Net Take-Home Salary
                  </h4>
                  <p className="text-xs text-emerald-600 font-semibold mt-1">
                    Credited to {certificateData.bankName} (A/C: {certificateData.accountNo})
                  </p>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-950">
                  ₹{certificateData.net.toLocaleString()}
                </div>
              </div>

              {/* Signature Section */}
              <div className="pt-10 flex justify-between items-end border-t border-slate-200">
                <div className="text-xs font-semibold text-slate-500">
                  <p>Certificate Generated on: {new Date().toLocaleDateString()}</p>
                  <p className="mt-1 select-none">System ID: JMC-SEC-SYS-8422</p>
                </div>
                <div className="text-center w-48 space-y-1">
                  <div className="h-10 select-none" /> {/* Space for signature stamp */}
                  <div className="border-t border-slate-900 pt-1 text-xs font-black text-slate-950 uppercase tracking-wide">
                    Chief Accounts Officer
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold">
                    Jammu Municipal Corporation
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
