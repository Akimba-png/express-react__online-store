export class ApiError extends Error {
  status;
  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static badRequest(message) {
    return new ApiError(400, message);
  }

  static unAuthorized(message) {
    return new ApiError(401, message);
  }

  static forbidden(message) {
    return new ApiError(403, message);
  }

  static notFoud(message) {
    return new ApiError(404, message);
  }

  static internal(message) {
    return new ApiError(500, message);
  }
}
