import {
  Address,
  Logger,
  KnexClient
} from '../../models'

export default async ({
  address_id
}) => {
  try {

    await KnexClient.transaction(async (trx) => {
      await Address.query(trx).deleteById(address_id);
    });
  } catch(e) {
    Logger.error('Error deleting address:', e);
    throw e
  }
}