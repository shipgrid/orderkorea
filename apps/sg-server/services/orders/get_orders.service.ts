import {
  Logger,
  Order,
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  user_id
}): Promise<IServiceResponse<Order[]>> => {

  return new Promise(async (resolve, reject) => {
    try {
      const orders = await Order
        .query()
        .withGraphFetched('orderEvents')
        .withGraphFetched('thirdParties.[address]')
        .withGraphFetched('documents')
        .withGraphFetched('vehicles.[images]')
        .withGraphFetched('seller(selectSeller)')
        .withGraphFetched('buyer(selectBuyer)')
        .modifiers({
          selectBuyer(builder) {
            builder.select('username', 'first_name', 'last_name')
          },
          selectSeller(builder) {
            builder.select('username', 'first_name', 'last_name')
          },
        })
        .where('seller_id', user_id)
        .orWhere('buyer_id', user_id); 
        
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