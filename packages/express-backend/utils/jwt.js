// utils/jwt.js

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

/**
 * Generates a new token for a user
 * @param {*} email 
 * @returns `JWTtoken`
 */
function generateToken(user_id) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { user_id: user_id},
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
async function verifyToken(token) {
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
    if (!token) return null;

    try {
        const payload = jwt.decode(token);

        if (!payload || !payload.user_id) {
            console.error("jwt.decode returned invalid payload:", payload);
            return null;
        }

        return payload.user_id;
    } catch (err) {
        console.error("Error decoding token:", err.message);
        return null;
    }
}






export { generateToken, verifyToken, getUserId };