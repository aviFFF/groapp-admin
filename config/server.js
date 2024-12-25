const { Server } = require('socket.io');

module.exports = ({ env }) => {
  const serverConfig = {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
      keys: env.array('APP_KEYS'),
    },
    webhooks: {
      populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
    },
  };

  return {
    ...serverConfig,
    async bootstrap() {
      const httpServer = strapi.server.httpServer;

      if (!httpServer) {
        console.error('Strapi HTTP Server is not initialized. Socket.IO setup failed.');
        return;
      }

      // Initialize Socket.IO
      const io = new Server(httpServer, {
        cors: {
          origin: "*",  // Allow all origins or specify your frontend origin
          methods: ["GET", "POST"],
        },
      });

      strapi.io = io;

      io.on("connection", (socket) => {
        console.log(`WebSocket client connected: ${socket.id}`);

        socket.on("subscribe", (vendorId) => {
          console.log(`Vendor subscribed: ${vendorId}`);
          socket.join(`vendor-${vendorId}`);
        });

        socket.on("disconnect", () => {
          console.log(`WebSocket client disconnected: ${socket.id}`);
        });
      });
    },
  };
};
