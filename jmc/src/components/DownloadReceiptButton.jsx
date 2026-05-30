import { useState } from "react";
import { generateReceiptPDF } from "../utils/generateReceipt";

/**
 * Reusable download receipt button used by PayOnline and PaymentStatus pages.
 *
 * @param {Object} props
 * @param {Object} props.receiptData - Receipt data for PDF generation
 * @param {Object} [props.formData={}] - Form/additional info data
 * @param {string} [props.label="Download Receipt"] - Button label
 * @param {string} [props.className=""] - Additional CSS classes
 */
export default function DownloadReceiptButton({
  receiptData,
  formData = {},
  label = "Download Receipt",
  className = "",
}) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!receiptData || downloading) return;
    setDownloading(true);
    try {
      await generateReceiptPDF(receiptData, formData);
    } catch (err) {
      console.error("Receipt generation failed:", err);
      alert("Could not generate receipt. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      type="button"
      disabled={downloading}
      onClick={handleDownload}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 shadow-sm ${
        downloading
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-[#003366] text-white hover:bg-[#004080] active:scale-[0.97]"
      } ${className}`}
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
          {label}
        </>
      )}
    </button>
  );
}
