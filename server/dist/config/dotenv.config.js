"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.local = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env' });
exports.local = {
    Port: Number(process.env.PORT),
    DB_Name: String(process.env.DB_NAME),
    DB_User: String(process.env.DB_USER),
    DB_Password: String(process.env.DB_PASSWORD),
    Node_email: String(process.env.NODE_EMAIL),
    Email_key: String(process.env.EMAIL_KEY),
    Secret_key: String(process.env.SECRET_KEY)
};
