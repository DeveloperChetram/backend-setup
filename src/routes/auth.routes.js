import express from 'express';
import { registerController, loginController, logoutController } from '../controllers/auth.controllers.js';

const authRouter = express.Router();

authRouter.post('/register', registerController);
authRouter.post('/login', loginController);
authRouter.get('/logout', logoutController);

export default authRouter;
