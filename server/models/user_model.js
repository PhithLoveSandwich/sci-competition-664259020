import {DataTypes} from "sequelize"
import sequelize from "./db.js"
const User = sequelize.define("user",{
    username:{
        type: DataTypes.STRING,
        primaryKey: true,
        allNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allNull: false,
    },
});

User.sync({ force : false })
    .then(() => {
        console.log("Table User created or already exists");
    })
    .catch((error)=>{
        console.log("Error creating table", error);
    });
    
export default User;