/**
 * generateReceipt.js
 * Generates a JMC Payment Receipt PDF matching the official format.
 * Uses jsPDF (client-side) + qrcode for the QR block.
 */

import { jsPDF } from "jspdf";
import QRCode from "qrcode";

// ── helpers ────────────────────────────────────────────────────────────────

/** Convert amount number to Indian-style words */
function amountToWords(amount) {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  function convertLessThanThousand(n) {
    if (n === 0) return "";
    if (n < 20) return ones[n] + " ";
    if (n < 100)
      return (
        tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "") + " "
      );
    return (
      ones[Math.floor(n / 100)] + " Hundred " + convertLessThanThousand(n % 100)
    );
  }

  function toWords(n) {
    if (n === 0) return "Zero";
    let result = "";
    if (n >= 10000000) {
      result += convertLessThanThousand(Math.floor(n / 10000000)) + "Crore ";
      n %= 10000000;
    }
    if (n >= 100000) {
      result += convertLessThanThousand(Math.floor(n / 100000)) + "Lakh ";
      n %= 100000;
    }
    if (n >= 1000) {
      result += convertLessThanThousand(Math.floor(n / 1000)) + "Thousand ";
      n %= 1000;
    }
    result += convertLessThanThousand(n);
    return result.trim();
  }

  const num = parseFloat(amount) || 0;
  const rupees = Math.floor(num);
  const paise = Math.round((num - rupees) * 100);

  let words = "Rupees " + toWords(rupees);
  if (paise > 0) words += " and " + toWords(paise) + " Paise";
  return words + " Only";
}

