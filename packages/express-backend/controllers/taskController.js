// controllers/taskController.js

import * as taskService from "../services/taskService.js";
import { verifyUserInGroup } from "../services/groupService.js";
import { getUserId } from "../utils/jwt.js";

/**
 * Fetches all tasks belonging to the user
 * Optional query parameter of status
 * @param {*} req 
 * @param {*} res 
 * @returns A list of the user's tasks
 */
export async function getAllUserTasks(req, res) {
    try {
        const token = req.headers.authorization;
        const user_id = getUserId(token);
        const status = typeof req.query.status === 'string' ? req.query.status : null;
        const order = typeof req.query.order === 'string' ? req.query.order : null;

        const tasks = await taskService.getAllUserTasks(user_id, status, order);
        return res.status(200).send(tasks);
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error.message});
    }
}

/**
 * Fetches all tasks belonging to a group
 * 
 * Optional query parameter of status and deadline (asc or desc)
 * @param {*} req 
 * @param {*} res 
 * @returns A list of the group's tasks
 */
export async function getGroupTasks(req, res) {
    try {
        const token = req.headers.authorization;
        const user_id = getUserId(token);
        const group_id = req.params.id;
        const status = typeof req.query.status === 'string' ? req.query.status : null;
        const order = typeof req.query.order === 'string' ? req.query.order : null;

        if (!(await verifyUserInGroup(group_id, user_id))) {
            return res.status(401).send("User not in group");
        }

        const tasks = await taskService.getGroupTasks(group_id, status, order);
        return res.status(200).send(tasks);
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error.message});
    }
}

/**
 * Creates a new task
 * @param {*} req Body: {group_member_id, name, difficulty, deadline}
 * @param {*} res 
 * @returns The body payload on success
 */
export async function createNewTask(req, res) {
    try {
        const token = req.headers.authorization;
        const user_id = getUserId(token);
        const group_id = req.params.id;

        if (!(await verifyUserInGroup(group_id, user_id))) {
            return res.status(401).send("User not in group");
        }

        const task = await taskService.createNewTask(req.body);
        return res.status(201).send(task);

    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

/**
 * Marks a task as completed
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export async function markTaskComplete(req, res) {
    try {
        const token = req.headers.authorization;
        const user_id = getUserId(token);
        const task_id = req.params.id;

        if(!(await taskService.verifyTaskAssignedToUser(task_id, user_id))) {
            return res.status(401).send("Task does not belong to user");
        }

        await taskService.markTaskComplete(task_id);

        return res.status(200).send("Task completed");
        

    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error.message});
    }
}

export async function deleteTask(req, res) {
    try {
        const token = req.headers.authorization;
        const user_id = getUserId(token);
        const group_id = req.params.id;
        const task_id = req.params.task_id;

        if (!(await verifyUserInGroup(group_id, user_id))) {
            return res.status(401).send("User not in group");
        }

        await taskService.deleteTask(task_id);
        return res.status(200).send("Task successfully deleted");
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error.message});
    }
}

/**
 * Additional feature not to be implemented.
 * Approves a task completed by another user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export async function approveTask(req, res) {
    try {
        const token = req.headers.authorization;
        const user_id = getUserId(token);
        const group_id = req.params.id;
        const task_id = req.params.task_id;

        if (!(await verifyUserInGroup(group_id, user_id))) {
            return res.status(401).send("User not in group");
        }
        if (await taskService.verifyTaskAssignedToUser(task_id, user_id)) {
            return res.status(401).send("Task belongs to user");
        }

        taskService.approveTask(task_id, user_id);
        res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error.message});
    }
}