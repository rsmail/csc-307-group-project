// utils/jwt.js

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

/**
 * Generates a new token for a user
 * @param {*} email 
 * @returns `JWTtoken`
 */
function generateToken(userId) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { userId: userId},
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

/**
 * Extracts the userId from a token.
 * 
 * Does not check if the token is valid
 * @param {*} token 
 * @returns The userId extracted from the token
 */
function getUserId(token) {
    const payload = jwt.decode(token);
    return payload.userId;
}

export { generateToken, verifyToken, getUserId };