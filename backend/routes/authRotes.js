import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import loginLimiter from "../middleware/ratelimiterMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginLimiter, loginUser);
export default router;
