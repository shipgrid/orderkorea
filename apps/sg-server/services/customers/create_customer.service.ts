import {
  User,
  Customer,
  KnexClient,
  Logger
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  first_name,
  last_name,
  username,
  uid,
  password_hash,
  last_login,
}): Promise<IServiceResponse<User>> => {
  
  return new Promise(async (resolve, reject) => {
    try {
      await KnexClient.transaction(async (trx) => {
        const foundUser:any = await User.query(trx).findOne({ username });

        if (foundUser) {
          resolve({
            success: false,
            message: 'User with username already exists'
          });

          return;
        }

        const newUser = {
          first_name,
          last_name,
          username,
          uid,
          password_hash,
          last_login,
        };

        const user:any = await User.query(trx).insert(newUser);

        const newUserCustomer = {
          user_id: user.user_id,
        };

        const userCustomer = await Customer.query(trx).insert(newUserCustomer);

        await trx.commit();

        Logger.info('User and UserCustomer created:', user, userCustomer);

        resolve({
          success: true,
        });
      });
      
    } catch (e) {
      Logger.error('Error creating User and UserCustomer:', e);
      reject(e);
    }
  });
}
