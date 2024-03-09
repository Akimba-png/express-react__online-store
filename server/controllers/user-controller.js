import { validationResult } from 'express-validator';
import { ApiError } from '../error/api-error.js';
import { userService } from '../services/user-service.js';

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('form validation error', errors));
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie(
        'refreshToken',
        userData.refreshToken,
        { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true },
      );
      res.status(201).json(userData.user);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('form validation error', errors));
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
