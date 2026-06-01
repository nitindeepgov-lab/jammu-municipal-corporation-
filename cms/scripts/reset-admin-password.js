const { createStrapi, compileStrapi } = require("@strapi/strapi");

async function main() {
  console.log("Initializing Strapi...");
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  
  try {
    const password = "AdminPassword123!";
    const targetEmails = ["nitindeep.gov@gmail.com", "captin.indian1989@gmail.com"];
    
    console.log("\nSearching for registered administrator accounts...");
    const hashedPassword = await app.service("admin::auth").hashPassword(password);
    
    for (const email of targetEmails) {
      const adminUser = await app.query("admin::user").findOne({
        where: { email }
      });
      
      if (adminUser) {
        console.log(`Found account: ${email}. Resetting password to: ${password}`);
        await app.query("admin::user").update({
          where: { id: adminUser.id },
          data: { password: hashedPassword }
        });
        console.log(`SUCCESS: Password reset for ${email}`);
      } else {
        console.log(`Account ${email} not found in this database.`);
      }
    }
    
    console.log("\n==================================================");
    console.log("SUCCESS: Password resetting completed!");
    console.log(`You can now log in locally using your standard emails`);
    console.log(`with the password: ${password}`);
    console.log("==================================================\n");
  } catch (error) {
    console.error("Error managing admin accounts:", error);
  } finally {
    process.exit(0);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
