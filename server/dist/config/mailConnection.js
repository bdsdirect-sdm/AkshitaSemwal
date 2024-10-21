"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_config_1 = require("./dotenv.config");
exports.transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: dotenv_config_1.local.Node_email,
        pass: dotenv_config_1.local.Email_key
    }
});
const sendMail = (to, subject, html) => {
    exports.transporter.sendMail({
        from: dotenv_config_1.local.Node_email,
        to: to,
        subject: subject,
        html: html
    });
};
exports.sendMail = sendMail;
