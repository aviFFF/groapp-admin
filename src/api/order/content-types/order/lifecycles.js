module.exports = {
    async afterCreate(event) {
      const { result } = event;
  
      // Emit WebSocket event to the relevant vendor
      const vendorId = result.vendor; // Replace with your actual vendor field key
      const orderId = result.id;
  
      // @ts-ignore
      if (strapi.io) {
        // @ts-ignore
        strapi.io.to(`vendor-${vendorId}`).emit("new-order", {
          orderId,
          message: `New order received: ${orderId}`,
        });
        console.log(`Notification sent for new order: ${orderId}`);
      }
    },
  };
  