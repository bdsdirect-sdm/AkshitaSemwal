// export const joinRoom = (socket: any, io: any) => {
//     return socket.on("JoinRoom", async (data): any => {
//         socket.join(data.id);
//         // const socketId = socket.id;
//         io.to(data.id).emit("JoinRoomSucess", `User Join Room Successfully, Room id : ${data.id}`);
//     });
// }

export const joinRoom = (socket: any, io: any) => {
    socket.on('joinRoom', (room: any) => {
        socket.join(room);
        console.log(`Socket ${socket.id} joined room ${room}`);
        io.to(room).emit('userJoined', socket.id);
    });
};

export const sendNewMessage = (socket: any, io: any, id: any) => {
    socket.on('newMessage', (message: any) => {
        console.log(`Message received from ${id}: ${message}`);
        io.to(id).emit('newMessage', message); // Send the message to the room
    });
};

export const leaveRoom = (socket: any, io: any) => {
    socket.on('leaveRoom', (room: any) => {
        socket.leave(room);
        console.log(`Socket ${socket.id} left room ${room}`);
        io.to(room).emit('userLeft', socket.id);
    });
};
