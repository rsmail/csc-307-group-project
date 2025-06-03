// routes/authRoutes.js

import express from "express";
import * as authController from "../controllers/authController.js";

const router = express();

router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;