// controllers/taskController.js

import * as taskService from "../services/taskService.js";
export async function createTask(req, res) {
    try {
        const task = await taskService.createTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        console.error("createTask error:", error.message);
        res.status(500).json({ error: error.message });
    }
}

export async function getUserTasks(req, res) {
    try {
        const user_id = req.user.id;
        const tasks = await taskService.getUserTasks(user_id);
        res.status(200).json(tasks);
    } catch (error) {
        console.error("getUserTasks error:", error.message);
        res.status(500).json({ error: error.message });
    }
}

export async function getTasksForGroup(req, res) {
    try {
        const group_id = req.params.id;
        const tasks =
            await taskService.getTasksForGroup(group_id);
        res.status(200).json(tasks);
    } catch (error) {
        console.error("getTasksForGroup error:", error.message);
        res.status(500).json({ error: error.message });
    }
}

export async function updateTask(req, res) {
    try {
        const task_id = req.params.id;
        const updates = req.body;
        const task = await taskService.updateTask(
            task_id,
            updates
        );
        res.status(200).json(task);
    } catch (error) {
        console.error("updateTask error:", error.message);
        res.status(500).json({ error: error.message });

    }
}

/**
 * Deletes a particular task
 * @param {*} req params: {group_id} and {task_id}
 * @param {*} res 
 */
export async function deleteTask(req, res) {
    try {
        const task_id = req.params.id;
        await taskService.deleteTask(task_id);
        res.status(204).send();
    } catch (error) {
        console.error("deleteTask error:", error.message);
        res.status(500).json({ error: error.message });
    }
}

