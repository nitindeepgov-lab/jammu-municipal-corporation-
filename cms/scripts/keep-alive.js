#!/usr/bin/env node
"use strict";

/**
 * Database Keep-Alive Script
 *
 * Prevents Neon free tier from auto-suspending by pinging every 4 minutes
 *
 * Usage:
 *   Development: node scripts/keep-alive.js
 *   Production: pm2 start scripts/keep-alive.js --name "db-keep-alive"
 */

const http = require("http");

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1338";
const PING_INTERVAL = 4 * 60 * 1000; // 4 minutes (Neon suspends after 5 min)
const ENDPOINT = "/api/councillor-details?pagination[limit]=1";

let pingCount = 0;
let failCount = 0;

function ping() {
  const url = `${STRAPI_URL}${ENDPOINT}`;
  const startTime = Date.now();

  http
    .get(url, (res) => {
      const duration = Date.now() - startTime;
      pingCount++;

      if (res.statusCode === 200) {
        console.log(
          `✅ [${new Date().toISOString()}] Ping #${pingCount} successful (${duration}ms)`,
        );
        failCount = 0; // Reset fail count on success
      } else {
        failCount++;
        console.warn(
          `⚠️  [${new Date().toISOString()}] Ping #${pingCount} returned ${res.statusCode} (${duration}ms)`,
        );
      }
    })
    .on("error", (error) => {
      failCount++;
      console.error(
        `❌ [${new Date().toISOString()}] Ping #${pingCount} failed:`,
        error.message,
      );

      if (failCount >= 3) {
        console.error(`\n🚨 ALERT: ${failCount} consecutive failures!`);
        console.error("   Check if Strapi is running and accessible.\n");
      }
    });
}

// Initial ping
console.log("🚀 Database Keep-Alive Started");
console.log(`   Target: ${STRAPI_URL}${ENDPOINT}`);
console.log(`   Interval: ${PING_INTERVAL / 1000} seconds\n`);

ping();

// Schedule recurring pings
setInterval(ping, PING_INTERVAL);

// Graceful shutdown
process.on("SIGINT", () => {
  console.log(`\n\n📊 Keep-Alive Statistics:`);
  console.log(`   Total pings: ${pingCount}`);
  console.log(`   Failed pings: ${failCount}`);
  console.log(
    `   Success rate: ${(((pingCount - failCount) / pingCount) * 100).toFixed(1)}%`,
  );
  console.log("\n👋 Keep-Alive stopped\n");
  process.exit(0);
});
