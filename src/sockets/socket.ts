import { io } from "socket.io-client";

export const socket = io("http://localhost:4200", {
  path: "/sockets/",
  transports: ["polling", "websocket"],
  reconnectionAttempts: 500,
  reconnectionDelay: 2000,
});