/** Format date as "Apr 4 2026  10:07AM" */
function formatDate(iso) {
  const d = iso ? new Date(iso) : new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  let hours = d.getHours();
  const mins = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${month} ${day} ${year}  ${hours}:${mins}${ampm}`;
}

/** Format NIT/Tender date as DD-MM-YYYY */
function formatTenderDate(val) {
  if (!val) return "-";
  // Already formatted
  if (/^\d{2}-\d{2}-\d{4}$/.test(val)) return val;
  // ISO date input (YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}/.test(val)) {
    const [y, m, d] = val.split("T")[0].split("-");
    return `${d}-${m}-${y}`;
  }
  return val;
}

/** Current financial year e.g. 2026-2027 */
function financialYear(iso) {
  const d = iso ? new Date(iso) : new Date();
  const y = d.getFullYear();
  const m = d.getMonth() + 1; // 1-based
  const fy = m >= 4 ? y : y - 1;
  return `${fy}-${fy + 1}`;
}

/** Load an image URL as a base-64 data URL */
async function loadImageAsDataURL(src) {
  const res = await fetch(src);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// ── main export ────────────────────────────────────────────────────────────

/**
 * Generate and download a JMC payment receipt PDF.
 *
 * @param {Object} receipt  - The receipt state object from PayOnline.jsx
 * @param {Object} formData - The raw form values the user filled in
 */
export async function generateReceiptPDF(receipt, formData = {}) {
  // ── 1. Compute all display values ──────────────────────────────────────
  const receiptNo = receipt.orderId || receipt.receiptId || "-";
  const dateOfIssue = formatDate(receipt.createdAt || receipt.completedAt);
  const receivedFrom = (
    receipt.customerName ||
    formData.name ||
    "-"
  ).toUpperCase();
  const parentage = (formData.parentage || "-").toUpperCase();
  const nitNo = (formData.nitTenderNo || "-").toUpperCase();
  const nitDate = formatTenderDate(formData.nitTenderDate);
  const nitDetails = (
    formData.nitTenderDetails ||
    formData.payDetails ||
    formData.feeType ||
    "-"
  ).toUpperCase();
  const address = (formData.address || "-").toUpperCase();
  const amount = parseFloat(receipt.amount || formData.amount || 0).toFixed(2);
  const amountWords = amountToWords(amount);
  const vide = "Online Payment";
  const forYear = financialYear(receipt.createdAt);
  const transId = receipt.transactionId || "-";
  const feeTypeLabel =
    receipt.feeType === "TENDER_FEE"
      ? "Tender Fee"
      : receipt.feeType === "OTHER_FEE"
        ? "Other Fee"
        : receipt.feeType || "JMC Fee";

  // Dept/zone for Other Fee
  const dept = formData.dept || "";
  const zone = formData.location || "";
  const extraLine =
    dept && dept !== "Select Department"
      ? `${dept}${zone && zone !== "Select Zone" ? ` | ${zone}` : ""}`
      : "";

  // ── 2. QR code ────────────────────────────────────────────────────────
  const qrData = [
    `Receipt: ${receiptNo}`,
    `TxnID: ${transId}`,
    `Amount: Rs.${amount}`,
    `Date: ${dateOfIssue}`,
    `Payer: ${receivedFrom}`,
  ].join("\n");

  const qrDataUrl = await QRCode.toDataURL(qrData, {
    width: 120,
    margin: 1,
    color: { dark: "#000000", light: "#ffffff" },
  });

  // ── 3. Logo ────────────────────────────────────────────────────────────
  let logoDataUrl = null;
  try {
    logoDataUrl = await loadImageAsDataURL("/logo.jpeg");
  } catch (_) {
    // proceed without logo
  }

  // ── 4. Build PDF ───────────────────────────────────────────────────────
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const PW = doc.internal.pageSize.getWidth(); // 210
  // const PH = doc.internal.pageSize.getHeight()  // 297

  const MARGIN = 14;
  const COL_W = (PW - MARGIN * 2) / 2; // half-width for two-col rows

  // ── Page border ───────────────────────────────────────────────────────
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.5);
  doc.rect(MARGIN - 4, MARGIN - 4, PW - (MARGIN - 4) * 2, 265);

  // ── Header ────────────────────────────────────────────────────────────
  const HEADER_H = 38;

  // Logo (left)
  if (logoDataUrl) {
    doc.addImage(logoDataUrl, "JPEG", MARGIN - 2, MARGIN + 1, 28, 28);
  }

  // Title block (center/right)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(0, 51, 102); // JMC navy
  doc.text("JAMMU MUNICIPAL CORPORATION", PW / 2 + 8, MARGIN + 11, {
    align: "center",
  });

  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text("TOWN HALL, JAMMU.", PW / 2 + 8, MARGIN + 19, { align: "center" });

  // Thin rule under header
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.4);
  doc.line(
    MARGIN - 2,
    MARGIN + HEADER_H - 2,
    PW - MARGIN + 2,
    MARGIN + HEADER_H - 2,
  );

  // ── Receipt type label (subtle) ────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(
    `Payment Receipt  —  ${feeTypeLabel}`,
    PW / 2,
    MARGIN + HEADER_H + 3,
    { align: "center" },
  );

  // ── Data rows ─────────────────────────────────────────────────────────
  let Y = MARGIN + HEADER_H + 9;

  const LABEL_COLOR = [80, 80, 80];
  const VALUE_COLOR = [0, 0, 0];
  const ROW_GAP = 10; // vertical gap between rows
  const LABEL_FONT = 9;
  const VALUE_FONT = 9.5;
  const LABEL_X = MARGIN;
  const VALUE_X = MARGIN + 34; // indent for value in first col
  const COL2_LABEL_X = MARGIN + COL_W + 4;
  const COL2_VALUE_X = MARGIN + COL_W + 36;

  /** Draw a label + value pair, optional bold value */
  function row(label, value, x, lx, vx, y, bold = true) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(LABEL_FONT);
    doc.setTextColor(...LABEL_COLOR);
    doc.text(label, lx, y);

    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(VALUE_FONT);
    doc.setTextColor(...VALUE_COLOR);
    // Wrap long text within remaining width
    const maxW = PW - MARGIN - vx - 2;
    const lines = doc.splitTextToSize(value, maxW);
    doc.text(lines, vx, y);
    return lines.length > 1 ? (lines.length - 1) * (VALUE_FONT * 0.45) : 0;
  }

  // ── Row 1: Receipt No + Date of Issue ────────────────────────────────
  row("Receipt No.:", receiptNo, LABEL_X, LABEL_X, VALUE_X, Y);
  row(
    "Date of Issue",
    dateOfIssue,
    COL2_LABEL_X,
    COL2_LABEL_X,
    COL2_VALUE_X,
    Y,
  );
  Y += ROW_GAP;

  // ── Row 2: Received From + Parentage ─────────────────────────────────
  const extraH2 = row(
    "Received From:",
    receivedFrom,
    LABEL_X,
    LABEL_X,
    VALUE_X,
    Y,
  );
  row("Parentage:", parentage, COL2_LABEL_X, COL2_LABEL_X, COL2_VALUE_X, Y);
  Y += ROW_GAP + extraH2;

  // ── Row 3: NIT/Tender No + NIT/Tender Date (only for TENDER_FEE) ─────
  if (receipt.feeType === "TENDER_FEE") {
    row("NIT/Tender No.:", nitNo, LABEL_X, LABEL_X, VALUE_X, Y);
    row(
      "NIT/Tender Date",
      nitDate,
      COL2_LABEL_X,
      COL2_LABEL_X,
      COL2_VALUE_X,
      Y,
    );
    Y += ROW_GAP;

    // ── Row 4: NIT/Tender Details ───────────────────────────────────────
    doc.setFont("helvetica", "bold");
    doc.setFontSize(LABEL_FONT);
    doc.setTextColor(...LABEL_COLOR);
    doc.text("NIT/Tender Details:", LABEL_X, Y);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(VALUE_FONT);
    doc.setTextColor(...VALUE_COLOR);
    const detailLines = doc.splitTextToSize(
      nitDetails,
      PW - MARGIN - VALUE_X - 4,
    );
    doc.text(detailLines, VALUE_X, Y);
    Y += ROW_GAP + (detailLines.length > 1 ? (detailLines.length - 1) * 5 : 0);
  } else {
    // For OTHER_FEE show type of fee / dept
    if (extraLine) {
      row("Department:", extraLine.toUpperCase(), LABEL_X, LABEL_X, VALUE_X, Y);
      Y += ROW_GAP;
    }
    row("Fee Details:", nitDetails, LABEL_X, LABEL_X, VALUE_X, Y);
    Y += ROW_GAP;
  }

  // ── Row: Address ───────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(LABEL_FONT);
  doc.setTextColor(...LABEL_COLOR);
  doc.text("Address:", LABEL_X, Y);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(VALUE_FONT);
  doc.setTextColor(...VALUE_COLOR);
  const addrLines = doc.splitTextToSize(address, PW - MARGIN - VALUE_X - 44);
  doc.text(addrLines, VALUE_X, Y);
  Y += ROW_GAP + (addrLines.length > 1 ? (addrLines.length - 1) * 4.5 : 0);

  // ── QR code (placed to the right from "Sum of Rs." down) ──────────────
  const QR_SIZE = 33;
  const QR_X = PW - MARGIN - QR_SIZE + 2;
  const QR_Y = Y - 1;
  doc.addImage(qrDataUrl, "PNG", QR_X, QR_Y, QR_SIZE, QR_SIZE);

  // ── Row: Sum of Rs. + Amount Words ─────────────────────────────────────
  row("Sum of Rs.", `${parseFloat(amount)}`, LABEL_X, LABEL_X, VALUE_X, Y);
  Y += ROW_GAP;

  const wordsLines = doc.splitTextToSize(amountWords, QR_X - VALUE_X - 4);
  row("In Words:", wordsLines.join(" "), LABEL_X, LABEL_X, VALUE_X, Y, false);
  Y += ROW_GAP + (wordsLines.length > 1 ? (wordsLines.length - 1) * 4.5 : 0);

  // ── Row: Vide ──────────────────────────────────────────────────────────
  row("Vide:", vide, LABEL_X, LABEL_X, VALUE_X, Y);
  Y += ROW_GAP;

  // ── Row: For the year ─────────────────────────────────────────────────
  row("For the year:", forYear, LABEL_X, LABEL_X, VALUE_X, Y);
  Y += ROW_GAP;

  // ── Row: Transaction ID (extra info) ──────────────────────────────────
  if (transId && transId !== "-") {
    row("Transaction ID:", transId, LABEL_X, LABEL_X, VALUE_X, Y);
    Y += ROW_GAP;
  }

  // ── Separator line ─────────────────────────────────────────────────────
  Y += 3;
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.3);
  doc.line(MARGIN - 2, Y, PW - MARGIN + 2, Y);
  Y += 6;

  // ── Footer note ────────────────────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 100, 100);
  doc.text(
    "This is a computer-generated receipt and does not require a physical signature.",
    PW / 2,
    Y,
    { align: "center" },
  );
  Y += 4.5;
  doc.text(
    "For queries, contact JMC Helpline: 1800-180-7207  |  Town Hall, Jammu — 180001",
    PW / 2,
    Y,
    { align: "center" },
  );

  // ── 5. Download ────────────────────────────────────────────────────────
  const filename = `JMC_Receipt_${receiptNo}.pdf`;
  doc.save(filename);
}
