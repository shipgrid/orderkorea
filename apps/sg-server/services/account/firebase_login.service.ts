import {
  Logger,
  User,
  KnexClient
} from '../../models'

import {
  convertToLocalDateString
} from '../../utils/dates'

import jwt from 'jsonwebtoken'
import admin from 'firebase-admin'

interface ILoginFirebaseUser {
  firebase_token: string;
}

export default async ({
  firebase_token
}: ILoginFirebaseUser) => {

  try {

    let loginUser;

    const response = await admin.auth().verifyIdToken(firebase_token)

    const { 
      uid 
    } = response

    const last_login = convertToLocalDateString(new Date());

    try {
      await KnexClient.transaction(async (trx) => {
    
        const userWithUid = await User.query(trx).where('uid', uid).first();

        if(!userWithUid) {
          throw new Error('User with UID not found');
        }

        const user_id = userWithUid.user_id;
    
        loginUser = await User
          .query(trx)
          .patchAndFetchById(user_id, {
            last_login
          })
          .withGraphFetched('staff')
          .withGraphFetched('customer')

        await trx.commit();
        Logger.info('User updated:', loginUser);

      });
    } catch(e) {
      Logger.error('Error updating User:', e);
      throw e
    }

    Logger.info('User last login', last_login);

    let token;

    try {
      token = jwt.sign(
        { 
          customer: {
            ...loginUser.customer
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
      token,
      username: loginUser.username,
      is_staff: !!loginUser.staff,
      is_customer: !!loginUser.customer
    };

  } catch(e) {
    Logger.error('Error registering user:', e);
    throw e
  }
}
