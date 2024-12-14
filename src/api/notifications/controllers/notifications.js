module.exports = {
    /**
     * @param {{ request: { body: { fcmToken: any; title: any; body: any; data: any; }; }; badRequest: (arg0: string) => any; send: (arg0: { message: string; response: any; }) => void; internalServerError: (arg0: string) => void; }} ctx
     */
    async sendNotification(ctx) {
      const { fcmToken, title, body, data } = ctx.request.body;
  
      if (!fcmToken || !title || !body) {
        return ctx.badRequest('Missing required fields: fcmToken, title, or body');
      }
  
      try {
        const firebaseService = strapi.services.firebase; // Access the Firebase service
        const response = await firebaseService.sendNotification(fcmToken, title, body, data);
        ctx.send({ message: 'Notification sent successfully', response });
      } catch (error) {
        ctx.internalServerError('Failed to send notification');
      }
    },
  };
  