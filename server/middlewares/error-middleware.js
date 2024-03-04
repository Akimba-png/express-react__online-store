import { ApiError } from './../error/api-error';

export const errorMiddleware = (err, _req, res, _next) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message });
    return;
  }
  res.status(500).json({ message: 'Unexpected error' });
  return;
}
