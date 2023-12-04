import logger from '../models/logger'
import {
  getUserByUsername
} from './user.service'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

interface ILoginUser {
  username: string;
  password: string;
}

const login = async ({
  username,
  password
}: ILoginUser) => {

  try {

    const user = await getUserByUsername({
      username,
    })

    logger.info('User fetched successfully', user);

    const results = await bcrypt.compare(password, user.password_hash);

    if(!results) {
      throw new Error('Invalid password');
    }

    logger.info('Password compared successfully', results);

    let token;

    try {
      token = jwt.sign(
        { 
          data: { 
            user: user 
          } 
        },
        'YOUR_SECRET_KEY',
        { expiresIn: '1h' }
      );
    } catch (error) {
      logger.error('Error while signing JWT:', error);
      throw error
    }
    
    logger.info(`Token created successfully`);

    return {
      token
    };

  } catch(e) {
    logger.error('Error registering user:', e);
    throw e
  }
}

export {
  login
}