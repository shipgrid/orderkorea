import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import logger from '../models/logger'

/**
 * Validates the authorization token coming from the request header.
 * If the user is already logged in, then this module is used to validate that the user has a valid token.
 */
export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    logger.info('Authentication token not provided', authHeader);
    return res.status(401);
  }

  // if authHeader is present, then we can validate the user against his present jwt token for authentication.
  const tokenArray = authHeader.split(' ');
  const token = tokenArray[1].replace(/[^a-zA-Z0-9_+.\-]/g, '');

  if (tokenArray[0] !== 'Bearer' && tokenArray[0] !== 'bearer') {
    logger.info('Malformed authentication header provided, does not begin with Bearer', authHeader);
    return res.status(401);
  }

  if (!token || token.length > 1024) {
    logger.info('Malformed authentication header provided, does not begin with Bearer', authHeader);
    return res.status(401);
  }

  jwt.verify(token, 'YOUR_SECRET_KEY', (error, result) => {

    if (error) {
      logger.info('Authentication token not provided', error);
      return res.status(401).json({
        message: 'Token expired'
      })    
    }

    if (!result) {
      logger.info('Authentication token not provided', token);
      return res.status(401);
    }

    req.customer = result.customer;
    logger.info('Authentication token not provided', result.data);
    next();
  });
};
