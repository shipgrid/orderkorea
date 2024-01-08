import {
  Logger,
  KnexClient,
  OrderEvent
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  order_id,
  name,
}): Promise<IServiceResponse<OrderEvent>> => {

  return new Promise(async (resolve, reject) => {
    try {
  
      await KnexClient.transaction(async (trx) => {
  
        const newOrderEvent = {
          order_id,
          name,
        };
  
        const orderEvent = await OrderEvent.query(trx).insert(newOrderEvent);

        resolve({
          success: true, 
          data: orderEvent
        })
      });
  
    } catch(e) {
      Logger.error('Error creating orderEvent:', e);
      reject(e)
    }
  })
}
