const sendNotification = require("../../../../utils/sendNotification");

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    // Fetch all vendor subscriptions
    const subscriptions = await strapi.db.query("api::subscription.subscription").findMany();

    // Payload to send
    const payload = {
      title: "New Order Received",
      body: `Order ID: ${result.id} - ${result.customerName}`,
    };

    // Send notification to each subscription
    subscriptions.forEach((subscription) => {
      // @ts-ignore
      sendNotification(subscription, payload);
    });

    strapi.log.info("Notifications sent for new order.");
  },
};
