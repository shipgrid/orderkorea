import Vehicle from '../../models/vehicle'
import logger from '../../models/logger'
import knexClient from '../../models/knex_client'

export default async ({
  vehicle_id,
  make,
  model,
  year,
  exterior_color,
  transmission_type,
  mileage,
  description
}) => {
  try {

    let vehicle; 

    await knexClient.transaction(async (trx) => {

      vehicle = await Vehicle.query(trx).patchAndFetchById(vehicle_id, {
        make,
        model,
        year,
        exterior_color,
        transmission_type,
        mileage,
        description
      });

      await trx.commit();

      logger.info('Vehicle updated:', vehicle);
    });

    return vehicle;
  } catch(e) {
    logger.error('Error updating vehicle:', e);
    throw e
  } 
}
