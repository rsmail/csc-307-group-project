// routes/taskRoute.js

import express from "express";
import { authenticateToken } from "../controllers/authController.js";
import * as taskController from "../controllers/taskController.js";

const router = express();

router.get("/tasks", authenticateToken, taskController.getAllUserTasks);

router.patch("/tasks/:id", authenticateToken, taskController.markTaskComplete);


export default router;