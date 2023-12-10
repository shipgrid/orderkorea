import logger from '../models/logger'
import {
  updateUser,
  getUserCustomerByUsername
} from './user.service'
import {
  convertToLocalDateString
} from '../utils/dates'

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

    const user = await getUserCustomerByUsername({
      username
    });

    if(!user) {
      throw new Error('User not found');
    }

    logger.info('User fetched successfully', user);

    const results = await bcrypt.compare(password, user.password_hash);

    if(!results) {
      throw new Error('Invalid password');
    }

    logger.info('Password compared successfully', results);

    const last_login = convertToLocalDateString(new Date());

    await updateUser({
      user_id: user.user_id,
      last_login
    });

    logger.info('User last login', last_login);

    let token;

    try {
      token = jwt.sign(
        { 
          customer: {
            ...user.userCustomer
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