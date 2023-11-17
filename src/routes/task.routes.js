import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

// Route to get all tasks
router.get("/tasks", authRequired, getTasks);

// Route to get a specific task by ID
router.get("/tasks/:id", authRequired, getTask);

// Route to create a new task
router.post(
  "/tasks",
  authRequired,
  validateSchema(createTaskSchema),
  createTask
);

// Route to delete a task by ID
router.delete("/tasks/:id", authRequired, deleteTask);

// Route to update a task by ID
router.put("/tasks/:id", authRequired, updateTask);

export default router;
