import {
  Logger,
  Vehicle,
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
}): Promise<IServiceResponse<Vehicle[]>> => {

  return new Promise(async (resolve, reject) => {
    
    try {

      const vehicles = await Vehicle
        .query()
        .withGraphFetched('images')
        .modifyGraph('images', builder => {
          builder.select('image_url');
        })

      resolve({
        success: true,
        data: vehicles
      })
    
    } catch(e) {
      Logger.error('Error getting user by username:', e);
      reject(e)
    }
  })
}