// services/userService.js

import db from "../utils/db.js";

/**
 * Get user's profile
 * Unimplemented
 * @param {*} user_id 
 * @returns A user's firstname, lastname, and email
 */
async function getUserProfile(user_id) {
    const { data, error } = await db
        .from("users")
        .select("firstname, lastname, email")
        .match({id: user_id});
    
    if (error) {
        throw new Error(error.message)
    }

    return data[0];
}

/**
 * Get's a user's id from their email
 * @param {*} email 
 * @returns A user's user_id
 */
export async function getUserIdFromEmail(email) {
    const { data, error } = await db
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data ? data.id : null;
}
