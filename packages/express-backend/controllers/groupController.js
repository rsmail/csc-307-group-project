// controllers/groupController.js

import * as groupService from "../services/groupService.js";
import { getUserId } from "../utils/jwt.js"

export async function getUserGroups(req, res) {
    try {
        const token = req.headers.authorization;
        const user_id = getUserId(token);

        const groups = await groupService.getUserGroups(user_id)
        res.status(200).send(groups);
    } catch (error) {
        console.log(error);
    }
}