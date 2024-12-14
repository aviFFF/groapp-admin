const admin = require('firebase-admin');
// @ts-ignore
const serviceAccount = require('../config/firebase-service-account.json'); // Replace with the path to your Firebase Service Account JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = {
  sendNotification: async (/** @type {any} */ fcmToken, /** @type {any} */ title, /** @type {any} */ body, data = {}) => {
    const message = {
      token: fcmToken,
      notification: {
        title,
        body,
      },
      data, // Optional: Add custom data here
    };

    try {
      const response = await admin.messaging().send(message);
      console.log('Notification sent successfully:', response);
      return response;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  },
};
