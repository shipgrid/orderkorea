import {
  Logger,
  Order,
  KnexClient
} from '../../models'

export default async ({
  vehicle_id,
  customer_id,
}) => {
  try {

    let createdOrder;

    await KnexClient.transaction(async (trx) => {

      const newOrder = {
        vehicle_id,
        customer_id,
      };

      const order = await Order.query(trx).insert(newOrder);
      createdOrder = order;
    });

    return createdOrder;
  } catch(e) {
    Logger.error('Error creating order:', e);
    throw e
  }
}
