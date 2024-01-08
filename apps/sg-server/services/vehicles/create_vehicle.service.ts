import {
  Logger,
  Vehicle,
  KnexClient
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  make,
  model,
  year,
  exterior_color,
  vin_number,
  transmission_type,
  mileage,
  price,
  description,
  fuel_type,
  images
}): Promise<IServiceResponse<Vehicle>> => {

  return new Promise(async (resolve, reject) => {
    try {

  
      await KnexClient.transaction(async (trx) => {
  
        const newVehicle = {
          make,
          model,
          year,
          exterior_color,
          vin_number,
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
  
        const vehicle = await Vehicle.query(trx).insertGraph(newVehicle, { relate: true });
  
        Logger.info('Vehicle created:', vehicle);
        await trx.commit();
        resolve({
          success: true,
          data: vehicle
        })

      });
  
    } catch(e) {
      Logger.error('Error creating vehicle:', e);
      reject(e)
    }
  })
}
