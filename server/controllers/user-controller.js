import { validationResult } from 'express-validator';
import { ApiError } from '../error/api-error.js';
import { User } from '../models/models.js';
import bcrypt from 'bcrypt';

const SALT = 5;

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('form validation error', errors));
      }
      const { email, password } = req.body;
      let candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(
          ApiError.badRequest(`user with email ${email} is already exists`)
        );
      }
      const hashedPassword = await bcrypt.hash(password, SALT);
      candidate = {
        email,
        password: hashedPassword,
      };
      const createdUser = await User.create(candidate);
    } catch (error) {

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
