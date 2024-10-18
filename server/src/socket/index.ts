import { app } from "..";
import { createServer } from "http";
import { disconnect } from "process";
import { Server } from "socket.io"

export const server = createServer(app);

//instantiating the Server class
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

//emit an event, listen an event
//listening to an event called connection
//listen to events only when user has connected
io.on("connection", (socket) => {
    //each user gets a specific id
    console.log("Socket user connected", socket.id);

    socket.on("joinRoom", (room: string) => {
        console.log(`User ${socket.id} has joined room`, room);
        socket.join(room);
    })

    socket.on("sendMessage", (data) => {
        console.log("MESSAGE DATA",data)
    })

    io.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
        socket.emit('user disconnected' );
    })
})