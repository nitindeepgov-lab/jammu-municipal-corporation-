import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SubpageTemplate from "../components/SubpageTemplate";
import { STRAPI_URL } from "../config/api";
import { generateReceiptPDF } from "../utils/generateReceipt";

const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  FAILED: "failed",
  CANCELLED: "cancelled",
  PENDING: "pending",
  ERROR: "error",
};

const TOKEN_KEYS = [
  "transaction_response",
  "transactionResponse",
  "txnResponse",
  "response",
  "jws",
  "payload",
];

export default function PaymentStatus() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState(STATUS.IDLE);
  const [message, setMessage] = useState("");
  const [details, setDetails] = useState(null);
  const [downloading, setDownloading] = useState(false);

  const token = useMemo(() => {
    for (const key of TOKEN_KEYS) {
      const value = searchParams.get(key);
      if (value) return value;
    }
    return "";
  }, [searchParams]);

  useEffect(() => {
    if (!token) {
      setStatus(STATUS.IDLE);
      setMessage("No payment response token was found in the return URL.");
      return;
    }

    const verify = async () => {
      setStatus(STATUS.LOADING);
      setMessage("Verifying payment status...");

      try {
        const res = await fetch(`${STRAPI_URL}/api/billdesk/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transactionResponse: token }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.error?.message || "Unable to verify payment.");
        }

        const result = data.data || {};
        const statusMessage =
          result.statusMessage ||
          (result.status === "0300"
            ? "SUCCESS"
            : result.status === "0002"
              ? "PENDING"
              : "FAILED");

        let mappedStatus;
        if (result.verified && statusMessage === "SUCCESS") {
          mappedStatus = STATUS.SUCCESS;
        } else if (result.cancelled) {
          mappedStatus = STATUS.CANCELLED;
        } else if (statusMessage === "PENDING") {
          mappedStatus = STATUS.PENDING;
        } else {
          mappedStatus = STATUS.FAILED;
        }

        setStatus(mappedStatus);
        setMessage(
          result.cancelled
            ? "Payment was cancelled. No amount has been charged."
            : statusMessage
        );
        setDetails({
          orderId:        result.orderId || "",
          transactionId:  result.transactionId || "",
          amount:         result.amount || "",
          authStatus:     result.status || "",
          statusMessage,
          paymentMethod:  result.paymentMethod || "",
          customerName:   result.customerName || "",
          customerMobile: result.customerMobile || "",
          customerEmail:  result.customerEmail || "",
          feeType:        result.feeType || "",
          additionalInfo: result.additionalInfo || {},
        });
      } catch (error) {
        setStatus(STATUS.ERROR);
        setMessage(error.message || "Unable to verify payment.");
      }
    };

    verify();
  }, [token]);

  const isSuccess = status === STATUS.SUCCESS;

  const statusLabel = isSuccess
    ? "Payment Successful"
    : status === STATUS.CANCELLED
      ? "Payment Cancelled"
      : status === STATUS.PENDING
        ? "Payment Pending"
        : status === STATUS.FAILED
          ? "Payment Failed"
          : status === STATUS.ERROR
            ? "Verification Error"
            : "Payment Status";

  const handleDownload = async () => {
    if (!details) return;
    setDownloading(true);
    try {
      const receiptData = {
        orderId: details.orderId,
        receiptId: details.orderId,
        transactionId: details.transactionId,
        amount: details.amount,
        status: details.statusMessage,
        feeType: details.feeType,
        customerName: details.customerName,
        customerMobile: details.customerMobile,
        createdAt: new Date().toISOString(),
      };
      // additionalInfo contains parentage, address, nitTenderNo, etc.
      const formData = details.additionalInfo || {};
      await generateReceiptPDF(receiptData, formData);
    } catch (err) {
      console.error("Receipt generation failed:", err);
      alert("Could not generate receipt. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <SubpageTemplate
      title="Payment Status"
      breadcrumb={[
        { name: "Citizen Services", to: "/services" },
        { name: "Payment Status", to: null },
      ]}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <div
          className={`bg-white rounded-2xl border shadow-lg overflow-hidden ${
            isSuccess
              ? "border-green-100"
              : status === STATUS.CANCELLED
                ? "border-amber-100"
                : status === STATUS.FAILED
                  ? "border-red-100"
                  : "border-gray-100"
          }`}
        >
          {/* Colored header bar */}
          <div
            className={`px-6 py-5 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
              isSuccess
                ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-100"
                : status === STATUS.CANCELLED
                  ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-100"
                  : status === STATUS.FAILED
                    ? "bg-gradient-to-r from-red-50 to-rose-50 border-red-100"
                    : "bg-gray-50 border-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                  isSuccess
                    ? "bg-green-100"
                    : status === STATUS.CANCELLED
                      ? "bg-amber-100"
                      : status === STATUS.FAILED
                        ? "bg-red-100"
                        : status === STATUS.LOADING
                          ? "bg-blue-50"
                          : "bg-gray-100"
                }`}
              >
                {status === STATUS.LOADING ? (
                  <svg
                    className="w-5 h-5 text-blue-500 animate-spin"
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
                ) : isSuccess ? (
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : status === STATUS.CANCELLED ? (
                  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : status === STATUS.FAILED ? (
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-gray-900 font-semibold text-base">
                  {statusLabel}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">{message}</p>
              </div>
            </div>
            <Link
              to="/pay-online"
              className="text-xs text-[#003366] font-semibold hover:underline shrink-0"
            >
              ← Back to Pay Online
            </Link>
          </div>

          {/* Details grid */}
          {details && (
            <div className="px-6 py-5">
              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-gray-400 mb-0.5">Order ID</p>
                  <p className="text-gray-900 font-mono font-semibold">
                    {details.orderId || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mb-0.5">Transaction ID</p>
                  <p className="text-gray-900 font-mono font-semibold">
                    {details.transactionId || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mb-0.5">Amount</p>
                  <p className="text-gray-900 font-semibold">
                    ₹ {details.amount || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mb-0.5">Status</p>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      details.statusMessage === "SUCCESS"
                        ? "bg-green-100 text-green-700"
                        : details.statusMessage === "FAILED"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {details.statusMessage}
                  </span>
                </div>
                {details.paymentMethod && (
                  <div>
                    <p className="text-gray-400 mb-0.5">Payment Method</p>
                    <p className="text-gray-900 capitalize">
                      {details.paymentMethod}
                    </p>
                  </div>
                )}
              </div>

              {/* Download button — only for successful payments */}
              {isSuccess && (
                <div className="mt-5 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <p className="text-[11px] text-gray-500 max-w-sm">
                    Your payment was successful. Download your official JMC receipt below.
                  </p>
                  <button
                    type="button"
                    disabled={downloading}
                    onClick={handleDownload}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 shadow-sm shrink-0 ${
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
                        Download Receipt (PDF)
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </SubpageTemplate>
  );
}
