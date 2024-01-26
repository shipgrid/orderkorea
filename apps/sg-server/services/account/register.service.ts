import {
  Logger,
  User
} from '../../models'

import {
  convertToLocalDateString
} from '../../utils/dates'

import bcrypt from 'bcryptjs'

import {
  IServiceResponse
} from '../../types'

interface IRegisterUser {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}

export default async ({
  first_name,
  last_name,
  username,
  password,
  
}: IRegisterUser): Promise<IServiceResponse<{}>> => {
  
  return new Promise(async (resolve, reject) => {
    try {

      let password_hash = await bcrypt.hash(password, 10);
  
      if(!password_hash) {
        throw new Error('Error hashing password');
      }

      const newUser = {
        first_name,
        last_name,
        username,
        password_hash,
        last_login: convertToLocalDateString(new Date()),
      };

      const user:any = await User.query().insert(newUser);
  
      if(!user) {
        return resolve({
          success: false
        })
      }

      resolve({
        success: true
      })
  
      Logger.info('User added successfully', user);
  
    } catch(e) {
      Logger.error('Error registering user:', e);
      throw e
    }
  })
}
