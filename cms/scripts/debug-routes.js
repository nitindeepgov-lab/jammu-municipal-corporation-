'use strict';

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  console.log('--- ALL KOA ROUTER PATHS ---');
  
  // Traverse the server middlewares to find router middlewares
  const routerMiddlewares = app.server.app.middleware.filter(m => m.name === 'router' || m.router);
  console.log(`Found ${routerMiddlewares.length} router middlewares.`);

  // In Strapi v4/v5, routes are registered in API routers which are mounted.
  // We can access them through app.server.router or app.server.listRoutes() if implemented.
  // Let's print out all route paths that contain 'contact' or 'office'
  if (typeof app.server.listRoutes === 'function') {
    const routes = app.server.listRoutes();
    console.log(`Total listRoutes: ${routes.length}`);
    routes.forEach(r => {
      console.log(`${r.method} ${r.path}`);
    });
  } else {
    console.log('listRoutes is not a function');
  }

  // Let's inspect Koa server router directly
  const stack = app.server.router.stack;
  console.log(`Router stack has ${stack.length} layers:`);
  stack.forEach(layer => {
    console.log(`- Layer path: ${layer.path}, methods: ${layer.methods.join(', ')}`);
    // If it's a nested router, print its stack
    if (layer.opts && layer.opts.router) {
      console.log(`  Nested router stack has ${layer.opts.router.stack.length} layers`);
    }
  });

  process.exit(0);
}

main().catch(console.error);
