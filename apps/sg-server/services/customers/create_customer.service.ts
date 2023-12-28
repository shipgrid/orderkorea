import {
  User,
  Customer,
  KnexClient,
  Logger
} from '../../models'

export default async ({
  first_name,
  last_name,
  username,
  uid,
  password_hash,
  last_login,
}) => {

  try {
    await KnexClient.transaction(async (trx) => {

      const newUser = {
        first_name,
        last_name,
        username,
        uid,
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
