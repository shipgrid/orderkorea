import Address from '../../models/address';
import KnexClient from '../../models/knex_client';
import logger from '../../models/logger'

export default async ({
  address_id
}) => {
  try {

    await KnexClient.transaction(async (trx) => {

      await Address.query(trx).deleteById(address_id);
    });
  } catch(e) {
    logger.error('Error deleting address:', e);
    throw e
  }
}