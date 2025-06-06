// services/taskService.js

import db from "../utils/db.js";

export async function createTask(taskData) {
    const { data, error } = await db
        .from("tasks")
        .insert([taskData])
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
}

export async function getUserTasks(user_id) {
    const { data, error } = await db
        .from("tasks")
        .select("*")
        .eq("user_id", user_id);

    if (error) throw new Error(error.message);
    return data;
}

export async function getTasksForGroup(group_id) {
    const { data, error } = await db
        .from("tasks")
        .select("*")
        .eq("group_id", group_id);

    if (error) throw new Error(error.message);
    return data;
}

export async function updateTask(task_id, updates) {
    const { data, error } = await db
        .from("tasks")
        .update(updates)
        .eq("id", task_id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;

}

export async function deleteTask(task_id) {
    const { error } = await db
        .from("tasks")
        .delete()
        .eq("id", task_id);

    if (error) throw new Error(error.message);

}
