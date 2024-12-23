'use strict';

module.exports = {
    routes: [
      {
        method: "POST",
        path: "/save-subscription",
        handler: "subscription.save",
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };
  
  

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::subscription.subscription');
