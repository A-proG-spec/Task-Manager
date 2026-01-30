import express from "express";
import {
  getStatstics,
  deleteUser,
  getAllUser,
} from "../controllers/adminController.js";
import { deletePost, getPublicPost } from "../controllers/postController.js";
import admin from "../middleware/adminMiddleware.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, admin, getAllUser);
router.get("/statstics", protect, admin, getStatstics);
router.delete("/users/:id", protect, admin, deleteUser);
router.delete("/posts/:id", protect, admin, deletePost);
router.get("/posts", protect, admin, getPublicPost);
export default router