import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const VerificationToken = sequelize.define("verificationToken", {
  id: {
    type: DataTypes.INTEGER, 
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users", 
      key: "id",
    }
  },
  expireAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default VerificationToken;
