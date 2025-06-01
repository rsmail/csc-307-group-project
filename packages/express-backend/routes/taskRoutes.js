// routes/taskRoute.js

import express from "express";
import { authenticateToken } from "../controllers/authController.js";
import * as taskController from "../controllers/taskController.js";

const router = express();

router.get("/tasks", authenticateToken, taskController.getAllTasks);


export default router;