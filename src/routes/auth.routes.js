import { Router } from "express";
import { login, register, logout, profile, verifyToken } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

// Route to handle user registration
router.post("/register", validateSchema(registerSchema), register);

// Route to handle user login
router.post("/login", validateSchema(loginSchema), login);

// Route to handle user logout
router.post("/logout", logout);

// Route to verify user token
router.get("/verify", verifyToken);

// Route to get user profile information
router.get("/profile", authRequired, profile);

export default router;
