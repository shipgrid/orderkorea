import {
  Logger,
  User,
  KnexClient
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  user_id,
  last_login,
}): Promise<IServiceResponse<User>> => {
  return new Promise(async (resolve, reject) => {
    try {
      await KnexClient.transaction(async (trx) => {
        const updatedUser = {
          last_login,
        };

        const user = await User.query(trx).patchAndFetchById(user_id, updatedUser);

        trx.commit();
        Logger.info('User updated:', user);

        resolve({
          success: true,
          data: user
        })

      });
    } catch (e) {
      Logger.error('Error updating User:', e);
      reject(e); // Reject with the error object
    }
  });
}
