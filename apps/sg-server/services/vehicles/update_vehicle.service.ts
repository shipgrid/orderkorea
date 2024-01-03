import {
  Logger,
  Vehicle,
  KnexClient
} from '../../models'

export default async ({
  vehicle_id,
  make,
  model,
  year,
  vin_number,
  exterior_color,
  transmission_type,
  mileage,
  price,
  fuel_type,
  description
}) => {
  try {

    let vehicle; 

    await KnexClient.transaction(async (trx) => {

      vehicle = await Vehicle.query(trx).patchAndFetchById(vehicle_id, {
        make,
        model,
        year,
        vin_number,
        exterior_color,
        transmission_type,
        mileage,
        price,
        fuel_type,
        description
      });

      await trx.commit();

      Logger.info('Vehicle updated:', vehicle);
    });

    return vehicle;
  } catch(e) {
    Logger.error('Error updating vehicle:', e);
    throw e
  } 
}
