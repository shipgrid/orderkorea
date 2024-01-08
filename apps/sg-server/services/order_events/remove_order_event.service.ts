import {
  Logger,
  OrderEvent
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  order_event_id
}): Promise<IServiceResponse<{}>> => {

  return new Promise(async (resolve, reject) => {
    try {
      await OrderEvent
        .query()
        .deleteById(order_event_id);

      resolve({
        success: true, 
      })
  
    } catch(e) {
      Logger.error('Error deleting orderEvent by order_event_id', e);
      reject(e)
    }
  })
}