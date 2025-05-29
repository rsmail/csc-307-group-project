// routes/groupRoutes.js

import express from "express";
import * as groupController from "../controllers/groupController.js";
import { authenticateToken } from "../controllers/authController.js"

const router = express();


router.get('/groups', authenticateToken, groupController.getUserGroups); 
router.post('/groups', authenticateToken, groupController.createGroup);

router.get('/groups/invites', authenticateToken, groupController.getPendingInvites);

router.get('/groups/:id', authenticateToken, groupController.getGroupMembers);
router.post('/groups/:id', authenticateToken, groupController.sendGroupInvite);
router.patch('/groups/:id', authenticateToken, groupController.acceptGroupInvite);



export default router;