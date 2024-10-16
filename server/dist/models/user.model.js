"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../config/dbConnection"));
const User = dbConnection_1.default.define("user", {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    fname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    lname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    dob: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
});
exports.default = User;
