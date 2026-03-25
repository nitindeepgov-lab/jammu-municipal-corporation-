"use strict";

/**
 * Database Health Check Script
 *
 * Checks if data persists in Neon database and diagnoses issues
 *
 * Usage: node scripts/check-db-health.js
 */

async function checkHealth() {
  console.log("🔍 Checking Database Health...\n");

  const { createStrapi, compileStrapi } = require("@strapi/strapi");

  try {
    const appContext = await compileStrapi();
    const app = await createStrapi(appContext).load();
    app.log.level = "error";

    // Check database connection
    console.log("✅ Database connection: OK");
    console.log(`   Client: ${app.db.connection.client.config.client}`);
    console.log(
      `   Database: ${app.db.connection.client.config.connection.database || "N/A"}`,
    );

    // Check councillor data
    const councillors = await app.db
      .query("api::councillor-detail.councillor-detail")
      .findMany();

    console.log(`\n📊 Councillor Records: ${councillors.length}/75`);

    if (councillors.length === 0) {
      console.log("   ⚠️  NO DATA FOUND! Run: npm run seed:councillors");
    } else if (councillors.length < 75) {
      console.log("   ⚠️  INCOMPLETE DATA! Expected 75 records.");
    } else {
      console.log("   ✅ All councillor data present");
    }

    // Check published status
    const published = councillors.filter((c) => c.publishedAt !== null);
    console.log(
      `\n📢 Published Records: ${published.length}/${councillors.length}`,
    );

    if (published.length < councillors.length) {
      console.log("   ⚠️  Some records are not published!");
      console.log(
        "   Fix: Go to Strapi Admin → Content Manager → Councillor Details",
      );
      console.log('        Select all unpublished entries and click "Publish"');
    }

    // Check permissions
    const publicRole = await app.db
      .query("plugin::users-permissions.role")
      .findOne({ where: { type: "public" } });

    if (publicRole) {
      console.log(`\n🔐 Public Role: Found (ID: ${publicRole.id})`);
      console.log("   ⚠️  Verify permissions in Strapi Admin:");
      console.log("       Settings → Roles → Public → Councillor-detail");
      console.log("       Enable: find, findOne");
    }

    // Sample data check
    if (councillors.length > 0) {
      const sample = councillors[0];
      console.log(`\n📝 Sample Record (Ward ${sample.ward_no}):`);
      console.log(`   Name: ${sample.name}`);
      console.log(`   Party: ${sample.party_name || "N/A"}`);
      console.log(`   Published: ${sample.publishedAt ? "Yes" : "No"}`);
      console.log(`   Photo: ${sample.photo ? "Yes" : "No"}`);
    }

    // Database info
    const dbConfig = app.db.connection.client.config.connection;
    console.log(`\n🗄️  Database Configuration:`);
    console.log(`   Host: ${dbConfig.host || "From connection string"}`);
    console.log(`   SSL: ${dbConfig.ssl ? "Enabled" : "Disabled"}`);
    console.log(`   Pool Min: ${app.db.connection.client.pool.min}`);
    console.log(`   Pool Max: ${app.db.connection.client.pool.max}`);

    console.log("\n✨ Health check complete!\n");

    if (councillors.length === 75 && published.length === 75) {
      console.log("🎉 Everything looks good! Your data should persist.");
    } else {
      console.log("⚠️  Issues detected. Follow the recommendations above.");
    }

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Health check failed:", error.message);
    console.error("\nFull error:", error);
    process.exit(1);
  }
}

checkHealth();
