import Router from 'express';
import { typeController } from '../controllers/type-controller';

const typeRouter = Router();

typeRouter.post('/', typeController.create);
typeRouter.get('/', typeController.getAll);

export { typeRouter };
