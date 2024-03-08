import jwt from 'jsonwebtoken';

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
}

export const tokenService = new TokenService();
