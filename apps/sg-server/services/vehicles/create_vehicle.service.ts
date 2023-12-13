import {
  Logger,
  Vehicle,
  KnexClient
} from '../../models'

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

    await KnexClient.transaction(async (trx) => {

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
      
      Logger.info('Vehicle created:', vehicle);
    });

    return createdVehicle

  } catch(e) {
    Logger.error('Error creating vehicle:', e);
    throw e
  }
}
