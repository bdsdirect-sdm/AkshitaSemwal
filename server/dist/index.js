"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const body_parser_1 = __importDefault(require("body-parser"));
const router_1 = __importDefault(require("./routes/router"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const checkconnection = async () => {
    try {
        try {
            await database_1.default.authenticate();
            console.log("Database connection successful!");
        }
        catch (error) {
            console.error("Unable to connect to the database:", error);
        }
        await database_1.default.sync({ force: true });
        console.log("All models were synchronized successfully.");
        app.listen(5000, () => {
            console.log("server started");
        });
    }
    catch (error) {
        console.log(error, "errrrrr");
    }
};
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
checkconnection();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/users", router_1.default);
