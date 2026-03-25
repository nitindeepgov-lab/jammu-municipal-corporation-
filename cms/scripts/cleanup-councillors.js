#!/usr/bin/env node
"use strict";

/**
 * Cleanup Councillor Duplicates and Publish All
 *
 * Removes duplicate councillor entries and publishes all valid ones
 *
 * Usage: node scripts/cleanup-councillors.js
 */

async function cleanup() {
  console.log("🧹 Cleaning up Councillor Data...\n");

  const { createStrapi, compileStrapi } = require("@strapi/strapi");
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = "error";

  const uid = "api::councillor-detail.councillor-detail";

  try {
    // Get all councillors
    const allCouncillors = await app.db.query(uid).findMany();
    console.log(`📊 Found ${allCouncillors.length} total records\n`);

    // Group by ward number
    const byWard = {};
    for (const c of allCouncillors) {
      const ward = c.ward_no;
      if (!byWard[ward]) {
        byWard[ward] = [];
      }
      byWard[ward].push(c);
    }

    let deleted = 0;
    let published = 0;
    let kept = 0;

    // Process each ward
    for (const ward of Object.keys(byWard).sort(
      (a, b) => Number(a) - Number(b),
    )) {
      const entries = byWard[ward];

      if (entries.length === 1) {
        // Single entry - just publish it
        const entry = entries[0];
        if (!entry.publishedAt) {
          await app.documents(uid).publish({ documentId: entry.documentId });
          console.log(`  ✅ Ward ${ward}: Published`);
          published++;
        } else {
          console.log(`  ✓  Ward ${ward}: Already published`);
        }
        kept++;
      } else {
        // Multiple entries - keep the most recent, delete others
        entries.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        const toKeep = entries[0];
        const toDelete = entries.slice(1);

        // Publish the one we're keeping
        if (!toKeep.publishedAt) {
          await app.documents(uid).publish({ documentId: toKeep.documentId });
          published++;
        }

        // Delete duplicates
        for (const dup of toDelete) {
          await app.documents(uid).delete({ documentId: dup.documentId });
          deleted++;
        }

        console.log(
          `  🗑️  Ward ${ward}: Kept 1, deleted ${toDelete.length} duplicate(s)`,
        );
        kept++;
      }
    }

    console.log(`\n✨ Cleanup complete!`);
    console.log(`   Kept: ${kept} records`);
    console.log(`   Published: ${published} records`);
    console.log(`   Deleted: ${deleted} duplicates\n`);

    // Final verification
    const final = await app.db.query(uid).findMany();
    const finalPublished = final.filter((c) => c.publishedAt !== null);

    console.log(`📊 Final Status:`);
    console.log(`   Total records: ${final.length}/75`);
    console.log(`   Published: ${finalPublished.length}/${final.length}`);

    if (final.length === 75 && finalPublished.length === 75) {
      console.log(
        `\n🎉 Perfect! All 75 councillors are present and published!\n`,
      );
    } else {
      console.log(`\n⚠️  Some issues remain. Run: npm run check:db\n`);
    }

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Cleanup failed:", error.message);
    console.error(error);
    process.exit(1);
  }
}

cleanup();
