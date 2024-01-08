import {
  ThirdParty,
  Logger,
  KnexClient
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  third_party_id
}): Promise<IServiceResponse<{}>> => {

  return new Promise(async (resolve, reject) => {
    try {

      KnexClient.transaction(async (trx) => {
        await ThirdParty.query(trx).deleteById(third_party_id);
        trx.commit();
      });

      resolve({
        success: true
      })
      
    } catch(e) {
      Logger.error('Error deleting third party:', e);
      reject(e)
    }
  })
}