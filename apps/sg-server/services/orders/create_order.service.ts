import Order from '../../models/order';
import KnexClient from '../../models/knex_client';
import logger from '../../models/logger'

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
    logger.error('Error creating order:', e);
    throw e
  }
}
