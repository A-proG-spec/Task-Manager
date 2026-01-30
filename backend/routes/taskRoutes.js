import express from "express";
import {
  deleteTask,
  createTask,
  updateTask,
  getAllTask,
  getTaskById,
  getUpComingTasks,
  getTaskReport
} from "../controllers/taskController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/",protect, getAllTask);
router.get("/report",protect, getTaskReport)
router.get("/upcoming/soon", protect, getUpComingTasks)
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.get("/:id", protect, getTaskById);
export default router;
