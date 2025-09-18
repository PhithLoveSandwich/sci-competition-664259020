import User from "./user_model.js"
import sequelize from "./db.js";
const Judge = User.init({},{
    scopes: {
        defaultScope:{
            where:{
                type: "judge",
            }
        }
    }
}, {
    hooks: {
        beforeCreate: (judge) => {
            judge.type = "judge";
        }
    }
});

export default Judge;