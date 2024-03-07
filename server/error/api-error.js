export class ApiError extends Error {
  status;
  errors;
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static badRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static unAuthorized() {
    return new ApiError(401, 'user is unauthorized');
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
