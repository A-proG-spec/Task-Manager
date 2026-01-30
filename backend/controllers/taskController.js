import asyncHandler from "express-async-handler";
import Task from "../models/Task.js";

//CREATE TASK
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority,dueDate } = req.body;
  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
    user: req.user._id,
  });
  res.status(201).json(task);
});

//GET ALL TASK FOR THE CURRENT USER

export const getAllTask = asyncHandler(async (req, res) => {
  const filters = { user: req.user._id };
  if (req.query.status) {
    filters.status = req.query.status;
  }
  if (req.query.priority) {
    filters.priority = req.query.priority;
  }
  const tasks = await Task.find(filters);
  res.json(tasks);
});

//UPDATE TASK

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this task");
  }
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedTask);
});

//DELETE TASK

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this tak");
  }
  await task.deleteOne();
  res.json({ message: "Task removed succesfully" });
});

//GET A SINGLE TASK

export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }
  res.json(task);
});
//GET UPCOMING TASKS
export const getUpComingTasks = asyncHandler(async (req, res) => {
  const today = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 3);
  const weekLater = new Date();
  weekLater.setDate(today.getDate() + 7);
  const tasks = [];

  const threeDaysLatertasks = await Task.find({
    user: req.user._id,
    dueDate: {
      $gte: today,
      $lte: threeDaysLater,
    },
    status: {
      $ne: "completed",
    },
  });
  const weekLatertasks = await Task.find({
    user: req.user._id,
    dueDate: {
      $gt: threeDaysLater,
      $lte: weekLater,
    },
    status: {
      $ne: "completed",
    },
  });

  res.json({
    threeDaysLater: threeDaysLatertasks,
    weekLater: weekLatertasks,
  });
});

export const getTaskReport = asyncHandler(async (req, res) => {
  const total = await Task.countDocuments({
    user: req.user._id,
  });
  const completed = await Task.countDocuments({
    user: req.user._id,
    status: "completed",
  });
  const uncompleted = total - completed;
  const completedPercent = total == 0 ? 0 : Math.round((completed / total) * 100);
  const uncompletedPercent = total == 0 ? 0 : 100 - completedPercent;
  res.json({
    total,
    completed,
    uncompleted,
    completedPercent,
    uncompletedPercent,
  });
});
