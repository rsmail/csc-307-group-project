// controllers/taskController.js

import * as taskService from "../services/taskService.js";
import { getUserId } from "../utils/jwt.js";

export async function getAllUserTasks(req, res) {
    try {
        const token = req.headers.authorization;
        const user_id = getUserId(token);

        const tasks = await taskService.getAllUserTasks(user_id);
        return res.status(200).send(tasks);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

export async function createNewTask(req, res) {
    try {
        
    } catch (error) {
        
    }
}