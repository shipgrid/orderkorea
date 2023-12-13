import Vehicle from '../../models/vehicle'
import logger from '../../models/logger'
import knexClient from '../../models/knex_client'

export default async ({
  vehicle_id
}) => {
  try {
    await knexClient.transaction(async (trx) => {

      const vehicle = await Vehicle.query(trx).deleteById(vehicle_id);

      await trx.commit();

      logger.info('Vehicle deleted:', vehicle);
    });
  } catch(e) {
    logger.error('Error deleting vehicle:', e);
    throw e
  }
}
