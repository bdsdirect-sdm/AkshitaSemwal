import { app } from "..";
import { createServer } from "http";
import { disconnect } from "process";
import { Server } from "socket.io"
import Chat from "../models/chats.model";


export const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("Socket user connected", socket.id);

    socket.on("joinRoom", (room: string) => {
        console.log(`User ${socket.id} has joined room`, room);
        socket.join(room);
    })

    socket.on("sendMessage", async  (data) => {
        console.log("MESSAGE DATA",data)
        socket.emit("message", data);
        const message = await Chat.create({data});

    })

    io.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
        socket.emit('user disconnected' );
    })
})