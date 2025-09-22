import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";
import http from "http";
import express from "express";

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
  console.log("A user connected:", socket.id);
  console.log(socket.handshake.query.userId);
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
