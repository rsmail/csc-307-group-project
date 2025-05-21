// routes/groupRoutes.js

import express from "express";
import * as groupController from "../controllers/groupController.js";

const router = express();

router.get('/groups', groupController.getUserGroups);

export default router;