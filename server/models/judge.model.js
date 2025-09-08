import User from "./user_model.js"

const Judge = User.init({},{
    scopes: {
        defaultScope:{
            where:{
                type: "judge",
            }
        }
    }
}, {
    hook: {
        beforeCreate: (judge) => {
            judge.type = "judge";
        }
    }
});

export default Judge;