import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Activity = sequelize.define("activity", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        trim: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    level: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    team_size: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    reg_open: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    reg_close: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    contact_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    contact_phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    contact_email: {
        type: DataTypes.STRING,
        allowNull: true,
        match: [
            /^\w+([\.-]?\w+)*@+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid"
        ]
    },
    status: {
        type: DataTypes.ENUM("draft","open","closed","in_progress","completed"),
        allowNull: true,
    },
});

Activity.sync({ force: false })
    .then(() => {
        console.log("Activity table created or already exists");
    })
    .catch((error) => {
        console.log("Error creating Activity table", error);
    });

export default Activity;
