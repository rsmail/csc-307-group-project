import { beforeAll, afterAll, expect, test } from "vitest";
import * as groupService from "../services/groupService.js";
import * as authService from "../services/authService.js";
import { getUserId } from "../utils/jwt.js";

let group_id;
let token1;
let token2;
beforeAll(async () => {
    // Create new users for all testing
    const payload1 = {
        "email" : "vitestGroups@email.com",
        "password": "1234",
        "firstname": "vi",
        "lastname": "test"
    };
    const payload2 = {
        "email" :"vitestGroups2@email.com",
        "password": "1234",
        "firstname": "vi2",
        "lastmane" : "test"
    }
    token1 = await authService.registerUser(payload1);
    token2 = await authService.registerUser(payload2)
})

afterAll(async () => {
    // Delete users after all test finish
    // This also deletes all data associated with them
    if (token1) await authService.deleteUser(token1);
    if (token2) await authService.deleteUser(token2);
})

test("Testing creating a new group", async () => {
    const group_name = "vitest";
    const description = "testing groups";
    const user_id = getUserId(token1);

    group_id = await groupService.createGroup(group_name, description, user_id);
    expect(typeof group_id).toBe("number");
})

test("Testing inviting an existing user", async () => {
    const user_id = getUserId(token2);
    await expect(groupService.inviteUserToGroup(group_id, user_id)).resolves.not.toThrow();
})

test("Testing inviting an invalid user", async () => {
    const user_id = -1;
    await expect(groupService.inviteUserToGroup(group_id, user_id)).rejects.toThrow();
})

test("Testing fetching user's pending invites", async () => {
    const user_id = getUserId(token2);
    
    const invites = await groupService.getUsersPendingInvites(user_id);

    expect(invites.length).toBe(1);
})

test("Testing accepting a group invite", async () => {
    const user_id = getUserId(token2);
    await expect(groupService.acceptGroupInvite(group_id, user_id)).resolves.not.toThrow();
})

test("Testing removing a user from a group", async () => {
    const user_id = getUserId(token2);
    await expect(groupService.removeUserFromGroup(group_id, user_id)).resolves.not.toThrow();
})

test("Testing inviting an existing user again", async () => {
    const user_id = getUserId(token2);
    await expect(groupService.inviteUserToGroup(group_id, user_id)).resolves.not.toThrow();
})

test("Testing declining a group invite", async () => {
    const user_id = getUserId(token2);
    await expect(groupService.declineGroupInvite(group_id, user_id)).resolves.not.toThrow();
})

test("Testing inviting an existing user again", async () => {
    const user_id = getUserId(token2);
    await expect(groupService.inviteUserToGroup(group_id, user_id)).resolves.not.toThrow();
})

test("Testing accepting a group invite", async () => {
    const user_id = getUserId(token2);
    await expect(groupService.acceptGroupInvite(group_id, user_id)).resolves.not.toThrow();
})

test("Testing fetching a user's groups", async () => {
    const user_id = getUserId(token2);

    const groups = await groupService.getUserGroups(user_id);

    expect(groups.length).toBe(1);
    for(const group of groups) {
        expect(group).toHaveProperty("group_id");
    }
})

test("Testing fetching group members", async () => {
    const user_id1 = getUserId(token1);
    const user_id2 = getUserId(token2);

    const group_members = await groupService.getGroupMembers(group_id);

    expect(group_members.length).toBe(2);
    for (const member of group_members) {
        expect(member.user_id).toBeOneOf([user_id1, user_id2])
    }
})

test("Testing verifying a user is in a group", async () => {
    const user_id = getUserId(token1);

    await expect(groupService.verifyUserInGroup(group_id, user_id)).resolves.toBeTruthy();
})

test("Testing verifying a user is in a group", async () => {
    const user_id = getUserId(token2);

    await expect(groupService.verifyUserInGroup(group_id, user_id)).resolves.toBeTruthy();
})

test("Testing verifying a user is not in a group", async () => {
    const user_id = -1;
    
    await expect(groupService.verifyUserInGroup(group_id, user_id)).resolves.toBeFalsy();
})