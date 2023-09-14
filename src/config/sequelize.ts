import { Sequelize } from "sequelize";

// Replace these values with your own
const sequelize = new Sequelize("testdatabase", "root", "", {
  host: "localhost", // The host where your MySQL database is running
  dialect: "mysql", // The dialect for MySQL
});

export default sequelize;
