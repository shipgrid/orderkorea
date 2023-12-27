import {
  Order,
  Logger,
  KnexClient
} from '../../models'

export default async ({
  order_id,
  shipment_type,
  container_number,
  port_of_loading,
  port_of_arrival, 
  loaded_on
}) => {
  try {

    let updatedOrder;

    await KnexClient.transaction(async (trx) => {

      const newOrder = {
        order_id,
        shipment_type,
        container_number,
        port_of_loading,
        port_of_arrival, 
        loaded_on
      };

      const order = await Order.query(trx).update(newOrder).where('order_id', order_id);
      updatedOrder = order;
    });

    return updatedOrder;
  } catch(e) {
    Logger.error('Error updating order:', e);
    throw e
  }
}