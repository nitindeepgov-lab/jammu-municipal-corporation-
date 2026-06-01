'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/visitor-count/current',
      handler: 'visitor-count.current',
      config: {
        auth: false,
        description: 'Get current visitor count',
      },
    },
    {
      method: 'POST',
      path: '/visitor-count/increment',
      handler: 'visitor-count.increment',
      config: {
        auth: false,
        description: 'Increment and return visitor count',
      },
    },
    {
      method: 'GET',
      path: '/visitor-count/dashboard-stats',
      handler: 'visitor-count.dashboardStats',
      config: {
        auth: false,
        description: 'Get dashboard counts statistics',
      },
    },
  ],
};
