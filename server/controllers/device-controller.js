import { Device, DeviceInfo } from '../models/models.js';
import { ApiError } from '../error/api-error.js';
import { v4 as uuidv4} from 'uuid';
import path from 'node:path';

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, typeId, brandId, info } = req.body;
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
      if (info) {
        info = JSON.parse(info);
        info.forEach(async (e) => {
          await DeviceInfo.create({
            title: e.title,
            description: e.description,
            deviceId: device.id,
          });
        });
      }
      return res.status(201).json(device);
    } catch (error) {
      next(ApiError.badRequest(`db error happened: ${ error.message }`));
    }
  }

  async getAll(req, res, next) {
    try {
      let { typeId, brandId, limit, page } = req.query;
      let devices;
      page = page ?? 1;
      limit = limit ?? 9;
      const offset = page * limit - limit;
      if (!typeId && !brandId) {
        devices = await Device.findAndCountAll({ limit, offset });
      }
      if (!typeId && brandId) {
        devices = await Device.findAndCountAll({
          where: { brandId },
          limit,
          offset,
        });
      }
      if (typeId && !brandId) {
        devices = await Device.findAndCountAll({
          where: { typeId },
          limit,
          offset,
        });
      }
      if (typeId && brandId) {
        devices = await Device.findAndCountAll({
          where: { typeId, brandId },
          limit,
          offset,
        });
      }
      return res.status(200).json(devices);
    } catch (error) {
      next(ApiError.badRequest(`db error happened: ${ error.message }`));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: 'info' }],
      });
      res.status(200).json(device);
    } catch (error) {
      next(ApiError.badRequest(`db error happened ${ error.message }`));
    }
  }
}

export const deviceController = new DeviceController();
