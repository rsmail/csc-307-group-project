// services/userService.js

import db from "../utils/db.js";

/**
 * Get user's profile
 * @param {*} user_id 
 * @returns A user's firstname, lastname, and email
 */
async function getUserProfile(user_id) {
    const { data, error } = await db
        .from("users")
        .select("firstname, lastname, email")
        .match({id: user_id});
    
    if (error) {
        console.log(error);
        return -1;
    }

    return data[0];
}
