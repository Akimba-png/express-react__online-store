import jwt from 'jsonwebtoken';
import { AuthToken } from '../models/models.js';

class TokenService {
  constructor() {
    this.accessKey = process.env.JWT_ACCESS_KEY;
    this.refreshKey = process.env.JWT_REFRESH_KEY;
  }
  generateTokens(user) {
    const accessToken = jwt.sign(user, this.accessKey, { expiresIn: '30m' });
    const refreshToken = jwt.sign(user, this.refreshKey, { expiresIn: '2h' });
    return {
      accessToken,
      refreshToken,
    };
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await AuthToken.findOne({ where: { userId } });
    if (tokenData) {
      tokenData.token = refreshToken;
      return await tokenData.save();
    }
    const token = await AuthToken.create({ userId, token: refreshToken });
    return token;
  }
}

export const tokenService = new TokenService();
