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
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie(
        'refreshToken',
        userData.refreshToken,
        { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true },
      );
      res.status(200).json(userData.user);
    } catch (error) {
      next(error);
    }
  }

  async checkAuth(req, res, next) {
    try {
      const user = req.user;
      const userData = await userService.checkAuth(user);
      res.cookie(
        'refreshToken',
        userData.refreshToken,
        { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true },
      );
      res.status(200).json(userData.user)
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;

    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
