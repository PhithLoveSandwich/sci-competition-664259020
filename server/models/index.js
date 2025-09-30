import sequelize from "./db.js";
import Sequelize from "sequelize";

import User from "./user_model.js";
import VerificationToken from "./VerificationToken.model.js";

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.VerificationToken = VerificationToken;

//Association
db.VerificationToken.belongsTo(db.User, {foreignkey: "userId"});
db.User.hasMany(db.VerificationToken, {foreignkey: "userId"});


export default db;