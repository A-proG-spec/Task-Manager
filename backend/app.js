import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRotes.js";
import taskRoutes from "./routes/taskRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import postRouters from "./routes/PostRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());

const allowedOrigins = [
  "https://task-manager-five-alpha-56.vercel.app",
  "https://task-manager-git-master-antenehs-projects-69af1458.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl) or check against whitelist
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/posts", postRouters);

app.get("/", (req, res) => {
  res.json({ messge: "Task managment app is running" });
});

app.use(errorHandler);
export default app;
