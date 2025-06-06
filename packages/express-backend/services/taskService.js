// services/taskService.js

import db from "../utils/db.js";

/**
 * Fetches all IN_PROGRESS tasks for the user
 * @param {*} user_id 
 * @returns A list of tasks
 */
export async function getAllUserTasks(user_id, status = null, order = null) {
    let query = db
        .from("tasks")
        .select(`
                id,
                name,
                difficulty,
                status,
                deadline,
                group_members:group_member_id!inner(user_id, group_id)
            `)
        .match({
            "group_members.user_id": user_id
        });

    if (typeof status === 'string' && status.length > 0) {
        query.eq("status", status);
    }
    if (typeof order === 'string' && order.length > 0) {
        query = query.order("deadline", {ascending: order === 'asc'});
    }


    const { data, error } = await query;
    
    if (error) {
        throw new Error(error.message);
    }

    return data.map(task => ({
        task_id : task.id,
        name: task.name,
        difficulty: task.difficulty,
        status: task.status,
        deadline: task.deadline,
        group_id: task.group_members.group_id
    }));
}


/**
 * Fetches all tasks for a group
 * @param {*} group_id 
 * @returns A list of tasks
 */
export async function getGroupTasks(group_id, status = null, order = null) {
    let query = db
        .from("tasks")
        .select(`
            id,
            name,
            difficulty,
            status,
            deadline,
            group_members:group_member_id!inner(user_id)
        `)
        .match({
            "group_members.group_id": group_id
        });

    if (typeof status === 'string' && status.length > 0) {
        query = query.eq("status", status);
    }
    if (typeof order === 'string' && order.length > 0) {
        query = query.order("deadline", {ascending: order === 'asc'});
    }

    const { data, error } = await query;

    if (error) {
        throw new Error(error.message);
    }
    return data.map(task => ({
        task_id : task.id,
        name: task.name,
        difficulty: task.difficulty,
        status: task.status,
        deadline: task.deadline,
        assigned_to: task.group_members.group_id
    }));
}


/**
 * Creates a new task and assigns to a group member
 * @param {*} payload {group_member_id, name, difficulty, deadline}
 * @returns The payload on success
 */
export async function createNewTask(payload) {
    const group_member_id = payload.group_member_id;
    const name = payload.name;
    const difficulty = payload.difficulty;
    const deadline = payload.deadline

    const { data, error } = await db
        .from("tasks")
        .insert({
            "group_member_id" : group_member_id,
            "name" : name,
            "difficulty": difficulty,
            "deadline": deadline,
            "status": "IN_PROGRESS"
        })
        .select();
        
    if (error) {
        throw new Error(error.message);
    }

    return data;
}

/**
 * Updates a task's status to APPROVAL_NEEDED
 * @param {*} task_id 
 */
export async function markTaskComplete(task_id) {
    const { error } = await db
        .from("tasks")
        .update({
            status : "COMPLETED"
        })
        .match({
            id: task_id
        });
    
    if (error) {
        throw new Error(error.message);
    }

    return;
}


export async function approveTask(task_id, user_id) {
    const { error } = await db
        .from("tasks")
        .update({
            status : "COMPLETED",
            approved_by: user_id
        })
        .match({
            id : task_id
        });
    
    if (error) {
        throw new Error(error.message);
    }
}

export async function deleteTask(task_id) {
    const { error } = await db
        .from("tasks")
        .delete()
        .eq("id", task_id);
    
    if (error) {
        throw new Error(error.message);
    }
}

/**
 * Checks whether a task is assigned to a user
 * @param {*} task_id 
 * @param {*} user_id 
 * @returns True if the task is assigned to the user, otherwise false
 */
export async function verifyTaskAssignedToUser(task_id, user_id) {
    const { data, error } = await db
        .from("tasks")
        .select(`
            *,
            group_members:group_member_id!inner(user_id)
        `)
        .match({
            "id": task_id,
            "group_members.user_id": user_id,
            "status": "IN_PROGRESS"
        });
    
    if (error) {
        throw new Error(error.message);
    }

    return !!data.length;
        
}
