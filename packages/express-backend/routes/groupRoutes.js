// routes/groupRoutes.js

import express from "express";
import * as groupController from "../controllers/groupController.js";
import * as taskController from "../controllers/taskController.js";
import { authenticateToken } from "../controllers/authController.js"

const router = express();


/*

All calls require an Auth Token in the header

All calls with :id require a group_id

For calls that require a body, hover over the function for more information

*/
router.get('/groups', authenticateToken, groupController.getUserGroupWithTasks); 
router.post('/groups', authenticateToken, groupController.createGroup);

router.get('/groups/invites', authenticateToken, groupController.getPendingInvites);

router.get('/groups/:id', authenticateToken, groupController.getGroupMembers);
router.post('/groups/:id', authenticateToken, groupController.sendGroupInvite);
router.patch('/groups/:id', authenticateToken, groupController.acceptGroupInvite);
router.delete('/groups/:id', authenticateToken, groupController.removeGroupMember);

router.get('/groups/:id/info', authenticateToken, groupController.getGroupInfo);

router.get('/groups/:id/tasks', authenticateToken, taskController.getGroupTasks);
router.post('/groups/:id/tasks', authenticateToken, taskController.createNewTask)
router.delete('/groups/:id/tasks/:task_id', authenticateToken, taskController.deleteTask);


export default router;