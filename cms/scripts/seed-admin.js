'use strict';

module.exports = {
  /**
   * An asynchronous bootstrap function that runs before your application starts
   * This is useful for setting up admin users for production
   */

  async bootstrap(strapi) {
    strapi.log.info('Starting seed-admin bootstrap...');

    try {
      // Check if admin user already exists
      const existingAdmin = await strapi.query('admin::user').findOne({
        where: {
          email: process.env.ADMIN_EMAIL || 'admin@jmc.com',
        },
      });

      if (existingAdmin) {
        strapi.log.info('Admin user already exists');
        return;
      }

      // Create admin user
      const adminUser = await strapi.query('admin::user').create({
        data: {
          email: process.env.ADMIN_EMAIL || 'admin@jmc.com',
          password: process.env.ADMIN_PASSWORD || 'ChangeMePassword123!',
          firstname: 'Admin',
          lastname: 'User',
          isActive: true,
          roles: [1], // Assuming role 1 is admin
        },
      });

      strapi.log.info('Admin user created successfully:', adminUser.email);
    } catch (error) {
      strapi.log.error('Failed to seed admin user:', error);
    }
  },
};
