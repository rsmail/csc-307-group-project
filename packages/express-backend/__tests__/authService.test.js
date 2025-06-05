import { expect, test } from "vitest";
import * as authService from "../services/authService.js";
import jwt from "jsonwebtoken"

test("Testing logging in an existing user", async () => {
    const credentials = {
        "email" : "Test@email.com",
        "password": "password"
    };

    const token = await authService.loginUser(credentials);
    expect(typeof token).toBe("string");

    const decoded = jwt.decode(token);

    expect(decoded).toHaveProperty("user_id");
})

test("Testing logging in a user that doesn't exist", async () => {
    const credentials = {
        "email" : "noUser@email.com",
        "password": "1234"
    };

    const error = "User does not exist";

    
    await expect(authService.loginUser(credentials)).rejects.toThrow(error);
})

test("Testing logging in an existing user with wrong password", async () => {
    const credentials = {
        "email" : "Test@email.com",
        "password": "1234"
    };

    const error = "Incorrect username or password";

    await expect(authService.loginUser(credentials)).rejects.toThrow(error);
})

test("Registering a new user", async () => {
    const payload = {
        "email": "vitest@email.com",
        "password" : "test",
        "firstname" : "vi",
        "lastname" : "test"
    };

    const token = await authService.registerUser(payload);
    expect(typeof token).toBe("string");

    const decoded = jwt.decode(token);
    expect(decoded).toHaveProperty("user_id");

    // Cleanup
    await expect(authService.deleteUser(token)).resolves.not.toThrow();
})
