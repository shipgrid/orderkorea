import {
  Order,
  Logger,
  KnexClient
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  order_id,
  shipment_type,
  container_number,
  port_of_loading,
  port_of_arrival, 
  loaded_on
}): Promise<IServiceResponse<{}>> => {

  return new Promise(async (resolve, reject) => {
    try {
  
      await KnexClient.transaction(async (trx) => {
  
        const newOrder = {
          order_id,
          shipment_type,
          container_number,
          port_of_loading,
          port_of_arrival, 
          loaded_on
        };
  
        await Order.query(trx).update(newOrder).where('order_id', order_id);
        
        resolve({
          success: true,
        })      
      });

    } catch(e) {
      Logger.error('Error updating order:', e);
      reject(e)
    }
  })
}