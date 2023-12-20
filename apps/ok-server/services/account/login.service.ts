import {
  Logger,
  HttpError
} from '../../models'

import {
  customers,
  users
} from '../../services'

import {
  convertToLocalDateString
} from '../../utils/dates'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

interface ILoginUser {
  username: string;
  password: string;
}

export default async ({
  username,
  password
}: ILoginUser) => {

  try {
    if (!username) {
      throw new HttpError(400, 'Username is required')
    }

    if (!password) {
      throw new HttpError(400, 'Password is required')
    }

    const user = await customers.getByUsername({
      username
    });


    if(!user) {
      throw new HttpError(404, 'User not found');
    }

    Logger.info('User fetched successfully', user);

    const results = await bcrypt.compare(password, user.password_hash);

    if(!results) {
      throw new HttpError(400, 'Invalid password');
    }

    Logger.info('Password compared successfully', results);

    const last_login = convertToLocalDateString(new Date());

    await users.update({
      user_id: user.user_id,
      last_login
    });

    Logger.info('User last login', last_login);

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
      Logger.error('Error while signing JWT:', error);
      throw error
    }
    
    Logger.info(`Token created successfully`);

    return {
      token
    };

  } catch(e) {
    console.log('err: ', e)
    Logger.error('Error registering user:', e);
    throw e
  }
}
