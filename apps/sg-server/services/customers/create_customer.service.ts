import User from '../../models/user'
import UserCustomer from '../../models/user_customer'
import knexClient from '../../models/knex_client'
import logger from '../../models/logger'

export default async ({
  first_name,
  last_name,
  username,
  password_hash,
  last_login,
}) => {

  try {
    await knexClient.transaction(async (trx) => {

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

      const userCustomer = await UserCustomer.query(trx).insert(newUserCustomer);

      await trx.commit();

      logger.info('User and UserCustomer created:', user, userCustomer);
    });
  } catch(e) {
    logger.error('Error creating User and UserCustomer:', e);
    throw e
  }
}
