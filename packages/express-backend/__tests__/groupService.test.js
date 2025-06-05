import { beforeAll, expect, test } from "vitest";
import * as groupService from "../services/groupService.js";
import * as authSerice from "../services/authService.js";
import { getUserId } from "../utils/jwt.js";


let token;
beforeAll(async () => {
    // Create a new user for all testing
    const payload = {
        "email" : "vitest@email.com",
        "password": "1234",
        "firstname": "vi",
        "lastname": "test"
    };
    token = await authSerice.registerUser(payload);
})

afterAll(async () => {
    // Delete user after all test finish
    if (token) await authSerice.deleteUser(token);
})

test("Testing creating a new group", async () => {
    const group_name = "vitest";
    const user_id = getUserId(token);

    const group_id = await createGroup(group_name, user_id);
})