# ./express-backend/routes
The routes folder will be used to listen to HTTP requests and send these requests to a controller

For example:
```
import express from "express";
import authController from "../controllers/authController";

const router = express.router();

router.post('/login', authController.login);
router.post('/register', authController.register)

export default router;
```