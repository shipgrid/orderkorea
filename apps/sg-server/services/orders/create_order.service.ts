import {
  Logger,
  User,
  Order,
  KnexClient
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  email,
  shipment_type,
  port_of_loading,
  container_number,
  port_of_arrival,
  loaded_on,
  thirdParties,
  documents,
  vehicles
}): Promise<IServiceResponse<Order>> => {

  return new Promise(async (resolve, reject) => {
    try {
  
      await KnexClient.transaction(async (trx) => {
  
        const user:any = await User
          .query(trx)
          .withGraphFetched('customer')
          .where('username', email).first();
  
        if(!user) {
          resolve({
            success: false,
            message: 'User not found'
          })

          return;
        }
  
        const newOrder = {
          customer_id: user.customer?.customer_id,
          shipment_type,
          port_of_loading,
          container_number,
          port_of_arrival,
          loaded_on,
          thirdParties,
          documents,
          vehicles,
          orderEvents: [
            {
              name: 'ORDER_CREATED',
            }
          ]
        };
  
        const order = await Order.query(trx).upsertGraph(newOrder, { relate: true });
        trx.commit();

        resolve({
          success: true, 
          data: order,
        })

      });
  
    } catch(e) {
      Logger.error('Error creating order:', e);
      reject(e)
    }
  })  
}
