// services/authService.js

import db from "../db.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
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
        .select("password, token")
        .match({email: email});
    
    if (error | data.length === 0) {
        throw new Error(error);
    }

    const user = data[0];

    // Check that password matches
    if (await bcrypt.compare(password, user.password)) {
        let token = user.token;

        // Check if token is still valid
        if (!verifyToken(user.token)) {
            token = generateToken(email);
        }
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
async function registerUser({ email, password }) {
    const hashedPwd = await bcrypt.hash(password, 10);
    const token = await generateToken(email);

    // Add user to the database
    const { error } = await db
        .from("users")
        .insert({
            email: email,
            password: hashedPwd,
            token: token
        });
    
    if (error) {
        throw new Error(error)
    }
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