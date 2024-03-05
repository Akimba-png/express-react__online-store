import { Device } from '../models/models.js';
import { ApiError } from '../error/api-error.js';
import { v4 as uuidv4} from 'uuid';
import path from 'node:path';

class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, typeId, brandId } = req.body;
      const { img } = req.files;
      let fileName = uuidv4() + '.jpg';
      img.mv(path.resolve('static', fileName));
      const device = await Device.create({
        name,
        price,
        typeId,
        brandId,
        img: fileName,
      });
      return res.status(201).json(device);
    } catch (error) {
      next(ApiError.badRequest(`db error happened: ${ error.message }`));
    }
  }

  async getAll(req, res, next) {
    try {

    } catch (error) {

    }
  }

  async getOne(req, res, next) {
    try {

    } catch (error) {

    }
  }
}

export const deviceController = new DeviceController();
