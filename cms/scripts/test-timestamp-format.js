/**
 * Test script to verify BillDesk timestamp format
 * Run: node scripts/test-timestamp-format.js
 */

function getBillDeskHeaderTimestamp(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

// Test with known date
const testDate = new Date("2021-01-13T18:04:03+05:30");
const timestamp = getBillDeskHeaderTimestamp(testDate);

console.log("Test Date:", testDate.toISOString());
console.log("Generated Timestamp:", timestamp);
console.log("Expected Format:", "20210113180403");
console.log("Match:", timestamp === "20210113180403" ? "✅ PASS" : "❌ FAIL");
console.log("");
console.log("Current Timestamp:", getBillDeskHeaderTimestamp());
console.log("Length:", getBillDeskHeaderTimestamp().length, "(should be 14)");
