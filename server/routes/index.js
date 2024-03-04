import Router from 'express';
import { typeRouter } from './type-router.js';
import { brandRouter } from './brand-router.js';
import { userRouter } from './user-router.js';
import { deviceRouter } from './device-router.js';

const router = Router();

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);

export { router };
