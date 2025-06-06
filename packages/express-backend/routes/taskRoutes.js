// routes/taskRoutes.js

import express from "express";
import * as taskController from "../controllers/taskController.js";
import { authenticateToken } from "../controllers/authController.js";

const router = express();

router.get("/tasks", authenticateToken, taskController.getAllUserTasks);
router.patch("/tasks/:id", authenticateToken, taskController.markTaskComplete);
// router.get("/tasks", authenticateToken, taskController.getUserTasks);
// router.post("/tasks", authenticateToken, taskController.createTask);
// router.get("/tasks/group/:id", authenticateToken, taskController.getTasksForGroup);
// router.patch("/tasks/:id", authenticateToken, taskController.updateTask);
// router.delete("/tasks/:id", authenticateToken, taskController.deleteTask);

export default router;

