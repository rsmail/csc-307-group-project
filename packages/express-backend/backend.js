// backend.js
// note: npx nodemon backend.js (node backend.js for default)
import express  from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const router = express();

const allowedOrigins = ["https://mango-tree-075bf651e.6.azurestaticapps.net"];

router.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

router.use(express.json());

router.use('/', authRoutes);
router.use('/', groupRoutes);
router.use('/', taskRoutes);
router.use("/users", userRoutes);

router.get("/", (req, res) => {
    res.send("Hello World!");
});

const port = 8000;

router.listen(process.env.PORT || port, () => {
    console.log("REST API is listening.");
});
