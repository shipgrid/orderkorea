import {
  Logger,
  Vehicle,
  KnexClient
} from '../../models'

export default async ({
  vehicle_id
}) => {
  try {
    await KnexClient.transaction(async (trx) => {

      const vehicle = await Vehicle.query(trx).deleteById(vehicle_id);

      await trx.commit();

      Logger.info('Vehicle deleted:', vehicle);
    });
  } catch(e) {
    Logger.error('Error deleting vehicle:', e);
    throw e
  }
}
