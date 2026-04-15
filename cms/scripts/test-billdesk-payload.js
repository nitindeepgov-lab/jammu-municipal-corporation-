/**
 * Test BillDesk payload generation and JOSE token creation
 * Run: node scripts/test-billdesk-payload.js
 */

require("dotenv").config();
const crypto = require("crypto");

function getBillDeskTimestamp(date = new Date()) {
  const istOffsetMinutes = 330;
  const shifted = new Date(date.getTime() + istOffsetMinutes * 60 * 1000);

  const year = shifted.getUTCFullYear();
  const month = String(shifted.getUTCMonth() + 1).padStart(2, "0");
  const day = String(shifted.getUTCDate()).padStart(2, "0");
  const hours = String(shifted.getUTCHours()).padStart(2, "0");
  const minutes = String(shifted.getUTCMinutes()).padStart(2, "0");
  const seconds = String(shifted.getUTCSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+05:30`;
}

function getBillDeskHeaderTimestamp(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

function getBillDeskTraceId() {
  return crypto.randomBytes(16).toString("hex").toUpperCase();
}

// Test configuration
const config = {
  merchantId: process.env.BILLDESK_MERCHANT_ID,
  clientId: process.env.BILLDESK_CLIENT_ID,
  signingKey: process.env.BILLDESK_SIGNING_KEY,
  encryptionKey: process.env.BILLDESK_ENCRYPTION_KEY,
  env: process.env.BILLDESK_ENV || "UAT",
};

console.log("=== BillDesk Configuration ===");
console.log("Merchant ID:", config.merchantId);
console.log("Client ID:", config.clientId);
console.log("Signing Key:", config.signingKey ? `${config.signingKey.slice(0, 8)}...` : "MISSING");
console.log("Encryption Key:", config.encryptionKey ? `${config.encryptionKey.slice(0, 8)}...` : "MISSING");
console.log("Environment:", config.env);
console.log("");

// Test payload
const orderId = `JMC${Date.now()}${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
const orderPayload = {
  mercid: config.merchantId,
  orderid: orderId,
  amount: "10.00",
  order_date: getBillDeskTimestamp(),
  currency: "356",
  ru: "https://jammu-municipal-corporation.vercel.app/payment-status",
  additional_info: ["JMC_FEE", "test", "NA", "NA", "NA", "NA", "NA"],
  itemcode: "DIRECT",
  device: {
    init_channel: "internet",
    ip: "0.0.0.0",
    user_agent: "Mozilla/5.0",
  },
};

console.log("=== Order Payload ===");
console.log(JSON.stringify(orderPayload, null, 2));
console.log("");

// Test headers
const traceId = getBillDeskTraceId();
const timestamp = getBillDeskHeaderTimestamp();

console.log("=== Request Headers ===");
console.log("BD-Traceid:", traceId);
console.log("BD-Traceid Length:", traceId.length);
console.log("BD-Timestamp:", timestamp);
console.log("BD-Timestamp Length:", timestamp.length);
console.log("BD-Timestamp Format:", timestamp.length === 14 ? "✅ CORRECT" : "❌ WRONG");
console.log("");

// Validate payload
console.log("=== Payload Validation ===");
console.log("mercid present:", !!orderPayload.mercid);
console.log("orderid present:", !!orderPayload.orderid);
console.log("amount format:", orderPayload.amount, "(should have 2 decimals)");
console.log("order_date format:", orderPayload.order_date, "(should be ISO with +05:30)");
console.log("currency:", orderPayload.currency, "(should be 356 for INR)");
console.log("additional_info length:", orderPayload.additional_info.length, "(should be 7)");
console.log("itemcode:", orderPayload.itemcode, "(should be DIRECT)");
console.log("");

// Check for potential issues
console.log("=== Potential Issues ===");
const issues = [];

if (!config.merchantId) issues.push("❌ BILLDESK_MERCHANT_ID missing");
if (!config.clientId) issues.push("❌ BILLDESK_CLIENT_ID missing");
if (!config.signingKey) issues.push("❌ BILLDESK_SIGNING_KEY missing");
if (!config.encryptionKey) issues.push("❌ BILLDESK_ENCRYPTION_KEY missing");
if (timestamp.length !== 14) issues.push("❌ BD-Timestamp wrong length");
if (orderPayload.additional_info.length !== 7) issues.push("❌ additional_info should have 7 elements");
if (!orderPayload.amount.includes(".")) issues.push("⚠️  amount should have decimal point");

if (issues.length === 0) {
  console.log("✅ No issues found - payload looks good!");
} else {
  issues.forEach(issue => console.log(issue));
}
