// controllers/taskController.js

import * as taskService from "../services/taskService.js";
import { verifyUserInGroup } from "../services/groupService.js";
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

export async function getGroupTasks(req, res) {
    try {
        const token = req.headers.authorization;
        const user_id = getUserId(token);
        const group_id = req.params.id;

        if (!(await verifyUserInGroup(group_id, user_id))) {
            return res.status(401).send("User not in group");
        }

        const tasks = await taskService.getGroupTasks(group_id)
        res.status(200).send(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function createNewTask(req, res) {
    try {
        const token = req.headers.authorization;
        const user_id = getUserId(token);
        const group_id = req.params.id;

        if (!(await verifyUserInGroup(group_id, user_id))) {
            return res.status(401).send("User not in group");
        }

        const task = await taskService.createNewTask(req.body);
        res.status(201).send(task);

    } catch (error) {
        res.status(500).send(error);
    }
}

export async function markTaskComplete(req, res) {
    try {
        const token = req.headers.authorization;
        const user_id = getUserId(token);
        const task_id = req.params.id;

        console.log(await taskService.verifyTaskAssignedToUser(task_id, user_id));

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}