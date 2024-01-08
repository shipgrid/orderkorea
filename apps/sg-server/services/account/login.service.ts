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

import {
  IServiceResponse
} from '../../types'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

interface ILoginUser {
  username: string;
  password: string;
}

export default async ({
  username,
  password
}: ILoginUser): Promise<IServiceResponse<{ token: string}>> => {

  return new Promise(async (resolve, reject) => {
    try {

      const {
        success,
        data
      } = await customers.getByUsername({
        username
      });
  
      if(!success) {
        resolve({
          success: false, 
          message: 'User not found'
        })

        return;
      }

      if(!data) {
        resolve({
          success: false, 
          message: 'User not found'
        })

        return;
      }
  
      Logger.info('User fetched successfully', data);
  
      const results = await bcrypt.compare(password, data.password_hash);
  
      if(!results) {
        throw new Error('Invalid password');
      }
  
      Logger.info('Password compared successfully', results);
  
      const last_login = convertToLocalDateString(new Date());
  
      await users.update({
        user_id: data.user_id,
        last_login
      });
  
      Logger.info('User last login', last_login);

      if(!process.env.FIRE_SHARK) {
        return resolve({
          success: false,
          message: 'Internal server error'
        })
      }
  
      let token = jwt.sign(
        { 
          user: {
            ...data.customer
          }
        },
        process.env.FIRE_SHARK,
        { expiresIn: '1h' }
      );
      
      resolve({
        success: true,
        data: {
          token
        }
      })
  
    } catch(e) {
      Logger.error('Error registering user:', e);
      throw e
    }
  });
}
