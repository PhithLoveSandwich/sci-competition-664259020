// Correct Router
import activityControllers from "../controllers/activity.controller.js";
import express from "express";
const router = express.Router();

// GET all activities
// GET http://localhost:3000/api/v1/activity
router.get("/", activityControllers.getAll);
// POST create activity
// GET http://localhost:3000/api/v1/activity/:id
router.post("/", activityControllers.createActivity);
// GET activity by ID
// GET http://localhost:3000/api/v1/activity/:id
router.get("/:id", activityControllers.getById);
// PUT update activity by ID
// GET http://localhost:3000/api/v1/activity/:id
router.put("/:id", activityControllers.updateActivity);
// DELETE activity by ID
// GET http://localhost:3000/api/v1/activity/:id
router.delete("/:id", activityControllers.deleteActivity);
// GET search activities
// GET http://localhost:3000/api/v1/activity/:id
router.get("/search", activityControllers.searchActivities);

export default router;
