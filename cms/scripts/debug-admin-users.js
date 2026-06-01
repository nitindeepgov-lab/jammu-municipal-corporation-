const { createStrapi, compileStrapi } = require("@strapi/strapi");

async function main() {
  console.log("Loading Strapi for debugging...");
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  
  try {
    const dbConfig = app.config.get("database.connection.connection");
    console.log("\nDatabase Client:", app.config.get("database.connection.client"));
    console.log("Database Name:", dbConfig?.database || "Using connection string");
    console.log("Database Host:", dbConfig?.host || "Using connection string");
    
    const count = await app.query("admin::user").count({});
    console.log("\nTotal admin users count:", count);
    
    const users = await app.query("admin::user").findMany({});
    console.log("\nRegistered Admin Users:");
    users.forEach(u => {
      console.log(`- ID: ${u.id}, Email: ${u.email}, Name: ${u.firstname} ${u.lastname}, Active: ${u.isActive}`);
    });
    console.log("\n==================================================\n");
  } catch (error) {
    console.error("Diagnostic error:", error);
  } finally {
    process.exit(0);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
