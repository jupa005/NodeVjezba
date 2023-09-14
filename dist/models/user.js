"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize")); // Import your Sequelize instance
class User extends sequelize_1.Model {
}
User.init({
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    modelName: "User",
});
// Sync the model with the database (creates the table if it doesn't exist)
sequelize_2.default
    .sync()
    .then(() => {
    console.log("User model synced with the database");
})
    .catch((error) => {
    console.error("Error syncing User model:", error);
});
// Export the User model to use in your application
exports.default = User;
