// Correct Router
import activityControllers from "../controllers/activity.controller.js";
import authMiddleware from "../middleware/authjwt.js"
import express from "express";
const router = express.Router();

// GET all activities
// GET http://localhost:3000/api/v1/activity
router.get("/", activityControllers.getAll);
// POST create activity
// POST http://localhost:3000/api/v1/activity/:id
router.post("/", authMiddleware.verifyToken, authMiddleware.isAdmin, activityControllers.createActivity);
// GET activity by ID
// GET http://localhost:3000/api/v1/activity/:id
router.get("/:id", activityControllers.getById);
// PUT update activity by ID
// PUT http://localhost:3000/api/v1/activity/:id
router.put("/:id", authMiddleware.verifyToken, authMiddleware.isAdmin, activityControllers.updateActivity);
// DELETE activity by ID
// DELETE http://localhost:3000/api/v1/activity/:id
router.delete("/:id", authMiddleware.verifyToken, authMiddleware.isAdmin, activityControllers.deleteActivity);
// GET search activities
// GET http://localhost:3000/api/v1/activity/:id
router.get("/search",  activityControllers.searchActivities);

export default router;
