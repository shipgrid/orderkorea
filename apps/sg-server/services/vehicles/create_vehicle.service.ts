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
  price,
  description,
  fuel_type,
  images
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
        price,
        fuel_type,
        description,
        images: images.map((image) => {
          return {
            image_url: image.image_url
          }
        })
      };

      const newVehicles = await Vehicle.query(trx).insertGraph(newVehicle, { relate: true });

      createdVehicle = newVehicles;
      await trx.commit();
      
      Logger.info('Vehicle created:', newVehicles);
    });

    return createdVehicle

  } catch(e) {
    Logger.error('Error creating vehicle:', e);
    throw e
  }
}
