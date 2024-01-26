import {
  Logger,
  User
} from '../../models'

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
}: ILoginUser): Promise<IServiceResponse<{ 
  token: string,
  username: string,
  is_staff: boolean,
  is_broker: boolean
}>> => {

  return new Promise(async (resolve, _) => {
    try {

      const foundUser = await User.query().findOne({ username: username });
  
      if(!foundUser) {
        resolve({
          success: false, 
          message: 'User not found'
        })

        return;
      }

      Logger.info('User fetched successfully', foundUser);
  
      const results = await bcrypt.compare(password, foundUser.password_hash);
  
      if(!results) {
        return resolve({
          success: false,
          message: 'Invalid password'
        })
      }
  
      Logger.info('Password compared successfully', results);
  
      const last_login = convertToLocalDateString(new Date());

      await User.query()
      .patch({ last_login: last_login }) 
      .where('user_id', foundUser.user_id);

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
            ...foundUser
          }
        },
        process.env.FIRE_SHARK,
        { expiresIn: '7d' }
      );
      
      resolve({
        success: true,
        data: {
          token,
          username: foundUser.username,
          is_staff: !!foundUser.is_staff,
          is_broker: !!foundUser.is_broker
        }
      })
  
    } catch(e) {
      Logger.error('Error registering user:', e);
      throw e
    }
  });
}
