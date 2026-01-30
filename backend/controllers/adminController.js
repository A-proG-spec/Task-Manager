import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Task from "../models/Task.js";
import Post from "../models/Post.js";
export const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ name: 1 });
  res.json(users);
});
export const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "user deleted" });
});
export const getStatstics = asyncHandler(async (req, res) => {
  const totalUser = await User.countDocuments();
  const totalTasks = await Task.countDocuments();
  const completedTask = await Task.countDocuments({ status: "completed" });
  const completedtaskPercent = totalTasks === 0?0: Math.round((completedTask / totalTasks) * 100);
  const uncompletedTask = totalTasks - completedTask;
  const uncompletedTaskPercent = 100 - completedtaskPercent;
  res.json({
    totalUser,
    totalTasks,
    completedTask,
    uncompletedTask,
    completedtaskPercent,
    uncompletedTaskPercent,
  });
});
export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  if (Post.author.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this post");
  }
  await Post.findByIdAndDelete(req.params.id);
  res.json({ messsage: "Post sucesfully deleted" });
});
export const getPublicPost = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .populate("author", "name")
    .sort({ createdAt: -1 });
  res.json(posts);
});
