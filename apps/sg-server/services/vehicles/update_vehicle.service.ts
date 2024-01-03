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
  price, 
  mileage, 
  exterior_color,
  interior_color,
  transmission_type,
  doors, 
  trim, 
  drivetrain, 
  vin_number, 
  is_new,
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
        price, 
        mileage, 
        exterior_color,
        interior_color,
        transmission_type,
        doors, 
        trim, 
        drivetrain, 
        is_new,
        vin_number, 
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
