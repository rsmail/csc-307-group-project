// controllers/authController.js

import * as authService from "../services/authService.js";

/**
 * Login an existing user
 * @param {*} req body : {email, password}
 * @param {*} res 
 * @returns A JWT token on success
 */
export async function login(req, res) {
    try {
        const token = await authService.loginUser(req.body);
        return res.status(200).send({token: token});
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error.message});
    }
};

/**
 * Registers a new user
 * @param {*} req body : {email, password, firstname, lastname}
 * @param {*} res 
 * @returns A JWT token on success
 */
export async function register(req, res) {
    try {
        const token = await authService.registerUser(req.body);
        return res.status(200).send({token: token});
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

/**
 * Verifies a token is valid
 * @param {*} req 
 * @param {*} res 
 * @param {*} next A function in which to run next
 */
export async function authenticateToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send("Access Token Missing");
    }

    if (authService.authenticateUser(token)) {
        next();
    } else {
        return res.status(401).send("Invalid Access Token");
    }
}
