const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    // @ts-ignore
    credential: admin.credential.cert(require('../../../../config/firebase-file.json')),
  });
}

module.exports = {
  async sendNotification(fcmToken, title, body, data = {}) {
    const message = {
      notification: {
        title,
        body,
      },
      token: fcmToken,
      data, // Optional payload
    };

    try {
      const response = await admin.messaging().send(message);
      return response;
    } catch (error) {
      console.error('Error sending Firebase notification:', error);
      throw error;
    }
  },
};
