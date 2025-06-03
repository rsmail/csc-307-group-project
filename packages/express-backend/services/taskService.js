// services/taskService.js

import db from "../utils/db.js";

export async function getAllUserTasks(user_id) {
    const { data, error } = await db
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
    
    if (error) {
        throw new Error(error);
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


export async function createNewTask({name, difficulty, deadline, group_member_id}) {

}