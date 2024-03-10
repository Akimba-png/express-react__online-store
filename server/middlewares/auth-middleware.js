const authMiddleware = (req, _res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return next(ApiError.unAuthorized());
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      return next(ApiError.unAuthorized());
    }
    const userData = tokenService.verifyAccessToken(token);
    if (!userData) {
      return next(ApiError.unAuthorized());
    }
    req.user = userData;
    next();
  } catch (error) {
    next(error);
  }
};
