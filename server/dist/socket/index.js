"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const __1 = require("..");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const chats_model_1 = __importDefault(require("../models/chats.model"));
exports.server = (0, http_1.createServer)(__1.app);
const io = new socket_io_1.Server(exports.server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    console.log("Socket user connected", socket.id);
    socket.on("joinRoom", (room) => {
        console.log(`User ${socket.id} has joined room`, room);
        socket.join(room);
    });
    socket.on("sendMessage", async (data) => {
        console.log("MESSAGE DATA", data);
        socket.emit("message", data);
        const message = await chats_model_1.default.create({ data });
    });
    io.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
        socket.emit('user disconnected');
    });
});
