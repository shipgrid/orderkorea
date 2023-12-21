import {
  User,
  Customer,
  KnexClient,
  Logger,
  HttpError
} from '../../models'

export default async ({
  first_name,
  last_name,
  username,
  password_hash,
  last_login,
}) => {

  try {

    if (!first_name) {
      throw new HttpError(400, 'First name is required')
    }

    if (!last_name) {
      throw new HttpError(400, 'Last name is required')
    }

    if (!username) {
      throw new HttpError(400, 'Username is required')
    }

    if (!password_hash) {
      throw new HttpError(400, 'Password is required')
    }

    if (!last_login) {
      throw new HttpError(400, 'Last login is required')
    }
    
    await KnexClient.transaction(async (trx) => {

      const newUser = {
        first_name,
        last_name,
        username,
        password_hash,
        last_login,
      };

      const user = await User.query(trx).insert(newUser);

      const newUserCustomer = {
        user_id: user.user_id, 
      };

      const userCustomer = await Customer.query(trx).insert(newUserCustomer);

      await trx.commit();

      Logger.info('User and UserCustomer created:', user, userCustomer);
    });
  } catch(e) {
    Logger.error('Error creating User and UserCustomer:', e);
    throw e
  }
}
