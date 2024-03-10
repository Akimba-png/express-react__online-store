import { UserDto } from '../dtos/user-dto.js';
import { ApiError } from '../error/api-error.js';
import { Basket, User } from '../models/models.js';
import bcrypt from 'bcrypt';
import { tokenService } from './token-service.js';

const SALT = 5;

class UserService {
  async registration(email, password) {
    let candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.badRequest(`user with email ${email} is already exists`);
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
    await Basket.create({ userId: userDto.id });
    return {
      user: userDto,
      refreshToken: jwt.refreshToken,
    };
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.badRequest(`email ${email} is not registered`);
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw ApiError.badRequest(`email or password is incorrect`);
    }
    const userDto = new UserDto(user);
    const jwt = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, jwt.refreshToken);
    userDto.accessToken = jwt.accessToken;
    return {
      user: userDto,
      refreshToken: jwt.refreshToken,
    };
  }

  async checkAuth(userData) {
    const userDto = new UserDto(userData);
    const jwt = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, jwt.refreshToken);
    userDto.accessToken = jwt.accessToken;
    return {
      user: userDto,
      refreshToken: jwt.refreshToken,
    };
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unAuthorized();
    }
    const userData = tokenService.verifyRefreshToken(refreshToken);
    const tokenData = tokenService.findToken(refreshToken);
    if (!userData || !tokenData) {
      throw ApiError.unAuthorized();
    }
    const userDto = new UserDto(userData);
    const jwt = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, jwt.refreshToken);
    userDto.accessToken = jwt.accessToken;
    return {
      user: userDto,
      refreshToken: jwt.refreshToken,
    };
  }
}

export const userService = new UserService();
