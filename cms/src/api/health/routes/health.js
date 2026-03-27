'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/healthz',
      handler: 'health.check',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
