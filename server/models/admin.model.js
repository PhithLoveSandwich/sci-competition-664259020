import User from "./user_model.js"
import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Admin = User.init(
    {},
    {
            scopes: {
        defaultScope:{
            where:{
                type: "admin",
            }
        }
    }
    }, {
    hook: {
        beforeCreate: (admin) => {
            admin.type = "admin";
        }
    }
});

export default Admin;