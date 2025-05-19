// backend.js
// note: npx nodemon backend.js (node backend.js for default)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { registerUser } from "./auth.js";
import { loginUser } from "./auth.js";
import { authenticateUser } from "./auth.js";

dotenv.config();
// connect early - takes time + asynchronous
const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
    .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
    .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});

app.get("/users", authenticateUser, (req, res) => {
    const name = req.query.name;
});

app.post("/signup", registerUser);

app.post("/login", loginUser);

app.post("/users", authenticateUser, (req, res) => {
    const userToAdd = req.body;
    Users.addUser(userToAdd).then((result) =>
        res.status(201).send(result)
    );
});