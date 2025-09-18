import User from "./user_model.js"
import sequelize from "./db.js";
const Admin = User.init({},{
    scopes: {
        defaultScope:{
            where:{
                type: "admin",
            }
        }
    }
    }, {
    hooks: {
        beforeCreate: (admin) => {
            admin.type = "admin";
        }
    }
});

export default Admin;