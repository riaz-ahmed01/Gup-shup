import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

const userSocketMap = {
  // userId: socketId
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (!userId) return;
  userSocketMap[userId] = socket.id;
  io.emit("onlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("onlineUsers", Object.keys(userSocketMap));
    
  });
});

const getSocketId = (userId) => {
  return userSocketMap[userId];
};
console.log("User-Socket Map:", userSocketMap);

export { io, server, app, getSocketId,  };
