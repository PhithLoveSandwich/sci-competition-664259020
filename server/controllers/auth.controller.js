import jwt from "jsonwebtoken";
import db from "../models/index.js";
import authConfig from "../config/auth.config.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const User = db.User;

// Register
const signup = async (req, res) => {
    const { email, password, type, name, school, phone } = req.body;

    try {
        if (!email || !password || !type || !name) {
            return res.status(400).send({ message: "Email, Password, Type, and Name are required!" });
        }

        const allowedTypes = ['admin', 'teacher', 'judge'];
        if (!allowedTypes.includes(type)) {
            return res.status(400).send({ message: "Invalid user type. Must be Admin, Teacher, or Judge" });
        }

        if (type === "teacher" && (!school || !phone)) {
            return res.status(400).send({ message: "School and phone are required for teacher" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists. Please try another email." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user object
        const userData = { name, email, password: hashedPassword, type };
        if (type === "teacher") {
            userData.school = school;
            userData.phone = phone;
        }

        // Create new user
        const user = await User.create(userData);

        // Generate verification token for teacher
        if (type === "teacher") {
            try {
                const token = crypto.randomBytes(32).toString("hex");
                await db.VerificationToken.create({
                    token,
                    userId: user.id,
                    expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
                });
                console.log("Verification token created for teacher");
            } catch (err) {
                console.error("Verification token error:", err);
            }
        }

        // Send response
        res.status(201).send({
            message: type === "teacher" 
                ? "Registration successful! Please check your email to verify your account." 
                : "User registered successfully.",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                type: user.type,
                ...(type === "teacher" && { isVertified: user.isVertified }),
            },
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const authController = { signup };

export default authController;
