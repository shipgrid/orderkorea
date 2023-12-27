import {
  ThirdParty,
  Logger,
  KnexClient
} from '../../models'

export default async ({
  third_party_id
}) => {
  try {

    await KnexClient.transaction(async (trx) => {
      await ThirdParty.query(trx).deleteById(third_party_id);
    });
    
  } catch(e) {
    Logger.error('Error deleting third party:', e);
    throw e
  }
}