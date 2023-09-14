import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize"; // Import your Sequelize instance

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
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
  },
  {
    sequelize,
    modelName: "User",
  }
);

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
export default User;
