'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/neon-uploads/:key',
      handler: 'neon-upload.find',
      config: {
        auth: false,
      },
    },
  ],
};
