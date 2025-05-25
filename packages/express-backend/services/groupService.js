// services/groupService.js

import db from "../utils/db.js";

/**
 * Create a new group
 * @param {*} groupName 
 * @param {*} ownerId 
 * @returns The groupId
 */
export async function createGroup(groupName, ownerId) {
    // Inserting new group
    const { data, error } = db
        .from("groups")
        .insert({
            groupName : groupName,
            groupOwner : ownerId
        })
        .select()
    
    if (error) {
        console.log(error);
        throw new Error(error);
    }

    const group = data[0];
    addOwnerToGroup(group.id, ownerId);

    return group.id;
}

/**
 * Adds an owner to a group with status ACCEPTED
 * @param {*} groupId 
 * @param {*} ownerId 
 */
export async function addOwnerToGroup(groupId, ownerId) {
    const { error } = db
        .from("group_members")
        .insert({
            userId: ownerId,
            groupId: groupId,
            status: "ACCEPTED"
        });
    
    if (error) {
        console.log(error);
        throw new Error(error);
    }
}

/**
 * Adds an entry to group_members and set status to pending
 * @param {*} groupId 
 * @param {*} userId
 */
export async function inviteUserToGroup(groupId, userId) {
    const { error } = db
        .from("group_members")
        .insert({
            userId: userId,
            groupId : groupId,
            status : "PENDING"
        });
    
        if (error) {
            console.log(error);
            throw new Error(error);
        }
}



/**
 * Updates user from PENDING to ACCEPTED
 * @param {*} groupId 
 * @param {*} userId 
 */
export async function addUserToGroup(groupId, userId) {
    const { error } = db
        .from("group_members")
        .update({
            status : "ACCEPTED"
        })
        .match({
            userId: userId,
            groupId: groupId,
            status: "PENDING"
        });
    
    if (error) {
        console.log(error);
        throw new Error(error);
    }
}


/**
 * Updates user status from PENDING to DECLINED
 * @param {*} groupId 
 * @param {*} userId 
 */
export async function declineGroupInvite(groupId, userId) {
    const { error } = db
        .from("group_members")
        .update({
            status: "DECLINED"
        })
        .match({
            userId: userId,
            groupId: groupId,
            status: "PENDING"
        });
    
    if (error) {
        console.log(error);
        throw new Error(error);
    }
}

/**
 * Removes a user from a group
 * @param {*} groupId 
 * @param {*} userId 
 */
export async function removeUserFromGroup(groupId, userId) {
    const { error } = db
        .from("group_members")
        .delete()
        .match({
            userId: userId,
            groupId: groupId,
        });
}

/**
 * Lists all groups a user is in
 * @param {*} userId 
 */
export async function getUserGroups(userId) {
    const { data, error } = await db
        .from("group_members")
        .select("group_id")
        .match({
            user_id: userId,
            status: "ACCEPTED"
        });

    if (error) {
        console.log(error);
        throw new Error(error);
    }

    return data
}

