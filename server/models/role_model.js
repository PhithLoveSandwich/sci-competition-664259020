import {DataTypes} from "sequelize"
import sequelize from "./db.js"
const Role = sequelize.define("role",{
    id:{
        type: DataTypes.STRING,
        primaryKey: true,
        allNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allNull: false,
    },
});

Role.sync({ force : false})
    .then(() => {
        console.log("Table Role created or already exists");
    })
    .catch((error)=>{
        console.log("Error creating table", error);
    });

export default Role;