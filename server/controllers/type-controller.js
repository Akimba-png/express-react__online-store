import { Type } from './../models/models.js';
import { ApiError } from './../error/api-error.js';

class TypeController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const type = await Type.create({ name });
      return res.status(201).json(type);
    } catch (error) {
      next(ApiError.badRequest(`db error happened: ${error.message}`));
    }
  }

  async getAll(_req, res, next) {
    try {
      const types = await Type.findAll();
      return res.status(200).json(types);
    } catch (error) {
      next(ApiError.badRequest(`db error happened ${error.message}`));
    }
  }
}

export const typeController = new TypeController();
