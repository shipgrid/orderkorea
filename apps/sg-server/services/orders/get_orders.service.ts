import {
  Logger,
  Order,
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  customer_id
}): Promise<IServiceResponse<Order[]>> => {

  return new Promise(async (resolve, reject) => {
    try {
      const orders = await Order
        .query()
        .withGraphFetched('orderEvents')
        .withGraphFetched('thirdParties.[address]')
        .withGraphFetched('documents')
        .withGraphFetched('vehicles.[images]')
        .where('customer_id', customer_id)
        
      resolve({
        success: true, 
        data: orders
      })

    } catch(e) {
      Logger.error('Error getting orders:', e);
      reject(e)
    }
  })
}