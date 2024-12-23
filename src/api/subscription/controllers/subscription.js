'use strict';

module.exports = {
    async save(ctx) {
      const { data } = ctx.request.body;
  
      if (!data || !data.endpoint) {
        return ctx.badRequest("Subscription data is required");
      }
  
      try {
        // Save subscription in the database
        await strapi.db.query("api::subscription.subscription").create({
          data,
        });
        ctx.send({ message: "Subscription saved successfully" });
      } catch (error) {
        strapi.log.error("Error saving subscription:", error);
        ctx.internalServerError("Failed to save subscription");
      }
    },
  };
  
  

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::subscription.subscription');
