import { useState, useRef, useCallback, useEffect } from "react";
import { 
  User, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  Building2,
  FileText, 
  Hash, 
  Calendar, 
  CreditCard, 
  ChevronRight, 
  Download, 
  ArrowRight, 
  RefreshCw, 
  CheckCircle2, 
  XCircle,
  ShieldCheck,
  Coins
} from "lucide-react";
import SubpageTemplate from "../components/SubpageTemplate";
import DownloadReceiptButton from "../components/DownloadReceiptButton";
import { STRAPI_URL } from "../config/api";
import { extractBillDeskToken, deriveBillDeskOutcome } from "../utils/billdesk";
import { getLocations } from "../services/strapiApi";

/* ═══════════════════════════════════════════════════════
   Payment Categories
   ═══════════════════════════════════════════════════════ */
const paymentOptions = [
  {
    id: "tender",
    name: "Tender Fee",
    desc: "Pay tender document and processing charges",
    feeType: "TENDER_FEE",
    icon: FileText,
    accentFrom: "#FF6600",
    accentTo: "#FF8533",
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
        label: "NIT/Tender No.",
        type: "text",
        placeholder: "e.g. NIT-2025/001",
        required: true,
        half: true,
      },
      {
        id: "nitTenderDate",
        label: "NIT/Tender Date",
        type: "date",
        required: true,
        half: true,
      },
      {
        id: "nitTenderDetails",
        label: "NIT/Tender Details",
        type: "textarea",
        placeholder: "Brief description of the tender",
      },
      {
        id: "amount",
        label: "NIT/Tender Amount",
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
    icon: Building2,
    accentFrom: "#002B5E",
    accentTo: "#00408C",
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
        id: "feeTypeDetail",
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
        label: "Location",
        type: "select",
        options: ["Select Location"],
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
        label: "Enter Amount",
        type: "number",
        placeholder: "₹ 0.00",
        required: true,
        half: true,
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   Input Component — Clean, minimal, icon decorators
   ═══════════════════════════════════════════════════════ */
function Field({ field, value, onChange }) {
  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-slate-50/50 pl-10 pr-4 py-3 text-sm text-gray-800 " +
    "placeholder:text-gray-400 placeholder:font-light outline-none transition-all duration-200 " +
    "hover:border-gray-300 focus:bg-white focus:border-[#002B5E] focus:ring-4 focus:ring-[#002B5E]/5";

  // Select icon based on field ID
  const getFieldIcon = (id) => {
    const iconClass = "w-4.5 h-4.5 text-gray-400 group-focus-within/field:text-[#002B5E] transition-colors duration-200";
    switch (id) {
      case "name":
        return <User className={iconClass} />;
      case "parentage":
        return <Users className={iconClass} />;
      case "mobile":
        return <Phone className={iconClass} />;
      case "email":
        return <Mail className={iconClass} />;
      case "address":
        return <MapPin className={iconClass} />;
      case "dept":
        return <Building className={iconClass} />;
      case "location":
        return <MapPin className={iconClass} />;
      case "nitTenderNo":
        return <Hash className={iconClass} />;
      case "nitTenderDate":
        return <Calendar className={iconClass} />;
      case "feeTypeDetail":
      case "payDetails":
      case "nitTenderDetails":
      default:
        return <FileText className={iconClass} />;
    }
  };

  return (
    <div className="relative group/field flex items-center w-full">
      {/* Icon prefix */}
      <div className="absolute left-3.5 pointer-events-none flex items-center justify-center">
        {getFieldIcon(field.id)}
      </div>

      {field.type === "select" ? (
        <select
          id={field.id}
          value={value || ""}
          onChange={onChange}
          required={field.required}
          className={
            inputClass +
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
      ) : field.type === "textarea" ? (
        <textarea
          id={field.id}
          value={value || ""}
          onChange={onChange}
          placeholder={field.placeholder}
          required={field.required}
          rows={3}
          className={inputClass + " resize-none min-h-[80px]"}
        />
      ) : (
        <input
          id={field.id}
          type={field.type}
          value={value || ""}
          onChange={onChange}
          placeholder={field.placeholder}
          required={field.required}
          className={inputClass}
          {...(field.type === "number" ? { min: 0, step: "0.01" } : {})}
        />
      )}
    </div>
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
  const [locationOptions, setLocationOptions] = useState(["Select Location"]);
  const panelRef = useRef(null);

  useEffect(() => {
    let isActive = true;

    getLocations()
      .then((res) => {
        const options = (res.data?.data || [])
          .map((entry) => {
            const attrs = entry.attributes || entry;
            const name = String(attrs.name || "").trim();
            if (!name) return null;
            const wardNo = attrs.ward_no ?? attrs.wardNo;
            const suffix = wardNo ? ` (Ward No.${wardNo})` : "";
            return `${name}${suffix}`;
          })
          .filter(Boolean);

        if (isActive && options.length > 0) {
          setLocationOptions(["Select Location", ...options]);
        }
      })
      .catch(() => {
        if (isActive) {
          setLocationOptions(["Select Location"]);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

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
  const handleBillDeskResponse = useCallback(async (txn) => {
    console.log("BillDesk SDK response:", txn);

    const token = extractBillDeskToken(txn);
    let outcome = deriveBillDeskOutcome(txn);

    if (token) {
      try {
        const res = await fetch(`${STRAPI_URL}/api/billdesk/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transactionResponse: token }),
        });

        const data = await res.json().catch(() => ({}));
        if (res.ok && data?.data) {
          outcome = deriveBillDeskOutcome(data.data, outcome);
        }
      } catch (error) {
        console.error("BillDesk verify failed:", error);
      }
    }

    const displayMessage = outcome.isSuccess
      ? outcome.transactionId || outcome.orderId || "Payment successful"
      : outcome.statusMessage;

    setStatus(outcome.isSuccess ? STATUS.SUCCESS : STATUS.FAILED);
    setMsg(displayMessage);

    setReceipt((prev) => ({
      ...(prev || {}),
      status: outcome.isSuccess ? "SUCCESS" : "FAILED",
      statusMessage: outcome.statusMessage,
      transactionId: outcome.transactionId || prev?.transactionId || "",
      gatewayStatus: outcome.gatewayStatus || prev?.gatewayStatus || "",
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
  const fieldsToRender = selected?.fields?.map((field) => {
    if (field.id !== "location") return field;
    return {
      ...field,
      label: "Location",
      options: locationOptions,
    };
  });

  // Group fields for high-fidelity form layout
  const personalFields = fieldsToRender?.filter(f => ["name", "parentage", "mobile", "email", "address"].includes(f.id)) || [];
  const categoryFields = fieldsToRender?.filter(f => ["dept", "feeTypeDetail", "payDetails", "location", "nitTenderNo", "nitTenderDate", "nitTenderDetails"].includes(f.id)) || [];
  const amountField = fieldsToRender?.find(f => f.id === "amount");

  /* ═══════════════════════════════════════════════════════
     Render
     ═══════════════════════════════════════════════════════ */
  return (
    <SubpageTemplate
      title="Payment Form"
      showMobileFloatingNav={false}
      breadcrumb={[
        { name: "Citizen Services", to: "/services" },
        { name: "Payment Form", to: null },
      ]}
    >
      <div className="space-y-6 max-w-4xl mx-auto pb-10">
        {/* ── Hero ─────────────────────────────────────── */}
        <div className="mb-6 px-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Payment Form
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm font-light">
              Secure digital fee payments integrated directly with the BillDesk network.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 rounded-full px-3 py-1.5 self-start sm:self-auto border border-emerald-100/50 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-bold tracking-wider uppercase">
              SSL Secured
            </span>
          </div>
        </div>

        {/* ── Stepper ──────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm">
          {/* Mobile progress view */}
          <div className="sm:hidden flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
              <span>Step {step + 1} of 3</span>
              <span className="text-[#002B5E] font-black">
                {step === 0 ? "Select Category" : step === 1 ? "Fill Details" : "Payment processing"}
              </span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex gap-1">
              <div className={`h-full flex-1 rounded-full transition-all duration-500 ${step >= 0 ? "bg-[#002B5E]" : "bg-gray-100"}`} />
              <div className={`h-full flex-1 rounded-full transition-all duration-500 ${step >= 1 ? "bg-[#002B5E]" : "bg-gray-100"}`} />
              <div className={`h-full flex-1 rounded-full transition-all duration-500 ${step >= 2 ? (status === STATUS.SUCCESS ? "bg-green-500" : "bg-red-500") : "bg-gray-100"}`} />
            </div>
          </div>

          {/* Desktop full Stepper */}
          <div className="hidden sm:flex items-center justify-between">
            {["Select Category", "Fill Details", "Payment Status"].map((label, i, arr) => {
              const done = i < step;
              const active = i === step;
              return (
                <div key={label} className="flex items-center flex-1 last:flex-initial">
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center">
                      {active && (
                        <span className="absolute -inset-1.5 rounded-full bg-[#002B5E]/10 animate-ping duration-1000" />
                      )}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-all duration-500 border-2 ${
                          done
                            ? "bg-green-500 border-green-500 text-white"
                            : active
                              ? "bg-[#002B5E] border-[#002B5E] text-white ring-4 ring-[#002B5E]/15"
                              : "bg-white border-gray-200 text-gray-400"
                        }`}
                      >
                        {done ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          i + 1
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={`text-[12px] font-bold uppercase tracking-wider ${
                          done ? "text-green-600" : active ? "text-[#002B5E]" : "text-gray-400 font-medium"
                        }`}
                      >
                        {label}
                      </span>
                      <span className="text-[10px] text-gray-400 font-light mt-0.5 leading-none">
                        {i === 0 ? "Choose fee type" : i === 1 ? "Provide details" : "Transaction status"}
                      </span>
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="flex-1 mx-6 h-0.5 relative bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`absolute left-0 top-0 h-full bg-gradient-to-r transition-all duration-500 ${
                          done ? "from-green-400 to-green-500 w-full" : "from-[#002B5E]/50 to-[#002B5E] w-0"
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Category Selection ───────────────────────── */}
        {status === STATUS.IDLE && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-900 font-bold text-base tracking-tight">
                Select Payment Category
              </h3>
              {selected && (
                <button
                  onClick={reset}
                  className="text-xs font-bold text-[#FF6600] hover:text-[#002B5E] transition-all flex items-center gap-1 bg-orange-50 px-2.5 py-1.5 rounded-lg border border-orange-100"
                >
                  Clear Selection
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentOptions.map((opt) => {
                const Icon = opt.icon;
                const active = selected?.id === opt.id;
                const isTender = opt.id === "tender";
                
                // Colors configured to coordinate JMC themes
                const themeColor = isTender ? "from-[#FF6600] to-[#FF8533]" : "from-[#002B5E] to-[#00408C]";
                const textActive = isTender ? "text-[#FF6600]" : "text-[#002B5E]";
                const ringColor = isTender ? "ring-[#FF6600]/10 border-[#FF6600]" : "ring-[#002B5E]/10 border-[#002B5E]";
                
                return (
                  <button
                    key={opt.id}
                    onClick={() => pick(opt)}
                    className={`group relative flex flex-col sm:flex-row items-start gap-4 rounded-2xl p-5 w-full text-left transition-all duration-300 border ${
                      active
                        ? `bg-white shadow-md border-t-4 ${ringColor} ring-4`
                        : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5"
                    }`}
                  >
                    {/* Top Right Checkbox / Radio Indicator */}
                    <div className="absolute top-4 right-4 flex items-center justify-center">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        active 
                          ? `${isTender ? "border-[#FF6600] bg-[#FF6600]" : "border-[#002B5E] bg-[#002B5E]"} text-white` 
                          : "border-gray-300 group-hover:border-gray-400"
                      }`}>
                        {active && (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Icon Container */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        active
                          ? `bg-gradient-to-br ${themeColor} text-white shadow-sm`
                          : "bg-slate-50 text-gray-400 group-hover:bg-slate-100 group-hover:text-gray-600"
                      }`}
                    >
                      <Icon size={24} />
                    </div>

                    {/* Card details */}
                    <div className="flex-1 min-w-0 pr-6">
                      <h4
                        className={`text-base font-extrabold tracking-tight transition-colors duration-200 ${
                          active ? textActive : "text-gray-900"
                        }`}
                      >
                        {opt.name}
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-[13px] mt-1.5 font-normal leading-relaxed">
                        {opt.desc}
                      </p>
                      
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider mt-3.5 transition-all duration-300 ${
                        active ? textActive : "text-gray-400 group-hover:text-gray-600"
                      }`}>
                        {active ? "Selected Category" : "Proceed with Selection"}
                        <ChevronRight className={`w-3 h-3 transition-transform ${active ? "translate-x-1 text-[#FF6600]" : "group-hover:translate-x-1"}`} />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Form Panel ───────────────────────────────── */}
        {selected && status === STATUS.IDLE && (
          <div
            ref={panelRef}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#002B5E]/5 text-[#002B5E]">
                  <selected.icon size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-base tracking-tight text-gray-900">
                    Provide payment details for {selected.name}
                  </h4>
                  <p className="text-gray-400 text-[10px] uppercase tracking-wider font-bold mt-0.5">
                    Required inputs are marked with an asterisk (<span className="text-red-500">*</span>)
                  </p>
                </div>
              </div>
              
              <button
                onClick={reset}
                className="text-gray-400 hover:text-gray-600 transition p-1.5 hover:bg-gray-100 rounded-lg"
                aria-label="Close form"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-8">
                {/* 1. Personal Information Fields */}
                {personalFields.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                      <div className="w-6 h-6 rounded-md bg-[#002B5E]/5 flex items-center justify-center text-[#002B5E]">
                        <User size={13} />
                      </div>
                      <h5 className="text-[11px] font-black text-[#002B5E] uppercase tracking-widest">
                        1. Payee Personal Information
                      </h5>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                      {personalFields.map((f) => (
                        <div key={f.id} className={f.type === "textarea" || !f.half ? "sm:col-span-2" : ""}>
                          <label htmlFor={f.id} className="block text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-0.5">
                            {f.label}
                            {f.required && <span className="text-red-500">*</span>}
                          </label>
                          <Field field={f} value={form[f.id]} onChange={onChange} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Category Specific Fields */}
                {categoryFields.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                      <div className="w-6 h-6 rounded-md bg-[#002B5E]/5 flex items-center justify-center text-[#002B5E]">
                        <Building2 size={13} />
                      </div>
                      <h5 className="text-[11px] font-black text-[#002B5E] uppercase tracking-widest">
                        {personalFields.length > 0 ? "2. Fee & Category Details" : "1. Fee & Category Details"}
                      </h5>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                      {categoryFields.map((f) => (
                        <div key={f.id} className={f.type === "textarea" || !f.half ? "sm:col-span-2" : ""}>
                          <label htmlFor={f.id} className="block text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-0.5">
                            {f.label}
                            {f.required && <span className="text-red-500">*</span>}
                          </label>
                          <Field field={f} value={form[f.id]} onChange={onChange} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Amount Field (Special Large Block Layout) */}
                {amountField && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                      <div className="w-6 h-6 rounded-md bg-[#002B5E]/5 flex items-center justify-center text-[#002B5E]">
                        <CreditCard size={13} />
                      </div>
                      <h5 className="text-[11px] font-black text-[#002B5E] uppercase tracking-widest">
                        {categoryFields.length > 0 && personalFields.length > 0 
                          ? "3. Amount to Pay" 
                          : categoryFields.length > 0 || personalFields.length > 0 
                            ? "2. Amount to Pay" 
                            : "1. Amount to Pay"}
                      </h5>
                    </div>
                    
                    <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                          <Coins className="w-6 h-6 animate-pulse" />
                        </div>
                        <div className="text-center md:text-left">
                          <p className="text-gray-800 font-bold text-sm">Total Fee Payable</p>
                          <p className="text-gray-400 text-xs mt-0.5">Please specify the exact amount you wish to transfer</p>
                        </div>
                      </div>
                      
                      <div className="w-full md:w-auto flex justify-center">
                        <div className="relative w-full sm:w-56 flex items-center">
                          {/* Large Rupee Prefix */}
                          <div className="absolute left-4 pointer-events-none flex items-center justify-center">
                            <span className="text-gray-500 font-black text-lg">₹</span>
                          </div>
                          <input
                            id={amountField.id}
                            type="number"
                            min="1"
                            step="0.01"
                            placeholder="0.00"
                            required={amountField.required}
                            value={form[amountField.id] || ""}
                            onChange={onChange}
                            className="pl-9 pr-4 py-3 bg-white border border-gray-200 text-gray-800 font-black text-xl rounded-xl focus:border-[#002B5E] focus:ring-4 focus:ring-[#002B5E]/5 outline-none transition-all w-full text-right"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Footer Actions */}
              <div className="px-6 py-5 bg-slate-50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                  <span>Secured & Processed by <strong>BillDesk</strong></span>
                </div>
                
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={reset}
                    className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none px-8 py-3 rounded-xl bg-[#002B5E] text-white text-sm font-bold hover:bg-[#001D40] hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {amount > 0 ? `Pay ₹${amount.toFixed(2)}` : "Proceed to Pay"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ── Loading State ────────────────────────────── */}
        {status === STATUS.LOADING && (
          <div
            ref={panelRef}
            className="bg-white rounded-2xl border border-gray-100 shadow-xl p-12 max-w-md mx-auto text-center"
          >
            <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              {/* Outer Orbit Spinning */}
              <div className="absolute inset-0 rounded-full border-4 border-slate-50" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#002B5E] border-r-[#002B5E]/30 animate-spin" style={{ animationDuration: '0.8s' }} />
              
              {/* Inner Reverse Orbit */}
              <div className="absolute inset-2.5 rounded-full border-4 border-slate-50" />
              <div className="absolute inset-2.5 rounded-full border-4 border-transparent border-b-[#FF6600] border-l-[#FF6600]/30 animate-spin" style={{ animationDuration: '1.2s', animationDirection: 'reverse' }} />
              
              <CreditCard className="w-6 h-6 text-[#002B5E] animate-pulse" />
            </div>
            
            <h4 className="text-gray-900 font-bold text-lg tracking-tight">
              Securing Connection
            </h4>
            <p className="text-[#002B5E] text-[10px] font-black uppercase tracking-widest mt-1.5 animate-pulse">
              Redirecting to BillDesk...
            </p>
            <p className="text-gray-400 text-xs sm:text-sm mt-4 max-w-xs mx-auto font-light leading-relaxed">
              Please do not close this browser or click refresh. We are launching the secure gateway.
            </p>
          </div>
        )}

        {/* ── Success State ────────────────────────────── */}
        {status === STATUS.SUCCESS && (
          <div
            ref={panelRef}
            className="bg-white rounded-2xl border border-green-100 shadow-xl p-10 max-w-md mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-5 shadow-sm border border-emerald-100">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-gray-900 font-extrabold text-xl tracking-tight">
              Payment Successful!
            </h3>
            {msg && (
              <p className="text-emerald-700 text-xs font-mono bg-emerald-50 border border-emerald-100 inline-block px-3 py-1.5 rounded-lg mt-3">
                Txn Ref: {msg}
              </p>
            )}
            <p className="text-gray-400 text-xs sm:text-sm mt-4 leading-relaxed font-light">
              Your transaction has been processed successfully. An official receipt has been issued below.
            </p>
            <button
              onClick={reset}
              className="mt-6 px-6 py-2.5 rounded-xl bg-[#002B5E] text-white text-xs font-bold hover:bg-[#001D40] transition-colors"
            >
              Make Another Payment
            </button>
          </div>
        )}

        {/* ── Failed State ─────────────────────────────── */}
        {status === STATUS.FAILED && (
          <div
            ref={panelRef}
            className="bg-white rounded-2xl border border-rose-100 shadow-xl p-10 max-w-md mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-5 shadow-sm border border-rose-100">
              <XCircle className="w-10 h-10" />
            </div>
            <h3 className="text-gray-900 font-extrabold text-xl tracking-tight">
              Payment Incomplete
            </h3>
            <p className="text-rose-700 text-xs font-medium bg-rose-50 border border-rose-100/60 inline-block px-3.5 py-1.5 rounded-lg mt-3 leading-relaxed">
              {msg || "The transaction could not be authorized or was cancelled."}
            </p>
            <p className="text-gray-400 text-xs sm:text-sm mt-4 leading-relaxed font-light">
              Your account has not been charged. Please try again or get in touch with our helpdesk if problems persist.
            </p>
            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={() => {
                  setStatus(STATUS.IDLE);
                  setMsg("");
                }}
                className="px-6 py-2.5 rounded-xl bg-[#002B5E] text-white text-xs font-bold hover:bg-[#001D40] transition"
              >
                Retry Payment
              </button>
              <button
                onClick={reset}
                className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition"
              >
                Start Over
              </button>
            </div>
          </div>
        )}

        {/* ── Receipt Panel (Only on SUCCESS) ───────────── */}
        {receipt && status === STATUS.SUCCESS && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden max-w-2xl mx-auto">
            {/* Invoice Top Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-emerald-50/50 via-slate-50 to-emerald-50/50 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-extrabold text-sm tracking-tight">
                    Official Payment Receipt
                  </h4>
                  <p className="text-gray-400 text-[10px] uppercase font-bold mt-0.5">
                    Order Ref: {receipt.orderId || "-"}
                  </p>
                </div>
              </div>

              {/* PDF Action */}
              <DownloadReceiptButton
                receiptData={receipt}
                formData={formSnapshot}
              />
            </div>

            {/* Perforation Line graphic */}
            <div className="relative h-1 bg-white border-y border-dashed border-gray-200 flex items-center justify-between px-4">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-50 border-r border-gray-200 -ml-5" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-50 border-l border-gray-200 -mr-5" />
            </div>

            {/* Invoice Details Layout */}
            <div className="px-8 py-6 space-y-6">
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-xs">
                <div>
                  <p className="text-gray-400 font-semibold mb-0.5">Receipt ID</p>
                  <p className="text-gray-800 font-mono font-bold text-[13px]">{receipt.receiptId || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-semibold mb-0.5">Transaction reference</p>
                  <p className="text-gray-800 font-mono font-bold text-[13px]">{receipt.transactionId || "-"}</p>
                </div>
                
                <div className="border-t border-slate-50 pt-2">
                  <p className="text-gray-400 font-semibold mb-0.5">Payment Category</p>
                  <p className="text-gray-800 font-bold text-[13px]">
                    {receipt.feeType === "TENDER_FEE"
                      ? "Tender Fee"
                      : receipt.feeType === "OTHER_FEE"
                        ? "Other Fee"
                        : receipt.feeType || "-"}
                  </p>
                </div>
                <div className="border-t border-slate-50 pt-2">
                  <p className="text-gray-400 font-semibold mb-0.5">Issue Timestamp</p>
                  <p className="text-gray-800 font-bold text-[13px]">
                    {receipt.createdAt ? new Date(receipt.createdAt).toLocaleString("en-IN") : "-"}
                  </p>
                </div>

                <div className="border-t border-slate-50 pt-2">
                  <p className="text-gray-400 font-semibold mb-0.5">Paid By (Name)</p>
                  <p className="text-gray-800 font-bold text-[13px] uppercase">
                    {receipt.customerName || formSnapshot.name || "-"}
                  </p>
                </div>
                <div className="border-t border-slate-50 pt-2">
                  <p className="text-gray-400 font-semibold mb-0.5">Parentage</p>
                  <p className="text-gray-800 font-bold text-[13px] uppercase">
                    {formSnapshot.parentage || "-"}
                  </p>
                </div>

                <div className="border-t border-slate-50 pt-2">
                  <p className="text-gray-400 font-semibold mb-0.5">Mobile Contact</p>
                  <p className="text-gray-800 font-bold text-[13px]">
                    {receipt.customerMobile || formSnapshot.mobile || "-"}
                  </p>
                </div>
                {formSnapshot.nitTenderNo && (
                  <div className="border-t border-slate-50 pt-2">
                    <p className="text-gray-400 font-semibold mb-0.5">NIT/Tender Reference</p>
                    <p className="text-gray-800 font-bold text-[13px]">{formSnapshot.nitTenderNo}</p>
                  </div>
                )}
                {formSnapshot.nitTenderDate && (
                  <div className="border-t border-slate-50 pt-2">
                    <p className="text-gray-400 font-semibold mb-0.5">NIT/Tender Date</p>
                    <p className="text-gray-800 font-bold text-[13px]">{formSnapshot.nitTenderDate}</p>
                  </div>
                )}
                
                {formSnapshot.address && (
                  <div className="sm:col-span-2 border-t border-slate-50 pt-2">
                    <p className="text-gray-400 font-semibold mb-0.5">Address</p>
                    <p className="text-gray-800 font-medium leading-relaxed">{formSnapshot.address}</p>
                  </div>
                )}
              </div>

              {/* Large highlighted Amount Summary */}
              <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-4 flex justify-between items-center">
                <span className="text-xs font-bold text-[#002B5E] uppercase tracking-wider">Amount Paid</span>
                <span className="text-emerald-700 font-black text-xl">
                  ₹ {parseFloat(receipt.amount || 0).toFixed(2)}
                </span>
              </div>

              {/* Note strip */}
              <div className="pt-4 border-t border-gray-100 flex items-start gap-2.5">
                <svg className="w-4 h-4 text-[#002B5E] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Keep a saved copy of this receipt for verification. You can download the formal PDF version immediately using the <strong>Download Receipt</strong> button above.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Security / Help Info Strip ────────────────── */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: "🛡️",
              title: "PCI-DSS Compliant",
              desc: "Fully encrypted secure gateway transactions.",
              bg: "bg-blue-50/50 border-blue-100/60",
              titleColor: "text-blue-900",
            },
            {
              icon: "🧾",
              title: "Instant PDF e-Receipt",
              desc: "Generate official JMC receipts post authorization.",
              bg: "bg-emerald-50/50 border-emerald-100/60",
              titleColor: "text-emerald-900",
            },
            {
              icon: "📞",
              title: "Helpline: 1800-180-7207",
              desc: "Get round the clock help for payments & services.",
              bg: "bg-orange-50/50 border-orange-100/60",
              titleColor: "text-orange-950",
            },
          ].map(({ icon, title, desc, bg, titleColor }) => (
            <div
              key={title}
              className={`border rounded-2xl p-4 flex items-start gap-3 bg-white shadow-xs ${bg}`}
            >
              <span className="text-2xl mt-0.5 shrink-0 select-none">{icon}</span>
              <div>
                <p className={`font-extrabold text-xs tracking-tight ${titleColor}`}>{title}</p>
                <p className="text-gray-500 text-[11px] sm:text-xs mt-1 font-normal leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SubpageTemplate>
  );
}
