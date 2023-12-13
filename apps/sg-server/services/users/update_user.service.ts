import User from '../../models/user'
import knexClient from '../../models/knex_client'
import logger from '../../models/logger'

export default async ({
  user_id,
  last_login,
}) => {

  try {
    await knexClient.transaction(async (trx) => {

      const updatedUser = {
        last_login,
      };

      const user = await User.query(trx).patchAndFetchById(user_id, updatedUser);

      await trx.commit();

      logger.info('User updated:', user);
    });
  } catch(e) {
    logger.error('Error updating User:', e);
    throw e
  }
}
