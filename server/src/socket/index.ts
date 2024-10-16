import express from "express"
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { joinRoom, sendNewMessage, leaveRoom } from './user.events';

const app = express();

const socketServer = createServer(app);

const io = new Server(socketServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
});

//all events are listened only when connection event is emitted
io.on("connection", (socket) => {
    console.log("Connection established:", socket.id);
    socket.emit('connection', null);
    
    const { id }: any = socket.handshake.query; 
    socket.join(id);

    // joinRoom(socket, io);
    // leaveRoom(socket, io);
    // sendNewMessage(socket, io, id);

    //listening to the event from frontend

    socket.on('sendMessage', (message) => {
        socket.emit('message', message);
      });

    socket.on('disconnect', () => {
        console.log(`User ${id} disconnected`);
    });
});

export default socketServer;







