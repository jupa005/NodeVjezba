const { Sequelize } = require("sequelize");

// Replace these values with your own
const sequelize = new Sequelize("testdatabase", "root", "", {
  host: "localhost", // The host where your MySQL database is running
  dialect: "mysql", // The dialect for MySQL
});

module.exports = sequelize;
