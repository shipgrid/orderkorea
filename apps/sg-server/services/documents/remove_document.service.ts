import {
  Document,
  Logger,
  KnexClient
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  document_id
}): Promise<IServiceResponse<{}>> => {

  return new Promise(async (resolve, reject) => {
    try {

      await KnexClient.transaction(async (trx) => {
        await Document.query(trx).deleteById(document_id);
        trx.commit();
      });

      resolve({
        success: true 
      })

    } catch(e) {
      Logger.error('Error deleting document:', e);
      reject(e)
    }
  })
}