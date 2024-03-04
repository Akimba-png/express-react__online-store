import Router from 'express';
import { typeRouter } from './type-router';
import { brandRouter } from './brand-router';
import { userRouter } from './user-router';
import { deviceRouter } from './device-router';

const router = Router();

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);

export { router };
