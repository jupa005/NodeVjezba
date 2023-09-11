const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); // Import your Sequelize instance

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the model with the database (creates the table if it doesn't exist)
sequelize
  .sync()
  .then(() => {
    console.log("User model synced with the database");
  })
  .catch((error) => {
    console.error("Error syncing User model:", error);
  });

// Export the User model to use in your application
module.exports = User;
