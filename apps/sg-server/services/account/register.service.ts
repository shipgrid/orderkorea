import {
  Logger
} from '../../models'

import {
  customers
} from '../../services'

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
  
      const response = await customers.create({
        first_name,
        last_name,
        username,
        password_hash: password_hash,
        last_login: convertToLocalDateString(new Date()),
      })

      if(!response.success) {
        resolve({
          success: false
        })

        return;
      }

      resolve({
        success: true
      })
  
      Logger.info('User added successfully', response);
  
    } catch(e) {
      Logger.error('Error registering user:', e);
      throw e
    }
  })
}
