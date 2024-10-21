"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./routes/router"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const models_1 = __importDefault(require("./models"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({ origin: "*" }));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
(0, models_1.default)();
exports.app.use("/users", router_1.default);
const port = process.env.PORT || 4000;
exports.app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
