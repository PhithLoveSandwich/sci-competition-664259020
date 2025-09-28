import authController from "../controllers/auth.controller.js";
import express from "express";
const router = express.Router();

// POST https://localhost:3000/api/v1/auth/register
router.post("/signup", authController.signup);

// GET https://localhost:3000/api/v1/auth/vertify/token
router.get("/verify/:token", authController.vertifyEmail);

// POST https://localhost:3000/api/v1/auth/login
router.post("/signin", authController.signin);
export default router;