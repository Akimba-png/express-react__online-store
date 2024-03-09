import { UserDto } from '../dtos/user-dto.js';
import { ApiError } from '../error/api-error.js';
import { User } from '../models/models.js';
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
    return {
      user: userDto,
      refreshToken: jwt.refreshToken,
    };
  }
}

export const userService = new UserService();
