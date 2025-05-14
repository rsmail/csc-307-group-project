// backend.js
import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URI = process.env.SUPABASE_URI;
const ANON_KEY = process.env.ANON_KEY;

const supabase = createClient(SUPABASE_URI, ANON_KEY);

const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send(`Hello World`);
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});

app.get("/users", async (req, res) => {
    // .select() defaults to select *
    const { data, error } = await supabase
        .from("users")
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
});
