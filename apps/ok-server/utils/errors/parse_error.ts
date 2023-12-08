import { Request, Response, NextFunction } from 'express';

export default async function errorMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  error.statusCode = error.statusCode || 500;
  error.clientMessage =
    error.clientMessage || error.serverMessage || 'Can not process the request at this time. Please contact customer service.';
  error.data = error.data;
  next(error);
}
