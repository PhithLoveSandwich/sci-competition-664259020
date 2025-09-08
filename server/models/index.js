import sequelize from "./db.js";
import Sequelize from "sequelize";

import User from "./user_model.js";
import Teacher from "./teacher.model.js";
import Judge from "./judge.model.js";
import Admin from "./admin.model.js";
import VerificationToken from "./VerificationToken.model.js";

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Admin = Admin;
db.Teacher = Teacher;
db.Judge = Judge;
db.VerificationToken = VerificationToken;

//Association
db.User.hasMany(db.VerificationToken, { foreignKey: "userId" });
db.VerificationToken.belongsTo(db.User, { foreignKey: "userId" });


export default db;