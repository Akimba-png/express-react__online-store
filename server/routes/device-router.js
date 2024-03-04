import Router from 'express';
import { deviceController } from '../controllers/device-controller.js';

const deviceRouter = Router();

deviceRouter.post('/', deviceController.create);
deviceRouter.get('/', deviceController.getAll);
deviceRouter.get('/:id', deviceController.getOne);

export { deviceRouter };
