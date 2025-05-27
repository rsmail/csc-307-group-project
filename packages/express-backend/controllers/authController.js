// controllers/authController.js

import authService from "../services/authService.js";

async function login(req, res) {
    try {
        const token = await authService.loginUser(req.body);
        res.status(200).send({token: token});
    } catch (error) {
        console.log(error);
        res.status(401).send(error);
    }
};

async function register(req, res) {
    try {
        const token = await authService.registerUser(req.body);
        res.status(200).send({token: token});
    } catch (error) {
        res.status(401).send(error);
    }
}

export default { login, register };
