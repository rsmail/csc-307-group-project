// backend.js
// note: npx nodemon backend.js (node backend.js for default)
import express from "express";
import cors from "cors";
import db from "./db.js";
import { registerUser } from "./services/auth.js";
import { loginUser } from "./services/auth.js";
import { authenticateUser } from "./services/auth.js";

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
<<<<<<< HEAD
});
=======
});

app.get("/users", authenticateUser, (req, res) => {
    const name = req.query.name;
});

app.post("/signup", registerUser);

app.post("/login", loginUser);

app.post("/users", authenticateUser, (req, res) => {
    const userToAdd = req.body;
    console.log(`User To Add ${JSON.stringify(userToAdd)}`);
    // Users.addUser(userToAdd).then((result) =>
    //     res.status(201).send(result)
    // );

    const { error } = db.from("users").insert(userToAdd);
});
>>>>>>> d2c281ffee75549e5d101345ad7f66db53a47d52
