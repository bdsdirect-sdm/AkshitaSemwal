import { createServer } from "http";
import { disconnect } from "process";
import { Server } from "socket.io"
import Chat from "../models/chat.model";
import cors from "cors"


export function socketServerInitialization (server:any) {
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
    //each user gets a specific id, can be replaced by user's index id
    console.log("Socket user connected", socket.id);

    socket.on("joinRoom", (data: string) => {
        socket.join(data);
        console.log(`User ${socket.id} has joined room`, data);
        
        io.to(data).emit("message",{message:`New User Just joined the  room ${data}`, socketId:socket.id})
    })

    socket.on("sendMessage",async (data) => {
        console.log("MESSAGE DATA",data.room, data.author, data.message, data.time)
        try {
            const dataMsg = {
                room: data.room,
                author: data.author,
                message: data.message,
                time: data.time
            }
            const user = await Chat.create(dataMsg)
            // console.log("USER:::::::::::", user)
            console.log("DATA ROOOM" ,data.room)
            io.to(data.room).emit("receiveMsg", data)
        } catch (e) {
            console.log("Error received")
        }
    })

    io.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
        socket.emit('user disconnected' );
    })
})
}



