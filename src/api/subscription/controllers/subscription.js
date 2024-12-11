'use strict';


module.exports = {
    async create(ctx) {
      try {
        const { data } = ctx.request.body;
  
        // Validate the subscription object
        if (!data || !data.endpoint || !data.keys || !data.keys.p256dh || !data.keys.auth) {
          return ctx.badRequest("Invalid subscription object");
        }
  
        // Create the subscription in the database
        const subscription = await strapi.services.subscription.create(data);
  
        // Return the created subscription
        ctx.send(subscription);
      } catch (error) {
        ctx.internalServerError("Failed to save subscription");
        console.error(error);
      }
    },
  };
  
 

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::subscription.subscription');
