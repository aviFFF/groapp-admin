import { Server as SocketIOServer } from "socket.io";
import { Strapi as StrapiOriginal } from "@strapi/strapi";

declare module "@strapi/strapi" {
  export interface Strapi extends StrapiOriginal {
    io?: SocketIOServer;
  }
}
