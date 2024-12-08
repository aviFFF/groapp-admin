'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  /**
   * Vendor Signup
   * @param {Object} ctx
   */
  async signup(ctx) {
    const { name, email, password } = ctx.request.body;

    // Validate input
    if (!email || !password || !name) {
      return ctx.badRequest('Name, email, and password are required.');
    }

    // Check if the vendor already exists
    const existingVendor = await strapi.db.query('api::vendor.vendor').findOne({ where: { email } });
    if (existingVendor) {
      return ctx.badRequest('Vendor with this email already exists.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the vendor
    const newVendor = await strapi.db.query('api::vendor.vendor').create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    ctx.send({
      message: 'Vendor created successfully.',
      vendor: {
        id: newVendor.id,
        name: newVendor.name,
        email: newVendor.email,
      },
    });
  },
};
