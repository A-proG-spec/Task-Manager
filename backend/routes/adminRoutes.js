import express from "express";
import {
  getStatistics,
  getTaskById,
  getTask,
  deleteUser,
  getAllUser,
} from "../controllers/adminController.js";
import { deletePost, getPublicPost } from "../controllers/postController.js";
import admin from "../middleware/adminMiddleware.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, admin, getAllUser);
router.get("/tasks", protect, admin, getTask);
router.get("/statistics", protect, admin, getStatistics);
router.get("/tasks/:id", protect, admin, getTaskById);
router.delete("/users/:id", protect, admin, deleteUser);
router.delete("/posts/:id", protect, admin, deletePost);
router.get("/posts", protect, admin, getPublicPost);
export default router;
