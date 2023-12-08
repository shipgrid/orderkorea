import User from '../models/user'
import UserCustomer from '../models/user_customer'
import knexClient from '../models/knex_client'
import logger from '../models/logger'

const createUserCustomer = async ({
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

const getUserByUsername = async ({
  username,
}) => {

  try {
    const user = await User.query().where('username', username).first();

    if(!user) {
      throw new Error('User not found');
    }

    return user;
  } catch(e) {
    logger.error('Error getting user by username:', e);
    throw e
  }
}

export {
  createUserCustomer,
  getUserByUsername
}