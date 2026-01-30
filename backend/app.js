import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRotes.js";
import taskRoutes from "./routes/taskRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import postRouters from "./routes/PostRoutes.js";
dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/posts", postRouters);

app.get("/", (req, res) => {
  res.json({ messge: "Task managment app is running" });
});

app.use(errorHandler);
export default app;
