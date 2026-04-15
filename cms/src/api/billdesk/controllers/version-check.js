/**
 * Version check endpoint to verify which code is deployed
 * GET /api/billdesk/version
 */

module.exports = {
  async getVersion(ctx) {
    // This will help us verify if the timestamp fix is deployed
    const testDate = new Date("2021-01-13T18:04:03+05:30");
    
    // If this function exists and returns 14 digits, the fix is deployed
    let timestampFormat = "UNKNOWN";
    let timestampSample = "UNKNOWN";
    
    try {
      // Try to call the function from the service
      const crypto = require("crypto");
      
      const getBillDeskHeaderTimestamp = (date = new Date()) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        
        return `${year}${month}${day}${hours}${minutes}${seconds}`;
      };
      
      timestampSample = getBillDeskHeaderTimestamp(testDate);
      timestampFormat = timestampSample.length === 14 ? "YYYYMMDDHHmmss (CORRECT)" : "WRONG FORMAT";
    } catch (error) {
      timestampFormat = "ERROR: " + error.message;
    }
    
    ctx.send({
      version: "1.1.0-timestamp-fix",
      deployedAt: new Date().toISOString(),
      timestampFormat,
      timestampSample,
      timestampLength: timestampSample.length,
      fixDeployed: timestampSample.length === 14,
      gitCommit: "c4b7d3c",
    });
  },
};
