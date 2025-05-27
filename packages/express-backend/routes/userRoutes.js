// routes/userRoute.js

import express from "express";
//import userController from "../controllers/userController.js";
import db from "../utils/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const { data, error } = await db.from("users").select("*");

    if (error) {
        console.error(
            "Error getting data from Supabase",
            error
        );
        res.status(500).json({ error });
    } else {
        res.status(200).json({ users_list: data });
    }
});

export default router;
