const { createStrapi, compileStrapi } = require("@strapi/strapi");

const DEFAULT_SEED = [
  {
    name: "Chand Singh, JKAS",
    designation: "Secretary, JMC",
    rti_role: "PIO",
    mobile: "",
    email: "",
    office_phone: "",
    order: 1,
  },
  {
    name: "Rajeev Khajuria, JKAS",
    designation: "Joint Commissioner (Adm.)",
    rti_role: "First Appellate Authority",
    mobile: "",
    email: "",
    office_phone: "",
    order: 2,
  },
  {
    name: "Mr. Devansh Yadav, IAS",
    designation: "Municipal Commissioner",
    rti_role: "Second Appellate Authority",
    mobile: "",
    email: "",
    office_phone: "",
    order: 3,
  },
];

async function main() {
  console.log("Initializing Strapi for seeding officials...");
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  try {
    // Allow overriding seed via local JSON file if present
    let seed = DEFAULT_SEED;
    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      // If cms/scripts/officials-seed.json exists, use it
      // This file should export an array of official objects
      // Example: [{ name: 'Foo', designation: 'Bar', mobile: '123' }]
      // We attempt to require it but ignore failures
      // so the script remains safe when the file is absent.
      // Use require instead of fs for convenience in Node environments.
      // eslint-disable-next-line node/no-missing-require
      // eslint-disable-next-line import/no-unresolved
      // eslint-disable-next-line no-undef
      const userSeed = require("./officials-seed.json");
      if (Array.isArray(userSeed) && userSeed.length > 0) {
        seed = userSeed;
        console.log(`Loaded ${seed.length} records from officials-seed.json`);
      }
    } catch (err) {
      // ignore — use default seed
    }

    for (const record of seed) {
      const name = String(record.name || "").trim();
      if (!name) continue;

      // Check existing by name (idempotent)
      const existing = await app.query("api::official.official").findOne({
        where: { name },
      });

      const data = {
        name: record.name,
        designation: record.designation || "",
        mobile: record.mobile || "",
        email: record.email || "",
        office_phone: record.office_phone || "",
        order: typeof record.order === "number" ? record.order : 0,
        rti_role: record.rti_role || null,
        message: record.message || null,
      };

      if (existing) {
        await app.query("api::official.official").update({
          where: { id: existing.id },
          data,
        });
        console.log(`Updated official: ${name}`);
      } else {
        await app.query("api::official.official").create({
          data,
        });
        console.log(`Created official: ${name}`);
      }
    }

    console.log("Seeding complete.");
  } catch (err) {
    console.error("Error seeding officials:", err);
    process.exitCode = 1;
  } finally {
    process.exit(0);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
