// controllers/groupController.js

import * as groupService from "../services/groupService.js";
import { getUserId } from "../utils/jwt.js"
import { getUserIdFromEmail } from "../services/userService.js";

/**
 * Fetches the user's groups
 * @param {*} req 
 * @param {*} res 
 * @returns A list of group_ids
 */
export async function getUserGroups(req, res) {
    try {
        const token = req.headers.authorization;
        const user_id = getUserId(token);

        const groups = await groupService.getUserGroups(user_id)
        return res.status(200).send(groups);
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error.message});
    }
}

export async function getUserGroupWithTasks(req, res) {
    try {
        const token = req.headers.authorization;
        const user_id = getUserId(token);

        const groups = await groupService.getGroupWithTaskCounts(user_id);
        return res.status(200).send(groups);
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error.message});
    }
}


/**
 * Creates a new group 
 * @param {*} req Body: {group_name}
 * @param {*} res 
 * @returns Id of newly created group
 */
export async function createGroup(req, res) {
    try {
        const token = req.headers.authorization;
        const user_id = getUserId(token);
        const group_name = req.body.group_name;
        const group_description = req.body.group_description;

        const group_id = await groupService.createGroup(group_name, group_description, user_id);
        return res.status(201).send({group_id: group_id});
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error.message});
    }
}

/**
 * Sends a invite from a group to a user
 * @param {*} req Body: {user_id} // The user_id to send the invite to
 * @param {*} res 
 */
export async function sendGroupInvite(req, res) {
    try {
        // Verify the sender of the request is in the group
        const token = req.headers.authorization;
        const group_member_id = getUserId(token);
        const group_id = req.params.id;

        if (!(await groupService.verifyUserInGroup(group_id, group_member_id))) {
            return res.status(401).send("User not in group");
        }

        const email = req.body.email;
        const user_id = await getUserIdFromEmail(email);
        
        await groupService.inviteUserToGroup(group_id, user_id);
        return res.status(201).send("User successfully invited");
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error.message});
    }
}

/**
 * Accepts a pending invite
 * @param {*} req 
 * @param {*} res 
 */
export async function acceptGroupInvite(req, res) {
    try {
        const token = req.headers.authorization;
        const user_id = getUserId(token);
        const group_id = req.params.id;

        await groupService.acceptGroupInvite(group_id, user_id);
        return res.status(200).send("User successfull accepted invite");
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error.message});
    }
}

/**
 * Fetches all members of a group
 * @param {*} req 
 * @param {*} res 
 * @returns A list of {user_id, firstname, lastname} on success
 */
export async function getGroupMembers(req, res) {
    try {
        const token = req.headers.authorization;
        const group_member_id = getUserId(token);
        const group_id = req.params.id;

        if (!(await groupService.verifyUserInGroup(group_id, group_member_id))) {
            return res.status(401).send("User not in group");
        }

        const members = await groupService.getGroupMembers(group_id);
        return res.status(200).send(members);
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
    }
}

/**
 * Fetches a group's name and description
 * @param {*} req 
 * @param {*} res 
 */
export async function getGroupInfo(req, res) {
    try {
        const token = req.headers.authorization;
        const user_id = getUserId(token);
        const group_id = req.params.id;

        if (!(await groupService.verifyUserInGroup(group_id, user_id))) {
            return res.status(401).send("User not in group");
        }

        const group_info = await groupService.getGroupInfo(group_id);
        return res.status(200).send(group_info);
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
    }
}

/**
 * Fetches a users pending invites
 * @param {*} req 
 * @param {*} res 
 * @returns A list of {group_id, group_name} on success
 */
export async function getPendingInvites(req, res) {
    try {
        const token = req.headers.authorization;
        const user_id = getUserId(token);
        
        const groups = await groupService.getUsersPendingInvites(user_id);
        return res.status(200).send(groups);
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
    }
}

/**
 * Removes a user from a group
 * @param {*} req 
 * @param {*} res 
 */
export async function removeGroupMember(req, res) {
     try {
        const token = req.headers.authorization;
        const user_id = getUserId(token);
        const group_id = req.params.id;

        if (!(await groupService.verifyUserInGroup(group_id, user_id))) {
            return res.status(401).send("User not in group");
        }

        const user_id_to_delete = req.body.user_id;

        await groupService.removeUserFromGroup(group_id, user_id_to_delete);
        return res.status(204).send("User successfully removed");
     } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
     }
}