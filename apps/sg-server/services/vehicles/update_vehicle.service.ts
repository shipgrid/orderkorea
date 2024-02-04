import {
  Logger,
  Vehicle,
  KnexClient
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  vehicle_id,
  make,
  model,
  year,
  price, 
  is_new,
  is_listed,
  is_sold,
  mileage, 
  exterior_color,
  interior_color,
  transmission_type,
  doors, 
  trim, 
  drivetrain, 
  vin_number, 
  fuel_type, 
  description
}): Promise<IServiceResponse<{}>> => {

  return new Promise(async (resolve, reject) => {
    try {
  
      await KnexClient.transaction(async (trx) => {

        await Vehicle.query(trx).patchAndFetchById(vehicle_id, {
          make,
          model,
          year,
          price, 
          is_new,
          is_listed,
          is_sold,
          mileage, 
          exterior_color,
          interior_color,
          transmission_type,
          doors, 
          trim, 
          drivetrain, 
          vin_number, 
          description,
          fuel_type, 
        })
  
        resolve({
          success: true
        })
      });
  
    } catch(e) {
      Logger.error('Error updating vehicle:', e);
      reject(e)
    } 
  });
}
