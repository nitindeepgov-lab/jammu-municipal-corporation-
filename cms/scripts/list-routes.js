'use strict';

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  console.log('--- ALL REGISTERED API ROUTES ---');
  
  // In Strapi v4/v5, routes are registered in app.server.router or similar, or app.server.listRoutes()
  if (typeof app.server.listRoutes === 'function') {
    const routes = app.server.listRoutes();
    console.log(`Found ${routes.length} routes:`);
    routes.forEach(r => {
      console.log(`${r.method} ${r.path}`);
    });
  } else {
    // Fallback: list through router
    const routes = [];
    app.server.router.stack.forEach(layer => {
      if (layer.route) {
        routes.push({
          method: Object.keys(layer.route.methods).join(',').toUpperCase(),
          path: layer.route.path
        });
      }
    });
    console.log(`Found ${routes.length} routes via router stack:`);
    routes.forEach(r => console.log(`${r.method} ${r.path}`));
  }
  process.exit(0);
}

main().catch(console.error);
