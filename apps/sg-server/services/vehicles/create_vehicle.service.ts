import Vehicle from '../../models/vehicle'
import logger from '../../models/logger'
import knexClient from '../../models/knex_client'

export default async ({
  make,
  model,
  year,
  exterior_color,
  transmission_type,
  mileage,
  description
}) => {
  try {

    let createdVehicle;

    await knexClient.transaction(async (trx) => {

      const newVehicle = {
        make,
        model,
        year,
        exterior_color,
        transmission_type,
        mileage,
        description
      };

      const vehicle = await Vehicle.query(trx).insert(newVehicle);
      createdVehicle = vehicle;
      await trx.commit();
      
      logger.info('Vehicle created:', vehicle);
    });

    return createdVehicle

  } catch(e) {
    logger.error('Error creating vehicle:', e);
    throw e
  }
}
