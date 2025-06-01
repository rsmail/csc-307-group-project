// services/taskService.js

import db from "../utils/db.js";

export async function getAllTasks(user_id) {
    const { data, error } = db
        .from("tasks")
        .select("name, difficulty, status, deadline")
        .match({
            "group_members.user_id": user_id
        });
    
    console.log(data);
    if (error) {
        throw new Error(error);
    }

    return data;
}