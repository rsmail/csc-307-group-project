// services/authService.js

import db from "../utils/db.js";
import {
    generateToken,
    verifyToken,
    getUserId
} from "../utils/jwt.js";
import bcrypt from "bcrypt";

/**
 * Log in an existing user
 * @param {*} email A user's email
 * @param {*} password A user's password
 * @returns A token on success, -1 on failure
 */
async function loginUser({ email, password }) {
    const { data, error } = await db
        .from("users")
        .select("id, password")
        .match({ email: email });

    if (error || data.length === 0) {
        throw new Error(error.message);
    }

    const user = data[0];

    // Check that password matches
    if (await bcrypt.compare(password, user.password)) {
        // Generate a new token for the user
        const token = await generateToken(user.id);

        return token;
    }
    throw new Error("Unable to process request");
}

/**
 * Registers a new user
 * @param {*} email
 * @param {*} password
 * @returns A token on success, -1 on failure
 */
async function registerUser({
    email,
    password,
    firstname,
    lastname
}) {
    const hashedPwd = await bcrypt.hash(password, 10);

    // Add user to the database and retrieve their userId
    const { data, error } = await db
        .from("users")
        .insert({
            email: email,
            password: hashedPwd,
            firstname: firstname || null,
            lastname: lastname || null
        })
        .select();

    if (error) {
        throw new Error(error.message);
    }
    const user = data[0];
    const token = await generateToken(user.id);

    return token;
}

/**
 * Verifies authentication of a user based on their token
 * @param {*} token
 */
async function authenticateUser(token) {
    return verifyToken(token);
}

export default { loginUser, registerUser, authenticateUser };
