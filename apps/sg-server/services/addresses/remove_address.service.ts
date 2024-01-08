import {
  Address,
  Logger,
  KnexClient
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  address_id
}): Promise<IServiceResponse<{}>> => {

  return new Promise(async (resolve, reject) => {

    try {

      KnexClient.transaction(async (trx) => {
        await Address.query(trx).deleteById(address_id);

        resolve({
          success: true,
        })
      });
    } catch(e) {
      Logger.error('Error deleting address:', e);
      reject(e)
    }
  })
}