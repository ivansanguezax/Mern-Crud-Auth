import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Enable CORS with specific origin and credentials
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Logger middleware
app.use(morgan("dev"));

// Parse JSON requests
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Mount authentication and task routes
app.use("/api", authRoutes);
app.use("/api", taskRoutes);

export default app;
