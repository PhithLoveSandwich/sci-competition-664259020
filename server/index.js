import express from "express";
import dotenv from "dotenv";
import sequelize from "./models/db.js";
import activityRouter from "./routers/activity.router.js";
import authRouter from "./routers/auth.router.js";
import cors from "cors";

dotenv.config();
const NODE_ENV = process.env.NODE_ENV || "development";
const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(cors({
  origin: ["http://localhost:5174", "http://127.0.0.1:5174", FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initDatabase = async () => {
  try {
    await sequelize.authenticate();  
    console.log("Database Connection established successfully");

    if (NODE_ENV === "development") {
      await sequelize.sync({ alter: true }); 
      console.log("Database Synced in development mode");
    }
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
};

initDatabase(); 

app.get("/", (req, res) => {
  res.send("Sci-Competition Api");
});

app.use("/api/v1/activity", activityRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log("listening to http://localhost:" + PORT);
});
