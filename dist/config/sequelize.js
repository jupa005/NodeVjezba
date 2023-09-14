"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Replace these values with your own
const sequelize = new sequelize_1.Sequelize("testdatabase", "root", "", {
    host: "localhost",
    dialect: "mysql", // The dialect for MySQL
});
exports.default = sequelize;
