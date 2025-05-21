// backend.js
// note: npx nodemon backend.js (node backend.js for default)
import express  from "express";
import cors from "cors";
import db from "./db.js";
// import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// import { registerUser } from "./services/auth.js";
// import { loginUser } from "./services/auth.js";
// import { authenticateUser } from "./services/auth.js";

const router = express();
const port = 8000;

router.use(cors());
router.use(express.json());

router.use('/', authRoutes);

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});

// router.get("/users", authenticateUser, (req, res) => {
//     const name = req.query.name;
// });

// router.post("/signup", registerUser);

// router.post("/login", loginUser);

// router.post("/users", authenticateUser, (req, res) => {
//     const userToAdd = req.body;
//     console.log(`User To Add ${JSON.stringify(userToAdd)}`);
//     // Users.addUser(userToAdd).then((result) =>
//     //     res.status(201).send(result)
//     // );

//     const { error } = db.from("users").insert(userToAdd);
// });
