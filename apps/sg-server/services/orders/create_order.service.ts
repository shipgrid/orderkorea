import {
  Logger,
  User,
  Order,
  KnexClient,
  Reservation
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
  reservations
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
          orderEvents: [
            {
              name: 'ORDER_CREATED',
            }
          ]
        };
  
        const order = await Order.query(trx).upsertGraph(newOrder, { relate: true });
   
        if(!order) {
          resolve({
            success: false,
            message: 'Failed to create order'
          })

          return;
        }

        const updateReservations = await Reservation.query(trx).update({ order_id: order.order_id }).whereIn('reservation_id', reservations.map(item => item.reservation_id));

        if(!updateReservations) {
          resolve({
            success: false,
            message: 'Failed to update reservations'
          })

          return;
        }

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
