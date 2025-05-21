// backend.js
// note: npx nodemon backend.js (node backend.js for default)
import express  from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";

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