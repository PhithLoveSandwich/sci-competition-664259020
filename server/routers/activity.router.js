import activityControllers from "../controllers/activity.controller.js";
import express from "express";

const router = express.Router();

// GET http://localhost:3000/api/v1/activity/
router.get("/", activityControllers.getAll);
// GET http://localhost:3000/api/v1/activity/:id
router.post("/", activityControllers.createActivity);
// GET http://localhost:3000/api/v1/activity/:id
router.get("/:id", activityControllers.getById);
// GET http://localhost:3000/api/v1/activity/:id
router.put("/:id", activityControllers.updateActivity);
// GET http://localhost:3000/api/v1/activity/:id
router.delete("/:id", activityControllers.deleteActivity);
// GET http://localhost:3000/api/v1/activity/:id
router.get("/:id", activityControllers.serchActivities);

export default router;
