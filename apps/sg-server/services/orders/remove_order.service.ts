import Order from '../../models/order';
import KnexClient from '../../models/knex_client';
import logger from '../../models/logger'

export default async ({  
  order_id
}) => {
  try {

    await KnexClient.transaction(async (trx) => {
      const order = await Order.query(trx).deleteById(order_id);
    });

    return;
  } catch(e) {
    logger.error('Error deleting order:', e);
    throw e
  }
}