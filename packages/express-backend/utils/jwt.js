// utils/jwt.js

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

/**
 * Generates a new token for a user
 * @param {*} email 
 * @returns `JWTtoken`
 */
function generateToken(email) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { email: email},
            process.env.TOKEN_SECRET,
            { expiresIn: "1d" },
            (error, token) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(token);
                }
            }
        );
    });
}

/**
 * Verifies the provided token
 * @param {*} token 
 * @returns `boolean`
 */
function verifyToken(token) {
    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
        return true;
    } catch (error) {
        return false;
    }
}

export { generateToken, verifyToken };