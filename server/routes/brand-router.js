import Router from 'express';
import { brandController } from '../controllers/brand-controller.js';

const brandRouter = Router();

brandRouter.post('/', brandController.create);
brandRouter.get('/', brandController.getAll);

export { brandRouter };
