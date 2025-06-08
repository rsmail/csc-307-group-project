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
export async function loginUser({ email, password }) {
    const { data, error } = await db
        .from("users")
        .select("id, password")
        .match({ email: email });

    if (error) {
        throw new Error(error.message);
    }
    if (data.length === 0) {
        throw new Error("User does not exist");
    }

    const user = data[0];

    // Check that password matches
    if (await bcrypt.compare(password, user.password)) {
        // Generate a new token for the user
        const token = await generateToken(user.id);

        return token;
    }
    
    throw new Error("Incorrect username or password");
}

/**
 * Registers a new user
 * @param {*} email
 * @param {*} password
 * @returns A token on success, -1 on failure
 */
export async function registerUser(payload) {
    const email = payload.email;
    const password = payload.password;
    const firstname = payload.firstname;
    const lastname = payload.lastname;
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
export async function authenticateUser(token) {
    return verifyToken(token);
}

/**
 * Deletes a user from the database
 * @param {*} user_id 
 */
export async function deleteUser(user_id) {
    const { error } = await db
        .from("users")
        .delete()
        .eq("id", user_id);
    
    if (error) {
        throw new Error(error.message);
    }
}

