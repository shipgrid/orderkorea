import {
  Logger,
  Vehicle,
  KnexClient
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  vehicle_id
}):Promise<IServiceResponse<{}>> => {

  return new Promise(async (resolve, reject) => {
  
    try {
      
      await KnexClient.transaction(async (trx) => {
  
        await Vehicle.query(trx).deleteById(vehicle_id);
  
  
        Logger.info('Vehicle deleted:');
        resolve({
          success: true,
        })
      });

    } catch(e) {
      Logger.error('Error deleting vehicle:', e);
      reject(e)
    }
  });

}
