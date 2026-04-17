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
      return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "") + " ";
    return ones[Math.floor(n / 100)] + " Hundred " + convertLessThanThousand(n % 100);
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
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
  if (/^\d{2}-\d{2}-\d{4}$/.test(val)) return val;
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
 * @param {Object} receipt  - The receipt state object from PayOnline.jsx / PaymentStatus.jsx
 * @param {Object} formData - The raw form values (parentage, address, nitTenderNo, etc.)
 */
export async function generateReceiptPDF(receipt, formData = {}) {
  // ── 1. Compute all display values ──────────────────────────────────────
  //
  // Data can arrive via two paths:
  //   A) PayOnline inline:   receipt has customerName, formData is formSnapshot
  //   B) PaymentStatus page: receipt has customerName from DB, formData is additionalInfo
  //      (additionalInfo = the raw form object with keys: name, parentage, address, etc.)
  //
  // We try both path variants so the PDF always populates correctly.

  // Debug: log exactly what we received so any future issues are easy to trace
  console.log("[generateReceiptPDF] receipt:", {
    orderId:      receipt.orderId || receipt.receiptId,
    customerName: receipt.customerName,
    feeType:      receipt.feeType,
    status:       receipt.status,
    amount:       receipt.amount,
  });
  console.log("[generateReceiptPDF] formData keys:", Object.keys(formData || {}));

  const receiptNo    = receipt.orderId || receipt.receiptId || "-";
  const dateOfIssue  = formatDate(receipt.createdAt || receipt.completedAt);

  // "Received From" — try receipt.customerName first, then form key variants
  const receivedFrom = (
    receipt.customerName   ||  // set at order creation time
    formData.name          ||  // form key for PayOnline / additionalInfo
    formData.customerName  ||  // fallback
    "-"
  ).toUpperCase();

  // "Parentage" — only in formData
  const parentage    = (
    formData.parentage    ||
    formData.fatherName   ||
    "-"
  ).toUpperCase();

  // NIT/Tender fields
  const nitNo        = (formData.nitTenderNo     || formData.nit_tender_no    || "-").toUpperCase();
  const nitDate      = formatTenderDate(formData.nitTenderDate || formData.nit_tender_date);
  const nitDetails   = (
    formData.nitTenderDetails || formData.nit_tender_details ||
    formData.payDetails       ||
    formData.feeType          ||
    "-"
  ).toUpperCase();

  // Address
  const address      = (
    formData.address  ||
    receipt.address   ||
    "-"
  ).toUpperCase();

  const amount       = parseFloat(receipt.amount || formData.amount || 0).toFixed(2);
  const amountWords  = amountToWords(amount);
  const vide         = "Online Payment";
  const forYear      = financialYear(receipt.createdAt);
  const transId      = receipt.transactionId || "-";
  const feeTypeLabel =
    receipt.feeType === "TENDER_FEE" ? "Tender Fee"
    : receipt.feeType === "OTHER_FEE" ? "Other Fee"
    : receipt.feeType || "JMC Fee";

  // Payment status — drives the coloured stamp
  const rawStatus    = (receipt.status || receipt.statusMessage || "").toUpperCase();
  const paymentStatus =
    rawStatus === "SUCCESS" || rawStatus === "0300" ? "PAYMENT SUCCESSFUL"
    : rawStatus === "PENDING" || rawStatus === "0002" ? "PAYMENT PENDING"
    : rawStatus === "FAILED" ? "PAYMENT FAILED"
    : "PAYMENT SUCCESSFUL"; // Only SUCCESS receipts should ever be generated

  // Dept/zone for Other Fee
  const dept      = formData.dept || "";
  const zone      = formData.location || "";
  const extraLine =
    dept && dept !== "Select Department"
      ? `${dept}${zone && zone !== "Select Zone" ? ` | ${zone}` : ""}`
      : "";

  // ── 2. QR code ────────────────────────────────────────────────────────
  // Format:  Name | Father Name | Receipt No | Date of Issue
  const qrData = [
    receivedFrom !== "-" ? receivedFrom : "N/A",
    parentage    !== "-" ? parentage    : "N/A",
    receiptNo,
    dateOfIssue,
  ].join(" | ");

  const qrDataUrl = await QRCode.toDataURL(qrData, {
    width: 140,
    margin: 1,
    errorCorrectionLevel: "M",
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

  const PW = doc.internal.pageSize.getWidth(); // 210 mm

  const MARGIN       = 14;
  const COL_W        = (PW - MARGIN * 2) / 2;  // half-width for two-col layout

  // ── Page border ───────────────────────────────────────────────────────
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.5);
  doc.rect(MARGIN - 4, MARGIN - 4, PW - (MARGIN - 4) * 2, 270);

  // ── Header ────────────────────────────────────────────────────────────
  const HEADER_H = 38;

  // Logo (left)
  if (logoDataUrl) {
    doc.addImage(logoDataUrl, "JPEG", MARGIN - 2, MARGIN + 1, 28, 28);
  }

  // Title block (center/right of logo)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(0, 51, 102);
  doc.text("JAMMU MUNICIPAL CORPORATION", PW / 2 + 8, MARGIN + 11, { align: "center" });

  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text("TOWN HALL, JAMMU.", PW / 2 + 8, MARGIN + 19, { align: "center" });

  // Thin rule under header
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.4);
  doc.line(MARGIN - 2, MARGIN + HEADER_H - 2, PW - MARGIN + 2, MARGIN + HEADER_H - 2);

  // Receipt type label (subtle)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(`Payment Receipt  —  ${feeTypeLabel}`, PW / 2, MARGIN + HEADER_H + 3, { align: "center" });

  // ── Layout constants ──────────────────────────────────────────────────
  let Y = MARGIN + HEADER_H + 9;

  const LABEL_COLOR  = [80, 80, 80];
  const VALUE_COLOR  = [0, 0, 0];
  const ROW_GAP      = 10;   // vertical spacing between rows (mm)
  const LABEL_FONT   = 9;
  const VALUE_FONT   = 9.5;

  // Column 1
  const LABEL_X  = MARGIN;
  const VALUE_X  = MARGIN + 34;

  // Column 2
  const C2_LABEL = MARGIN + COL_W + 4;
  const C2_VALUE = MARGIN + COL_W + 36;

  /**
   * Draw one label + value row.
   * Returns extra vertical space consumed by multi-line values.
   *
   * @param {string}  label  - Bold label text
   * @param {string}  value  - Value text
   * @param {number}  lx     - Label x position (mm)
   * @param {number}  vx     - Value x position (mm)
   * @param {number}  y      - Vertical position (mm)
   * @param {boolean} bold   - Whether value should be bold (default true)
   * @param {number}  maxW   - Override max width for wrapping (optional)
   */
  function drawRow(label, value, lx, vx, y, bold = true, maxW = null) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(LABEL_FONT);
    doc.setTextColor(...LABEL_COLOR);
    doc.text(label, lx, y);

    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(VALUE_FONT);
    doc.setTextColor(...VALUE_COLOR);
    const wrapWidth = maxW !== null ? maxW : PW - MARGIN - vx - 2;
    const lines = doc.splitTextToSize(String(value), wrapWidth);
    doc.text(lines, vx, y);
    return lines.length > 1 ? (lines.length - 1) * (VALUE_FONT * 0.45) : 0;
  }

  // ── Row 1: Receipt No  +  Date of Issue ──────────────────────────────
  drawRow("Receipt No.:", receiptNo, LABEL_X, VALUE_X, Y);
  drawRow("Date of Issue", dateOfIssue, C2_LABEL, C2_VALUE, Y);
  Y += ROW_GAP;

  // ── Row 2: Received From  +  Parentage ───────────────────────────────
  const extraH2 = drawRow("Received From:", receivedFrom, LABEL_X, VALUE_X, Y);
  drawRow("Parentage:", parentage, C2_LABEL, C2_VALUE, Y);
  Y += ROW_GAP + extraH2;

  // ── Row 3+ (fee-type specific) ────────────────────────────────────────
  if (receipt.feeType === "TENDER_FEE") {
    // NIT/Tender No  +  NIT/Tender Date
    drawRow("NIT/Tender No.:", nitNo, LABEL_X, VALUE_X, Y);
    drawRow("NIT/Tender Date", nitDate, C2_LABEL, C2_VALUE, Y);
    Y += ROW_GAP;

    // NIT/Tender Details (full width)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(LABEL_FONT);
    doc.setTextColor(...LABEL_COLOR);
    doc.text("NIT/Tender Details:", LABEL_X, Y);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(VALUE_FONT);
    doc.setTextColor(...VALUE_COLOR);
    const detailLines = doc.splitTextToSize(nitDetails, PW - MARGIN - VALUE_X - 4);
    doc.text(detailLines, VALUE_X, Y);
    Y += ROW_GAP + (detailLines.length > 1 ? (detailLines.length - 1) * 5 : 0);
  } else {
    // Other Fee — show dept/zone if present
    if (extraLine) {
      drawRow("Department:", extraLine.toUpperCase(), LABEL_X, VALUE_X, Y);
      Y += ROW_GAP;
    }
    drawRow("Fee Details:", nitDetails, LABEL_X, VALUE_X, Y);
    Y += ROW_GAP;
  }

  // ── Row: Address (full width, leaves space for QR code on right later) ─
  const addrMaxW = PW - MARGIN - VALUE_X - 44; // leave room for QR
  doc.setFont("helvetica", "bold");
  doc.setFontSize(LABEL_FONT);
  doc.setTextColor(...LABEL_COLOR);
  doc.text("Address:", LABEL_X, Y);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(VALUE_FONT);
  doc.setTextColor(...VALUE_COLOR);
  const addrLines = doc.splitTextToSize(address, addrMaxW);
  doc.text(addrLines, VALUE_X, Y);
  Y += ROW_GAP + (addrLines.length > 1 ? (addrLines.length - 1) * 4.5 : 0);

  // ── QR code (right side, aligned from current Y) ──────────────────────
  const QR_SIZE = 35;
  const QR_X = PW - MARGIN - QR_SIZE + 2;
  const QR_Y = Y - 1;
  doc.addImage(qrDataUrl, "PNG", QR_X, QR_Y, QR_SIZE, QR_SIZE);

  // ── Row: Sum of Rs. ───────────────────────────────────────────────────
  drawRow("Sum of Rs.", `${parseFloat(amount)}`, LABEL_X, VALUE_X, Y);
  Y += ROW_GAP;

  // ── Row: In Words ─────────────────────────────────────────────────────
  const wordsMaxW = QR_X - VALUE_X - 4;
  const wordsLines = doc.splitTextToSize(amountWords, wordsMaxW);
  drawRow("In Words:", wordsLines.join(" "), LABEL_X, VALUE_X, Y, false, wordsMaxW);
  Y += ROW_GAP + (wordsLines.length > 1 ? (wordsLines.length - 1) * 4.5 : 0);

  // ── Row: Vide ──────────────────────────────────────────────────────────
  drawRow("Vide:", vide, LABEL_X, VALUE_X, Y);
  Y += ROW_GAP;

  // ── Row: For the year ─────────────────────────────────────────────────
  drawRow("For the year:", forYear, LABEL_X, VALUE_X, Y);
  Y += ROW_GAP;

  // ── Row: Transaction ID ───────────────────────────────────────────────
  if (transId && transId !== "-") {
    drawRow("Transaction ID:", transId, LABEL_X, VALUE_X, Y);
    Y += ROW_GAP;
  }

  // ── Payment Status stamp ──────────────────────────────────────────────
  // Coloured pill that makes the payment result unmistakably clear
  Y += 2;
  const isSuccessStatus = paymentStatus === "PAYMENT SUCCESSFUL";
  const stampBgR = isSuccessStatus ? 220 : 254;
  const stampBgG = isSuccessStatus ? 252 : 202;
  const stampBgB = isSuccessStatus ? 231 :  13; // green-100 or red-100
  const stampTxtR = isSuccessStatus ?  22 : 153;
  const stampTxtG = isSuccessStatus ? 101 :  27;
  const stampTxtB = isSuccessStatus ?  52 :  27; // green-700 or red-700

  const stampW = 68;
  const stampH = 8;
  const stampX = LABEL_X;
  const stampY = Y - 5.5;

  // Rounded rectangle background
  doc.setFillColor(stampBgR, stampBgG, stampBgB);
  doc.setDrawColor(stampBgR, stampBgG, stampBgB);
  doc.roundedRect(stampX, stampY, stampW, stampH, 2, 2, "F");

  // Status text centred in the pill
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(stampTxtR, stampTxtG, stampTxtB);
  doc.text(paymentStatus, stampX + stampW / 2, stampY + 5.5, { align: "center" });

  Y += ROW_GAP + 2;

  // ── Separator line ─────────────────────────────────────────────────────
  Y += 2;
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.3);
  doc.line(MARGIN - 2, Y, PW - MARGIN + 2, Y);
  Y += 6;

  // ── Footer ────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 100, 100);
  doc.text(
    "This is a computer-generated receipt and does not require a physical signature.",
    PW / 2, Y, { align: "center" }
  );
  Y += 4.5;
  doc.text(
    "For queries, contact JMC Helpline: 1800-180-7207  |  Town Hall, Jammu — 180001",
    PW / 2, Y, { align: "center" }
  );

  // ── 5. Save / Download ─────────────────────────────────────────────────
  const filename = `JMC_Receipt_${receiptNo}.pdf`;
  doc.save(filename);
}
