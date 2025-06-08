// controllers/authController.js

import * as authService from "../services/authService.js";

export async function login(req, res) {
    try {
        console.log(req);
        const token = await authService.loginUser(req.body);
        res.status(200).send({token: token});
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
    }
};

export async function register(req, res) {
    try {
        const token = await authService.registerUser(req.body);
        res.status(200).send({token: token});
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}


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
