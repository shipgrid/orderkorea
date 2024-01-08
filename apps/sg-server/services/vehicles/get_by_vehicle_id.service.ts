import {
  Logger,
  Vehicle,
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  vehicle_id
}): Promise<IServiceResponse<Vehicle>> => {

  return new Promise(async (resolve, reject) => {
    try {
      const vehicle = await Vehicle
        .query()
        .findById(vehicle_id)
        .withGraphFetched('images');
  
      if(!vehicle) {
        resolve({
          success: false, 
          message: 'Vehicle not found'
        })

        return;
      }
  
      resolve({
        success: true, 
        data: vehicle
      })

    } catch(e) {
      Logger.error('Error getting vehicle by id:', e);
      reject(e)
    }
  });
}
