import cors from "cors";
import express from "express";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { authRoutes } from "./routes/authRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";

const app = express();

const allowedOrigins = env.clientOrigin
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      const isLocalhost = /^https?:\/\/localhost:\d+$/i.test(origin || "");
      const isVercelPreview = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin || "");

      if (!origin || allowedOrigins.includes(origin) || isLocalhost || isVercelPreview) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  return res.status(200).json({ message: "Server is healthy" });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use((req, res) => {
  return res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

app.use(errorHandler);

export { app };
