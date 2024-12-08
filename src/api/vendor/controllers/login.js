'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  /**
   * Vendor Login
   * @param {Object} ctx
   */
  async login(ctx) {
    const { email, password } = ctx.request.body;

    // Validate input
    if (!email || !password) {
      return ctx.badRequest('Email and password are required.');
    }

    // Check if the vendor exists
    const vendor = await strapi.db.query('api::vendor.vendor').findOne({ where: { email } });
    if (!vendor) {
      return ctx.badRequest('Invalid email or password.');
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, vendor.password);
    if (!validPassword) {
      return ctx.badRequest('Invalid email or password.');
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: vendor.id, email: vendor.email },
      strapi.config.get('plugin.users-permissions.jwtSecret'),
      { expiresIn: '7d' }
    );

    ctx.send({
      jwt: token,
      vendor: {
        id: vendor.id,
        name: vendor.name,
        email: vendor.email,
      },
    });
  },
};
