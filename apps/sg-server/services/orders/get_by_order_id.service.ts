import {
  Logger,
  Order,
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  order_id,
  customer_id
}): Promise<IServiceResponse<Order>> => {

  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order
        .query()
        .withGraphFetched('orderEvents')
        .withGraphFetched('thirdParties.[address]')
        .withGraphFetched('documents')
        .withGraphFetched('vehicles.[images]')
        .modifyGraph('vehicles.[images]', builder => {
          builder.select('image_url');
        })
        .where('order_id', order_id)
        .where('customer_id', customer_id)
  
        if(!order.length) {
          resolve({
            success: false,
            message: 'Order not found'
          })
          return;
        }
  
      resolve({
        success: true,
        data: order[0]
      })
  
    } catch(e) {
      Logger.error('Error getting order by order_id', e);
      reject(e)
    }
  })
}
