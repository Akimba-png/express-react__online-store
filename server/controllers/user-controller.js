import { validationResult } from 'express-validator';
import { ApiError } from '../error/api-error.js';

class UserController {
  async registration(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest('form validation error'));
    }
    try {

    } catch (error) {

    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('form validation error'));
      }
    } catch (error) {

    }
  }

  async check(req, res, next) {
    try {

    } catch (error) {

    }
  }
}

export const userController = new UserController();
