import {
  Logger,
  User,
  KnexClient,
  HttpError
} from '../../models'

export default async ({
  user_id,
  last_login,
}) => {

  try {
    if (!user_id) {
      throw new HttpError(400, 'User ID is required')
    }

    if (!last_login) {
      throw new HttpError(400, 'Last login is required')
    }
    
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
