"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = __importDefault(require("./models"));
// import userRoutes from "./routes/userRoutes"
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.use(body_parser_1.default.json());
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {});
io.on("connection", (socket) => {
    console.log("Connection established");
});
const port = 5000;
httpServer.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
(0, models_1.default)();
// app.use("/", userRoutes);
