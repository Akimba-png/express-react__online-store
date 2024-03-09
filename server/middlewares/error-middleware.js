import { ApiError } from './../error/api-error.js';

export const errorMiddleware = (err, _req, res, _next) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message, errors: err.errors });
    return;
  }
  res.status(500).json({ message: `unexpected error: ${ err.message }`});
  return;
}
