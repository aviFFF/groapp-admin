module.exports = {
  /**
   * @param {{ request: { body: { fcmToken: any; title: any; body: any; data: any; }; }; send: (arg0: { success: boolean; response: any; }) => void; badRequest: (arg0: string) => void; }} ctx
   */
  async sendNotification(ctx) {
    const { fcmToken, title, body, data } = ctx.request.body;

    try {
      const notificationService = strapi.service('api::notifications.notifications');
      const response = await notificationService.sendNotification(fcmToken, title, body, data);
      ctx.send({ success: true, response });
    } catch (error) {
      console.error('Error sending notification:', error);
      ctx.badRequest('Error sending notification');
    }
  },
};
