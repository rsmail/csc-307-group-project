// services/groupService.js

import db from "../utils/db.js";

/**
 * Create a new group
 * @param {*} groupName 
 * @param {*} ownerId 
 * @returns The groupId
 */
export async function createGroup(groupName, groupDescription, ownerId) {
    console.log("createGroup called with:", { groupName, groupDescription, ownerId });

    const { data, error } = await db
        .from("groups")
        .insert({
            groupName: groupName,
            description: groupDescription,
            groupOwner: ownerId
        })
        .select();

    if (error) {
        console.error(" Error inserting into groups:", error.message);
        throw new Error(error.message);
    }

    const group = data[0];
    console.log("Group created with ID:", group.id);

    try {
        await addOwnerToGroup(group.id, ownerId);
    } catch (addErr) {
        console.error("Failed to add owner to group_members:", addErr.message);
        throw new Error(addErr.message);
    }

    return group.id;
}

export async function getGroupInfo(group_id) {
    const { data, error } = await db
        .from("groups")
        .select("groupName, description")
        .eq("id", group_id);
    
    if (error) {
        throw new Error(error.message);
    }
    
    return data.map((item) => ({
        group_name: item.groupName,
        description: item.description
    }));
}


/**
 * Adds an owner to a group with status ACCEPTED
 * @param {*} groupId 
 * @param {*} ownerId 
 */
export async function addOwnerToGroup(groupId, ownerId) {
    console.log("👥 Adding owner to group_members:", { groupId, ownerId });

    const { error } = await db
        .from("group_members")
        .insert({
            user_id: ownerId,
            group_id: groupId,
            status: "ACCEPTED"
        });

    if (error) {
        console.error(" Error inserting into group_members:", error.message);
        throw new Error(error.message);
    }

    console.log(" Owner added to group_members");
}


/**
 * Adds an entry to group_members and set status to pending
 * @param {*} groupId 
 * @param {*} userId
 */
export async function inviteUserToGroup(groupId, userId) {
    const { error } = await db
        .from("group_members")
        .insert({
            user_id: userId,
            group_id : groupId,
            status : "ACCEPTED"
        });

        if (error) {
            throw new Error(error.message);
        }
    
    return;
}

/**
 * Updates user from PENDING to ACCEPTED
 * @param {*} groupId 
 * @param {*} userId 
 */
export async function acceptGroupInvite(groupId, userId) {
    const { data, error } = await db
        .from("group_members")
        .update({
            status : "ACCEPTED"
        })
        .match({
            user_id: userId,
            group_id: groupId,
            status: "PENDING"
        })
        .select();
    
    if (error) {
        throw new Error(error.message);
    }

    if (!data) {
        throw new Error("User does not have a pending invite");
    }
}

/**
 * Updates user status from PENDING to DECLINED
 * @param {*} groupId 
 * @param {*} userId 
 */
export async function declineGroupInvite(groupId, userId) {
    // Should we delete the entry instead? This would allow for reinvites
    const { error } = await db
        .from("group_members")
        .update({
            status: "DECLINED"
        })
        .match({
            user_id: userId,
            group_id: groupId,
            status: "PENDING"
        });
    
    if (error) {
        throw new Error(error.message);
    }
}

/**
 * Fetches a users pending invites
 * @param {*} userId 
 * @returns A list of {group_id, group_name}
 */
export async function getUsersPendingInvites(userId) {
    const { data, error } = await db
        .from("group_members")
        .select("group_id, groups(groupName)")
        .match({
            user_id: userId,
            status: "PENDING"
        });
    
    if (error) {
        throw new Error(error.message);
    }

    return data.map(item => ({
        group_id: item.group_id,
        group_name: item.groups.groupName
    }));
}

/**
 * Removes a user from a group
 * @param {*} groupId 
 * @param {*} userId 
 */
export async function removeUserFromGroup(groupId, userId) {
    const { error } = await db
        .from("group_members")
        .delete()
        .match({
            user_id: userId,
            group_id: groupId,
        });
    
    if (error) {
        throw new Error(error.message);
    }
}

/**
 * Fetches all groups a user is in
 * @param {*} userId 
 * @return A list of {group_id, group_name}
 */
export async function getUserGroups(userId) {
    const { data, error } = await db
        .from("group_members")
        .select("group_id, groups(groupName)")
        .match({
            user_id: userId,
            status: "ACCEPTED"
        });

    if (error) {
        throw new Error(error.message);
    }

    return data.map(item => ({
        group_id: item.group_id,
        group_name: item.groups.groupName
    }));
}

export async function getGroupWithTaskCounts(userId) {
    const { data, error } = await db.rpc("get_groups_with_task_counts", {p_user_id : userId});


    if (error) {
        throw new Error(error.message);
    }

    return data;
}

/**
 * Fetches all group info including members
 * @param {*} groupId 
 * @returns Group_id, group_name, and group_members
 */
export async function getGroupMembers(groupId) {
    const { data, error } = await db
        .from("group_members")
        .select("id, user_id, users(firstname, lastname)")
        .match({
            "group_id": groupId,
            "status": "ACCEPTED"
        });

    if (error) {
        throw new Error(error.message);
    }

    return data.map(item => ({
        group_member_id: item.id,
        user_id: item.user_id,
        firstname: item.users.firstname,
        lastname: item.users.lastname
    }));
}

export async function verifyUserInGroup(groupId, userId) {
    const { data, error } = await db
        .from("group_members")
        .select()
        .match({
            user_id: userId,
            group_id: groupId,
            status: "ACCEPTED"
        });
    
    if (error) {
        throw new Error(error.message);
    }

    return !!data.length;
}
