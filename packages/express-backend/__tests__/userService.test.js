import { beforeAll, afterAll, expect, test } from "vitest";
import * as userService from "../services/userService.js";
import * as authService from "../services/authService.js";
import { getUserId } from "../utils/jwt.js";


let token;
beforeAll(async () => {
    // Create a user for testing
    const payload = {
        "email": "testUser@email.com",
        "password": "1234",
        "firstname": "vi",
        "lastname": "test"
    };

    token = await authService.registerUser(payload);
})

afterAll(async () => {
    // Remove the test user
    await authService.deleteUser(token);
})

// This function isn't tied to a feature yet
test("Testing fetching a user's profile", async () => {
    const user_id = getUserId(token);
    const profile = await userService.getUserProfile(user_id);

    expect(profile).toHaveProperty("firstname");
    expect(profile).toHaveProperty("lastname");
    expect(profile).toHaveProperty("email");
})