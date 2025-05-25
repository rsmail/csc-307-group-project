// backend.js
// note: npx nodemon backend.js (node backend.js for default)
import express  from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const router = express();
const port = 8000;

router.use(cors());
router.use(express.json());

router.use('/', authRoutes);
router.use('/', groupRoutes);
router.use("/users", userRoutes);

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});