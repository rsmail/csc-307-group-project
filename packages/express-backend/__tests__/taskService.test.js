import { beforeAll, afterAll, expect, test } from "vitest";
import * as taskService from "../services/taskService.js";
import * as authService from "../services/authService.js";
import * as groupService from "../services/groupService.js";
import { getUserId } from "../utils/jwt.js";

let group_id;
let token1;
let token2;
let group_member_id1;
let group_member_id2;
let task1;
let task2;
beforeAll(async () => {
    // Create two users and a shared group
    const payload1 = {
        "email" : "vitestTasks@email.com",
        "password": "1234",
        "firstname": "vi",
        "lastname": "test"
    };
    const payload2 = {
        "email" :"vitestTasks2@email.com",
        "password": "1234",
        "firstname": "vi2",
        "lastname" : "test"
    };

    token1 = await authService.registerUser(payload1);
    token2 = await authService.registerUser(payload2);

    const user_id1 = getUserId(token1);
    const user_id2 = getUserId(token2);

    group_id = await groupService.createGroup("TestTasks", "Testing Tasks", user_id1);
    await groupService.inviteUserToGroup(group_id, user_id2);
    await groupService.acceptGroupInvite(group_id, user_id2);

    const members = await groupService.getGroupMembers(group_id);
    group_member_id1 = members[0].group_member_id;
    group_member_id2 = members[1].group_member_id;
})

afterAll(async () => {
    // Delete both users (and associated data) after testing
    await authService.deleteUser(token1);
    await authService.deleteUser(token2);
})


test("Testing creating an new task for user1", async () => {
    const payload = {
        "group_member_id" : group_member_id1,
        "name": "Testing Task User1",
        "difficulty": 2,
        "deadline": "2025-06-04"
    };

    const data = await taskService.createNewTask(payload);

    expect(data[0]).toHaveProperty("group_member_id");
    expect(data[0]).toHaveProperty("name");
    expect(data[0]).toHaveProperty("difficulty");
    expect(data[0]).toHaveProperty("deadline");
    expect(data[0]).toHaveProperty("status");
})

test("Testing creating a new task for user2", async() => {
    const payload = {
        "group_member_id" : group_member_id2,
        "name": "Testing Task User1",
        "difficulty": 2,
        "deadline": "2025-06-04"
    };

    const data = await taskService.createNewTask(payload);

    expect(data[0]).toHaveProperty("group_member_id");
    expect(data[0]).toHaveProperty("name");
    expect(data[0]).toHaveProperty("difficulty");
    expect(data[0]).toHaveProperty("deadline");
    expect(data[0]).toHaveProperty("status");
})

test("Testing creating a new task for a user not in group", async () => {
    const payload = {
        "group_member_id" : -1,
        "name": "Testing Task User1",
        "difficulty": 2,
        "deadline": "2025-06-04"
    };

    await expect(taskService.createNewTask(payload)).rejects.toThrow();
})

test("Testing fetching a user's tasks (user1)", async () => {
    const user_id = getUserId(token1);
    const tasks = await taskService.getAllUserTasks(user_id);
    expect(tasks.length).toBe(1);

    task1 = tasks[0].task_id;
})

test("Testing fetching a user's tasks (user2)", async () => {
    const user_id = getUserId(token2);
    const tasks = await taskService.getAllUserTasks(user_id);

    expect(tasks.length).toBe(1);

    task2 = tasks[0].task_id;
})

test("Testing fetching a user's tasks with query", async () => {
    const user_id = getUserId(token1);
    const tasks = await taskService.getAllUserTasks(user_id, "COMPLETED");

    expect(tasks.length).toBe(0);
})

test("Testing fetching a user's tasks with query", async () => {
    const user_id = getUserId(token1);
    const tasks = await taskService.getAllUserTasks(user_id, null, "ASC");

    expect(tasks.length).toBe(1);
})

test("Testing fetching a group's tasks", async () => {
    const tasks = await taskService.getGroupTasks(group_id);

    expect(tasks.length).toBe(2);
})

test("Testing fetching a group's tasks with query", async () => {
    const tasks = await taskService.getGroupTasks(group_id, "COMPLETED");
    
    expect(tasks.length).toBe(0);
})

test("Testing fetching a group's tasks with query", async () => {
    const tasks = await taskService.getGroupTasks(group_id, null, "ASC");

    expect(tasks.length).toBe(2);
})

test("Testing task assignment verification", async () => {
    const user_id = getUserId(token1);
    await expect(taskService.verifyTaskAssignedToUser(task1, user_id)).resolves.toBeTruthy();
})

test("Testing marking task as complete", async () => {
    await expect(taskService.markTaskComplete(task1)).resolves.not.toThrow();
})

test("Testing deleting a task", async () => {
    await expect(taskService.deleteTask(task2)).resolves.not.toThrow();
})

test("Testing task assignment verification", async () => {
    const user_id = getUserId(token2);

    // Task has been deleted, should be false
    await expect(taskService.verifyTaskAssignedToUser(task2, user_id)).resolves.toBeFalsy();
})

test("Testing deleating a non-existant task", async () => {
    // This should resolve since no error is thrown
    await expect(taskService.deleteTask(-1)).resolves.not.toThrow();
})
