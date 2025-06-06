import * as userService from "../services/userService.js";
import { getUserId } from "../utils/jwt";

/**
 * Fetches a user's profile
 * @param {*} req 
 * @param {*} res 
 * @returns JSON in the form of {firstname, lastname, email}
 */
export async function getUserProfile(req, res) {
    try {
        const token = req.headers.authorization;
        const user_id = getUserId(token);

        const profile = await userService.getUserProfile(user_id);
        return res.status(200).send(profile);
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error.message});
    }
}