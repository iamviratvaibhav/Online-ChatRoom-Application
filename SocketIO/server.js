import express from 'express';
import http from 'http';
import { Server } from 'socket.io';


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4001",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const users = {}
const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};


export { app, io, server, getReceiverSocketId };


io.on("connection", (socket) => {
  console.log("Client connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("Users Map:", users);
  }

  io.emit("getonline", Object.keys(users));



  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", {
        senderId,
        message,
      });
    }
    socket.emit("receiveMessage", {
      senderId,
      message,
    });
  });


  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data); 
  });

  socket.on("stopTyping", (data) => {
    socket.broadcast.emit("stopTyping", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
    if (userId) {
      delete users[userId];
      io.emit("getonline", Object.keys(users));
    }
  });
});
