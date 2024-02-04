import {
  Logger,
  User
} from '../../models'

import bcrypt from 'bcryptjs'

import {
  IServiceResponse
} from '../../types'

interface IUpdatePassword {
  user_id: number; 
  current_password: string;
  updated_password: string;
}

export default async ({
  user_id,
  current_password, 
  updated_password
}: IUpdatePassword): Promise<IServiceResponse<{}>> => {
  
  return new Promise(async (resolve, reject) => {
    try { 

      const userData = await User.query().findById(user_id)

      if(!userData) {
        return resolve({
          success: false, 
          message: 'User not found'
        })
      }

      const comparePasswords = await bcrypt.compare(current_password, userData.password_hash)

      if(!comparePasswords) {
        throw new Error('Error comparing password hash')
      }

      let password_hash = await bcrypt.hash(updated_password, 10);
  
      if(!password_hash) {
        throw new Error('Error hashing password');
      }

      const affectedRows = await User.query().patch({
        password_hash: password_hash
      })

      if(affectedRows <= 0) {
        return resolve({
          success: false, 
          message: 'Error updating password'
        })
      }

      return resolve({
        success: true
      })
    
    } catch(e) {
      Logger.error('Error registering user:', e);
      throw e
    }
  })
}
