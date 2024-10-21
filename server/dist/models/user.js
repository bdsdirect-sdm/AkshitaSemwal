"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
const sequelize_1 = require("sequelize");
// import address from "./address";
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: sequelize_1.DataTypes.ENUM,
        allowNull: false,
        values: ["male", "female", "other"],
    },
    photopath: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    usertype: {
        type: sequelize_1.DataTypes.ENUM,
        values: ["agency", "jobseeker"],
        allowNull: false
    },
    cvpath: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    agency: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    hobbies: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    agencyid: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: database_1.default,
    tableName: "users",
    timestamps: true
});
exports.default = User;
