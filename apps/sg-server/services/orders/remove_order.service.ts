import {
  Logger,
  Order,
  KnexClient
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({  
  order_id
}): Promise<IServiceResponse<Order>> => {
  return new Promise(async (resolve, reject) => {
    try {

      await KnexClient.transaction(async (trx) => {
        await Order.query(trx).deleteById(order_id);
        
        resolve({
          success: true
        })
      });
  
    } catch(e) {
      Logger.error('Error deleting order:', e);
      reject(e)
    }
  })
}