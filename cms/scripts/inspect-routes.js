'use strict';

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  console.log('--- REGISTERED ROUTES ---');
  if (typeof app.server.listRoutes === 'function') {
    const routes = app.server.listRoutes();
    console.log(`Found ${routes.length} total routes`);
    
    // Print the first 15 routes
    routes.slice(0, 15).forEach(r => {
      console.log(`${r.method} ${r.path} (${r.info?.type || 'unknown'})`);
    });

    console.log('--- SEARCHING FOR CONTACT STRIP ---');
    routes.forEach(r => {
      if (r.path.toLowerCase().includes('contact')) {
        console.log(`MATCH: ${r.method} ${r.path}`);
      }
    });
  } else {
    console.log('listRoutes is not a function');
  }
  process.exit(0);
}

main().catch(console.error);
