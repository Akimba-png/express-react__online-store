import { Brand } from '../models/models.js';
import { ApiError } from '../error/api-error.js';

class BrandController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const brand = await Brand.create({ name });
      return res.status(201).json(brand);
    } catch (error) {
      next(ApiError.badRequest(`db error happened ${error.message}`));
    }
  }

  async getAll(_req, res, next) {
    try {
      const brands = await Brand.findAll();
      return res.status(200).json(brands);
    } catch (error) {
      next(ApiError.badRequest(`db error happened ${error.message}`));
    }
  }
}

export const brandController = new BrandController();
