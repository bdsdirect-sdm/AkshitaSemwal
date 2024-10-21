import { DataTypes } from "sequelize";
import sequelize from "../config/database"

const Chat = sequelize.define("chat", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    receiverId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    senderId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: true
    }
})

export default Chat;