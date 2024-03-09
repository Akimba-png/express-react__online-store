import { validationResult } from 'express-validator';
import { ApiError } from '../error/api-error.js';
import { User } from '../models/models.js';
import bcrypt from 'bcrypt';
import { UserDto } from '../dtos/user-dto.js';
import { tokenService } from '../services/token-service.js';

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
      const userDto = new UserDto(createdUser);
      const jwt = tokenService.generateTokens({ ...userDto });
      userDto.accessToken = jwt.accessToken;
      await tokenService.saveToken(userDto.id, jwt.refreshToken);
      res.cookie(
        'refreshToken',
        jwt.refreshToken,
        { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true },
      );
      res.status(201).json(userDto);
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
