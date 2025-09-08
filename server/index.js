import express from "express";
import dotenv from "dotenv";
import Role from "./models/role_model.js";
import sequelize from "./models/db.js";
import activityRouter from "./routers/activity.router.js";
import authRouter from "./routers/auth.router.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const initRole = async () => {
//   try {
//     await Role.create({ id: "1", name: "admin" });
//     await Role.create({ id: "2", name: "manager" });
//     await Role.create({ id: "3", name: "teacher" });
//     await Role.create({ id: "4", name: "judge" });
//     console.log("Roles created.");
//   } catch (error) {
//     console.error("Error creating roles:", error);
//   }
// };

// sequelize.sync({ force: true })
//   .then(() => {
//     console.log("Database synced");
//     return initRole();
//   })
//   .catch(err => {
//     console.error("Error syncing database:", err);
//   });

app.get('/', (req, res) => {
  res.send('Sci-Competition Api');
});

app.use("/api/v1/activity", activityRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
    console.log("listening too http://localhost:" + PORT);
});
