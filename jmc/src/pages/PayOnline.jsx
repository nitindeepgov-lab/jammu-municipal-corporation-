import { useState, useRef, useCallback } from "react";
import { FaFileAlt } from "react-icons/fa";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import SubpageTemplate from "../components/SubpageTemplate";
import { STRAPI_URL } from "../config/api";
import { generateReceiptPDF } from "../utils/generateReceipt";

/* ═══════════════════════════════════════════════════════
   Payment Categories
   ═══════════════════════════════════════════════════════ */
const paymentOptions = [
  {
    id: "tender",
    name: "Tender Fee",
    desc: "Pay tender document and processing charges",
    feeType: "TENDER_FEE",
    icon: FaFileAlt,
    accentFrom: "#f97316",
    accentTo: "#f59e0b",
    fields: [
      {
        id: "name",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your full name",
        required: true,
        half: true,
      },
      {
        id: "parentage",
        label: "Parentage",
        type: "text",
        placeholder: "S/o, D/o, W/o",
        required: true,
        half: true,
      },
      {
        id: "mobile",
        label: "Mobile Number",
        type: "tel",
        placeholder: "10-digit mobile number",
        required: true,
        half: true,
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "your@email.com",
        half: true,
      },
      {
        id: "address",
        label: "Address",
        type: "textarea",
        placeholder: "Enter your full address",
      },
      {
        id: "nitTenderNo",
        label: "NIT / Tender No.",
        type: "text",
        placeholder: "e.g. NIT-2025/001",
        required: true,
        half: true,
      },
      {
        id: "nitTenderDate",
        label: "NIT / Tender Date",
        type: "date",
        required: true,
        half: true,
      },
      {
        id: "nitTenderDetails",
        label: "Tender Details",
        type: "textarea",
        placeholder: "Brief description of the tender",
      },
      {
        id: "amount",
        label: "Amount",
        type: "number",
        placeholder: "₹ 0.00",
        required: true,
        half: true,
      },
    ],
  },
  {
    id: "other",
    name: "Other Fee",
    desc: "Pay miscellaneous JMC dues and charges",
    feeType: "OTHER_FEE",
    icon: RiMoneyRupeeCircleLine,
    accentFrom: "#8b5cf6",
    accentTo: "#6366f1",
    fields: [
      {
        id: "dept",
        label: "Department",
        type: "select",
        options: [
          "Select Department",
          "Health Section",
          "Veterinary Services",
          "Transport Section",
          "Khilafwarzi Section",
          "Revenue Section",
          "Miscellaneous",
          "Building Permission",
        ],
        required: true,
        half: true,
      },
      {
        id: "feeType",
        label: "Type of Fee",
        type: "text",
        placeholder: "e.g. License Renewal",
        required: true,
        half: true,
      },
      {
        id: "payDetails",
        label: "Payment Details",
        type: "text",
        placeholder: "Brief description",
        required: true,
      },
      {
        id: "location",
        label: "Zone",
        type: "select",
        options: [
          "Select Zone",
          "Zone A",
          "Zone B",
          "Zone C",
          "Zone D",
          "Zone E",
        ],
        required: true,
        half: true,
      },
      {
        id: "name",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your full name",
        required: true,
        half: true,
      },
      {
        id: "mobile",
        label: "Mobile Number",
        type: "tel",
        placeholder: "10-digit mobile number",
        required: true,
        half: true,
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "your@email.com",
        half: true,
      },
      {
        id: "address",
        label: "Address",
        type: "textarea",
        placeholder: "Enter your full address",
        required: true,
      },
      {
        id: "amount",
        label: "Amount",
        type: "number",
        placeholder: "₹ 0.00",
        required: true,
        half: true,
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   Input Component — Clean, minimal
   ═══════════════════════════════════════════════════════ */
function Field({ field, value, onChange }) {
  const cls =
    "w-full rounded-lg border border-gray-200 bg-transparent px-4 py-3 text-[14px] text-gray-800 " +
    "placeholder:text-gray-400 placeholder:font-light outline-none transition-all duration-200 " +
    "hover:border-gray-300 focus:bg-white focus:border-[#003366] focus:ring-4 focus:ring-[#003366]/5";

  if (field.type === "select") {
    return (
      <select
        id={field.id}
        value={value || ""}
        onChange={onChange}
        required={field.required}
        className={
          cls +
          " appearance-none bg-no-repeat bg-[right_12px_center] bg-[length:16px] cursor-pointer"
        }
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
        }}
      >
        {field.options.map((opt) => (
          <option key={opt} value={opt === field.options[0] ? "" : opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }
  if (field.type === "textarea") {
    return (
      <textarea
        id={field.id}
        value={value || ""}
        onChange={onChange}
        placeholder={field.placeholder}
        required={field.required}
        rows={2}
        className={cls + " resize-none"}
      />
    );
  }
  return (
    <input
      id={field.id}
      type={field.type}
      value={value || ""}
      onChange={onChange}
      placeholder={field.placeholder}
      required={field.required}
      className={cls}
      {...(field.type === "number" ? { min: 0, step: "0.01" } : {})}
    />
  );
}

/* ═══════════════════════════════════════════════════════
   Status enum
   ═══════════════════════════════════════════════════════ */
const STATUS = { IDLE: 0, LOADING: 1, SUCCESS: 2, FAILED: 3 };

/* ═══════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════ */
export default function PayOnline() {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({});
  const [status, setStatus] = useState(STATUS.IDLE);
  const [msg, setMsg] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [formSnapshot, setFormSnapshot] = useState({}); // frozen copy of form at submit time
  const [downloading, setDownloading] = useState(false);
  const panelRef = useRef(null);

  /* helpers */
  const reset = useCallback(() => {
    setSelected(null);
    setForm({});
    setStatus(STATUS.IDLE);
    setMsg("");
    setReceipt(null);
    setFormSnapshot({});
  }, []);

  const pick = (opt) => {
    if (selected?.id === opt.id) {
      reset();
      return;
    }
    setSelected(opt);
    setForm({});
    setStatus(STATUS.IDLE);
    setMsg("");
    setTimeout(
      () =>
        panelRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      80,
    );
  };

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.id]: e.target.value }));

  /* ── BillDesk response handler ───────────────────────── */
  const handleBillDeskResponse = useCallback((txn) => {
    console.log("BillDesk SDK response:", txn);
    const isSuccess =
      txn &&
      (txn.status === "0300" || txn.transaction_error_type === "success");
    const statusMessage = isSuccess
      ? "Payment successful"
      : txn?.transaction_error_desc || "Payment was not completed.";

    setStatus(isSuccess ? STATUS.SUCCESS : STATUS.FAILED);
    setMsg(isSuccess ? txn.transactionid || txn.orderid || "" : statusMessage);

    setReceipt((prev) => ({
      ...(prev || {}),
      status: isSuccess ? "SUCCESS" : "FAILED",
      statusMessage,
      transactionId: txn?.transactionid || prev?.transactionId || "",
      gatewayStatus: txn?.status || txn?.transaction_error_type || "",
      completedAt: new Date().toISOString(),
    }));
  }, []);

  /* ── Submit → Backend → SDK ──────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(STATUS.LOADING);

    try {
      const res = await fetch(`${STRAPI_URL}/api/billdesk/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: form.amount,
          customerName: form.name || "",
          customerEmail: form.email || "",
          customerMobile: form.mobile || "",
          feeType: selected.feeType,
          additionalInfo: form,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `Server error ${res.status}`);
      }
      const { data } = await res.json();

      // Freeze the form data so it's available for the receipt even after reset
      setFormSnapshot({ ...form });

      setReceipt({
        receiptId: data.orderId,
        orderId: data.orderId,
        bdOrderId: data.bdOrderId,
        amount: data.amount,
        customerName: form.name || "",
        customerEmail: form.email || "",
        customerMobile: form.mobile || "",
        feeType: selected.feeType,
        status: "INITIATED",
        statusMessage: "Payment initiated",
        transactionId: "",
        createdAt: new Date().toISOString(),
      });

      // 2) Launch BillDesk Web SDK
      if (!window.loadBillDeskSdk) {
        throw new Error(
          "BillDesk SDK not loaded. Check your internet connection.",
        );
      }

      window.loadBillDeskSdk({
        responseHandler: handleBillDeskResponse,
        merchantLogo: "/logo.jpeg",
        flowConfig: {
          merchantId: data.merchantId,
          bdOrderId: data.bdOrderId,
          authToken: data.authToken,
          childWindow: false,
          retryCount: 3,
          prefs: { payment_categories: ["card", "nb", "upi"] },
        },
        flowType: "payments",
      });
    } catch (err) {
      console.error("Payment init failed:", err);
      setStatus(STATUS.FAILED);
      setMsg(err.message || "Could not start payment. Please try again.");
    }
  };

  /* derived */
  const step = status === STATUS.IDLE ? (selected ? 1 : 0) : 2;
  const amount = form.amount ? parseFloat(form.amount) : 0;

  /* ═══════════════════════════════════════════════════════
     Render
     ═══════════════════════════════════════════════════════ */
  return (
    <SubpageTemplate
      title="Online Payment"
      breadcrumb={[
        { name: "Citizen Services", to: "/services" },
        { name: "Online Payment", to: null },
      ]}
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* ── Hero ─────────────────────────────────────── */}
        <div className="mb-10 px-2 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-gray-100">
          <div>
            <p className="text-[#003366] text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-3">
              <span className="w-6 h-[2px] bg-[#003366]/40"></span>
              Jammu Municipal Corporation
            </p>
            <h2 className="text-gray-900 font-light text-3xl sm:text-4xl tracking-tight">
              Online{" "}
              <span className="font-semibold text-[#003366]">Payment</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-4 max-w-lg font-light leading-relaxed">
              Fast, seamless, and secure fee payments integrated directly with
              the BillDesk framework.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-green-50/50 text-green-700 rounded-full px-4 py-2 shrink-0 border border-green-200/50">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[11px] font-semibold tracking-wide uppercase">
              SSL Secured
            </span>
          </div>
        </div>

        {/* ── Stepper ──────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-gray-100 px-6 py-4 shadow-sm">
          <div className="flex items-center">
            {["Select Category", "Fill Details", "Payment"].map(
              (label, i, arr) => {
                const done = i < step,
                  active = i === step;
                return (
                  <div key={label} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1 gap-1.5">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          done
                            ? "bg-green-500 text-white"
                            : active
                              ? "bg-[#003366] text-white"
                              : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {done ? "✓" : i + 1}
                      </div>
                      <span
                        className={`text-[10px] font-semibold hidden sm:block ${done ? "text-green-600" : active ? "text-[#003366]" : "text-gray-400"}`}
                      >
                        {label}
                      </span>
                    </div>
                    {i < arr.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 mx-2 rounded-full mb-4 sm:mb-0 transition-colors duration-500 ${done ? "bg-green-400" : "bg-gray-100"}`}
                      />
                    )}
                  </div>
                );
              },
            )}
          </div>
        </div>

        {/* ── Category Selection ───────────────────────── */}
        {status === STATUS.IDLE && (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-gray-900 font-semibold text-base">
                Choose Payment Category
              </h3>
              {selected && (
                <button
                  onClick={reset}
                  className="text-xs text-gray-500 hover:text-red-500 transition flex items-center gap-1"
                >
                  <span>×</span> Clear
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {paymentOptions.map((opt) => {
                const Icon = opt.icon;
                const active = selected?.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => pick(opt)}
                    className={`group relative flex items-center gap-4 rounded-xl p-4 sm:p-5 w-full text-left transition-all duration-300 ${
                      active
                        ? "bg-gray-50 border-[#003366] ring-1 ring-[#003366]"
                        : "bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                        active
                          ? "bg-[#003366] text-white"
                          : "bg-gray-100 text-gray-500 group-hover:text-gray-700"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-medium text-[15px] tracking-tight ${active ? "text-[#003366]" : "text-gray-900"}`}
                      >
                        {opt.name}
                      </p>
                      <p className="text-gray-500 text-xs mt-1 font-light leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                    <svg
                      className={`w-4 h-4 shrink-0 transition-transform duration-300 ${active ? "text-[#003366] translate-x-1" : "text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* ── Form Panel ───────────────────────────────── */}
        {selected && status === STATUS.IDLE && (
          <div
            ref={panelRef}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            {/* header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#003366]/5 text-[#003366]">
                  <selected.icon size={18} />
                </div>
                <div>
                  <p className="font-medium text-[15px] tracking-tight text-gray-900">
                    {selected.name}
                  </p>
                  <p className="text-gray-400 text-[10px] mt-0.5 uppercase tracking-wider font-semibold">
                    Fields marked * are required
                  </p>
                </div>
              </div>
              <button
                onClick={reset}
                className="text-gray-400 hover:text-gray-600 transition p-1"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* form body */}
            <form onSubmit={handleSubmit}>
              <div className="px-6 py-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                  {selected.fields.map((f) => (
                    <div
                      key={f.id}
                      className={
                        f.type === "textarea" || !f.half ? "sm:col-span-2" : ""
                      }
                    >
                      <label
                        htmlFor={f.id}
                        className="block text-xs font-medium text-gray-500 mb-1.5"
                      >
                        {f.label}
                        {f.required && (
                          <span className="text-red-400 ml-0.5">*</span>
                        )}
                      </label>
                      <Field field={f} value={form[f.id]} onChange={onChange} />
                    </div>
                  ))}
                </div>
              </div>

              {/* footer */}
              <div className="px-6 py-5 bg-white border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Transactions secured by{" "}
                  <strong className="text-gray-600 font-semibold ml-0.5">
                    BillDesk
                  </strong>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={reset}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none px-8 py-2.5 rounded-lg bg-[#003366] text-white text-sm font-medium hover:bg-[#002244] transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    {amount > 0
                      ? `Pay ₹${amount.toFixed(2)}`
                      : "Proceed to Pay"}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ── Loading ──────────────────────────────────── */}
        {status === STATUS.LOADING && (
          <div
            ref={panelRef}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center"
          >
            <div className="relative w-14 h-14 mx-auto mb-5">
              <div className="absolute inset-0 rounded-full border-[3px] border-gray-100" />
              <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#003366] animate-spin" />
            </div>
            <p className="text-gray-900 font-medium text-lg">
              Initializing Payment…
            </p>
            <p className="text-gray-500 text-sm mt-1.5 max-w-xs mx-auto font-light">
              Connecting to BillDesk. Please do not close this window.
            </p>
          </div>
        )}

        {/* ── Success ──────────────────────────────────── */}
        {status === STATUS.SUCCESS && (
          <div
            ref={panelRef}
            className="bg-white rounded-2xl border border-green-100 shadow-lg p-12 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-gray-900 font-semibold text-lg">
              Payment Successful
            </p>
            {msg && (
              <p className="text-green-600 text-xs font-mono bg-green-50 inline-block px-3 py-1 rounded mt-2">
                {msg}
              </p>
            )}
            <p className="text-gray-400 text-sm mt-3">
              Your payment has been processed. Receipt details are shown below.
            </p>
            <button
              onClick={reset}
              className="mt-6 px-6 py-2.5 rounded-lg bg-[#003366] text-white text-sm font-semibold hover:bg-[#004080] transition"
            >
              Make Another Payment
            </button>
          </div>
        )}

        {/* ── Failed ───────────────────────────────────── */}
        {status === STATUS.FAILED && (
          <div
            ref={panelRef}
            className="bg-white rounded-2xl border border-red-100 shadow-lg p-12 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <p className="text-gray-900 font-semibold text-lg">
              Payment Not Completed
            </p>
            <p className="text-gray-500 text-sm mt-1.5 max-w-md mx-auto">
              {msg ||
                "The payment could not be processed. You have not been charged."}
            </p>
            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={() => {
                  setStatus(STATUS.IDLE);
                  setMsg("");
                }}
                className="px-6 py-2.5 rounded-lg bg-[#003366] text-white text-sm font-semibold hover:bg-[#004080] transition"
              >
                Retry
              </button>
              <button
                onClick={reset}
                className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition"
              >
                Start Over
              </button>
            </div>
          </div>
        )}

        {/* ── Receipt (Success ONLY) ─────────────── */}
        {receipt && status === STATUS.SUCCESS && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
            {/* Receipt header bar */}
            <div
              className={`px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
                status === STATUS.SUCCESS
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100"
                  : "bg-gradient-to-r from-red-50 to-rose-50 border-b border-red-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    status === STATUS.SUCCESS ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {status === STATUS.SUCCESS ? (
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">
                    Payment Receipt
                  </p>
                  <p className="text-gray-500 text-[11px]">
                    Reference ID: {receipt.orderId || "-"}
                  </p>
                </div>
              </div>

              {/* ── Download Receipt button ── */}
              <button
                type="button"
                disabled={downloading}
                onClick={async () => {
                  setDownloading(true);
                  try {
                    await generateReceiptPDF(receipt, formSnapshot);
                  } catch (err) {
                    console.error("Receipt generation failed:", err);
                    alert("Could not generate receipt. Please try again.");
                  } finally {
                    setDownloading(false);
                  }
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 shadow-sm ${
                  downloading
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-[#003366] text-white hover:bg-[#004080] active:scale-[0.97]"
                }`}
              >
                {downloading ? (
                  <>
                    <svg
                      className="w-3.5 h-3.5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Generating…
                  </>
                ) : (
                  <>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download Receipt
                  </>
                )}
              </button>
            </div>

            {/* Receipt detail grid */}
            <div className="px-6 py-5">
              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-gray-400 mb-0.5">Receipt / Order ID</p>
                  <p className="text-gray-900 font-mono font-semibold">{receipt.receiptId || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-0.5">Transaction ID</p>
                  <p className="text-gray-900 font-mono font-semibold">{receipt.transactionId || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-0.5">Status</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    receipt.status === "SUCCESS" ? "bg-green-100 text-green-700"
                    : receipt.status === "FAILED" ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600"
                  }`}>{receipt.status}</span>
                </div>
                <div>
                  <p className="text-gray-400 mb-0.5">Amount Paid</p>
                  <p className="text-gray-900 font-semibold">₹ {parseFloat(receipt.amount || 0).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-0.5">Paid By</p>
                  <p className="text-gray-900 font-medium">
                    {receipt.customerName || formSnapshot.name || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mb-0.5">Parentage</p>
                  <p className="text-gray-900">{formSnapshot.parentage || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-0.5">Mobile</p>
                  <p className="text-gray-900">{receipt.customerMobile || formSnapshot.mobile || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-0.5">Payment Category</p>
                  <p className="text-gray-900">
                    {receipt.feeType === "TENDER_FEE" ? "Tender Fee"
                      : receipt.feeType === "OTHER_FEE" ? "Other Fee"
                      : receipt.feeType || "-"}
                  </p>
                </div>
                {formSnapshot.nitTenderNo && (
                  <div>
                    <p className="text-gray-400 mb-0.5">NIT / Tender No.</p>
                    <p className="text-gray-900">{formSnapshot.nitTenderNo}</p>
                  </div>
                )}
                {formSnapshot.nitTenderDate && (
                  <div>
                    <p className="text-gray-400 mb-0.5">NIT / Tender Date</p>
                    <p className="text-gray-900">{formSnapshot.nitTenderDate}</p>
                  </div>
                )}
                {formSnapshot.address && (
                  <div className="sm:col-span-2">
                    <p className="text-gray-400 mb-0.5">Address</p>
                    <p className="text-gray-900">{formSnapshot.address}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-400 mb-0.5">Date & Time</p>
                  <p className="text-gray-900">
                    {receipt.createdAt ? new Date(receipt.createdAt).toLocaleString("en-IN") : "-"}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-start gap-2">
                <svg
                  className="w-3.5 h-3.5 text-[#003366] mt-0.5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-[11px] text-gray-500">
                  Click <strong>Download Receipt</strong> to save the official
                  JMC PDF receipt to your device. Keep this for future reference
                  and tax purposes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Info Strip ───────────────────────────────── */}
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            {
              icon: "🛡️",
              title: "Secure Payments",
              desc: "SSL encrypted via BillDesk",
              bg: "bg-blue-50/60 border-blue-100",
            },
            {
              icon: "🧾",
              title: "Instant Receipt",
              desc: "Download receipt after payment",
              bg: "bg-green-50/60 border-green-100",
            },
            {
              icon: "📞",
              title: "1800-180-7207",
              desc: "Toll-free helpline",
              bg: "bg-orange-50/60 border-orange-100",
            },
          ].map(({ icon, title, desc, bg }) => (
            <div
              key={title}
              className={`border rounded-xl p-4 flex items-center gap-3 ${bg}`}
            >
              <span className="text-xl">{icon}</span>
              <div>
                <p className="font-semibold text-xs text-gray-800">{title}</p>
                <p className="text-gray-500 text-[10px]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SubpageTemplate>
  );
}
