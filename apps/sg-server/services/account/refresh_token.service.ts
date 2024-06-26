import {
  Logger,
  User,
  KnexClient
} from '../../models'

import {
  convertToLocalDateString
} from '../../utils/dates'

import {
  IServiceResponse
} from '../../types'

import jwt from 'jsonwebtoken'
import admin from 'firebase-admin'

interface ILoginFirebaseUser {
  firebase_token: string;
}

export default async ({
  firebase_token
}: ILoginFirebaseUser): Promise<IServiceResponse<{ token: string }>> => {

  return new Promise(async (resolve, reject) => {
    try {

      let loginUser;
      const response = await admin.auth().verifyIdToken(firebase_token)
  
      const { 
        uid 
      } = response
  
      const last_login = convertToLocalDateString(new Date());
  
      try {
        await KnexClient.transaction(async (trx) => {
      
          const userWithUid:any = await User.query(trx).where('uid', uid).first();
  
          if(!userWithUid) {
            resolve({
              success: false, 
              message: 'User with UID not found'
            })

            return; 
          }
  
          const user_id = userWithUid.user_id;
      
          loginUser = await User
            .query(trx)
            .patchAndFetchById(user_id, {
              last_login
            })
  
          Logger.info('User updated:', loginUser);
  
        });
      } catch(e) {
        Logger.error('Error updating User:', e);
        throw e
      }
  
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
            ...loginUser
          }
        },
        process.env.FIRE_SHARK,
        { expiresIn: '7d' }
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
  })
}
