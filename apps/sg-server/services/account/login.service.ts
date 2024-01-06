import {
  Logger
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

    const user:any = await customers.getByUsername({
      username
    });

    if(!user) {
      throw new Error('User not found');
    }

    Logger.info('User fetched successfully', user);

    const results = await bcrypt.compare(password, user.password_hash);

    if(!results) {
      throw new Error('Invalid password');
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
            ...user.customer
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
    Logger.error('Error registering user:', e);
    throw e
  }
}
