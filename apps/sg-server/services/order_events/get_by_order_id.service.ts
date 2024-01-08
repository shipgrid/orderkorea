import {
  Logger,
  OrderEvent
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  
}): Promise<IServiceResponse<OrderEvent[]>> => {

  return new Promise(async (resolve, reject) => {

    try {
      const orderEvents = await OrderEvent.query();
      
      resolve({
        success: true,
        data: orderEvents
      })

    } catch(e) {
      Logger.error('Error getting user by username:', e);
      reject(e)
    }
  })
}