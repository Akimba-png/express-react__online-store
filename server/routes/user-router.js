import Router from 'express';
import { userController } from '../controllers/user-controller.js';
import { body } from 'express-validator';

const userRouter = Router();

userRouter.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 2, max: 10 }),
  userController.registration
);
userRouter.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 2, max: 10 }),
  userController.login
);
userRouter.get('/auth', userController.check);

export { userRouter };
