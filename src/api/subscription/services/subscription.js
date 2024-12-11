'use strict';

module.exports = {
    async create(data) {
      // @ts-ignore
      return await strapi.query('subscription').create({ data });
    },
  };
  

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::subscription.subscription');
