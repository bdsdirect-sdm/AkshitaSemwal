"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_config_1 = require("./dotenv.config");
const sequelize = new sequelize_1.Sequelize(dotenv_config_1.local.DB_Name, dotenv_config_1.local.DB_User, dotenv_config_1.local.DB_Password, {
    host: "localhost",
    dialect: "mysql"
});
exports.default = sequelize;
