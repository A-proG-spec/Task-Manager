import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Task from "../models/Task.js";

export const getLeaderBoard = asyncHandler(async (req, res) => {
  const users = await User.find();
  const leaderBoard = await Promise.all(
    users.map(async (user) => {
      const total = await Task.countDocuments({ user: user._id });
      const completed = await Task.countDocuments({
        user: user._id,
        status: "completed",
      });
      return {
        name: user.name,
        completionRate: total === 0 ? 0 : Math.round((completed / total) * 100),
      };
    }),
  );
  return leaderBoard.sort((a, b) => {
    b.completionRate - a.completionRate;
  });
  res.json(leaderBoard);
});
