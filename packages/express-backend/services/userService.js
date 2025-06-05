// services/userService.js

import db from "../utils/db.js";

/**
 * Get user's profile
 * Unimplemented
 * @param {*} user_id 
 * @returns A user's firstname, lastname, and email
 */
export async function getUserProfile(user_id) {
    const { data, error } = await db
        .from("users")
        .select("firstname, lastname, email")
        .match({id: user_id});
    
    if (error) {
        throw new Error(error.message)
    }

    return data[0];
}
