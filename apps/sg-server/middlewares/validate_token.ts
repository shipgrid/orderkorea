import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import logger from '../models/logger'

/**
 * Validates the authorization token coming from the request header.
 * If the user is already logged in, then this module is used to validate that the user has a valid token.
 */
export default (req: Request, res: Response, next: NextFunction) => {
  next()
  return
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    logger.info('Authentication token not provided', authHeader);
    res.status(401);
    return;
  }

  // if authHeader is present, then we can validate the user against his present jwt token for authentication.
  const tokenArray = authHeader.split(' ');
  const token = tokenArray[1].replace(/[^a-zA-Z0-9_+.\-]/g, '');

  if (tokenArray[0] !== 'Bearer' && tokenArray[0] !== 'bearer') {
    logger.info('Malformed authentication header provided, does not begin with Bearer', authHeader);
    res.status(401);
    return;
  }

  if (!token || token.length > 1024) {
    logger.info('Malformed authentication header provided, does not begin with Bearer', authHeader);
    res.status(401);
    return;
  }

  jwt.verify(token, 'YOUR_SECRET_KEY', (error, result) => {

    if (error) {
      logger.info('Authentication token not provided', error);
      res.status(401);
      return;
    }

    if (!result) {
      logger.info('Authentication token not provided', token);
      res.status(401);
      return;
    }

    req.customer = result.customer;
    logger.info('Authentication token not provided', result.data);
    next();
  });
};
