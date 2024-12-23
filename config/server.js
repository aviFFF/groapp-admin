const { Server } = require("socket.io");

module.exports = ({ env }) => {
  // Define server configuration
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
    // Add the socket.io server after Strapi has started
    async bootstrap() {
      // Ensure Strapi's server is initialized
      const httpServer = strapi.server?.httpServer;
      if (!httpServer) {
        console.error("HTTP Server is not initialized. Socket.IO setup failed.");
        return;
      }
      
      // Initialize Socket.io only after the server is ready
      const io = new Server(httpServer, {
        cors: {
          origin: "*",  // You can modify this for production
          methods: ["GET", "POST"],
        },
      });

      // Attach the socket.io instance to Strapi
      // @ts-ignore
      strapi.io = io;

      io.on("connection", (socket) => {
        console.log(`WebSocket client connected: ${socket.id}`);

        // Listen for vendor-specific subscription events
        socket.on("subscribe", (vendorId) => {
          console.log(`Vendor subscribed: ${vendorId}`);
          socket.join(`vendor-${vendorId}`);
        });

        // Handle disconnection
        socket.on("disconnect", () => {
          console.log(`WebSocket client disconnected: ${socket.id}`);
        });
      });
    }
  };
};
