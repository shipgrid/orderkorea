import {
  Logger,
  User,
  KnexClient
} from '../../models'

export default async ({
  user_id,
  last_login,
}) => {

  try {
    await KnexClient.transaction(async (trx) => {

      const updatedUser = {
        last_login,
      };

      const user = await User.query(trx).patchAndFetchById(user_id, updatedUser);

      await trx.commit();

      Logger.info('User updated:', user);
    });
  } catch(e) {
    Logger.error('Error updating User:', e);
    throw e
  }
}
